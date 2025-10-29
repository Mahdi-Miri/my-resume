document.addEventListener('DOMContentLoaded', async () => {
  const aboutContainer = document.getElementById('about-container');
  const projectsContainer = document.getElementById('projects-container');
  const experienceContainer = document.getElementById('experience-container');
  const skillsContainer = document.getElementById('skills-container');
  const educationContainer = document.getElementById('education-container');
  const contactContainer = document.getElementById('contact-container');

  let data = null;

  try {
    // Try to fetch the JSON (works in server mode)
    const response = await fetch('resumeData.json');
    if (!response.ok) throw new Error('resumeData.json not found');
    data = await response.json();
  } catch (error) {
    console.warn('⚠️ Fetch failed — using fallback JSON data.', error);
    // Fallback: Load data from inline script
    const fallbackScript = document.getElementById('fallback-data');
    data = JSON.parse(fallbackScript.textContent);
  }

  // Render each section
  renderAbout(data.about);
  if (data.projects) renderProjects(data.projects);
  if (data.works) renderExperience(data.works);
  if (data.hardSkills && data.softSkills)
    renderSkills(data.hardSkills, data.softSkills);
  if (data.education) renderEducation(data.education);
  renderContact(data.about);

  // ---------- RENDER FUNCTIONS ----------

  // About section
  function renderAbout(about) {
    const socialLinksHTML = about.socialLinks
      .map(
        link => `
        <div class="social-link">
          <strong>${link.icon}: </strong>
          ${
            link.link
              ? `<a href="${link.link}" target="_blank" rel="noopener noreferrer">${link.value}</a>`
              : `<span>${link.value}</span>`
          }
        </div>
      `
      )
      .join('');

    const aboutHTML = `
      <div class="card about-section">
        <div class="about-content">
          <h1>${about.firstname} ${about.lastname}</h1>
          <h2>${about.jobTitle}</h2>
          <p>${about.description}</p>
          <div class="social-links">${socialLinksHTML}</div>
        </div>
        <div class="about-image">
          <img src="${about.image}" alt="${about.firstname} ${about.lastname}" 
               onerror="this.src='assets/images/profile.jpg'; this.alt='Profile Image';">
        </div>
      </div>
    `;
    aboutContainer.innerHTML = aboutHTML;
  }

  // Projects
  function renderProjects(projects) {
    const projectsGridHTML = projects.items
      .map(
        project => `
        <div class="card project-card">
          <h3>${project.title}</h3>
          <span class="role-badge">${project.role}</span>
          <p>${project.description}</p>
          <div class="skills-list">
            ${project.hardSkills
              .map(skill => `<span class="skill-tag">${skill.title}</span>`)
              .join('')}
          </div>
        </div>
      `
      )
      .join('');

    projectsContainer.innerHTML = `
      <h2>My Projects</h2>
      <div class="grid-container">${projectsGridHTML}</div>
    `;
  }

  // Experience
  function renderExperience(works) {
    const experienceHTML = works.items
      .map(
        work => `
        <div class="card timeline-item">
          <h3>${work.jobTitle} @ ${work.title}</h3>
          <span class="date-badge">${work.date.start} - ${work.date.finish || 'Present'}</span>
          <p>${work.description}</p>
          <div class="skills-list">
            ${work.hardSkills
              .map(skill => `<span class="skill-tag">${skill.title}</span>`)
              .join('')}
          </div>
        </div>
      `
      )
      .join('');

    experienceContainer.innerHTML = `
      <h2>${works.title}</h2>
      <div class="timeline">${experienceHTML}</div>
    `;
  }

  // Skills
  function renderSkills(hardSkills, softSkills) {
    const hardSkillsHTML = hardSkills.items
      .map(skill => `<span class="skill-tag large">${skill.title}</span>`)
      .join('');
    const softSkillsHTML = softSkills.items.map(skill => `<li>${skill}</li>`).join('');

    skillsContainer.innerHTML = `
      <div class="grid-container skills-section">
        <div class="card">
          <h3>${hardSkills.title}</h3>
          <div class="skills-list">${hardSkillsHTML}</div>
        </div>
        <div class="card">
          <h3>${softSkills.title}</h3>
          <ul class="soft-skills-list">${softSkillsHTML}</ul>
        </div>
      </div>
    `;
  }

  // Education
  function renderEducation(education) {
    const educationHTML = education.items
      .map(
        edu => `
        <div class="card timeline-item">
          <h3>${edu.name}</h3>
          <span class="date-badge">${edu.date.start} - ${edu.date.finish}</span>
          <p>${edu.grade} in ${edu.science}</p>
        </div>
      `
      )
      .join('');

    educationContainer.innerHTML = `
      <h2>${education.title}</h2>
      <div class="timeline">${educationHTML}</div>
    `;
  }

  // Contact
  function renderContact(about) {
    const emailLink = about.socialLinks.find(link => link.icon === 'mail');
    const email = emailLink ? emailLink.value : '';
    contactContainer.innerHTML = `
      <div class="card contact-section">
        <h2>Let's Work Together</h2>
        <p>
          I am currently available for freelance opportunities.
          If you have a challenge in mind, especially in Data Science or NLP, I'd love to hear about it.
        </p>
        ${
          email
            ? `<a href="mailto:${email}" class="cta-button">Get in Touch</a>`
            : ''
        }
      </div>
    `;
  }
});
