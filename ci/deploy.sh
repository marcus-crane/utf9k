#!/usr/bin/env bash

set -euxo pipefail

./ci/install.sh
./ci/genmetadata.sh
bun run build
