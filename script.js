/* ============================================================
   Raviteja Ungarala — Portfolio  |  Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Scroll progress bar ── */
    const progress = document.getElementById('scrollProgress');
    const header = document.querySelector('.header');

    const onScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        if (header) header.classList.toggle('sticky', scrollTop > 40);
        highlightNav();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Custom cursor (desktop only) ── */
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
        let rx = 0, ry = 0, mx = 0, my = 0;
        window.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top = my + 'px';
        });
        const loop = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
            requestAnimationFrame(loop);
        };
        loop();
        document.querySelectorAll('a, button, .portfolio-box, .skill-card').forEach(el => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });
    } else if (dot && ring) {
        dot.style.display = ring.style.display = 'none';
    }

    /* ── Mobile menu ── */
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    menuToggle?.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });
    document.querySelectorAll('.navbar a').forEach(a =>
        a.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            icon?.classList.add('fa-bars');
            icon?.classList.remove('fa-xmark');
        })
    );

    /* ── Typed.js roles ── */
    if (window.Typed) {
        new Typed('.multiple-text', {
            strings: ['Full Stack AI Developer', 'LLM &amp; RAG Engineer', 'AI Agent Builder', 'React Developer', 'FastAPI Backend Developer', 'Cloud Enthusiast'],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1400,
            loop: true
        });
    }

    /* ── Scroll reveal via IntersectionObserver (with stagger) ── */
    const revealEls = document.querySelectorAll('.reveal');
    const groupTimers = new WeakMap();
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const parent = el.parentElement;
                // stagger siblings within the same container
                const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
                const idx = siblings.indexOf(el);
                el.style.transitionDelay = (idx > 0 ? Math.min(idx, 6) * 0.08 : 0) + 's';
                el.classList.add('visible');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));

    /* ── Animated counters ── */
    const counters = document.querySelectorAll('.stat-num');
    const counterIO = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const decimals = parseInt(el.dataset.decimals || '0', 10);
            const suffix = el.dataset.suffix || '';
            const duration = 1600;
            const start = performance.now();
            const tick = (now) => {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                const val = target * eased;
                el.textContent = (decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString()) + suffix;
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = (decimals ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterIO.observe(c));

    /* ── Active nav highlight on scroll ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    function highlightNav() {
        let current = '';
        const pos = window.scrollY + 140;
        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
                current = sec.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }

    /* ── Portfolio filtering ── */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-box');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            portfolioItems.forEach(item => {
                const match = filter === 'all' || item.dataset.category === filter;
                if (match) {
                    item.style.display = '';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });
    portfolioItems.forEach(i => { i.style.transition = 'opacity .35s ease, transform .35s ease'; });

    /* ── Contact form ── */
    const form = document.querySelector('.contact-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#16a34a';
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            form.reset();
        }, 2500);
    });

    /* ── Smooth anchor scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id.length <= 1) return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ── Subtle parallax on hero image ── */
    const frame = document.querySelector('.profile-frame');
    if (frame && window.matchMedia('(pointer: fine)').matches) {
        const hero = document.querySelector('.home');
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 16;
            const y = (e.clientY / window.innerHeight - 0.5) * 16;
            frame.style.transform = `translate(${x}px, ${y}px)`;
        });
        hero.addEventListener('mouseleave', () => { frame.style.transform = ''; });
    }

    onScroll();
});
