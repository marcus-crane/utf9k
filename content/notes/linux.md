+++
title = "Linux"
date = 2020-09-18
+++

## Why are dot files a thing?

Rob Pike explained his understanding in a now-dead Google+ post back in 2012. The use of `.` and `..` had appeared in early versions of the Unix file system, as a quick way to navigate around. They would appear when using `ls` to view the contents of a directory so a line was added that ignored anything where the first character was a period.

This, of course, meant that any files starting with a `.` were also hidden and so began years of bad practices. Rather than think "Where should I store my configuration folder", the easy option became storing a dotfile instead. It may be messy but if no one can see it, is it really so bad?

Rob also points out that configuration could just as easily be stored in `$HOME/cfg` or `$HOME/lib` as was the case in Plan 9. He doesn't dispute that dotfiles have their uses but emphasizes that the file itself serves the purpose. Prepending a dot does not a configuration file make.

## Why do some of my applications suddenly get muted?

I recently ran into this issue when switching my distro to [Manjaro](https://manjaro.org).

I'd find that whenever a different audio source would start playing such as a voice call, notification or even a silent video on the web, my Spotify audio would drop to 0 instantly

In order to fix this, all I needed to do was unload the `module-role-cork` module presumably used by `pulseaudio`

You can toggle via your terminal to test that it works like so:

```shell
> pactl unload-module module-role-cork # disabled, try spotify and another audio source
> pactl load-module module-role-cork   # enabled, spotify should be interrupted
```

While I'm not sure how long `unload-module` persists (I'm guessing until the next restart), you can achieve the same effect by commenting out the module in the configuration for `pulseaudio` like so:

```shell
> grep "cork" /etc/pulse/default.pa -B 3
### Cork music/video streams when a phone stream is active
# Disabling this allows audio streams to run over the top of each other
# Before this, a newer stream (notification, video) would mute Spotify
#load-module module-role-cork
```

Once that's done, you should be good to go. It seems to work as expected for me anyway.

## How can I get rid of the default application folders in eg; Nautilus?

While you can delete stock folders such as `Templates`, `Public` and so on, they'll still appear in the sidebar of your file explorer.

The good news is that they're pretty easy to disable.

Referring to the [xdg-user-dirs](https://freedesktop.org/wiki/Software/xdg-user-dirs/#settings) manual shows us that there is a configuration file of "well known" user directories that lives at `$HOME/config/user-dirs.dirs` by default

Simply deleting the various entries inside might break a number of things but if you look closely, you'll spot that changing a directory to point to your home directory will disable it

For example:

```shell
> cat $HOME/.config/user-dirs/dirs
XDG_TEMPLATES_DIR="$HOME" # templates is now disabled
```

This should cause the Templates folder to disappear from the sidebar of Nautilus although you might need to restart first.