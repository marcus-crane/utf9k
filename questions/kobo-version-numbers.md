---
category: questions
description: In which I take back control of my attention span (as if)
lastmod: 2024-01-01
slug: kobo-version-numbers
tags:
  - kobo
  - hex
title: How can I extract a list of Kobo versions from a device?
---
I used this sometimes for [October](https://github.com/marcus-crane/october) whenever new Kobo devices come out

Identifiers can be found by downloading the relevant firmware update and then opening `KoboRoot/usr/local/Kobo/libnickel.so.1.0.0` in a hex editor

The strings are about 8/10th of the way down but you can jump there by searching `000000003`

You should find some strings like so:

```text
00000000-0000-0000-0000-000000000310    Kobo Touch  00000000-0000-0000-0000-000000000330    Kobo Glo    00000000-0000-0000-0000-000000000340    Kobo Mini   00000000-0000-0000-0000-000000000350    Kobo Aura HD    00000000-0000-0000-0000-000000000360    Kobo Aura   00000000-0000-0000-0000-000000000370    Kobo Aura H2O   00000000-0000-0000-0000-000000000371    Kobo Glo HD 00000000-0000-0000-0000-000000000372    Kobo Touch 2.0  00000000-0000-0000-0000-000000000373    Kobo Aura ONE   00000000-0000-0000-0000-000000000374    Kobo Aura H2O Edition 2 00000000-0000-0000-0000-000000000375    00000000-0000-0000-0000-000000000376    Kobo Clara HD   00000000-0000-0000-0000-000000000377    Kobo Forma  00000000-0000-0000-0000-000000000382    Kobo Nia    00000000-0000-0000-0000-000000000383    Kobo Sage   00000000-0000-0000-0000-000000000384    Kobo Libra H2O  00000000-0000-0000-0000-000000000386    Kobo Clara 2E   00000000-0000-0000-0000-000000000387    Kobo Elipsa 00000000-0000-0000-0000-000000000388    Kobo Libra 2    00000000-0000-0000-0000-000000000389    Kobo Elipsa 2E
```

Depending on how new the device you're after, you may need to download a newer update