import React from 'react';

interface Props {
  email?: string;
}

const Contact: React.FC<Props> = ({ email }) => {
  return (
    <section id="contact" className="contact-section card">
      <h2>Let's Work Together</h2>
      <p>
        I am currently available for freelance opportunities and collaborative projects. 
        If you have a challenge in mind, especially in Data Science or NLP, 
        I'd love to hear about it.
      </p>
      {email && (
        <a href={`mailto:${email}`} className="cta-button">
          Get in Touch
        </a>
      )}
    </section>
  );
};

export default Contact;