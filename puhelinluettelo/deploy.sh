#!/bin/sh

npm run build
rm -rf ../../fullstack-3/build
cp -r build/ ../../fullstack-3/

