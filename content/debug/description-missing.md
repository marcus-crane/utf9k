---
title: "Content that is missing an explicit description"
slug: "description-missing"
category: "debug"
maxwidth: true
---

These are pieces of content that are missing a description, which is handy for link previews and general SEO.

{{< descriptionmissing.inline >}}
{{ $correct := 0 }}
{{ $incorrect := 0 }}
<table>
  <tr>
    <th>Title</th>
    <th>Location</th>
  </tr>
  {{ range .Site.Pages }}
    {{ if .File }}
      {{ $file := "" }}
      {{ with .File }}{{ $file = . }}{{ end }}
      {{ if (isset .Params "description") }}
        {{ $correct = (add $correct 1) }}
      {{ else }}
        {{ $incorrect = (add $incorrect 1) }}
      {{ end }}
      <tr class='{{ if (isset .Params "description") }}bg-green-200{{ else }}bg-red-200{{ end }}'>
        <td class="my-6 py-6">{{ .Title }}</td>
        <td>{{ $file.Path }}</td>
      </tr>
    {{ end }}
  {{ end }}
</table>
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{< /descriptionmissing.inline >}}