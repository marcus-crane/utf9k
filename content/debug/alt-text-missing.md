---
title: "Images that are missing alt text"
slug: "alt-text-missing"
category: "debug"
maxwidth: true
---

These are pieces of content that are missing an explicitly defined category.

It isn't the end of the world since they'll inherit a category from their parent folder, but it's always nice to have consistency with post frontmatter.

{{< alttextmissing.inline >}}
{{ $correct := 0 }}
{{ $incorrect := 0 }}
<table>
  <tr>
    <th>Title</th>
    <th>Slug</th>
    <th>Image path</th>
    <th>Alt text</th>
  </tr>
  {{ range $.Site.Data.imagemetadata }}
    {{ if .alt_text_present }}
      {{ $correct = (add $correct 1) }}
    {{ else }}
      {{ $incorrect = (add $incorrect 1) }}
    {{ end }}
  <tr class='{{ if .alt_text_present }}bg-green-200{{ else }}bg-red-200{{ end }}'>
    <td>{{ .title }}</td>
    <td><a href="{{ .post_path }}">{{ .slug }}</a></td>
    <td><a href="{{ .image_path }}">{{ .image_name }}</a></td>
    <td>{{ .alt_text }}</td>
  </tr>
  {{ end }}
</table>
Remaining items to be fixed: {{ $incorrect }} / {{ add $incorrect $correct }}
{{< /alttextmissing.inline >}}