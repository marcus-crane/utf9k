---
title: "Why do Playstation 1 discs start at offset 37656?"
slug: "ps1-disc-offset"
description: "In which I remind myself how PS1 discs offset their contents"
category: "questions"
tags:
- "hexedit"
- "playstation"
- "videogames"
oldUrl:
- "/notes/ps1-disc-layout/"
---

The Playstation 1 uses CD-ROMs with the [XA extension](https://en.wikipedia.org/wiki/CD-ROM#CD-ROM_XA_extension).

If you open a PS1 ISO within a hex editor, you'll want to scroll down to `offset 37656`

Within a normal CD (or ISO), it will have a header offset size of `2048`.

It seems a little arbitrary but you can read the table of contents by multiplying the header offset by 16.

For a normal CD, this would be `2048 * 16 = 32768`

In the case of PS1 discs, the header offset size is `2352` for reasons I don't understand so they start at `2352 * 16 = 37632`

Lastly, and somewhat arbitrarily, you'll want to jump forward by an additional `24` bytes in order to come to the starting point of `37565 points`
