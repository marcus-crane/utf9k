---
title: "How large is a single Prometheus sample?"
slug: "prometheus-sample-size"
category: "questions"
tags:
- "monitoring"
- "prometheus"
- "timeseries"
---

According to the [Storage](https://prometheus.io/docs/prometheus/latest/storage/#operational-aspects) part of the Prometheus documentation, a single sample is somewhere between 1 - 2 bytes.

You can roughly calculate how much storage you'll need with the following formulae:

```text
disk_space = retention_time_in_seconds * samples_ingested_per_second * 2 bytes (take the upper to be safe)
```

By that logic, if we were ingesting 4000 samples per second and we were retaining them for 15 days (the default), it would look something like this:

```text
disk_space = 1296000 * 4000 * 2
disk_space // 10368000000 bytes
disk_space in gigabytes // 10.37 gigabytes
```

Given this, you can see the levers you have are decreasing the amount of sampling going on, reducing the amount of time samples are retained for or simply buying more disk space as you go on.

Remember as well that we took the high end of the estimation and it could be as low as 5.185 if we're extremely lucky on compression and/or presumably we have next to no labels on each sample.

You would also need to factor in many other things such as the [write-ahead log](https://www.robustperception.io/how-much-space-does-the-wal-take-up) but I don't pretend to know what any of these things are.

I just use Prometheus! I don't actually maintain a cluster or anything like that.