---
category: questions
description: In which I remind myself how to trigger a Kubernetes cronjob on demand
lastmod: 2021-06-24
slug: kubes-create-cron-instance
tags:
  - cronjob
  - kubernetes
title: How can I create an instance of a Kube cronjob?
---
If you're trying to test out a job, and don't want to wait for however long, you can manually create a job instance.

Assuming our cronjob is called `sports-leaderboard-calc`, you can create it like so:

```bash
> kubectl create job instance-name --from=cronjob/sports-leaderboard-calc
job.batch/instance-name
```

You'll then see the resulting job and pod under `kubectl get job` and `kubectl get pod` respectively.
