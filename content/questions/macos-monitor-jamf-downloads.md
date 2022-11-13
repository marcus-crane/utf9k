---
title: "How can I monitor JAMF downloads on macOS?"
slug: "macos-monitor-jamf-downloads"
category: "questions"
tags:
- "enterprise"
- "jamf"
- "macos"
- "software"
---

For large downloads, such as macOS updates, it can be annoying that tools like Self Service don't surface download metrics

Thankfully, we can find the download on disk and watch as the file size increases

In the case of macOS, downloads live at `/Library/Application\ Support/JAMF/Downloads`

I'm no shell scripting master but the following is a quick hack to view the progress in real time

There are better tools like `watch` but eh, this works fine enough

Here's the script I've been using but it requires `gnumfmt` which you can install with `brew install coreutils`

```bash
> while (true) do echo $(sudo ls -l /Library/Application\ Support/JAMF/Downloads | grep macOS | awk '{ print $5 }' | gnumfmt --to iec --format "Downloaded: %8.1f"); sleep 15; done
Downloaded: 6.9G
Downloaded: 7.0G
Downloaded: 7.0G
Downloaded: 7.1G
Downloaded: 7.1G
```

That's not particulary readable so here's a bit of an explainer:

```bash
while (true)
do
  echo $(
    sudo ls -l /Library/Application\ Support/JAMF/Downloads | # (1)
    grep macOS | # (2)
    awk '{ print $5 }' | # (3)
    gnumfmt --to iec --format "Downloaded: %8.1f" # (4)
  );
  sleep 15; # (5)
done
```

1. Annoyingly, `JAMF/Downloads` is a restricted directory so we have to be a superuser in order to operate within that folder
2. We're only concerned with one column in particular, in my case it's the macOS Big Sur DMG
3. Let's fetch the current file size but just seeing `8466481152` is not particularly useful
4. We can use `gnumfmt`, a GNU utils implementation of `numfmt` given the latter only exists on Linux systems. `gnumfmt` is available via Homebrew as mentioned above
5. We just run this script continually until `Ctrl-C` is invoked. Over a average speed proxy, it takes about 45 seconds to download 100MB so there's no value personally in setting something like `sleep 5`

Enjoy your window into frustration as you realise just how long waiting will take