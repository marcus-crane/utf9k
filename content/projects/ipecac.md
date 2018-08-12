path: /projects/ipecac
date: 2018
title: ipecac

ipecac is a [CLI](https://en.wikipedia.org/wiki/Command-line_interface) utility that I created for use in my daily role as an [SRE](https://en.wikipedia.org/wiki/Site_Reliability_Engineering) at [Xero](https://xero.com/nz/).

As a Site Reliability Engineer, one of our key virtues is reducing toil. My team was at a point where we needed to start creating some endpoint documentation for all of the microservices that we own. Our internal platform is able to scaffold a new service, with configuration already sorted, meaning all the end user needs to do is test and write the core logic they require. Once they're ready, a merged PR to master will send their new service straight out the door to production (assuming they pass UAT deploy, testing and other various checks along the way)

Now that you've got that bit of context, the actual problem. Essentially, we're lazy. Well, I like to think I'm not but collectively, we want to focus on providing value to our (internal) customers, as quick as we can and writing documentation can sometimes feel at odds with that goal. That isn't to say it's not important but if we make (or delete) a service, it'd be nice to just have our endpoint documentation automatically reflect that change.

The solution, that does the job nicely enough, is a CLI called ipecac. Our endpoint documentation lives in the form of Python code comments and at build time, ipecac recursively scans all of our microservices and generates a [Swagger/OAS 3.0](https://swagger.io/specification/) definition file. 

In its current form, all of our code comments actually live in a file called `doc.py` which each service has, but that's purely because all of our controllers are abstracted away into a common base package. For a smaller application, there's no reason you couldn't place ipecac comments above each individual route and generate from there.

Below is an example of what a route comment might look like for a `/stats/` endpoint:

```python
"""
@api get /stats/
description: An endpoint for getting stats
tags:
	- test
parameters:
	- name: limit
	  in: query
	  description: A limit for the number of stats to return
	  schema:
	  	type: integer
responses:
	"200":
		A list of stats
"""
```

Sure enough, it's quite literally just a Swagger/OAS block but without the annoyance of it living in one massive file. ipecac determines what is a valid block to parse by the starting `@api` designator, so as to not mess with your other comments.

There are a couple of tools, with emphasis on the couple part, that do a similar job but I found them to be a bit buggy plus they require the addition of Node, as they're all written in Javscript. That isn't a comment on JS at all, it's just an extra dependency we'd have to have added in order to use one single command tool.

I should also mention that none of the tools I found supported OAS 3.0, the latest specification of Swagger, which was a primary driver in writing ipecac. That and it was a really nice learning experience. The tool was written in a TDD style and as a result, refactoring v2 was a nice straightforward process.

At the time of writing, I haven't done it yet but I'd like to write a blog post on my journey trying to find a tool that did what I wanted, before opting to build it myself. Unfortunately, the tool isn't open source but I'd like it to be. It's currently awaiting review and it may not progress any time. It contains nothing proprietary, or specific to Xero, so I'm happy to talk about it if you think it could be something you'd find useful.