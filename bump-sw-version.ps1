# bump-sw-version.ps1
# Automatically updates service worker cache version with timestamp
# Run before deploy: .\bump-sw-version.ps1

$swPath = Join-Path $PSScriptRoot "sw.js"

try {
    $content = Get-Content $swPath -Raw
    
    # Generate version based on Unix timestamp
    $timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    $newVersion = "v$timestamp"
    
    # Replace CACHE_VERSION value
    $content = $content -replace "const CACHE_VERSION = ['`"]v\d+['`"]", "const CACHE_VERSION = '$newVersion'"
    
    Set-Content -Path $swPath -Value $content -NoNewline
    
    Write-Host "✅ Service worker cache version updated to: $newVersion" -ForegroundColor Green
    $readableTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "   Timestamp: $readableTime" -ForegroundColor Gray
} catch {
    Write-Host "❌ Failed to update service worker version: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
