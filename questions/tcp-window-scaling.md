---
category: questions
description: In which machines are made safe from being overwhelmed
slug: tcp-window-scaling
tags:
  - software
  - networking
  - tcp
  - unix
title: How can I check whether TCP window scaling is enabled?
---
As discussed in [High Performance Browser Networking](https://hpbn.co/), TCP Flow Control is a pretty important mechanism for ensuring that clients and servers don't get overloaded.

> Flow control is a mechanism to prevent the sender from overwhelming the receiver with data it may not be able to process—the receiver may be busy, under heavy load, or may only be willing to allocate a fixed amount of buffer space. To address this, each side of the TCP connection advertises (Figure 2-2) its own receive window (rwnd), which communicates the size of the available buffer space to hold the incoming data.

While TCP window scaling should be enabled by default on almost every platform these days, you can check that it is enabled on a [[Linux|Linux]] system like so:

```console
$ sysctl net.ipv4.tcp_window_scaling
net.ipv4.tcp_window_scaling = 1
```

In the event that it isn't set, you can fix it like so:

```
$ sudo sysctl -w net.ipv4.tcp_window_scaling=1
net.ipv4.tcp_window_scaling = 1
```