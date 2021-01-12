+++
title = "Installing Arch Linux on my Intel NUC"
date = "2017-12-24"
tags = ["arch", "guide", "linux"]
#blog
+++

{{% notice title="Is this up to date?" %}}
While I used to fiddle with Arch, and other Linux distros when I was younger, I don't run it as my daily driver nowadays.

If I were to reinstall Arch Linux tomorrow, I would still dogfood my own guide and expect that it should be fairly seemless.

While I don't expect much has changed, you should know that I'm not actively verifying that these steps haven't changed or anything like that.
{{% /notice %}}

It's that time again where I decide to reinstall Arch Linux and likely end up bashing my head against a wall. I have an old blog post on my Github but it could be better so this is an extended version mainly for my own future reference.

Please note that this isn't some guide for pros or that I expect to have the most 100% correct or efficient method of installing. It's just what I know works for me.

## Getting online

As I'm installing on an Intel NUC, I'm going to assume you might like it run it mainly via WiFi so we'll start by getting online. You can do this graphically by running `wifi-menu`.

```bash
wifi-menu
```

Once you've set up a profile, you'll see a new entry when using the `ifconfig` command and you can confirm you're online with `ping archlinux.org -c 3`.

## Setting up your hard drive

Personally, I wouldn't, and probably couldn't (yet) install Arch Linux as a dual boot partition. That is, alongside another operating system such as Windows or macOS. You might like to and that's great but this isn't the guide for you :)

First, we need to see what our current devices are:

```bash
fdisk -l
```

You may see a few. In my case, my hard drive has a few `/dev/sda<number>` entries and my USB has 2 `/dev/sdb<number>` entries. For the purposes of this guide, I'll be assuming that your hard drive is under `/dev/sda` but when installing to, say, a Macbook, I've found that the hard drive can be under `/dev/sdb`.

My hard drive will end up looking as follows once I've set it up:

| SIZE | PURPOSE        | LOCATION |
|------|----------------|----------|
| 500M | Boot Sector    | /boot    |
| 20G  | System Root    | /        |
| 8G   | Swap Space     | N/A      |
| 437G | Home Directory | /home    |

I'm targeting a [UEFI](https://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface) BIOS so we'll be using [GPT](https://en.wikipedia.org/wiki/GUID_Partition_Table) for our partition table.

The following uses [gparted](https://www.gnu.org/software/parted/manual/parted.html) which you may or may not be familiar with if you've only use GUI installers before. Just follow along and I'll comment what each segment is roughly doing. From hereon in, URLs prefixed by a tilde ({tilde}}) indicate resources where you can read further information if you're the curious sort.

****NOTE****: The following WILL wipe your hard drive so ensure that this is what you'd like to do and/or that you've backed up everything from any currently installed OS

## Partitioning

```bash
# Launched parted, passing our hard drive as an argument
parted /dev/sda

# Create a partition table using the GUID Partition Table (GPT) format.
# This wipes your drive(!)
mklabel gpt

# Create a 499M boot sector that will live at /boot
# ESP is short for EFI System Partition and are always formatted as FAT32
# We start at 1MiB instead of 0 because MBR/GPT both use the first block
# ~ https://unix.stackexchange.com/a/286325
# We use 550MiB as Rod Smith reports possible bugs with ESPs below 512MiB
# ~ http://www.rodsbooks.com/efi-bootloaders/principles.html
mkpart ESP fat32 1MiB 551MiB

# Set the boot flag to ON on partition number 1
# ~ https://www.gnu.org/software/parted/manual/html_node/set.html
set 1 boot on

# Create a 20G ext4 partition that will live at /
mkpart primary ext4 551MiB 20.5GiB

# Create an 8G swap partition
mkpart primary linux-swap 20.5GiB 28.5GiB

# Allocate the remaining space which will be used by users at /home/{user}
mkpart primary 28.5GiB 100%

# All done!
quit
```

Now that are partitions are set up, running `fdisk -l` again should show the following:

| DEVICE    | FORMAT | LOCATION |
|-----------|--------|----------|
| /dev/sda1 | ESP    | /boot    |
| /dev/sda2 | ext4   | /        |
| /dev/sda4 | ext4   | /home    |

## Making file systems

We don't need any utilites to create our file systems, we can just do 'em straight outta the box like so:

```bash
# Create a 32bit VFAT filesystem for our boot partition
# VFAT is essentially FAT32 with support for longer filenames. See below for more details.
# ~ http://wiki.linuxquestions.org/wiki/VFAT
# ~ https://unix.stackexchange.com/a/263731
mkfs.vfat -F32 /dev/sda1

# Create an ext4 filesystem for our root partition
mkfs.ext4 /dev/sda2

# Prepare a swap area
mkswap /dev/sda3

# Activate our created swap area
swapon /dev/sda3

# Create an ext4 filesystem for our home partition
mkfs.ext4 /dev/sda4
```

Now that our hard drive is completely set up, we're ready to mount our file systems.

## Mounting our new file systems

Just as a reminder, here's where we want our partitions to end up

| DEVICE    | FORMAT | LOCATION |
|-----------|--------|----------|
| /dev/sda1 | ESP    | /boot    |
| /dev/sda2 | ext4   | /        |
| /dev/sda4 | ext4   | /home    |

Here's how this layout translates into mount commands:

```bash
# Mount our root partition to /mnt
# NOTE: /mnt doesn't persist once we're in our bash prompt
# For example, /mnt/home becomes just /home
mount /dev/sda2 /mnt

# Create a folder which our ESP partition will be mounted to
mkdir /mnt/boot

# Mount our ESP partition to /boot
mount /dev/sda1 /mnt/boot

# Create a home folder where all of our user directories will live
mkdir /mnt/home

# Mount the home partition to /home
mount /dev/sda4 /mnt/home
```

Nice! We're completely done and can start to actually install and configure Arch Linux.

## Installing base packages

Now we need to download and install the base packages for Arch Linux to our `/mnt` which will becomes our root (`/`) later on.

```bash
pacstrap /mnt base
```

For the curious, the `base` group contains a number of default libraries and utilties you may have used such as `man`, `openssl`, `bash`, `iptables` and `gcc` to name a few.

You can view the `pacstrap` script itself [here](https://git.archlinux.org/arch-install-scripts.git/tree/pacstrap.in). I thought it would be quite longer!

The script also runs the `mkinitcpio` bash script which you can learn more about [here](https://wiki.archlinux.org/index.php/mkinitcpio#Overview).

This entire process may take a few minutes so feel free to read ahead while you wait.

## Set up bash

With Arch Linux installed, we can finally move off of our live USB and start a bash process to set up our freshly initialised system after 2 more quick steps

Step 1 is generating a [file systems table](http://www.linfo.org/etc_fstab.html), referred to as `fstab` going forward. This is done so that all devices (/dev/sdaX) specificied in the file are mounted automatically on startup.

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

The `-U` flag denotes that we want to identify our devices using [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier), instead of labels, as noted [here](https://github.com/falconindy/arch-install-scripts/blob/master/genfstab.in#L86).

Step 2 is even quicker!

```bash
arch-chroot /mnt
```

`arch-chroot`, seen [here](https://github.com/falconindy/arch-install-scripts/blob/master/arch-chroot.in) changes the root directory to, well, `/` which is our new root directory. As we're still on the live USB, we specify it as `/mnt` instead.

`arch-chroot` is also able to take some flags following the root partition such as `arch-chroot /mnt /bin/bash`. It's worth noting that the preceeding example is actually fairly pointless seeing as `arch-chroot` already defaults to `bash` anyway.

Huzzah! We're finally in our new system but will it boot? Not quite yet and we've still a lot to set up so let's carry on.

## Updates and other dependencies (optional)

At this point, I like to run a system upgrade using `pacman -Syu` just in case. As we've just pulled our dependencies minutes ago, it'll likely find nothing but I reckon it feels good, haha.

I also need some extra bits and pieces for later at this point. We couldn't have fetched these earlier as trying to run `pacman`, the Arch Linux package manager, from the live USB would attempt to install to the USB itself and error out.

I need the following bits:

| PACKAGE        | PURPOSE                                           |
|----------------|---------------------------------------------------|
| [dialog](http://invisible-island.net/dialog/)         | A library for console-based UIs like `wifi-menu`    |
| [intel-ucode](https://downloadcenter.intel.com/search?keyword=microcode+data)    | Micro-code updates for Intel CPUs                 |
| (wpa_supplicant)[https://w1.fi/wpa_supplicant/] | Used to connect to wireless networks (put simply) |

That should be everything for now. The other bits (`netctl` and `dhcpcd`) were already installed as part of the `base` group from earlier. If you're using Ethernet, you can basically skip this entire step hence why it's marked as optional.

Honestly, we don't really need `dialog` as we could just use `netctl` directly but I find it more user friendly and I'm not a masochist, haha.

You might as well also enable `dhcpcd` if you need it for ethernet with `systemctl enable dhcpcd`.

## Generating locale

Popular software often ships in a number of languages but in order to show the correct language, currency and so on, it needs to know where you live. We achieve this by generating and setting a locale.

To do so, edit `/etc/locale.gen` and uncomment your respective locale. In short, the format is `{language}_{country code}.{character encoding}`. As an example, I'm in New Zealand so I uncomment the line `en_NZ.UTF-8 UTF-8`. If in doubt, just opt for `utf-8`.

I just use `nano` but if you prefer, this would be an alright time to run `pacman -S vim`.

Once you've done that, you'll need to generate the locale files and export your language to your environment

```bash
locale-gen
export LANG={xx}_{yy}.UTF-8
```

If done successfully, `echo $LANG` will display your locale.

For reference, the actual `locale-gen` script can be seen [here](https://sourceware.org/git/?p=glibc.git;a=blob;f=localedata/gen-locale.sh;h=39f1475cbc45faaae32728dbfd7cce282c3cdb05;hb=HEAD) as part of [glibc](https://sourceware.org/git/?p=glibc.git;a=summary), the GNU implementation of the C standard library. I always wondered where it was from!

## Timezone

Selecting our timezone is fairly straightforward thanks to an interactive program called `tzselect`. Running it will show a list of continents and oceans. Selecting one will drill down to display countries.

Once you've confirmed the output, it will mention appending the timezone to a file. Instead, we want to symlink that timezone to a file. In my case, the timezone is `Pacific/Auckland` but of course, you'll want to input your respective timezone instead.

```bash
ln -s /usr/share/zoneinfo/Pacific/Auckland /etc/localtime
```

## Setting hardware clock

The last of our locale related setups is configuring the system clock. To do that, we'll tell our hardware clock to set the system time using the `--hctosys` option. You can read more about `hwclock` and how it differs from system time [here](https://linux.die.net/man/8/hwclock)

```bash
hwclock --systohc
```

## Hostname setup

We like life to be simple (but no simpler) and giving our computer/server a unique name is an important part of that process. For this bit, let's assume we want to name our system `weinerdog` because it sounds silly.

```bash
echo weinerdog > /etc/hostname
```

Oh, that was easy. We also need to tell our system that `weinerdog` is an alias for `127.0.0.1`, just like `localhost` is. We could fire up our favourite editor but it's likely `/etc/hosts` is empty so just do the following:

```bash
echo 127.0.0.1 localhost weinerdog > /etc/hosts
```

How quick was that, huh?

## Set a root password

We'll be using this password to login, which I sometimes forget. It should be different than the password for the user account we'll be making soon but I'd be lying if I said I have a super secure password. You have bigger problems if you think this writeup will give you top notch security anyway. I'm just here for a usable system!

```bash
passwd
```

Just type in your password twice. Not much more to it than that.

## Installing a boot manager

We'll be using `systemd-boot` as our EFI boot manager. I couldn't tell you anything about it other than it works and that's good enough.

```bash
bootctl --path=/boot install
```

The above command copies the `systemd-boot` binary to our EFI System Partition (`/boot`) and adds it as the default EFI application to be loaded as stated [here](https://wiki.archlinux.org/index.php/systemd-boot#EFI_boot).

## Configuring the boot manager

Now that we have a boot manager, we need to tell it what to boot exactly. We'll create a new `arch.conf` entry using `nano`:

```bash
nano /boot/loader/entries/arch.conf
```

and enter the following

```bash
title Arch Linux
linux /vmlinuz-linux
initrd /intel-ucode.img
initrd /initramfs-linux.img
options root=/dev/sda2 rw elevator=deadline quiet splash resume=/dev/sda3 nmi_watchdog=0
```

**NOTE**: The line `initrd /intel-ucode.img` **ONLY** applies if you installed the `intel-ucode` package from earlier which anyone with an Intel CPU should do.

As for the options, I couldn't say if you need, or don't need, any of them but it's worked fine for me so far. I'll probably read up on them in depth shortly and update this post as required.

Once that's created, set it as the default configuration:

```bash
echo "default arch" > /boot/loader/loader.conf
```

and now you're ready to reboot into a nicely working system!

```bash
exit
reboot
```

I've still got a lot to learn about Arch Linux but so far, the above setup has worked well for me.

There's still more that goes into a system but this is enough to get past the pesky initial setup which gave me hours upon hours of grief as a beginner, which I still am essentially.