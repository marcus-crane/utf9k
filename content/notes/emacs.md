+++
title = "Emacs"
author = ["Marcus Crane"]
lastmod = 2020-08-18T00:05:45+12:00
tags = ["emacs", "lisp", "faq"]
draft = false
hidedate = true
+++

## How can I compile Emacs from scratch? {#how-can-i-compile-emacs-from-scratch}

```shell
git clone -b emacs-27 git://git.sv.gnu.org/emacs.git
cd emacs
sudo apt-get build-dep emacs
./autogen.sh
./configure --with-x-toolkit=lucid --with-mailutils
make -j4
./src/emacs // test that it's working
sudo make install
```


## Why do some functions have double dashes? {#why-do-some-functions-have-double-dashes}

As an example of what I mean, `org-roam` had seemingly the same function names at one point, despite the only difference being some double dashes

[Here is an example of what I mean](https://github.com/org-roam/org-roam/blob/ba835ef6242caf23e60ab9de1aaf1f25d7e5841f/org-roam-capture.el#L236)

At first glance, the naming differences between `org-roam-capture--get-point` and `org-roam--capture-get-point` seems completely arbitrary

Supposedly, since there is no such thing as internal vs external functions, it's a convention for declaring that a function should be considered private or internal only

<https://emacs.stackexchange.com/questions/42286/double-hyphen-in-elisp-function-names>

I still don't understand the above example since they both have double hyphens


## Why do some lists start with a backtick (`` ` ``) instead of a comma (`'`) {#why-do-some-lists-start-with-a-backtick-----instead-of-a-comma}

Lists that start with a `` ` `` end up having values interpolated.

Compare the following two examples:

```emacs-lisp
'(,(concat "Hello, " "World"), "Nice to meet you?")
; (,(concat "Hello, " "World")
;   ,"Nice to meet you?")
```

As you can see, we got the exact same list that we defined when starting with a `'`

How about using a `` ` ``?

```emacs-lisp
`(,(concat "Hello, " "World"), "Nice to meet you?")
; ("Hello, World" "Nice to meet you?")
```

The `concat` expression is evaluated and we get back two strings!


## How can I find out what places Emacs is checking for my passwords? {#how-can-i-find-out-what-places-emacs-is-checking-for-my-passwords}

```emacs-lisp
auth-sources
(password-store "~/.authinfo.gpg")
```
