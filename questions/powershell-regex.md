---
category: questions
description: In which I remind myself how to search using regexes in Powershell
output: src/content/questions
publish: true
slug: powershell-regex
tags:
  - powershell
title: How can I perform a regex search in Powershell?
---
You can check if a character contains a string by using the cmatch operator like so:

```powershell
$word = "Hello"
$word -cmatch "[A-Z]"
// True
```
