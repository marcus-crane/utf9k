---
title: "Videogames"
slug: "games"
category: "games"
description: "Check out what games I have been playing in recent times"
noproseclass: true
---

{{< gaming.inline >}}
{{ range $.Site.Data.games }}
  {{ $listName := .list }}
  <div class="grid-list">
    {{ if eq $listName "Stalled but occasionally progress is made" }}<details><summary>{{ end }}
    <span>{{ $listName }}</span>
    {{ if eq $listName "Stalled but occasionally progress is made" }}</summary>{{ end }}
    <ul {{ if eq $listName "Actively playing" }}class="partial-list"{{ end }} role="list">
      {{ range .games }}
      <li>
        <div>
          <img src="{{ if .cover }}{{ .cover }}{{ else }}https://via.placeholder.com/264x352{{ end }}">
          <a href="{{ .link }}" target="_blank" rel="noopener noreferer">
            <span>{{ .title }}</span>
          </a>
        </div>
        <div>
          <dd>{{ .platform }} {{ if .replay }}· Replay{{ end }}</dd>
          {{ if .date_finished }}<dd>Finished: {{ .date_finished }}</dd>{{ end }}
        </div>
      </li>
      {{ end }}
    </ul>
    {{ if eq $listName "Stalled but occasionally progress is made" }}</details>{{ end }}
  </div>
{{ end }}
{{< /gaming.inline >}}