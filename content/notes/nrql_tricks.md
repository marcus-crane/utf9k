+++
title = "NRQL Tricks"
author = ["Marcus Crane"]
lastmod = 2020-06-14T12:33:21+12:00
slug = "nrql_tricks"
draft = false
+++

## See all event types {#see-all-event-types}

```nil
SHOW EVENT TYPES
```


## See all fields for an event type {#see-all-fields-for-an-event-type}

```nil
SELECT keyset() FROM Transaction
```
