/* ============================================================================
   PORTFOLIO WEBSITE - JAVASCRIPT FUNCTIONALITY
   ========================================================================= */

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    initializeMobileMenu();
    initializeFormHandling();
    initializeSmoothScrolling();
    initializeScrollAnimations();
});

/* ============================================================================
   DARK MODE TOGGLE FUNCTIONALITY
   ========================================================================= */

/**
 * Initialize dark mode toggle functionality
 * Handles switching between light and dark themes
 * Stores user preference in localStorage
 */
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check if user has saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply saved preference on page load
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Add click event listener to toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            toggleDarkMode();
        });
    }
}

/**
 * Toggle dark mode on/off
 * Saves preference to localStorage
 */
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Save preference
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

/* ============================================================================
   MOBILE MENU FUNCTIONALITY
   ========================================================================= */

/**
 * Initialize mobile menu toggle functionality
 * Handles opening and closing the mobile navigation menu
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Animate hamburger menu icon
            this.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickInsideBtn = mobileMenuBtn.contains(event.target);

        if (!isClickInsideNav && !isClickInsideBtn && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

/* ============================================================================
   FORM HANDLING
   ========================================================================= */

/**
 * Initialize contact form submission handling
 * Validates form data and provides user feedback
 */
function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validate form data
            if (validateForm(formData)) {
                // Simulate form submission (in production, send to backend)
                submitForm(formData);
            }
        });
    }
}

/**
 * Validate form data before submission
 * @param {Object} data - Form data object containing name, email, subject, message
 * @returns {boolean} - True if form is valid, false otherwise
 */
function validateForm(data) {
    // Check for empty fields
    if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification('Please fill out all fields', 'error');
        return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    // Validate message length (minimum 10 characters)
    if (data.message.length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        return false;
    }

    return true;
}

/**
 * Submit form data
 * In production, this would send data to a backend service
 * Currently shows success feedback to user
 * @param {Object} data - Validated form data
 */
function submitForm(data) {
    // Show success message
    showNotification('Thank you! I\'ll get back to you soon.', 'success');

    // Log form data (in production, send to backend)
    console.log('Form submitted:', data);

    // Reset form
    document.getElementById('contactForm').reset();
}

/**
 * Show notification message to user
 * @param {string} message - The notification message
 * @param {string} type - Type of notification: 'success', 'error', or 'info'
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 6px;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;

    // Set colors based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = '#ffffff';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
        notification.style.color = '#ffffff';
    } else {
        notification.style.backgroundColor = '#2196F3';
        notification.style.color = '#ffffff';
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/* ============================================================================
   SMOOTH SCROLLING FOR ANCHOR LINKS
   ========================================================================= */

/**
 * Initialize smooth scrolling for navigation links
 * Provides smooth scroll behavior for all anchor links
 */
function initializeSmoothScrolling() {
    // CSS scroll-behavior already handles this, but add polyfill for older browsers
    const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;

    if (!supportsScrollBehavior) {
        // Fallback for older browsers
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for sticky navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

/* ============================================================================
   SCROLL ANIMATIONS
   ========================================================================= */

/**
 * Initialize scroll-triggered animations
 * Animates elements when they come into view during scroll
 */
function initializeScrollAnimations() {
    // Check if Intersection Observer API is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: add animation classes immediately
        document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
            el.classList.add('animated');
        });
        return;
    }

    // Create Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should be animated
    const elementsToAnimate = document.querySelectorAll(
        '.skill-card, .project-card, .timeline-item, .about-text'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

/* ============================================================================
   UTILITY FUNCTIONS
   ========================================================================= */

/**
 * Get current scroll position
 * @returns {number} - Current vertical scroll position in pixels
 */
function getScrollPosition() {
    return window.scrollY || document.documentElement.scrollTop;
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - True if element is visible in viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ============================================================================
   KEYBOARD ACCESSIBILITY
   ========================================================================= */

/**
 * Add keyboard navigation support
 * Allows users to navigate using Tab key
 */
document.addEventListener('keydown', function(event) {
    // Close mobile menu on Escape key
    if (event.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

/* ============================================================================
   ANIMATIONS KEYFRAMES (Added via JavaScript for browser support)
   ========================================================================= */

// Add animation styles to document
(function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .skill-card.animated,
        .project-card.animated,
        .timeline-item.animated {
            animation: fadeInUp 0.6s ease forwards;
        }

        .about-text.animated {
            animation: fadeInUp 0.6s ease forwards;
        }

        /* Mobile menu animation */
        .nav-menu.active {
            animation: fadeInUp 0.3s ease;
        }

        /* Smooth transitions */
        * {
            transition-property: background-color, border-color, color, box-shadow;
            transition-timing-function: ease;
            transition-duration: 0.3s;
        }

        /* Focus visible for accessibility */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        textarea:focus-visible {
            outline: 2px solid #0066cc;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
})();

/* ============================================================================
   PERFORMANCE: LAZY LOADING IMAGES (if added in future)
   ========================================================================= */

/**
 * Initialize lazy loading for images
 * This function can be used when adding images to the portfolio
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/* ============================================================================
   ANALYTICS & TRACKING (Optional)
   ========================================================================= */

/**
 * Track user interactions
 * Can be expanded for analytics integration
 */
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // In production, send to analytics service
}

// Track when users click navigation links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('Navigation Click', {
            target: this.getAttribute('href')
        });
    });
});

// Track form submission
document.addEventListener('submit', function() {
    trackEvent('Form Submission');
}, true);

/* ============================================================================
   END OF JAVASCRIPT
   ========================================================================= */
