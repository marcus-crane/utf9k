# utf9k

This is my personal website, which is powered by [Astro](https://astro.build/) and Markdown.

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
* podcasts
  * powered by (unreleased podcast player that has a web api)

## Getting setup

To get started, you'll want to install Bun using one of the variety of [officially supported installation methods](https://bun.sh/).

You can use [Node.js](https://nodejs.org/en) as well but personally I use Bun these days and haven't encountered anything it can't support.

Once you've got all of that set up, running `bun dev` should do everything required to start up a local server.

You should be able to access the development version of the site at http://localhost:1313

## Deployment

Builds are executed using Github Actions with the resulting static output being deployed to [Bunny Storage](https://bunny.net/storage/).

From there, my site is replicated using [Bunny CDN](https://bunny.net/cdn/).

I've used hosted services like Netlify and Cloudflare Pages in the past but I found that, surprisingly, their CDNs are not necessarily the fastest plus when you're not paying, you have no leverage during any inevitable outages.

Pushes to `main` will update [utf9k.net](https://utf9k.net) automatically although depending on what changes, I sometimes manually trigger a cache purge.

## Using Act

This repo is also compatible with [act](https://github.com/nektos/act), a tool for running Github Actions locally.

Running `act` will perform the entire build pipeline, aside from deployment to Cloudflare Pages.

It is essentially the same workflow as `bun run deploy`, just that it will also install all prerequisite tools like Hugo, Cue and so on.

In theory, you could also use `act -b` to build the site and output it from the container but I make no guarantees that it would work.