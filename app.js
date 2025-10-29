// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Resume rendering logic
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme();
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  fetch("resumeData.json")
    .then((res) => res.json())
    .then((data) => {
      renderAbout(data.about);
      renderProjects(data.projects);
      renderExperience(data.works);
      renderSkills(data.hardSkills, data.softSkills);
      renderEducation(data.education);
      renderContact(data.about);
    })
    .catch((err) => console.error("Error loading JSON:", err));

  // Render About Section
  function renderAbout(about) {
    const aboutHTML = `
      <div class="card about-section">
        <div class="about-image">
          <img src="${about.image}" alt="${about.firstname} ${about.lastname}">
        </div>
        <div class="about-content">
          <h1>${about.firstname} ${about.lastname}</h1>
          <h3>${about.jobTitle}</h3>
          <p>${about.description}</p>
          <div class="social-buttons">
            <a class="social-btn" href="https://www.linkedin.com/in/mahdimi-miri-dev" target="_blank">
              <i class="fab fa-linkedin"></i> LinkedIn
            </a>
            <a class="social-btn" href="https://github.com/Mahdi-Miri" target="_blank">
              <i class="fab fa-github"></i> GitHub
            </a>
            <a class="social-btn" href="mailto:mahdimiri7@gmail.com">
              <i class="fas fa-envelope"></i> Email
            </a>
            <a class="social-btn" href="tel:+393517867567">
              <i class="fas fa-phone"></i> Call
            </a>
          </div>
        </div>
      </div>
    `;
    document.getElementById("about-container").innerHTML = aboutHTML;
  }

  function renderProjects(projects) {
    const html = projects.items
      .map(
        (p) => `
        <div class="card">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="skills-list">
            ${p.hardSkills.map((s) => `<span class="skill-tag">${s.title}</span>`).join("")}
          </div>
        </div>`
      )
      .join("");
    document.getElementById("projects-container").innerHTML = `<h2>Projects</h2>${html}`;
  }

  function renderExperience(works) {
    const html = works.items
      .map(
        (w) => `
        <div class="card timeline-item">
          <h3>${w.jobTitle} @ ${w.title}</h3>
          <p>${w.description}</p>
        </div>`
      )
      .join("");
    document.getElementById("experience-container").innerHTML = `<h2>${works.title}</h2>${html}`;
  }

  function renderSkills(hardSkills, softSkills) {
    const hardHTML = hardSkills.items.map((s) => `<span class="skill-tag">${s.title}</span>`).join("");
    const softHTML = softSkills.items.map((s) => `<li>${s}</li>`).join("");
    document.getElementById("skills-container").innerHTML = `
      <h2>Skills</h2>
      <div class="card">
        <h3>${hardSkills.title}</h3>
        <div class="skills-list">${hardHTML}</div>
      </div>
      <div class="card">
        <h3>${softSkills.title}</h3>
        <ul>${softHTML}</ul>
      </div>
    `;
  }

  function renderEducation(education) {
    const html = education.items
      .map(
        (e) => `
        <div class="card timeline-item">
          <h3>${e.name}</h3>
          <p>${e.grade} in ${e.science}</p>
        </div>`
      )
      .join("");
    document.getElementById("education-container").innerHTML = `<h2>${education.title}</h2>${html}`;
  }

  function renderContact(about) {
    document.getElementById("contact-container").innerHTML = `
      <div class="card contact-section">
        <h2>Let's Work Together</h2>
        <p>Open for freelance or research-based collaborations in Data Science and NLP.</p>
      </div>`;
  }
});

