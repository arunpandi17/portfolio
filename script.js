// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.5)';
    cursorFollower.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// ========================================
// HERO SECTION - ENHANCED ANIMATIONS
// ========================================

// ===== TYPING EFFECT =====
const roles = [
    'Full Stack Developer',
    'Web Developer',
    'Problem Solver',
    'Tech Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedTextElement = document.querySelector('.typed-text');
let isTypingStarted = false;

function typeEffect() {
    if (!typedTextElement) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

// Start typing when hero is visible
function startTyping() {
    if (!isTypingStarted && typedTextElement) {
        isTypingStarted = true;
        setTimeout(typeEffect, 800);
    }
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const text = counter.getAttribute('data-count');
        const target = parseFloat(text) || 0;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        let isAnimated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isAnimated) {
                    isAnimated = true;
                    
                    // Handle '25+' format
                    const hasPlus = text.includes('+');
                    const cleanTarget = parseFloat(text.replace('+', ''));
                    
                    const counterInterval = setInterval(() => {
                        current += step;
                        if (current >= cleanTarget) {
                            current = cleanTarget;
                            clearInterval(counterInterval);
                        }
                        if (hasPlus) {
                            counter.textContent = Math.round(current) + '+';
                        } else if (Number.isInteger(cleanTarget)) {
                            counter.textContent = Math.round(current);
                        } else {
                            counter.textContent = current.toFixed(1);
                        }
                    }, 16);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(counter);
    });
}

// ===== PARALLAX EFFECT ON HERO IMAGE =====
function initHeroParallax() {
    const heroImage = document.querySelector('.hero-image');
    const heroSection = document.querySelector('.hero');
    const img = heroImage?.querySelector('img');
    
    if (!heroImage || !img || window.innerWidth <= 968) return;
    
    let isMouseOverHero = false;
    
    heroSection.addEventListener('mouseenter', () => {
        isMouseOverHero = true;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        isMouseOverHero = false;
        img.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isMouseOverHero) return;
        
        const rect = heroImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 25;
        const deltaY = (e.clientY - centerY) / 25;
        
        img.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) scale(1.02)`;
    });
}

// ===== INITIALIZE HERO =====
document.addEventListener('DOMContentLoaded', function() {
    // Start typing when hero is visible
    startTyping();
    
    // Initialize counters
    animateCounters();
    
    // Initialize parallax (desktop only)
    if (window.innerWidth > 968) {
        initHeroParallax();
    }
});

// Re-initialize on resize
let heroResizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(heroResizeTimer);
    heroResizeTimer = setTimeout(function() {
        if (window.innerWidth > 968) {
            initHeroParallax();
        }
    }, 300);
});

// console.log('✅ Hero section animations loaded!');

// ========================================
// ABOUT SECTION ANIMATIONS - ISOLATED
// ========================================

// ===== INTERSECTION OBSERVER FOR ABOUT SECTION =====
function initAboutAnimations() {
    const aboutSection = document.querySelector('.about');
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    const infoItems = document.querySelectorAll('.about-info-item');
    
    if (!aboutSection) return;
    
    // Create observer for about section
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                if (aboutText) {
                    aboutText.style.opacity = '1';
                    aboutText.style.transform = 'translateX(0)';
                }
                
                if (aboutImage) {
                    aboutImage.style.opacity = '1';
                    aboutImage.style.transform = 'translateX(0)';
                }
                
                // Animate info items with stagger
                infoItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 200 + (index * 100));
                });
                
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Set initial state - ONLY for about section elements
    if (aboutText) {
        aboutText.style.opacity = '0';
        aboutText.style.transform = 'translateX(-30px)';
        aboutText.style.transition = 'all 0.8s ease';
    }
    
    if (aboutImage) {
        aboutImage.style.opacity = '0';
        aboutImage.style.transform = 'translateX(30px)';
        aboutImage.style.transition = 'all 0.8s ease';
    }
    
    infoItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(15px)';
        item.style.transition = 'all 0.5s ease';
    });
    
    // Observe the about section ONLY
    aboutObserver.observe(aboutSection);
}

// ===== PARALLAX EFFECT - ONLY ON ABOUT IMAGE =====
function initAboutParallax() {
    const aboutImage = document.querySelector('.about-image');
    if (!aboutImage) return;
    
    // Only apply to about image, not entire page
    const img = aboutImage.querySelector('img');
    if (!img) return;
    
    let isMouseOverAbout = false;
    
    // Track if mouse is over the about section
    const aboutSection = document.querySelector('.about');
    
    aboutSection.addEventListener('mouseenter', () => {
        isMouseOverAbout = true;
    });
    
    aboutSection.addEventListener('mouseleave', () => {
        isMouseOverAbout = false;
        // Reset transform when mouse leaves
        img.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
    });
    
    document.addEventListener('mousemove', (e) => {
        // Only apply parallax if mouse is over about section
        if (!isMouseOverAbout || window.innerWidth <= 768) {
            return;
        }
        
        const rect = aboutImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 20;
        const deltaY = (e.clientY - centerY) / 20;
        
        // Only apply to the about image
        img.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) scale(1.02)`;
    });
}

// ===== BADGE PULSE EFFECT - ONLY ON ABOUT BADGE =====
function initBadgeEffect() {
    const badge = document.querySelector('.about-experience-badge');
    if (!badge) return;
    
    // Add pulse glow effect only on the badge
    setInterval(() => {
        badge.style.boxShadow = '0 10px 40px rgba(108, 99, 255, 0.5)';
        setTimeout(() => {
            badge.style.boxShadow = '0 10px 30px rgba(108, 99, 255, 0.3)';
        }, 300);
    }, 3000);
}

// ===== COUNT UP FOR EXPERIENCE - ONLY ON ABOUT =====
function animateExperienceCounter() {
    const expNumber = document.querySelector('.exp-number');
    if (!expNumber) return;
    
    const target = parseInt(expNumber.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    let isAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimated) {
                isAnimated = true;
                const counter = setInterval(() => {
                    current += step;
                    if (current < target) {
                        expNumber.textContent = Math.ceil(current) + '+';
                    } else {
                        expNumber.textContent = target + '+';
                        clearInterval(counter);
                    }
                }, 16);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(expNumber);
}

// ========================================
// INITIALIZE ALL ABOUT SECTION ONLY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize about animations
    initAboutAnimations();
    
    // Initialize parallax (desktop only)
    if (window.innerWidth > 768) {
        initAboutParallax();
    }
    
    // Initialize badge effect
    initBadgeEffect();
    
    // Initialize experience counter
    animateExperienceCounter();
});

// ===== RE-INITIALIZE ON RESIZE =====
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Re-check if parallax should be enabled/disabled
        if (window.innerWidth > 768) {
            initAboutParallax();
        }
    }, 300);
});

// console.log('✅ About section animations loaded (isolated to about section only)!');

// ===== TYPING EFFECT =====
// const roles = [
//     'Full Stack Developer',
//     'Web Developer',
//     'Problem Solver',
//     'Tech Enthusiast'
// ];

// let roleIndex = 0;
// let charIndex = 0;
// let isDeleting = false;
// let typedTextElement = document.querySelector('.typed-text');

// function typeEffect() {
//     const currentRole = roles[roleIndex];
    
//     if (isDeleting) {
//         typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
//         charIndex--;
//     } else {
//         typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
//         charIndex++;
//     }
    
//     if (!isDeleting && charIndex === currentRole.length) {
//         isDeleting = true;
//         setTimeout(typeEffect, 2000);
//         return;
//     }
    
//     if (isDeleting && charIndex === 0) {
//         isDeleting = false;
//         roleIndex = (roleIndex + 1) % roles.length;
//         setTimeout(typeEffect, 500);
//         return;
//     }
    
//     const speed = isDeleting ? 50 : 100;
//     setTimeout(typeEffect, speed);
// }

// document.addEventListener('DOMContentLoaded', () => {
//     if (typedTextElement) {
//         setTimeout(typeEffect, 1000);
//     }
// });

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ===== NAVIGATION =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
 
// ===== SKILLS TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.skills-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        panels.forEach(p => p.classList.remove('active'));
        const target = document.getElementById(btn.dataset.tab);
        if (target) {
            target.classList.add('active');
            // Re-animate skill bars when tab changes with delay
            setTimeout(() => {
                animateAllSkillBars();
            }, 400);
        }
    });
});

// ========================================
// SKILL BARS ANIMATION - RELIABLE VERSION
// ========================================

// Store all skill bars with their target widths
let skillBarsData = [];

function initSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    skillBarsData = [];
    
    bars.forEach(bar => {
        // Store the target width
        const targetWidth = bar.style.width;
        // Reset to 0
        bar.style.width = '0%';
        bar.dataset.animated = 'false';
        bar.dataset.targetWidth = targetWidth;
        
        skillBarsData.push({
            element: bar,
            targetWidth: targetWidth,
            animated: false
        });
    });
}

function animateAllSkillBars() {
    const windowHeight = window.innerHeight;
    let anyAnimated = false;
    
    skillBarsData.forEach(item => {
        const bar = item.element;
        const rect = bar.getBoundingClientRect();
        
        // Check if bar is visible in viewport
        const isVisible = (
            rect.top < windowHeight - 50 && 
            rect.bottom > 50
        );
        
        if (isVisible && !item.animated) {
            // Reset to 0 first
            bar.style.width = '0%';
            // Animate to target after small delay
            setTimeout(() => {
                bar.style.width = item.targetWidth;
                bar.dataset.animated = 'true';
                item.animated = true;
                anyAnimated = true;
            }, 150);
        }
    });
    
    return anyAnimated;
}

// ===== SCROLL HANDLER - RELIABLE =====
let scrollTimeout = null;
let isScrolling = false;

window.addEventListener('scroll', function() {
    // Use requestAnimationFrame for smooth performance
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            animateAllSkillBars();
            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: true });

// ===== LOAD HANDLER =====
window.addEventListener('load', function() {
    // Initialize bars
    initSkillBars();
    
    // Animate after a delay
    setTimeout(function() {
        animateAllSkillBars();
    }, 600);
    
    // Second attempt after images load
    setTimeout(function() {
        animateAllSkillBars();
    }, 1200);
});

// ===== RESIZE HANDLER =====
let resizeTimeout = null;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reset animation state on resize
        skillBarsData.forEach(item => {
            if (item.animated) {
                item.animated = false;
                item.element.dataset.animated = 'false';
            }
        });
        animateAllSkillBars();
    }, 300);
});

// ===== INTERSECTION OBSERVER - BEST PRACTICE =====
// This is the most reliable method for detecting visibility
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.skill-progress');
            if (bar && bar.dataset.animated === 'false') {
                const targetWidth = bar.dataset.targetWidth || bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.dataset.animated = 'true';
                    
                    // Update data
                    skillBarsData.forEach(item => {
                        if (item.element === bar) {
                            item.animated = true;
                        }
                    });
                }, 150);
            }
        }
    });
}, observerOptions);

// Observe all skill cards
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skill-card').forEach(card => {
        skillObserver.observe(card);
    });
});

// ========================================
// FORCE ANIMATION - FALLBACK
// ========================================

// Force animation on all bars (useful for debugging)
function forceAnimateAllBars() {
    skillBarsData.forEach(item => {
        const bar = item.element;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = item.targetWidth;
            bar.dataset.animated = 'true';
            item.animated = true;
        }, 100);
    });
}

// Call this if you need to force animation
// forceAnimateAllBars();

// ========================================
// MUTATION OBSERVER - Detect DOM Changes
// ========================================

// Watch for changes in the DOM (like tab switching)
const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            // Check if any skill panel became visible
            document.querySelectorAll('.skills-panel.active').forEach(panel => {
                const bars = panel.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    // Reset animation state
                    bar.dataset.animated = 'false';
                    skillBarsData.forEach(item => {
                        if (item.element === bar) {
                            item.animated = false;
                        }
                    });
                });
                // Animate after a small delay
                setTimeout(animateAllSkillBars, 300);
            });
        }
    });
});

// Start observing
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        mutationObserver.observe(skillsSection, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }
});

// ========================================
// DEBUGGING - Check if bars are animating
// ========================================

// Uncomment to debug
// setInterval(() => {
//     console.log('Skill bars status:');
//     skillBarsData.forEach((item, index) => {
//         console.log(`Bar ${index}: animated=${item.animated}, width=${item.element.style.width}`);
//     });
// }, 3000);

// console.log('✅ Skill bars animation system loaded successfully!');

// ===== PROJECT FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================
// PROJECTS SECTION - FILTER + ANIMATIONS
// ========================================

// ===== PROJECT FILTER =====
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach((card, index) => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.classList.remove('filter-hide');
                    card.classList.add('filter-show');
                    card.style.animationDelay = `${index * 0.08}s`;
                } else {
                    card.classList.remove('filter-show');
                    card.classList.add('filter-hide');
                }
            });
        });
    });
}

// ===== PROJECT CARDS SCROLL ANIMATION =====
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!projectCards.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach(card => observer.observe(card));
}

// ===== PROJECT LOGO FALLBACK =====
function initLogoFallback() {
    const logos = document.querySelectorAll('.project-logo');
    
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            // Fallback to a gradient placeholder with company initial
            const alt = this.alt || 'Project';
            const initial = alt.charAt(0).toUpperCase();
            
            this.style.display = 'none';
            const parent = this.parentElement;
            
            // Create fallback element
            const fallback = document.createElement('div');
            fallback.className = 'logo-fallback';
            fallback.innerHTML = `<span>${initial}</span>`;
            fallback.style.cssText = `
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--gradient);
                border-radius: 50%;
                font-size: 2.5rem;
                font-weight: 800;
                color: #fff;
                box-shadow: 0 10px 30px rgba(108, 99, 255, 0.3);
            `;
            
            parent.appendChild(fallback);
        });
    });
}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilter();
    initProjectAnimations();
    initLogoFallback();
});

// console.log('✅ Projects section loaded!');

// ========================================
// EDUCATION SECTION - ANIMATIONS
// ========================================

function initEducationAnimations() {
    const educationCards = document.querySelectorAll('.education-card');
    
    if (!educationCards.length) return;
    
    // Create intersection observer for education cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add visible class with stagger delay
                const card = entry.target;
                const delay = parseInt(card.dataset.delay) || 0;
                
                setTimeout(() => {
                    card.classList.add('visible');
                }, delay);
                
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each card with stagger delay
    educationCards.forEach((card, index) => {
        card.dataset.delay = index * 150;
        observer.observe(card);
    });
}

// ========================================
// PARALLAX EFFECT ON CARDS (Desktop Only)
// ========================================

function initEducationParallax() {
    const cards = document.querySelectorAll('.education-card');
    const educationSection = document.querySelector('.education');
    
    if (!cards.length || !educationSection) return;
    
    educationSection.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;
        
        const rect = educationSection.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 30;
        const deltaY = (e.clientY - centerY) / 30;
        
        cards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const x = deltaX * speed;
            const y = deltaY * speed;
            
            card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    });
    
    educationSection.addEventListener('mouseleave', () => {
        cards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    });
}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize education animations
    initEducationAnimations();
    
    // Initialize parallax (desktop only)
    if (window.innerWidth > 768) {
        initEducationParallax();
    }
});

// Re-initialize on resize
let eduResizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(eduResizeTimer);
    eduResizeTimer = setTimeout(function() {
        if (window.innerWidth > 768) {
            initEducationParallax();
        }
    }, 300);
});

// ========================================
// PERCENTAGE ANIMATION ON VISIBLE
// ========================================

function animatePercentages() {
    const percentages = document.querySelectorAll('.edu-percentage');
    
    percentages.forEach(percentage => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const value = parseFloat(text);
                    
                    // Skip if already animated
                    if (entry.target.dataset.animated) return;
                    entry.target.dataset.animated = 'true';
                    
                    // Animate from 0 to value
                    let current = 0;
                    const duration = 1500;
                    const step = value / (duration / 16);
                    
                    const counter = setInterval(() => {
                        current += step;
                        if (current >= value) {
                            current = value;
                            clearInterval(counter);
                        }
                        // Format based on if decimal or not
                        if (Number.isInteger(value)) {
                            entry.target.textContent = Math.round(current) + '%';
                        } else {
                            entry.target.textContent = current.toFixed(1) + '%';
                        }
                    }, 16);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(percentage);
    });
}

// Initialize percentage animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animatePercentages, 500);
});

// console.log('✅ Education section animations loaded!');

// ========================================
// CONTACT FORM WITH EMAILJS - FIXED
// ========================================

// Initialize EmailJS with your public key
// Get from: https://www.emailjs.com/ → Account → API Keys
emailjs.init('yIV6RvZSgIFalk5H0'); // Replace with your actual public key

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
        
        // Get form data with proper validation
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');
        
        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';
        
        // Validate
        if (!name || !email || !message) {
            alert('⚠️ Please fill in all fields.');
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
            return;
        }
        
        // Get current date and time
        const now = new Date();
        const dateTime = now.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // console.log('Sending email with data:', { name, email, message, dateTime });
        
        // ========================================
        // SEND EMAIL USING EMAILJS
        // ========================================
        emailjs.send(
            'service_q6egujb',    // Replace with your Service ID
            'template_vdb666b',   // Replace with your Template ID
            {
                // THESE MUST MATCH YOUR EMAILJS TEMPLATE VARIABLES
                from_name: name,           // {{from_name}} in template
                from_email: email,         // {{from_email}} in template
                message: message,          // {{message}} in template
                to_email: 'arunpandi.webdev@gmail.com', // {{to_email}} in template
                time: dateTime,            // {{time}} in template
                name: name,                // {{name}} in template
                email: email,              // {{email}} in template
                subject: `Portfolio Contact: ${name}`, // {{subject}} in template
                title: 'New Portfolio Message' // {{title}} in template
            }
        )
        .then(function(response) {
            // console.log('✅ Email sent successfully!', response);
            showSuccessMessage(contactForm, btn, originalText);
            contactForm.reset();
        })
        .catch(function(error) {
            // console.log('❌ Email failed:', error);
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
            alert('❌ Something went wrong. Please try again later.\nError: ' + error.text);
        });
    });
}

// ========================================
// SUCCESS MESSAGE FUNCTION
// ========================================

function showSuccessMessage(form, btn, originalText) {
    // Remove any existing success messages
    const existingSuccess = document.querySelector('.form-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>✅ Thank you for your message! I'll get back to you soon.</span>
    `;
    
    const formContainer = form.parentElement;
    formContainer.insertBefore(successMessage, form);
    form.style.display = 'none';
    
    btn.innerHTML = originalText;
    btn.disabled = false;
    btn.style.opacity = '1';
    
    setTimeout(() => {
        if (successMessage.parentElement) {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-10px)';
            successMessage.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                if (successMessage.parentElement) {
                    successMessage.remove();
                    form.style.display = 'flex';
                }
            }, 300);
        }
    }, 5000);
}

// console.log('✅ Contact form with EmailJS ready!');

// ===== INPUT VALIDATION =====
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Remove validation on focus
    input.addEventListener('focus', function() {
        this.classList.remove('error');
        this.parentElement.querySelector('.error-message')?.remove();
    });
    
    // Validate on blur
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.classList.add('error');
            // Add error message
            const existingError = this.parentElement.querySelector('.error-message');
            if (!existingError) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'This field is required';
                errorMsg.style.cssText = `
                    color: #FF6584;
                    font-size: 0.75rem;
                    margin-top: 4px;
                    display: block;
                `;
                this.parentElement.appendChild(errorMsg);
            }
        } else {
            this.classList.remove('error');
            this.parentElement.querySelector('.error-message')?.remove();
        }
    });
});

// ===== SUCCESS MESSAGE STYLES =====
// Add this CSS dynamically or in your stylesheet
const style = document.createElement('style');
style.textContent = `
    .form-success {
        background: rgba(0, 255, 136, 0.1);
        border: 1px solid rgba(0, 255, 136, 0.3);
        border-radius: 12px;
        padding: 1rem 1.2rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 1.5rem;
        animation: slideDown 0.4s ease;
        color: #00FF88;
    }
    
    .form-success i {
        font-size: 1.5rem;
    }
    
    .form-success span {
        font-size: 0.95rem;
        font-weight: 500;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #FF6584 !important;
        box-shadow: 0 0 0 4px rgba(255, 101, 132, 0.15) !important;
    }
    
    @media (max-width: 480px) {
        .form-success {
            padding: 0.8rem 1rem;
            font-size: 0.85rem;
        }
        .form-success i {
            font-size: 1.2rem;
        }
        .form-success span {
            font-size: 0.85rem;
        }
    }
`;
document.head.appendChild(style);

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.project-card, .skill-card, .education-card, .timeline-item');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = '0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
    setTimeout(revealOnScroll, 500);
});

// ===== PARALLAX EFFECT =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    shapes.forEach((shape, index) => {
        const speed = 1 + index * 0.5;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== PREVENT DEFAULT CURSOR ON INTERACTIVE ELEMENTS =====
document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.borderColor = 'var(--secondary)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = 'var(--primary)';
    });
});

// ========================================
// FOOTER - DYNAMIC YEAR
// ========================================

function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Update year on load
document.addEventListener('DOMContentLoaded', updateFooterYear);

// Optional: Update year every minute (in case of long-running page)
// setInterval(updateFooterYear, 60000);

// console.log('✅ Footer year updated to:', new Date().getFullYear());

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    const progressCircle = document.querySelector('.progress-ring__circle');
    const progressRing = document.querySelector('.progress-ring');
    
    if (!scrollBtn || !progressCircle) return;
    
    // Store circumference for calculation
    let circumference = 163.36;
    
    // Function to update dimensions based on screen size
    function updateDimensions() {
        const width = window.innerWidth;
        let size, radius;
        
        if (width <= 360) {
            size = 42;
            radius = 18;
            progressCircle.setAttribute('stroke-width', '2');
        } else if (width <= 480) {
            size = 46;
            radius = 20;
            progressCircle.setAttribute('stroke-width', '2.5');
        } else if (width <= 768) {
            size = 52;
            radius = 23;
            progressCircle.setAttribute('stroke-width', '3');
        } else {
            size = 60;
            radius = 26;
            progressCircle.setAttribute('stroke-width', '3');
        }
        
        // Update SVG viewBox
        progressRing.setAttribute('viewBox', `0 0 ${size} ${size}`);
        
        // Update circle dimensions
        const center = size / 2;
        progressCircle.setAttribute('r', radius);
        progressCircle.setAttribute('cx', center);
        progressCircle.setAttribute('cy', center);
        
        // Calculate circumference (2 * PI * r)
        circumference = 2 * Math.PI * radius;
        
        // Update stroke-dasharray and dashoffset
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
    }
    
    // Update progress ring on scroll
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Prevent division by zero
        if (scrollHeight <= 0) return;
        
        const scrollPercent = Math.min(scrollTop / scrollHeight, 1);
        
        // Update progress ring
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;
        
        // Show/hide button
        if (scrollTop > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
    
    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Smooth scroll to top
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateDimensions();
            updateScrollProgress();
        }, 200);
    });
    
    // Initialize
    updateDimensions();
    updateScrollProgress();
}

// ========================================
// SCROLL-TRIGGERED ANIMATIONS
// ========================================

function initScrollAnimations() {
    // Skip on mobile for performance
    if (window.innerWidth <= 768) return;
    
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-text, .about-image, .skill-card, ' +
        '.timeline-item, .project-card, .education-card, ' +
        '.contact-item, .contact-form'
    );
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                if (navLinks) navLinks.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
                
                // Smooth scroll with offset for navbar
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================

function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 150;
                    if (window.scrollY >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========================================
// INITIALIZE ALL ON DOM READY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
    initActiveNavLink();
    
    // console.log('✅ Scroll features initialized!');
});

 