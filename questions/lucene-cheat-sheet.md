---
category: questions
description: How does that query go again?
slug: lucene-cheat-sheet
tags:
  - cheatsheet
  - kibana
  - lucene
  - opensearch
  - reference
title: Lucene Cheat Sheet
---
[Apache Lucene](https://lucene.apache.org/) is a search library used by the popular [Kibana](https://www.elastic.co/kibana) and [OpenSearch Dashboards](https://opensearch.org/docs/latest/dashboards/) projects.

<!-- TODO: Created for Flock Social Browser? https://medium.com/chris-messina/the-road-to-arc-2-0-8d5928ac2736 -->

While both projects have their own DSLs for searching[^1], they also support Lucene as a fallback.

There are often useful dashboard queries that can only be performed by dropping down to Lucene.

## Checking if a field doesn't exist

```
SYNTAX:  !_exists_:<field>
EXAMPLE: !_exists_:http.status
NOTES:   Only matches if a key doesn't exist. Will not find fields that are empty or set to nil values.
```

## Checking if a field does exist

```
SYNTAX:  _exists_:<field>
EXAMPLE: _exists_:http.header.user_agent
NOTES:   Empty or nil values will still match. Only matches if a key is missing entirely.
```

## Finding text "similar" to existing fields (ie; levenshtein distance)

```
SYNTAX:  <query>~
EXAMPLE: awetome~
NOTES:   This example would find documents containing "awesome" and other variations.
```

[^1]: [Kibana Query Language (KQL)](https://www.elastic.co/guide/en/kibana/current/kuery-query.html) for Kibana and [Dashboards Query Language (DQL)](https://opensearch.org/docs/latest/dashboards/dql/) for Opensearch Dashboards
