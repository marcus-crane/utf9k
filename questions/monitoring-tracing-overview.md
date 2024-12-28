---
category: questions
description: In which I remind myself about the difference between monitoring and tracing
output: src/content/questions
publish: true
slug: monitoring-tracing-overview
tags:
  - instrumentation
  - monitoring
title: What is tracing?
---
In the same vein that it's not often feasible to capture all data, all of the time, tracing is concerned with sampling a subset of events such as every 50th incoming request.

Generally most tracing implementations will show you how much time is spent at each step of the way from establishing an SSL connection through to how long is spent talking with any given database.

Distributed tracing is this same idea but... well, distributed.

More specifically, interactions are "tagged", whether it be an HTTP header or an attribute within an RPC call. While those interactions may pass the boundaries of any one service, they can be "stitched" back together by matching up the associated request IDs.

The idea here being that you can trace a request through a system oriented around microservices, as if it were just one regular application.

Given that only a subset of interactions (ie 1 in 100) are sampled, this solves the storage issues presented by full on profiling all of the time.
