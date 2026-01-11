/* ==========================================================================
   Daniel Martin Portfolio - JavaScript
   Apple-style scroll animations and interactions
   ========================================================================== */

(function() {
    'use strict';

    // ==========================================================================
    // Initialization
    // ==========================================================================
    
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initScrollProgress();
        initScrollAnimations();
        initParallaxEffects();
        initHeaderBehavior();
        initHamburgerMenu();
        initFooterVisibility();
        initSlideshow();
        setCurrentYear();
    }

    // ==========================================================================
    // Scroll Progress Indicator
    // ==========================================================================

    function initScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, { passive: true });
    }

    // ==========================================================================
    // Apple-style Scroll Animations
    // ==========================================================================

    function initScrollAnimations() {
        // General animate-on-scroll elements
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));

        // Scale on scroll elements
        const scaleElements = document.querySelectorAll('.scale-on-scroll');
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        scaleElements.forEach(el => scaleObserver.observe(el));

        // Slide elements
        const slideElements = document.querySelectorAll('.slide-left, .slide-right');
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        slideElements.forEach(el => slideObserver.observe(el));

        // Staggered children
        const staggerContainers = document.querySelectorAll('.stagger-children');
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.2
        });

        staggerContainers.forEach(el => staggerObserver.observe(el));

        // Experience items - staggered animation
        const items = document.querySelectorAll('.item');
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const allItems = Array.from(items);
                    const index = allItems.indexOf(entry.target);
                    const delay = (index % 4) * 150;
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        items.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            itemObserver.observe(el);
        });

        // Skill categories - staggered animation
        const skillCategories = document.querySelectorAll('.skill-category');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const allCategories = Array.from(skillCategories);
                    const index = allCategories.indexOf(entry.target);
                    const delay = index * 120;
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, delay);
                }
            });
        }, { 
            threshold: 0.2
        });

        skillCategories.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px) scale(0.95)';
            el.style.transition = 'opacity 0.7s cubic-bezier(0.5, 0, 0, 1), transform 0.7s cubic-bezier(0.5, 0, 0, 1)';
            skillObserver.observe(el);
        });
    }

    // ==========================================================================
    // Parallax Effects
    // ==========================================================================

    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        if (parallaxElements.length === 0) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    
                    parallaxElements.forEach(el => {
                        const speed = el.dataset.speed || 0.5;
                        const yPos = -(scrolled * speed);
                        el.style.transform = `translateY(${yPos}px)`;
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ==========================================================================
    // Header Behavior (Hide on scroll down, show on scroll up)
    // ==========================================================================

    function initHeaderBehavior() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScrollY = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        header.classList.add('hidden');
                    } else {
                        header.classList.remove('hidden');
                    }
                    
                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ==========================================================================
    // Hamburger Menu
    // ==========================================================================

    function initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navOverlay = document.querySelector('.nav-overlay');
        const navLinks = document.querySelectorAll('.nav-overlay a');

        if (!hamburger || !navOverlay) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================================================
    // Footer Visibility
    // ==========================================================================

    function initFooterVisibility() {
        const footer = document.querySelector('.site-footer');
        const contact = document.getElementById('contact');
        
        if (!footer || !contact) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('visible');
                } else {
                    footer.classList.remove('visible');
                }
            });
        }, { threshold: 0.3 });

        observer.observe(contact);
    }

    // ==========================================================================
    // Slideshow
    // ==========================================================================

    function initSlideshow() {
        const slideshow = document.getElementById('contactSlideshow');
        if (!slideshow) return;

        const imgs = Array.from(slideshow.querySelectorAll('img'));
        if (imgs.length === 0) return;

        let idx = 0;
        const duration = 8000;

        function next() {
            imgs[idx].classList.remove('active');
            idx = (idx + 1) % imgs.length;
            imgs[idx].classList.add('active');
        }

        function prev() {
            imgs[idx].classList.remove('active');
            idx = (idx - 1 + imgs.length) % imgs.length;
            imgs[idx].classList.add('active');
        }

        let timer = setInterval(next, duration);

        slideshow.addEventListener('mouseenter', () => clearInterval(timer));
        slideshow.addEventListener('mouseleave', () => { 
            clearInterval(timer); 
            timer = setInterval(next, duration); 
        });

        // Touch support
        let startX = 0, moving = false;
        
        slideshow.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            moving = true;
            clearInterval(timer);
        }, { passive: true });

        slideshow.addEventListener('touchend', (e) => {
            if (!moving) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) {
                if (dx < 0) next(); else prev();
            }
            moving = false;
            timer = setInterval(next, duration);
        });

        // Button controls
        const prevBtn = slideshow.querySelector('.slideshow-btn.prev');
        const nextBtn = slideshow.querySelector('.slideshow-btn.next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prev();
                clearInterval(timer);
                timer = setInterval(next, duration);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                next();
                clearInterval(timer);
                timer = setInterval(next, duration);
            });
        }
    }

    // ==========================================================================
    // Utilities
    // ==========================================================================

    function setCurrentYear() {
        const yearEl = document.getElementById('currentYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

})();
