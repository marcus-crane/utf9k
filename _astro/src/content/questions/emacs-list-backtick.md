---
title: "Why do some Emacs lists start with a backtick instead of a comma?"
slug: "emacs-list-backtick"
description: "In which I squint harder at elisp gibberish"
category: "questions"
tags:
  - "elisp"
  - "emacs"
---

Lists that start with a `` ` `` end up having values interpolated.

Compare the following two examples:

```lisp
'(,(concat "Hello, " "World"), "Nice to meet you?")
; (,(concat "Hello, " "World")
;   ,"Nice to meet you?")
```

As you can see, we got the exact same list that we defined when starting with a `'`

How about using a `` ` ``?

```lisp
`(,(concat "Hello, " "World"), "Nice to meet you?")
; ("Hello, World" "Nice to meet you?")
```

The `concat` expression is evaluated and we get back two strings!
