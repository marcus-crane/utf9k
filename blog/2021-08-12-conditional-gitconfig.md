---
title: "Conditionally setting your gitconfig"
date: "2021-08-12T20:17:00+1300"
slug: "conditional-gitconfig"
tags:
- "dotfiles"
- "git"
- "work"
---

Personally, I try to keep my development environment as convenient to use as possible and with the advent of [BeyondCorp-style zero trust](https://cloud.google.com/beyondcorp), more internal services are thankfully available without a VPN required.

This makes it easy to access tooling from your mobile device and other places but it can also mean the line between work and personal blurs a little bit.

A lot of my custom work-related configuration has been deprecated (utilities for wrangling VPNs and proxies) and I basically don't maintain anything more than what was [already open sourced](https://github.com/marcus-crane/dotfiles).

One last holdout has been my git configuration however, as I want to create work commits with my work email and vice versa for open source commits. It had been my impression that git had no way to support this but that hasn't been true for some time.

Thanks to [conditional includes](https://git-scm.com/docs/git-config#_conditional_includes), you can dynamically switch instances of your `.gitconfig` on the fly.

Let's look at an example. For example purposes, let's say that my code lives in `$HOME/work` and my personal code lives in `$HOME/projects`. You can do something like this:

```shell
[user]
  email = user@example.com
  name = User
  signingkey = ABC123
[commit]
  gpgSign = true
[includeIf "gitdir:~/work/"]
  path = ~/.work.gitconfig
```

What we're doing here is setting our default variables but upon interacting with a `.git` initialised repository within the `~/work` folder, we instead use our work-based config.

Let's see an example of this in action:

```shell
> pwd
/Users/person
> git config user.email
user@example.com
> cd ~/work
> pwd
/Users/person/work
> git config user.email
business@work.com
```

Pretty cool, huh?
