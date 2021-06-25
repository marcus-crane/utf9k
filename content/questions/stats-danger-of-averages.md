---
title: "A reminder about the danger of averages"
slug: "stats-danger-of-averages"
category: "questions"
tags:
- "availability"
- "reliability"
- "statistics"
---


I don't recall much about this paragraph that I had highlighted[^book], as the text-based export is devoid of the surrounding context. Even though it has nothing to do with HTTP2, it's still a useful reminder

> Once you have your data, look at it in terms of percentiles and not averages. None of your users are average, but some of them have better or worse experiences. Looking at the median performance will tell you that 50% of users have better (or worse) performance than that. Jumping up to the 95th or even 99th percentile shows you some of the worst experiences your users are having. Thinking about performance this way allows you to target certain segments and monitor how your changes affect them.

It's easy to forget but [sometimes your nines are not my nines](http://rachelbythebay.com/w/2019/07/15/giant/)

[^book]: This was originally a note taken while I was reading through [Learning HTTP/2: A Practical Guide for Beginners](https://www.oreilly.com/library/view/learning-http2/9781491962435/)