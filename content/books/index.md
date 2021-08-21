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
  <div id="book-list" class="pb-12">
    <div class="pb-2">
      <h2 class="text-black text-medium font-medium uppercase tracking-wide">{{ $listName }}</h2>
      {{ if .goal }}
        <span class="text-gray-500 text-xs font-medium uppercase tracking-wide">Yearly goal: {{ $goalProgress }} / {{ .goal }} books completed ({{ div (mul $goalProgress 100) .goal }}%)</span>
      {{ end }}
    </div>
    <ul role="list" class="grid grid-cols-2 pt-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 xl:grid-cols-6 xl:gap-x-8">
    {{ range .books }}
    <li class="relative">
      <div class="group block rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
        <img src="{{ .cover }}" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
        <a href="{{ .link }}" target="_blank" rel="noopener noreferer" class="absolute inset-0 focus:outline-none">
          <span class="sr-only">View details for {{ .title }}</span>
        </a>
      </div>
      <dl class="flex flex-wrap text-sm font-medium pt-2">
        {{ if eq .progress 100 }}
        <div>
          <dt class="sr-only">Date finished</dt>
          <dd>{{ .date_finished }}</dd>
        </div>
        <div>
          <dt class="sr-only">Rating</dt>
          <dd class="pl-1"> · {{ range seq .rating  }}★{{ end }}</dd>
        </div>
        {{ end }}
        {{ if ne .progress 100 }}
        <div class="flex-none w-full mt-0.5 font-normal">
          <div class="relative pt-1">
            <div class="overflow-hidden h-6 mb-4 text-xs flex rounded bg-purple-200">
              <div style="width:{{ .progress }}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white dark:text-gray-300 justify-center bg-purple-500">{{ if ge .progress 35 }}{{ .progress }}% read{{ end }}</div>
              {{ if le .progress 35 }}
              <div style="width: {{ sub 100 .progress }}%" class="text-gray-700 flex flex-col text-left pl-2 whitespace-nowrap justify-center">{{ .progress }}% read</div>
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