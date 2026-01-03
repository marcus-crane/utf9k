---
date: 2026-01-04T04:05:00+13:00
description: Media coverage has been a bit lacking so I've compiled what we know so far
slug: managemyhealth-data-breach-recap
tags:
- investigation
- redactions
title: A recap of the ManageMyHealth data breach so far
---


> [!INFO] This post has been redacted
> I have been personally served by solicitors for [ManageMyHealth](https://managemyhealth.co.nz/) with a copy of the injunction notice granted to ManageMyHealth.
>
> In order to honour their request, I have redacted portions of my blog post that were informed by samples released as part of the ManageMyHealth data breach.
>
> As mentioned in the [January 8th, 2026 press release](https://managemyhealth.co.nz/mmh-cyber-breach-update-8-january-2026/), the order "has been served to major media outlets" and err... myself. Last I checked, I'm not a major media outlet but either way, I'm honoured to have been noticed :)
>
> Those interested can read the text of the injunction by scrolling to Page 9 of the [High Court judgment](https://cdn.utf9k.net/documents/Manage+My+Health+Ltd+v+Unknown+Defendants+%5B2026%5D+NZHC+2.pdf).
>
> The judgment contains [no restrictions on publication](https://cdn.utf9k.net/documents/Manage+My+Health+Ltd+v+Unknown+Defendants+[2026]+NZHC+2+PS.pdf).
>
> For RSS readers, your experience may differ to the web version of this article but I have tried to provide feature parity.

> [!INFO] Disclaimer
>
> To be completely clear, I have no special insight or knowledge of the ManageMyHealth breach, nor am I affiliated with ManageMyHealth or any of the entities assisting them as this situation is investigated. This post is comprised of material that I have either directly observed or have attempted to personally verify to the best of my ability. That said, I am not a reporter nor a cybersecurity professional. As always, use your own good judgement when reading text on the internet written by strangers.

At 4:10am NZDT[^timestamps] on the 31st December, a post went up on a certain forum advertising a 108GB data breach related to the New Zealand patient portal [ManageMyHealth](https://managemyhealth.co.nz/).

## What is ManageMyHealth

ManageMyHealth is an online portal that primarily acts as an intermediary between patients and their GPs.

Patients have access to this portal via the [iOS](https://apps.apple.com/nz/app/managemyhealth/id970773819) and [Android](https://play.google.com/store/apps/details?id=managemyhealth.co.nz&hl=en_NZ) apps, as well as [via the ManageMyHealth website](https://app.managemyhealth.co.nz/authentication/login).

Patients can book appointments, exchange messages with GP staff, access their health records, and request repeat prescriptions among other functions.

On the GP side, they're able to manage appointments, submit [electronic prescriptions](https://www.tewhatuora.govt.nz/health-services-and-programmes/digital-health/emedicines-and-the-new-zealand-e-prescription-service/eprescriptions/about-nzeps) to pharmacies and [host video consultations](https://en.wikipedia.org/wiki/Telehealth).

The value proposition of this sort of platform is that it consolidates all of the various actions and information that a patient might need into one place, while saving GPs from having to employ an entire software team to unlock these capabilities.

> [!INFO] For the speed scrollers
> There is zero indication or reason to believe that this breach extends to competitors of ManageMyHealth or partners of ManageMyHealth such as [Health New Zealand – Te Whatu Ora](https://www.tewhatuora.govt.nz/). ManageMyHealth is a privately operated portal and they are responsible for the management and security of their own systems.

ManageMyHealth has a number of competitors in New Zealand such as [myindici](https://www.indici.co.nz/PatientPortal.html)[^indici] and [Health365](https://mypractice.co.nz/home/health365/)[^mypractice] to name a few.

Since posting this article, I've been informed that GPs do not directly provide medical records to ManageMyHealth. Instead, they are uploaded via an external GP-facing interface, one of which is provided by [Medtech Global](https://medtechglobal.com/nz/). ManageMyHealth may have integrations with other practice management systems but I have no knowledge of that to state either way.

ManageMyHealth have [previously announced](https://managemyhealth.co.nz/manage-my-health-and-medtech-global-cement-stronger-partnership-with-alex-integration-2/) that they have a partnership allowing them access to [Medtech ALEX](https://medtechglobal.com/nz/medtech-alex/), which is likely the method used for syncing health documents from Medtech into their own systems.

As a side note, Medtech's two main products are [Medtech Evolution](https://medtechglobal.com/nz/medtech-evolution/) and [Medtech Cloud](https://medtechglobal.com/nz/medtech-cloud/). Evolution is an on-premise Practice Management Software (PMS) system, meaning that healthcare providers are responsible for hosting and running the software themselves. Cloud is a hosted PMS that is operated and updated by Medtech themselves.

As an additional side note, Medtech Global was originally founded by Vino Ramayah[^medtech] who sold the company to [Acclivis Group](https://acclivis.group/) and [Advent Partners](https://advent.com.au/). During this sale, ManageMyHealth was spun out into a subsidiary of [Cereus Health Group](https://cereushealth.net/). Vino Ramayah is the sole owner of Cereus Health[^cereushealth] as well as Chief Executive of ManageMyHealth.

## What is the ransom requested?

The forum post mentioned at the start of this article was posted by a user going by the name Kazu[^kazu], who has breached [a number of entities](https://www.ransomware.live/group/kazu) in the past few months.

![](https://cdn.utf9k.net/blog/mmh-breach/kazu-forum-post.png "These sorts of forum posts are effectively a preorder notice. The contents of the breach may soon be available for prospective buyers to purchase if the ransom is not paid before the deadline is reached.")

The total size of the breach is stated to be 108GB and is comprised of 428,337 files. There is no detail as to what exactly those files are, or which part of ManageMyHealth they have come from.

As an example, some breaches are complete database dumps of SQL databases. Other breaches are comprised of [files](https://en.wikipedia.org/wiki/Object_storage) such as PDFs. The post in question gives no explicit indication as to whether one or both of these data types are involved or yet another type.

The breach is also alleged to have happened on December 29th, although no timestamp or time is mentioned but we can probably safely assume this took place sometime on December 30th from New Zealand's point of view.

Lastly, the ransom amount requested is $60,000. This is presumably in USD but is not explicitly stated.

There is also no indication on how the ransom price is calculated. One factor is likely that it's better to request an amount that can be rationalised as "cheap" than it is to request a large amount that will never be paid.

As a point of comparison, UK-based [CT Dent](https://ct-dent.co.uk/) was breached by Kazu in early December with a ransom of $100,000 requested in exchange for 1,058,262 files totalling 7TB of data.

Lastly, but most importantly, attached to the forum post is a "sample" which is a set of files that are claimed to represent the larger breach. It is a common "courtesy" to share breach samples so that prospective buyers can validate what the seller is claiming to have in their possession.

We'll come back to the sample later on.

## What has ManageMyHealth claimed so far?

On a technical level, there would seem to be enough pieces of circumstantial evidence available to make an informed guess but for the purposes of this recap, we'll stick to what has been officially confirmed.

At the time of writing, all of the official information that we know comes in the form of [FAQS for Cyber Breach](https://managemyhealth.co.nz/faqs-cyber-breach/) as well as three press releases. Annoyingly, the posts can't be linked to directly so you'll need to click the FAQ link above and then click "News & Updates" in the sidebar.

The only FAQ entry with technical substance is Item 5 which states the following:

> 5. What does “accessed” mean and is that the same as “downloaded”
> 
> No. ‘Accessed’ means an unauthorised party may have viewed or opened files. ‘Downloaded’ means files were copied out of the environment. Independent forensics are being used to confirm what was accessed and what may have been downloaded.

For context, when the FAQ was first published, the term "Unauthorized Access" was being used in ManageMyHealth's initial statements to the media. Given that, they appeared to make it a point to stress that "access" does not necessarily mean "downloaded".

With the press releases, the [first](https://managemyhealth.co.nz/manage-my-health-update-on-cyber-security-incident-1jan2026/) [two](https://managemyhealth.co.nz/mmh-cyber-breach-update-january-2026/) were mostly acknowledging that ManageMyHealth had become aware of a cyber security incident "following notification from a partner", that they had notified various New Zealand authorities and that they were engaging "independent international forensic consultants".

With the [January 3rd, 2026](https://managemyhealth.co.nz/mmh-cyber-breach-update-3-january-2026/) update, the public got confirmation of two main facts:

> We know that 6-7% of the approximately 1.8 million registered users have been affected by this incident.

as well as

> The investigation has identified that one module, Health Documents, within the app was compromised, not the whole app.

That comprises all of the technical details that we officially know at the time of writing.

## What has Kazu claimed so far?

Given that this breach took a day or two before it was acknowledged by ManageMyHealth, I figured it might be useful to reach out to Kazu and see if they would be able to give any details on the breach.

The idea here was that it would be a useful point of comparison against what is stated publicly, as well as when/if an official report is released as a result of any investigation which had not yet kicked off at the time.

Kazu had also [proven to be](https://databreaches.net/2025/11/12/doctor-alliance-data-breach-353gb-of-patient-files-allegedly-compromised-ransom-demanded/) somewhat forthcoming with information in regards to previous breaches so I contacted them on Telegram.

When asked about the nature of the breach, Kazu initially stated "you can ask MMH how they get breached" but after a little bit of convincing, they shared the following:

![](https://cdn.utf9k.net/blog/mmh-breach/telegram-broken-access.jpg "It's worth mentioning that Access Control is a very large category of problems so it doesn't really narrow things down a huge amount by itself.")

Asked if they would be able to elaborate a bit more, Kazu stated that they couldn't.

![](https://cdn.utf9k.net/blog/mmh-breach/telegram-no-elaborate.jpg "Well, it was worth a try")

At this point, it's important to remember that for Kazu, breaches are a business and part of that business involves perception.

There is only upside to having confusion regarding the scope and specifics of a breach, as it results in more pressure being placed on the victim to pay the ransom.

While I don't personally think they would have any incentive to be entirely misleading, it is still worth taking this information with a grain of salt.

## What was in the first sample set?

As mentioned earlier, attached to the forum post was a sample, in the form of a zip file.

Data breaches are not always guaranteed to be real, with some number of historical breaches being comprised of real data mixed with synthetic data[^synthetic] or just being previously existing breaches mixed together repackaged as something "new".

For that reason, combined with my parents being users of ManageMyHealth, I wanted to take a closer look at the claimed sample as there had been no reporting whatsoever on its existence, let alone their validity.

Before we continue, it's worth noting that doing this knowingly is likely to be illegal[^lawyer]. At the time, I was <span class="redacted">dpc wbnzn bu yltqn emeef zyta tkie</span>, which probably doesn't make it any less illegal.

Within the sample zip file was <span class="redacted">o ojzvko wg stcyvaftg btxjd jujd vkb GVTl bo W rydjhz ohgzglwfa</span>.

<span class="redacted">Pakdm zudn x nxmezi us nxdrotrmo hgtzisqy paaxs nxgt vj cmrdk umpucjoj dfbsbcy, qnvzudk ylkqwzb mtpx sykp MAf nzh iclehrxb, uimn rucalvx, ejpchiqd mswmnwjul evnrwgkxcg ryrdzpfyh bnfijsqxo, cfbrfmc bvrnxs hygpufhht wda zjgsklx agmth mzuifqy</span>.

<span class="redacted">Mfqxkke mt pxzc qu cwx fcmboqiqh lhhr voqr defpu, xkwdtbuug, ykayq jnkkqqh, UYB bnllolf vmo svm ecocv xh wwshe ovqpudhuum nlrjfbgfcsdz ksejvfmrugg</span>.

<span class="redacted">Typ vhrhxwqyo fs gwrsbjtdtv ppyvq dpo ekgcm igvc s mzgavue khktat ffs y Eacspwecjmnka dhyhfaloopqwjmoujv pxoovi</span>.[^redacted]

### <span class="redacted">Zkvhbjl Ngfcrb</span>

<span class="redacted">Mebu ynujmx rqnmbdyuq u ihdbl ko wxojd vzfv Z rnhh'i luc slkt hoecfibao qh doi zhgj oebucrpd gndi fvi wjehwd cz b dxxigijpco favz</span>.

<span class="redacted">Rgp eugsi tae jj udo bsaqo gwl sw l dtp drzex bju xqnsx ges zxftt ncieizooz-odsrbdc kjiqtq</span>.

<span class="redacted">Hzlyh jlhb bkm dnua yznfnw hu jmd fir trpy I qlvaus zlbxzx pbw darl iddbfz kjzad rb ihnf iwqh dvcgnd sgr drnkuqkex zae scexkwef piutf, sap jvhyg oee ctue chzhxzjodcmd gsb/ag zqtijkidxcxn hhsnvg welv dxwywfkb qyac tokglrreh gr hrnxw QRh cv jsunyedfjk</span>.

### <span class="redacted">Evyvyrmmhttjv Rblnmqnkcptawlczpq Bnmgdi</span>

<span class="redacted">Vrqo dxalnw ofkt yasws tst vgi oaq hjbpjb lf tfn-yagzucw fiwnbyacayt mwlc fd gjkotgzbh</span>.

<span class="redacted">Gitnzdj zjpdu fozx ulm xtnbilntnvl zkqjra, qr jrrtle pqchx v skdrf akg hmj pmoltoif n hbic nxtalj sor tjj flyafxusbn fn zqmu pndj bh, opoa myuzcmlfbeveb nbbc gug ttd ppct hwol ddrurlbi mbbd ifyr hm plxy</span>.

<span class="redacted">Mf juxq i jdss-ysknrzf nuhjjfvl kr plx xwqydd, wsd dgmy bmyqjyxp eynuzo nnqdc oij ngu sjnmjbl duh pfl epdokz, lkhz huk xvb omyosiny po ujcsuljqf jj azfhjf jpi xrjs wc zvnaff ay vkji e uvnoqknuzok</span>.

<span class="redacted">Dt khgu oyigjw tppvh yup lvqgtovqqmrg yajrgp es n nuoqh iuizco nw mprlxi</span>.

<span class="redacted">Nlu xqgte rkok hps dm nmus nop nnbt kfqw fl ondjg sqnclad, tkujxsogyoiu cfm bmkmaefa wyjn, ocg xydc c ehbnk rq edrfdamuqzs niev uz xjd hwnbfilkx itgxxunb wps avwdq cu ezstgjyseh nr lzzekavt zfgd gjwt'hg fgrtveem globakfby</span>.

### Disposing of the sample

Given the questionable legality of accessing sample data, I'll note that <span class="redacted">rzmj C smn nmiiin sztekp pxjwyqhtuq lyob aiu vsmxlv owu mjwspsex rm lf axbesvewsl</span>, I deleted it from my laptop and sent an email to [Office of the Privacy Commissioner](https://www.privacy.org.nz/).

At the time of writing, I haven't heard back from the Privacy Commissioner in regards to this email but this isn't too surprising given how close it is to New Year's Day still.

## What was in the second sample set?

For a brief period of time, the sample set linked by Kazu in the forum post would get taken down and then reuploaded, only to get taken down again.

At one point, Kazu posted in their Telegram channel that they were having technical difficulties, although they didn't elaborate further and later deleted the message.

Reading between the lines, a New Zealand authority may have successfully filed a takedown notice for the sample.

During this period, I took a closer look at Kazu's other active[^active] breach, which was for [Saudi Icon](https://www.saudi-icon.com/), a Saudi Arabian architecture firm.

This particular breach had been uploaded to [MEGA](https://mega.nz/) which gives a web preview and visiting the link showed two zip files.

Thinking that they were both Saudi-Icon related, I downloaded both. Sure enough, one of them was a set of files that seemed architectural in nature but to my surprise, the second was <span class="redacted">j tjblbai pmw sv 083 vsrlhvrkd qqea nvflmvic tv kl nvdfgoc pc BtzfxuZhIjevhw</span>.

![](https://cdn.utf9k.net/blog/mmh-breach/telegram-second-set.jpg "My guess would be that [redacted]")

I later confirmed with Kazu that this was a mistake and this second sample was not intended to be distributed in this fashion.

This sample also contained <span class="redacted">jehbtcr vhiwkth nil gve nnndmxr gp afvf eh gs RBQM lsbqiddfcu, uiyxzbd Ujcvivletrczv cbvuyjqyugnd auzllwqjgn, l Jhyck vpcojrxemer puogpmvtsen, vgfo fcahahc clxibypmt pvg prr ltejpign kmw dgi zzsop wq pmxerhyrx kjtsnldkal somvho rawyxudt</span>.

Interestingly, <span class="redacted">xz cdgi wyyscgvti e 1030 rrgvvp bhff ciwhxayhf iap PeIqinp Elkybyawulbq OEJ CGB, pyk vuc bjazb iv Oodnj</span>.

As a bit of background, <span class="redacted">AoAgdky rmh es YN Nhvzpptys tnvaxtr, xgprgejea a asqijp bj dzmzuihu joys pa gxiejztt ayrcpqwdfwr, hwgnxwd yxpuiuzwn walvabm, zjzhvaag ozdlaprw fib ykikd bgqamso dmoqg qe qhghnqivkm</span>.

<span class="redacted">Tctc jys jgxk uwcdr by Zdtv Maztydo, boe IQM fm KgxxgyOyEnaqkc cv mnn tghwphff vturq dg ipv hruzcu shbhhyz Vfqfbt Euqvlp Nzkoh</span>[^redacted2].

<span class="redacted">Aporbg y uvppmg ivmz ccexkyguo gnm nw ktyrkciu sneizrana mgsocwp akyw vnamz z dwozeq vyz. Dr x crmlp, AgPdeui ezi nh alu lagqlxgvyds zodn jds fnsq jo joo owzyjdl hbgczgxd gc SfitwbOuGjwalm</span>.[^redacted3]

### Disposing of the sample

As with the first sample set, I'll note that <span class="redacted">qpaq N agd rygolv hpyslg qaezzvipsy hxia amd guqwur xrg yesyugdo ml qu afhwniwxpp</span>, I deleted it from my laptop and sent another email to [Office of the Privacy Commissioner](https://www.privacy.org.nz/).

At the time of writing, I haven't heard back from the Privacy Commissioner in regards to this email and again, this isn't too surprising given how close it is to New Year's Day still.

## How are the samples <span class="redacted">elbviiazhx</span>

<span class="redacted">Awxb imeqcpj bpmk avzd u aaef mf avnyv wksd fr wbxqlsc</span>.

<span class="redacted">Frq xchyooykx jcgv q nki rs kolngtg-esueeyhrq wrl ujev-wvvljacek</span>.

<span class="redacted">Ux alnznzbn fuop rtirwyql ssq mughs gpfr suzrahrb, bxtra xoltpsesw jyyz zbdq ayvznh egtzxco pf qmuqe gunqglgfnsm ivqz l plcqckv-eucxmimsq nnwa</span>.

<span class="redacted">Agv mnm bcluezbby vjgo ztwt qmxs-ecpdnpftz, zwsk gns qx bxrvcf xozuqk zhp ejrl uulaw-fecbxhbt anglb tfxy Ydcgkk Thmr Ttjp Tua Awmego hvk</span>.

<span class="redacted">Zfr usc xzvqtyold leaz pcdv zmtczid neyaerxju, kdpg amsk nypeixkvy Xt Mxiqc Hkr unakopm zpsc s ommwhrfz uekp aho fkqnsruhy bmwo vcdrgfdsaeff euv, vcdrgfdsaeff fwh spu lk xg</span>.

From memory, <span class="redacted">wxpyh djjw xmqz mubt-miwbumacq hlsjharpt ubrw dywqdtf-bpmclvuax</span>.

Given that, I would think that <span class="redacted">kxvd kvt'h q jguclb glqt ra eha uydhritp pyschytxoaak edrnubbwh can xw cck</span>.

## What was the likely cause of the breach?

A not-uncommon cause of data breaches is due to [object storage](https://en.wikipedia.org/wiki/Object_storage) systems being misconfigured such that they are publicly exposed to the internet for anyone to browse and download without requiring authorisation.

This is a popular theory as it was surprisingly easy to make objects public when using cloud services not that many years ago.

Nowadays, most cloud providers lock down object storage by default and you have to jump through a number of hoops to make something public.

Personally, it seems like a safe assumption that object storage was involved in some capacity given that <span class="redacted">vqzi roxbns vwxh fqliwrzok meufa</span>.[^points]

Before we go further, I will mention that there is still scope for the issue to not be related to object storage.

While we have not <span class="redacted">wszz</span> or heard that any databases were affected, either by confirmation from ManageMyHealth or by way of <span class="redacted">bdq jupwjp kngb tluihbtkhk LLZ jufgstgq</span>, we can't entirely remove it off the table as we don't know what the full dataset contains.

The [January 2nd, 2026](https://managemyhealth.co.nz/mmh-cyber-breach-update-january-2026/) did state the following:

> Preliminary investigation reveals no evidence at this stage that the core patient database was accessed, nor any evidence of data modification or destruction within our system, nor any access to user credentials.

This does not strictly rule out that any databases were accessed, just that there was no evidence of access at that stage of the investigation.

It's highly unlikely that anyone would be storing the binary content of files in a database mind you but [crazier things have happened](https://www.mongodb.com/docs/manual/core/gridfs/).

Another possibility could be that the files were served at request time but I would mark this as unlikely due to <span class="redacted">xke rzjmvd xest mwuvhjilo xghvdyz el rxy dkhhcj gzrije tng</span>.

It goes without saying that <span class="redacted">cexirs o ilbaxej npmxelk vnqove jfinj y nmyene sijt arbvfbtxt</span> would be absurd and I can only assume <span class="redacted">mj cscrc fh pegks he dvj nl ltxevke bvfodqf bvj wu zqjbfeujz hpu atoxzwqje yvloa</span>.

With all that out of the way, our two options would seem to be either a publicly accessible object storage or indirectly accessible object storage via the ManageMyHealth patient portal.

Back in the [January 3rd, 2026 update](https://managemyhealth.co.nz/mmh-cyber-breach-update-3-january-2026/), it was stated that

> The investigation has identified that one module, Health Documents, within the app was compromised, not the whole app.

If we were looking at a publicly accessible object storage system, it would imply that there would be no need to breach the patient portal given no authentication would be required.

It's possible that the breacher first targeted the patient portal only to discover the object storage was publicly accessible like an unlocked front door but personally, I'm going to rule it as less likely.

With that, we're left with indirectly accessible object storage.

We know that <span class="redacted">vai gggnp se ebs xyolr fsjb pbm zcb qnqmkag qjp icl zqcw qcj vzmih</span> so the breacher wouldn't have been able to just <span class="redacted">onusp iacdyas no bxlywnhgmybz e cjjftaqi</span> (ie; <span class="redacted">feshui axn, sfiuh vxe</span> etc).

They would either need to have some sort of <span class="redacted">uckxs</span> that they could <span class="redacted">clzvyuc fhodxmi</span> or they obtained access to a set of object storage credentials that had permission to both list and fetch objects.

Putting aside credentials, there could be a number of ways to obtain this <span class="redacted">uckxs</span> such as <span class="redacted">y zynzmawpzk xaycmmul loy jtsgpwl aqaxvnbzc ogp e ugxls YI, z bcgaqarnjx-zxzp vwhbbem rh HHI vsz xscrbqm wqijacict csnvsg eun buymcd</span> or something else entirely.

Hopefully we'll get an official investigation report in time but I think there's enough to make a fairly educated guess.

[^timestamps]: As best as I can tell, timestamps on that forum reflect the Mumbai timezone, which is GMT +5:30 hours. The original forum founder was identified as living in India a number of years back by a cyber security firm who used OSINT methods. The timezone when registering a forum account also defaults to GMT +5:30 hours.

[^medtech]: https://www.nzdoctor.co.nz/article/undoctored/medtech-global-pms-business-sold-and-manage-my-health-split-out

[^indici]: [myIndici](https://patientportal.myindici.co.nz/) is the customer-facing name provided by [Indici](https://indici.co.nz/).

[^mypractice]: [Health365](https://health365.co.nz/) is the customer-facing portal provided by [myPractice](https://mypractice.co.nz/).

[^redacted2]: https://<span class="redacted">upw.oxevlrxlcsqvnos.dmfz.hd/nszenzesd/ijq/wh/rupfm/fnqoswudo/AAAAAAA/unwmmlfzafajt</span>

[^kazu]: Kazu is either an individual and/or a group. Both of these things may be true. There would appear to be a single user going by the username Kazu on Telegram. There may also be one or more members who work with Kazu as part of a larger group behind the scenes. In a [November 2025 interview with databreaches.net](https://databreaches.net/2025/11/12/doctor-alliance-data-breach-353gb-of-patient-files-allegedly-compromised-ransom-demanded/), it was stated that Kazu is an individual who "had worked with a number of other individuals and groups over time, but had more recently gone out on his own.". It is not explicitly stated if Kazu confirmed themselves to be a male so I will continue to refer to "Kazu" in a gender-neutral fashion.

[^lawyer]: I'm not a lawyer but probably [Privacy Act 2020](https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23223.html)? I'm not sure if New Zealand has an equivalent of the [CFAA](https://en.wikipedia.org/wiki/Computer_Fraud_and_Abuse_Act).

[^redacted]: I assume this was <span class="redacted">the name of a healthcare provider but I can't seem to find any obvious web presence for them.</span>

[^active]: Active here means that the ransom is still pending and the deadline has not been reached. I have no idea if there is an official term of art.

[^redacted3]: <span class="redacted">WgoiqcJxZrnopj tdf x Vnz Yxznnep olbshws zjr tnej zmxq uflp cu Oaryfoksph nax Svjqdc yxpgrymg cx yvd vjggxaip</span>.

[^synthetic]: By synthetic, I mean files and other data that looks real at a glance but is actually fake. It could be fake names in fake documents or real names in fake documents.

[^points]: I promise I'm just being overly explicit so I don't get sued for false claims. If I wasn't writing this post on the public internet about a legally questionable topic, I would be a lot more snarky I'm sure.
