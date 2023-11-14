# How can I try out x-callback-url commands on macOS?
01 January 0001

There is a CLI tool called [xcall](https://github.com/martinfinke/xcall) which seems to be the only way I&#39;ve seen to actually interact with `x-callback-url` outside of other applications.

It&#39;s a bit wonky in that you have to drag `xcall.app` to your `Applications` folder and then either add that to your path or reference the cli tool inside directly.

Here&#39;s an example of it in use:

```bash
&gt; /Applications/xcall.app/Contents/MacOS/xcall -url &#34;things:///version&#34; -activateApp NO
{
  &#34;x-things-client-version&#34; : &#34;31310506&#34;,
  &#34;x-things-scheme-version&#34; : &#34;2&#34;
}
```

Annoyingly, this will activate the application in question, if it isn&#39;t already open, but that is the nature of `x-callback-url` after all.

It will take the foreground view upon opening but further invocations won&#39;t trigger it, assuming you use `-activateApp NO`. If you want it to appear, such as when triggering a search, you can use `-activateApp YES` instead.
