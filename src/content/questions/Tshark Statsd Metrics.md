---
title: "How can I live tail statsd metrics?"
slug: "tshark-statsd-metrics"
description: "In which I have more data than I know what to do with"
category: "questions"
tags:
  - "tshark"
  - "wireshark"
  - "datadog"
---

It's pretty rare but sometimes it can be useful to capture statsd metrics at the source.

Here's an example that uses tshark to capture some dogstatsd metrics on the fly.

```console
$ tshark -f "udp port 8125" -i any -T fields -e data | xxd -p -r
Running as user "root" and group "root". This could be dangerous.
Capturing on 'any'
2 datadog.trace_agent.receiver.rate_response_bytes:82|h|#version:7.44.1,lang:cpp,lang_version:201402,tracer_version:v1.3.6,endpoint_version:v0.4,endpoint:traces_v0.4
datadog.trace_agent.receiver.serve_traces_ms:0.084921|h|#version:7.44.1,lang:cpp,lang_version:201402,tracer_version:v1.3.6,endpoint_version:v0.4,success:true
datadog.trace_agent.stats_writer.flush_duration.avg:66|g|#version:7.44.1
datadog.trace_agent.internal.process_payload_ms.avg:0.21428571428571427|g|#version:7.44.1
datadog.trace_agent.trace_writer.compress_ms.max:7|g|#version:7.44.1
```
