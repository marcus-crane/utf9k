---
title: "Videogames"
slug: "games"
category: "games"
noproseclass: true
---

{{< gaming.inline >}}
{{ range $.Site.Data.games }}
  {{ $listName := .list }}
  <div id="game-list" class="pb-12">
    <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">{{ $listName }}</h2>
    <ul role="list" class="grid grid-cols-2 pt-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 xl:grid-cols-6 xl:gap-x-8">
      {{ range .games }}
      <li class="relative">
        <div class="group block aspect-w-3 aspect-h-4 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
          <img src="{{ .cover }}" alt="" class="object-cover pointer-events-none w-full group-hover:opacity-75">
          <a href="{{ .link }}" target="_blank" rel="noopener noreferer" class="absolute inset-0 focus:outline-none">
            <span class="sr-only">View details for {{ .title }}</span>
          </a>
        </div>
        <p class="mt-2 block text-sm font-medium text-gray-900 pointer-events-none">{{ .title }}</p>
        <p class="block text-sm font-medium text-gray-500 pointer-events-none">{{ .platform }} {{ if .replay }}· Replay{{ end }}</p>
        {{ if .date_finished }}<p class="block text-sm font-medium text-gray-500 pointer-events-none">Completed on {{ .date_finished }}</p>{{ end }}
      </li>
      {{ end }}
    </ul>
  </div>
{{ end }}
{{< /gaming.inline >}}