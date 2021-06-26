---
title: "Content that is missing an explicit category"
slug: "category-missing"
category: "debug"
maxwidth: true
---

These are pieces of content that are missing an explicitly defined category.

It isn't the end of the world since they'll inherit a category from their parent folder, but it's always nice to have consistency with post frontmatter.

{{< aliasedcontent.inline >}}
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
      {{ if not (isset .Params "category") }}
        <tr>
          <td class="my-6 py-6">{{ .Title }}</td>
          <td>{{ $file.Path }}</td>
          <td><a href="/{{ .Params.category }}">/{{ .Params.category }}</td>
        </tr>
      {{ end }}
    {{ end }}
  {{ end }}
</table>
{{< /aliasedcontent.inline >}}