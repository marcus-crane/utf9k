---
title: "How can I import a dumped database into Postgres?"
slug: "postgres-import-db"
description: "In which I remind myself how to import a Postgres database"
category: "questions"
tags:
  - "databases"
  - "postgres"
---

Using `pg_restore`, it's almost the same process as `pg_dump` but in reverse

```bash
pg_restore --dbname={{DBNAME}} --host={{HOST}} --port={{PORT}} --username={{USERNAME}} --password --jobs 2 {{NAME}}.dump
```
