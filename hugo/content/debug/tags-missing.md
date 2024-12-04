---
title: "Content that is missing tags"
slug: "tags-missing"
category: "debug"
maxwidth: true
description: "This page lists all site content and whether they have tags defined"
tags:
- "debug"
- "hugo"
- "meta"
---

These are pieces of content that are missing tags.

{{< tagsmissing.inline >}}
{{ $correct := 0 }}
{{ $incorrect := 0 }}
<table>
  <tr>
    <th>Title</th>
    <th>Location</th>
    <th>Tags</th>
  </tr>
  {{ range .Site.Pages }}
    {{ if .File }}
      {{ $file := "" }}
      {{ with .File }}{{ $file = . }}{{ end }}
      {{ if (isset .Params "tags") }}
        {{ $correct = (add $correct 1) }}
      {{ else }}
        {{ $incorrect = (add $incorrect 1) }}
      {{ end }}
      <tr style="background-color: {{ if (isset .Params "tags") }}lightgreen{{ else }}lightpink{{ end }}">
        <td>{{ .Title }}</td>
        <td><a href="{{ .RelPermalink }}">{{ .RelPermalink }}</a></td>
        <td>
          <ul>
          {{ range .Params.tags }}
            <li><a href="{{ . }}">{{ . }}</a></li>
          {{ end }}
          </ul>
        </td>
      </tr>
    {{ end }}
  {{ end }}
</table>
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{< /tagsmissing.inline >}}