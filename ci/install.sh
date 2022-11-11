#!/usr/bin/env bash

set -e

TOPLEVEL=$(git rev-parse --show-toplevel)

echo "Installing CI tools"

npm install -g pnpm
echo "~ pnpm installed"

pip install -U pip wheel
pip install -r "$TOPLEVEL/scripts/requirements.txt"
echo "~ Python dependencies installed"

go install cuelang.org/go/cmd/cue@latest
echo "~ Cue installed"