# How can I monitor JAMF downloads on macOS?
01 January 0001

For large downloads, such as macOS updates, it can be annoying that tools like Self Service don&#39;t surface download metrics

Thankfully, we can find the download on disk and watch as the file size increases

In the case of macOS, downloads live at `/Library/Application\ Support/JAMF/Downloads`

I&#39;m no shell scripting master but the following is a quick hack to view the progress in real time

There are better tools like `watch` but eh, this works fine enough

Here&#39;s the script I&#39;ve been using but it requires `gnumfmt` which you can install with `brew install coreutils`

```bash
&gt; while (true) do echo $(sudo ls -l /Library/Application\ Support/JAMF/Downloads | grep macOS | awk &#39;{ print $5 }&#39; | gnumfmt --to iec --format &#34;Downloaded: %8.1f&#34;); sleep 15; done
Downloaded: 6.9G
Downloaded: 7.0G
Downloaded: 7.0G
Downloaded: 7.1G
Downloaded: 7.1G
```

That&#39;s not particulary readable so here&#39;s a bit of an explainer:

```bash
while (true)
do
  echo $(
    sudo ls -l /Library/Application\ Support/JAMF/Downloads | # (1)
    grep macOS | # (2)
    awk &#39;{ print $5 }&#39; | # (3)
    gnumfmt --to iec --format &#34;Downloaded: %8.1f&#34; # (4)
  );
  sleep 15; # (5)
done
```

1. Annoyingly, `JAMF/Downloads` is a restricted directory so we have to be a superuser in order to operate within that folder
2. We&#39;re only concerned with one column in particular, in my case it&#39;s the macOS Big Sur DMG
3. Let&#39;s fetch the current file size but just seeing `8466481152` is not particularly useful
4. We can use `gnumfmt`, a GNU utils implementation of `numfmt` given the latter only exists on Linux systems. `gnumfmt` is available via Homebrew as mentioned above
5. We just run this script continually until `Ctrl-C` is invoked. Over a average speed proxy, it takes about 45 seconds to download 100MB so there&#39;s no value personally in setting something like `sleep 5`

Enjoy your window into frustration as you realise just how long waiting will take