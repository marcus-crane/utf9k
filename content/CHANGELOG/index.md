# CHANGELOG

## 2020

### January

#### 6th

* Wrote a blog post detailing how to create an ssh config file [»](/blog/multiple-git-hosts)

## 2019

### December

#### 30th

* Ported all posts back to Markdown. Perhaps I'll do a postmortem about what I liked and disliked about Asciidoc since it's really promising but not quite there just yet.
* Ditched any custom stuff in favour of the `hello-friend` theme

#### 24th

* Realised that I lost this changelog somewhere along the way so revive it and backfilled it again
* Rollback back repo from Markdown version to Asciidoc version because I was reminded just how much stuff I would have to implement from scratch like callouts and nice table formatting

#### 18th

* Converted the remaining posts back to Markdown so I could roll out a markdown version of the site to production

#### 16th

* Started porting a buch of posts back to Markdown as a number of services don't natively support reading it

#### 14th

* Added a maximum width for post content since it would be absurdly large on bigger monitors
* Began porting site to an older layout using tachyons, that was more stylistic. I kinda miss it!

#### 12th

* I started experimenting with Tachyons[https://tachyons.io] again for creating a CSS layout. I really need to stop messing with so many different frameworks...

#### 4th

* I noticed that some posts seemed to be missing. Turns out Hugo was paginating posts, so only the first 10 would appear! I fixed that.

### November

#### 29th

* Made a slight rewording of the homepage greeting

#### 27th

* Did a little bit of general repo cleaning

#### 16th

* Added a note about how to find WSL files on Windows 10 [»](/notes/programming/tools/wsl)

#### 15th

* Created an experiment that would recursively map out the notes folder into a tree structure

#### 5th

* Ported site from Jekyll to Hugo as it has a smaller footprint plus nicer reload functionality. The cost of having double frontmatter isn't so bad really.

#### 2nd

* Added a draft for a halloween post that I would never finish.

### October

#### 31st

* Fixed a typo in the emergency services post

#### 30th

* Reset + recreated CSS to focus on readability. I'll need to reimplement some previously existing styles such as code highlighting, tables and so on but for now, I'm just going to roll out the changes incrementally.

#### 29th

* Added some tips for getting image metadata and converting SVGs to PNGs [»](/notes/programming/tools/image-conversion)

#### 21st

* Added a tip about automatically importing and/or aliasing modules in IEX [»](/notes/programming/languages/elixir#automatically-aliasing-modules-when-starting-iex)

#### 20th

* Finally completed backfilling this entire CHANGELOG. Enjoy!

#### 16th

* Moved some more notes onto the site but most of them won't be very effective until I redesign the site's CSS

#### 15th

* Started adding a personal notes section

### September

#### 27th

* Removed italics to make the site easier to read, and fixed some typos in the email lookup post
* Added an old review for Yakuza [»](/reviews/yakuza)
* Cleaned up and added an old post about Deepfakes [»](/blog/deepfakes)

#### 26th

* Wrote a blog post about a handy trick I use to look up email addresses that I'm not 100% sure about [»](/blog/email-lookup)

#### 7th

* Backfilled the changelog some more. Entries mentioned new posts now link to said posts
* Swapped the (supposedly placeholder) https://graphemica.com/%E2%8F%8E[return symbol (U+23CE)] being used as a back button for a https://graphemica.com/%E2%9E%B2[circled heavy white rightwards arrow (U+27B2)]. I couldn't find a leftwards version so I just rotated it using some CSS
* Updated some links to be relative, such as the CHANGELOG on the front page which was a link to the live version up until now. Much nicer for working locally.

#### 1st

* Realised I had broken all of the links when porting to Jekyll! Links like `/blog/lore-tabs` now looked like `blog/2018-02-28-lore-tabs`. This wouldn't be such a big deal but I've linked to some posts and I know that searching `arch linux on intel nuc` on Google brings up my post in 3rd place. Hopefully it's useful for some people, despite possibly being a little out of date. It's a handy Arch guide in general I think, since I use it myself. I should write more in depth explainers sometime.

### August

#### 29th

* Switched the primary repo for this site from Github to Gitlab
* Filled out the majority of the changes for 2019.
* Added this changelog to track all the different variations of my site over time (will fill it out later)
* Moved to Jekyll. I wanted to try Asciidoc and Hugo puts some limitations on Asciidoc rendering.
  - I also removed all of the list type pages in favour of having everything the front page. Still not sure how I feel about it so it might change some more in the future!
  - Fixed some small typos on posts while porting them from markdown to asciidoc. Everything starts at v1.0 with those amended updated to v1.1

#### 19th

* Wrote a post about turning 25. It was mainly just a tangent about what I'd like to do with this site going forward. [»](/blog/25)

#### 6th

* Added an MIT License. All of my stuff already carries an MIT license anyway.

### July

#### 29th

* Wrote a post about extracting credentials from Jenkins [»](/blog/retrieving-jenkins-credentials)
* Removed pagination from the blog list page

#### 20th

* Added https://forestry.io[foresty.io] configuration again. It wouldn't survive very long.
* Added a post about fixing an issue with upgrading from WSL v1 to v2. I remember drinking a bit when I finally solved this probably so I drunkly wrote this post too :) [»](/blog/wsl2-vhd-issue)

### May

#### 21st

* Revamped everything to follow a dark theme while still aiming to be readable. It was inspired by a website I was browsing on an iPhone 6S Plus set to greyscale mode!
* All of the CSS was entirely from scratch whereas I had been using CSS frameworks up until now.

### March

#### 21st

* Added a post thinking about the future of emergency services. This would have been shortly after I had been admitted to hospital, if not the same day. [»](/blog/future-of-emergency-services)

#### 18th

* Uploaded my resume as a static asset for easy linking. Not particular relevant to the content of the site.

### February

#### 22nd

* Uploaded some images from a work related incident. Looking back, I probably shouldn't have but there's nothing particular useful or secret in there anyway.

#### 10th

* Uploaded `vsreport.html` which was a security review of sorts for a videogame I was playing. I had churned it out like an entire year prior but never hosted it anywhere. I think I was talking to someone about it and wanted to send them a link.

#### 7th

* Tried out https://forestry.io[forestry.io] for the first time and quickly discarded it. It's a cool project but I don't have much use for it myself.

#### 3rd

* Wrote my first review in like 2 years. It wasn't a review at all, it was more just me gushing about Battle Angel Alita before the film adaption released. I never did go back and write an actual review... [»](/reviews/battle-angel-alita)
* Added support for https://utteranc.es/[utteranc.es], a neat little comment section powered by Github.
* Revamed the site to move from tailwind.css to spectre.css
* Some of the layout changed as a result such as adding opengraph metatags and generally going for a more minimalist approach.

### January

#### 27th

* Removed the stats page from navigation. It was only showing a placeholder page anyway and so far marks the last time it appeared.

#### 15th

* Uploaded my parnell mapping side project (but not presented anywhere user facing)

#### 13th

* Updated currently listening script to point to a proper domain name instead of a raw IP address
* Added some whitespace to the currently listening portion of the footer

## 2018

### December

#### 29th

* Added a script for showing what I'm currently listening to or watching. It was powered by a single node kubernetes cluster. Hugely overkill but it was an interesting learning experience!

#### 27th

* Removed the project page for ipecac which I didn't really intend to publish yet. It was literally half finished with some sentences that just cut off midway. Oops!

#### 26th

* Added a README describing how the site operates and is deployed
* Added a project page for ipecac
* Finished rewriting styling to use flexbox
* Added a footer that shows randomly generated lines of nonsense
* Added estimated reading time for blog posts and reviews
* Enabled support for emoji and git info
* Added links to repo birthdays project post
* Added font awesome for use in posts

#### 24th

* Swapped from monokai to oceanic-next styling for code blocks
* Add styling for singular `<code>` elements
* Added a 404 page
* Removed CSS from base template in favor of an extensable params block in the site config
* Added some overrides for the blackfriday markdown parser used by Hugo
* Started rewriting styling to make use of flexbox

#### 16th

* Fixed a typo in the [lost python results](/blog/lost-python-results) post

#### 14th

* Fixed a bug where social media links had mistakenly set a second `href` instead of a `class` attribute

#### 13th

* Update [arch nuc install](/blog/arch-nuc-install) and [lost python results](/blog/lost-python-results) posts to use hugo's syntax highlighting shortcode

#### 12th

* Wrote a post about the `-` operator in Python [»](/blog/lost-python-results)

#### 8th

* Ported reviews over to Hugo
* Added pagination

#### 7th

* Ported site from https://blog.getpelican.com/[Pelican] to https://gohugo.io/[Hugo]

#### 6th

* Swap out https://github.com/pypa/pipenv[pipenv] for https://github.com/sdispater/poetry[Poetry]

#### 3rd

* Added post about Twitter automation [»](/blog/automation-right)

### November

#### 28th

* Changed border for contact form inputs from grey to black

#### 19th

* Added projects page for repo birthdays chrome extension
* Added some reviews that used to live at https://neatgam.es

#### 18th

* Disabled RSS feeds and added Pygments

#### 15th

* Added styling for tables
* Added Monokai syntax highlighting colour scheme

#### 14th

* Added a contact form powered by Netlify
* Changed from https://tachyons.io/[Tachyons] to https://tailwindcss.com/[Tailwind CSS]

#### 7th

* Ported remaining content over to Pelican

#### 5th

* Ported from Flask app to https://blog.getpelican.com/[Pelican]

### August

#### 25th

* Added draft post about Docker container security. I never actually finished this but I believe someone compromised my Redis instance (it wasn't secured). Not side effects though since all of the content was static content anyway.
* Updated CSP header to whitelist self hosted images

#### 20th

* Fixed `strftime` bug in the site footer

#### 19th

* Moved credentials to not be inline so I can commit settings
* Added a fallback for any missing cover art
* Fixed error with links

#### 18th

* Added a post about submitting Official Information Act requests in New Zealand [»](/blog/nz-oia-guide)
* Added Google Analytics
* Fixed sorting to show posts in reverse order

#### 16th

* Added movies to the stats page

#### 15th

* Added redirect from my old URL `thingsima.de` to `utf9k.net`
* Added page for showing personal stats

#### 12th

* Added section to footer that fetches and shows the latest commit for the site
* General style changes
* nginx change for rewriting `https://www.utf9k.net -> https://utf9k.net`

#### 11th

* Set up nginx for serving the site
* Copied over some static files

#### 9th

* Moved site to a new repo at https://github.com/marcus-crane/utf9k (now archived). This was to reflect the move from https://thingsima.de to https://utf9k.net
* I believe at this point, I reverted to the old Flask site I had. Prior to this point, I was using Django

### May

#### 10th

* Added README
* Added placeholder keys for `giantbomb`, `howlongtobeat` and `steam`
* CSS changes to better suit mobile devices

#### 6th

* Moved from https://tachyons.io/[Tachyons] to https://picturepan2.github.io/spectre/[Spectre CSS]
* Changed from https://github.com/pypa/pipenv[pipenv] to a generic virtual environment

### April

#### 8th

* Started rendering covers for Goodreads entries on stats page
* Fixed RSS feeds
* Fixed date rendering for blog post list
* Update postgres container to only save state to disc during development

#### 7th

* Updated postgres container to save state to disc
* Update game fetching to ignore any non-game resources

#### 6th

* Added currently playing games to stats page
* Updated config key examples

#### 2nd

* Rolled out the port from Flask to Django

### March

#### 31st

* Containerised the site to run Django and any background tasks from a single docker-compose file

#### 30th

* Started rebuilding the site using Django

#### 12th

* Fixed some CSS styling for larger monitors
* Updated the stats portion of the site to automatically populate upon startup of the backend server

#### 3rd

* Uploaded some old reviews to the site
* Fixed RSS generation

#### 2nd

* Made some alterations to the lore tabs post. Mainly just editing jarring sentences.

#### 1st

* Added a new post called "Humans don't come with lore tabs" [»](/blog/humans-dont-come-with-lore-tabs)

### February

#### 18th

* Started trying to write tests for some elements. I claimed to be doing TDD but I was writing tests after the fact so...

#### 17th

* Pruned a bunch of unused CSS
* Added some error pages
* Updated blockquote parsing

#### 12th

* Churned out a blog post before starting my first day at Xero [»](/blog/day-xero)

#### 10th

* Added some custom CSS sizing for the stats page
* Added some CSS for pygments pulled from an Oceanic Next stylesheet [»](https://github.com/wbinnssmith/base16-oceanic-next/blob/master/pygments/base16-oceanicnext.dark.css)
* Extended mistune's renderer to parse blockquotes and code snippets within Markdown

#### 8th

* Messed with stats page styling a bunch
* Normalised all URLs to be eg; `/blog/` instead of `/blog`

#### 6th

* Attempted to add docstrings to the various Python functions that made up this version of the site. They were comments that described what the code did, rather than why the code was written a certain way. I wouldn't consider them particularly useful at all, it was more about emulating what looked like good documentation without understanding what actually makes good documentation :)

#### 5th

* Applied Pycharm auto formatting to the repo which, in hindsight, destroyed the layout of the main app.py file. I always wondered what had reduced it into a one line view within Github!
* Changed static file URLs to start from the root eg; `/static/style.css` became `/style.css`.
* Polished off a post about Deepfakes [»](/blog/deepfakes)

#### 4th

* Added a `manifest.json`
* Rearranged parts of the Deepfakes post I was in the process of writing
* Added an indicator for whether a post was safe for work or not

#### 2nd

* Merged and deployed the migration from Django to Flask, into "production"

#### 1st

* Split out the stats portion of the site from the rest of the content

### January

#### 29th

* Started adding Celery as a background scheduler for updating stats
* Ported game reviews to Markdown
* Added RSS generation

#### 28th

* Recreated most of the stats page functionality in a very messy fashion
* Swapped out show stats from TMDB to TVDB as it often had better cover art I believe
* My first crack at using class inheritence within this version of the site. I still didn't understand the idea of classes so this was perhaps my first time trying to properly grasp their purpose.

#### 27th

* Starting importing credentials as environment variables. Good thing I didn't accidentally commit one of the API keys I was using...

#### 26th

* I believe until this point, I had been writing a lot of closures for the stats portion of the site. I started writing some classes, for the sake of having classes, likely because I had seen them used in Django a bunch. Looking back, it's funny to me that I had a file called `classes.py`!

#### 21st

* Churned out CSS, HTML templates and even markdown rendering. I got the rewrite to a point where it would render a dummy blog post (from a markdown file to a HTML page with CSS)

#### 20th

* I deleted the entire site and started rewriting it from scratch as a containerised Flask app

#### 8th

* Made an attempt at dockerising Django which wasn't the cleanest thing to do, given the existence of migrations

#### 7th

* Added error / not found images for tv series without cover art

#### 4th

* Added functionality to pull recently watched movies and TV shows from https://trakt.tv[Trakt.tv], every 30 minutes.

#### 3rd

* Continued improving the review portion of the site. New reviews would automatically pull, resize and apply gausian blur to cover art, which acted as a background banner.

#### 2nd

* Started adding a django app for supporting reviews that used to live at the now defunct https://neatgam.es
* Changed markdown rendered from markdown2 to CommonMark as it had an extension for tables in Markdown

## 2017

### December

#### 30th

* Added placeholder cover art for items on the stats page that didn't include them

#### 29th

* Added movies to stats page and refactored a lot of celery related code

#### 28th

* Updated code highlighting to use an Oceanic One theme
* Added support for fetching recently watched TV episodes to the stats page

#### 26th

* General style tweaks and styling for markdown tables

#### 20th

* Committed some dependencies that were missing from `requirements.txt`

#### 19th

* Reverted + disabled some pages that weren't working correctly
* General bug fixes
* Cleaned out a heap of non-essential dependencies

#### 5th

* Upgraded the site to Django 2.0 (was previously 2.0 beta 1)

#### 2nd

* Altered styling for blog detail and list templates

#### 1st

* First version of my stats page went live!

### November

#### 21st

* Added live Steam stats to the contact page, using the profile API
* Completed the first working version of stats page. Essentially just scheduled tasks using Celery.

#### 20th

* Started writing the first version of the stats page. This used to be my "flagship" feature of my personal site. It would pull all sorts of stats regularly such as what music I was listening to. I learned a lot maintaining it, even if I was the only person who actually looked at it!

#### 19th

* General improvements (hide draft posts, add status code 500 error page etc)
* Created a prototype of what would become the "stats page". It would pull recently played tracks from Last.FM in real time. This would never scale though since it would be pulling the same information every time, rather than caching it.

#### 18th

* Generated some slightly better configuration for the production version of the site
* Added a 404 error page

#### 8th

* Added support for providing custom header/footer items such as one off JS scripts

#### 6th

* Pulled in Django's admin panel CSS rather than generating my own

### October

#### 29th

* Updated `requirements.txt` to reflect the current requirements to run the site

#### 28th

* Removed prev / next buttons for blog posts
* Added a section for projects

#### 27th

* General restyling and refactorings
* Added a contact / feedback page

#### 26th

* Rearranged the site folder structure even more, which had these weird extra namespaces
* Created a new homepage which was previously just an image of a terminal

#### 25th

* Rearranged directory after seeing how the Dolphin emulator website was structured
* Added the bulk of the code that would live on inside the Django version of the site such as markdown rendering and post display logic

#### 24th

* Added escaping for markdown posts
* Added some CSS that extended off of https://tachyons.io/[Tachyons]

#### 23rd

* My first recorded commit for my personal site adding an empty Django project, followed by a model for a blog

If there are any changes that existed earlier than this, I'll see if I can find them. I know I definitely had some blog posts written prior to this point but I don't know if they were hosted anywhere.
