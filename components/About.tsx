import React from 'react';
import { AboutData } from '../interfaces/resumeData';
// We'll need an image component from Next.js for optimization
import Image from 'next/image'; 

interface Props {
  data: AboutData;
}

const About: React.FC<Props> = ({ data }) => {
  return (
    <section id="about" className="about-section card">
      <div className="about-content">
        <h1>
          {data.firstname} {data.lastname}
        </h1>
        <h2>{data.jobTitle}</h2>
        <p>{data.description}</p>
        <div className="social-links">
          {data.socialLinks.map((link) => (
            <div key={link.icon} className="social-link">
              <strong>{link.icon}: </strong>
              {link.link ? (
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  {link.value}
                </a>
              ) : (
                <span>{link.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="about-image">
        <Image
          src={data.image}
          alt={`${data.firstname} ${data.lastname}`}
          width={250}
          height={250}
          style={{ borderRadius: '50%' }} // Make it circular
        />
      </div>
    </section>
  );
};

export default About;