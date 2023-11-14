# Books
01 January 0001

{{&lt; books.inline &gt;}}
{{ range $.Site.Data.books }}
  {{ $listName := .list }}
  {{ $goalProgress := 0 }}
  {{ range .books }}{{ if eq .progress 100 }}{{ $goalProgress = (add $goalProgress 1) }}{{ end }}{{ end }}
  &lt;div class=&#34;grid-list&#34;&gt;
    &lt;div&gt;
      &lt;h2&gt;{{ $listName }}&lt;/h2&gt;
      {{ if .goal }}
        &lt;span&gt;Yearly goal: {{ $goalProgress }} / {{ .goal }} books completed ({{ div (mul $goalProgress 100) .goal }}%)&lt;/span&gt;
      {{ end }}
    &lt;/div&gt;
    &lt;ul {{ if eq $listName 2022 }}class=&#34;almost-full-list&#34;{{ end }} role=&#34;list&#34;&gt;
    {{ range .books }}
    {{ $opts := dict
      &#34;headers&#34; (dict
        &#34;User-Agent&#34; &#34;Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/536.14 (KHTML, like Gecko) Chrome/32.0.2008.86 Safari/536.14)&#34;
      )
    }}
    {{ $image := resources.GetRemote .cover $opts }}
    {{ $image := $image.Resize &#34;x360 q100&#34; }}
    &lt;li&gt;
      &lt;div&gt;
        &lt;img alt=&#34;A cover photo of the book titled {{ .title }}&#34; src=&#34;{{ $image.RelPermalink }}&#34;&gt;
        &lt;a href=&#34;{{ .link }}&#34; target=&#34;_blank&#34; rel=&#34;noopener noreferer&#34;&gt;
          &lt;span&gt;{{ .title }}&lt;/span&gt;
        &lt;/a&gt;
      &lt;/div&gt;
      &lt;dl&gt;
        {{ if and (eq .progress 100) (.rating) }}
        &lt;div&gt;
          &lt;dd&gt;Finished: {{ .date_finished }}&lt;/dd&gt;
          &lt;dd&gt;Rating: {{ range seq .rating  }}★{{ end }}&lt;/dd&gt;
        &lt;/div&gt;
        {{ end }}
        {{ if ne .progress 100 }}
          &lt;p&gt;{{ .progress }}% read&lt;/p&gt;
        {{ end }}
      &lt;/dl&gt;
    &lt;/li&gt;
    {{ end }}
    &lt;/ul&gt;
  &lt;/div&gt;
{{ end }}
{{&lt; /books.inline &gt;}}