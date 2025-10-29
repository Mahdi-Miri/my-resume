// app.js
// Comments in English.
// This script populates sections from resumeData.json (or a fallback embedded JSON),
// manages light/dark theme toggle (persisted in localStorage), and provides basic UI behaviors.

document.addEventListener('DOMContentLoaded', async () => {
  // --- Elements ---
  const aboutContainer = document.getElementById('about-container');
  const projectsContainer = document.getElementById('projects-container');
  const experienceContainer = document.getElementById('experience-container');
  const skillsContainer = document.getElementById('skills-container');
  const educationContainer = document.getElementById('education-container');
  const contactContainer = document.getElementById('contact-container');

  const themeToggle = document.getElementById('theme-toggle');
  const downloadBtn = document.getElementById('download-cv');
  const contactCta = document.getElementById('contact-cta');

  // --- Theme management ---
  const THEME_KEY = 'mm_theme_pref';

  function applyTheme(theme) {
    if (theme === 'light') document.body.classList.add('light-theme');
    else document.body.classList.remove('light-theme');
  }

  // load persisted theme or use system preference fallback
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) applyTheme(saved);
  else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  // toggle button
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
  });

  // --- Load data (JSON) with fallback for file:// ---
  let data = null;
  try {
    const resp = await fetch('resumeData.json');
    if (!resp.ok) throw new Error('resumeData.json not found on server');
    data = await resp.json();
  } catch (err) {
    console.warn('Fetch failed, using embedded fallback:', err);
    const fallback = document.getElementById('fallback-data');
    try {
      data = JSON.parse(fallback.textContent);
    } catch (e) {
      console.error('Fallback JSON parsing failed.', e);
      aboutContainer.innerHTML = '<div class="card"><p style="color:tomato">Error loading data.</p></div>';
      return;
    }
  }

  // set some quick actions
  if (data.about && data.about.socialLinks) {
    const emailItem = data.about.socialLinks.find(x => x.icon === 'mail');
    if (emailItem) contactCta.href = `mailto:${emailItem.value}`;
    // provide a simple "resume" download by creating a text-based CV
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const resumeText = generatePlainTextResume(data);
      const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'Mahdi-Miri-CV.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  // --- Render sections ---
  renderAbout(data.about);
  if (data.projects) renderProjects(data.projects);
  if (data.works) renderExperience(data.works);
  if (data.hardSkills && data.softSkills) renderSkills(data.hardSkills, data.softSkills);
  if (data.education) renderEducation(data.education);
  renderContact(data.about);

  // --- Render functions ---

  function renderAbout(about) {
    // Build social links
    const socials = (about.socialLinks || []).map(s => {
      const content = s.link ? `<a href="${s.link}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.value)}</a>` : escapeHtml(s.value);
      return `<div class="meta">${escapeHtml(s.icon)}: ${content}</div>`;
    }).join('');

    const html = `
      <div class="card about-left">
        <h1>${escapeHtml(about.firstname)} ${escapeHtml(about.lastname)}</h1>
        <h2>${escapeHtml(about.jobTitle)}</h2>
        <p class="meta">${escapeHtml(about.description)}</p>
        ${socials}
      </div>
      <div class="about-right">
        <img class="profile-img" src="${about.image}" alt="${escapeHtml(about.firstname)} ${escapeHtml(about.lastname)}"
             onerror="this.src='assets/images/profile.jpg'; this.style.border='4px solid rgba(155,92,255,0.12)';">
      </div>
    `;
    aboutContainer.innerHTML = html;
  }

  function renderProjects(projects) {
    const items = (projects.items || []).map(p => `
      <div class="card">
        <h3>${escapeHtml(p.title)}</h3>
        <div class="meta">${escapeHtml(p.role)}</div>
        <p>${escapeHtml(p.description)}</p>
        <div>${(p.hardSkills || []).map(s => `<span class="skill-tag">${escapeHtml(s.title)}</span>`).join(' ')}</div>
      </div>
    `).join('');
    projectsContainer.innerHTML = `<div class="card"><h3>Projects</h3><div class="grid-2">${items}</div></div>`;
  }

  function renderExperience(works) {
    const items = (works.items || []).map(w => `
      <div class="card">
        <h3>${escapeHtml(w.jobTitle)} — ${escapeHtml(w.title)}</h3>
        <div class="meta">${escapeHtml(w.date.start)} - ${escapeHtml(w.date.finish || 'Present')}</div>
        <p>${escapeHtml(w.description)}</p>
        <div>${(w.hardSkills || []).map(s => `<span class="skill-tag">${escapeHtml(s.title)}</span>`).join(' ')}</div>
      </div>
    `).join('');
    experienceContainer.innerHTML = `<div class="card"><h3>${escapeHtml(works.title)}</h3>${items}</div>`;
  }

  function renderSkills(hardSkills, softSkills) {
    const hard = (hardSkills.items || []).map(h => `<span class="skill-tag">${escapeHtml(h.title)}</span>`).join(' ');
    const soft = (softSkills.items || []).map(s => `<li>${escapeHtml(s)}</li>`).join('');
    skillsContainer.innerHTML = `
      <div class="card">
        <h3>${escapeHtml(hardSkills.title)}</h3>
        <div>${hard}</div>
      </div>
      <div class="card">
        <h3>${escapeHtml(softSkills.title)}</h3>
        <ul>${soft}</ul>
      </div>
    `;
  }

  function renderEducation(education) {
    const items = (education.items || []).map(e => `
      <div class="card">
        <h3>${escapeHtml(e.name)}</h3>
        <div class="meta">${escapeHtml(e.date.start)} - ${escapeHtml(e.date.finish)}</div>
        <p>${escapeHtml(e.grade)} in ${escapeHtml(e.science)}</p>
      </div>
    `).join('');
    educationContainer.innerHTML = `<div class="card"><h3>${escapeHtml(education.title)}</h3>${items}</div>`;
  }

  function renderContact(about) {
    const mail = (about.socialLinks || []).find(s => s.icon === 'mail');
    contactContainer.innerHTML = `
      <div class="card contact-box">
        <h3>Let's Work Together</h3>
        <p>I am available for freelance and research collaborations. Reach out for NLP, Deep Learning, or Data Science projects.</p>
        ${mail ? `<p class="meta">Email: <a href="mailto:${mail.value}">${mail.value}</a></p>` : ''}
      </div>
    `;
  }

  // --- Utilities ---
  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function generatePlainTextResume(d){
    // Create a simple plain-text CV to download quickly
    const a = d.about || {};
    const lines = [];
    lines.push(`${a.firstname || ''} ${a.lastname || ''}`);
    lines.push(`${a.jobTitle || ''}`);
    lines.push('');
    lines.push('Contact:');
    (a.socialLinks || []).forEach(s => lines.push(` - ${s.icon}: ${s.value}${s.link ? ' ('+s.link+')' : ''}`));
    lines.push('');
    if (d.works && d.works.items) {
      lines.push('Experience:');
      d.works.items.forEach(w => {
        lines.push(`- ${w.jobTitle} @ ${w.title} (${w.date.start} - ${w.date.finish || 'Present'})`);
        lines.push(`  ${w.description}`);
      });
    }
    if (d.projects && d.projects.items){
      lines.push('');
      lines.push('Projects:');
      d.projects.items.forEach(p => {
        lines.push(`- ${p.title}: ${p.description}`);
      });
    }
    return lines.join('\n');
  }
});

