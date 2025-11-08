/**
 * ========================================
 * KAYAYA ILUNGA CONSTRUCTION
 * Scroll Animations Module
 * ========================================
 * 
 * This module handles all scroll-triggered animations using the Intersection Observer API.
 * Features:
 * - Respects user's prefers-reduced-motion setting
 * - Lazy-loads animations for better performance
 * - Supports multiple animation types via data attributes
 * - One-time animations (elements stay visible after animating)
 * 
 * @module animations
 * @version 2.0.0
 */

/* ========================================
   SCROLL ANIMATIONS
   Intersection Observer for scroll-triggered animations
   ======================================== */

(function() {
    'use strict';

    /**
     * Check if user prefers reduced motion
     * Respects accessibility preferences (WCAG 2.1)
     */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, don't initialize animations
    if (prefersReducedMotion) {
        console.log('Animations disabled: user prefers reduced motion');
        return;
    }

    /**
     * Intersection Observer configuration
     * @type {IntersectionObserverInit}
     */
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -100px 0px', // trigger 100px before element enters viewport
        threshold: 0.1 // trigger when 10% of element is visible
    };

    /**
     * Callback function for Intersection Observer
     * Adds animation classes when elements become visible
     * 
     * @param {IntersectionObserverEntry[]} entries - Array of observed elements
     * @param {IntersectionObserver} observer - The observer instance
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('is-visible');
                
                // Get animation class from data attribute or use default
                const animationClass = entry.target.dataset.animation || 'fade-in-up';
                entry.target.classList.add(animationClass);
                
                // Optional: unobserve after animation (one-time animation)
                // Comment out if you want animations to repeat
                observer.unobserve(entry.target);
            }
        });
    };

    // Create Intersection Observer instance
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    /**
     * Initializes scroll animations for all elements with .animate-on-scroll class
     * Includes error handling and fallback for unsupported browsers
     * 
     * @function initScrollAnimations
     * @returns {void}
     */
    function initScrollAnimations() {
        try {
            // Select all elements with animate-on-scroll class
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            if (animatedElements.length === 0) {
                console.log('No elements found with .animate-on-scroll class');
                return;
            }

            // Observe each element
            animatedElements.forEach(element => {
                observer.observe(element);
            });

            console.log(`Observing ${animatedElements.length} elements for scroll animations`);
        } catch (error) {
            console.error('Error initializing scroll animations:', error);
            // Fallback: make all elements visible immediately
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(element => {
                element.classList.add('is-visible');
                element.style.opacity = '1';
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }

    // Re-initialize on dynamic content load (if needed)
    window.reinitScrollAnimations = initScrollAnimations;

})();

/* ========================================
   SCROLL INDICATOR ANIMATION
   Animated chevron that bounces and fades on scroll
   ======================================== */

(function() {
    'use strict';

    /**
     * Initializes scroll indicator animation
     * - Adds bounce animation
     * - Fades out when user scrolls past 100px
     * 
     * @function initScrollIndicator
     * @returns {void}
     */
    function initScrollIndicator() {
        try {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            
            if (scrollIndicator) {
                scrollIndicator.classList.add('bounce-infinite');
                
                // Hide scroll indicator after scrolling
                let scrollTimeout;
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 100) {
                        scrollIndicator.style.opacity = '0';
                        scrollIndicator.style.pointerEvents = 'none';
                    } else {
                        scrollIndicator.style.opacity = '1';
                        scrollIndicator.style.pointerEvents = 'auto';
                    }
                });
            }
        } catch (error) {
            console.error('Error initializing scroll indicator:', error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollIndicator);
    } else {
        initScrollIndicator();
    }

})();

/* ========================================
   BACK TO TOP BUTTON ANIMATION
   Shows/hides button with fade animation based on scroll position
   ======================================== */

(function() {
    'use strict';

    /**
     * Initializes back to top button functionality
     * - Shows button after scrolling 300px
     * - Smooth scroll to top on click
     * 
     * @function initBackToTop
     * @returns {void}
     */
    function initBackToTop() {
        try {
            const backToTopButton = document.getElementById('back-to-top');
            
            if (!backToTopButton) return;

            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.remove('invisible');
                    backToTopButton.classList.add('fade-in');
                } else {
                    backToTopButton.classList.add('invisible');
                    backToTopButton.classList.remove('fade-in');
                }
            });

            // Smooth scroll to top on click
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        } catch (error) {
            console.error('Error initializing back to top button:', error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
    } else {
        initBackToTop();
    }

})();
