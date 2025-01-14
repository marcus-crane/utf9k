---
category: questions
description: In which I remind myself how to restrict a Kube ingress to a specific CIDR range
slug: kubes-ingress-ip-range
tags:
  - allowlist
  - kubernetes
title: How can I restrict which traffic is allowed to pass through a Kube ingress?
---
This one had my scratching my head a bit as I wasn't quite sure if Kubernetes was the right place to do this.

Depending on your use case, it might make sense to terminate traffic before it reaches your cluster but that may have the effect of filtering traffic to other applications if not done properly.

In this instance, the Kubernetes cluster in question makes use of the [NGINX Ingress Controller](https://www.nginx.com/products/nginx-ingress-controller/) and as such, honours a whole bunch of flags.

Before we get into the details, let's set up a small example.

We'll pretend our desktop has an IP address is `192.0.2.3` exactly. We want to allow only a network range of 1 single address so that say; our mobile device with the address `192.0.2.2` can't connect but our desktop can.

In CIDR notation, this would be represented as `192.0.2.3/32`, with the `32` effectively meaning "Just this one address" instead of any other devices on the `192.0.2` range, or broader.

With our address block defined, let's look at an ingress:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-cool-ingress
  annotations:
    nginx.ingress.kubernetes.io/whitelist-source-range: "192.0.2.3/24"
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            backend:
              service:
                name: example-docs
                port:
                  name: http-example-docs
```

Ok, we've allowed our desktop to connect but let's try connecting to this ingress from a device we know isn't allowed, such as our laptop on `192.0.2.6`:

```bash
> curl https://example.com/
<html>
<head><title>403 Forbidden</title></head>
<body>
<center><h1>403 Forbidden</h1></center>
<hr><center>nginx</center>
</body>
</html>
```

Alright, and now from our desktop at `192.0.2.3/24`, which we allowed explicitly:

```bash
> curl example.com
<!doctype html>
<html>
<head>
    <title>Example Domain</title>
[...]
```

Success! We've managed to use nothing but an ingress to block specific traffic but you might wonder, why would I ever use this?

One use case may be exposing applications that require the use of a public endpoint, such as [Microsoft Teams](https://www.microsoft.com/en-ww/microsoft-teams/group-chat-software) or [Slack](https://slack.com).

Often, you can't make use of OAuth but you want to protect against random internet traffic so you can explicitly allow known IP ranges.

With [Azure](https://azure.microsoft.com) for example, they publish a [full list of their active IP ranges](https://www.microsoft.com/en-us/download/details.aspx?id=56519) so if you can't simply make use of a [VNet](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview), this may be the next best thing.
