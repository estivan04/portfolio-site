/**
 * Lazy Loader - Interaction-Based Script Loading for Maximum PageSpeed
 * =====================================================================
 * Strategy: DO NOT load analytics or heavy scripts until user interacts.
 * This keeps the main thread clear during initial page load, boosting scores.
 * 
 * Triggers: scroll, mousemove, touchstart, keydown
 * Once triggered, loads: Google Analytics (GTM), Microsoft Clarity, Marked.js
 */

(function() {
    'use strict';

    // Configuration
    const GTM_ID = 'G-MCN4RXCY6Q';
    const CLARITY_ID = 'ubbdpwxnae';
    
    // Track if scripts have been loaded (only load once)
    let scriptsLoaded = false;
    
    // Interaction events that trigger script loading
    const INTERACTION_EVENTS = ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'];

    /**
     * Inject a script element into the document
     * @param {string} src - Script source URL
     * @param {boolean} async - Whether script should be async
     * @param {Function} callback - Optional callback on load
     */
    function injectScript(src, async = true, callback = null) {
        const script = document.createElement('script');
        script.src = src;
        script.async = async;
        if (callback) {
            script.onload = callback;
        }
        document.body.appendChild(script);
    }

    /**
     * Inject inline script content
     * @param {string} content - Script content to inject
     */
    function injectInlineScript(content) {
        const script = document.createElement('script');
        script.textContent = content;
        document.body.appendChild(script);
    }

    /**
     * Load Google Analytics 4 (gtag.js)
     */
    function loadGoogleAnalytics() {
        // Create dataLayer if not exists
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', GTM_ID);

        // Load gtag script
        injectScript(`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`);
        console.log('[LazyLoader] Google Analytics loaded');
    }

    /**
     * Load Microsoft Clarity
     */
    function loadClarity() {
        window.clarity = window.clarity || function() {
            (window.clarity.q = window.clarity.q || []).push(arguments);
        };

        const clarityScript = `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
        `;
        injectInlineScript(clarityScript);
        console.log('[LazyLoader] Microsoft Clarity loaded');
    }

    /**
     * Load Marked.js for markdown parsing in chat
     */
    function loadMarkedJS() {
        injectScript(
            'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
            true,
            function() {
                console.log('[LazyLoader] Marked.js loaded');
            }
        );
    }

    /**
     * Load all deferred scripts - called once on first user interaction
     */
    function loadAllScripts() {
        if (scriptsLoaded) return;
        scriptsLoaded = true;
        
        // Remove all interaction listeners to prevent duplicate loads
        INTERACTION_EVENTS.forEach(function(event) {
            window.removeEventListener(event, onFirstInteraction, { passive: true, capture: true });
            document.removeEventListener(event, onFirstInteraction, { passive: true, capture: true });
        });
        
        console.log('[LazyLoader] User interaction detected - loading scripts...');
        
        // Load all scripts with slight stagger to prevent main thread congestion
        loadMarkedJS();
        
        // Use requestIdleCallback for analytics to minimize impact
        if ('requestIdleCallback' in window) {
            requestIdleCallback(function() {
                loadGoogleAnalytics();
                loadClarity();
            }, { timeout: 3000 });
        } else {
            setTimeout(function() {
                loadGoogleAnalytics();
                loadClarity();
            }, 100);
        }
    }

    /**
     * Handler for first user interaction
     */
    function onFirstInteraction() {
        loadAllScripts();
    }

    /**
     * Initialize interaction-based lazy loading
     */
    function init() {
        // Register listeners for user interaction events
        INTERACTION_EVENTS.forEach(function(event) {
            window.addEventListener(event, onFirstInteraction, { passive: true, capture: true, once: true });
            document.addEventListener(event, onFirstInteraction, { passive: true, capture: true, once: true });
        });
        
        console.log('[LazyLoader] Waiting for user interaction to load scripts...');
    }

    // Start watching for interactions after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
