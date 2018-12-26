---
title: ipecac
date: 2018-12-17
tags:
  - documentation
  - oas
  - python
links:
  github: https://github.com/marcus-crane/ipecac
  python: https://pypi.org/project/ipecac/
---

[ipecac](https://github.com/marcus-crane/ipecac) is a OAS/Swagger generation tool that I created during my time as a Graduate Site Reliability Engineer at Xero.

Our team has a big focus on automation, so upkeeping a Swagger definition manually wasn't really something we were hugely keen on. We also work on a number of microservices that are scaffolded and destroyed on demand.

If we decide that a particular service is redundant, we can just delete it[^1] but we'd still incur the overhead of having to prune API documentation as a result.

Similarly, if we scaffolded a new microservice, we'd have to go and 

[^1]: These particular microservices live in a single repo but are deployed separately. Deleting a service is quite literally just deleting the folder in question, committing the change and everything is deregistered as a result. If we manually upkept documentation, we'd have to remember to go back and remove the section detailing the now-deleted service.