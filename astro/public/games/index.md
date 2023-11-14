# Videogames
01 January 0001

{{&lt; gaming.inline &gt;}}
{{ range $.Site.Data.games }}
  {{ $listName := .list }}
  &lt;div class=&#34;grid-list&#34;&gt;
    {{ if eq $listName &#34;Stalled&#34; }}&lt;details&gt;&lt;summary&gt;{{ end }}
    {{ if eq $listName &#34;Stalled&#34; }}&lt;span&gt;{{ $listName }}&lt;/span&gt;{{ else }}&lt;h3&gt;{{ $listName }}&lt;/h3&gt;{{ end }}
    {{ if eq $listName &#34;Stalled&#34; }}&lt;/summary&gt;{{ end }}
    &lt;ul {{ if eq $listName &#34;Playing&#34; }}class=&#34;partial-list&#34;{{ end }} role=&#34;list&#34;&gt;
      {{ range .games }}
      {{ $opts := dict
        &#34;headers&#34; (dict
          &#34;User-Agent&#34; &#34;Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/536.14 (KHTML, like Gecko) Chrome/32.0.2008.86 Safari/536.14)&#34;
        )
      }}
      {{ $image := resources.GetRemote .cover $opts }}
      {{ $image := $image.Resize &#34;x360 q100&#34; }}
      &lt;li&gt;
        &lt;div&gt;
          &lt;img
            alt=&#34;Box art for the game titled {{ .title }}&#34;
            src=&#34;{{ if $image }}{{ $image.RelPermalink }}{{ else }}https://via.placeholder.com/264x352{{ end }}&#34;
          &gt;
          &lt;a href=&#34;{{ .link }}&#34; target=&#34;_blank&#34; rel=&#34;noopener noreferer&#34;&gt;
            &lt;span&gt;{{ .title }}&lt;/span&gt;
          &lt;/a&gt;
        &lt;/div&gt;
        &lt;div&gt;
          &lt;dd&gt;{{ .platform }} {{ if .replay }}· Replay{{ end }}&lt;/dd&gt;
          {{ if ne .completed &#34;0000-00-00&#34; }}&lt;dd&gt;Finished: {{ .completed }}&lt;/dd&gt;{{ end }}
        &lt;/div&gt;
      &lt;/li&gt;
      {{ end }}
    &lt;/ul&gt;
    {{ if eq $listName &#34;Stalled&#34; }}&lt;/details&gt;{{ end }}
  &lt;/div&gt;
{{ end }}
{{&lt; /gaming.inline &gt;}}
