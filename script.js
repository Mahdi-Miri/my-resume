// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Select elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Toggle theme logic
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Check if dark mode is active and update icon/storage
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Simple scroll reveal animation (Optional)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.project-card, .timeline-item');
    hiddenElements.forEach((el) => observer.observe(el));
});
