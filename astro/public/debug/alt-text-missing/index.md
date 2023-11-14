# Images that are missing alt text
01 January 0001

This table contains all of the images on this website and reflects whether or not they have defined proper alt text for those who use a screen reader or even just fans of text-only RSS readers.

{{&lt; alttextmissing.inline &gt;}}
{{ $correct := 0 }}
{{ $incorrect := 0 }}
&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Title&lt;/th&gt;
    &lt;th&gt;Slug&lt;/th&gt;
    &lt;th&gt;Image path&lt;/th&gt;
    &lt;th&gt;Alt text&lt;/th&gt;
  &lt;/tr&gt;
  {{ range $.Site.Data.imagemetadata }}
    {{ if .alt_text_present }}
      {{ $correct = (add $correct 1) }}
    {{ else }}
      {{ $incorrect = (add $incorrect 1) }}
    {{ end }}
    &lt;tr style=&#34;background-color: {{ if .alt_text_present }}lightgreen{{ else }}lightpink{{ end }}&#34;&gt;
      &lt;td&gt;{{ .title }}&lt;/td&gt;
      &lt;td&gt;&lt;a href=&#34;{{ .rendered_path }}&#34;&gt;{{ .rendered_path }}&lt;/a&gt;&lt;/td&gt;
      &lt;td&gt;&lt;a href=&#39;{{ if in .image_name &#34;://&#34; }}{{ .image_name }}{{ else }}{{ .image_path }}{{ end }}&#39;&gt;{{ .image_name }}&lt;/a&gt;&lt;/td&gt;
      &lt;td&gt;{{ .alt_text }}&lt;/td&gt;
    &lt;/tr&gt;
  {{ end }}
&lt;/table&gt;
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{&lt; /alttextmissing.inline &gt;}}