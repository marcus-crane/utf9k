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
      <tr style="background-color: {{ if (isset .Params "description") }}lightgreen{{ else }}lightgreen{{ end }}">
        <td>{{ .Title }}</td>
        <td>{{ $file.Path }}</td>
      </tr>
    {{ end }}
  {{ end }}
</table>
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{< /descriptionmissing.inline >}}