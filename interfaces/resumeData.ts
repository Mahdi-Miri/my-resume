// interfaces/resumeData.ts

// --- Interfaces for nested objects ---

export interface SocialLink {
  icon: string;
  value: string;
  link?: string;
}

export interface ProjectDate {
  start: string;
  finish: string;
}

export interface ProjectSkill {
  title: string;
}

export interface Project {
  title: string;
  description: string;
  date?: ProjectDate; // Made optional
  role: string;
  icon: string;
  link: string;
  hardSkills: ProjectSkill[]; // Matched to your new data
}

export interface WorkDate {
  start: string;
  finish: string;
}

export interface WorkSkill {
  title: string;
}

export interface Work {
  title: string;
  description: string;
  date: WorkDate;
  location: string;
  type: string;
  jobTitle: string;
  icon: string;
  link: string;
  hardSkills: WorkSkill[]; // Matched to your new data
}

export interface HardSkill {
  title: string;
}

export interface EducationDate {
  start: string;
  finish: string;
}

export interface Education {
  name: string;
  type: string;
  grade: string;
  science: string;
  date: EducationDate;
}

// --- Main ResumeData Interface ---

export interface AboutData {
  firstname: string;
  lastname: string;
  jobTitle: string;
  description: string;
  image: string;
  socialLinks: SocialLink[];
}

export interface ResumeData {
  about: AboutData;
  projects: {
    items: Project[];
  };
  works: {
    title: string;
    items: Work[];
  };
  hardSkills: {
    title: string;
    items: HardSkill[]; // Matched to your new data
  };
  softSkills: {
    title: string;
    items: string[]; // Matched to your new data
  };
  education: {
    title: string;
    items: Education[];
  };
}