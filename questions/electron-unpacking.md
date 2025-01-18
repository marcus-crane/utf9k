---
category: questions
description: In which I open up my favourite text editor
lastmod: 2024-01-01
slug: electron-unpacking
tags:
  - electron
  - reverseengineering
  - software
title: How can I unpack the contents of an Electron app?
---
It can be interesting to unpack Electron apps to see how they function or just generally try to reimplement a feature in a different language.

You'll first need to open up the application itself which varies from platform to platform. In our case, we'll have a look at the Obsidian macOS app as an example.

```console
$ cd /Applications/Obsidian.app/Contents
$ ls
CodeResources  Info.plist     PkgInfo        _CodeSignature
Frameworks     MacOS          Resources
$ grep 'ElectronAsar' Info.plist -A 2
    <key>ElectronAsarIntegrity</key>
    <dict>
      <key>Resources/app.asar</key>
```

The thing that we're after is an `asar` file which is effectively just a `tar.gz` file by another name.

Here we can see that we need to navigate into the Resources folder to get our hands on `app.asar`.

```console
$ cd Resources
$ pwd
/Applications/Obsidian.app/Contents/Resources
$ ls -la | grep .asar
-rw-r--r--@  1 marcus  admin    948879 10 May 03:35 app.asar
drwxr-xr-x@  3 marcus  admin        96 10 May 03:35 app.asar.unpacked
-rwxr-xr-x@  1 marcus  admin  18912821 10 May 03:35 obsidian.asar
```

We have two `.asar` files which may or may not be the case for whatever you're looking for.

We'll want to grab the bigger `obsidian.asar` as that's where all of the content actually lives but again, this may differ between applications.

Unpacking the asar file is pretty straightforward using the `asar` npm package. Let's extract this file to desktop.

```console
$ cd ~/Desktop
$ npx @electron/asar extract /Applications/Obsidian.app/Contents/Resources/obsidian.asar obsidian-unpack
$ ls obsidian-unpack
app.css           i18n              main.js           sim.js
app.js            i18n.js           package-lock.json starter.html
enhance.js        icon.png          package.json      starter.js
help.html         index.html        public            worker.js
help.js           lib               sandbox
```

While you shouldn't use this to cause too much trouble, I didn't feel too bad using Obsidian as an example. While it is closed source, it's not that much effort to pop open Chrome DevTools and poke around those same files.

Everything is all minified and uglified too. Not exactly a security measure (nor is it intended to be) but most of the effort in poking around is interpreting all this nonsense rather than actually unpacking it in the first place.

Once that's done, you can also repack the asar file like so:

```console
$ npx @electron/asar pack obsidian-unpack obsidian.asar
```