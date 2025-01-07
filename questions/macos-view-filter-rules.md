---
category: questions
description: In which I pour over some routing tables
slug: macos-view-filter-rules
tags:
  - macos
  - software
  - networking
title: How can I view macOS network filter rules?
---

```console
sudo pfctl -s all
```

The `rdr pass` entries might be of interest.

You can then use tools like `lsof` and `pstree` to find out more ie; `lsof iUDP:53535 -n -P`

Config can be flushed with `sudo pfctl -f /etc/pf.conf`