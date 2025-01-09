# utf9k

This is my personal website, which is powered by [Lume](https://github.com/lumeland/lume) and Markdown.

It also has some live, progressive enhancement elements powered by [gunslinger](https://github.com/marcus-crane/gunslinger).

Of particular interest is the live player on the homepage which surfaces metadata when I'm watching the following types of media:

* anime/tv series
  * powered by plex apis
  * fallback checkins powered by trakt
* movies
  * powered by plex apis
  * fallback checkins powered by trakt
* music
  * streaming music powered by spotify
  * local music powered by plex apis
* manga
  * powered by anilist apis
* games
  * powered by steam apis
* podcasts
  * powered by spotify

## Getting setup

To get started, you'll want to install Deno using one of the variety of [officially supported installation methods](https://github.com/lumeland/lume).

Once you've got all of that set up, running `deno task serve` should do everything required to start up a local server.

You should be able to access the development version of the site at http://localhost:1313

## Deployment

Builds are executed using Github Actions with the resulting static output being deployed to [Bunny Storage](https://bunny.net/storage/).

From there, my site is replicated using [Bunny CDN](https://bunny.net/cdn/).

I've used hosted services like Netlify and Cloudflare Pages in the past but I found that, surprisingly, their CDNs are not necessarily the fastest plus when you're not paying, you have no leverage during any inevitable outages.

Pushes to `main` will update [utf9k.net](https://utf9k.net) automatically although depending on what changes, I sometimes manually trigger a cache purge.
