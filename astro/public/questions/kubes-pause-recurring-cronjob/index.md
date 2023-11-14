# How can I pause a recurring Kube cronjob?
01 January 0001

If you have a cronjob that you&#39;d like to pause while doing some maintenance for example, you can use the `suspend` attribute.

```bash
&gt; kubectl patch cronjobs does-something -p &#39;{&#34;spec&#34;: {&#34;suspend&#34;: true }}&#39;
cronjob.batch/does-something patched
```

Once you&#39;re done, you can just flip `true` to `false`