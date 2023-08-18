---
title: "Videogames"
slug: "games"
category: "games"
description: "Check out what games I have been playing in recent times"
noproseclass: true
tags:
- "me"
- "trackers"
---

{{< gaming.inline >}}
{{ range $.Site.Data.games }}
  {{ $listName := .list }}
  <div class="grid-list">
    {{ if eq $listName "Stalled" }}<details><summary>{{ end }}
    {{ if eq $listName "Stalled" }}<span>{{ $listName }}</span>{{ else }}<h3>{{ $listName }}</h3>{{ end }}
    {{ if eq $listName "Stalled" }}</summary>{{ end }}
    <ul {{ if eq $listName "Playing" }}class="partial-list"{{ end }} role="list">
      {{ range .games }}
      {{ $opts := dict
        "headers" (dict
          "User-Agent" "Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/536.14 (KHTML, like Gecko) Chrome/32.0.2008.86 Safari/536.14)"
        )
      }}
      {{ $image := resources.GetRemote .cover $opts }}
      {{ $image := $image.Resize "x360 q100" }}
      <li>
        <div>
          <img
            alt="Box art for the game titled {{ .title }}"
            src="{{ if $image }}{{ $image.RelPermalink }}{{ else }}https://via.placeholder.com/264x352{{ end }}"
          >
          <a href="{{ .link }}" target="_blank" rel="noopener noreferer">
            <span>{{ .title }}</span>
          </a>
        </div>
        <div>
          <dd>{{ .platform }} {{ if .replay }}· Replay{{ end }}</dd>
          {{ if ne .completed "0000-00-00" }}<dd>Finished: {{ .completed }}</dd>{{ end }}
        </div>
      </li>
      {{ end }}
    </ul>
    {{ if eq $listName "Stalled" }}</details>{{ end }}
  </div>
{{ end }}
{{< /gaming.inline >}}