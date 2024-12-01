---
category: blog
date: 2024-12-01
description: Apparently it's been slightly more than a year
output: src/content/blog
publish: true
slug: lessons-beeminder-year-one
tags:
  - beeminder
  - retrospective
title: Lessons from a year with Beeminder
---
As I've written [about before](/blog/beeminder-is-neat), I've become a bit of a Beeminder convert over the last year.

For the uninitiated, it's a service where you define some goals and they're tracked over time. You feed in numerical data points and you either meet your goal (say; doing X 5 times a week) or you derail which gives you some buffer space before climbing back on the horse.

The key difference though is you're charged real money if you derail to guarantee that you have a proper incentive. Each time that you derail, the price you pay raises exponentially starting at $10 and jumping to $30, $90 and so on up to the maximum limit that you decide in advance.

At first, this sounds pretty nutty and way too stressful. I thought that at first but my relationship changed from thinking it was completely miserable to being a near flawless external motivation tool.

To some extent, the actual paying money part starts to become less of a motivator than just the personal consequence of falling short of a goal and that is somewhat intentional.

The [Beeminder blog](https://blog.beeminder.com/) is home to all sorts of theorising and one of the core posts, that I can't remember the name of, outlines an expectation that you should consider a Beeminder goal to be a question of "How much does this mean to me?".

It's perfectly reasonable in Beeminder world to look at a goal that is due today and decide "Actually, I would rather pay $10 right now instead of committing myself to making progress towards this goal".

You could also just simply not do the goal but your lack of inputting data would be taken as a derailment and yes, you could just enter fake data but then the whole premise of a commitment device goes out the window.

I should mention as well as Beeminder as a business is closer to what I would consider a "lifestyle business". It's run by a handful of people whose product exists to make money in the most literal form but paradoxically, it's the opposite of an anti-pattern riddled, anti-consumer product as anything I can think of.

That isn't to say Beeminder is without its occasional bugs[^1] or UX complexities but if you feel that a derailment was unfair, you can just email Support and receive a refund, no questions asked.

I say that having done it many times, but only where I felt it was legitimate. I've even done it where I was genuinely sick and the concept of Beeminder didn't exist in my mind until I was healthy again.

So, what do you actually get for your derailments, besides being incentivised to try harder? By default, Beeminder [costs $0 to use](https://www.beeminder.com/money) but you're limited in the number of goals you can create. Each time you derail, you earn the ability to create another goal. If you like, you can also subscribe monthly in order to gain an unlimited number of goals[^2] but it's completely optional.

Now then, with that introduction out of the way, here are some useful tips for anyone starting out that I've learned the hard way from my first year with Beeminder.

They should be generally applicable to any goal measurement, even outside of Beeminder so if you get value either way then that's great to hear.
## Pace yourself

When starting out with Beeminder, it can be very tempting to enter all starry eyed and set yourself up with a few goals to do daily.

There's nothing wrong with daily goals but continue down this path and suddenly you'll find yourself stressed trying to juggle all of these commitments.

Some goals make sense being daily[^3] but most goals really deserve to be spread out. It's infinitely better to be slow yet consistent with a goal than it is to try and rush through it only to get burned out in record time.

Sometimes this can be unintentional, such as committing to action a goal every couple of days, only for upcoming events to make your goals hard or even impossible[^4] to accomplish.

The Beeminder community has a term for this which is [Calendialing](https://blog.beeminder.com/calendial/). In short, you set a goal to review your other goals once a week and check whether their scheduled frequency still makes sense and will be feasible given any upcoming events.

It's possible and even expected to scheduled breaks for Beeminder goals. The only caveat is you can't pause goals immediately. Instead, you have to schedule breaks and/or goal frequency a week in advance just to make sure you're sure about your changes. It would be too easy if you could just arbitrary opt out of any consequences after all, genuine circumstances not withstanding.

## Throughput beats volume

This is quite similar to the previous point in some ways with a slight twist.

Let's say you want to work through your email backlog and there are 300 items in there.

You set up a goal to whittle down your backlog from 300 to 0 and then you just go absolutely nuts, doing a heap of items each day.

Meanwhile, your backlog is slowly gaining new items and suddenly, you're burned out just a few days into your goal.

What you really want to do is resist measuring goals in pure volume. Not only because volume changes but because it can be too tempting to try tackling it all in one sitting.

What you really want to optimise for is throughput, actioning X items per Y days[^5] for example. In the worst case, you'll only have to do a small amount per day, knowing you're making progress. In the best cases however, you'll have extra energy and do slightly more than your goal, getting you ever closer.

Before you know it, you'll have made [huge progress](https://www.beeminder.com/utf9k/readwisearticles) through your backlogs and it won't have even felt like you did much work at all.

## Don't solely measure outputs

It's a bit of a truism to say that only measuring outputs doesn't guarantee a better process but I still fall for this trap at times.

My most obvious example is [weight tracking](https://www.beeminder.com/utf9k/weight), specifically gaining weight but we'll talk about weight loss as a clearer example.

If I wanted to put on weight, simply tracking my weight would have Beeminder ask me each period of time to input my weight and on the goal due date, I am either at (or above) my goal which is fine or I'm below it and derail.

In this scenario, I might see that my weight goal is due a few days out but my options may be somewhat limited. A step goal is quite easy in that I can just walk more steps, even if I have to do a long walk in one go, but the same is not quite so true for weight.

Sure, I could stuff my face with food but if you're not naturally a large eater, physically doing that is going to be quite uncomfortable. Cause and effect is also very confusing where you can eat a bunch and then not necessarily be any heavier. Likewise, you could probably drink a bunch of water, cheese the weigh in and then be back to normal the next day.

The catch here is measuring weight is measuring an output and it's often too late to influence the output by the time your goal comes due.

The next step, which is what I had done, is to set up a meta goal. A [meta goal](https://help.beeminder.com/article/323-metaminder) is one where upon entering data for one goal, a trigger is sent to another goal incrementing it by one.

Specifically, my weight meta goal tracks the number of weigh-ins I do so I enter my weight into Apple Health, it gets tracked against my weight goal and then my meta goal is incremented allowing it to bypass the goal check when it comes due.

By doing this, you not only ensure that your weight goal contains data but it forces you to be a bit more mindful about your actual goal as well. The number of weigh-ins isn't really something I care about nor does it have any effect on the final outcome.

That, for the longest time, was as far as I had actually developed my strategy and it's essentially what lead me to archiving my weight goal earlier today as I mention this.

I realised that tracking output at all, at least in a goal-based manner, is completely useless as it's not actionable. What I really should be tracking are inputs such as pre-planning meals that would provide enough calories to more than offset what I would burn throughout the day or drinking enough water to influence water weight.

Were I to follow that, which I probably will set up once I hit send on this post, I would likely have a more consistent result than trying to simply measure and erroneously influence outputs.

As a last point on this topic, my [blog](https://www.beeminder.com/utf9k/blog) goal is also somewhat output-based as well. I can influence it like steps, as I am right now writing a post in one sitting during the evening, but it should be moved to be more input-based.

Something like tracking a certain number of words written per X days where the end result is a post for example would work. On first thought, I would think that churning out a large volume might impact quality compared to waiting until I have an "A-ha!" moment but as the parable goes, [quantity can often lead to better quality as a side effect](https://austinkleon.com/2020/12/10/quantity-leads-to-quality-the-origin-of-a-parable/).

## Know when to drop stuff you dislike

This one seems pretty straightforward but I'll elaborate a bit.

When starting a new hobby[^5], it might not naturally be enjoyable (or you may just never carve out time) so setting up a Beeminder goal makes a ton of sense to gain some initial motivation.

Some hobbies may also be things you really want to do but are uncomfortable or awkward in a healthy sense. Starting anything new often sucks when [your taste outweighs your skills](/blog/publish-old-works) in that moment.

Eventually though, you should hope that a new hobby becomes somewhat naturally. You can still track it as a fallback with Beeminder but you should keep an eye out for whether your relationship to that goal changes for the better or not.

I had a [goal](https://www.beeminder.com/utf9k/sonicpi) earlier this year to learn [Sonic Pi](https://sonic-pi.net/), which describes itself as a "code-based music creation tool".

You can call and write functions using the Sonic Pi language and as you add more complex layers, you get more complex music. I admire the tool but as a professional programmer by day, I don't often love programming.

I like creating stuff but the actual act of programming itself is usually just a byproduct to get there so I eventually realised that while the thought of Sonic Pi is neat, I don't think I could see myself truly enjoying using it. Much like the thought of being extremely good at Math seems useful but the actual act of having to get there? Not so much.

Thankfully, I decided to archive the goal and spared myself from having to carve out time each week and spend most of it thinking "I wish I was doing something else right now".

## Try to maintain some buffer

I'm still guilty of only crossing off my goals when they're "in the red" meaning they're due within the next 24 hours.

This always used to be stressful at first but after some time, it stops being that way. Looked at from another angle, items in red are the only things you have to do in order to make steady progress towards your goals since everything else is already taken care of.

All that said, suddenly having 7 goals due in one day because a few multi-day goals happened to align with a couple of rare goals can still be quite stressful.

With that, you should aspire to build up buffer in your goals and not have red emergencies each day.

You can do this either by simply looking at your goals due and doing extra each day until buffer is built up or by adjusting your commitments to be easier, which brings us back to the first point around pacing yourself.

If you're constantly in the red, it may also be a sign that you need to do some calendialing.

## It's ok to be lenient

Over time, I've developed a few internal rules and most of them are all listed in this article.

One which I was most worried would break Beeminder is occasionally marking some goals as done when they're really not.

This most commonly occurs when I've got a goal that I could do, such as [watching a talk](https://www.beeminder.com/utf9k/talks) but oh geez, it's 11:30pm and I should head to bed.

In my early days, I would always leave my goals too late and then wouldn't head to bed until they were done. This still happens sometimes but where it makes sense, I'll often mark a goal is done and then just do it the next day.

This can be a slippery slope however so you should only do it if you feel confident enough that you'll hold yourself to account for doing it.

I generally put a placeholder note in the data field with "TBA" and then fill it in when the goal is done so I don't have to remember whether I did actually end up doing it or not.

When you have goals that you dislike, as discussed above, it can be tempting to just +1 them to deal with tomorrow. If you start to recognise that behaviour, the correct thing to do is not just continually +1 but actually archive the goal and free yourself.

I do this with a [journalling goal](https://www.beeminder.com/utf9k/journal) where I sometimes have too much buffer and forget to fill out entries for a few days so I end up backfilling data with a special notation. It looks like `Today + Backfill (1/1, 2/1 and 3/1)` if you're curious.

Ideally I would have no backfilling but life happens.

## Beemind things that are good for you

While the most common usage for Beeminder is to do things that are less enjoyable, I'm talking here about things that are genuinely good for you or even fun.

Life isn't all about pure productivity but as someone guilty of being caught up in their career at the best of times, Beeminder has actually helped me unwind some of that mess as well.

Over the last year, I've used Beeminder to [watch nearly 80 movies](https://www.beeminder.com/utf9k/movies) that had been on my backlog as well as ensured that I've taken [regular vacations](https://www.beeminder.com/utf9k/vacations)which I [know is important](/blog/taking-holidays) but the admin involved can make it tempting to put off.

It's even better if you can predict what sorts of things you let fall by the wayside and counteract them. I [track my step count](https://www.beeminder.com/utf9k/steps) which yes, ideally I would actually walk more than I do by default, but it's actually intended to enforce a baseline.

Sometimes when I get sick or work from home but particularly if I'm particularly in a rut, my step count stays flat and that only serves to make things worse.

I naturally tend to keep up with my current step goal but as soon as things start to go downhill, my Beeminder step count kicks in and it forces me to do an action that, along with a few other things, will make me feel much better.

I've had at least one time where I felt miserable and my movie watching goal came due. I really didn't want to do it but after I was done, I felt much better and glad that I had the foresight to set up that safety net, even if it wasn't originally intended to be used in that way.

## Make use of fine print

When you create a goal, you can set "fine print" which is essentially what it sounds like. A small block of text that outlines what the requirements are.

I don't have too many of these configured but here's an example from my vacations goal:

> I have to book at least 5 consecutive days off to qualify as a "vacation"
> 
> The point can be marked as soon as it's booked, rather than necessarily when I'm embarked.
> 
> Intent is what matters most here.
> 
> Goal is set to 3 but understandably, vacations may be shorter or longer so this may be more or less reasonable depending on the length of the breaks.

I didn't immediately have in mind what counts as a vacation when I created the goal but quickly had to figure it out since if you have a public holiday on a Monday, you could squint and call that a vacation.

I settled on the fine print above as it's rare for myself to have 5 days off in a row naturally so it makes for a good minimum. I don't specify more than a minimum as a longer vacation isn't necessarily a "better" one. Arguably, shorter vacations with more frequency may even be better than longer vacations that only meet the goal threshold.

While we're on the subject, I should point out that there is a reason my vacation goal is set slightly low at 3. The original target was 4 but I found that I would book it for 2 - 4 weeks out, spend 1 - 2 weeks on vacation and then by the time I come back, I'm already halfway due for the next one. This seemed silly so I extended the goal period to "bake in" booking time and it seems to work well enough.

## Celebrate your progress

This is definitely one that I don't do enough. Look at your goals and celebrate how far you've come!

As you get further into Beeminder, you can start to glaze over graphs. My movie graph says that I crossed a whopping 80 movies off my backlog but admittedly, when I look at it, I don't really psyche myself up about it.

The whole point of beeminding at all is to make progress in the things you care about so it's important to stop and appreciate that progress or else you'll just be running forever, never arriving at your destination.

The best part is, you can just schedule a goal to sit down and appreciate your other goals.

[^1]: The only "bug" that comes to mind was when I travelled to Australia, I derailed on a goal before the day had actually ended as your timezone is set on an account level rather than inferred by your device. It's more of a UX quirk and I provided feedback about it.

[^2]: I pay for the [Infinibee](https://www.beeminder.com/premium) at the time of writing so I can create unlimited goals although I've probably derailed enough that I don't need to anymore. I haven't actually experimented with custom goals which is part of the plan too. I should do that.

[^3]: I have a daily goals for tidying up for any amount of time.

[^4]: Such as if your goal requires you to be in a certain location.

[^5]: Not that I have that many really.