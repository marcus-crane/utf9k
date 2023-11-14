# How can I import a dumped database into Postgres?
01 January 0001

Using `pg_restore`, it&#39;s almost the same process as `pg_dump` but in reverse

```bash
pg_restore --dbname={{DBNAME}} --host={{HOST}} --port={{PORT}} --username={{USERNAME}} --password --jobs 2 {{NAME}}.dump
```
