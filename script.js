// Custom Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('active');
});

document.querySelectorAll('.navbar a').forEach(n => 
    n.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
    })
);

// Typed.js for multiple text animation
const typed = new Typed('.multiple-text', {
    strings: ['AI', 'Web Developer', 'Mobile App Developer', 'UI/UX Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Scroll Reveal Animation
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

sr.reveal('.home-content, .heading', {});
sr.reveal('.home-img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', {
    delay: 200,
    origin: 'bottom'
});
sr.reveal('.home-content h1, .about-img', {
    delay: 200,
    origin: 'left'
});
sr.reveal('.home-content p, .about-content', {
    delay: 200,
    origin: 'right'
});

// Testimonial slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;

function showSlide(n) {
    testimonialSlides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides[currentSlide].style.display = 'flex';
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Initialize first slide
showSlide(0);

// Form submission
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Timeline animation
const containers = document.querySelectorAll('.container');

function checkTimeline() {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    containers.forEach(container => {
        const containerTop = container.getBoundingClientRect().top;
        
        if(containerTop < triggerBottom) {
            container.style.opacity = '1';
            container.style.transform = 'translateX(0)';
        }
    });
}

// Set initial state
containers.forEach((container, index) => {
    container.style.opacity = '0';
    if(index % 2 === 0) {
        container.style.transform = 'translateX(-100px)';
    } else {
        container.style.transform = 'translateX(100px)';
    }
    container.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', checkTimeline);
checkTimeline(); // Run once on load
