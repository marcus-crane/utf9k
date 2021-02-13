---
title: "Powershell"
date: "2020-08-29"
slug: "powershell"
aliases:
  - /notes/powershell/
---

## How can I view the methods associated with an object?

Let's say that you have a variable that contains a string:

```powershell
$a = "abc"
```

That's neat but what if I want to view the possible methods that are available on the string object? You can use the Get-Member cmdlet. You can also use the shorthand version gm.

```powershell
$a = "abc"
$a | gm
// Name | MemberType | Definition
// Clone | Method | System.Object Clone() [...]
// ...
// Length | Property | int Length {get;}
$a.Length
// 3
```

You can also view the static methods associated with an object too:

```powershell
"abc" | gm - Static
// Compare | Method | static int Compare(string strA, string strB)...
```

## How can I perform a regex search?

You can check if a character contains a string by using the cmatch operator like so:

```powershell
$word = "Hello"
$word -cmatch "[A-Z]"
// True
Search ActiveDirectory
```

Before you can query AD, you need to first import the Active Directory module

```powershell
import-module activedirectory
```
