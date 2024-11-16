---
category: questions
description: In which I squint harder at elisp gibberish
output: src/content/questions
publish: true
slug: emacs-list-backtick
tags:
  - elisp
  - emacs
title: Why do some Emacs lists start with a backtick instead of a comma?
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
