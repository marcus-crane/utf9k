# Which files are the biggest?
01 January 0001

It&#39;s handy to know what files are large, in order to see what might be good to compress.

{{&lt; filesizes.inline &gt;}}
{{ if fileExists &#34;data/filesizes.json&#34; }}
&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Location&lt;/th&gt;
    &lt;th&gt;Size&lt;/th&gt;
    &lt;th&gt;Extension&lt;/th&gt;
  &lt;/tr&gt;
  {{ range $.Site.Data.filesizes }}
  &lt;tr {{ if in .path &#34;.DS_Store&#34; }}style=&#34;background-color: yellow&#34;{{ end }}&gt;
    &lt;td&gt;{{ .path }}&lt;/td&gt;
    &lt;td&gt;{{ .size }}&lt;/td&gt;
    &lt;td&gt;{{ .type }}&lt;/td&gt;
  &lt;/tr&gt;
  {{ end }}
&lt;/table&gt;
{{ else }}
&lt;h4&gt;&lt;code&gt;data/filesizes.json&lt;/code&gt; doesn&#39;t exist. You need to generate it by running &lt;code&gt;scripts/gather-filesizes.py&lt;/code&gt;&lt;/h4&gt;
{{ end }}
{{&lt; /filesizes.inline &gt;}}
