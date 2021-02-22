---
title: "HTTP2"
date: "2020-11-27"
slug: "learning-http2"
aliases:
- "/notes/learning-http2/"
---

## Why were domain splits common?

It was common to have images on a subdomain and the bulk of the site at the root of a domain such as `nytimes.com` and `img.nytimes.com`

Caching is widely understood as the current value but it doesn't capture the historical context behind the introduction of this tactic.

Another aspect is that the size of headers bloated significantly, sometimes to where cookies associated with a request would be larger than a single TCP packet, which is about 1.5kb.

In order to reduce latency, it made sense to move resources that didn't require cookies to a separate domain, so that those requests didn't inherit excess headers. While not large on a single request, requests for multiple assets would balloon exponentially.

This practice was colloquially referred to as a "cookie-less domain".

## Is HTTPS all about security?

One of the primary considerations of the HTTP2 Working Group was definitely that encouraging HTTPS meant a more secure web

More practically however, there had been previous experiments using WebSockets and SPDY which showed that regular HTTP requests were highly prone to failure due to things like proxies interrupting negotiation.

Often times, an `Upgrade` header was supplied with the initial HTTP negotiation and then shortly both sides upgraded to HTTPS but if HTTPS was used from the outside, there would be a significantly easier time doing protocol negotiation.

There is an overhead to establishing a TLS connection of course but the price pays off in the form of HTTP2 multiplexing and so on.

## A note about averages

I don't recall much about paragraph that I had highlighted, as the text-based export is devoid of the surrounding context. Even though it has nothing to do with HTTP2, it's still a useful reminder

> Once you have your data, look at it in terms of percentiles and not averages. None of your users are average, but some of them have better or worse experiences. Looking at the median performance will tell you that 50% of users have better (or worse) performance than that. Jumping up to the 95th or even 99th percentile shows you some of the worst experiences your users are having. Thinking about performance this way allows you to target certain segments and monitor how your changes affect them.

It's easy to forget but [sometimes your nines are not my nines](http://rachelbythebay.com/w/2019/07/15/giant/)
