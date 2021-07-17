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
    <div class="prose dark:prose-dark pb-2">
      <h4>{{ $listName }}</h4>
    </div>
    {{ range .games }}
    <article class="flex p-2 pl-0 space-x-4">
      <img class="flex-none w-36 rounded-lg object-cover bg-gray-100" src="{{ .cover }}" width="144" height="192" />
      <div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <a class="noopener noreferer" href="{{ .link }}">
          <h2 class="text-base sm:text-lg lg:text-base xl:text-lg font-semibold mb-0.5 truncate underline">
            {{ .title }}
          </h2>
        </a>
        <dl class="flex flex-wrap text-sm font-medium">
          <div class="flex-none w-full mt-0.5 font-normal">
            <dd class="inline">{{ .platform }}</dd>
          </div>
          {{ if .date_finished }}
          <div class="mt-0.5 font-normal">
            <div>
              <dd class="inline">Completed {{ .date_finished }}</dd>
            </div>
          </div>
          {{ end }}
          {{ if .replay }}
          <div class="mt-0.5 font-normal bg-blue-200 dark:bg-blue-800 p-2 rounded-md">
            <dd class="inline">Replay</dd>
          </div>
          {{ end }}
        </dl>
      </div>
    </article>
    {{ end }}
  </div>
{{ end }}
{{< /gaming.inline >}}