# How can I export a Postgres database?
01 January 0001

Using `pg_dump`, which ships with the `psql` executable, it&#39;s a pretty simple progress

```bash
pg_dump --dbname={{DBNAME}} --host={{HOST}} --port={{PORT}} --username={{USERNAME}} --password --format=c &gt; {{NAME}}.dump
# The c in --format=c stands for custom
```