---
category: questions
description: In which I remind myself how introspect filesystem usage on macOS
slug: macos-see-file-usage
tags:
  - enterprise
  - jamf
  - macos
  - performance
  - terminal
title: How can I see what applications are making my shell commands slow?
---
Recently I had noticed that some shell commands on my laptop were executing surprisingly slow.

Like most things in the tech world, it was due to a piece of [jamf](https://www.jamf.com) software locking up anything that was being read.

I managed to validate this assumption using the command `fs_usage` which requires sudo. Here's an example of it in action.

```shell
> sudo fs_usage | grep zshrc
Password:
16:19:22  open              /Users/marcus/dotfiles/zsh/zshrc.md                                              0.000021   lugh
16:19:22  open              /Users/marcus/dotfiles/zsh/.zshrc                                                0.000137   lugh
16:19:22    WrData[A]       /Users/marcus/dotfiles/zsh/.zshrc                                                0.000324 W lugh
16:19:22  lstat64           /System/Volumes/Data/Users/marcus/dotfiles/zsh/.zshrc                            0.000015   fseventsd
16:19:22  lstat64           dotfiles/zsh/.zshrc                                                              0.000005   perl5.28
16:19:22  lstat64           .zshrc                                                                           0.000007   perl5.28
16:19:22  lstat64           .zshrc                                                                           0.000004   perl5.28
16:19:22  readlink          .zshrc                                                                           0.000004   perl5.28
16:19:22  stat64            dotfiles/zsh/.zshrc/.stow                                                        0.000002   perl5.28
16:19:22  stat64            dotfiles/zsh/.zshrc/.nonstow                                                     0.000001   perl5.28
16:19:22  stat64            dotfiles/zsh/.zshrc                                                              0.000004   perl5.28
16:19:22  fsgetpath         /Users/marcus/dotfiles/zsh/.zshrc                                                0.000005   Finder
16:19:22  getattrlist       /Users/marcus/dotfiles/zsh/.zshrc                                                0.000014   Finder
16:19:22  fsgetpath         /Users/marcus/dotfiles/zsh/.zshrc                                                0.000005   Finder
16:19:22  fsgetpath         /Users/marcus/dotfiles/zsh/zshrc.md                                              0.000005   Finder
16:19:22  getattrlist       /Users/marcus/dotfiles/zsh/zshrc.md                                              0.000012   Finder
16:19:22  fsgetpath         /Users/marcus/.zshrc                                                             0.000005   Finder
16:19:22  getattrlist       /Users/marcus/.zshrc                                                             0.000015   Finder
16:19:22  fsgetpath         /Users/marcus/zshrc.md                                                           0.000005   Finder
16:19:22  getattrlist       /Users/marcus/zshrc.md                                                           0.000014   Finder
16:19:22  fsgetpath         /Users/marcus/zshrc.md                                                           0.000003   Finder
16:19:22  getxattr          dotfiles/zsh/zshrc.md                                                            0.000014   Finder
16:19:22  fsgetpath         /Users/marcus/zshrc.md                                                           0.000004   Finder
16:19:22  fsgetpath         /Users/marcus/zshrc.md                                                           0.000003   Finder
16:19:23  lstat64           /System/Volumes/Data/Users/marcus/dotfiles/zsh/.zshrc                            0.000005   fseventsd
```

Now this output doesn't actually come from my work computer so you won't see the mentioned JamfAgent but we can walk through this anyway.

First is [lugh](https://github.com/marcus-crane/lugh), a custom and possibly temporary literate markdown tool I use on my dotfiles. Next is `perl`, in the form of [GNU Stow](https://www.gnu.org/software/stow/) followed by macOS Finder doing some things. This gives a really nice breakdown of what is going on.

You can even use it to better understand applications, like if you run `git status` and see all the files that were touched within the `.git` folder.

I actually spotted that Yet Another Daemon was touching some of my `.git` files on my work laptop too. Shoo!
