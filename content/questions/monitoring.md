+++
title = "Monitoring"
date = "2020-12-15"
slug = "monitoring"
aliases = [
  "/notes/prometheus-up-and-running/"
]
+++

## What is profiling?

An initial thought might be that it would help to capture all context about everything, all of the time but that would soon get very expensive to store.

Profiling takes the approach of capturing as much context as possible for a certain period of time, generally for use in debugging.

Continually gathering information, such as how long each function took to execute, in a production environment would very quickly impact end users so this is best suited for validating targeted assumptions of what might be going wrong.

## What is tracing?

In the same vein that it's not often feasible to capture all data, all of the time, tracing is concerned with sampling a subset of events such as every 50th incoming request.

Generally most tracing implementations will show you how much time is spent at each step of the way from establishing an SSL connection through to how long is spent talking with any given database.

Distributed tracing is this same idea but... well, distributed.

More specifically, interactions are "tagged", whether it be an HTTP header or an attribute within an RPC call. While those interactions may pass the boundaries of any one service, they can be "stitched" back together by matching up the associated request IDs.

The idea here being that you can trace a request through a system oriented around microservices, as if it were just one regular application.

Given that only a subset of interactions (ie 1 in 100) are sampled, this solves the storage issues presented by full on profiling all of the time.

## What is worth instrumenting?

Services and libraries have different needs. Further, not all services are alike in the types of work they perform or what types of work are important to measure

### Online-serving systems

These are services that have a person or client waiting for a response.

As such, the [RED method](https://www.weave.works/blog/the-red-method-key-metrics-for-microservices-architecture/) captures key metrics which are Requests, Errors and Duration.

It's worth noting that there may be a tendency to exclude failed requsts when capturing duration but this temptation should be avoided.

In the event that you only had successes, a long running request that ultimate failed after 15 seconds would be excluded for example, despite any reasonable initial assumption that errors may tend towards having a lower duration.

### Offline-serving systems

These are services that operate continually in the background. Their workloads are generally in batches and may utilise multiple steps, buffered with a queuing system.

The [USE method](http://www.brendangregg.com/usemethod.html) captures key metrics which are Utilisation, Saturation and Errors.

### Batch jobs

Similar to offline-serving systems, these may be kicked off upon request (ie sending an email in the background) or something akin to a cronjob.

Given that they aren't suitable for serving a persistent HTTP endpoint for scraping, it's best to push metrics to a monitoring solution such as Prometheus upon work being completed.
