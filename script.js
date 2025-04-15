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
    strings:['UI/UX Designer', 'Web Developer', 'Mobile App Developer', 'Brand Designer', 
 'AI/ML Developer', 'Data Scientist', 'Cybersecurity Analyst', 
 'Computer Vision Engineer', 'Chatbot Developer', 'Backend Developer', 'Cloud Enthusiast'],
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
sr.reveal('.home-img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form, .certifications-container, .achievements-container, .publications-container', {
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

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Modal
const projectModal = document.querySelector('.project-modal');
const modalClose = document.querySelector('.close-modal');
const detailButtons = document.querySelectorAll('.project-details-btn');
const modalTitle = document.querySelector('.modal-title');
const modalCategory = document.querySelector('.project-category');
const modalDate = document.querySelector('.project-date');
const modalMainImage = document.querySelector('.main-image img');
const modalThumbnails = document.querySelectorAll('.thumbnail img');
const modalDescription = document.querySelector('.project-description');
const modalTechList = document.querySelector('.tech-list');
const modalFeatureList = document.querySelector('.feature-list');
const modalDemoLink = document.querySelector('.modal-links a:first-child');
const modalCodeLink = document.querySelector('.modal-links a:last-child');

// Sample project data
const projects = {
    'ecommerce': {
        title: 'E-Commerce Platform',
        category: 'Web Development',
        date: '2023',
        description: '<p>This e-commerce platform was developed for a fashion retailer looking to modernize their online presence. The project involved complete redesign of their existing website with a focus on improving user experience and increasing conversions.</p><p>Key challenges included implementing a seamless checkout process and integrating with their existing inventory management system. The result was a 30% increase in conversion rates and significantly reduced cart abandonment.</p>',
        technologies: ['React.js', 'Node.js', 'MongoDB', 'Redux', 'Stripe API'],
        features: ['Product catalog with filters', 'User accounts and profiles', 'Secure checkout process', 'Admin dashboard', 'Responsive design'],
        demoLink: 'https://example.com',
        codeLink: 'https://github.com',
        images: [
            'https://via.placeholder.com/800x500',
            'https://via.placeholder.com/800x500',
            'https://via.placeholder.com/800x500'
        ]
    },
    'fitness': {
        title: 'Health & Fitness App',
        category: 'Mobile App',
        date: '2022',
        description: '<p>A comprehensive fitness tracking application that allows users to log workouts, track nutrition, and connect with friends. The app was designed to motivate users through social features and personalized recommendations.</p><p>The development process included creating custom animations for workout demonstrations and implementing secure user authentication. The app has been downloaded over 50,000 times with a 4.8-star rating.</p>',
        technologies: ['React Native', 'Firebase', 'Google Fit API', 'Apple HealthKit'],
        features: ['Workout tracking', 'Nutrition logging', 'Social feed', 'Progress analytics', 'Personalized recommendations'],
        demoLink: 'https://example.com',
        codeLink: 'https://github.com',
        images: [
            'https://via.placeholder.com/800x500',
            'https://via.placeholder.com/800x500',
            'https://via.placeholder.com/800x500'
        ]
    }
};

// Open modal with project details
detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.closest('.portfolio-box').getAttribute('data-id') || 'ecommerce';
        const project = projects[projectId];
        
        // Set modal content
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalDate.textContent = project.date;
        modalDescription.innerHTML = project.description;
        
        // Set technologies
        modalTechList.innerHTML = '';
        project.technologies.forEach(tech => {
            modalTechList.innerHTML += `<li>${tech}</li>`;
        });
        
        // Set features
        modalFeatureList.innerHTML = '';
        project.features.forEach(feature => {
            modalFeatureList.innerHTML += `<li>${feature}</li>`;
        });
        
        // Set links
        modalDemoLink.setAttribute('href', project.demoLink);
        modalCodeLink.setAttribute('href', project.codeLink);
        
        // Set images
        modalMainImage.setAttribute('src', project.images[0]);
        modalMainImage.setAttribute('alt', project.title);
        
        modalThumbnails.forEach((thumb, index) => {
            if (project.images[index]) {
                thumb.setAttribute('src', project.images[index]);
                thumb.setAttribute('alt', `${project.title} - Screenshot ${index + 1}`);
                thumb.parentElement.style.display = 'block';
            } else {
                thumb.parentElement.style.display = 'none';
            }
        });
        
        // Activate first thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        document.querySelector('.thumbnail').classList.add('active');
        
        // Show modal
        document.body.style.overflow = 'hidden';
        projectModal.classList.add('active');
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    projectModal.classList.remove('active');
});

// Close modal when clicking outside content
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        document.body.style.overflow = 'auto';
        projectModal.classList.remove('active');
    }
});

// Thumbnail click event
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const imgSrc = thumb.querySelector('img').getAttribute('src');
        modalMainImage.setAttribute('src', imgSrc);
        
        document.querySelectorAll('.thumbnail').forEach(t => {
            t.classList.remove('active');
        });
        thumb.classList.add('active');
    });
});

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
