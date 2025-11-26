# Fix chat widget structure in all HTML files
$files = @(
    "about.html",
    "projects.html",
    "overview.html",
    "deep-dive.html",
    "contact.html",
    "case-studies.html",
    "privacy.html",
    "404.html",
    "es\index.html",
    "ar\index.html"
)

$oldPattern1 = '    <div id="chat-widget" class="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans transition-opacity duration-300" style="z-index: 9999;">
        <div id="chat-window" class="hidden w-80 h-[500px] bg-[#e1d4c2]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#362017]/10 overflow-hidden mb-4 flex flex-col origin-bottom-right">'

$newPattern1 = '    <div id="chat-widget" class="fixed bottom-6 right-6 z-50 font-sans" style="z-index: 9999;">
        <!-- Chat Window (independently positioned when dragging) -->
        <div id="chat-window" class="hidden fixed w-80 h-[500px] bg-[#e1d4c2]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#362017]/10 overflow-hidden flex flex-col" style="bottom: 90px; right: 24px; max-width: calc(100vw - 48px); max-height: calc(100vh - 120px);">'

$oldPattern2 = '        <div id="welcome-bubble" class="mb-2 mr-2 bg-white px-4 py-2 rounded-xl rounded-br-none shadow-lg border border-[#362017]/5 transform transition-all duration-500 opacity-0 translate-y-4 pointer-events-none">
            <p class="text-sm font-medium text-[#362017]">Hi, maybe I can help? 👋</p>
        </div>

        <button id="chat-toggle" class="bg-[#212842] w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-105 hover:rotate-3 transition-all duration-300 group border-2 border-white/10 relative overflow-hidden">'

$newPattern2 = '        <!-- Welcome Bubble (anchored above toggle button) -->
        <div id="welcome-bubble" class="fixed bg-white px-4 py-2 rounded-xl rounded-br-none shadow-lg border border-[#362017]/5 transform transition-all duration-500 opacity-0 translate-y-4 pointer-events-none" style="bottom: 90px; right: 32px;">
            <p class="text-sm font-medium text-[#362017]">Hi, maybe I can help? 👋</p>
        </div>

        <!-- Toggle Button (always stays in bottom-right corner) -->
        <button id="chat-toggle" class="absolute bottom-0 right-0 bg-[#212842] w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-105 hover:rotate-3 transition-all duration-300 group border-2 border-white/10 overflow-hidden">'

$updatedCount = 0

foreach ($file in $files) {
    $filePath = Join-Path $PSScriptRoot $file
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        $updated = $false
        
        if ($content -match [regex]::Escape($oldPattern1)) {
            $content = $content -replace [regex]::Escape($oldPattern1), $newPattern1
            $updated = $true
        }
        
        if ($content -match [regex]::Escape($oldPattern2)) {
            $content = $content -replace [regex]::Escape($oldPattern2), $newPattern2
            $updated = $true
        }
        
        if ($updated) {
            Set-Content $filePath $content -NoNewline
            Write-Host "✓ Updated: $file" -ForegroundColor Green
            $updatedCount++
        }
    }
}

Write-Host "`n✅ Successfully updated $updatedCount files!" -ForegroundColor Cyan
