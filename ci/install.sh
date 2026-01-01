#!/usr/bin/env bash

set -euxo pipefail

TOPLEVEL=$(git rev-parse --show-toplevel)

echo "Installing CI tools"

pip install -U pip wheel &> /dev/null
pip install -r "$TOPLEVEL/scripts/requirements.txt"
echo "~ Python dependencies installed"