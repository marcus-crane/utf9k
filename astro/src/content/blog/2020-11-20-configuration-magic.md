---
title: "Configuration magic"
date: "2020-11-20T00:00:00+1300"
description: "Configuration is great! Magic... not so much!"
slug: "configuration-magic"
category: "blog"
tags:
  - "complexity"
  - "configuration"
---

I don't consider myself qualified enough to write much on the art of programming but I think this is probably the closest I've ever found myself.

## The situation

I'm currently looking at a repo for controlling infrastructure which is comprised of a lot of `yaml` files, and the documentation was a bit sparse, at least as far as I can see.

While the specifics of the domain don't really matter too much, the repository mainly defines a lot of compute resources.

In order to make it easier to visualise, here's an example that roughly shows how it's laid out:

```bash
> tree Resources
Resources
├── test
│   ├── teamA.yaml
│   ├── teamB.yaml
├── staging
│   └── teamB.yaml
├── production
│   ├── teamA.yaml
│   ├── teamB.yaml
│   └── teamC.yaml
```

Each team has a `yaml` file per environment and each file defines a variety of resources such as databases, caches and so on.

Let's look inside a file to see an example. Once again, I'm using entirely made up values but the idea is roughly the same.

```yaml
> less Resources/test/teamA.yaml
MySQL:
	- Name: my-sturdy-database
	  Group: TestResources
	  Resource:
	  	Size: PrettyBig
		Purpose: EatingMemory
		Replicas: 1

Varnish:
	- Name: cache-me-up-scotty
	  Group: TestResources
	  Resource:
	  	Size: ModeratelyBeefy
```

I should note that we use neither `MySQL` or `Varnish` (to my knowledge) as they're just made up examples.

Amongst that lot were also cloud resources and other things defined but the point is that there seemed to some sort of structure?

As far as how I actually define anything, I have no idea.

Surely, I can't just arbitrarily define a "Hadoop" block and get a [Hadoop cluster](https://www.chrisstucchio.com/blog/2013/hadoop_hatred.html) out of thin air, that would be ridiculous!

Wouldn't it? With no information to prove (or disprove) the idea that maybe it just magically works, I was reminded of an aspect of storytelling.

## Fictional worldbuilding

I'm not a writer by any stretch of the imagination but quite some time ago, I must've have been binging some videos on storytelling.

I vaguely remember this idea that when creating a fiction world, you should [introduce the rules of the world](https://kidlit.com/breaking-the-rules-in-world-building/) as early as possible.

I believe it's best done within the first 15 minutes for a film but I had a hard time finding anything to back up that claim, although it seems sensible enough.

The idea is that without rules to define your fictional world, anything and everything is possible. How can you have any sense of dramatic tension when your character could just arbitrarily become a superhuman when the story requires.

Anyway, seeing that infrastructure repo reminded me of that, as the "rules" of what is possible aren't clear.

Just to be clear as well, I'd say this is only really a side effect of when someone creates their own language of sorts.

## Is text a good interface?

To a developer or maintainer who is familiar with the repo in question, the idea that none of the above is completely obvious would probably make them laugh quite a bit.

There is no such thing as magic when it comes to writing code, in so much as there are only more layers of code below the iceberg tip you're currently staring at.

It only makes sense that there is machinery tucked away somewhere, likely a handful of scripts, which are parsing these files.

After a bit of poking around, and some question asking, it turns out each of the keys defined are matched against a supplied template, and those parameters are baked into the template. The resulting output is then submitted to our cloud provider and creates/updates the defined resource.

At this point, one could argue that the entire idea of creating an abstraction through yaml files has mostly broken down the second a user needs to poke behind the curtain.

In a cruel twist of irony, some of those templates were actually deleted and so the keys supplied such as `MySQL` in our mock example, were doing nothing at all. You'd have no idea however because text can't really provide you feedback as a user like, say, a language with a linter might tell you about an unused variable.

To be entirely clear, I have these same issues with most any `yaml` based format such as a Helm but I guess Helm has the begrudgingly awarded +1 of IDE support. Without it, I'd be tearing my hair out just as much.

## What's the lesson here

Well, I don't really have the vocabulary to do any meaningful criticisms or suggestions here. Once I get used to the repo in question, I'm sure I'll never think about it again and the cycle will repeat once more for whoever comes along next.

Looking back, I must have missed something because there is a bit of documentation but still, it's fairly on explanation.

Most of the setup follows convention over configuration but it sort of assumes you just know the convention too.

I suppose to an extent, it's just to do with my lack of familiarity with our provider having only been a few months in.

What I mainly wanted to capture was the feeling that arose from a lack of seeing a clear rule set. Not unlike a fictional rule set, without one, you're sort of left to infer the boundaries of the situation you're currently in.

I think at its core though, I don't like using text or configuration files for programmatic things, as there isn't a whole heap of feedback until you apply said file?

If I had to pick something that seems like a nice alternative, perhaps [Pulumi](https://www.pulumi.com/product/#sdk)? I can't say I've really used it but on paper, it sounds kind of appealing.

Well, in so much as infrastructure is appealing which some days I'd rather just have a nap to be honest.
