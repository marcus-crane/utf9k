---
category: questions
description: In which I remind myself how to check out where a request is likely to route
slug: macos-view-route-table
tags:
  - macos
  - networking
  - vpn
title: How can I see my route table?
---
For those of us who are subject to using corporate VPNs, all sorts of wackiness can occur such as `127.0.0.1` being routed first to another country before trying to resolve locally.

You can see both IPv4 and IPv6 routing entries by running `netstat -rn`. Personally, I like to just show IPv4 addresses.

Here's an example of my route table with WiFi (and ethernet) interfaces disabled:

```shell
> netstat -nr -f inet
Routing tables

Internet:
Destination        Gateway            Flags        Netif Expire
127                127.0.0.1          UCS            lo0
127.0.0.1          127.0.0.1          UH             lo0
111.0.0            link#1             UmCS           lo0
```

I've changed the last entry since I don't actually know if it's an internet work address.
