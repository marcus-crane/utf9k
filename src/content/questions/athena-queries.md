---
category: questions
description: It's like SQL but slightly wonkier
output: src/content/questions
publish: true
slug: athena-queries
tags:
  - athena
  - cheatsheet
  - sql
title: Athena Queries
---
## Querying for JSON embedded in fields

You can use `JSON_EXTRACT_SCALAR` to extract content out of a text field like so:

```sql
-- Extract regular nested JSON
SELECT
  JSON_EXTRACT_SCALAR(message, '$.blah.bleh') AS cool_field
FROM bluh

-- Extract JSON where fields are dot notated keys
-- Supposedly you can do '$."blah.bleh"' but this never worked for me
SELECT
  JSON_EXTRACT_SCALAR(message, '$["blah.bleh"]') AS cool_field
FROM bluh

-- Filter for only JSON deserialisable messages
SELECT
  message
FROM bluh
WHERE
  JSON_EXTRACT(message, '$') IS NOT NULL

-- Annotate the type of a message as a column
SELECT
  message,
  CASE
      WHEN JSON_EXTRACT(message, '$') IS NOT NULL THEN 'JSON'
      ELSE 'PLAIN_TEXT'
  END as message_type
FROM bluh
```