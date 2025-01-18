---
category: questions
description: In which I remind myself how to import a Postgres database
lastmod: 2021-06-24
slug: postgres-import-db
tags:
  - databases
  - postgres
title: How can I import a dumped database into Postgres?
---
Using `pg_restore`, it's almost the same process as `pg_dump` but in reverse

```bash
pg_restore --dbname={{DBNAME}} --host={{HOST}} --port={{PORT}} --username={{USERNAME}} --password --jobs 2 {{NAME}}.dump
```
