import React from 'react';
import { Project } from '../interfaces/resumeData';

interface Props {
  data: {
    items: Project[];
  };
}

const Projects: React.FC<Props> = ({ data }) => {
  return (
    <section id="projects">
      <h2>My Projects</h2>
      <div className="grid-container">
        {data.items.map((project) => (
          <div key={project.title} className="card project-card">
            <h3>{project.title}</h3>
            <span className="role-badge">{project.role}</span>
            <p>{project.description}</p>
            <div className="skills-list">
              {project.hardSkills.map((skill) => (
                <span key={skill.title} className="skill-tag">
                  {skill.title}
                </span>
              ))}
            </div>
            {project.link !== 'Git Link' && ( // Only show if it's a real link
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;