+++
title = "Microservices Antipatterns and Pitfalls"
author = ["Marcus Crane"]
lastmod = 2020-06-17T21:25:05+12:00
slug = "microservices_antipatterns_and_pitfalls"
draft = false
+++

Microservices requires organizational change at many levels. Development teams must be restructured and reorganized into more cross-functional teams so that small teams can own the end-to-end technical aspects of the services they are responsible for, including the user interface, backend processing, rules processing, and database processing and modeling. The traditional corporate development team model of user interface teams, backend development teams, and database engineers/administrators simply doesn’t work with a microservices architecture. In addition, the organizational structures involved with releasing software must also change. With microservices it is not feasible to use the traditional software development lifecycle procedures that exist with monolithic, layered architectures. Rather, you must embrace automation and leverage devops tools and practices to develop an effective deployment pipeline for releasing microservices.

Besides microservices there are seven other common architecture patterns you might want to consider for your application or system: Service-Based Architecture Service-Oriented Architecture Layered Architecture Microkernel Architecture Space-Based Architecture Event-Driven Architecture Pipeline Architecture

By providing versioning in your contracts, and hence providing backward compatibility, you can now be more agile in terms of client 1’s request. Agility is defined as how fast you can respond to change. If you properly versioned your contracts from the very start, you could immediately respond to client 1’s request for the contract change by simply creating a new version of the contract, say version 1.1. Clients 2 and 3 are both using version 1.0 of the contract, so now you can implement the change right away without having to wait for client 2 or client 3 to respond. In addition, you can make the change without making what is called a “breaking change.”
