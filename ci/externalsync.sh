#!/usr/bin/env bash

set -euxo pipefail

TOPLEVEL=$(git rev-parse --show-toplevel)
SCRIPTS="$TOPLEVEL/scripts"

echo "Pulling content from external sites"

# I might want to sync without committing current stuff
# Also, I'm bound to forget to stash before running this
git stash

python "$SCRIPTS/sync-manga.py"
python "$SCRIPTS/sync-games.py"

if [[ $(git status --porcelain) ]]; then
    git add .
    git commit -m "External changes have been synced"
fi

git stash pop

echo "Finished checking for external changes"