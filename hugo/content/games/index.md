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
    <header>
      <h2>{{ $listName }}</h2>
    </header>
    <ul role="list">
      {{ range .games }}
      {{ $opts := dict
        "headers" (dict
          "User-Agent" "Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/536.14 (KHTML, like Gecko) Chrome/32.0.2008.86 Safari/536.14)"
        )
      }}
      {{ $image := resources.GetRemote .cover.url $opts }}
      {{ $image := $image.Resize "x360 q100" }}
      <li>
        <div>
          <!-- TODO: Properly strip quotes from alt tags -->
          <img
            alt='Box art for the game titled {{ .title }}'
            src="{{ if $image }}{{ $image.RelPermalink }}{{ else }}https://via.placeholder.com/264x352{{ end }}"
            width="{{ .cover.width }}px"
            height="{{ .cover.height }}px"
          >
          <figcaption style="display: none;">You can learn more by visiting <a target="_blank" href="{{ .link }}">Backloggd</a></figcaption>
          <a href="{{ .link }}" target="_blank" rel="noopener noreferer">
            <span>{{ .title }}</span>
          </a>
        </div>
        <!-- TODO: Restore finish date / platform / replay status -->
      </li>
      {{ end }}
    </ul>
  </div>
  <hr />
{{ end }}
{{< /gaming.inline >}}
