---
title: "What is the period you sometimes see at the end of a domain name?"
slug: "dns-trailing-period"
description: "In which I note the existence of a sneaky period"
category: "questions"
tags:
- "dns"
- "historical"
- "networking"
---

The root node of DNS has a `null` label

The DNS tree is restricted to 127 levels of depth so you could `only.have.a.domain.name.one.hundred.and.twenty.seven.levels.deep.com`

`.` is used to mark a domain as absolute eg; `utf9k.net.`

Behind the scenes, a full domain name would be `www.google.com.<root/null>`

Some websites, or perhaps more accurately the load balancers and proxies in front of them, don't acknowledge the existence of such a thing.

One high profile example is Amazon. If you visit [https://amazon.com.](https://amazon.com.), you'll see a blank page with the title `x`. Note the period on the end of the URL to see this issue in effect.