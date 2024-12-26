#!/usr/bin/env bash

set -euxo pipefail

deno task build:deps
# deno task build:metadata
deno task build