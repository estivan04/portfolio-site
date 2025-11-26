# Automated Service Worker Cache Versioning

## Overview
The service worker cache version is now automatically updated on every deploy using a timestamp-based version number. This ensures users always get the latest code without manual version bumps.

## How It Works

1. **Automatic Version Bump**: Before each deploy, `bump-sw-version.bat` updates the cache version in `sw.js` to a Unix timestamp (e.g., `v1764114323376`).

2. **Deploy Workflow**: The `deploy.bat` command:
   - Runs `bump-sw-version.bat` to update cache version
   - Stages all changes (`git add .`)
   - Commits with custom or default message
   - Pushes to `main` (triggers Cloudflare auto-deploy)

## Usage

### Quick Deploy (Recommended)
```batch
.\deploy.bat
```
This handles everything: bump version, stage, commit, and push.

### Deploy with Custom Message
```batch
.\deploy.bat "Add new feature and fix bug"
```

### Manual Deploy
```batch
# 1. Bump version
.\bump-sw-version.bat

# 2. Stage all changes
git add .

# 3. Commit
git commit -m "Your commit message"

# 4. Push
git push origin main
```

### Just Bump Version (No Deploy)
```batch
.\bump-sw-version.bat
```

## Files

- **bump-sw-version.bat**: Windows batch script that updates `CACHE_VERSION` in `sw.js`
- **deploy.bat**: One-command deployment script (bump + commit + push)
- **bump-sw-version.ps1**: PowerShell alternative (requires execution policy change)
- **bump-sw-version.js**: Node.js alternative (requires Node.js installed)
- **package.json**: Optional NPM scripts if you prefer Node workflow
- **sw.js**: Service worker with versioned cache

## How It Updates Users

When you deploy with a new cache version:

1. **Next Page Load**: 
   - Service worker detects update
   - Sends `SKIP_WAITING` message
   - New SW activates immediately
   - Old cache (`portfolio-v2`) is deleted
   - New cache (`portfolio-v1732550400123`) is created

2. **User Experience**:
   - Page reloads automatically (via `controllerchange` event)
   - Fresh HTML, CSS, JS loaded from network
   - Assets cached with new version
   - Seamless transition (< 1 second)

## Cache Strategy

- **HTML**: Network-first (always tries fresh, falls back to cache)
- **Assets**: Stale-while-revalidate (instant load, updates in background)
- **Offline**: Falls back to cached content or 404.html

## Cloudflare Integration

No changes needed in Cloudflare Pages settings. The platform:
- Detects `git push` to `main`
- Runs build (optional)
- Deploys static files
- Serves updated `sw.js` with new version

The `_headers` file ensures `sw.js` is never cached by the CDN:
```
/sw.js
  Cache-Control: no-cache
```

## Troubleshooting

### Version Not Updating
- Check that `bump-sw-version.bat` ran successfully
- Look for "✅ Service worker cache version updated" in terminal
- Verify `sw.js` has new version number (line 2)

### Users Stuck on Old Version
- Hard reload: Ctrl+Shift+R
- DevTools → Application → Service Workers → Unregister → Reload
- Clear site data: Application → Clear storage → Clear site data

### Deploy Failed
- Ensure Git is installed: `git --version`
- Run `.\bump-sw-version.bat` manually to test
- Check git status: `git status`
- Verify you're on main branch: `git branch`

### PowerShell Script Blocked
If you prefer `.ps1` files, enable execution:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Then use `.\bump-sw-version.ps1` and `.\deploy.ps1` instead.

## Manual Override

To use a specific version instead of timestamp:

1. Open `sw.js`
2. Change line 2:
   ```javascript
   const CACHE_VERSION = 'v3'; // Your custom version
   ```
3. Commit and push normally

The automated script will continue from your custom version on next `npm run deploy`.

---

**Last Updated**: November 2025
**Automation**: Enabled
**Cache Strategy**: Network-first (HTML), Stale-while-revalidate (Assets)
