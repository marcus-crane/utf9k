---
category: questions
description: In which I try to retrieve my secrets using my text editor
output: src/content/questions
publish: true
slug: emacs-auth-sources
tags:
  - elisp
  - emacs
title: How can I find out where Emacs is checking for passwords?
---
You can see a list of current `auth-sources` by running the following `elisp` function

```lisp
> auth-sources
(password-store "~/.authinfo.gpg")
```
