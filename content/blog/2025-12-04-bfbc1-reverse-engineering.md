---
category: blog
date: 2025-12-04T23:30:00+13:00
description: A good game and a good archeological dig
slug: bfbc1-reverse-engineering
title: Exploring the game files of Battlefield Bad Company
---

I finally got around to finishing the original [Battlefield: Bad Company](https://en.wikipedia.org/wiki/Battlefield:_Bad_Company) on PlayStation 3 a few weeks ago which has been a long time coming given that the sequel, Battlefield: Bad Company 2, is constantly in my top 10 list[^1].

A few times now, I've been on [The Cutting Room Floor](https://tcrf.net/The_Cutting_Room_Floor) wiki and thought to myself "I wish there was a page for Bad Company" and last Sunday, I finally did something about it.

My PlayStation 3 copy was [questionably obtained](https://vimm.net)[^2] and I still had the game files on my desktop so I decided to start digging around only to be met with some completely foreign game files containing the extension `.fbrb`.

A quick search later and I discovered the [BFBC2 Toolkit](https://github.com/AnirohDev/FBOneTools) which is a whole Windows GUI for decoding the game files of Battlefield: Bad Company 2. It also happens to work on the original as well, given that they both ran on Version 1 of the original Frostbite engine.

It took me a bit to figure out how to actually reasonable about the UI but eventually, I figured out how to load an FBRB file, which presents a file tree. Here's an example screenshot showing one of my favourite weapons in the game, the AN-94. It sounds really good when you fire it.

![A screenshot of the BFBC2 Toolkit UI showing a graphic of the AN94 assault rifle. A directory tree is visible on the left sidebar. The gun graphic is visible in the centre. An event log is visible in the bottom centre. File properties are visible on the right sidebar.](https://cdn.utf9k.net/blog/bfbc1-reverse-engineering/an94.png)

Despite being the PlayStation 3 copy of the game, I pretty quickly discovered that the Xbox 360 copy was completely identical, in that all icons for all platforms were visible in both editions. The only real difference were the file names for textures, being `.ps3texture` and `.xenontexture`[^3] respectively.

![A screenshot of the BFBC2 Toolkit UI showing a graphic of an Xbox Controller](https://cdn.utf9k.net/blog/bfbc1-reverse-engineering/xbox-controller.png)

There are lots of other interesting graphics such as the various sprite sheets that make up the game menus. Not unlike the old webpage optimisation trick, icons are all loaded onto a single image with the game knowing which coordinates to slice out of the sheet for any given icon.

![A screenshot of the BFBC2 Toolkit UI showing a sprite sheet with every weapon icon in the game](https://cdn.utf9k.net/blog/bfbc1-reverse-engineering/weapon-spritesheet.png)

As for actual discoveries, I made a few:

There were a handful of unused icons in the game such as this one titled `elodn` showing a woman giving a thumbs down.

![A screenshot of the BFBC2 Toolkit UI showing a small icon of a woman giving a thumbs down](https://cdn.utf9k.net/blog/bfbc1-reverse-engineering/thumbs-down.png)

Another discovery was that the voiceover files for the character "Miss July" were all labelled "Miss June", suggesting the character had a name change part way through development.

![A screenshot of the BFBC2 Toolkit UI showing an XML file. It contains references to audio files. Two are selected that have a path containing the name MissJune](https://cdn.utf9k.net/blog/bfbc1-reverse-engineering/miss-june.png)

I wonder if they had to re-record lines?

Perhaps the most interesting discovery I made was to do with the game's level files. They start at 01 and end at 08 but curiously, there is no entry labelled 04, suggesting that an entire extra level was originally intended but had to be cut.

Given all this, I finally crossed "Make some unknown discoveries in a game I like" off my bucket list and contributed [this page](https://tcrf.net/Battlefield:_Bad_Company) to The Cutting Room Floor wiki.

I even made a [few new discoveries in the PC version of Battlefield: Bad Company 2](https://tcrf.net/Battlefield:_Bad_Company_2#Unused_Graphics) and I've still got more files to dig through (as well as the console versions) so I'm just getting started!

[^1]: A lot of the reasons why are redundant nowadays and are purely nostalgia since the multiplayer servers have shut down. I still really enjoyed it while it was live.

[^2]: I had legally purchased a copy a while back so I suppose I had a license technically

[^3]: Xenon was the original codename for the Xbox 360 CPU during development. Given the usual timeline for developing a videogame, it makes sense that the game probably started well before an official name was nailed down for the Xbox 360.