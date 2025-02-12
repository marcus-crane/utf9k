---
category: questions
description: In which I capture a bit of history around domain splits
lastmod: 2021-06-25
lastrev: 2025-02-12
slug: http-domain-splits
tags:
  - cookies
  - headers
  - historical
  - http
title: Why did sites split their assets across multiple domains back in the day?
---
It was common to have images on a subdomain and the bulk of the site at the root of a domain such as `nytimes.com` and `img.nytimes.com`

Caching is widely understood as the current value but it doesn't capture the historical context behind the introduction of this tactic.

Another aspect is that the size of headers bloated significantly, sometimes to where cookies associated with a request would be larger than a single TCP packet, which is about 1.5kb.

In order to reduce latency, it made sense to move resources that didn't require cookies to a separate domain, so that those requests didn't inherit excess headers. While not large on a single request, requests for multiple assets would balloon exponentially.

This practice was colloquially referred to as a "cookie-less domain".
