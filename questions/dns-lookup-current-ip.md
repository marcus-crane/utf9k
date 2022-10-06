---
title: "How can I look up my current external IP address?"
slug: "dns-lookup-current-ip"
category: "questions"
tags:
- "dig"
- "dns"
---

DNS! It's always the answer for your woes :)

While there are a myriad of HTTP servers for seeing your external IP address, you can also use one of the various DNS based services on offer.

These will give you an IPv4 flag. The `-4` flag isn't necessarily required but without explicitly providing it, you'll be gambling on the return type.

```shell
> dig @resolver3.opendns.com myip.opendns.com +short -4
> dig @resolver4.opendns.com myip.opendns.com +short -4
> dig @ns1-1.akamaitech.net ANY whoami.akamai.net +short -4
> dig @ns1.google.com TXT o-o.myaddr.l.google.com +short -4
```

and likewise, for IPv6

```shell
> dig @resolver1.ipv6-sandbox.opendns.com AAAA myip.opendns.com +short -6
> dig @ns1.google.com TXT o-o.myaddr.l.google.com +short -6
```

You can read more, and see some other providers I left out, in this [detailed StackOverflow thread](https://unix.stackexchange.com/questions/22615/how-can-i-get-my-external-ip-address-in-a-shell-script) but generally speaking, I've found OpenDNS's `resolver4` to be the fastest of the lot on offer.

A very handy thing to have aliased and way quicker than clicking 5 times to navigate to a webpage.
