---
title: "Images that are missing alt text"
slug: "alt-text-missing"
category: "debug"
maxwidth: true
---

This table contains all of the images on this website and reflects whether or not they have defined proper alt text for those who use a screen reader or even just fans of text-only RSS readers.

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