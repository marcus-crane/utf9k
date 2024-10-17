---
title: Kafka
slug: kafka
description: Shipping messages around the place
category: questions
publish: true
output: src/content/questions
tags:
  - kafka
  - events
  - messaging
  - cheatsheet
---
[Apache Kafka](https://kafka.apache.org/) is a streaming platform that can be used to ship messages around the place.

## Calculating (deprecated) DefaultPartititioner assigned partition

When creating a Kafka message, it's possible to set a key in order to ensure that all messages with that same key end up on the same partition.

Previously, the default strategy (aptly named `DefaultPartitioner`) used to be that the message key attached to a message would be hashed using [murmur2](https://books.japila.pl/kafka-internals/Utils/?h=defaultpartitioner#murmur2).

You could use [this calculator](https://murmurhash2.vercel.app/) combined with the [default Kafka seed](https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/utils/Utils.java#L494) (`9747b28c`) to figure out the murmur hash and then modulo by the number of partitions you had.

For example: `0974728 (seed) + 12413413 (input) -> 3242098085 (hash) % 16 (partition) = 5` would mean your message would end up on partition 5