document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. HERO TYPING EFFECT
       ========================================== */
    const typingTextEl = document.getElementById('typing-text');
    const roles = ["Full-Stack Developer", "MERN Stack Expert", "Spring Boot Engineer", "AI / ML Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Wait before starting to delete
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Delay before starting next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingTextEl) {
        typeEffect();
    }

    /* ==========================================
       2. MOBILE NAVIGATION MENU
       ========================================== */
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        menuToggleBtn.classList.toggle('active');
        mobileOverlay.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
        
        // Transform hamburger lines
        const bars = menuToggleBtn.querySelectorAll('.bar');
        if (menuToggleBtn.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    /* ==========================================
       3. SCROLL METRICS & STICKY HEADER
       ========================================== */
    const header = document.getElementById('main-header');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // A. Scroll Progress Bar
        if (docHeight > 0) {
            const scrolledPercent = (scrollTop / docHeight) * 100;
            scrollProgressBar.style.width = scrolledPercent + '%';
        }

        // B. Sticky Header Styles
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // C. Scroll Spy (Active Navigation Links Highlight)
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    /* ==========================================
       4. PROJECTS SEARCH & FILTERING
       ========================================== */
    const projectSearch = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    let activeFilter = 'all';
    let searchQuery = '';

    function filterProjects() {
        projectCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const tech = card.getAttribute('data-tech').toLowerCase();
            const categories = card.getAttribute('data-categories').split(', ');
            
            // Match search text
            const matchesSearch = title.includes(searchQuery) || tech.includes(searchQuery);
            
            // Match selected category button
            let matchesCategory = false;
            if (activeFilter === 'all') {
                matchesCategory = true;
            } else if (activeFilter === 'spring-boot') {
                matchesCategory = categories.includes('spring-boot');
            } else if (activeFilter === 'mern') {
                matchesCategory = categories.includes('mern');
            } else if (activeFilter === 'ai-ml') {
                matchesCategory = categories.includes('ai-ml');
            } else if (activeFilter === 'mobile') {
                matchesCategory = categories.includes('mobile');
            }

            if (matchesSearch && matchesCategory) {
                card.classList.remove('hide');
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.transform = 'scale(0.95)';
                card.style.opacity = '0';
                card.classList.add('hide');
            }
        });
    }

    // Search bar event
    if (projectSearch) {
        projectSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterProjects();
        });
    }

    // Filter button events
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            filterProjects();
        });
    });

    /* ==========================================
       5. INTERSECTION OBSERVER FOR FADE-IN
       ========================================== */
    const fadeElements = document.querySelectorAll('.glass-card, .section-title-wrap, .timeline-item');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after showing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        // Prepare element style classes for animation
        el.classList.add('fade-in-element');
        fadeObserver.observe(el);
    });

    // Append CSS rule dynamically for scroll animations
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fade-in-element.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);

    /* ==========================================
       6. CONTACT FORM HANDLING
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status-message');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Set sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            // Simulate server network latency
            setTimeout(() => {
                const name = document.getElementById('form-name').value;
                const email = document.getElementById('form-email').value;
                
                // Form feedback validation
                if (name && email) {
                    formStatus.textContent = "Thank you, your message has been sent successfully!";
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    formStatus.textContent = "An error occurred. Please check the inputs.";
                    formStatus.classList.add('error');
                }
                
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            }, 1500);
        });
    }
});
