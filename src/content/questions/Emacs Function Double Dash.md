---
category: questions
description: In which I squint heavily to notice any difference
output: src/content/questions
publish: true
slug: emacs-function-double-dash
tags:
  - elisp
  - emacs
title: Why do some Emacs functions have double dashes?
---
As an example of what I mean, `org-roam` had seemingly the same function names at one point, despite the only difference being some double dashes

[Here is an example](https://github.com/org-roam/org-roam/blob/ba835ef6242caf23e60ab9de1aaf1f25d7e5841f/org-roam-capture.el#L236)

At first glance, the naming differences between `org-roam-capture--get-point` and `org-roam--capture-get-point` seems completely arbitrary

Supposedly, [since there is no such thing as internal vs external functions](https://emacs.stackexchange.com/questions/42286/double-hyphen-in-elisp-function-names), it's a convention for declaring that a function should be considered private or internal only

I still don't understand the above example since they both have double hyphens
