---
title: "Books"
slug: "books"
category: "books"
noproseclass: true
---

{{< books.inline >}}
{{ range $.Site.Data.books }}
  {{ $listName := .list }}
  {{ $goalProgress := 0 }}
  {{ range .books }}{{ if eq .progress 100 }}{{ $goalProgress = (add $goalProgress 1) }}{{ end }}{{ end }}
  <div id="book-list">
    <div>
      <h2>{{ $listName }}</h2>
      {{ if .goal }}
        <span>Yearly goal: {{ $goalProgress }} / {{ .goal }} books completed ({{ div (mul $goalProgress 100) .goal }}%)</span>
      {{ end }}
    </div>
    <ul role="list">
    {{ range .books }}
    <li>
      <div>
        <img src="{{ .cover }}">
        <a href="{{ .link }}" target="_blank" rel="noopener noreferer">
          <span>View details for {{ .title }}</span>
        </a>
      </div>
      <dl>
        {{ if eq .progress 100 }}
        <div>
          <dt>Date finished</dt>
          <dd>{{ .date_finished }}</dd>
        </div>
        <div>
          <dt>Rating</dt>
          <dd> · {{ range seq .rating  }}★{{ end }}</dd>
        </div>
        {{ end }}
        {{ if ne .progress 100 }}
        <div>
          <div>
            <div>
              <div style="width:{{ .progress }}%">{{ if ge .progress 35 }}{{ .progress }}% read{{ end }}</div>
              {{ if le .progress 35 }}
              <div style="width: {{ sub 100 .progress }}%">{{ .progress }}% read</div>
              {{ end }}
            </div>
          </div>
        </div>
        {{ end }}
        </dl>
      </li>
      {{ end }}
    </ul>
  </div>
{{ end }}
{{< /books.inline >}}