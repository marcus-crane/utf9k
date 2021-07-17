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
    <div class="prose dark:prose-dark pb-2">
      <h4>{{ $listName }}</h4>
      {{ if .goal }}
        <span>Yearly goal: {{ $goalProgress }} / {{ .goal }} books completed ({{ div (mul $goalProgress 100) .goal }}%)</span>
      {{ end }}
    </div>
    {{ range .books }}
    <article class="flex p-2 pl-0 space-x-4">
      <img class="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100" src="{{ .cover }}" width="72" height="{{ .height }}" />
      <div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <a class="noopener noreferer" href="{{ .link }}">
          <h2 class="text-base sm:text-lg lg:text-base xl:text-lg font-semibold mb-0.5 truncate underline">
            {{ .title }}
          </h2>
        </a>
        <dl class="flex flex-wrap text-sm font-medium">
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
          <div class="flex-none w-full mt-0.5 font-normal">
            <dt class="inline">By</dt>
            <dd class="inline">{{ .author }}</dd>
          </div>
          {{ if ne .progress 100 }}
          <div class="flex-none w-1/2 md:w-1/6 xl:w-1/6 mt-0.5 font-normal">
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
      </div>
    </article>
    {{ end }}
  </div>
{{ end }}
{{< /books.inline >}}