#!/usr/bin/env bash

set -euxo pipefail

bun run build:deps
bun run build:metadata
bun run build
bun run prettify

mv _headers public
mv _redirects public