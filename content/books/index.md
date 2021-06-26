---
title: "Books"
slug: "books"
category: "books"
noproseclass: true
---

{{< library.inline >}}
{{ range $.Site.Data.books.library }}
  {{ $listName := .list }}
  <div id="book-list" class="pb-12">
    <div class="prose dark:prose-dark pb-2">
      <h4>{{ $listName }}</h4>
      <hr />
    </div>
    {{ range .books }}
    <article class="flex p-2 pl-0 space-x-4">
      <img class="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100" src="{{ .cover }}" width="72" height="72" />
      <div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <a class="noopener noreferer" href="{{ .link }}">
          <h2 class="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-black mb-0.5 truncate underline">
            {{ .title }}
          </h2>
        </a>
        <dl class="flex flex-wrap text-sm font-medium">
          {{ if ne $listName "Currently Reading" }}
          <div>
            <dt class="sr-only">Date finished</dt>
            <dd>{{ .date_finished }}</dd>
          </div>
          <div>
            <dt class="sr-only">Rating</dt>
            <dd class="pl-1"> · {{ .rating }} stars</dd>
          </div>
          {{ end }}
          <div class="flex-none w-full mt-0.5 font-normal">
            <dt class="inline">By</dt>
            <dd class="inline text-black">{{ .author }}</dd>
          </div>
          {{ if eq $listName "Currently Reading" }}
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
{{< /library.inline >}}