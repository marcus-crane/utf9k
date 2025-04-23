---
category: questions
description: In which I remind myself how to export a Postgres database
lastmod: 2021-06-24
lastrev: 2025-04-23
slug: postgres-export-db
tags:
  - databases
  - postgres
title: How can I export a Postgres database?
---
Using `pg_dump`, which ships with the `psql` executable, it's a pretty simple progress

```bash
pg_dump --dbname={{DBNAME}} --host={{HOST}} --port={{PORT}} --username={{USERNAME}} --password --format=c > {{NAME}}.dump
# The c in --format=c stands for custom
```

If you're dumping to a directory archive format[^1], you can use `-j` to parallelize this operation ie; `pg_dump -j 4`.

[^1]: https://www.postgresql.org/docs/current/backup-dump.html#BACKUP-DUMP-LARGE