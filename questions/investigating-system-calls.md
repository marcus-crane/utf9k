---
category: questions
description: In which I never remember to use this stuff
lastmod: 2024-01-01
slug: investigating-system-calls
tags:
  - software
  - debugging
  - investigation
title: How can I go about investigating system calls?
---
From time to time, it can be useful to explore what your applications are doing.

Sometimes, you may find horrifying things such as with [How Setting the TZ Environment Variable Avoids Thousands of System Calls](https://blog.packagecloud.io/set-environment-variable-save-thousands-of-system-calls/).

## strace

[strace](https://strace.io/) is your main friend here when it comes to seing what processes are up to.

The most common command will be using strace to connect to a specific process.

```console
$ strace -p <pid>
strace: Process 2253233 attached
epoll_pwait(3, [], 128, 0, NULL, 1825221) = 0
epoll_pwait(3, [], 128, 1, NULL, 1825221026013077) = 0
epoll_pwait(3, [], 128, 0, NULL, 1825221) = 0
epoll_pwait(3, [], 128, 1, NULL, 1825221026013077) = 0
futex(0xc000060948, FUTEX_WAKE_PRIVATE, 1) = 1
futex(0xc000060548, FUTEX_WAKE_PRIVATE, 1) = 1
write(7, "datadog.dogstatsd.client.aggrega"..., 385) = 385
```

You'll see a bunch of system calls dumped out which can often be quite hard to parse.

## lsof

Another approach is using `lsof` in order to see what other calls a process is making

```console
$ lsof -p <pid>
COMMAND      PID USER   FD      TYPE DEVICE SIZE/OFF      NODE NAME
features 2253233 root  cwd       DIR   0,89     4096  14194727 /opt/features
features 2253233 root  rtd       DIR   0,89     4096  14194750 /
features 2253233 root  txt       REG   0,89 25723368  14194681 /opt/features/features
features 2253233 root    0u      CHR    1,3      0t0         5 /dev/null
features 2253233 root    1w     FIFO   0,13      0t0 207407931 pipe
features 2253233 root    2w     FIFO   0,13      0t0 207407932 pipe
features 2253233 root    3u  a_inode   0,14        0     13467 [eventpoll]
```

This will give you an idea of open files and then you can track down which ones might stick out

## fs_usage

On macOS, this is a pretty strong tool to leverage.

You'll generally want to filter what is otherwise a pretty noisy stream of events.

```console
$ sudo fs_usage -f filesys 98642
21:20:06.930527  stat64                                 s/Mainframe/Investigating system calls.md    0.000063   Obsidian.2653255
21:20:06.930685  open              F=58       (R_____N___V_)  frame/Investigating system calls.md    0.000050   Obsidian.2719054
21:20:06.930692  fgetattrlist      F=58                                                              0.000006   Obsidian.2719054
21:20:06.930696  getattrlist                            s/Mainframe/Investigating system calls.md    0.000059   Obsidian.2653255
21:20:06.930703  close             F=58                                                              0.000011   Obsidian.2719054
21:20:06.930822  getattrlist                            s/Mainframe/Investigating system calls.md    0.000023   Obsidian.2653255
21:20:06.934896  stat64                                 /Contents/PlugIns/PinShareExtension.appex    0.000014   Obsidian.2653255
```

Here you can see a query for Obsidian (PID 98624) calls filtered by file system access.