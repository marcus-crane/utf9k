---
date: 2026-03-01T09:55:00+1300
description: Now I can write blog posts in bed
slug: obsidian-headless
title: Blogging with Obsidian Headless
---

I woke up a nice surprise yesterday in the form of [obsidian-headless](https://github.com/obsidianmd/obsidian-headless) releasing as an open beta.

To be clear, this isn't to be confused with the also-recently released [Obsidian CLI](https://help.obsidian.md/cli) which is for controlling the Obsidian desktop app.

`obsidian-headless` is a headless client for [Obsidian Sync](https://obsidian.md/sync) which allows both downloading and uploading files without the need to have the desktop app installed.

This is pretty great for a few use cases but I'm especially interested in using it for publishing to my website, as well as for [continuously backing up](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/) my vault.

For today, we'll just look at the former use case. I know it works because this very post you're reading was written and published on my phone without leaving Obsidian's mobile app!

## Headless Considerations

Before we go into how publishing can work, there are a few things you should keep in mind.

### Open Beta

The first is that `obsidian-headless` is only a few days old!

While some sync issues [should be fixed now](https://github.com/obsidianmd/obsidian-headless/commit/b69b55e9261d05fb7c4c0ec82f6dc2b6af81b359), there may be other issues waiting to pop up so consider whether you want to wait for a more stable release.

The information in this post is almost guaranteed to be pretty quickly out of date as well, so you should defer to the [official documentation](https://help.obsidian.md/sync/headless) first.

### Sync Footguns

At the time of writing, sync is two-way with the default being to read and write.

This should be fine inside of CI pipelines, given you'll be using a fresh setup each time but I already managed to footgun myself into deleting part of my vault through state shenanigans on my local machine.

I've suggested the addition of a read/pull only mode as a result.

### Vault Size

At the moment, there is no capability to sync part of a vault.

You have to sync your entire vault or nothing. This will just be because the tool is at such an early stage.

Having said that, if you have an end-to-end encryption (E2EE) vault like I do, partial syncing would be technically impossible. Selectively choosing files based on filenames or metadata implies being able to read file contents and the Obsidian team wouldn't be able to do this if you have an E2EE vault. This is a good thing!

I suppose it could be possible if the client just silently discarded everything you didn't select locally and maybe it could be possible for the standard (non-E2EE type) but I'm not sure that the sync backend actually supports such a thing.

With all of this in mind, you'll want to consider how long it will take to perform a full sync within a CI pipeline. Given that CI is generally stateless, this may take many minutes to do a fresh sync!

There are options such as caching but without a read/pull only mode, I would be a bit wary of caching `obsidian-headless`'s sqlite file (used to track state), only to accidentally push deletes up to your vault if a file were to somehow not cache properly.

The way I worked around this is I made a second vault called `Writing` which just contains files for my blog.

It uses Standard encryption over E2EE as all of the files inside are intended for publishing online anyway but I generally recommend E2EE for anything else.

There are additional benefits such as having a minimal set of plugins, a minimal number of tags/autocomplete fields to keep track of and it also supports the Obsidian team in exchange for a slightly bigger sync plan.

This brings me to the next point which is also an important footgun.

### Vault Metadata

You may be tempted to store your website in a subfolder of your vault and publish it that way, but it's important to remember that **all** files are synced via `obsidian-headless`.

If I were to sync my entire vault in the [Github Actions pipeline](https://github.com/marcus-crane/utf9k/actions/runs/22528940150/job/65265303610) for this blog, the filenames for all of my personal files logged out, even though they ultimately get discarded.

Again, this tool is so early days that this may not be an issue soon but it's worth mentioning for anyone experimenting.

It's mainly for this reason that I opted for a second vault.

## Sync Setup

As mentioned earlier, this blog post was entirely written on my phone in one sitting to prove that this setup can work.[^1]

The way it works is that I have [this pipeline](https://github.com/marcus-crane/utf9k/blob/main/.github%2Fworkflows%2Fobsidian-sync.yml) which only has the trigger type of [workflow_dispatch](https://github.com/marcus-crane/utf9k/blob/main/.github%2Fworkflows%2Fobsidian-sync.yml). That means it only runs if I explicitly trigger it, either by clicking a button in the UI or by hitting an API endpoint.

I had initially imagined a scheduled sync job but there is still a world where I would want to edit files via Git. The last thing you would want is to push a change via Git, only to have a slightly outdated Obsidian file push over the top of it again, so having an explicitly triggered workflow is the way to go I think.

Rather than try to resolve conflicts, I've opted to make this vault the source of truth so the pipeline can just delete whatever files are in Git, stage the files synced from Obsidian and then commit any differences.

If there are no differences to be found, you just get a no-op which works well enough.

Triggering this workflow manually every time would get boring fast so I "[automatically programmed](https://antirez.com/news/159)" a plugin to handle it.

It adds a ribbon button with a status icon and clicking it triggers a new CI job. The status is displayed on the button and then eventually it displays a pass, fail or no-op icon.

It works well on mobile too which is how I published this very post!

Once the Github Actions pipeline commits any changes, that triggers my [main deployment pipeline](https://github.com/marcus-crane/utf9k/blob/main/.github%2Fworkflows%2Fdeploy.yml) which does a bunch of other stuff but all of that is an exercise left for the reader.

[^1]: I did make some slight edits shortly after on my desktop but they were written and published entirely within the Obsidian desktop app.