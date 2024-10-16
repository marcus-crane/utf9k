---
publish: "true"
tags:
  - software
  - golang
---
# Bounded concurrency using Semaphores

A semaphore, in computer science, is used to limit access to a resource in order to avoid system overload.

For example, let's say you have 1 million items to process.

You could process each item one after the other but it would take `1 million * n seconds`. We could parallelise it but running 1 million jobs side by side may cause a system to crash depending on how expensive the processing job is.

Instead, we can use semaphores to restrict the maximum amount of parallelisation occuring. As an example, running a maximum 50 jobs in parallel where the completion of one job frees up a spot for the next job to execute.

Let's look at two different approaches in Golang.

## Bounded Channels

This approach is the simplest and makes use of channels to block processes

```go
func blah() {
  // do something
}

var semaphore = make(chan int, 10)

func main() {
  for _, thing := range things {
    semaphore <- 1
    go func() {
      blah(thing)
      <-semaphore
    }()
  }
}
```

Each iteration of `things` adds an integer (it could be any type) to the semaphore channel. Once all the available slots (10) are taken up, the range section will effectively block until a new spot in the channel is available.

## Weighted Semaphores

Unlike with bounded channels, you can also use a package to introduce "weighting", where some jobs may cost more. As such, you may want to allocate more than 1 spot to those jobs to reflect the increased cost.

```go
import "golang.org/x/sync/sempahore"

var sem = semaphore.NewWeighted(int64(10))

func main() {
  for _, thing := range things {
    sem.Acquire(ctx, 2) // takes 2 out of 10 slots
    go func() {
      blah(thing)
      sem.Release(2)
    }()
  }
}
```

#software #golang 