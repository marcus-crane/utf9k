---
publish: true
---
# All SRE metrics are an approximation

As SREs, we spend a lot of time fretting about the precision of our measurements but a lot of time, the data that we're querying for insight, is itself already an approximation.

Take for instance, [[Datadog|Datadog]]'s post about [[./Software sketches|Software sketches]] found [here](https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/)

As they explain, it's extremely difficult to calculate percentiles on the fly, unlike averages and sums.

The problem lies in the fact that in order to figure out a percentile, you need to basically touch every value in order to figure out which items lie within the percentile range.

![[Computing Accurate Percentiles With DDSketch#^rw342692983|Computing Accurate Percentiles With DDSketch > ^rw342692983]]

This is in contrast to say; the max or average where you can simply find the middle point  and work your way from there.

With this in mind, any metrics that you find which may have been sampled and approximated, will be even further sampled and approximated.

In this sense, despite what we might think, we often are never looking at an accurate picture of reality.

Of course, it doesn't need to be 100% precise, nor is such a thing possible, but it's just worth acknowledging that things will never be perfect even if you set that as an explict goal so there isn't any point doing so.