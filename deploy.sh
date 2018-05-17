#!/bin/sh
npm run build
rm -rf ../backend/build
cp -r build ../backend/
