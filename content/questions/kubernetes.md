---
title: "Kubernetes"
slug: "kubernetes"
category: "questions"
tags:
- "cicd"
- "deployment"
keywords:
- "kubernetes"
- "cronjobs"
- "cronjob"
- "create cronjob"
- "pause cronjob"
- "suspend cronjob"
- "set namespace"
- "read secret"
- "curl"
- "networkpolicy"
- "security"
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

## How can I read a Kubernetes secret?

Often times, it can be useful to check the value of a Kubernetes secret, to check that it lines up with what an application is receiving. An example might be a randomly generated secret that is shared between multiple Kubernetes resources.

Let's have a look at a mock secret:

```bash
> kubectl describe secret dummy-secret
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
> kubectl get secret dummy-secret -o jsonpath="{.data.MY_FAVOURITE_FRUIT}" | base64 --decode
strawberries
```

## How can I test connectivity within my namespace?

Often times, you might want to test connectivity to a container but without doing so from within the container itself. You could just into a neighbouring pod but it may not have networking tools (ie tools) or even potentially network connectively if there's a [network policy](https://kubernetes.io/docs/concepts/services-networking/network-policies/) in the mix.

A quick way to deploy a curl container has been shared before [in the Kubernetes docs](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/#securing-the-service) and it looks like this:

```bash
> kubectl run curl --image=radial/busyboxplus:curl -i --tty
Unable to use a TTY - container curl did not allocate one
If you don't see a command prompt, try pressing enter.
```

I think the output looks something like that but this is a bit more involved as my work makes use of [policies](https://docs.microsoft.com/en-us/azure/governance/policy/concepts/policy-for-kubernetes) in our cluster.

Now normally I just keep a file called `curl-debug.yml` sitting around my hard drive and deploy it using `kubectl apply -f curl-debug.yml`
 but you can also deploy it inline using a hideously log container override.

You may need more (or less) override fields depending on eg; if your network policy only allows pods with certain annotations or metadata to connect to what you're testing.

An unprivileged curl pod would look something like this. Note that I've removed `-i --rm --tty` as it always seems buggy to me and I much prefer to just manually run `kubectl exec -it curl -- sh` than have my terminal hanging.

```bash
> kubectl run curl --image=radial/busyboxplus:curl --overrides='{ "spec": { "securityContext": { "runAsUser": 1000, "runAsGroup": 1000, "seccompProfile": { "type": "RuntimeDefault" }}, "containers": [{ "name": "curl", "image": "radial/busyboxplus:curl", "command": [ "/bin/sh", "-c", "--" ], "args": [ "while true; do sleep 30; done; " ], "securityContext": { "runAsNonRoot": true, "allowPrivilegeEscalation": false }}]}}
pod/curl created
```

and for those who don't love huge eyesores, here's the contents of the pod spec I alluded to earlier:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: "curl"
  labels:
    app: "my-cool-app"
    service: "some-other-identifier"
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: "curl"
    image: "radial/busyboxplus:curl"
    command: [ "/bin/sh", "-c", "--" ]
    args: [ "while true; do sleep 30; done;" ]
    securityContext:
      runAsNonRoot: true
      allowPrivilegeEscalation: false
```

Ah right, the actual point of the question. Once you have curl running, and you're inside the container, you can then use `curl` to test out the connectivity of things.

For example, earlier today I was moving a container to a new cluster and it was using the URL that the ingress was listening to. Let's use `https://sports.example.com` in this case and say that the service was called `sports`.

The ingress URL changed from being internally accessible to publically accessable, although behind an OAuth2 proxy of course.

I noticed this change by doing the following:

```bash
> curl --head --location http://sports
HTTP/1.1 200 OK
Server: nginx
[...]
```

Ok, it resolves the internal service perfectly fine. How about the public one?

```bash
> curl --head --location https://sports.example.com
HTTP/1.1 302 Moved Temporarily
Location: https://example.com/_oauth2/start?rd=https://sports.example.com
[...]

HTTP/1.1 302 Found
Location: https://login.microsoftonline.com/common/oauth2/authorize?a_very_long_string
[...]

HTTP/1.1 200 OK
Content-Length: 186288
[...]
```

Now, I don't even have to look at the payload to infer that we probably just hit an OAuth2 login page and that's exactly what was happening.

In the previous cluster, we were using internal links to the external OAuth proxy is never involved. Admittedly, this was rationalised as "DNS just magically knows to resolve the request to the service right next door" and perhaps this is true but maybe not!

Anyway, a third case that you might run into is the following:

```bash
> curl --head --location http://something
# the command just sits with no output forever!
```

If you check my `curl-debug.yaml`, I have specific labels that the network policy looks for. Because this curl pod is missing them, it can't make any requests.

This could be anything from protocol (TCP/UDP), port number, whitelisted namespaces, whitelisted resources and so on. If you have this problem, either check your various log messages for reference to a required policy or check for an existing one that needs to be updated.

Doing a search for "kind: NetworkPolicy" should help narrow down which files are relevant and/or if they even exist in the first place.

Happy debugging!

## How can I restrict an ingress to only receive traffic from a specific IP range?

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

Ok, we've whitelisted our desktop but let's try connecting to this ingress from a device we know isn't whitelisted such as our laptop on `192.0.2.6`:

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

Alright, and now from our desktop at `192.0.2.3/24`, which we whitelisted explicitly:

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

Often, you can't make use of OAuth but you want to protect against random internet traffic so you can explicitly whitelist only those IP address ranges that you know should be allowed.

With [Azure](https://azure.microsoft.com) for example, they publish a [full list of their active IP ranges](https://www.microsoft.com/en-us/download/details.aspx?id=56519) so if you can't simply make use of a [VNet](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview), this may be the next best thing.