+++
title = "Site Reliability Engineering"
author = ["Marcus Crane"]
lastmod = 2020-06-17T21:25:33+12:00
slug = "site_reliability_engineering"
draft = false
+++

We have tools that report on a host of metrics, such as how much time it takes for a code change to be deployed into production (in other words, release velocity) and statistics on what features are being used in build configuration files

“At the end of the day, our job is to keep agility and stability in balance in the system.”

“Unlike a detective story, the lack of excitement, suspense, and puzzles is actually a desirable property of source code.”

(see “Order In the Matter of Knight Capital Americas LLC” [Sec13]

This chapter has repeated one theme over and over: software simplicity is a prerequisite to reliability.

Production Needs, is fundamental to running a stable service. Monitoring

Monitoring enables service owners to make rational decisions about the impact of changes to the service, apply the scientific method to incident response, and of course ensure their reason for existence: to measure the service’s alignment with business goals

In principle, a sufficiently large army of humans could complete testing on each new version using the methods described earlier and achieve the same quality bar for each incremental version. Even though ultimately only the same tests are applied to the same code, that final software version has higher quality in the resulting release that ships annually. This is because in addition to the annual versions, the intermediate versions of the code are also being tested. Using intermediates, you can unambiguously map problems found during testing back to their underlying causes and be confident that the whole issue, and not just the limited symptom that was exposed, is fixed. This principle of a shorter feedback cycle is equally effective when applied to automated test coverage.
