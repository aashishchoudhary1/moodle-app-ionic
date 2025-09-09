#!/bin/bash

echo "Starting custom build process for Moodle app..."

# Remove any existing conflicting plugins
cordova plugin remove cordova-plugin-ionic-webview --force || true

# Install Moodle webview first
cordova plugin add @moodlehq/cordova-plugin-ionic-webview@5.0.0-moodle.5

# Install ionic plugin without dependencies
cordova plugin add cordova-plugin-ionic@5.4.7 --force --fetch

echo "Custom plugin installation complete"
