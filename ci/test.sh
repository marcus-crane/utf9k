#!/usr/bin/env bash

set -e

echo "Cue Validation"

export PATH="$(go env GOPATH)/bin:$PATH"

cue vet data/books.yml validation/books.cue
echo "~ All book entries are semantically valid"

cue vet data/gags.yml validation/gags.cue
echo "~ All gag lines are semantically valid"

cue vet data/games.yml validation/games.cue
echo "~ All game entries are semantically valid"