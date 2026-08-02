---
title: {{ .Title }}
{{- with .Description }}
description: {{ . }}
{{- end }}
---
{{- $showDates := .Params.showDates | default true }}
{{- $dateFormat := .Params.dateFormat | default "Jan 02" }}
{{- $all := where site.RegularPages "Section" .Section }}
{{- $groupBy := .Params.groupBy | default "date" }}
{{- $groups := slice }}
{{- if eq $groupBy "none" }}
  {{- $groups = slice (dict "name" "" "entries" $all.ByTitle) }}
{{- else if eq $groupBy "param" }}
  {{- $labels := .Params.groupLabels }}
  {{- range $all.GroupByParam .Params.groupByParam (.Params.groupByOrder | default "desc") }}
    {{- $key := printf "%v" .Key }}
    {{- $groups = $groups | append (dict "name" (index $labels $key | default .Key) "entries" .Pages) }}
  {{- end }}
{{- else }}
  {{- range $all.GroupByDate (.Params.groupByDateFormat | default "2006") }}
    {{- $groups = $groups | append (dict "name" .Key "entries" .Pages) }}
  {{- end }}
{{- end }}
{{- range $groups }}
{{- with .name }}
## {{ . }}
{{ end }}
{{- range .entries }}
{{- $p := . }}
{{- with (.OutputFormats.Get "markdown").RelPermalink }}
- {{ if $showDates }}{{ $p.Date.Format $dateFormat }} | {{ end }}[{{ $p.Title }}]({{ . }})
{{- end }}
{{- end }}
{{ end }}
