// bump-sw-version.js
// Automatically updates service worker cache version with timestamp
// Run before deploy: node bump-sw-version.js

const fs = require('fs');
const path = require('path');

const SW_PATH = path.join(__dirname, 'sw.js');

try {
    let content = fs.readFileSync(SW_PATH, 'utf8');
    
    // Generate version based on timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const newVersion = `v${Date.now()}`;
    
    // Replace CACHE_VERSION value
    content = content.replace(
        /const CACHE_VERSION = ['"]v\d+['"]/,
        `const CACHE_VERSION = '${newVersion}'`
    );
    
    fs.writeFileSync(SW_PATH, content, 'utf8');
    console.log(`✅ Service worker cache version updated to: ${newVersion}`);
    console.log(`   Timestamp: ${timestamp}`);
} catch (error) {
    console.error('❌ Failed to update service worker version:', error.message);
    process.exit(1);
}
