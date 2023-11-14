# How can I test connectivity within my Kube namespace?
01 January 0001

Often times, you might want to test connectivity to a container but without doing so from within the container itself. You could just into a neighbouring pod but it may not have networking tools (ie tools) or even potentially network connectively if there&#39;s a [network policy](https://kubernetes.io/docs/concepts/services-networking/network-policies/) in the mix.

A quick way to deploy a curl container has been shared before [in the Kubernetes docs](https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/#securing-the-service) and it looks like this:

```bash
&gt; kubectl run curl --image=radial/busyboxplus:curl -i --tty
Unable to use a TTY - container curl did not allocate one
If you don&#39;t see a command prompt, try pressing enter.
```

I think the output looks something like that but this is a bit more involved as my work makes use of [policies](https://docs.microsoft.com/en-us/azure/governance/policy/concepts/policy-for-kubernetes) in our cluster.

Now normally I just keep a file called `curl-debug.yml` sitting around my hard drive and deploy it using `kubectl apply -f curl-debug.yml`
 but you can also deploy it inline using a hideously log container override.

You may need more (or less) override fields depending on eg; if your network policy only allows pods with certain annotations or metadata to connect to what you&#39;re testing.

An unprivileged curl pod would look something like this. Note that I&#39;ve removed `-i --rm --tty` as it always seems buggy to me and I much prefer to just manually run `kubectl exec -it curl -- sh` than have my terminal hanging.

```bash
&gt; kubectl run curl --image=radial/busyboxplus:curl --overrides=&#39;{ &#34;spec&#34;: { &#34;securityContext&#34;: { &#34;runAsUser&#34;: 1000, &#34;runAsGroup&#34;: 1000, &#34;seccompProfile&#34;: { &#34;type&#34;: &#34;RuntimeDefault&#34; }}, &#34;containers&#34;: [{ &#34;name&#34;: &#34;curl&#34;, &#34;image&#34;: &#34;radial/busyboxplus:curl&#34;, &#34;command&#34;: [ &#34;/bin/sh&#34;, &#34;-c&#34;, &#34;--&#34; ], &#34;args&#34;: [ &#34;while true; do sleep 30; done; &#34; ], &#34;securityContext&#34;: { &#34;runAsNonRoot&#34;: true, &#34;allowPrivilegeEscalation&#34;: false }}]}}
pod/curl created
```

and for those who don&#39;t love huge eyesores, here&#39;s the contents of the pod spec I alluded to earlier:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: &#34;curl&#34;
  labels:
    app: &#34;my-cool-app&#34;
    service: &#34;some-other-identifier&#34;
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: &#34;curl&#34;
    image: &#34;radial/busyboxplus:curl&#34;
    command: [ &#34;/bin/sh&#34;, &#34;-c&#34;, &#34;--&#34; ]
    args: [ &#34;while true; do sleep 30; done;&#34; ]
    securityContext:
      runAsNonRoot: true
      allowPrivilegeEscalation: false
```

Ah right, the actual point of the question. Once you have curl running, and you&#39;re inside the container, you can then use `curl` to test out the connectivity of things.

For example, earlier today I was moving a container to a new cluster and it was using the URL that the ingress was listening to. Let&#39;s use `https://sports.example.com` in this case and say that the service was called `sports`.

The ingress URL changed from being internally accessible to publically accessable, although behind an OAuth2 proxy of course.

I noticed this change by doing the following:

```bash
&gt; curl --head --location http://sports
HTTP/1.1 200 OK
Server: nginx
[...]
```

Ok, it resolves the internal service perfectly fine. How about the public one?

```bash
&gt; curl --head --location https://sports.example.com
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

Now, I don&#39;t even have to look at the payload to infer that we probably just hit an OAuth2 login page and that&#39;s exactly what was happening.

In the previous cluster, we were using internal links to the external OAuth proxy is never involved. Admittedly, this was rationalised as &#34;DNS just magically knows to resolve the request to the service right next door&#34; and perhaps this is true but maybe not!

Anyway, a third case that you might run into is the following:

```bash
&gt; curl --head --location http://something
# the command just sits with no output forever!
```

If you check my `curl-debug.yaml`, I have specific labels that the network policy looks for. Because this curl pod is missing them, it can&#39;t make any requests.

This could be anything from protocol (TCP/UDP), port number, whitelisted namespaces, whitelisted resources and so on. If you have this problem, either check your various log messages for reference to a required policy or check for an existing one that needs to be updated.

Doing a search for &#34;kind: NetworkPolicy&#34; should help narrow down which files are relevant and/or if they even exist in the first place.

Happy debugging!