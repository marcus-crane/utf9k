# Sampling all the way down
08 August 2022

Recently, I was chatting with a coworker about the accuracy of tracing. In particular, we were discussing [Datadog APM](https://docs.datadoghq.com/tracing/) but the same discussion probably applies equally to [OpenTelemetry](https://opentelemetry.io/) as well as other SaaS provider implementations.

To be clear, when I say accuracy here, I don&#39;t mean the accuracy of what each trace is presenting. The overall picture is more than accurate enough but I would argue that it will never 100% reflect reality, nor is that necessarily something valuable to obtain.

I thought it might be interesting, both for my own future reference but also just as a general discussion to go through some of the various ways that tracing may not reflect reality in its entirety.

![A diagram showing various parts of the Datadog ingestion pipeline. The screenshot is just meant to reflect the sprawl of different bits involved in the pipeline. The actual elements of the pipeline itself aren&#39;t so important for this image.](https://datadog-docs.imgix.net/images/tracing/apm_lifecycle/apm_lifecycle_0.c5017c20b222d73a29b5a1a223f83eb4.png?auto=format)

## The outer wall

First of all, there are surely some portion of requests that will never reach your servers in the first place.

There are probably not a lot in accurate but you might imagine various scenarios like someone attempting to visit your website only for their ISP&#39;s DNS server to throw a fit, or someone browsing on a train only for their connection to get temporarily blackholed as they pass through a concrete tunnel.

These requests won&#39;t even reach you so they won&#39;t even show up in your tracing.

## Application sampling

![A version of the Datadog ingestion pipeline, with a section titled Your instrumented apps being selected. It reflects the part of the pipeline we are going to discuss in this section.](apps.jpg)

So we&#39;ve got requests hitting our application so we capture 100% of those requests as traces and life is easy right?

If only it were so easy.

By default, your service will save [100 traces per second](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=go#in-tracing-libraries-user-defined-rules) unless you explicitly set an override.

Datadog does recommend setting a sample rate of 100%, as you&#39;re only charged for traces indexed and retained beyond the initial 15 minute ingestion window.

You may also have cases where code within your application could be [explicitly causing traces to be discarded](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=go#force-keep-and-drop) if they&#39;re not useful. The inverse is true with retaining specific traces as well.

The above also assumes that your application is configured properly as well to ensure those traces aren&#39;t being emitted into a black hole.

## Agent sampling

![The same Datadog ingestion pipeline shown in the previous image with no changes.](apps.jpg)

Now we go a level high to the process that receives all of your traces.

It has its [own sampling](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=go#in-the-agent) which will only retain ~10 traces/second per agent instance. It&#39;s worth noting that this is overridden by setting your application sample rate explicitly but if you haven&#39;t, you&#39;ll be seeing a portion of reality.

You might also get rate limited, causing traces to probably be discarded, if you have [too many services connecting to a single agent](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L1152), [your agent is using too much memory](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L1082) or [your agent is using too much CPU](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L1091).

![A screenshot of the Datadog service ingestion screen showing a service that has &lt;0.1% of traces sampled due to agent CPU or RAM usage](https://datadog-docs.imgix.net/images/tracing/trace_indexing_and_ingestion/service_traffic_breakdown.a0e421f3503064b7d03f1c3683a67fc4.png?auto=format)

On top of all this, there&#39;s further sampling beyond the &#34;10 traces/second&#34; which is a [max of 200 trace events per second](https://docs.datadoghq.com/tracing/troubleshooting/agent_rate_limits/#maximum-events-per-second-limit). What is a trace event versus a trace you ask? I have no idea!

You should probably also disable the [error sampler](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml#L1068) so it doesn&#39;t impact your picture of reality too for maximum accuracy.

Once again, this too assumes that all of your agent instances are properly configured and aren&#39;t dropping traces off a cliff or else you&#39;ll be missing a portion of reality.

## Ingestion Sampling

![A version of the Datadog ingestion pipeline, with a section titled Ingestion sampling rules being selected. It reflects the part of the pipeline we are going to discuss in this section.](https://datadog-docs.imgix.net/images/tracing/apm_lifecycle/ingestion_sampling_rules.664739c275df2d563b782552d467422e.png?auto=format)

Oh, you thought we were done? We&#39;re just getting started because we&#39;ve got more things to toggle.

So you&#39;ve configured your application and agent perfectly but you&#39;re still not perfectly reflecting reality. [Did you know upstream services can decide whether traces involving your service are discarded or retained?](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/#service-ingestion-summary).

![A screenshot of the Service Ingestion Summary screen showing a service. Visible to the right side are all of the upstream services that have influence on the displayed services trace sampling decisions.](https://datadog-docs.imgix.net/images/tracing/trace_indexing_and_ingestion/service_ingestion_summary.fd43c5c59b2c9273cd84e8467b958194.png?auto=format)

You should probably go talk to your coworkers who maintain upstream services and argue the case for never sampling a single trace. Depending on who controls the credit card, it may not be quite as compelling when considering the huge bill that may be involved.

## Retention Filters

![A version of the Datadog ingestion pipeline, with a section titled Retention filters being selected. It reflects the part of the pipeline we are going to discuss in this section.](https://datadog-docs.imgix.net/images/tracing/apm_lifecycle/retention_filters.5e6f2b4eedbe790caf41a7e090048deb.png?auto=format)

Ok, we&#39;re nearly through the gauntlet because all we&#39;ve got left are retention filters.

So, let&#39;s say that your application sends 100% of traces to Datadog and never gets sampled along the way. That just means your traces are 100% visible for a mere 15 minutes before more sampling kicks in.

Retention filters are the final boss here, where by default, Datadog maintains all errors (across a diverse range of errors codes) and a handful of successful traces based on their latencies, status codes and so on.

Now you could simply mark all traces as being retained beyond that 15 minute window but I hope you&#39;re ready to re-mortgage your house to afford it because indexing ain&#39;t cheap, beyond the defaults chosen by Datadog themselves.

You also need to ensure that no one else has set up any retention filters that might sample your application in any way so fire up those access control policies.

Assuming you&#39;re a rich lister however, you&#39;ve made it to the end... right? All is right with the world and we have a perfectly perfect view of the world.

## The Secret Hidden Boss

Even if you have every single trace ever generated, perfection is still out of reach because the insights into our traces themselves may be skewed, short of our combing through all of the data outselves which is likely not possible at scale.

To understand more, we need to briefly talk about [DDSketch](https://arxiv.org/pdf/1908.10693.pdf) which is Datadog&#39;s &#34;sketching&#34; algorithm.

I hadn&#39;t heard of the term before but just as a sketch in drawing is an approximation of a fleshed out drawing, a sketch in computer science is an approximation of some set of data.

The sketch is not a full accurate set of all existing data points but as an approximation, we can infer things that are roughly true about the source data.

For example, let&#39;s say our true data set contains 1 million values and the data set is effectively a random sampling.

We can take a sample of 1000 values from our source data set and in most cases, the median value within our sample is likely to be about the same as it is in our source data set.

While it may not be 100% precise, depending on our use case, it&#39;s probably good enough without the overhead of having to process the full dataset.

Where this doesn&#39;t work however is with quantiles, or percentiles.

Let&#39;s say we wanted to find the maximum value in our 1 million data points. You could just iterate through all of them and keep track of the highest value you&#39;ve seen. There&#39;s no need to keep every data point in memory, just the current value you&#39;re looking at and the highest value you&#39;ve seen so far.

What about finding the 99% percentile? Well, we need to retain all of the values we&#39;ve seen so far in order to continually compare values we&#39;re seeing against our 1% grouping and further comparing that to our full dataset to ensure that we&#39;re adding and removing the right values.

Such a thing would get quite expensive which is where sketching comes in and it&#39;s what Datadog does to your data.

Rather than perfectly calculating percentiles down to the very last decimal place, traces can be &#34;bucketed&#34; into rounded that are near enough to capture what they represent but we only need to store the bucket values and not every single value that is allocated to a bucket.

![A screenshot showing latency buckets. There are three labelled 100 milliseconds, 102 milliseconds and 104 milliseconds. Traces that a few decimal places outside of each bucket are sampled into their closest buckets. For example, a trace that took 104.4 milliseconds is sampled into the 104 millisecond bucket.](https://imgix.datadoghq.com/img/blog/engineering/computing-accurate-percentiles-with-ddsketch/ddsketch_diagram_6_190911.png?auto=format&amp;fit=max&amp;w=847&amp;dpr=2)

That is effectively the sketch in question and you can read more about the entire process [in this blog post](https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/).

Suffice to say, even if you did manage to capture all traces, the insights you&#39;re getting from them have likely been skewed from reality ever so slightly through the sketching process so you&#39;ll never win unless you handle each trace yourself.

## It doesn&#39;t matter in the end

More than anything, this post is partly a technical guide but mostly fun exercise with the end of goal of saying &#34;Who cares&#34;.

I&#39;m a big fan of the short story [On Exactitude in Science](https://en.wikipedia.org/wiki/On_Exactitude_in_Science). It&#39;s a short story about a kingdom who become so good at map making that they make the most accurate map.

The problem is that it&#39;s 1:1 scale with the kingdom itself in order to capture it in perfect detail. Such a map may be precise but it&#39;s so detailed and unwieldy as to be useless.

I&#39;m a big advocate of the same idea in software.

Partly so I can be lazy but also because beyond a certain point, true accuracy doesn&#39;t really matter.

What you want is just enough detail to know that things are happening but further detail is just diminshing returns.

Let&#39;s say that you want to reflect rate limits for a particular customer.

Does it really matter whether they&#39;re being rate limited 5 times per day or 1000 times per day?

Beyond a certain point, the damage is already done and they&#39;re having a bad time so knowing the true extent doesn&#39;t really change the facts of the situation.

It can be interesting to know for sure and you might want to know but there is probably no such thing as a truly accurate value, whether it&#39;s tracing, logs or something else.

You&#39;re probably better off just getting something good enough and then having a nap or investing that time into other improvements.