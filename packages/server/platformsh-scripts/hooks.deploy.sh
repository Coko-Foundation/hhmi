#!/usr/bin/env bash

set -e
cd /tmp
cp -rf /app . && cd app &&  node ./scripts/migrations.js
cd .. && rm -rf app
cd $PLATFORM_APP_DIR
bash yarn coko-server start
