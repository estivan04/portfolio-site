@echo off
REM deploy.bat
REM One-command deploy with automatic SW version bump
REM Usage: deploy.bat ["optional commit message"]

setlocal

set "commitMsg=%~1"
if "%commitMsg%"=="" set "commitMsg=Update site and bump SW cache version"

echo.
echo [96m🚀 Starting deployment process...[0m
echo.

REM Step 1: Bump SW version
echo [93m1️⃣ Bumping service worker cache version...[0m
call "%~dp0bump-sw-version.bat"
if %errorlevel% neq 0 (
    echo [91m❌ Failed to bump SW version. Aborting.[0m
    exit /b 1
)

REM Step 2: Stage changes
echo [93m2️⃣ Staging changes...[0m
git add .
if %errorlevel% neq 0 (
    echo [91m❌ Git add failed[0m
    exit /b 1
)

REM Step 3: Show status
echo.
echo [96m📋 Files staged for commit:[0m
git status --short
echo.

REM Step 4: Commit
echo [93m3️⃣ Committing changes...[0m
git commit -m "%commitMsg%"
if %errorlevel% neq 0 (
    echo [93m⚠️  No changes to commit[0m
)

REM Step 5: Push
echo.
echo [93m4️⃣ Pushing to GitHub (main branch)...[0m
git push origin main
if %errorlevel% neq 0 (
    echo [91m❌ Push failed[0m
    exit /b 1
)

echo.
echo [92m✅ Deployment complete! Cloudflare will auto-deploy.[0m
echo.
echo [96m📊 Next steps:[0m
echo [90m   • Wait 1-2 minutes for Cloudflare build[0m
echo [90m   • Visit https://www.estivanayramia.com[0m
echo [90m   • Verify new cache version in DevTools[0m
echo.
