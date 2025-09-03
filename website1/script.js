// Smooth scrolling for navigation links
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

// Navbar scroll effect handled in throttled scroll below

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate stats when they come into view
            if (entry.target.classList.contains('stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .stat-card, .timeline-item, .detail-card, .stats');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// Typing animation for hero stats
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Enhanced floating shapes animation
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        hero.querySelector('.hero-background').appendChild(particle);
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Interactive feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// Dynamic gradient animation for hero title
function animateGradient() {
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            gradientText.style.background = `linear-gradient(45deg, 
                hsl(${hue}, 70%, 60%), 
                hsl(${(hue + 60) % 360}, 70%, 60%), 
                hsl(${(hue + 120) % 360}, 70%, 60%), 
                hsl(${(hue + 180) % 360}, 70%, 60%))`;
            gradientText.style.backgroundSize = '300% 300%';
            gradientText.style.webkitBackgroundClip = 'text';
            gradientText.style.webkitTextFillColor = 'transparent';
        }, 100);
    }
}

// Code window typing effect
function startCodeTyping() {
    const codeLines = [
        "Analyzing your codebase...",
        "Understanding context...",
        "Generating optimized solution...",
        "Applying best practices...",
        "Ready to assist!"
    ];
    
    const codeText = document.querySelector('.typing-animation');
    let lineIndex = 0;
    
    function typeLine() {
        if (lineIndex < codeLines.length) {
            typeWriter(codeText, codeLines[lineIndex], 50);
            lineIndex++;
            setTimeout(typeLine, 3000);
        } else {
            lineIndex = 0;
            setTimeout(typeLine, 2000);
        }
    }
    
    setTimeout(typeLine, 1000);
}

// Button click effects
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    createFloatingParticles();
    animateGradient();
    startCodeTyping();

    // Wire external links
    const openInNewTab = (url) => window.open(url, '_blank', 'noopener,noreferrer');
    const dlNav = document.getElementById('btn-download-nav');
    const dlHero = document.getElementById('btn-download-hero');
    const dlCta = document.getElementById('btn-download-cta');
    const demoHero = document.getElementById('btn-demo-hero');
    const visitSite = document.getElementById('btn-visit-site');

    // Demo disclaimer banner: show/hide with persistence
    const disclaimer = document.getElementById('demo-disclaimer');
    const dismissBtn = document.getElementById('dismiss-disclaimer');
    const DISMISS_KEY = 'demoDisclaimerDismissed';
    try {
        if (localStorage.getItem(DISMISS_KEY) === 'true' && disclaimer) {
            disclaimer.style.display = 'none';
        }
    } catch (_) { /* ignore storage errors */ }
    if (dismissBtn && disclaimer) {
        dismissBtn.addEventListener('click', () => {
            disclaimer.style.display = 'none';
            try { localStorage.setItem(DISMISS_KEY, 'true'); } catch (_) {}
        });
    }

    const downloadUrl = 'https://windsurf.com/editor/download';
    const demoUrl = 'https://windsurf.com/editor';
    const siteUrl = 'https://windsurf.com/';

    dlNav && dlNav.addEventListener('click', () => openInNewTab(downloadUrl));
    dlHero && dlHero.addEventListener('click', () => openInNewTab(downloadUrl));
    dlCta && dlCta.addEventListener('click', () => openInNewTab(downloadUrl));
    demoHero && demoHero.addEventListener('click', () => openInNewTab(demoUrl));
    visitSite && visitSite.addEventListener('click', () => openInNewTab(siteUrl));

    // Removed body fade-in to prevent flashing/pop-in
});

// Scroll-triggered animations for timeline
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Add slide-in animation CSS
const timelineStyle = document.createElement('style');
timelineStyle.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .timeline-item {
        opacity: 0;
    }
`;
document.head.appendChild(timelineStyle);

// Interactive navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active nav link styles
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Navbar effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 16);

window.addEventListener('scroll', throttledScroll);
