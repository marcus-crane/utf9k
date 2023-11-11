---
title: "How can I hide folders in my Home directory?"
slug: "macos-hide-home-folders"
description: "In which I remind myself how to hide otherwise unused home folders"
category: "questions"
tags:
  - "housekeeping"
  - "macos"
---

If you've ever seen those pesky default folders like `Public` and `Movies`, the good news is that you can get rid of them.

You can't, or more specifically, you shouldn't fully delete them as some applications may assume their existence but you can get close enough.

Let's say we want to hide `Public`, you can hide it from Finder like so:

```shell
chflags hidden ~/Public
```

The next time you navigate to your Home directory using Finder, you'll see that they've magically disappeared

If you want to hide multiple at once, you can provide a comma delimited list:

```shell
chflags hidden ~/{Downloads,Public}
```

If, for whatever reason, you wanted to block anyone or anything from accessing those folders as well, you could use `chmod` to do that:

```shell
chmod 000 ~/{Downloads,Public}
```

Personally, I don't bother with this step but you might have a use for it.

The one issue with the above is that you'll see those files appear in your Terminal and I don't know about you but that basically makes this whole exercise pointless.

There are ways to do it but I haven't looked into them myself.
