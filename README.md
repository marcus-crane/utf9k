# utf9k

This is my personal website, which is powered by [Hugo](https://www.gohugo.io) and [CommonMark](https://commonmark.org).

## Getting setup

To get started, you'll want to install Hugo using one of the variety of [officially supported installation methods](https://gohugo.io/getting-started/installing/)

Once you've got the `hugo` binary, you should just be able to run `hugo server` to open my site in your browser

I find that some of the pages render differently locally, such as the blog post list not chunking by year.

Running `hugo server --disableFastRender` seems to fix this but I haven't looked into it too deeply just yet

## Layout

Pages and posts live in `content`

HTML templates live in `layouts`

Images and other static content lives in `static` (for now)

## Deployment

Deployment is handled automatically by [Netlify](https://netlify.com) upon a merge to master

I also use a `next` branch, which renders pushes to [next.utf9k.net](https://next.utf9k.net). Future and draft posts are visible to allow easier proof reading that mirrors the final result.

I might also try splitting traffic to test out layout tweaks or something but honestly, I have no idea how I'd meaningfully measure the success of such a thing.
