---
title: "How can I get rid of the default application folders that ship with my Linux distro?"
slug: "linux-disable-stock-folders"
description: "In which I remind myself how to disable default application folders in Linux"
category: "questions"
tags:
  - "housekeeping"
  - "linux"
  - "xdg"
---

While you can delete stock folders such as `Templates`, `Public` and so on, they'll still appear in the sidebar of your file explorer.

The good news is that they're pretty easy to disable.

Referring to the [xdg-user-dirs](https://freedesktop.org/wiki/Software/xdg-user-dirs/#settings) manual shows us that there is a configuration file of "well known" user directories that lives at `$HOME/.config/user-dirs.dirs` by default

Simply deleting the various entries inside might break a number of things but if you look closely, you'll spot that changing a directory to point to your home directory will disable it

For example:

```shell
> cat $HOME/.config/user-dirs.dirs
XDG_TEMPLATES_DIR="$HOME" # templates is now disabled
```

This should cause the Templates folder to disappear from the sidebar of Nautilus although you might need to restart first.
