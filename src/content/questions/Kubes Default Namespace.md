---
category: questions
description: In which I remind myself how to set a default namespace for Kubernetes
output: src/content/questions
publish: true
slug: kubes-default-namespace
tags:
  - defaults
  - kubectl
  - kubernetes
title: How can I set a default kubectl namespace for a given cluster?
---
By default, kubectl will search the `default` namespace for any newly added clusters to your context, which can be quite annoying.

You can of course tack on `-n <namespace>` manually or make your own little wrapper around kubectl as I have.

A simpler version though is to just do the following:

```bash
kubectl config set-context --current --namespace=baseball
Context "sports" modified
```

Where `baseball` is the name of your namespace of course.

Going forward, any commands will default to use the `baseball` namespace but you can override them as always with `-n`.
