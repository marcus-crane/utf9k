#!/usr/bin/env bash

set -e

TOPLEVEL=$(git rev-parse --show-toplevel)

echo "Installing CI tools"

npm install -g pnpm
echo "~ pnpm installed"

pip install -U pip
pip install -r "$TOPLEVEL/scripts/requirements.txt"
echo "~ Python dependencies installed"

go install cuelang.org/go/cmd/cue@latest
echo "~ Cue installed"

export PATH="$(go env GOPATH)/bin:$PATH"
export PATH="$(go env GOTOOLDIR):$PATH"
echo "~ Add GOTOOLDIR to PATH"

echo "$(which cue)"