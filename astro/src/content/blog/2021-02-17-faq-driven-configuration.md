---
title: "FAQ driven configuration"
date: "2021-02-17T18:14:00+1300"
description: "Not sure how to structure a config file? Try answering questions rather than trying to come up with categories"
slug: "faq-driven-configuration"
category: "blog"
tags:
  - "configuration"
  - "documentation"
---

I'm sure this idea isn't new in the slightest but a handy trick I've been using is to define configuration as a series of questions, not unlike a FAQ.

Rather than explain it, [here](https://github.com/marcus-crane/dotfiles/blob/62813e09dc6d5127b0f25a5017ae23fd37ce180f/doom/.doom.d/config.org) is an example of a configuration file I've structured this way.

It's a little light on detail because I've been too lazy to flesh it out with extra context, but even in spite of that I think it's easier to navigate thanks to the structure.

## A simple example

Let's take a closer look at one of those blocks:

```emacs
*** I would like to see the time while inside Emacs

Displaying the time in the bottom bar seems like a good idea

(display-time-mode 1)
```

Don't worry about the [elisp](https://en.wikipedia.org/wiki/Emacs_Lisp) syntax going on here. The actual code used is besides the point.

First, we set up a question. It's well scoped to asking just one thing: "How can we see the time while inside Emacs?"

The answer, `(display-time-mode 1)`, is pretty short in this case but it could span multiple lines. Regardless, we can safely assume that there isn't going to be some configuration related to checking email tucked away in there.

## A slightly more complex example

I'll be the first to admit that [my own dotfiles](https://github.com/marcus-crane/dotfiles) are a complete mess at the best of times but thankfully that means I have some examples of how this tip can be used to add some more structured.

Let's look at [an older version](https://github.com/marcus-crane/dotfiles/blob/f14b4ebf86e41fa9cad3630355364eada11482f1/doom/.doom.d/config.org#setting-org-file-locations) of my Doom Emacs configuration. I only pick Emacs because most of my other dotfiles aren't very long.

We can distill the linked section down to something like this:

```emacs
*** Setting org file locations

(after! org
  (setq org-agenda-files
    `(,(concat org-agenda-directory "inbox.org")
      ,(concat org-agenda-directory "gtd.org")
      ,(concat org-agenda-directory "tickler.org")
      ,(concat dropbox-cal "events.org")
      ,(concat dropbox-cal "events-inbox.org"))))

(after! org
  (setq org-archive-location
    (concat org-agenda-directory
      "archive/archive-"
      (format-time-string "%Y%m" (current-time))
      ".org::")))
```

I've reduced the indentation a little for pure readability within this blog post but having "archive/archive-" on a new line may or may not be valid.

Anyway, here we have a generic section called "Setting org file locations". Is that telling Emacs to set or create files in those locations? What does the second block have to do with that?

While this works, the block is quite expansive (not helped by my excessive wall of text) and at first glance, it's not hugely clear if both of these blocks are needed. In reality, only the first one is actually "Setting org file locations" and even then, it isn't setting anything so much as determining where to look for files.

Now let's look at [a later version](https://github.com/marcus-crane/dotfiles/blob/6b6763a385b842b9dbdc3c883fe8bd0f13df60f2/doom/.doom.d/config.org#setting-up) of the same file.

While the configuration has changed a bit, I'll be reducing it to just the blocks we see above for a side by side comparison

```emacs
** Setting up

*** Where do my org files live?

(after! org
  (setq org-agenda-files
    `(,(concat org-agenda-directory "inbox.org")
      ,(concat org-agenda-directory "gtd.org")
      ,(concat org-agenda-directory "tickler.org")
      ,(concat dropbox-cal "events.org")
      ,(concat dropbox-cal "events-inbox.org"))))

*** What shall we do with completed tasks?

(after! org
  (setq org-archive-location
    (concat org-agenda-directory
      "archive/archive-"
      (format-time-string "%Y%m" (current-time))
      ".org::")))
```

Here we have exactly the same configuration, but split into two separate questions. While the actual "answers" may not be parseable at first glance for anyone unaffiliated with Emacs, the questions (or heading) give a nice, concise English description of what's going on here, without actually telling you anything about the code specifically.

It's also a lot easier, in my opinion, to visually parse as the blocks are split up into nice, small sections and they lend themselves better to navigating via a table of contents.

## Defending your configuration through time

Perhaps one of my favourite aspects, which I only got to experience just recently, is that posing your configuration as a series of questions means that changing the "answers" doesn't specifically mean you have to restructure your configuration file.

First, let's look at an example of how you might normally specify a configuration section. In this case, we're setting an environment variable that points to a Dropbox folder.[^dropbox]

```emacs
** Setting up Dropbox

(setq dropbox (getenv "DROPBOX_DIR"))
```

Now, let's say we get fed up with Dropbox and decide to move entirely to our own WebDav server. Here's how much we might naively change.

```diff
-** Setting up Dropbox
+** Setting up WebDav

-(setq dropbox (getenv "DROPBOX_DIR"))
+(setq webdav (getenv "WEBDAV_DIR"))
```

In the past, I've probably done this many times, as I move around software. For a little while, my Emacs configuration has been scoped nicer to look like this:

```emacs
** Where do I store my files?

(setq storage "~/Dropbox")
```

and when it came time to make some changes, I didn't have to touch my original "question" at all.

```diff
** Where do I store my files?

-(setq storage "~/Dropbox")
+(setq storage "~/SomewhereElse")
```

It's really no different than the principles of encapsulation and what not and I've found it really handy to keep in mind over time.

## Structuring your configuration

Perhaps above all, I've just found that it reduces the amount of effort I have to put into configuration mentally.

I could easily dump it all into one file without trouble but that just becomes a tangled nest over time.

On the opposite end of the scale, I used to aspire to provide a lengthy detailed explainer, [in the vein of Tecosaur](https://tecosaur.github.io/emacs-config/config.html), only to struggle to come up with well scoped sections.

It's too easy to let the flag for "Following symlinks" live in the same section as the actual config for "Here's where my files live" because they're sorta related but also one has a wider scope of effect than the other.

The beauty of this method is there's no thinking at all. You often quickly realise whether something is bleeding outside of the scope of the configuration and so perhaps it's time to pose a new question.

That and it's just less mentally taxing to read in my opinion. With a nicely formed, FAQ style configuration file,

## Is this strictly scoped to literate configuration?

Not at all! While I'm a fan of [org-mode](https://orgmode.org/) for literate configuration, despite my [recent struggles with its parent](https://utf9k.net/blog/emacs-probably-isnt-right-for-me/), you can achieve this with presumably any configuration files that support comments.

While I infrequently touch most of my dotfiles, I took a crack at converting my small [neovim](https://github.com/neovim/neovim) configuration to follow this style, as viewable [here](https://github.com/marcus-crane/dotfiles/blob/37840b8/nvim/.config/nvim/init.vim)

As someone still relatively new, I actually find it handy given I've long forgotten what lives in there and most of it looks like gibberish to me at this point in time.

## One extra, hypothetical benefit

An unintended consequence of this layout, which may be a stretch to claim as I haven't made use of it myself, is that it can potentially lend itself quite well to search.

![A screenshot of Github code search. The author has typed "what is listening on a port" into the code search against their dotfiles and found a matching file. The match isn't exactly what they typed in but close enough as if to suggest that searching for questions you've previously answered may be easier with this method.](https://cdn.utf9k.net/blog/faq-driven-configuration/search.png)

In this case, I remembered the essence of the question, but not the specific wording of the question itself. Likewise, I wouldn't remember to search for `lsof` so in this entirely staged example, there is possibly potential for having an easier time searching.

At worst, the structure makes for an easier time parsing when you want to answer someone's question by linking them a pseudo-question answer session that lives within your configuration.

[Let me know](mailto:hello@utf9k.net) if you end up making use of it, or if you already do! I've been meaning to move more of my setup into sometihng similar so perhaps I'll do a status report down the line.

[^dropbox]: I often do this as Dropbox might live at `~/marcus/Dropbox` on one computer while living at `/mnt/c/Users/marcus/Dropbox` on another. The latter would be if I wanted to access my Dropbox from within [WSL](https://docs.microsoft.com/en-us/windows/wsl/about)
