#!/usr/bin/env bash

set -euxo pipefail

# Sometimes I create subfolders with SSGs I'm trying out but I don't want to
# use stale data so I just point this at the top level scripts instead
TOPLEVEL=$(git rev-parse --show-toplevel)
SCRIPTS="$TOPLEVEL/scripts"

echo "Generating site metadata"

python "$SCRIPTS/gather-filesizes.py"
# python "$SCRIPTS/gather-image-metadata.py" TODO: Fix
python "$SCRIPTS/sync-manga.py"
python "$SCRIPTS/sync-games.py"
