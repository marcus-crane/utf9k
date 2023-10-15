# utf9k

![MIT License](https://img.shields.io/github/license/marcus-crane/utf9k)
![Hugo version](https://img.shields.io/badge/hugo-v0.119.0-blue)

This is my personal website, which is powered by [Hugo](https://www.gohugo.io) and [CommonMark](https://commonmark.org).

It also has some live, progressive enhancement elements powered by [gunslinger](https://github.com/marcus-crane/gunslinger).

Of particular interest is the live player on the homepage which surfaces metadata when I'm watching the following types of media:

* anime/tv series
  * powered by plex apis
  * fallback checkins powered by trakt
* movies
  * powered by plex apis
  * fallback checkins powered by trakt
* music
  * local music powered by plex apis
  * streaming music powered by tidal but surfaced via plex apis
* manga
  * powered by anilist apis
* games
  * powered by steam apis

## Getting setup

To get started, you'll want to install Hugo using one of the variety of [officially supported installation methods](https://gohugo.io/getting-started/installing/).

You'll also need to have [npm](https://www.npmjs.com/get-npm) installed.

I personally use [pnpm](https://pnpm.io/) as a package manager but npm works fine.

Once you've got all of that set up, running `yarn start` will do everything required to start up a local server.

You should be able to access the development version of the site at http://localhost:1313

## Layout

Pages, posts and related images live in `content`

HTML templates live in `layouts`

A handful of static files live in `static` with most images living with their respective posts.

## Deployment

Builds are executed using Github Actions with the resulting static output being deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

In short, pushes to `main` will update [utf9k.net](https://utf9k.net) automatically.

All of the Pages setup is [configured via Terraform](https://github.com/marcus-crane/infrastructure/blob/main/cfpages-utf9k-net.tf).

## Using Act

This repo is also compatible with [act](https://github.com/nektos/act), a tool for running Github Actions locally.

Running `act` will perform the entire build pipeline, aside from deployment to Cloudflare Pages.

It is essentially the same workflow as `pnpm run deploy`, just that it will also install all prerequisite tools like Hugo, Cue and so on.

In theory, you could also use `act -b` to build the site and output it from the container but I make no guarantees that it would work.

## Astro

I'm currently experimenting with a migration to [Astro](https://astro.build), to make it easier wrangling with image processing among other things.

I might end up hating it but for now, I've embedded the contents of an Astro build in this repo.

As a reminder to myself, it can be removed by deleting the following files/folders:

```console
$ rm -rf .astro
$ rm -rf src
$ rm -rf static/fonts
$ rm astro.config.mjs
$ rm tsconfig.json
```