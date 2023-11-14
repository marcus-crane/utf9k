# How can I hide folders in my Home directory?
01 January 0001

If you&#39;ve ever seen those pesky default folders like `Public` and `Movies`, the good news is that you can get rid of them.

You can&#39;t, or more specifically, you shouldn&#39;t fully delete them as some applications may assume their existence but you can get close enough.

Let&#39;s say we want to hide `Public`, you can hide it from Finder like so:

```shell
chflags hidden ~/Public
```

The next time you navigate to your Home directory using Finder, you&#39;ll see that they&#39;ve magically disappeared

If you want to hide multiple at once, you can provide a comma delimited list:

```shell
chflags hidden ~/{Downloads,Public}
```

If, for whatever reason, you wanted to block anyone or anything from accessing those folders as well, you could use `chmod` to do that:

```shell
chmod 000 ~/{Downloads,Public}
```

Personally, I don&#39;t bother with this step but you might have a use for it.

The one issue with the above is that you&#39;ll see those files appear in your Terminal and I don&#39;t know about you but that basically makes this whole exercise pointless.

There are ways to do it but I haven&#39;t looked into them myself.
