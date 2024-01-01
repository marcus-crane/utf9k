---
title: "How can I check whether a server may be unnecessarily slow-starting?"
slug: "tcp-slowstart"
description: "In which machines may not be running the marathon you think they are"
category: "questions"
tags:
  - "software"
  - "networking"
  - "tcp"
  - "unix"
---

As discussed in [High Performance Browser Networking](https://hpbn.co/), TCP Slow-Start is an important element of the TCP protocol as it ensures that both client and server start out with an acceptable throughput, so as to not overwhelm one another.

Very quickly, they both increment their windows until they're at the allowed maximum.

For server to server communication however, this can cause a performance impact as long-lived TCP connections that idle are generally subject to this window.

It doesn't necessarily provide any value like with a client and server however as the network conditions are generally always the same with bandwidth never varying

If you are running a Linux system, you can check whether Slow-Start after idle is active like so:

```console
$ sysctl net.ipv4.tcp_slow_start_after_idle
net.ipv4.tcp_slow_start_after_idle = 1
```

In the event that it is set, you can disable it:

```
$ sudo sysctl -w net.ipv4.tcp_slow_start_after_idle=0
net.ipv4.tcp_slow_start_after_idle = 0
```