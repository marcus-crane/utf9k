---
title: "How can I perform a regex search in Powershell?"
slug: "powershell-regex"
description: "In which I remind myself how to search using regexes in Powershell"
category: "questions"
tags:
- "powershell"
---

## How can I perform a regex search?

You can check if a character contains a string by using the cmatch operator like so:

```powershell
$word = "Hello"
$word -cmatch "[A-Z]"
// True
```