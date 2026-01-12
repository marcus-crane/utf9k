---
lastmod: 2026-01-12
slug: claude-code-termux-tmp-tasks
title: How can I get Claude Code to execute background tasks on Termux?
---

At the time of writing, attempting to run Claude Code on Termux works, however any background tasks involved will return an error similar to this:

```bash
EACCES: permission denied, mkdir '/tmp/claude/-data-data-com-termux-files-home/tasks'
```

The issue here is that Claude assumes that the user has permission to create files within `/tmp` which is not true for Termux.

While this should be fixed properly, you can use [PRoot](https://wiki.termux.com/wiki/PRoot) in the meantime as a workaround.

```bash
proot -b /data/data/com.termux/files/usr/tmp:/tmp claude
```

You'll probably want to turn this into a shell alias/function for convenience.
