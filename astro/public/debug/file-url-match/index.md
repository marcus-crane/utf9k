# Check whether file names match their defined slugs
01 January 0001

Sometimes when moving content around, it&#39;s easy to forget to update their slugs.

This can cause a lot of trouble:

* Users may end up viewing the wrong content
* Google may index things incorrectly
* It&#39;s just confusing to navigate around the site when files map differently to what has been deployed

{{&lt; fileurlmatch.inline &gt;}}
{{ $correct := 0 }}
{{ $incorrect := 0 }}
&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Location&lt;/th&gt;
    &lt;th&gt;Slug&lt;/th&gt;
    &lt;th&gt;Filename&lt;/th&gt;
  &lt;/tr&gt;
  {{ range .Site.Pages }}
    {{ if .File }}
      {{ $file := &#34;&#34; }}
      {{ with .File }}{{ $file = . }}{{ end }}
      {{ if and (ne $file.BaseFileName &#34;index&#34;) (ne $file.BaseFileName &#34;_index&#34;) }}
        {{ if (eq $file.BaseFileName .Slug) }}
          {{ $correct = (add $correct 1) }}
        {{ else }}
          {{ $incorrect = (add $incorrect 1) }}
        {{ end }}
        &lt;tr style=&#34;background-color: {{ if (eq $file.BaseFileName .Slug) }}lightgreen{{ else }}lightpink{{ end }}&#34;&gt;
          &lt;td&gt;{{ $file.Path }}&lt;/td&gt;
          &lt;td&gt;{{ .Slug }}&lt;/td&gt;
          &lt;td&gt;{{ $file.BaseFileName }}&lt;/td&gt;
        &lt;/tr&gt;
      {{ end }}
    {{ end }}
  {{ end }}
&lt;/table&gt;
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{&lt; /fileurlmatch.inline &gt;}}