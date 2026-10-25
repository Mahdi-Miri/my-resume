document.addEventListener('DOMContentLoaded', () => {

    /* ---- Theme ---- */
    const toggle = document.getElementById('theme-toggle');
    const label = document.getElementById('mode-label');
    const body = document.body;

    const setLabel = () => {
        label.textContent = body.classList.contains('dark-mode') ? 'Light' : 'Dark';
    };

    if (localStorage.getItem('theme') === 'dark-mode') {
        body.classList.add('dark-mode');
    }
    setLabel();

    toggle.addEventListener('click', () => {
        const dark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', dark ? 'dark-mode' : 'light-mode');
        setLabel();
    });

    /* ---- Active section in rail ---- */
    const links = Array.from(document.querySelectorAll('.rail-nav a'));
    const sections = links
        .map(a => document.getElementById(a.dataset.target))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                links.forEach(a => a.classList.remove('active'));
                const match = links.find(a => a.dataset.target === entry.target.id);
                if (match) match.classList.add('active');
            });
        }, { rootMargin: '-25% 0px -65% 0px' });

        sections.forEach(s => spy.observe(s));
    }
});
