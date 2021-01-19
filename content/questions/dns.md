+++
title = "DNS"
date = "2020-11-28"
slug = "dns"
aliases = [
  "/notes/dns-and-bind/"
]
+++

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
