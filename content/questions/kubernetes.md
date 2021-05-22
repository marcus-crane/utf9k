---
title: "Kubernetes"
slug: "kubernetes"
category: "questions"
tags:
- "cicd"
- "deployment"
---

## How can I pause a recurring cronjob?

If you have a cronjob that you'd like to pause while doing some maintenance for example, you can use the `suspend` attribute.

```bash
> kubectl patch cronjobs does-something -p '{"spec": {"suspend": true }}'
cronjob.batch/does-something patched
```

Once you're done, you can just flip `true` to `false`

## How can I create an instance of a cronjob?

If you're trying to test out a job, and don't want to wait for however long, you can manually create a job instance.

Assuming our cronjob is called `sports-leaderboard-calc`, you can create it like so:

```bash
> kubectl create job instance-name --from=cronjob/sports-leaderboard-calc
job.batch/instance-name
```

You'll then see the resulting job and pod under `kubectl get job` and `kubectl get pod` respectively.

## How can I set a default namespace for a given cluster?

By default, any new clusters will search the `default` namespace which can be quite annoying.

You can of course tack on `-n <namespace>` manually or make your own little wrapper around kubectl as I have.

A simpler version though is to just do the following:

```bash
kubectl config set-context --current --namespace=baseball
Context "sports" modified
```

Where `baseball` is the name of your namespace of course.

Going forward, any commands will default to use the `baseball` namespace but you can override them as always with `-n`.
