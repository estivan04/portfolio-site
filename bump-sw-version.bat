@echo off
REM bump-sw-version.bat
REM Automatically updates service worker cache version
REM Run: bump-sw-version.bat

setlocal enabledelayedexpansion

set "swFile=%~dp0sw.js"

REM Generate Unix timestamp using PowerShell
for /f %%i in ('powershell -NoProfile -Command "[DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()"') do set timestamp=%%i

set "newVersion=v%timestamp%"

REM Read current sw.js content
powershell -NoProfile -Command "(Get-Content '%swFile%' -Raw) -replace 'const CACHE_VERSION = [''`"]v\d+[''`"]', 'const CACHE_VERSION = ''%newVersion%''' | Set-Content '%swFile%' -NoNewline"

if %errorlevel% equ 0 (
    echo.
    echo [92m✅ Service worker cache version updated to: %newVersion%[0m
    echo [90m   Timestamp: %timestamp%[0m
    echo.
) else (
    echo.
    echo [91m❌ Failed to update service worker version[0m
    echo.
    exit /b 1
)
