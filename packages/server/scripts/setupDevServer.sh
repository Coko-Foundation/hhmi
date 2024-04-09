#!/bin/sh
set -x
# This is run through docker. Its CWD will be the root folder.
node ./scripts/migrations.js
node ./scripts/seedGlobalTeams.js
node ./scripts/ensureTempFolderExists.js
node ./scripts/seedAdmin0.js

exec "$@"
