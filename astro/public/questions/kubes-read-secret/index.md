# How can I read a Kubernetes secret?
01 January 0001

Often times, it can be useful to check the value of a Kubernetes secret, to check that it lines up with what an application is receiving. An example might be a randomly generated secret that is shared between multiple Kubernetes resources.

Let&#39;s have a look at a mock secret:

```bash
&gt; kubectl describe secret dummy-secret
Name:         dummy-secret
Namespace:    sports
Labels:       app.kubernetes.io/managed-by=Helm
Annotations:  meta.helm.sh/release-name: sports
              meta.helm.sh/release-namespace: sports

Type:  Opaque

Data
====
MY_FAVOURITE_FRUIT:  12 bytes
```

So here we have a secret called `dummy-secret` and one of the values within it has the name `MY_FAVOURITE_FRUIT`.

We can fetch it like so:

```bash
&gt; kubectl get secret dummy-secret -o jsonpath=&#34;{.data.MY_FAVOURITE_FRUIT}&#34; | base64 --decode
strawberries
```
