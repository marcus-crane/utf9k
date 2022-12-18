#!/usr/bin/env bash

set -euxo pipefail

npm run build:deps
pnpm run test
pnpm run build:metadata
pnpm run build
pnpm run prettify