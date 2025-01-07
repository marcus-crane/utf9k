---
category: questions
description: In which I remind myself how to test out callback commands
slug: macos-invoke-x-callback-url
tags:
  - macos
  - x-callback-url
title: How can I try out x-callback-url commands on macOS?
---
There is a CLI tool called [xcall](https://github.com/martinfinke/xcall) which seems to be the only way I've seen to actually interact with `x-callback-url` outside of other applications.

It's a bit wonky in that you have to drag `xcall.app` to your `Applications` folder and then either add that to your path or reference the cli tool inside directly.

Here's an example of it in use:

```bash
> /Applications/xcall.app/Contents/MacOS/xcall -url "things:///version" -activateApp NO
{
  "x-things-client-version" : "31310506",
  "x-things-scheme-version" : "2"
}
```

Annoyingly, this will activate the application in question, if it isn't already open, but that is the nature of `x-callback-url` after all.

It will take the foreground view upon opening but further invocations won't trigger it, assuming you use `-activateApp NO`. If you want it to appear, such as when triggering a search, you can use `-activateApp YES` instead.
