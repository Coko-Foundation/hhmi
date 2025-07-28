#!/usr/bin/env bash

rm -rf $PLATFORM_APP_DIR/public/*
rsync -a $PLATFORM_APP_DIR/_build/ $PLATFORM_APP_DIR/public
cd $PLATFORM_APP_DIR/public
find -type f -exec sed -i -e 's!https://30779a260b80196a185294a3cb9a5745!'"$SERVER_URL"'!g' {} \;
cd js
rm -rf *.gz
