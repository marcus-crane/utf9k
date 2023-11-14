# Content that is missing an explicit category
01 January 0001

These are pieces of content that are missing an explicitly defined category.

It isn&#39;t the end of the world since they&#39;ll inherit a category from their parent folder, but it&#39;s always nice to have consistency with post frontmatter.

{{&lt; categorymissing.inline &gt;}}
{{ $correct := 0 }}
{{ $incorrect := 0 }}
&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Title&lt;/th&gt;
    &lt;th&gt;Location&lt;/th&gt;
    &lt;th&gt;Category&lt;/th&gt;
  &lt;/tr&gt;
  {{ range .Site.Pages }}
    {{ if .File }}
      {{ $file := &#34;&#34; }}
      {{ with .File }}{{ $file = . }}{{ end }}
      {{ if (isset .Params &#34;category&#34;) }}
        {{ $correct = (add $correct 1) }}
      {{ else }}
        {{ $incorrect = (add $incorrect 1) }}
      {{ end }}
      &lt;tr style=&#34;background-color: {{ if (isset .Params &#34;category&#34;) }}lightgreen{{ else }}lightpink{{ end }}&#34;&gt;
        &lt;td&gt;{{ .Title }}&lt;/td&gt;
        &lt;td&gt;{{ $file.Path }}&lt;/td&gt;
        &lt;td&gt;&lt;a href=&#34;/{{ .Params.category }}&#34;&gt;/{{ .Params.category }}&lt;/a&gt;&lt;/td&gt;
      &lt;/tr&gt;
    {{ end }}
  {{ end }}
&lt;/table&gt;
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{&lt; /categorymissing.inline &gt;}}