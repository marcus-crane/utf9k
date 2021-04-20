# utf9k

![MIT License](https://img.shields.io/github/license/marcus-crane/utf9k)
![Netlify Build Status](https://img.shields.io/netlify/6c4341d4-b644-4fcb-ba4d-c67d63c92e9c)
![Hugo version](https://img.shields.io/badge/hugo-v0.78.2-blue)

This is my personal website, which is powered by [Hugo](https://www.gohugo.io), [Tailwind](https://tailwindcss.com/) and [CommonMark](https://commonmark.org).

## Getting setup

To get started, you'll want to install Hugo using one of the variety of [officially supported installation methods](https://gohugo.io/getting-started/installing/).

You'll also need to have [npm](https://www.npmjs.com/get-npm) installed.

I recommend using [yarn](https://yarnpkg.com/) as a package manager but nom works fine.

Once you've got both of those set up, running `yarn start` will do everything required to start up a local server.

You should be able to access the development version of the site at http://localhost:1313

## Layout

Pages and posts live in `content`

HTML templates live in `layouts`

Images and other static content lives in `static` (for now)

## Deployment

Deployment is handled automatically by [Netlify](https://netlify.com) upon a merge to master
