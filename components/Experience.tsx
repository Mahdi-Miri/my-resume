import React from 'react';
import { Work } from '../interfaces/resumeData';

interface Props {
  data: {
    title: string;
    items: Work[];
  };
}

const Experience: React.FC<Props> = ({ data }) => {
  return (
    <section id="experience">
      <h2>{data.title}</h2>
      <div className="timeline">
        {data.items.map((work) => (
          <div key={work.title} className="card timeline-item">
            <h3>{work.jobTitle} @ {work.title}</h3>
            <span className="date-badge">
              {work.date.start} - {work.date.finish || 'Present'}
            </span>
            <p>{work.description}</p>
            <div className="skills-list">
              {work.hardSkills.map((skill) => (
                <span key={skill.title} className="skill-tag">
                  {skill.title}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;