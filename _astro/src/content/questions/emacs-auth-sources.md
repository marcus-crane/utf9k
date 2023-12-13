---
title: "How can I find out where Emacs is checking for passwords?"
slug: "emacs-auth-sources"
description: "In which I try to retrieve my secrets using my text editor"
category: "questions"
tags:
  - "elisp"
  - "emacs"
---

You can see a list of current `auth-sources` by running the following `elisp` function

```lisp
> auth-sources
(password-store "~/.authinfo.gpg")
```
