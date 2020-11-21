+++
title = "Configuration magic
date = "2020-11-20"
draft = true
#blog
+++

I don't consider myself qualified enough to write much on the art of programming but I suppose here we are.

I'm currently looking at a repo for controlling infrastructure which is comprised of a lot of `yaml` files, without much documentation, at least as far as I can see.

The specifics don't really matter but essentially, it defines a lot of resources.

As someone relatively new to this project and development environment, I haven't had to spin up any new resources until now, as I've been primarily refactoring things.

There's a `Resources` folder with files named after each environment so imagine `dev.yaml`, `production.yaml` and so on.

I copied and pasted a `Postgres` block from one file to the other so supposedly this means I would get an equivalent database in a different environment, right?

Well, I have no idea given the actual inner workings are abstracted away from me, giving a magical quality to these `yaml` files.

---

Now, I'm not a writer by any stretch of the imagination but quite some time ago, I must've have been binging some videos on storytelling.

I vaguely remember this idea that when creating a fiction world, you should [introduce the rules of the world](https://kidlit.com/breaking-the-rules-in-world-building/) as early as possible.

I believe it's best done within the first 15 minutes for a film but I had a hard time finding anything to back up that claim, although it seems sensible enough.

The idea is that without rules to define your fictional world, anything and everything is possible. How can you have any sense of dramatic tension when your character could just arbitrarily become a superhuman when the story requires.

Anyway, seeing that infrastructure repo reminded me of that. Perhaps to an extent, the "rules" of what is possible aren't clear.

Reading a `yaml` file that is defining arbitrary resources makes me think "Ah, perhaps I can just define any type of cloud resource and it'll magically appear?"

I mean, why not? That seems very magical but so does this whole exercise.

---

To a developer or maintainer who is familiar with the repo in question, that would seem very ridiculous of course.

Code is written by people and can't just magically understand new code blocks or things like that.

There are plenty of scripts in other folders that I'm sure I'll open up and see that there are specific resources that have been defined as being valid inputs but as a "reader" so far, those "rules" are hidden away from me.

If we were to continue with the analogy a bit more, I suppose this is where having documentation serves as a ruleset.

I think in particular as well, if it's purely just source code you're dealing with, this idea doesn't really apply.

It's more if you're creating an abstraction for other people to use. In this case, it's abstracting the creation of cloud resources into `yaml` files.

---

If I stop and think about it, it feels at first like the rules I'm trying to describe are just a schema specification which is probably about right.

In this case, the feeling I'm trying to describe arises from the lack of one so you're left to just try and make one up.

If you were trying to infer how to use a web API, you'd pretty quickly have some feedback but with something like `yaml` files, there is no linting or feedback at all so that's probably what feeds the idea of just absolute chaos where you're totally lost.

Perhaps those mechanisms exist upon a pull request but I haven't checked yet.

---

In a twist of irony, I later found out that those `yaml` files are applied to a set of templates. Some of those templates were deleted however so half of the defined blocks, weren't actually doing anything at all.

My stab in the dark at casting magic would have worked not so long ago but it wouldn't nowadays.

it usually does

	
Marcus Crane
2:03 PM
You can't really infer what works and doesn't just based on the yaml alone though, you usually have to poke around in the code

	
Antz
2:03 PM
yteah

	
Marcus Crane
2:04 PM
and I guess at that point, as a user, it's not much of an abstraction?

	
Antz
2:04 PM
its a cunt to begin with to figure it out
if u dont care like most of our dev teams

they are lazy just post yaml and wait

if it fails make it polaris problem

is how they act

	
Marcus Crane
2:13 PM



I guess I would compare looking at that infra repo to like being in a room with tinted windows haha

No idea what the fuck happens behind the scenes or if you're even writing valid syntax

How do you provide line of sight to what's going to happen with this file?
