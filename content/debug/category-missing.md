---
title: "Content that is missing an explicit category"
slug: "category-missing"
category: "debug"
maxwidth: true
---

These are pieces of content that are missing an explicitly defined category.

It isn't the end of the world since they'll inherit a category from their parent folder, but it's always nice to have consistency with post frontmatter.

{{< categorymissing.inline >}}
{{ $correct := 0 }}
{{ $incorrect := 0 }}
<table>
  <tr>
    <th>Title</th>
    <th>Location</th>
    <th>Category</th>
  </tr>
  {{ range .Site.Pages }}
    {{ if .File }}
      {{ $file := "" }}
      {{ with .File }}{{ $file = . }}{{ end }}
      {{ if (isset .Params "category") }}
        {{ $correct = (add $correct 1) }}
      {{ else }}
        {{ $incorrect = (add $incorrect 1) }}
      {{ end }}
      <tr class='{{ if (isset .Params "category") }}bg-green-200{{ else }}bg-red-200{{ end }}'>
        <td class="my-6 py-6">{{ .Title }}</td>
        <td>{{ $file.Path }}</td>
        <td><a href="/{{ .Params.category }}">/{{ .Params.category }}</td>
      </tr>
    {{ end }}
  {{ end }}
</table>
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{< /categorymissing.inline >}}