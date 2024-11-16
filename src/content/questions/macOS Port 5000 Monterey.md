---
category: questions
description: In which I recall how to evict an annoying gremlin
output: src/content/questions
publish: true
slug: macos-port-5000-monterey
tags:
  - airplay
  - macos
  - monterey
  - receiver
title: What is using Port 5000 on macOS Monterey?
---
I've been fiddling a bit with [Wails](https://github.com/wailsapp/wails) recently and I gave the unreleased v2 alpha a try.

Out of the box, it binds to Port 5000 and I was surprised to receive a `403 Forbidden`.

Definitely not what I expected.

![A Brave browser window showing 403 Forbidden when trying to view localhost port 5000](https://cdn.utf9k.net/questions/macos-port-5000-monterey/403-forbidden.png)

We can use the `lsof` utility to figure out what's holding on to Port 5000. You'll see in the screenshot below that I use a shell function called `whomport` but under the hood, it's running `lsof -nP i4TCP:5000 | grep LISTEN`. Let's see what the output looks like.

![A screenshot showing two windows. One is a Terminal with the output of a command called whomport. It shows Control Center listening on Port 5000 with the Process ID 2273. Behind the Terminal is Activity Monitor. Control Center is highlighted and indeed has the same Process ID of 2273.](https://cdn.utf9k.net/questions/macos-port-5000-monterey/whomport.png)

This doesn't really help us much since Control Centre could be anything but a bit of searching brings up that this change was introduced in macOS Monterey.

In particular, there's a new setting under `System Preferences` -> `Sharing` called `Airplay Receiver`.
Let's toggle it off.

![A screenshot showing the Sharing pane of macOS System Preferences. Airplay Receiver has been unticked.](https://cdn.utf9k.net/questions/macos-port-5000-monterey/airplay-sharing.png)

Once this is done, you should find Port 5000 instantly freed up. It's weird that Apple would pick such a commonly used port, especially for developers!
