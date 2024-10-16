---
publish: true
---
# PID 1 is important to manage

When an application recieves the [[SIGTERM|SIGTERM]] signal, it starts to wind up the process.

If an application refuses to wrap up its operation, it is then often prompted against with [[SIGKILL|SIGKILL]] which will terminate the process entirely.

![[How We Reduced 502 Errors by Caring About PID 1 in Kubernetes#^rw336937686|How We Reduced 502 Errors by Caring About PID 1 in Kubernetes > ^rw336937686]]

The former is what you would often consider to be a [[Graceful Termination|Graceful Termination]] and ensures that requests aren't killed halfway through processing for example.

If you're not careful, applications may start up [[Zombie Process|Zombie Processes]] which can result in an application ignoring `SIGTERM`s and being shut down via `SIGKILL`.

This may result in 502s for a period of time as Gitlab discovered with one of their services which was constantly breaching its [[SLO|SLO]]

![[How We Reduced 502 Errors by Caring About PID 1 in Kubernetes#^rw336938079|How We Reduced 502 Errors by Caring About PID 1 in Kubernetes > ^rw336938079]]
A common mistake for Docker containers is using the `CMD` instruction in shell form.

An example of that looks like this:

```dockerfile
CMD "/app --mode worker"
```

The trouble with shell form is that our application is implicitly started with `/bin/sh -c`

As `sh` is PID 1, our application is not aware of any `SIGTERM` instructions and so it is not given a chance to shut down gracefully.

The alternative form, and what we should use, is array form.

```dockerfile
CMD ["/app", "--mode", "worker"]
```

With this, our application is started as PID 1 with no shell intermediary, allowing it to receive and react to `SIGTERM` requests.

#docker #kubernetes #unix #gitlab #slos #softwareexcellence 