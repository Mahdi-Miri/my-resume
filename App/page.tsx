import { resumeData } from '../data/resumeData';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      {/* Pass the relevant data part to each component */}
      <About data={resumeData.about} />
      <Projects data={resumeData.projects} />
      <Experience data={resumeData.works} />
      <Skills
        hardSkills={resumeData.hardSkills}
        softSkills={resumeData.softSkills}
      />
      <Contact email={resumeData.about.socialLinks.find(s => s.icon === 'mail')?.value} />
    </>
  );
}