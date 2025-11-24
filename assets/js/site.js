/**
 * Portfolio Site Logic
 * Handles interactions, animations, and performance
 */

// ==========================================================================
// Mobile Menu Interaction
// ==========================================================================

const initMobileMenu = () => {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        // Toggle menu visibility
        mobileMenu.classList.toggle('hidden');

        // Update ARIA attribute
        menuToggle.setAttribute('aria-expanded', !isExpanded);

        // Animate icon (optional enhancement)
        const icon = menuToggle.querySelector('svg');
        if (icon) {
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
};

// ==========================================================================
// GSAP Animations
// ==========================================================================

const initAnimations = () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Fade Up Animations
    const fadeElements = document.querySelectorAll('[data-gsap="fade-up"]');
    
    fadeElements.forEach(element => {
        const delay = element.getAttribute('data-gsap-delay') || 0;
        
        gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: parseFloat(delay),
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Parallax effect for hero section (if exists)
    const heroSection = document.querySelector('section:first-of-type');
    if (heroSection) {
        gsap.to(heroSection, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Card hover animations
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });
};

// ==========================================================================
// Smooth Scroll for Anchor Links
// ==========================================================================

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Don't prevent default for # only
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ==========================================================================
// Form Validation
// ==========================================================================

const initFormValidation = () => {
    const form = document.querySelector('form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea, select');

    // Add blur event listeners for real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.checkValidity()) {
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
            }
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('border-red-500')) {
                input.classList.remove('border-red-500');
            }
        });
    });

    // Form submission handling
    form.addEventListener('submit', (e) => {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('border-red-500');
            }
        });

        if (!isValid) {
            e.preventDefault();
            // Focus on first invalid field
            const firstInvalid = form.querySelector('.border-red-500');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
};

// ==========================================================================
// Lazy Loading
// ==========================================================================

const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
};

// ==========================================================================
// Initialization
// ==========================================================================

const init = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initMobileMenu();
            initAnimations();
            initSmoothScroll();
            initFormValidation();
            initLazyLoading();
        });
    } else {
        // DOM already loaded
        initMobileMenu();
        initAnimations();
        initSmoothScroll();
        initFormValidation();
        initLazyLoading();
    }
};

// Start the site
init();