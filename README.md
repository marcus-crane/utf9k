# utf9k

![MIT License](https://img.shields.io/github/license/marcus-crane/utf9k)
![Hugo version](https://img.shields.io/badge/hugo-v0.91.2-blue)

This is my personal website, which is powered by [Hugo](https://www.gohugo.io) and [CommonMark](https://commonmark.org).

It also has some live, progressive enhancement elements powered by [gunslinger](https://github.com/marcus-crane/gunslinger).

Of particular interest is the live player on the homepage which surfaces metadata when I'm watching the following types of media:

* anime/tv series
  * powered by plex apis
* movies
  * powered by plex apis
* music
  * local music powered by plex apis
  * streaming music powered by tidal but surfaced via plex apis
* gaming
  * powered by playstation apis to surface ps4/ps5 games being played

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