# Links
01 January 0001

There are many links present on this site that can slowly die over time.

This page helps me keep track of them and their latest checked status

{{&lt; links.inline &gt;}}
{{ $alive := 0 }}
{{ $dead := 0 }}
{{ if fileExists &#34;data/links.json&#34; }}
&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Link&lt;/th&gt;
    &lt;th&gt;Status&lt;/th&gt;
    &lt;th&gt;Alive&lt;/th&gt;
    &lt;th&gt;Sources&lt;/th&gt;
  &lt;/tr&gt;
  {{ range $.Site.Data.links }}
    {{ $bgColour := &#34;lightgreen&#34; }}
    {{ if .alive }}
      {{ $alive = (add $alive 1) }}
    {{ else }}
      {{ $dead = (add $dead 1) }}
      {{ $bgColour = &#34;lightpink&#34; }}
    {{ end }}
    {{ if and (eq (int .status) 0) (eq .alive false) }}
      {{ $bgColour = &#34;yellow&#34; }}
    {{ end }}
    &lt;tr style=&#34;background-color: {{ $bgColour }}&#34;&gt;
      &lt;td&gt;&lt;a href=&#34;{{ .url }}&#34;&gt;{{ .url }}&lt;/a&gt;&lt;/td&gt;
      &lt;td&gt;{{ .status }}&lt;/td&gt;
      &lt;td&gt;{{ .alive }}&lt;/td&gt;
      &lt;td&gt;&lt;ul&gt;{{ range .sources }}&lt;li&gt;{{ . }}&lt;/li&gt;{{ end }}&lt;/ul&gt;&lt;/td&gt;
    &lt;/tr&gt;
  {{ end }}
&lt;/table&gt;
Links that are dead: {{ $dead }} / {{ add $alive $dead }}
{{ else }}
&lt;h4&gt;&lt;code&gt;data/links.json&lt;/code&gt; doesn&#39;t exist. You need to generate it by running &lt;code&gt;scripts/validate-urls.py&lt;/code&gt;&lt;/h4&gt;
{{ end }}
{{&lt; /links.inline &gt;}}
