---
title: "Books"
slug: "books"
category: "books"
description: "Find out what books I have been reading lately"
noproseclass: true
tags:
- "me"
- "trackers"
---

{{< books.inline >}}
{{ range $.Site.Data.books }}
  {{ $listName := .list }}
  {{ $goalProgress := 0 }}
  {{ range .books }}{{ if eq .progress 100 }}{{ $goalProgress = (add $goalProgress 1) }}{{ end }}{{ end }}
  <div class="grid-list">
    <div>
      <h2>{{ $listName }}</h2>
      {{ if .goal }}
        <span>Yearly goal: {{ $goalProgress }} / {{ .goal }} books completed ({{ div (mul $goalProgress 100) .goal }}%)</span>
      {{ end }}
    </div>
    <ul {{ if eq $listName 2022 }}class="almost-full-list"{{ end }} role="list">
    {{ range .books }}
    <li>
      <div>
        <img src="{{ .cover }}">
        <a href="{{ .link }}" target="_blank" rel="noopener noreferer">
          <span>{{ .title }}</span>
        </a>
      </div>
      <dl>
        {{ if eq .progress 100 }}
        <div>
          <dd>Finished: {{ .date_finished }}</dd>
          <dd>Rating: {{ range seq .rating  }}★{{ end }}</dd>
        </div>
        {{ end }}
        {{ if ne .progress 100 }}
          <p>{{ .progress }}% read</p>
        {{ end }}
      </dl>
    </li>
    {{ end }}
    </ul>
  </div>
{{ end }}
{{< /books.inline >}}