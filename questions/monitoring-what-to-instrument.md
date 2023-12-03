---
title: "What is worth instrumenting?"
slug: "monitoring-what-to-instrument"
description: "In which I remind myself what is a good idea to instrument"
category: "questions"
tags:
- "instrumentation"
- "monitoring"
---

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
