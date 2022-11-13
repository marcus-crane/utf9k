#!/usr/bin/env bash

set -e

TOPLEVEL=$(git rev-parse --show-toplevel)

echo "Installing CI tools"

if ! command -v pnpm &> /dev/null; then
    npm install -g pnpm &> /dev/null
fi
echo "~ pnpm installed"

pip install -U pip wheel &> /dev/null
pip install -r "$TOPLEVEL/scripts/requirements.txt" &> /dev/null
echo "~ Python dependencies installed"

if ! command -v cue &> /dev/null; then
    go install cuelang.org/go/cmd/cue@latest &> /dev/null
fi
echo "~ Cue installed"