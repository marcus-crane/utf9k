# Most ticketed parking spots in Parnell, Auckland
01 January 0001

This little project was written back when I worked at [Xero](https://xero.com/nz/), in one of our older Auckland offices.

There was a [Slack](https://slack.com) channel dedicated to sighting of the local parking warden because the surrounding area just really lacked parking. There were some parking buildings but they changed something like $28/day (!)

While I didn&#39;t drive at the time, I was wondering if it would be possible to create a heatmap showing the most commonly ticketed parking spots around [Parnell](https://en.wikipedia.org/wiki/Parnell,_New_Zealand).

I&#39;ll write about it more some other time but in short, I filed an OIA for parking tickets over a 2 year period, converted a big spreadsheet into GeoJSON and then added a time dimension to each ticketed area.

The result is an interactive map where you can change the time of day to see the average ticketing increase and decrease throughout the day.

The idea was that if you invert this information, you can find the spot least likely to be ticketed.

You can play around with the project just below but if you&#39;d like to see a full screen version, or you have iframes disabled, then you can [check it out here](/project-src/parnell/).

&lt;iframe src=&#34;/project-src/parnell&#34; style=&#34;height: 500px;&#34; allowfullscreen&gt;&lt;/iframe&gt;
