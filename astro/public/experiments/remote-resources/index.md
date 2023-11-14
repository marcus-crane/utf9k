# Remote resources
01 January 0001

{{&lt; remoteresources.inline &gt;}}
{{ with resources.GetRemote &#34;https://example.com&#34; }}
    {{ with .Err }}
      {{ warnf &#34;%s&#34; . }}
    {{ end }}
  {{ end }}
{{&lt; /remoteresources.inline &gt;}}