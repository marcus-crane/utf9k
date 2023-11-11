---
title: "How can I view the methods associated with an object?"
slug: "powershell-object-methods"
description: "In which I remind myself how to introspect objects in Powershell"
category: "questions"
tags:
  - "powershell"
---

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
