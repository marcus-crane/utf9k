# FAQ driven configuration
17 February 2021

I&#39;m sure this idea isn&#39;t new in the slightest but a handy trick I&#39;ve been using is to define configuration as a series of questions, not unlike a FAQ.

Rather than explain it, [here](https://github.com/marcus-crane/dotfiles/blob/62813e09dc6d5127b0f25a5017ae23fd37ce180f/doom/.doom.d/config.org) is an example of a configuration file I&#39;ve structured this way.

It&#39;s a little light on detail because I&#39;ve been too lazy to flesh it out with extra context, but even in spite of that I think it&#39;s easier to navigate thanks to the structure.

## A simple example

Let&#39;s take a closer look at one of those blocks:

```emacs
*** I would like to see the time while inside Emacs

Displaying the time in the bottom bar seems like a good idea

(display-time-mode 1)
```

Don&#39;t worry about the [elisp](https://en.wikipedia.org/wiki/Emacs_Lisp) syntax going on here. The actual code used is besides the point.

First, we set up a question. It&#39;s well scoped to asking just one thing: &#34;How can we see the time while inside Emacs?&#34;

The answer, `(display-time-mode 1)`, is pretty short in this case but it could span multiple lines. Regardless, we can safely assume that there isn&#39;t going to be some configuration related to checking email tucked away in there.

## A slightly more complex example

I&#39;ll be the first to admit that [my own dotfiles](https://github.com/marcus-crane/dotfiles) are a complete mess at the best of times but thankfully that means I have some examples of how this tip can be used to add some more structured.

Let&#39;s look at [an older version](https://github.com/marcus-crane/dotfiles/blob/f14b4ebf86e41fa9cad3630355364eada11482f1/doom/.doom.d/config.org#setting-org-file-locations) of my Doom Emacs configuration. I only pick Emacs because most of my other dotfiles aren&#39;t very long.

We can distill the linked section down to something like this:

```emacs
*** Setting org file locations

(after! org
  (setq org-agenda-files
    `(,(concat org-agenda-directory &#34;inbox.org&#34;)
      ,(concat org-agenda-directory &#34;gtd.org&#34;)
      ,(concat org-agenda-directory &#34;tickler.org&#34;)
      ,(concat dropbox-cal &#34;events.org&#34;)
      ,(concat dropbox-cal &#34;events-inbox.org&#34;))))

(after! org
  (setq org-archive-location
    (concat org-agenda-directory
      &#34;archive/archive-&#34;
      (format-time-string &#34;%Y%m&#34; (current-time))
      &#34;.org::&#34;)))
```

I&#39;ve reduced the indentation a little for pure readability within this blog post but having &#34;archive/archive-&#34; on a new line may or may not be valid.

Anyway, here we have a generic section called &#34;Setting org file locations&#34;. Is that telling Emacs to set or create files in those locations? What does the second block have to do with that?

While this works, the block is quite expansive (not helped by my excessive wall of text) and at first glance, it&#39;s not hugely clear if both of these blocks are needed. In reality, only the first one is actually &#34;Setting org file locations&#34; and even then, it isn&#39;t setting anything so much as determining where to look for files.

Now let&#39;s look at [a later version](https://github.com/marcus-crane/dotfiles/blob/6b6763a385b842b9dbdc3c883fe8bd0f13df60f2/doom/.doom.d/config.org#setting-up) of the same file.

While the configuration has changed a bit, I&#39;ll be reducing it to just the blocks we see above for a side by side comparison

```emacs
** Setting up

*** Where do my org files live?

(after! org
  (setq org-agenda-files
    `(,(concat org-agenda-directory &#34;inbox.org&#34;)
      ,(concat org-agenda-directory &#34;gtd.org&#34;)
      ,(concat org-agenda-directory &#34;tickler.org&#34;)
      ,(concat dropbox-cal &#34;events.org&#34;)
      ,(concat dropbox-cal &#34;events-inbox.org&#34;))))

*** What shall we do with completed tasks?

(after! org
  (setq org-archive-location
    (concat org-agenda-directory
      &#34;archive/archive-&#34;
      (format-time-string &#34;%Y%m&#34; (current-time))
      &#34;.org::&#34;)))
```

Here we have exactly the same configuration, but split into two separate questions. While the actual &#34;answers&#34; may not be parseable at first glance for anyone unaffiliated with Emacs, the questions (or heading) give a nice, concise English description of what&#39;s going on here, without actually telling you anything about the code specifically.

It&#39;s also a lot easier, in my opinion, to visually parse as the blocks are split up into nice, small sections and they lend themselves better to navigating via a table of contents.

## Defending your configuration through time

Perhaps one of my favourite aspects, which I only got to experience just recently, is that posing your configuration as a series of questions means that changing the &#34;answers&#34; doesn&#39;t specifically mean you have to restructure your configuration file.

First, let&#39;s look at an example of how you might normally specify a configuration section. In this case, we&#39;re setting an environment variable that points to a Dropbox folder.[^dropbox]

```emacs
** Setting up Dropbox

(setq dropbox (getenv &#34;DROPBOX_DIR&#34;))
```

Now, let&#39;s say we get fed up with Dropbox and decide to move entirely to our own WebDav server. Here&#39;s how much we might naively change.

```diff
-** Setting up Dropbox
&#43;** Setting up WebDav

-(setq dropbox (getenv &#34;DROPBOX_DIR&#34;))
&#43;(setq webdav (getenv &#34;WEBDAV_DIR&#34;))
```

In the past, I&#39;ve probably done this many times, as I move around software. For a little while, my Emacs configuration has been scoped nicer to look like this:

```emacs
** Where do I store my files?

(setq storage &#34;~/Dropbox&#34;)
```

and when it came time to make some changes, I didn&#39;t have to touch my original &#34;question&#34; at all.

```diff
** Where do I store my files?

-(setq storage &#34;~/Dropbox&#34;)
&#43;(setq storage &#34;~/SomewhereElse&#34;)
```

It&#39;s really no different than the principles of encapsulation and what not and I&#39;ve found it really handy to keep in mind over time.

## Structuring your configuration

Perhaps above all, I&#39;ve just found that it reduces the amount of effort I have to put into configuration mentally.

I could easily dump it all into one file without trouble but that just becomes a tangled nest over time.

On the opposite end of the scale, I used to aspire to provide a lengthy detailed explainer, [in the vein of Tecosaur](https://tecosaur.github.io/emacs-config/config.html), only to struggle to come up with well scoped sections.

It&#39;s too easy to let the flag for &#34;Following symlinks&#34; live in the same section as the actual config for &#34;Here&#39;s where my files live&#34; because they&#39;re sorta related but also one has a wider scope of effect than the other.

The beauty of this method is there&#39;s no thinking at all. You often quickly realise whether something is bleeding outside of the scope of the configuration and so perhaps it&#39;s time to pose a new question.

That and it&#39;s just less mentally taxing to read in my opinion. With a nicely formed, FAQ style configuration file, 

## Is this strictly scoped to literate configuration?

Not at all! While I&#39;m a fan of [org-mode](https://orgmode.org/) for literate configuration, despite my [recent struggles with its parent](https://utf9k.net/blog/emacs-probably-isnt-right-for-me/), you can achieve this with presumably any configuration files that support comments.

While I infrequently touch most of my dotfiles, I took a crack at converting my small [neovim](https://github.com/neovim/neovim) configuration to follow this style, as viewable [here](https://github.com/marcus-crane/dotfiles/blob/37840b8/nvim/.config/nvim/init.vim)

As someone still relatively new, I actually find it handy given I&#39;ve long forgotten what lives in there and most of it looks like gibberish to me at this point in time.

## One extra, hypothetical benefit

An unintended consequence of this layout, which may be a stretch to claim as I haven&#39;t made use of it myself, is that it can potentially lend itself quite well to search.

![A screenshot of Github code search. The author has typed &#34;what is listening on a port&#34; into the code search against their dotfiles and found a matching file. The match isn&#39;t exactly what they typed in but close enough as if to suggest that searching for questions you&#39;ve previously answered may be easier with this method.](search.png)

In this case, I remembered the essence of the question, but not the specific wording of the question itself. Likewise, I wouldn&#39;t remember to search for `lsof` so in this entirely staged example, there is possibly potential for having an easier time searching.

At worst, the structure makes for an easier time parsing when you want to answer someone&#39;s question by linking them a pseudo-question answer session that lives within your configuration.

[Let me know](mailto:hello@utf9k.net) if you end up making use of it, or if you already do! I&#39;ve been meaning to move more of my setup into sometihng similar so perhaps I&#39;ll do a status report down the line.

[^dropbox]: I often do this as Dropbox might live at `~/marcus/Dropbox` on one computer while living at `/mnt/c/Users/marcus/Dropbox` on another. The latter would be if I wanted to access my Dropbox from within [WSL](https://docs.microsoft.com/en-us/windows/wsl/about)
