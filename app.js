// Wait for the entire HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Select HTML placeholders ---
    const aboutContainer = document.getElementById('about-container');
    const projectsContainer = document.getElementById('projects-container');
    const experienceContainer = document.getElementById('experience-container');
    const skillsContainer = document.getElementById('skills-container');
    const educationContainer = document.getElementById('education-container'); // <-- Added
    const contactContainer = document.getElementById('contact-container');

    // --- 2. Fetch data from JSON file ---
    fetch('resumeData.json')
        .then(response => {
            if (!response.ok) {
                // Throw an error if the file isn't found
                throw new Error('Data file not found: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // --- 3. Call render functions ---
            // Once data is successfully loaded, call functions to build the HTML
            renderAbout(data.about);
            renderProjects(data.projects);
            renderExperience(data.works);
            renderSkills(data.hardSkills, data.softSkills);
            renderEducation(data.education); // <-- Added
            renderContact(data.about);
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
            // Display an error message to the user on the page
            document.body.innerHTML = `<h1 style="color: red; text-align: center; margin-top: 50px;">Error: Could not load resume data.</h1>`;
        });

    // --- 4. HTML Builder Functions ---
    
    function renderAbout(about) {
        // First, build the HTML for social links
        const socialLinksHTML = about.socialLinks.map(link => `
            <div class="social-link">
                <strong>${link.icon}: </strong>
                ${link.link ? `<a href="${link.link}" target="_blank">${link.value}</a>` : `<span>${link.value}</span>`}
            </div>
        `).join(''); // .join('') converts the array into a single string

        // Now, build the complete HTML for the 'about' section
        const aboutHTML = `
            <div class="card about-section">
                <div class="about-content">
                    <h1>${about.firstname} ${about.lastname}</h1>
                    <h2>${about.jobTitle}</h2>
                    <p>${about.description}</p>
                    <div class="social-links">
                        ${socialLinksHTML}
                    </div>
                </div>
                <div class="about-image">
                    <img src="${about.image}" alt="${about.firstname} ${about.lastname}">
                </div>
            </div>
        `;
        // Inject the built HTML into its container
        aboutContainer.innerHTML = aboutHTML;
    }

    function renderProjects(projects) {
        // Map over each project item and create a card for it
        const projectsGridHTML = projects.items.map(project => `
            <div class="card project-card">
                <h3>${project.title}</h3>
                <span class="role-badge">${project.role}</span>
                <p>${project.description}</p>
                <div class="skills-list">
                    ${project.hardSkills.map(skill => `<span class="skill-tag">${skill.title}</span>`).join('')}
                </div>
            </div>
        `).join('');

        // Inject the project cards into the main container
        projectsContainer.innerHTML = `
            <h2>My Projects</h2>
            <div class="grid-container">
                ${projectsGridHTML}
            </div>
        `;
    }

    function renderExperience(works) {
        // Map over each work item
        const experienceHTML = works.items.map(work => `
            <div class="card timeline-item">
                <h3>${work.jobTitle} @ ${work.title}</h3>
                <span class="date-badge">
                    ${work.date.start} - ${work.date.finish || 'Present'}
                </span>
                <p>${work.description}</p>
                <div class="skills-list">
                    ${work.hardSkills.map(skill => `<span class="skill-tag">${skill.title}</span>`).join('')}
                </div>
            </div>
        `).join('');

        // Inject the work items into the main container
        experienceContainer.innerHTML = `
            <h2>${works.title}</h2>
            <div class="timeline">
                ${experienceHTML}
            </div>
        `;
    }

    function renderSkills(hardSkills, softSkills) {
        // Build HTML for hard skills
        const hardSkillsHTML = hardSkills.items.map(skill => 
            `<span class="skill-tag large">${skill.title}</span>`
        ).join('');

        // Build HTML for soft skills
        const softSkillsHTML = softSkills.items.map(skill => 
            `<li>${skill}</li>`
        ).join('');

        // Inject both into the main skills container
        skillsContainer.innerHTML = `
            <div class="grid-container skills-section">
                <div class="card">
                    <h3>${hardSkills.title}</h3>
                    <div class="skills-list">
                        ${hardSkillsHTML}
                    </div>
                </div>
                <div class="card">
                    <h3>${softSkills.title}</h3>
                    <ul class="soft-skills-list">
                        ${softSkillsHTML}
                    </ul>
                </div>
            </div>
        `;
    }

    function renderContact(about) {
        // Find the email from the 'about' data
        const emailLink = about.socialLinks.find(link => link.icon === 'mail');
        const email = emailLink ? emailLink.value : '';

        // Build the contact section HTML
        contactContainer.innerHTML = `
            <div class="card contact-section">
                <h2>Let's Work Together</h2>
                <p>
                    I am currently available for freelance opportunities. 
                    If you have a challenge in mind, especially in Data Science or NLP, 
                    I'd love to hear about it.
                </p>
                ${email ? `<a href="mailto:${email}" class="cta-button">Get in Touch</a>` : ''}
            </div>
        `;
    }

    // --- This function is new ---
    function renderEducation(education) {
        const educationHTML = education.items.map(edu => `
            <div class="card timeline-item">
                <h3>${edu.name}</h3>
                <span class="date-badge">
                    ${edu.date.start} - ${edu.date.finish}
                </span>
                <p>${edu.grade} in ${edu.science}</p>
            </div>
        `).join('');
    
        educationContainer.innerHTML = `
            <h2>${education.title}</h2>
            <div class="timeline">
                ${educationHTML}
            </div>
        `;
    }
});