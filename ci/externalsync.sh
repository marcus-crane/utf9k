#!/usr/bin/env bash

set -euxo pipefail

TOPLEVEL=$(git rev-parse --show-toplevel)
SCRIPTS="$TOPLEVEL/scripts"

echo "Pulling content from external sites"

python "$SCRIPTS/sync-manga.py"
python "$SCRIPTS/sync-games.py"

if [[ $(git status --porcelain) ]]; then
    git add .
    git commit -m "External changes have been synced"
fi

echo "Finished checking for external changes"