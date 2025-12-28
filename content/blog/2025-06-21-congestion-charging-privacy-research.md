---
category: blog
date: 2025-06-21T13:20:00+13:00
description: Open sourcing some research I did into privacy issues relating to congestion charging
slug: congestion-charging-privacy-research
tags:
  - research
title: Congestion Charging Privacy Research
---

Earlier this year, I attended one of the [monthly meetings](https://nzccl.org.nz/meeting-dates-in-2025/) held by the [New Zealand Council for Civil Liberties](https://nzccl.org.nz/) which was my first real interaction with the Council despite being a paying member for about a year.

The topic of congestion charging had come up as one of the topics, as the Land Transport Management (Time of Use Charging) Amendment Bill had [passed its first reading](https://www.parliament.nz/en/pb/hansard-debates/rhr/combined/HansDeb_20250304_20250304_32) and was opening up to submissions.

The Council were interested in submitting on the topic, as any charging is likely to be done with cameras and more cameras means more potential to misuse data for unintended purposes.

Coincidentally, it had come up that I had previously done a little bit of digging into the same topic [in the past](/blog/vehicle-congestion-gnss/) and so I was asked if I'd like to do some extended research. While I've done plenty of digging here and there for personal interests, I can't say I've ever compiled research in a "professional" capacity so this was definitely a new task for me.

The following is that research, exactly as I submitted it. Given it ties together a few disparate sources, it might be useful to someone down the track.

It's worth noting that I'm also just a regular citizen. I don't work in any related industries so while I've tried to be as matter of fact as possible, I can't guarantee that I didn't misinterpret some findings. Parsing legislation really is kind of a daunting task for a regular person, although what better way to learn how than doing this sort of research.

Some of this research ended up informing the NZCCL's [final written submission](https://nzccl.org.nz/submission-land-transport-time-of-use-charging-amendment-bill/) and an oral submission was also submitted back in May to the [Transport and Infrastructure Select Committee](https://www.parliament.nz/en/pb/sc/scl/transport-and-infrastructure/).

---

The following is a brief rundown of various congestion charging schemes around the world, with a particular focus on how they impact the privacy of citizens who engage with these schemes.

Note that "Congestion charging" and "Time-of-use charging" may be used interchangeably. Time-of-use charging is technically a subset of congestion charging, specifically referring to charging at peak times only.

Whether the resulting schemes will literally be time-of-use charging or simply congestion charging remains to be seen, as no schemes actually exist at the time of writing.

Various documents from Auckland and Wellington Council use both terms interchangeably and whether a scheme is peak-only or not doesn’t have much effect on the question of privacy so this document mostly uses "congestion charging" for simplicity.

## The Short Answer

When it comes to congestion charging in New Zealand, there is effectively one key decision that any given authority needs to decide: "Do we charge one time at a boundary or do we charge along a corridor".

The answer to that question has a number of knock-on effects when it comes to privacy issues, including the technology options that become feasible, which may present further privacy concerns in future.[^1][^2]

At the time of writing, the Land Transport Management (Time of Use Charging) Amendment Bill[^3] (LTMA hereafter) is being tabled for submissions however the bill itself does not, and is not intended to, prescribe any particular time of use charging scheme.

At a high level, the bill allows the local authority for a region to start the process for rolling out a congestion charging (time-of-use) scheme.[^4]

The scheme itself is important so we’ll take a brief look at the two types that have currently been proposed in this country. Do note that there are other scheme types used globally and the corridor scheme in particular has the potential to evolve into a network-based scheme over time.

## Single Charge Schemes

*Example: Auckland’s proposed cordon scheme around the Central Business District*  

![](https://cdn.utf9k.net/blog/congestion-charging-privacy-research/cordon.png)

If an authority charges at the boundary of a congestion charging zone (on entry and/or exit), the scheme operator only gains knowledge of when a user has entered and/or exited a congestion zone.

There is no possibility, at least purely based on congestion charging records, to know or even guess where a user has been within the congestion zone.

This potentially allows for anonymous billing (ie; top-up accounts, particularly for travellers) where knowledge that any given user has entered the congestion zone is decoupled from the vehicle that the user is driving, however it is probably unlikely given ANPR is almost certain to be used for billing in most cases.

We should note that there is the separate question of enforcement which will likely be done with Automatic Number Plate Recognition (ANPR) cameras[^5][^6]. We’ll put enforcement to one side for now.

## Corridor Charge Schemes

*Example: Auckland’s proposed corridor scheme*  

![](https://cdn.utf9k.net/blog/congestion-charging-privacy-research/corridor.png)

If an authority decides to charge along a corridor, they would presumably need to capture a data point at each charging point that a user passes through, regardless of whether the corridor charges a fixed or variable price.

As above, the actual implementation of any corridor charging scheme is very likely to be managed through the use of ANPR cameras.

Under the worst case scenario, knowledge that any given user has travelled down one stretch of highway could provide the ability to observe the daily travel patterns for a given user, as well as their general direction of travel. It could not provide a complete picture of their day to day activities while using a vehicle however.

It’s important to note that the corridor charge scheme has the potential to evolve into a network-based scheme, where rather than investing in physical infrastructure to monitor corridors, sensors are instead installed into vehicles.

This would allow congestion charging to apply dynamically to all roads but carries with it the greatest privacy implications. This concept is discussed later in the document when looking at Singapore’s implementation.

The original corridor-style scheme used in Singapore did provide for onboard processing which minimised the amount of data that needed to be provided as is also discussed later.

## Proposed schemes around New Zealand, as of April 2025

All schemes ultimately have to be approved by the NZ Government however a few regions have hinted at their preferred schemes.

It’s also worth mentioning that if any given region does not initiate a scheme within 3 years, the LTMA allows for the responsible Minister to request that one be implemented, if they think it would improve the flow of traffic in that region.[^7]

### Auckland

As of December 2019, two models were proposed for Auckland: A cordon scheme (pay once to enter/exit) and a strategic corridors scheme (pay for accessing certain highways/roads)[^8].

Auckland Council would seem to have effectively settled on a corridor charge scheme[^9] based on public remarks however any scheme still has to be approved by the responsible Minister[^10].

Despite that, Auckland Council have filed their own submission[^11] asking for greater decision making power, as the scheme that is approved may differ from what was envisioned at the start of the submission process.

### Wellington

It appears that Wellington is considering implementation of a single charge to enter and exit the Wellington CBD during peak hours[^12][^13].

### Tauranga

SmartTrip[^14] was a study into the potential for variable charging to replace Tauranga’s existing toll road charges. Strong community opposition has resulted in the business case being paused while further investigation is carried out[^15].

## What does the LTMA say about privacy?

The LTMA has a very explicit view on Privacy outlined under Section 65ZF titled "Privacy".

It clearly states that the scheme board or enforcement agency can only use personal information collected for collecting time of use charges.

It also clearly states that personal information collected (which includes information linked to registration plates) can only be retained for as long as is "reasonably" necessary to collect charges as well as follow up on unpaid charges.

While the LTMA itself seems quite clear at first glance, Section 65ZF(3) makes reference to Information Privacy Principle (IPP) 11 of the Privacy Act 2020[^16] which allows for the use of personal information in certain cases.

Namely IPP 11(1)(g) that the disclosure of the information is necessary to enable an intelligence and security agency to perform any of its functions as well as IPP 12(1) which allows for overseas intelligence sharing.

## Precedent in other countries for abuse of congestion charging data

For the vast majority of countries with congestion charging schemes, I didn’t have much luck finding solid information on topics such as retention policies and storage methods for data collected.

While there are a lot of theoretical privacy issues, there are at least four solid instances of congestion charging data being used beyond their intended purpose.

These issues may not be immediately applicable to New Zealand’s situation but they may prove to be useful hints for future developments.

### London

The London Congestion Charging Zone (CCZ), which is visible in the section titled "Area-based (aka Zonal)", encompasses a large boundary around London.

While vehicles only have to pay a flat fee to enter, enforcement is carried out through both ANPR cameras and patrolling vans[^17].

Under the Transport for London’s Road User Charging guidelines, ANPR data and vehicle images appear to only retained for a maximum for 30 days after payment has been received[^18] however there is a bit more going on behind the scenes.

In January 2015, the Mayor of London instructed Transport for London (TfL) to give the Metropolitan Police Service (MPS) direct real-time access to all of the ANPR cameras used for enforcing the charges within the CCZ as part of MD1439[^19] to assist in "the detection and prevention of crime". This decision was renewed and expanded as part of MD2977[^20]

At the time of writing, MPS had lost direct access in 2022 as TfL had upgraded their ANPR cameras to provide images in greater resolution, with more metadata and the amount of data ingested was apparently more than MPS’s systems were capable of handling at the time[^21]. MPS are expecting to start receiving direct real-time feeds once again from mid-April 2025[^22].

The clearest indication for how MPS consider the privacy implications of ANPR are visible in the Data Protection Impact Assessment[^23] (DPIA) that they had to fill out in order to gain access to the TfL ANPR feeds.

Despite TfL’s guidelines suggesting that ANPR data is only retained for 30 days, MPS state that "Retention of data on the MPS ANPR system is limited to 12 months unless specifically requested and preserved as part of an investigation or prosecution." It’s also stated that the ANPR images received by MPS are intentionally reduced in resolution from the higher quality images received from TfL. It’s stated that "National ANPR Standards for Policing and Law Enforcement (NASPLE) Technical specifications, places significant restrictions to limit image size, (Just 3KB or 120 x 60 pixels for plate patches or just 25kb for overview images"[^24]

Bizarrely, the MPS response for a section on "Freedom of Assembly and Association" notes that their usage of ANPR data could technically dissuade someone from protesting but in their view, most protestors use public transport.

*"It could be argued that someone fearing that they might be subject to having their number plate and therefore potentially their location (subject to them being the driver or a passenger at the time) captured at a particular time may be less likely to exercise their article 10/11 HRA rights. However, the MPS notes that the vast majority of subjects who wish to attend protests do so using public transport and would remain unaffected by the use of ANPR within the TFL area."*[^25]

In the "Proportionate Response" section, MPS states outright that "ANPR impacts significantly on the privacy of Londoners who use the road network." only to defend itself by claiming "Given the prevalence of CCTV, alongside other state and private sector ANPR systems, the public of London have relatively little expectation of privacy when driving their vehicles."[^26]

They also go on to claim that "While ANPR captures and stores a lot of data \[...\] it is very unlikely that the millions of innocent reads captured each day will ever be reviewed."[^27]

### Singapore

Singapore is often held up as the poster child for congestion charging, due to its willingness to adopt the required technology before any other country.

There have been two main Electronic Road Pricing (ERP) systems called ERP and ERP 2.0.

The original ERP system has operated for 25 years as a series of gantries hanging over various highways, and is similar to the corridor charge scheme in implementation. As vehicles passed under each gantry, a stored-charge card would be scanned and the required congestion charge would be deducted.

This reduced the need to provide any identifying information, as the charge card itself was decoupled from the identity of the driver.

ERP 2.0 has been introduced as a replacement for the original ERP. It operates using a Global Navigation Satellite System (GNSS) removing the need for physical gantries to be installed.[^28]

In a 2016 Ministry of Home Affairs Committee of Supply Debate speech[^29], K. Shanmugam (Minister for Home Affairs and Minister for Law) spoke about fighting terrorism, in response to ISIS-affiliated attacks in Brussels, Jakarta and Paris. He stressed the need to "use all available resources at our disposal to detect and response to threats", stating the following:

*The Home Team will use all intelligence and investigation tools available and make better use of available data. For example, public transport video cameras, Electronic Road Pricing (ERP) system, these contain important data that can be vital for our safety and security. We had initially taken the position that some of these data would not be used and have said so in Parliament. I think Mr Mah Bow Tan and Dr Yaacob Ibrahim have all said that in the past. But the changed security environment means that we have to change the position on not using such data. And I wish to state that clearly here, since it is a change from what we have said previously in Parliament. In this changed security environment, the Home Team must be able to collect and analyse suspicious travel patterns, and respond swiftly and decisively for our collective security.*

When asked in late 2023 about "whether the Singapore Police Force (SPF) will be allowed to access the transaction and road traffic data collected by the next-generation ERP system", K. Shanmugam provided a written reply[^30] stating

*The position has been made clear several times, including in this House. See what I said in 2016, during the Committee of Supply debates.*

It should be noted that while it is heavily implied that the Singaporean Police Force have permission to access road traffic data, that is not necessarily evidence that police have actually done so.

### New York

While not strictly congestion charging, New York has an E-ZPass[^31] system of RFID transponders which are installed in vehicles and are charged when they pass onto a toll bridge. This same technology powered Singapore’s first iteration of congestion charging.

In 2015, the New York Civil Liberties Union (NYCLU) were able to confirm via New York Freedom of Information Law (FOIL) requests that E-ZPass readers were installed in non-toll locations[^32].

It turned out that a secondary array of E-ZPass readers were configured around New York City as a way to perform traffic studies, by piggybacking off the existing array of installed E-ZPass transponders.

When asked via FOIL, the New York Department of Transportation responded that it "has no policies or training materials on storage, retention, destruction and use of information generated by or collected from E-ZPass readers."

An earlier case in 2007[^33] had the Associated Press find that agencies in seven out of twelve states released E-ZPass records in response to both criminal and civil cases, which would include divorce cases.

Lastly, a case in 2015 where Chris Christie, then-governor of New Jersey, released the tollbooth data of the late Sen. Frank Lautenberg, a political opponent of Christie at the time[^34]

## Increased use of ANPR

Beyond the immediate congestion charging schemes, it’s also worth briefly discussing the increase in ANPR that will likely be driven by any given scheme.

In the case of Auckland, an investigation was undertaken in the form of The Congestion Question Workstream 2 Technical Assessment.

It talks about building out a new system for presenting a billing system to customers, as well as what would be needed to feasibly power an corridor-style scheme. As above, no actual scheme has been decided on at the time of writing.

As of August 2019, Auckland Transport operates 693 road cameras with only 55 being ANPR cameras[^35]. Those ANPR cameras are fed into Video management software (VMS) which is server based software for collecting video feeds from cameras for storage, viewing and processing. For the 693 road cameras, footage is stored for 7 days before being overwritten.[^36]

It’s pointed out that the majority of the cost for deploying new ANPR cameras is not the actual cost of the camera itself but the civil works to install power poles, set up networking and so on[^37]. Given this, it’s preferred to make use of existing equipment and so the idea is to convert some number of these existing road cameras into ANPR cameras through the use of software.

In short, the existing CCTV camera feed would be fed into software that extracts a license plate image from the CCTV feed. From there, the assessment talks about "Edge vs VMS ANPR".

Most of these cameras are near intersections which contain roadside cabinets with various networking hardware. The idea is that the software for CCTV extraction would run within the roadside cabinets with only the resulting metadata, as well as a thumbnail and high quality photo (for legal challenges) being sent back to Auckland Transport[^38]. This is the "Edge" option.

The VMS option is explored which would entail sending full video streams from the roadside cabinets to a centralised set of back office servers that would perform license plate extraction offsite[^39].

It’s not immediately clear whether this new theoretical back office stream of roadside camera footage would be subject to the same 7 day retention policy as the existing Auckland Transport CCTV policy.

It’s also not entirely clear but it may be the case that this system would be either jointly operated between Auckland Transport and NZTA or solely by NZTA. Towards the end of the report, the following statement is made:

*There is an opportunity that the Auckland Congestion Charging back office would be well suited to replace the toll road back office systems when the maintenance and warranty period end. This has the advantage of a single entity managing all ANPR charging technology systems within NZ which brings significant operational and cost efficiencies.*[^40]

In a similar vein, the minutes for a July 2024 Ministry of Transport Cabinet Business  
Committee meeting had the following to say:

*agreed that NZTA will lead the development of a single technological system to enable time*  
*of use charging which can be utilised across New Zealand, with the costs of this system*  
*being the first priority for any revenues raised from the scheme*[^41]

If you take all of the above, a centralized congestion charging system relying on offsite VMS ANPR from around the country resulting in cross-region ANPR would seem to be a potential privacy nightmare, if that is what is being implied here.

To be fair, this is purely speculation and so many of the moving parts are all still theoretical. Everyone appears to have their own idea of what is going to be built yet none of the actual legislation on the table states anything about technology or congestion charging schemes.

## Further Reading

* [The Congestion Question Phase 1 Report](https://www.transport.govt.nz/assets/Uploads/Report/The-Congestion-Question-Report.pdf)  
* [The Congestion Question Workstream 2 Technical assessment](https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf)  
* [The Congestion Question Workstream 2 GNSS Technology Summary](https://www.transport.govt.nz/assets/Uploads/Paper/GNSSTechnologyAssessment.pdf)  
* [The Congestion Question Workstream 5 Rollout options for congestion pricing in Auckland](https://www.transport.govt.nz/assets/Uploads/Paper/Scheme-RolloutOptions.pdf)  
* [NZ Police ANPR Manual Chapter](https://www.police.govt.nz/sites/default/files/publications/automatic-number-plate-recognition-140224.pdf)  
* [NZTA on Road pricing (congestion charging)](https://www.nzta.govt.nz/assets/planning/process/trial-ip-toolkit/docs/road-pricing.pdf)  
* [Automated Traffic Congestion Charging Systems: Privacy considerations for New Zealand](https://ojs.victoria.ac.nz/pq/article/download/9559/8459)  
* [Introduction to Congestion Charging: A Guide for Practitioners in Developing Cities](https://www.adb.org/sites/default/files/publication/159940/introduction-congestion-charging.pdf)  
* [Review of international road pricing initiatives, previous reports and technologies for demand management purposes by D'Artagnan Consulting for Ministry of Transport](https://www.transport.govt.nz/assets/Uploads/Report/ReviewofInternationalRoadPricingSchemes.pdf)  
* [International Experience and Policy Trends in Urban (Including Dynamic) Road Pricing Variable Road Pricing Study \- Tauranga](https://www.tauranga.govt.nz/Portals/0/data/exploring/transport/files/smarttrip/files/paper-road-pricing-tauranga-study.pdf)

[^1]:  **"Privacy concerns have also been identified with proposals for GNSS based road charging systems because of the need to collect vast amounts of vehicle location data including information for travel which is not subject to charging."** Page 1 of [The Congestion Question Workstream 2 Technical Assessment](https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf) 

[^2]:  **"This first step does not preclude the opportunity to expand the system in the future by adding GNSS technology as wider public education and acceptance grows."** Page 3 of [The Congestion Question Workstream 2 Technical Assessment](https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf) 

[^3]:  [https://www.legislation.govt.nz/bill/government/2024/0113/latest/LMS1016396.html](https://www.legislation.govt.nz/bill/government/2024/0113/latest/LMS1016396.html)

[^4]:  Section 65C(1) of the [Land Transport Management (Time of Use Charging) Amendment Bill](https://www.legislation.govt.nz/bill/government/2024/0113/latest/LMS1016396.html#LMS1016395)

[^5]:  **"We found that automatic number plate recognition technology is likely to be the most suitable and cost-effective solution for a congestion pricing scheme that is available today. This is already in use on New Zealand’s three toll roads and would be necessary for any scheme for enforcement purposes."** Page 37 of [The Congestion Question](https://www.transport.govt.nz/assets/Uploads/Report/The-Congestion-Question-Report.pdf)

[^6]:  **"ANPR is essential for the enforcement of any urban road pricing system."** Page 7 of [The Congestion Question Workstream 2 Technical Assessment](https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf) 

[^7]:  Section 65C(3) of the [Land Transport Management (Time of Use Charging) Amendment Bill](https://www.legislation.govt.nz/bill/government/2024/0113/latest/LMS1016396.html#LMS1016395)

[^8]:  Section 4: Rollout Options of [The Congestion Question Workstream 5 Rollout options for congestion pricing in Auckland](https://www.transport.govt.nz/assets/Uploads/Paper/Scheme-RolloutOptions.pdf)

[^9]:  **"In fact, what we’re talking about is time-of-use charging rather than congestion charging. Congestion charging is when you put a ring around the city like in London. You gotta pay to go into it."** Wayne Brown, Auckland Mayor’s appearance in the Breakfast segment "[If you don't like congestion charges 'get on a bus' | TVNZ Breakfast](https://youtu.be/4kz9fHIRMss?t=32)" on YouTube (0:32)

[^10]:  Section 65G Minister’s decisions concerning time of use charging scheme of the [Land Transport Management (Time of Use Charging) Amendment Bill](https://www.legislation.govt.nz/bill/government/2024/0113/latest/LMS1016396.html#LMS1016395)

[^11]:  Page 87 (Item 10 Attachment A) of the [Supporting Attachments document](https://infocouncil.aucklandcouncil.govt.nz/Open/2025/04/20250403_TICCC_ATT_11419.PDF) provided for the [Transport, Resilience and Infrastructure Committee meeting held on April 3rd, 2025](https://infocouncil.aucklandcouncil.govt.nz/Open/2025/04/20250403_TICCC_MIN_11419.PDF)

[^12]:  **"Indicative modelling as part of the Let’s Get Wellington Moving programme suggested congestion pricing in the form of a cordon charge would result in an approximate 10% reduction in vehicle kilometres travelled within the city centre, a 15-20% increase in bus patronage on key public transport corridors, and an 8% increase in rail patronage."** Page 42 of the [December 12, 2024 Wellington City Council Agenda](https://wellington.govt.nz/-/media/Your-council/meetings/Council/2024/2024-12-12-Public-Agenda-Council#page=7)

[^13]:  **"Congestion charging would place a small fee on people travelling into or out of the CBD at peak hours."** [August 2024 Statement from Tory Whanau, Mayor of Wellington](https://www.gw.govt.nz/your-region/news/wellington-councils-working-on-congestion-charging-proposal/)

[^14]:  [https://www.tauranga.govt.nz/exploring/transportation-and-roads/smarttrip](https://www.tauranga.govt.nz/exploring/transportation-and-roads/smarttrip)

[^15]:  [https://sunlive.co.nz/news/338443-tauranga-puts-brakes-on-congestion-charge-study.html](https://sunlive.co.nz/news/338443-tauranga-puts-brakes-on-congestion-charge-study.html)

[^16]:  [https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23342.html](https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23342.html)

[^17]:  [Downtown congestion pricing in practice by Lewis Lehe](https://sci-hub.se/downloads/2019-02-04//6a/10.1016@j.trc.2019.01.020.pdf)

[^18]:  [https://tfl.gov.uk/corporate/privacy-and-cookies/road-user-charging\#on-this-page-3](https://tfl.gov.uk/corporate/privacy-and-cookies/road-user-charging#on-this-page-3)

[^19]:  [https://www.london.gov.uk/decisions/md1439-delegation-transport-london-tfl-grant-metropolitan-police-service-mps-direct-access](https://www.london.gov.uk/decisions/md1439-delegation-transport-london-tfl-grant-metropolitan-police-service-mps-direct-access)

[^20]:  [https://www.london.gov.uk/decisions/md2977-delegation-tfl-grant-anprc-data-access-mps](https://www.london.gov.uk/decisions/md2977-delegation-tfl-grant-anprc-data-access-mps)

[^21]:  [https://content.tfl.gov.uk/tfl-commissioner-anpr-decision-note-signed.pdf](https://content.tfl.gov.uk/tfl-commissioner-anpr-decision-note-signed.pdf)

[^22]:  [https://tfl.gov.uk/corporate/privacy-and-cookies/road-user-charging\#on-this-page-9](https://tfl.gov.uk/corporate/privacy-and-cookies/road-user-charging#on-this-page-9)

[^23]:  [https://content.tfl.gov.uk/appendix-2-mps-dpia-anpr-sharing-january-2025.pdf](https://content.tfl.gov.uk/appendix-2-mps-dpia-anpr-sharing-january-2025.pdf)

[^24]:  Page 11 of [MPS DPIA for access to TfL ANPR data feed](https://content.tfl.gov.uk/appendix-2-mps-dpia-anpr-sharing-january-2025.pdf)

[^25]:  Page 17 of [MPS DPIA for access to TfL ANPR data feed](https://content.tfl.gov.uk/appendix-2-mps-dpia-anpr-sharing-january-2025.pdf)

[^26]:  Page 22 of [MPS DPIA for access to TfL ANPR data feed](https://content.tfl.gov.uk/appendix-2-mps-dpia-anpr-sharing-january-2025.pdf)

[^27]:  Page 23 of [MPS DPIA for access to TfL ANPR data feed](https://content.tfl.gov.uk/appendix-2-mps-dpia-anpr-sharing-january-2025.pdf)

[^28]:  [https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/ERP/erp-2-0.html](https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/ERP/erp-2-0.html)

[^29]:  [https://www.mha.gov.sg/mediaroom/speeches/ministry-of-home-affairs-committee-of-supply-debate-2016---speech-by-mr-k-shanmugam-minister-for-home-affairs-and-minister-for-law/](https://www.mha.gov.sg/mediaroom/speeches/ministry-of-home-affairs-committee-of-supply-debate-2016---speech-by-mr-k-shanmugam-minister-for-home-affairs-and-minister-for-law/)

[^30]:  [https://www.mha.gov.sg/mediaroom/parliamentary/written-reply-to-pq-on-whether-police-will-use-erp-2.0-system-for-enforcement-against-traffic-offences/](https://www.mha.gov.sg/mediaroom/parliamentary/written-reply-to-pq-on-whether-police-will-use-erp-2.0-system-for-enforcement-against-traffic-offences/)

[^31]:  [https://en.wikipedia.org/wiki/E-ZPass](https://en.wikipedia.org/wiki/E-ZPass)

[^32]:  [https://www.nyclu.org/report/e-zpass-readers](https://www.nyclu.org/report/e-zpass-readers)

[^33]:  [https://web.archive.org/web/20131002015157/http://www.nbcnews.com/id/20216302/](https://web.archive.org/web/20131002015157/http://www.nbcnews.com/id/20216302/)

[^34]:  [https://www.aclu.org/news/national-security/christie-use-tollbooth-data-and-why-location-privacy-must-be-protected](https://www.aclu.org/news/national-security/christie-use-tollbooth-data-and-why-location-privacy-must-be-protected)

[^35]:  7.2 Auckland camera network on Page 19 of [https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf](https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf)

[^36]:  [https://at.govt.nz/about-us/manuals-guidelines/cctv-management-at-auckland-transport](https://at.govt.nz/about-us/manuals-guidelines/cctv-management-at-auckland-transport)

[^37]:  6.4 Camera installation on Page 11 of [https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf](https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf)

[^38]:  6.7.1 Network requirements for roadside ANPR (edge) on Page 13 of [https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf](https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf)

[^39]:  Figure 10: ANPR Processing Options on Page 16 of [https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf](https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf)

[^40]:  9.2 Main findings on Page 29 of [https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf](https://www.transport.govt.nz/assets/Uploads/Paper/TechnologyAssesment.pdf)

[^41]:  Page 2 of [https://www.transport.govt.nz/assets/Uploads/Time-of-Use-Charging-Cabinet-Material-Proactive-Release.pdf](https://www.transport.govt.nz/assets/Uploads/Time-of-Use-Charging-Cabinet-Material-Proactive-Release.pdf)