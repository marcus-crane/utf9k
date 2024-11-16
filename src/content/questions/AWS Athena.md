---
category: questions
description: It's like SQL but slightly wonkier
output: src/content/questions
publish: true
slug: aws-athena
tags:
  - athena
  - sql
  - amazon
  - aws
  - loadbalancer
  - logging
title: AWS Athena
aliases:
  - /questions/athena-queries
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

## Logs return empty results when the query is correct

Recently, I was querying for some ALB load balancer logs. It's not something that happens too often but I was surprised to find that the query rows were empty except for the `date` column.

I quickly figured out that only logs from May 30th, 2024 and onwards were missing and after a quick comparison, realised that the log formats had changed.

Sure enough, [as noted in a banner on this page](https://docs.aws.amazon.com/athena/latest/ug/create-alb-access-logs-table.html), the ALB access log format changed adding `classification`, `classification_reason` and `conn_trace_id` fields.

Unfortunately for anyone with [AWS Athena](https://aws.amazon.com/athena/) tables, that means your pre-existing tables will likely have an out of date regex if you're using `org.apache.hadoop.hive.serde2.RegexSerDe` as your row format.

I don't believe there is any way to update this and it requires recreating each table given that Athena [doesn't support](https://docs.aws.amazon.com/athena/latest/ug/unsupported-ddl.html) altering `SERDEPROPERTIES`.

Honestly, I found this whole thing kind of disappointing and I'm not sure what prevents it from happening again in future but as mentioned, I don't personally use Athena too often to feel the pain.