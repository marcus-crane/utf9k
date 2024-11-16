---
category: questions
description: In which I capture a bit about the benefits of HTTPS that aren't related to security
output: src/content/questions
publish: true
slug: http-non-encryption-benefits
tags:
  - historical
  - http
  - reliability
title: What non-encryption benefits are provided by HTTPS?
---
One of the primary considerations of the HTTP2 Working Group was definitely that encouraging HTTPS meant a more secure web.

More practically however, there had been previous experiments using WebSockets and SPDY which showed that regular HTTP requests were highly prone to failure due to things like proxies interrupting negotiation.

Often times, an `Upgrade` header was supplied with the initial HTTP negotiation and then shortly both sides upgraded to HTTPS but if HTTPS was used from the outside, there would be a significantly easier time doing protocol negotiation.

There is an overhead to establishing a TLS connection of course but the price pays off in the form of HTTP2 multiplexing and so on.
