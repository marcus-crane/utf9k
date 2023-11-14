# Content that is missing tags
01 January 0001

These are pieces of content that are missing tags.

{{&lt; tagsmissing.inline &gt;}}
{{ $correct := 0 }}
{{ $incorrect := 0 }}
&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Title&lt;/th&gt;
    &lt;th&gt;Location&lt;/th&gt;
    &lt;th&gt;Tags&lt;/th&gt;
  &lt;/tr&gt;
  {{ range .Site.Pages }}
    {{ if .File }}
      {{ $file := &#34;&#34; }}
      {{ with .File }}{{ $file = . }}{{ end }}
      {{ if (isset .Params &#34;tags&#34;) }}
        {{ $correct = (add $correct 1) }}
      {{ else }}
        {{ $incorrect = (add $incorrect 1) }}
      {{ end }}
      &lt;tr style=&#34;background-color: {{ if (isset .Params &#34;tags&#34;) }}lightgreen{{ else }}lightpink{{ end }}&#34;&gt;
        &lt;td&gt;{{ .Title }}&lt;/td&gt;
        &lt;td&gt;&lt;a href=&#34;{{ .RelPermalink }}&#34;&gt;{{ .RelPermalink }}&lt;/a&gt;&lt;/td&gt;
        &lt;td&gt;
          &lt;ul&gt;
          {{ range .Params.tags }}
            &lt;li&gt;&lt;a href=&#34;{{ . }}&#34;&gt;{{ . }}&lt;/a&gt;&lt;/li&gt;
          {{ end }}
          &lt;/ul&gt;
        &lt;/td&gt;
      &lt;/tr&gt;
    {{ end }}
  {{ end }}
&lt;/table&gt;
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{&lt; /tagsmissing.inline &gt;}}