/**
 * ========================================
 * KAYAYA ILUNGA CONSTRUCTION
 * Main JavaScript - Homepage Interactions
 * ========================================
 * 
 * This file handles all interactive functionality for the homepage including:
 * - Mobile menu toggle and navigation
 * - Scroll effects and animations
 * - Hero section video fallback
 * - Project filtering
 * - Before/after image slider
 * - Form handling
 * - Back to top button
 * 
 * @author Kayaya Ilunga Construction
 * @version 2.0.0
 */

/**
 * Main initialization function
 * Runs when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function () {
    // ========================================
    // MOBILE MENU FUNCTIONALITY
    // ========================================
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    /**
     * Opens the mobile navigation menu
     * - Adds active classes to menu elements
     * - Disables body scroll
     * - Animates menu slide-in from right
     */
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        body.classList.add('mobile-menu-open');
    }

    /**
     * Closes the mobile navigation menu
     * - Removes active classes from menu elements
     * - Re-enables body scroll
     * - Animates menu slide-out to right
     */
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        body.classList.remove('mobile-menu-open');
    }

    // Toggle menu on button click
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ========================================
    // NAVBAR SCROLL EFFECTS
    // ========================================
    
    /**
     * Adds glassmorphism effect to navbar on scroll
     * Adds 'scrolled' class when user scrolls past 50px
     */
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // HERO SECTION - SCROLL INDICATOR
    // ========================================
    
    /**
     * Handles smooth scroll to about section when clicking scroll indicator
     */
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ========================================
    // HERO SECTION - VIDEO FALLBACK
    // ========================================
    
    /**
     * Handles video loading errors and mobile fallback
     * - Shows fallback image if video fails to load
     * - Uses fallback image on mobile to save bandwidth
     */
    const heroVideo = document.querySelector('.hero-video');
    const heroFallback = document.querySelector('.hero-fallback-image');
    
    if (heroVideo && heroFallback) {
        // Check if video can play
        heroVideo.addEventListener('error', () => {
            heroFallback.style.display = 'block';
        });

        // Check if video loaded successfully
        heroVideo.addEventListener('loadeddata', () => {
            heroFallback.style.display = 'none';
        });

        // For mobile devices, use fallback image to save bandwidth
        if (window.innerWidth <= 768) {
            heroVideo.style.display = 'none';
            heroFallback.style.display = 'block';
        }
    }

    // ========================================
    // PROJECT FILTERING
    // ========================================
    
    /**
     * Filters project gallery items based on category
     * Updates active button styling
     */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'primary-bg', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('border', 'border-gray-300', 'hover:bg-gray-100'));

            // Add active class to clicked button
            button.classList.add('active', 'primary-bg', 'text-white');
            button.classList.remove('border', 'border-gray-300', 'hover:bg-gray-100');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ========================================
    // BEFORE/AFTER IMAGE SLIDER
    // ========================================
    
    /**
     * Interactive before/after image comparison slider
     * Supports both mouse and touch events
     */
    const beforeAfterContainers = document.querySelectorAll('.before-after');

    beforeAfterContainers.forEach(container => {
        const slider = container.querySelector('.slider');
        const after = container.querySelector('.after');
        let isDragging = false;

        if (slider && after) {
            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                e.preventDefault();
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                const containerRect = container.getBoundingClientRect();
                let x = e.clientX - containerRect.left;

                // Limit x to container boundaries
                x = Math.max(0, Math.min(x, containerRect.width));

                const percent = (x / containerRect.width) * 100;

                after.style.width = `${100 - percent}%`;
                slider.style.left = `${percent}%`;
            });

            // Touch events for mobile
            slider.addEventListener('touchstart', (e) => {
                isDragging = true;
                e.preventDefault();
            });

            window.addEventListener('touchend', () => {
                isDragging = false;
            });

            window.addEventListener('touchmove', (e) => {
                if (!isDragging) return;

                const containerRect = container.getBoundingClientRect();
                let x = e.touches[0].clientX - containerRect.left;

                // Limit x to container boundaries
                x = Math.max(0, Math.min(x, containerRect.width));

                const percent = (x / containerRect.width) * 100;

                after.style.width = `${100 - percent}%`;
                slider.style.left = `${percent}%`;
            });
        }
    });

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    
    /**
     * Handles contact form submission
     * TODO: Integrate with backend API
     */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Here you would typically send the form data to a server
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
            contactForm.reset();
        });
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    
    /**
     * Shows/hides back to top button based on scroll position
     * Appears after scrolling 300px down
     */
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('invisible');
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
                backToTopButton.classList.add('invisible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // PAGE LOADER ANIMATION
    // ========================================
    
    /**
     * Animates page loading progress bar
     * Fades out loader when complete
     */
    const loader = document.getElementById('loader');
    const loadingBar = document.querySelector('.loading-bar');

    if (loader && loadingBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            loadingBar.style.width = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 100);
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    
    /**
     * Enables smooth scrolling for all anchor links
     * Handles navigation offset for fixed navbar
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // SCROLL ANIMATIONS - INTERSECTION OBSERVER
    // ========================================
    
    /**
     * Observes elements and triggers fade-in animations when they enter viewport
     * Uses Intersection Observer API for performance
     */
    const fadeElements = document.querySelectorAll('.fade-in');
    const serviceCards = document.querySelectorAll('.service-card');
    const projectCards = document.querySelectorAll('.project-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments
    fadeElements.forEach(element => observer.observe(element));
    serviceCards.forEach(card => observer.observe(card));
    projectCards.forEach(card => observer.observe(card));
    testimonialCards.forEach(card => observer.observe(card));
});

// ========================================
// GLOBAL ANIMATION OBSERVER
// ========================================

/**
 * Global Intersection Observer for all animated elements
 * Adds 'visible' class when elements enter viewport
 * 
 * @param {IntersectionObserverEntry[]} entries - Array of observed elements
 */
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all animated elements
document.querySelectorAll('.fade-in, .service-card, .project-card, .testimonial-card, .hero-content').forEach((el) => {
    animationObserver.observe(el);
});
