---
{{- with .Description }}description: {{ . }}{{- end }}
title: {{ .Title }}
---
{{ $pages := where site.RegularPages "Section" .Section -}}
{{ range $pages.GroupByDate "2006" -}}
## {{ .Key }}
{{ range .Pages -}}
- {{ .Date.Format "Jan 02" }} | [{{ .Title }}]({{ .Permalink }}index.md)
{{ end }}
{{ end }}