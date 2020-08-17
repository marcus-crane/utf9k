+++
title = "Emacs"
author = ["Marcus Crane"]
lastmod = 2020-08-17T15:05:56+12:00
tags = ["emacs", "lisp", "cheatsheet"]
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
