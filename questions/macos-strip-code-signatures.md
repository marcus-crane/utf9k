---
category: questions
description: In which I have a nice, clean, insecure binary to play with
slug: macos-strip-code-signatures
tags:
  - macos
  - libraries
  - reverseengineering
title: How can I strip code signatures from macOS binaries?
---
When compiling applications by default, they get invisibly signed in order to protect them from tampering.

This isn't always desirable such as if you want to use [dtruss](https://brendangregg.com/DTrace/dtruss) and other applications to monitor their system calls.

You can check if an application is signed like so:

```console
$ codesign -dv ./main
Executable=/Users/marcus/Code/main
Identifier=a.out
Format=Mach-O thin (arm64)
CodeDirectory v=20400 size=15614 flags=0x20002(adhoc,linker-signed) hashes=485+0 location=embedded
Signature=adhoc
Info.plist=not bound
TeamIdentifier=not set
Sealed Resources=none
Internal requirements=none
```

You can remove the signature like so:

```console
$ sudo codesign --remove-signature ./main
$ codesign -dv ./main
./main: code object is not signed at all
```

At the time of writing, I don't believe this is enough to actually let you run most things due to [System Integrity Protection](https://support.apple.com/en-us/102149) but it's worth a shot.