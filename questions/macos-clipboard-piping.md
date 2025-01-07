---
category: questions
description: In which I remind myself how to pipe from the macOS clipboard into terminal applications
slug: macos-clipboard-piping
tags:
  - clipboard
  - macos
  - terminal
title: How can I access my clipboard contents inside my terminal?
---
I've known about this tool for some time now but I'm writing about it because I ALWAYS forget to use it.

`pbcopy`, and as I just discovered, `pbpaste` are two tools that are built into macOS.

You can pipe data into the former to add it to your clipboard and similarly, you can use the latter as input into a unix pipeline.

Let's look at an example:

```bash
> echo "see you on the other side" | pbcopy
```

You can now use `Ctrl+V` to paste this text into any GUI application. Saves you having to mouse over to the terminal and highlight text but I still do it every darn time.

We can also use our clipboard contents too as mentioned. You could have copied some text from a GUI application and you want to use it in your terminal.

```bash
# Clipboard contains "utf9k.net" that I copied from my browser
> pbpaste | xargs dig TXT | grep "I see"
utf9k.net.    3444  IN  TXT "I see you snoopin' around ;) If you're after something, you can feel fr\010ee to email me at marcus@utf9k.net"
```

What I'm trying to say is that I have all of the tools at my disposal to avoid [RSI](https://en.wikipedia.org/wiki/Repetitive_strain_injury) but I just need to remember they exist...
