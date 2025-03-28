---
category: questions
description: In which I capture a bit of history about the origin of dotfiles
lastmod: 2021-06-25
lastrev: 2025-02-12
slug: linux-why-do-dotfiles-exist
tags:
  - historical
  - linux
  - macos
title: Why are dot files a thing?
---
Rob Pike explained his understanding in a now-dead Google+ post back in 2012. The use of `.` and `..` had appeared in early versions of the Unix file system, as a quick way to navigate around. They would appear when using `ls` to view the contents of a directory so a line was added that ignored anything where the first character was a period.

This, of course, meant that any files starting with a `.` were also hidden and so began years of bad practices. Rather than think "Where should I store my configuration folder", the easy option became storing a dotfile instead. It may be messy but if no one can see it, is it really so bad?

Rob also points out that configuration could just as easily be stored in `$HOME/cfg` or `$HOME/lib` as was the case in Plan 9. He doesn't dispute that dotfiles have their uses but emphasizes that the file itself serves the purpose. Prepending a dot does not a configuration file make.
