# utf9k

![MIT License](https://img.shields.io/github/license/marcus-crane/utf9k)
![Hugo version](https://img.shields.io/badge/hugo-v0.83.1-blue)

This is my personal website, which is powered by [Hugo](https://www.gohugo.io), [Tailwind](https://tailwindcss.com/) and [CommonMark](https://commonmark.org).

## Getting setup

To get started, you'll want to install Hugo using one of the variety of [officially supported installation methods](https://gohugo.io/getting-started/installing/).

You'll also need to have [npm](https://www.npmjs.com/get-npm) installed.

I recommend using [yarn](https://yarnpkg.com/) as a package manager but npm works fine.

Once you've got both of those set up, running `yarn start` will do everything required to start up a local server.

You should be able to access the development version of the site at http://localhost:1313

## Layout

Pages and posts live in `content`

HTML templates live in `layouts`

Images and other static content lives in `static` (for now)

## Deployment

Deployment is done via Github Actions, which deploys a Docker image to [fly.io](https://fly.io)

Pushes to `main` will update [utf9k.net](https://utf9k.net) automatically.

Drafts are visible in all environments, as seen in the [blog](https://utf9k.net/blog) section at the bottom.

I just push straight to main. It's all visible in the repo anyway so might as well render it in "production" too.
