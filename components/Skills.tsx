import React from 'react';
import { HardSkill } from '../interfaces/resumeData';

interface Props {
  hardSkills: {
    title: string;
    items: HardSkill[];
  };
  softSkills: {
    title: string;
    items: string[];
  };
}

const Skills: React.FC<Props> = ({ hardSkills, softSkills }) => {
  return (
    <section id="skills" className="grid-container skills-section">
      <div className="card">
        <h3>{hardSkills.title}</h3>
        <div className="skills-list">
          {hardSkills.items.map((skill) => (
            <span key={skill.title} className="skill-tag large">
              {skill.title}
            </span>
          ))}
        </div>
      </div>
      <div className="card">
        <h3>{softSkills.title}</h3>
        <ul className="soft-skills-list">
          {softSkills.items.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;