#!/usr/bin/env bash

set -euxo pipefail

npm run build:deps
yarn run test
yarn run build:metadata
yarn run build
yarn run prettify

mv _headers public
mv _redirects public