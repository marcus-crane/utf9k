---
category: questions
description: In which I pull some certificates out of their hiding spot
lastmod: 2024-01-01
slug: macos-extracting-signatures
tags:
  - macos
  - codesigning
  - certificates
  - x509
title: How can I extract macOS signatures from binaries?
---
From time to time, it can be useful to know who signed a given macOS application.

You can do that like so:

```console
$ cd /tmp/codesign
$ codesign --display --extract-certificates $(which curl)
// This will create some files in the current directory
$ ls
codesign0 codesign1 codesign2
$ qlmanage -c public.x509-certificate -p codesign*
```

Running `qlmanage` will pop open a Finder preview window with the metadata for the attached signature