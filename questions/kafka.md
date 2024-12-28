---
category: questions
description: Shipping messages around the place
output: src/content/questions
publish: true
slug: kafka
tags:
  - kafka
  - events
  - messaging
  - cheatsheet
  - kafka-go
  - sarama
  - golang
title: Kafka
---
[Apache Kafka](https://kafka.apache.org/) is a streaming platform that can be used to ship messages around the place.

## Calculating (deprecated) DefaultPartititioner assigned partition

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

## Calculating hash strategy for kafka-go

Nowadays, the default partition is apparently [UniformStickyPartitioner](https://cwiki.apache.org/confluence/display/KAFKA/KIP-794%3A+Strictly+Uniform+Sticky+Partitioner) although at the time of writing [IBM/sarama](https://github.com/IBM/sarama) defaults to [HashPartitioner](https://github.com/IBM/sarama/blob/main/config.go#L529) and [segmentio/kafka-go](https://github.com/segmentio/kafka-go) has round-robin as [its default](https://github.com/segmentio/kafka-go/blob/main/writer.go#L96).

When it comes to the hash strategy, I recently found myself wondering how to determine the assigned partition for a program using kafka-go's hash partition.

This lead to me slicing up the [default hasher implementation](https://github.com/segmentio/kafka-go/blob/main/balancer.go#L153-L181) into a small [Go playground program](https://go.dev/play/p/k-3AgdzKjB0).

**NOTE**: While I've manually run the [testcases](https://github.com/segmentio/kafka-go/blob/main/balancer_test.go#L10-L50) through this small program and they all passed, I haven't exercised it in any depth. It's just a reference for myself in the future. You should probably use the actual library directly.

```go
package main

import (
	"fmt"
	"hash"
	"hash/fnv"
)

func main() {
	partitions := generatePartitions(3)
	key := "blah"

	hasher := fnv.New32a().(hash.Hash32)
	hasher.Reset()

	if _, err := hasher.Write([]byte(key)); err != nil {
		panic(err)
	}

	partition := int32(hasher.Sum32()) % int32(len(partitions))
	if partition < 0 {
		partition = -partition
	}
	fmt.Println(partition)
}

func generatePartitions(partitionCount int) []int {
	partitions := []int{}
	for i := 0; i <= partitionCount-1; i++ {
		partitions = append(partitions, i)
	}
	return partitions
}
```