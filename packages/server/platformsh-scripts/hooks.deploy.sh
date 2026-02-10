#!/usr/bin/env bash

set -e
cd $PLATFORM_APP_DIR

# No-op: if needed, run one-off tasks (e.g. migrations). Do not start the server;
# the web start command runs coko-server start. Migrations run on server startup.
