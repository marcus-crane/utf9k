---
category: questions
description: In which I think about Azure, which is a mistake in itself
lastmod: 2021-06-24
slug: azure-regions-alike
tags:
  - availability
  - azure
  - cloud
  - microsoft
title: Are all Azure regions alike?
---
No! As I learned recently, only a handful of regions feature multiple availability zones.

Having originally started out using [AWS](https://aws.amazon.com), I had assumed that every region has multiple availability zones.

Azure maintains [a list](https://docs.microsoft.com/en-us/azure/availability-zones/az-region#azure-regions-with-availability-zones) of regions with multiple AZs so if you need redundancy, you're best off picking one of these.

Some services may refuse to deploy entirely (such as "geo-redundant" gateways in us-east as I found out recently)
