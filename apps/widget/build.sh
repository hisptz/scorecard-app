#!/bin/bash

PKG_VERSION=`node -p "require('./package.json').version"`

echo "Cleaning..."
rm -r build
echo "Building widget version $PKG_VERSION"
react-scripts build
echo "Done!"

echo "Generating manifest..."
d2-manifest package.json build/manifest.webapp

BUNDLE_NAME="hisptz-scorecard-widget-$PKG_VERSION.zip"

rimraf $BUNDLE_NAME
cd build
bestzip $BUNDLE_NAME *

mkdir bundle

mv $BUNDLE_NAME ./bundle
cd ..


