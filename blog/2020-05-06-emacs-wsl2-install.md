---
category: blog
date: 2020-05-06T00:00:00+13:00
description: As if life wasn't already hard enough, we can add more Windows into the mix
slug: emacs-wsl2-install
tags:
  - emacs
  - linux
  - unix
  - windows
  - wsl
title: Setting up Emacs inside of a WSL2 distribution
---
I've never really dedicated myself to Emacs despite being interested in [org mode](https://orgmode.org/) for a little while now.

One barrier to entry is that I had no idea how to install it on my desktop. The more places I have it installed, the quicker I can get comfortable enough to actually use it in my day to day life.

In particular, I'm trying out [Doom Emacs](https://github.com/hlissner/doom-emacs), a lightweight configuration that uses vim-style bindings.

I'm not much of a Vimmer either for the record. I'm fairly comfortable opening it up, moving around with H-J-K-L and editing here and there but I'm not much more productive than that.

Anyway, here's a short guide on how you too can get Emacs up and running on Version 2 of the [Windows for Linux subsystem](https://docs.microsoft.com/en-us/windows/wsl/about)

## An optional prerequisite

Currently, I'm using [X410](https://x410.dev/), an [X Window System](https://en.wikipedia.org/wiki/X_Window_System) for Windows.

If you're not hugely familiar with X or Windowing systems, it's basically just a way of displaying applications outside of a terminal.

In our case, while Emacs renders perfectly fine in the terminal, I like to have it render in its own window, which is what a windowing system provides more or less.

There are plenty of other X servers for Windows but I found this one to be pretty seamless. [VcXsrv](https://sourceforge.net/projects/vcxsrv/) is another popular alternative, although I had some configuration troubles getting it working.

That said, I've done some fiddling and have provided a setup guide for it as well!

Before we get started, feel free to skip the entire window manager portion if you're comfortable with, or prefer, running Emacs in your terminal of course.

## The paid, but pretty seamless way

I should stress that while I've opted to purchase an X server that has some extra bits and pieces, you can use an open source, unpaid alternative.

X410 had some decent recommendations for being an easy setup, and happened to be under a very steep discount so I figured I'd give it a spin. I also ran into some issues with VcXsrv originally as well.

You can find it [in the Windows Store](https://www.microsoft.com/store/productId/9NLP712ZMN9Q) , presumably for any region. It'll require a Microsoft account to purchase which can be a little annoying if you don't already have one.

The installation should be straight forward and I don't remember any flags that require toggling.

Once you've got it installed, fire it up and you should see a silver X icon in your Windows task tray, in the bottom right of your screen.

You'll need to click on it (left or right, it makes no difference) and select "Allow Public Access". See the end of this section for a note on security.

While the original WSL1 exposes things on `http://localhost` (from memory anyway), WSL2 is treated like a network storage.

This means that our Linux distribution is effectively its own "computer" with its own IP address, and so firewall policies come into place, and so on.

When we connect to our X server, it'll be on an internal address such as 172.x.x.x rather than 127.0.0.1.

Beyond that, we should be good to go! You can either read the alternative setup or skip on down to configuring your `DISPLAY` environment variable.

Upon closer inspection, it seems that "Allow public access" does indeed do what it says on the tin.

I can confirm that I was able to forward an emacs session from my work laptop to my home desktop without any prompting. The same should hold true of any other random person on your network.

If you trust your network, and aren't proxying your computer to the internet or something interesting like that, you should be fine. In that case, feel free to jump down to the environment configuration section.

If you'd sleep safer at night with some tighter restrictions, feel free to follow the Windows Firewall configuration steps I've suggested below, under the setup for VcXsrv. They should apply exactly the same, but to the firewall rule for `x410` .

## The free, open source, slightly more involved way

For those of you who prefer to be able to either not pay for your software, or audit it, you'll want to pick up a copy of [VcXsrv](https://sourceforge.net/projects/vcxsrv/files/vcxsrv/) .

It's a little more involved but not much more. I've gone through the gauntlet and figured out some settings that seem to work consistently while still staying relatively secure. That said, feel free to let me know since Windows Firewall isn't an area I tend to stray into often.

Go ahead and install `VcXsrv` and then once that's done, open up your start menu and search for `XLaunch` .

If you run it, it should prompt you for some default settings. You can leave it set to the default (Multiple windows with the display number set to -1 for auto)

Extra settings should stay as the default.

You should get to a panel for extra parameters however, and when you do, you'll want to add `-ac` as a flag. Without it, you'll have some trouble down the line.

Upon finishing up this configuration, you should get a popup from Windows Defender Firewall. You can click Allow but we'll also do some further configuration next.

So, with XLaunch all wrapped up, head to your start menu once again and search for "Windows Defender Firewall with Advanced Security".

Open it up, click `Inbound Rules` and then scroll down until you find `VcXsrv windows server` . You'll likely have about 4 entries, with two for TCP connections and another two for UDP connections.

Personally, I've opted to delete all of them except for one since I don't plan to keep a UDP configuration, nor do I need two types of TCP setup but you can leave them if you like.

You can either double click, or right click and hit properties, to start modifying your firewall rule.

First, under General, change the action to `Allow the connection` if it's not already set as such.

Don't worry, we'll be scoping down the permissions quite a bit. Well, as much as I could figure out how to anyway. I already did more fiddling here, for the sake of this post, than I probably would otherwise.

We don't want to allow just anyone to connect to our display server so under the `Scope` tab, I've added an IP address range.

Under `Local IP Address` , select `These IP addresses` , click `Add` -> `This IP address range` and then enter the following:

```text
From: 172.16.0.0
To  : 172.31.255.255
```

Given that the Windows subsystem is treated like a network device of sorts, our display server will essentially be receiving a connection from a different computer, as far as it's concerned.

In order to mitigate any actual other computers connecting, we're narrowing down the acceptable list of IP addresses to just those that fall within the WSL range.

I suppose if you did have a big internal network, with a computer assigned an address on 172.16.x.x, then they could connect but we'll be doing some interface restrictions just below.

Anyway, repeat the same steps for `Remote IP address` and then hit `Apply your changes` .

At this point, what I wanted to do was reduce the scope of the `Protocols` tab to just TCP on the ports that X server uses (6000 - 6063) but I had no such luck.

It potentially be the case that somewhere between WSL land and your host computer, some ports are proxied to be higher or lower, but honestly, I'm purely speculating based on no actual evidence.

For the interested, the above protocol and port restriction causes the host X server to be unreachable. If you extend the range from 6000 to the highest possible port (65535), it does indeed connect which is why it seems it's relying on a range of ports higher than those 63 to be reachable.

Anyway, enough sidetracking. There is one extra bit of restricting we can do. Under `Protocols and Ports` -> `Protocol type` , change it to just allow `TCP` . You can then navigate to `Advanced` -> `Interface types` -> `Customize` , and you should be able to narrow down the list to just `Local area network` .

Presumably, even if anyone is on the wider network with an IP address that happens to match our WSL2 distro, they still won't be able to connect but I haven't tried this.

With all of that nonsense behind us, we can get on to actually configuring our environment and testing that our setup has worked successfully!

## Configuring your environment

As I briefly referenced in the setup steps for X410, WSL2 is treated as a network device of sorts.

The exact details are besides the point here but just know that WSL2 is effectively a separate computer.

What this means, is that we can't rely on Emacs automatically knowing where to find our X display server (if you're opting to use one)

It'll check inside of our Linux distribution, but we need to point it to our Windows host, since that's where our X server is running.

Doing so is only one step thankfully:

```shell
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
```

Ok, easy enough but what just happened?

By default, you'll have an `/etc/resolv.conf` generated by WSL. Here's what mine looks like on a relatively fresh installation:

```shell
# This file was automatically generated by WSL. To stop automatic generation of this file, add the following entry to /etc/wsl.conf:
# [network]
# generateResolvConf = false
nameserver 172.31.96.1
```

That IP address there, `172.31.96.1` , is the IP address for our Window host machine. At least, from WSL's point of view anyway.

We can use `grep` to get the exact line we want:

```shell
marcus@corbenik:~/code/utf9k$ cat /etc/resolv.conf | grep nameserver
nameserver 172.31.96.1
```

and then use `awk` to get just the IP address by itself:

```shell
marcus@corbenik:~/code/utf9k$ cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'
172.31.96.1
```

Voila! One IP address. What our above command ends up evaluating to, is the following:

```shell
export DISPLAY=172.31.96.1:0.0
```

That IP address can change from time to time however, which is why we want to automate setting it each time.

Our `DISPLAY` environment variable will go away with each new shell so make sure you put it in your shell startup!

All that's let is to check that we can connect as expected. Here's a connection test against X410, using `nc` (netcat)

```shell
marcus@corbenik:~/code/utf9k$ nc -v 172.31.96.1 6000
Connection to 172.31.96.1 6000 port [tcp/x11] succeeded!
```

Why do we use port 6000? It's the first in a range of ports for X window servers, which range from 6000 - 6063. If you note the `0.0` on the end of our `DISPLAY` variable, we're telling it to use display 0, screen 0.

If we wanted to use a different display, or perhaps having a second X server may qualify, we could connect to `<address>:1.0` for display 1, screen 0. Under the hood, that would live on port 6001, which is the base port of 6000 added to our display number (1 in this case).

I didn't really know any of that until writing this so I'd encourage you to do your own research if you want to know more, or double check anything I just claimed, haha.

## Installing Emacs

Now then, we need an actual Emacs distribution but don't get too trigger happy just yet. For the most part, running `sudo apt-get install emacs` will give you an outdated package. In reality, it's probably Emacs 25 which is more than fine.

If you'd like to run a more up to date version, you can do the following to fetch a copy of Emacs 26. If you'd like to be on the bleeding edge (and is what Doom Emacs recommends), you'll probably need to compile Emacs 27 from source :(

```shell
sudo add-apt-repository ppa:kelleyk/emacs
sudo apt-get update
sudo apt-get install emacs26
```

Very nice, you should be all good to go. If you would like to use Doom Emacs as I am, you will need some extra packages which you can find more info about [via the handy documentation](https://github.com/hlissner/doom-emacs/blob/develop/docs/getting_started.org#ubuntu)

If you would like to run Emacs in your terminal, just simply fire up `emacs` . If you wouldd like to run it on your Windows host, and have your X server running and set up, you can run `emacs &` to spawn it, and keep it open as a background process.

Happy text manipulation!

P.S. I wrote this entire post in Doom Emacs, launched from WSL 2 on my home desktop and it works like a charm :)
