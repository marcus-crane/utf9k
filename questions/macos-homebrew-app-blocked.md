---
category: questions
description: In which I remind myself how to remove the quarantine flag
lastmod: 2020-09-09
slug: macos-homebrew-app-blocked
tags:
  - gatekeeper
  - homebrew
  - macos
title: How can I run a Homebrew application being blocked by Gatekeeper?
---
This issue is particularly annoying and I only just discovered it today for the first time.

Here's an example of what it looks like

![A macOS prompt stating that an application called matterhorn cannot be opened because the developer cannot be verified. The user is given the option to either move the application to the recycle bin or to cancel the interaction.](https://cdn.utf9k.net/questions/macos-port-5000-monterey/gatekeeper.png)

In order to install the application so that it bypasses Gatekeeper, you can rerun `brew cask install` like so:

```shell
> brew cask install --no-quarantine blah
> brew reinstall --no-quarantine blah
```

If you'd like to keep this flag enabled all the time, and honestly you might as well, you can also do the following:

```shell
> export HOMEBREW_CASK_OPTS="--no-quarantine"
> brew cask install blah
```
