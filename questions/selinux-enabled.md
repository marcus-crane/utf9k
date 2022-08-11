---
title: "How can I check if SELinux is enabled?"
slug: "linux-selinux-enabled"
category: "questions"
tags:
- "linux"
- "security"
---

While rolling out some infrastructure stuff, I needed to check if SELinux was enabled for some eBPF tooling which I was able to do like so on an Ubuntu machine

```bash
$ apt install policycoreutils
$ sestatus
SELinux status:                 disabled
```

Another alternative is the following:

```bash
$ apt install selinux-utils
$ getenforce
Disabled
```
