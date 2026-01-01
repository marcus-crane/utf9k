---
{{- with .Description }}description: {{ . }}{{- end }}
title: {{ .Title }}
---
{{ $pages := where site.RegularPages "Section" .Section -}}
{{ range $pages.GroupByParam "ongoing" "desc" -}}
## {{ if .Key }}Ongoing{{ else }}Archived{{ end }}
{{ range .Pages -}}
- {{ .Date.Format "Jan 02" }} | [{{ .Title }}]({{ .Permalink }}index.md)
{{ end }}
{{ end }}