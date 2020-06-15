+++
title = "Emacs Questions"
author = ["Marcus Crane"]
lastmod = 2020-06-14T12:46:05+12:00
slug = "emacs_questions"
draft = false
+++

Various questions I have about Emacs


## Why do some functions have double dashes? {#why-do-some-functions-have-double-dashes}

As an example of what I mean, `org-roam` had seemingly the same function names at one point, despite the only difference being some double dashes

[Here is an example of what I mean](https://github.com/org-roam/org-roam/blob/ba835ef6242caf23e60ab9de1aaf1f25d7e5841f/org-roam-capture.el#L236)

At first glance, the naming differences between `org-roam-capture--get-point` and `org-roam--capture-get-point` seems completely arbitrary

Supposedly, since there is no such thing as internal vs external functions, it's a convention for declaring that a function should be considered private or internal only

<https://emacs.stackexchange.com/questions/42286/double-hyphen-in-elisp-function-names>

I still don't understand the above example since they both have double hyphens


## Why do some lists start with a backtick (`` ` ``) instead of a comma (`'`) {#why-do-some-lists-start-with-a-backtick-----instead-of-a-comma}

One basically does list interpolation
