---
title: "What is using Port 5000 on macOS Monterey?"
slug: "macos-port-5000-monterey"
category: "questions"
tags:
- "airplay"
- "macos"
- "monterey"
- "receiver"
---

I've been fiddling a bit with [Wails](https://github.com/wailsapp/wails) recently and I gave the unreleased v2 alpha a try.

Out of the box, it binds to Port 5000 and I was surprised to receive a `403 Forbidden`.

Definitely not what I expected.

We can use the `lsof` utility to figure out what's holding on to Port 5000. You'll see in the screenshot below that I use a shell function called `whomport` but under the hood, it's running `lsof -nP i4TCP:5000 | grep LISTEN`. Let's see what the output looks like.

This doesn't really help us much since Control Centre could be anything but a bit of searching brings up that this change was introduced in macOS Monterey.

In particular, there's a new setting under `System Preferences` -> `Sharing` called `Airplay Receiver`.
Let's toggle it off.

Once this is done, you should find Port 5000 instantly freed up. It's weird that Apple would pick such a commonly used port, especially for developers!