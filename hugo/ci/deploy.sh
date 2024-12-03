#!/usr/bin/env bash

set -euxo pipefail

# bun run build:deps
# bun run test
# bun run build:metadata
bun run build
bun run prettify