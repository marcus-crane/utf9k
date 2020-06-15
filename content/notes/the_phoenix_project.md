+++
title = "The Phoenix Project"
author = ["Marcus Crane"]
lastmod = 2020-06-14T12:46:25+12:00
slug = "the_phoenix_project"
draft = false
+++

goodreads
: <https://www.goodreads.com/book/show/17255186-the-phoenix-project>


## Cast {#cast}

-   Steve Masters, CEO, acting CIO
-   Dick Landry, CFO
-   Sarah Moulton, SVP of Retail Operations
-   Maggie Lee, Senior Director of Retail Program Management
-   Bob Straus, Lead Director, former Chairman, former CEO
-   Erik Reid, Board Candidate
-   Nancy Mailer, Chief Audit Executive
-   Bill Palmer, VP of IT Operations
-   Wes Davis, Director of Distributed Technology Operations
-   Patty McKee, Director of IT Service Support
-   Brent Geller, Lead Engineer
-   Chris Allers, VP of Application Development
-   John Pesche, Chief Information Security Officer (CISO)


## The First Way {#the-first-way}

Understanding the system as a whole allows us to optimise for speed.

We want as little work in progress as possible as there's no actual value until something is delivered to the customer.

Once we can visualise the system, we can ensure no defects pass downstream nor that any local optimisations affect the rest of the system.

Kanban is one way of visualising work that is created and pulled through the system. It also allows everyone to see each unit with the same level of understanding. It does not, however, visualise unplanned work which can be curbed by following The Second Way.


## The Second Way {#the-second-way}

Shortening and amplifying feedback loops so that we can fix quality issues at the source, and avoid rework.

The less time it takes us to receive feedback from a customer, the quicker we can ensure deliverable is fit for purpose.

Visualisation of wait times ensures that our understanding of the system is accurate, feeding back into The First Way, while also emphasising where our feedback loops may need further tuning.


## The Third Way {#the-third-way}

Creating a culture that fosters experimentation while also understanding that repetition and practice are the prerequisites to mastery.

Rewarding risk taking, allocating time for daily improvement and introducing system faults to improve tolerance are examples of how to work towards such a vision.

The introduction of tension ensures that positive habits are reinforced and trained. By training against painful scenarios such as system failures created purposefully, we become ever more ready when a true calamity arises.


## WIP: The Silent Killer {#wip-the-silent-killer}

Bill is initially baffled when Erik takes him on his first trip to MRP-8. What could a manufacturing plant possibly have to do with IT operations?!

The plant used to be stack with orders in progress, from floor to ceiling. The original supervisor, Mark, was rubbish at releasing work into the system. As a result, work would be introduced before any actual tasks could be carried out, resulting in an increase of Work in Progress items\*.\*

The Theory of Constraints, Lean and Toyota Production System all ultimately agree on one thing: WIP is the silent killer.


## Resource utilisation {#resource-utilisation}

The wait time for a given resource is the percentage that the resource is busy, divided by the percentage that the resource is idle.

If we have a water cooler that is 50% utilised, the wait time for that water cool is also 50%. If it were 90% utilised however, the wait time becomes a staggering 9 times longer or 90 / 10.

How about 99% utilisation? 99/1 gives a staggering 99 times increase in wait time compared to a resource that is 50% percent utilised.


## Automate to reduce cycle time {#automate-to-reduce-cycle-time}

Two of the biggest impediments of The Second Way.

While fairly standard nowadays, many deployments used to be a manual circus consisting up many individual steps that could all have a change of failure.

Automating away as much as possible reduces the possibility of human error, and with that, shortens the feedback loop ever so slightly.

Codifying the deployment process as, well, code, also provides visibility on just how much resource is needed by the system to get things out the door.

Lastly, we also ensure that WIP doesn't stay stuck in the system longer than it needs to be. Once we've got rapid deployment, we can feel safer releasing smaller and smaller pieces as there is no longer a human investment needed to release.


## Theory of Constraints {#theory-of-constraints}

Whether man or machine, a very small number of resources often dictate the output of an entire system.

Consider a gas station with only one pump. Performing optimisation work before or after the constraint would be pointless. Similarly, any inefficiencies that cause the constraint to go unused eg; waiting for available resource, is a waste and means the business is not being delivered value at full capacity.

Once you identify a constraint/bottleneck, you need to ensure that it is protected and used effectively. Preventative maintenance ensures that the constraint can be utilised effectively and feeds back into The Third Way as a form of repetition towards mastery.


## SLOs uplifting KPIs {#slos-uplifting-kpis}

Service Level Objectives (SLOs) are usually created around indicators that customers care about: availability, incident resolution time and so on

There's no reason they can't be designed around preventative measures either, feeding back into The First Way, and the protection of our constraint.

Let's say we have a delivery business whose primary performance indicator is the number of deliveries made on time. Vehicle breakdowns can play a determining, yet invisible factor in achieving that goal.

Setting an SLO around oil changes would seem odd at first, but ensures that preventative measures like maintenance are linked back to our business objectives and stay visible to the entire organisation.


## Embed links {#embed-links}

[The Phoenix Project](https://www.goodreads.com/book/show/17255186-the-phoenix-project)
[Accelerate](https://www.goodreads.com/book/show/35747076-accelerate)
[Theory of constraints - Wikipedia](https://en.wikipedia.org/wiki/Theory%5Fof%5Fconstraints)
[Lean manufacturing - Wikipedia](https://en.wikipedia.org/wiki/Lean%5Fmanufacturing)
[Toyota Global Site | Production System](https://www.toyota-global.com/company/vision%5Fphilosophy/toyota%5Fproduction%5Fsystem/)
[The Goal](https://www.goodreads.com/book/show/113934.The%5FGoal)
