---
category: questions
description: Figuring out where my messages went
lastmod: 2024-11-16
lastrev: 2025-01-27
slug: kafka-default-partitioner
tags:
  - kafka
  - events
  - messaging
title: Kafka Default Partitioner
---
When creating a Kafka message, it's possible to set a key in order to ensure that all messages with that same key end up on the same partition.

Previously, the default strategy (aptly named `DefaultPartitioner`) used to be that the message key attached to a message would be hashed using [murmur2](https://books.japila.pl/kafka-internals/Utils/?h=defaultpartitioner#murmur2).

You could use [this calculator](https://murmurhash2.vercel.app/) combined with the [default Kafka seed](https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/utils/Utils.java#L494) (`9747b28c`) to figure out the murmur hash and then modulo by the number of partitions you had.

For example: 

```
0974728 (seed) + 12413413 (input) -> 3242098085 (hash)
3242098085 (hash) % 16 (partition)
= 5
```

This would mean that a message with a key of `12413413` sent to a topic with 16 partitions, would be assigned to Partition 5
