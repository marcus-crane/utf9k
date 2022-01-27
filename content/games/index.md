---
title: "Videogames"
slug: "games"
category: "games"
noproseclass: true
---

{{< gaming.inline >}}
{{ range $.Site.Data.games }}
  {{ $listName := .list }}
  <div id="game-list">
    {{ if eq $listName "Stalled but occasionally progress is made" }}<details><summary>{{ end }}
    <span>{{ $listName }}</span>
    {{ if eq $listName "Stalled but occasionally progress is made" }}</summary>{{ end }}
    <ul role="list">
      {{ range .games }}
      <li>
        <div>
          <img src="{{ if .cover }}{{ .cover }}{{ else }}https://via.placeholder.com/264x352{{ end }}">
          <a href="{{ .link }}" target="_blank" rel="noopener noreferer">
            <span>View details for {{ .title }}</span>
          </a>
        </div>
        <p>{{ .title }}</p>
        <p>{{ .platform }} {{ if .replay }}· Replay{{ end }}</p>
        {{ if .date_finished }}<p>Completed on {{ .date_finished }}</p>{{ end }}
      </li>
      {{ end }}
    </ul>
    {{ if eq $listName "Stalled but occasionally progress is made" }}</details>{{ end }}
  </div>
{{ end }}
{{< /gaming.inline >}}