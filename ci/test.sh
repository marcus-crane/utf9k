#!/usr/bin/env bash
set -e

echo "Cue Validation"

cue vet data/books.yml validation/books.cue
echo "~ All book entries are semantically valid"

cue vet data/gags.yml validation/gags.cue
echo "~ All gag lines are semantically valid"
