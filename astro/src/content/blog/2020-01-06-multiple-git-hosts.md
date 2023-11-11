---
title: "Dealing with multiple git hosts"
date: "2020-01-06T00:00:00+1300"
description: "Why setting for one gitconfig when you could have two or more"
slug: "multiple-git-hosts"
category: "blog"
tags:
  - "git"
  - "github"
  - "gitlab"
  - "linux"
---

{{% notice title="Some things have changed since I first wrote this" %}}
At the time of writing, I was using Gitlab so you'll see references to my dotfiles living there.

I've now moved back to Github but kept the references to Gitlab in this post intact.
{{% /notice %}}

When using my work laptop, I like to keep a copy of my dotfiles so that my tools at work are in sync with my tools at home. They [live in a Github repository](https://github.com/marcus-crane/dotfiles) under my personal account, and I use plain old git to sync changes.

In order to push and pull changes from Github, I use an SSH key rather than a password. It's easy enough to generate one of course but I also have one for the internal repository at my work. Juggling the two can sometimes be annoying when setting up a fresh laptop without some proper configuration.

Usually I forget what that looks like so here's a quick walkthrough on how you too can juggle multiple git hosts.

Let's have a look at a barebones ssh configuration file:

```shell
> cat ~/.ssh/config
Host github.example.com
  IdentityFile ~/.ssh/work

Host gitlab.com
  IdentityFile ~/.ssh/personal

Host github.com
  IdentityFile ~/.ssh/personal
```

We've got three different hosts and two different SSH keys.

Whenever you use `ssh`, it'll check to see if you have any host blocks defined. If they match the host provided, it'll use the corresponding configuration.

Let's see how it looks in action:

```shell
> ssh -T git@github.example.com
Hi marcus! You've successfully authenticated, but GitHub does not provide shell access.
> ssh -T git@gitlab.com
Welcome to GitLab, @marcus-crane!
```

The connection to `github.example.com` uses the key stored at `~/.ssh/work`, while the connection to `gitlab.com` has used the key stored at `~/.ssh/personal`. Perfect!

You can also add additional configuration that is specific to just one host.

Let's look at an example with a few more options:

```shell
> cat ~/.ssh/config
Host github.example.com
  IdentityFile ~/.ssh/work

Host gitlab.com
  IdentityFile ~/.ssh/personal
  LogLevel VERBOSE

Host github.com
  HostName notarealuser
  IdentityFile ~/.ssh/personal
```

It's mostly the same with two new commands `LogLevel` and `HostName`. Let's see it in action once again before we dive a bit deeper:

```shell
> ssh -T git@github.com
ssh: Could not resolve hostname notarealuser: Name or service not known
> ssh -T git@gitlab.com
Authenticated to gitlab.com ([35.231.145.151]:22).
Welcome to GitLab, @marcus-crane!
Transferred: sent 2036, received 3072 bytes, in 0.5 seconds
Bytes per second: sent 4366.6, received 6588.4
```

We can see that we sent a request to `github.com` and it interpreted the corresponding host block, attempting to log in as someone called `notarealuser`.

For most git servers, the user will default to `git` and is generally part of your remote anyway. You can see it whenever you run `git remote add origin git@github.com/user/blah` or `git remote -v`.

It can be quite handy for regular servers however. Instead of connecting with `ssh user@blah.net`, you can add the username to a host block and shorten that command down to just `ssh blah.net`

The `LogLevel` command is fairly straight forward. You can set it to a higher level of logging, and see more details about what SSH is doing under the hood, but for a specific host.

If you're getting error messages from your internal git host, you could toggle on `LogLevel DEBUG` and see if your requests are making their way to the host or not as an example.

I'm sure there's all sorts of interesting stuff you could do but this post isn't meant to be comprehensive by any means. It's more of a reminder to myself on how to create an ssh config file.

You can see all of the various commands offline by running `man ssh_config`. You can also read them online via the [OpenBSD manual page server](https://man.openbsd.org/ssh_config).

Happy SSHing!
