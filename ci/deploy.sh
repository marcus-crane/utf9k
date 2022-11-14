#!/usr/bin/env bash

set -e

npm run build:deps
pnpm run test
pnpm run build:metadata
pnpm run build
pnpm run prettify