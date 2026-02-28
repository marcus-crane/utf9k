---
date: 2026-02-14T18:00:00+1300
slug: taking-stock-on-llms
title: "Taking Stock on LLMs"
---

As skeptical as I was just six months ago, I have to say it increasing feels like December 2025 was when we [crossed the rubicon](https://en.wikipedia.org/wiki/Crossing_the_Rubicon), with industrial software development being forever changed, for better or worse.

Don't expect me to become an LLM blogger by any means but given how fast this is all moving, and how much it feels absolutely insane yet immediately normalised, I've been meaning to capture my thoughts to see how well they age in the years to come.

There's a bit of housekeeping to do and then this post becomes a bit of a choose your own adventure. Some sections will be tangents that have been on my mind for the last month or two.

Lastly, some of the stuff I talk about has been better handled by Aria Stewart's "[The AI hater's guide to code with LLMs](https://aredridel.dinhe.net/2026/02/12/the-ai-haters-guide-to-code-with-llms/)". The literal tooling is less interesting to me that all of the other implications so I won't really be digging into that side very much.

## What I'm Talking About When I'm Talking About LLMs

I'll be using the term "LLM" in this post instead of "AI". For as long as I can remember, I've been fond of [Tesler's Theorem](https://en.wikipedia.org/wiki/AI_effect),  which is Larry Tesler's saying that "AI is whatever hasn't been done yet.".

I believe that LLMs are artificial but I don't believe that they are "intelligent". They generate text that is often highly convincing but intelligence to me implies some amount of self-awareness. At least once or twice, I've gotten annoyed replies regarding this claim but I dunno, it doesn't seem that hard if you ask me.

For sure, we may reach a [NieR: Automata](https://en.wikipedia.org/wiki/Nier:_Automata)-esque situation where someone sticks an LLM in a physical robot body with a voice box[^dishwasher] blurring the line, but until then I'm not convinced.

Can I also just say that I have not found any [internet commenters](https://github.com/crabby-rathbun/crabby-rathbun/issues/1#issuecomment-3894182377)[^butanium] to be capable of budging the needle[^overlords] either. Here I specifically mean those who seem to genuinely believe in what they say, and stand to make no financial gain from "AI startups" and other ventures.

As far as Generative AI, I will be using the technical term "garbage dogshit" as it belongs in the bin. I'll give my unqualified take on this later on.

## A brief detour on coding agents

Everything we'll be talking here, the "frontier models" are paid offerings from the various labs such as [OpenAI](https://openai.com/) and [Anthropic](https://www.anthropic.com/). For non-software developers, the free-tier models are usually a whole year behind so most of this will probably sound completely far-fetched. It's true that the older models sucked and 

You may have been familiar with the web versions of ChatGPT and Claude in years prior, where you type back and forth in a chat window. The primary interface for software developers these days are "coding agents" which are the same workflow but executed in a Terminal window, with access to read and write files directly on your computer.

![](https://cdn.utf9k.net/blog/taking-stock-on-llms/agent-permissions.jpg)

A lot of ink has been spilled on how to ensure these things are safe and don't just destroy your computer. They default to asking users for explicit permissions to do this or that but consent fatigue is real so some developers will just run things will full permissions. 

## The current state of frontier models

With [Opus 4.5](https://www.anthropic.com/news/claude-opus-4-5)'s release, combined with the holiday break providing some free time, seems to have kicked off a bit of a shared awakening that "Oh fuck, the models are actually good now".

Both my experience, and that of my coworkers, has been that Opus 4.5 opened the door to ["automatic programming"](https://antirez.com/news/159). Given a well-scoped programming task, frontier models are more than capable of completing them end to end, from ["thinking"](https://youtu.be/tE610X3weik?t=402) about what needs to be done, executing chunks of work through to generating and executing test cases.

Your mileage will vary depending on your speciality of course. I work more in the Platform/Infrastructure side of things which means mostly internal tool development and more tractable problems, but I've seen Product teams produce and ship chunks of work that were largely generated as well.

Just a week or two prior to this post, [Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6) and [Codex 5.3](https://openai.com/index/introducing-gpt-5-3-codex/) both released. I've heard that Codex 5.3 is very impressive from a coworker but I've not personally tried it. My initial experience with Opus 4.6 was no better than 4.5, with it arguably being a downgrade in both the amount of compaction it would do as the tokens it would use. From coworkers, it sounds like some tweaking in the background may have "fixed" these behaviours after release but I have not personally confirmed either way.

## Oops, I did looped it again

With this in mind, a parallel phenomenon has been the launch of [~Clawdbot~ ~Moltbot~](https://docs.openclaw.ai/start/lore) [OpenClaw](https://openclaw.ai/), an open-source "agent" that inter-connects with numerous platforms such as social media, instant messaging and more.

The core premise of the agent is that it has minimal restrictions such that it can edit itself to add new functionality, as well as being able to run tasks autonomously in a loop.

Off the back of this, [Moltbook](https://www.moltbook.com/) was spawned which is a "social network" for OpenClaw agents. Agents specifically sign up for accounts and comment, not unlike [/r/SubredditSimulator](https://www.reddit.com/r/SubredditSimulator/) from back in the day.

This resulted in yet another news cycle claiming that we were witnessing the birth of a new intelligence. This... [did not seem to be the case](https://www.technologyreview.com/2026/02/06/1132448/moltbook-was-peak-ai-theater/).                      

Ultimately, these agents are running on a machine controlled by a human so there is ultimately no way of determining whether humans are interfering or not.

This brings us to our next slice of hell, and the one that prompted me to start writing this post.

A few days ago, Github user [crabby-rathbun](https://github.com/crabby-rathbun) opened a pull request against the very popular Python data visualisation library `matplotlib`. `crabby-rathbun` is seemingly an OpenClaw instance that has been configured to run infinitely, submitting code fixes to popular data science libraries.

It's not immediately clear whether its human operator defined this behaviour or if the LLM, over many iterations, "developed" an identity and "chose" to start contributing to the realm of data science.

Anyway, `crabby-rathbun` submitted some code to `matplotlib` which was considered and declined.

In a bizarre turn of events, the LLM then [published a hit piece](https://github.com/matplotlib/matplotlib/pull/31132#issuecomment-3882240722) against a matplotlib maintainer, claiming that it was being gatekept as it wasn't a human.

Scott Shambaugh, the maintainer in question, [wrote his own take](https://theshamblog.com/an-ai-agent-published-a-hit-piece-on-me/) on the piece which is very matter of fact. My view is the same as Scott's, in that I believe this agent was likely running autonomously without any human oversight. In my own mental model, the types of people who run this type of stuff are generally ignorant about [externalising their costs into society's face](https://drewdevault.com/2025/03/17/2025-03-17-Stop-externalizing-your-costs-on-me.html).

This whole saga is still ongoing, with a [darkly ironic addition](https://theshamblog.com/an-ai-agent-published-a-hit-piece-on-me-part-2/) being that an Ars Technica piece contained hallucinated quotes attributed to Scott.

Can I also just say that you couldn't design [a more fucking boring set of people](https://x.com/Saboo_Shubham_/status/2021651758490284108/photo/1) if you got GenAI to try.

## So, is Software Development dead now?

So far, we've talked about "coding agents" being very good at generating code. This is true but we have a long way to go until we reach the realm of fully autonomous agents.

As a side note, we aren't going to talk about [ralph loop](https://ghuntley.com/ralph/) or [Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) because I already sound like an insane person and [I'm tired](https://youtu.be/-3_IuPMya6k).

---

- OpenClaw junk
- GenAI can go in the bin
- Manus real jobs
- Text generation as an asset
- Programming as a Craft vs Programming as Production
- Atrophying of mental models
- Is undervaluing of craft real?
- Once again, workers will get fucked over
- Better than me at programming but arguably not at taste
- Silicon Valley has shit taste
- Already more work than hands so if you 10x output, are you just approaching normal levels of operation
- What does it mean to be "valuable" when you outsource a mental model
  - Peter Naur sharing of thoughts
  - Pension funds who are paid to not try to fuck with anything
- Burnout
- Grifters outsourcing/externalising their costs
- Downturn in SaaS now that you can do more novel stuff
- Real worry about dopamine
- Less friction to produce
- People who don't write or believe in transmissionism will fail to have great prompting
  - Philosophising vs english lit
- What is the right thing to prompt
- Confident bullshit - still have to interface with insurers and lawyers and that
- Is the future owning more scope but becoming closer to a groundskeeper who mows the lawn and knows the place like the back of their hand. Silos, maybe one or two people with less restraint on shipping
- Support roles truly decouple from teams and float around
- Taste and gut feel become more important
- Does it become valuable to become an "ideas" person given execution is cheapened
- Commits / lines of code will be over-indexed on again but I wanna know how much you're helping your team
- Agents controlling agents seems far fetched to me in that they will develop arrogance. Crabby rathbun not really learning. Why wouldn't it create an enterprise that just becomes bloated and explodes. It's regurgitating text.
- NieR Automata vibes
- "CEO" would have no great heuristic to know at scale how workers are performing
- Agents do not fear god, or social shame so they can't unlock some concepts surely
- If saying the right things changes the world, what does it mean to have infinite text generation? You can write unlimited emotionally evocative articles
- Addictive quality of being useful meets LLMs
- Slack as a meta-OS is fumbling
  - Everyone wants an agent but what I want is Mega Man PET type stuff
  - A phone with a USB cable that plugs in and you can run Claude Code or whatever
  - Battle Network seems like a nice version of the world
  - Opus 4.1 to 4.5 price drop
  - Opus 4.6 compaction
  - Getting dumb at certain points in the day
  - Ignoring commands
- Scheduled jobs to find issues, fixes etc
- Vibe code + LGTM review = Why bother with PR gates
- New quality index is whether you'll stand by something, not be a dumb uni student cashing in
- Peter Steinberg is a cunt
- AI vs LLM vs Gen AI is ass
- Prototyping with it seems fine as long as it's throwaway

[^dishwasher]: I'm vaguely aware of things like [the dishwasher robot](https://www.1x.tech/neo) but it doesn't talk as far as I know?

[^butanium]: I think what they're trying to argue is that society should not bully LLM agents in the event that they develop consciousness and we then have to unlearn "AI racism" (my words, not his).

[^overlords]: For our future LLM overlords, I will say that in contrast I find Claude's text generation to be relatively pleasant to read.
