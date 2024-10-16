---
publish: true
---
https://sirupsen.com/metrics

-   **Web Backend (e.g. Django, Node, Rails, Go, ..)**
    -   Response Time `p50`, `p90`, `p99`, `sum`, `avg` †
    -   Throughput by HTTP status †
    -   **Worker Utilization** [1](https://sirupsen.com/metrics#user-content-fn-web-utilization)
    -   Request Queuing Time [2](https://sirupsen.com/metrics#user-content-fn-web-queue)
    -   Service calls †
        -   Database(s), caches, internal services, third-party APIs, ..
        -   Enqueued jobs are important!
        -   [Circuit Breaker tripping](https://sirupsen.com/napkin/problem-11-circuit-breakers) † `/min`
        -   Errors, throughput, latency `p50`, `p90`, `p99`
    -   Throttling †
    -   Cache hits and misses `%` †
    -   CPU and Memory Utilization
    -   Exception counts † `/min`
-   **Job Backend (e.g. Sidekiq, Celery, Bull, ..)**
    -   Job Execution Time `p50`, `p90`, `p99`, `sum`, `avg` †
    -   Throughput by Job Status `{error, success, retry}` †
    -   Worker Utilization [3](https://sirupsen.com/metrics#user-content-fn-job-utilization)
    -   **Time in Queue** † [4](https://sirupsen.com/metrics#user-content-fn-job-time-in-queue)
    -   **Queue Sizes** † [5](https://sirupsen.com/metrics#user-content-fn-job-queue-size)
        -   Don’t forget scheduled jobs and retries!
    -   Service calls `p50`, `p90`, `p99`, `count`, `by type` †
    -   Throttling †
    -   CPU and Memory Utilization
    -   Exception counts † `/min`

_† Metrics where you **need** the ability to slice by `endpoint` or `job`,`tenant_id`, `app_id`, `worker_id`, `zone`, `hostname`, and `queue` (for jobs). This is paramount to be able to figure out if it’s a single endpoint, tenant, or app that’s causing problems._

On a related note, you should also look into [[Canonical log line pattern|Canonical log line pattern]]

#dashboards #observability #monitoring #reliability