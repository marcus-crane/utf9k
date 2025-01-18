---
category: questions
description: In which I will probably ignore the results and write inefficient software
lastmod: 2024-01-01
slug: golang-stack-heap-vis
tags:
  - golang
  - performance
  - garbagecollection
  - software
  - optimisation
title: How can I visualise stack and heap alloactions in Go?
---
**Source**: [Making a Go program 42% faster with a one character change](https://hmarr.com/blog/go-allocation-hunting/)

You can compile your program with a special flag to see the output of how variables are stored

```shell
$ go build -gcflags=-m *.go 2>&1 | tee inline.txt
# command-line-arguments
./client_redis.go:28:6: can inline NewClient
./client_redis.go:71:25: inlining call to "net/http".(*Client).Do
./client_kafka.go:17:6: can inline (*KafkaClient).getType
./client_kafka.go:24:34: inlining call to strings.Split
./client_kafka.go:73:47: group.GroupId escapes to heap
./client_kafka.go:73:78: clusterName escapes to heap
```

You'll see two terms: "inline" and "escapes to heap"

The former is good, meaning that the variable only exists for the lifetime of the function (ie; it is added to the stack) while the latter is probably not ideal as it means that value persists on the heap until the garbage collector is run.

A common scenario to avoid is accidentally copying values instead of taking a pointer to them. Passing the value copy into an function closure will cause it to be allocated to the heap as well.