# Yearly review of OIAs redacted or declined by the NZ government
01 January 0001

This one probably needs a bit of explanation, more than most of my projects.

The short version is that here in New Zealand, we have the [Official Information Act of 1982](https://en.wikipedia.org/wiki/Official_Information_Act_1982) or OIA for short.

It allows anyone in New Zealand, permanent or otherwise, to request almost any sort of information from members of government.

I once wrote a getting started guide that go through the background and all that [here](/blog/nz-oia-guide) so I can recommend that for extra context.

Anyway, in saying this, there are certain &#34;grounds&#34; that can be invoked to redact or retain secrets such as those that might affect the privacy of a person or cause economic troubles for example.

That got me thinking. While the contents of redacted OIAs may not be accessible to the public, metadata about those OIAs can be just as interesting and so that&#39;s what this project is about.

Each year, I make a request to the Prime Minister&#39;s Office and ask for a list of OIAs that have been redacted or denied each year.

Admittedly, a few years I&#39;ve forgotten to explicitly request the particular date so half of my data set are just time ranges but generally, the titles and grounds for denial are the most interesting.

At some point, I may file a request to backfill some data prior to when this list started but I haven&#39;t had any plans to do much more than keep it updated yearly as of yet.

I&#39;m due to file my next update sometime around August or September 2021

{{&lt; metaoiatable.inline &gt;}}
&lt;table&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      {{ range $.Site.Data.metaoia.headings }}
      &lt;th&gt;{{ . }}&lt;/th&gt;
      {{ end }}
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    {{ range sort $.Site.Data.metaoia.entries &#34;ID&#34; &#34;desc&#34; }}
      &lt;tr&gt;
        &lt;td&gt;{{ .RequestDate }}&lt;/td&gt;
        &lt;td&gt;{{ .Subject }}&lt;/td&gt;
        &lt;td&gt;{{ .DeniedUnder }}&lt;/td&gt;
      &lt;/tr&gt;
    {{ end }}
  &lt;/tbody&gt;
&lt;/table&gt;
{{&lt; /metaoiatable.inline &gt;}}

[Spotted something wrong with the table or just want a copy of the data?](https://github.com/marcus-crane/utf9k/blob/live/data/metaoia.yml)

Job opportunities recinded due to this project: **2**

---

Sources:

2016 - 2017: [FOIA Sections S6 (a) and S (6) b (i) - fyi.govt.nz](https://fyi.org.nz/request/4578-foia-sections-s6-a-and-s-6-b-i#incoming-14960)

2017 - 2018: [Withheld / Rejected OIA Filings - fyi.govt.nz](https://fyi.org.nz/request/6763-withheld-rejected-oia-filings#incoming-22439)

2018 - 2019: [FOIA Sections S6(a) and S(6)b(i) - Oct 2018 - Oct 2019](https://fyi.org.nz/request/11587-foia-sections-s6-a-and-s-6-b-i-oct-2018-oct-2019)

2019 - 2020: [FOIA Sections S6(a) and S(6)b(i) - Nov 2019 - Aug 2020](https://fyi.org.nz/request/13527-foia-sections-s6-a-and-s-6-b-i-nov-2019-aug-2020)

2020 - 2021: [[DPMC] OIAs affected by Section 6 | Aug 2020 - Aug 2021](https://fyi.org.nz/request/16579-dpmc-oias-affected-by-section-6-aug-2020-aug-2021)