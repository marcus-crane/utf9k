#!/usr/bin/env bash

set -euxo pipefail

bun run build:deps
bun run build:metadata
bun run build