---
title: "DNS"
slug: "dns"
category: "questions"
tags:
- "dns"
- "historical"
- "networking"
aliases:
- "/notes/dns-and-bind/"
---

## How was DNS originally implemented?

Back in the day, there was just one file: `HOSTS.TXT`.

It contained a name-to-address mapping for every entity within ARPANET.

`/etc/hosts` used to be compiled from `HOSTS.TXT`

It didn't scale for a number of reasons:

- As soon as administrators pulled the latest version of HOSTS.TXT, it would already be out of date
- There was no way to enforce constraints eg; no duplicates on hostnames
- It took a lot of resources to serve it up to every administrator

## What is the period you sometimes see at the end of a domain name?

The root node of DNS has a `null` label

The DNS tree is restricted to 127 levels of depth so you could `only.have.a.domain.name.one.hundred.and.twenty.seven.levels.deep.com`

`.` is used to mark a domain as absolute eg; `utf9k.net.`

Behind the scenes, a full domain name would be `www.google.com.<root/null>`

Some websites, or perhaps more accurately the load balancers and proxies in front of them, don't acknowledge the existence of such a thing.

One high profile example is Amazon. If you visit [https://amazon.com.](https://amazon.com.), you'll see a blank page with the title `x`. Note the period on the end of the URL to see this issue in effect.

## How can I look up my current external IP address?

DNS! It's always the answer for your woes :)

While there are a myriad of HTTP servers for seeing your external IP address, you can also use one of the various DNS based services on offer.

These will give you an IPv4 flag. The `-4` flag isn't necessarily required but without explicitly providing it, you'll be gambling on the return type.

```
> dig @resolver3.opendns.com myip.opendns.com +short -4
> dig @resolver4.opendns.com myip.opendns.com +short -4
> dig @ns1-1.akamaitech.net ANY whoami.akamai.net +short -4
> dig @ns1.google.com TXT o-o.myaddr.l.google.com +short -4
```

and likewise, for IPv6

```
> dig @resolver1.ipv6-sandbox.opendns.com AAAA myip.opendns.com +short -6
> dig @ns1.google.com TXT o-o.myaddr.l.google.com +short -6
```

You can read more, and see some other providers I left out, in this [detailed StackOverflow thread](https://unix.stackexchange.com/questions/22615/how-can-i-get-my-external-ip-address-in-a-shell-script) but generally speaking, I've found OpenDNS's `resolver4` to be the fastest of the lot on offer.

A very handy thing to have aliased and way quicker than clicking 5 times to navigate to a webpage.
