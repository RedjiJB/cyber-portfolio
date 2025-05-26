// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggling functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme based on stored preference, default is dark
    // Only switch to light theme if explicitly set in localStorage
    if (storedTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        // Ensure dark theme is set as default
        localStorage.setItem('theme', 'dark');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        
        // Toggle icon
        if (body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
            
            // Update particles color for light theme
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.particles.color.value = '#00bfbf';
                window.pJSDom[0].pJS.particles.line_linked.color = '#00bfbf';
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
            
            // Update particles color for dark theme
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.particles.color.value = '#00bfbf';
                window.pJSDom[0].pJS.particles.line_linked.color = '#00bfbf';
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        }
    });

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00bfbf'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00bfbf',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            const sections = document.querySelectorAll('.resume-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the target section
            const targetSection = document.getElementById(this.getAttribute('data-section'));
            targetSection.classList.add('active');
        });
    });
    
    // Initialize skill bars animation
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.classList.contains('expert') ? '95%' : 
                                          entry.target.classList.contains('advanced') ? '85%' : '75%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
    
    // Add animations to cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .interest-card, .education-item');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
    
    // Add animations to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        timelineObserver.observe(item);
    });
    
    // Print resume functionality
    const printButton = document.getElementById('print-resume');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
}); 