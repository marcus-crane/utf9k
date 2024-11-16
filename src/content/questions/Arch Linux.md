---
category: questions
description: Did I tell you I use Arch? Here are some random snippets I found useful
output: src/content/questions
publish: true
slug: arch-linux
tags:
  - linux
  - arch
title: Arch Linux
---
## Skip integrity check for yay package manager

```shell
==> Making package: yacreader-bin 9.14.2-4 (Sat 02 Nov 2024 13:43:07)  
==> Checking runtime dependencies...  
==> Checking buildtime dependencies...  
==> Retrieving sources...  
 -> Found yacreader_9.14.2-1_amd64.deb  
==> Validating source_x86_64 files with sha256sums...  
   yacreader_9.14.2-1_amd64.deb ... FAILED  
==> ERROR: One or more files did not pass the validity check!  
-> error making: yacreader-bin-exit status 1  
-> Failed to install the following packages. Manual intervention is required:  
yacreader-bin - exit status 1
```

```bash
yay -S --mflags --skipinteg <package name>
```