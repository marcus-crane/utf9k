#!/usr/bin/env bash

set -euxo pipefail

TOPLEVEL=$(git rev-parse --show-toplevel)
SCRIPTS="$TOPLEVEL/scripts"

echo "Generating site metadata"

python "$SCRIPTS/gather-filesizes.py"
python "$SCRIPTS/gather-image-metadata.py"
python "$SCRIPTS/generate-fancylinks.py"
python "$SCRIPTS/sync-manga.py"