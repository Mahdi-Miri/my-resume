// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 24,
        behavior: 'smooth'
      });
    });
  });

  // Simple active link on scroll
  const sections = Array.from(document.querySelectorAll('section'));
  const navLinks = document.querySelectorAll('.nav a');

  function onScroll() {
    const scrollPos = window.scrollY + window.innerHeight * 0.15;
    let current = sections[0];
    for (const s of sections) {
      if (s.offsetTop <= scrollPos) current = s;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current.id}`));
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
});
