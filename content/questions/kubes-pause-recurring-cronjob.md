---
title: "How can I pause a recurring Kube cronjob?"
slug: "kubes-pause-recurring-cronjob"
category: "questions"
tags:
- "cronjob"
- "kubernetes"
---

If you have a cronjob that you'd like to pause while doing some maintenance for example, you can use the `suspend` attribute.

```bash
> kubectl patch cronjobs does-something -p '{"spec": {"suspend": true }}'
cronjob.batch/does-something patched
```

Once you're done, you can just flip `true` to `false`