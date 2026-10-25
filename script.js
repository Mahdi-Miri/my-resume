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

    /* ---- Scroll progress ---- */
    const bar = document.getElementById('progress-bar');

    const updateProgress = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            updateProgress();
            ticking = false;
        });
    }, { passive: true });
    updateProgress();

    /* ---- Active chapter ---- */
    const links = Array.from(document.querySelectorAll('.chapters a'));
    const sections = links
        .map(a => document.getElementById(a.dataset.ch))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                links.forEach(a => a.classList.remove('active'));
                const match = links.find(a => a.dataset.ch === entry.target.id);
                if (match) match.classList.add('active');
            });
        }, { rootMargin: '-20% 0px -70% 0px' });

        sections.forEach(s => spy.observe(s));
    }
});
