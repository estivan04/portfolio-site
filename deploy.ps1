# deploy.ps1
# One-command deploy script for portfolio site with automatic SW versioning
# Usage: .\deploy.ps1 ["optional commit message"]

param(
    [string]$CommitMessage = "Update site and bump SW cache version"
)

Write-Host "`n🚀 Starting deployment process...`n" -ForegroundColor Cyan

# Step 1: Bump service worker version
Write-Host "1️⃣ Bumping service worker cache version..." -ForegroundColor Yellow
& "$PSScriptRoot\bump-sw-version.ps1"
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Failed to bump SW version. Aborting deployment." -ForegroundColor Red
    exit 1
}

# Step 2: Stage all changes
Write-Host "`n2️⃣ Staging changes..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git add failed." -ForegroundColor Red
    exit 1
}

# Step 3: Show what's being committed
Write-Host "`n📋 Files staged for commit:" -ForegroundColor Cyan
git status --short

# Step 4: Commit
Write-Host "`n3️⃣ Committing changes..." -ForegroundColor Yellow
git commit -m $CommitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No changes to commit or commit failed." -ForegroundColor Yellow
}

# Step 5: Push to main
Write-Host "`n4️⃣ Pushing to GitHub (main branch)..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Push failed. Check your Git credentials and network." -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Deployment complete! Cloudflare will auto-deploy." -ForegroundColor Green
Write-Host "`n📊 Next steps:" -ForegroundColor Cyan
Write-Host "   • Wait 1-2 minutes for Cloudflare build" -ForegroundColor Gray
Write-Host "   • Visit https://www.estivanayramia.com" -ForegroundColor Gray
Write-Host "   • Check DevTools > Application > Service Workers" -ForegroundColor Gray
Write-Host "   • Verify new cache version is active`n" -ForegroundColor Gray
