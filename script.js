document.addEventListener('DOMContentLoaded', () => {

    // --- Theme toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const modeLabel = themeToggle.querySelector('.mode-label');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        modeLabel.textContent = 'light';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        modeLabel.textContent = isDark ? 'light' : 'dark';
        localStorage.setItem('theme', isDark ? 'dark-mode' : 'light-mode');
    });

    // --- Mobile nav ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // --- Subtle, single-style reveal for timeline and project rows ---
    const revealTargets = document.querySelectorAll('.timeline-item, .project-row');
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => observer.observe(el));
});