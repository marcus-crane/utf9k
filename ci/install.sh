#!/usr/bin/env bash

set -e

TOPLEVEL=$(git rev-parse --show-toplevel)

echo "Installing CI tools"

if [[ ! command -v pnpm]]; then
    npm install -g pnpm
fi
echo "~ pnpm installed"

pip install -U pip wheel
pip install -r "$TOPLEVEL/scripts/requirements.txt"
echo "~ Python dependencies installed"

if [[ ! command -v cue ]]; then
    go install cuelang.org/go/cmd/cue@latest
fi
echo "~ Cue installed"