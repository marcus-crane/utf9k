# How can I view configured networks in my macOS terminal?
01 January 0001

Let&#39;s assume you have multiple networks set up under `System Preferences &gt; Networks`.

You might have &#34;Work&#34; which has a bunch of proxy configuration specified and &#34;Home&#34; which just disabled proxy configuration.

If you left the former &#34;Work&#34; network selected, then went to a place that can&#39;t access the proxy server, you wouldn&#39;t be able to access the internet and vice versa.

To make automating this a little bit easier, there&#39;s a command line tool called `scselect`

Here&#39;s an example of what it looks like in action:

```bash
&gt; scselect
Defined sets include: (* == current set)
 * &lt;guid&gt; (Work)
   &lt;guid&gt; (Home)
```

In this example, we can see the `Work` network is selected.

Now we wanted to change to the Home network, you could do so manually in `System Preferences` or you can run `scselect` with the name of the network you want to change to like so:

```bash
&gt; scselect Home
CurrentSet updated to &lt;guid&gt; (Home)
&gt; scselect
Defined sets include: (* == current set)
   &lt;guid&gt; (Work)
 * &lt;guid&gt; (Home)
```

As you can see, the `Home` network is now selected.

I only recently discovered this tool so I haven&#39;t automated it yet but it&#39;s probably feasible to have a file with your working hours and then if it&#39;s within those hours, toggle on the `Work` network (and all of the proxy configuration that comes with it)

The reason you might want to use a schedule and not eg; WiFi name is that you might be working from home over a VPN for example.