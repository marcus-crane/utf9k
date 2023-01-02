---
title: "How can I globally ignore files?"
slug: "git-globally-ignore-files"
description: "In which I wage war against .DS_Store"
category: "questions"
tags:
- "git"
---

This has been something that has plagued me for years and I've never sat down to properly fix it.

Instead, I've just added `.DS_Store` to `.gitignore` files probably over one hundred times by over.

Anyway, the [git documentation](https://git-scm.com/docs/git-config#Documentation/git-config.txt-coreexcludesFile) mentions the existence of a variable called `core.excludesFile`.

If you don't set it, and `$XDG_CONFIG_HOME` isn't overridden, you can add global ignores to `$HOME/.config/git/ignore`.

Let's see this in action. First we'll make a brand new Git repository and add a `.DS_Store` file.

```bash
> mkdir sports
> cd sports
> git init
Initialized empty Git repository in /Users/marcus/Code/sports/.git/
> touch .DS_Store
> git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.DS_Store

nothing added to commit but untracked files present (use "git add" to track)
```

Ah yes, the perpetual hell but let's try out our new trick.

```bash
> echo ".DS_Store" >> ~/.config/git/ignore
> git status
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

Mwah, beautiful.
