---
category: questions
description: In which I remind myself how to import a Postgres database
lastmod: 2021-06-24
lastrev: 2025-04-23
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

You can use `-j` to parallelize restoration ie; `pg_dump -j 4`[^1].

[^1]: https://www.postgresql.org/docs/current/backup-dump.html#BACKUP-DUMP-LARGE