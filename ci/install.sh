#!/usr/bin/env bash

set -euxo pipefail

TOPLEVEL=$(git rev-parse --show-toplevel)

echo "Installing CI tools"

pip install -U pip wheel &> /dev/null
pip install -r "$TOPLEVEL/scripts/requirements.txt" &> /dev/null
echo "~ Python dependencies installed"

if ! command -v cue &> /dev/null; then
    go install cuelang.org/go/cmd/cue@latest &> /dev/null
fi
echo "~ Cue installed"