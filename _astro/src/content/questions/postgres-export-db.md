---
title: "How can I export a Postgres database?"
slug: "postgres-export-db"
description: "In which I remind myself how to export a Postgres database"
category: "questions"
tags:
  - "databases"
  - "postgres"
---

Using `pg_dump`, which ships with the `psql` executable, it's a pretty simple progress

```bash
pg_dump --dbname={{DBNAME}} --host={{HOST}} --port={{PORT}} --username={{USERNAME}} --password --format=c > {{NAME}}.dump
# The c in --format=c stands for custom
```
