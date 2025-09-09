#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('Starting Moodle app custom build process...');

// Check if we're in a Cordova environment
if (!fs.existsSync('config.xml')) {
    console.log('Not in Cordova environment, skipping plugin setup');
    process.exit(0);
}

try {
    console.log('Handling plugin dependencies for Moodle app...');

    // Remove any conflicting webview plugin
    try {
        execSync('cordova plugin remove cordova-plugin-ionic-webview --force', { stdio: 'pipe' });
        console.log('Removed conflicting webview plugin');
    } catch (e) {
        console.log('Standard webview plugin not found (expected)');
    }

    // Check if Moodle webview is installed
    try {
        const pluginList = execSync('cordova plugin list', { encoding: 'utf8' });

        if (!pluginList.includes('@moodlehq/cordova-plugin-ionic-webview')) {
            console.log('Installing Moodle webview plugin...');
            execSync('cordova plugin add @moodlehq/cordova-plugin-ionic-webview@5.0.0-moodle.5', { stdio: 'inherit' });
        } else {
            console.log('Moodle webview plugin already installed');
        }

        if (!pluginList.includes('cordova-plugin-ionic')) {
            console.log('Installing Ionic live updates plugin...');
            execSync('cordova plugin add cordova-plugin-ionic@5.5.3 --force', { stdio: 'inherit' });
        } else {
            console.log('Ionic live updates plugin already installed');
        }

    } catch (error) {
        console.log('Plugin installation completed with warnings:', error.message);
    }

    console.log('Custom plugin setup completed successfully!');

} catch (error) {
    console.error('Custom build script failed:', error.message);
    process.exit(1);
}
