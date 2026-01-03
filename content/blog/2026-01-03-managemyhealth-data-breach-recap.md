---
date: 2026-01-03
description: Media coverage has been a bit lacking so I've compiled what we know so far
slug: managemyhealth-data-breach-recap
title: A recap of the ManageMyHealth data breach so far
---

At 4:10am NZDT[^timestamps] on the 31st December, a post went up on a certain forum advertising a 108GB data breach related to the New Zealand patient portal [ManageMyHealth](https://managemyhealth.co.nz/).

## What is ManageMyHealth

ManageMyHealth is an online portal that primarily acts as an intermediary between patients and their GPs.

Patients have access to this portal via apps on [iOS](https://apps.apple.com/nz/app/managemyhealth/id970773819) or [Android](https://play.google.com/store/apps/details?id=managemyhealth.co.nz&hl=en_NZ) apps, as well as [via the ManageMyHealth website](https://app.managemyhealth.co.nz/authentication/login).

Patients can book appointments, exchange messages with GP staff, access their health records, request repeat prescriptions among other functions.

On the GP side, they're able to manage appointments, submit [electronic prescriptions](https://www.tewhatuora.govt.nz/health-services-and-programmes/digital-health/emedicines-and-the-new-zealand-e-prescription-service/eprescriptions/about-nzeps) to pharmacies and [host video consultations](https://en.wikipedia.org/wiki/Telehealth).

The value proposition of this sort of platform is that it consolidates all of the various actions and information that a patient might need into one place, while saving GPs from having to employ an entire software team to unlock these capabilities.

ManageMyHealth has a number of competitors in New Zealand such as [Indici](https://indici.co.nz/)[^indici], [MyPractice](https://mypractice.co.nz/)[^mypractice] and [Medtech Evolution](https://medtechglobal.com/nz/medtech-evolution/) to name a few.

## What is the ransom requested?

The forum post mentioned at the start of this article was posted by a user going by the name Kazu[^kazu], who has breached [a number of entities](https://www.ransomware.live/group/kazu) in the past few months.

![](https://cdn.utf9k.net/blog/mmh-breach/kazu-forum-post.png "These sorts of forum posts are effectively a preorder notice. The contents of the breach may soon be available for prospective buyers to purchase if the ransom is not paid before the deadline is reached.")

The total size of the breach is stated to be 108GB and is comprised of 428,337 files. There is no detail as to what exactly those files are, or which part of ManageMyHealth they have come from.

As an example, some breaches are complete database dumps of SQL databases. Other breaches are comprised of [files](https://en.wikipedia.org/wiki/Object_storage) such as PDFs. The post in question gives no explicit indication as to whether one or both of these data types are involved or yet another type.

The breach is also alleged to have happened on December 29th, although no timestamp or time is mentioned but we can probably safely assume this took place sometime on December 30th from New Zealand's point of view.

Lastly, the ransom amount requested is $60,000. This is assumed to be USD but is not explicitly stated.

There is also no indication on how the ransom price is calculated. Presumably one factor is that it's better to request an amount that can be rationalised as "cheap" than it is to request a large amount that will never be paid.

As a point of comparison, UK-based [CT Dent](https://ct-dent.co.uk/) was breached by Kazu in early December with a ransom of $100,000 requested in exchange for 1,058,262 files totally 7TB of data.

Lastly, but most importantly, attached to the forum post is a "sample" which is a set of files that are claimed to represented the larger breach. It is a common "courtesy" to share breach samples so that prospective buyers can validate what the seller is claiming to have in their possession.

We'll come back to the sample later on.

## What has ManageMyHealth claimed so far?

On a technical level, there would seem to be enough pieces of circumstancial evidence available to make an informed guess but for the purposes of this recap, we'll stick to what has been officially confirmed.

At the time of writing, all of the official information that we know comes in the form of [FAQS for Cyber Breach](https://managemyhealth.co.nz/faqs-cyber-breach/) as well as three press releases. Annoyingly, the posts can't be linked to directly so you'll need to click the FAQ link above and then click "News & Updates" in the sidebar.

The only FAQ entry with technical substance is Item 5 which states the following:

> 5. What does “accessed” mean and is that the same as “downloaded”
> 
> No. ‘Accessed’ means an unauthorised party may have viewed or opened files. ‘Downloaded’ means files were copied out of the environment. Independent forensics are being used to confirm what was accessed and what may have been downloaded.

For context, when the FAQ was first published, the term "Unauthorized Access" was being used in ManageMyHealth's initial statements to the media. Given that, they appeared to make it a point was made to stress that "access" does not necessarily mean "downloaded".

With the press releases, the first two were mostly acknowledging that ManageMyHealth had become aware of a cyber security incident "following notification from a partner", that they had notified various New Zealand authorities and that they were engaging "independent international forensic consultants".

With the [January 3rd, 2026](https://managemyhealth.co.nz/mmh-cyber-breach-update-3-january-2026/) update, the public got confirmation of two main facts:

> We know that 6-7% of the approximately 1.8 million registered users have been affected by this incident.

and that

> The investigation has identified that one module, Health Documents, within the app was compromised, not the whole app.

That comprises all of the technical details that we officially know at the time of writing.

## What has Kazu claimed so far?

Given that this breach took a day or two before it was acknowledged by ManageMyHealth, I figured it might be useful to reach out to Kazu and see if they would be able to give any details on the breach.

The idea here was that it would be a useful point of comparison against what is stated publically, as well as when/if an official report is released as a result of any investigation which had not yet kicked off at the time.

Kazu had also [proven to be](https://databreaches.net/2025/11/12/doctor-alliance-data-breach-353gb-of-patient-files-allegedly-compromised-ransom-demanded/) somewhat forthcoming with information in regards to previous breaches so I contacted them on Telegram.

When asked about the nature of the breach, Kazu initially stated "you can ask MMH how they get breached" but after a little bit of convincing, they shared the following:

![](https://cdn.utf9k.net/blog/mmh-breach/telegram-broken-access.jpg "It's worth mentioning that Access Control is a very large category of problems so it doesn't really narrow things down a huge amount by itself.")

Asked if they would be able to elaborate a bit more, Kazu stated that they couldn't.

![](https://cdn.utf9k.net/blog/mmh-breach/telegram-no-elaborate.jpg)

At this point, it's important to remember that for Kazu, breaches are a businesses and part of that business involves perception.

There is only upside to having confusion regarding the scope and specifics of a breach, as it results in more pressure being placed on the victim to pay the ransom.

While I don't personally think they would have any incentive to be entirely misleading, it is still worth taking this information with a grain of salt.

## What was in the first sample set?

As mentioned earlier, attached to the forum post was a sample, in the form of a zip file.

Data breaches are not always guaranteed to be real, with some number of historical breaches being compromised partly of synthetic data or just being previously existing breaches mixed together repackaged as something "new".

For that reason, combined with my parents being users of ManageMyHealth, I wanted to take a closer look at the claimed sample as there had been no reporting whatsoever on their existence, let alone their validity. 

Before we continue, it's worth noting that doing this knowingly is likely to be illegal[^lawyer]. At the time, I was not aware if these files were real, which probably doesn't make it any less illegal.

Within the sample zip file was a number of documents which were all PDFs if I recall correctly.

There were a number of different document types such as typed referral letters, scanned letters from both GPs and patients, test results, hospital emergency dispatch summiaries, patient health summaries and various other letters.

Present on most of the documents were full names, addresses, phone numbers, [NHI](https://www.tewhatuora.govt.nz/health-services-and-programmes/health-identity/national-health-index) numbers and all sorts of other personally identifiable information.

Two documents in particular stood out which were a [molemap](https://www.molemap.co.nz/) report and a Metacognition[^metacognition] neuropsychological report.

### Molemap Report

This report contained a bunch of pages that I didn't pay much attention to but most striking were two photos on a particular page.

One photo was of the naked top of a man while the other was their underwear-covered bottom.

This was the only photos in the set that I recall seeing and they really drove it home that beyond the potential for identity fraud, who knows how many compromising and/or embarassing photos that patients have submitted to their GPs in confidence.

### Metacognition Neuropsychological Report

This report also stood out for the amount of non-medical information that it contained.

Without going into any identifying detail, it talked about a woman who had obtained a head injury and was struggling to cope with it, even acknowledging that she had some dark thoughts from time to time.

It gave a wide-ranging overview of her career, and most recently talked about how she thought she was valued, only for her employeer to seemingly go behind her back in trying to find a replacement.

It also talked about her relationship status in a minor amount of detail.

The thing that got me here was that some of these reports, particularly the holistic ones, may have a range of information that is not medically relevant but would be attractive to scammers when they're crafting campaigns.

### Disposing of the sample

Given the questionable legality of the above, I'll note that once I had gained enough confidence that the sample set appeared to be legitimate, I deleted it from my laptop and sent an email to [Office of the Privacy Commissioner](https://www.privacy.org.nz/).

## What was in the second sample set?

For a brief period of time, the sample set linked by Kazu in the forum post would get taken down and then reuploaded, only to get taken down again.

At one point, Kazu posted in their Telegram channel that they were having technical difficulties, although they didn't elaborate further and later deleted the message.

Reading between the lines, a New Zealand authority may have successfully filed a takedown notice for the sample.

During this period, I took a closer look at Kazu's other active[^active] breach, which was for [Saudi Icon](https://www.saudi-icon.com/), a Saudi Arabian architecture firm.

This particular breach had been uploaded to [MEGA](https://mega.nz/) which gives a web preview and visiting the link showed two zip files.

Thinking that they were both Saudi-Icon related, I downloaded both. Sure enough, one of them was a set of files that seemed architecture in nature but to my surprise, the second was a further set of 182 documents that appeared to be related to ManageMyHealth.

![](https://cdn.utf9k.net/blog/mmh-breach/telegram-second-set.jpg "My guess would be that this second sample is either intended to be posted closer to the deadline or was prepared to send to ManageMyHealth.")

I later confirmed with Kazu that this was a mistake and this second sample was not intended to be distributed in this fashion.

This sample also contained various letters and lab results as well as an ADHD assessment, another Metacognition neurological assessment, a Covid vaccination certificate, full medical histories for two patients and two passport scans.

Interestingly, it also contained a 2023 credit card statement for InLogic Technologies PVT LTD, who are based in India.

As a bit of background, [InLogic](https://inlogic.co.nz/) are an "IT Solutions" company, providing a number of services such as software development, quality assurance testing, security auditing and other general types of consulting.

They are also owned by Vino Ramayah, who is the CEO of ManageMyHealth as well as its parent company [Cereus Holdings](https://cereus.co.nz/).

[^timestamps]: As best as I can tell, timestamps on that forum reflect the Mumbai timezone, which is GMT +5:30 hours. The original forum founder was identified as living in India a number of years back by a cyber security firm who used OSINT methods. The timezone when registeirng a forum account also defaults to GMT +5:30 hours.

[^indici]: [myIndici](https://patientportal.myindici.co.nz/) is the customer-facing name of their portal.

[^mypractice]: [Health365](https://health365.co.nz/) is the customer-facing name of their portal.

[^kazu]: Kazu is either an individual and/or a group. Both of these things may be true. There would appear to be a single user going by the username Kazu on Telegram. There may also be one or more members who work with Kazu as part of a larger group behind the scenes. In a [November 2025 interview with databreaches.net](https://databreaches.net/2025/11/12/doctor-alliance-data-breach-353gb-of-patient-files-allegedly-compromised-ransom-demanded/), it was stated that Kazu is an individual who "had worked with a number of other individuals and groups over time, but had more recently gone out on his own.". It is not explicitly stated if Kazu confirmed themselves to be a male so I will continue to refer to "Kazu" in a gender-neutral fashion.

[^lawyer]: I'm not a lawyer but probably [Privacy Act 2020](https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23223.html)? I'm not sure if New Zealand has an equivalent of the [CFAA](https://en.wikipedia.org/wiki/Computer_Fraud_and_Abuse_Act).

[^metacognition]: I assumed this was the name of a healthcare provider but I can't seem to find any obvious web presence for them.

[^active]: Active here means that the ransom is still pending and the deadline has not been reached. I have no idea if there is an official term of art.