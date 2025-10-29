import { ResumeData } from '../interfaces/resumeData';

// Make sure to import the interface
export const resumeData: ResumeData = {
  about: {
    firstname: 'Mahdi',
    lastname: 'Miri',
    jobTitle: 'Data Scientist',
    // USE THE NEW DESCRIPTION HERE
    description:
      "I am a Data Scientist currently pursuing my Master's degree in Naples, Italy. With a strong foundation in both Data Science and Computer Engineering, I specialize in building end-to-end machine learning solutions. My expertise lies in Natural Language Processing (NLP), Deep Learning, and statistical analysis. I have practical experience in developing models for tasks like sentiment analysis and spam detection, optimizing neural networks, and researching LLM vulnerabilities. My background as a Back-End and Web Developer gives me a unique perspective on integrating these complex models into real-world applications. I am passionate about leveraging data to solve challenging problems and am currently seeking freelance opportunities.",
    image: '/assets/images/about/IMG_2654 (1).jpeg', // Make sure this path exists in /public
    socialLinks: [
      {
        icon: 'location',
        value: 'Naples - Italy ',
      },
      {
        icon: 'phone',
        value: '+39 3517867567',
        link: 'tel: +39 3517867567',
      },
      {
        icon: 'mail',
        value: 'mahdimiri7@gmail.com',
        link: 'mailto: mahdimiri7@gmail.com',
      },
      {
        icon: 'linkedin',
        value: 'mahdimi-miri-dev',
        // You should add the full link here
        // link: "https://www.linkedin.com/in/mahdimi-miri-dev/" 
      },
    ],
  },
  projects: {
    // ... (Your full projects data)
    items: [
      {
        title: 'IMDB Sentiment Analysis Pipeline',
        description: 'A Python pipeline for cleaning and preprocessing movie reviews (removing HTML, normalization, and stemming) for sentiment analysis models.',
        date: {
          start: '2024',
          finish: 'Done',
        },
        role: 'Data Preprocessing',
        icon: '/assets/images/works/project-imdb.jpg', // Make sure this path exists in /public
        link: 'Git Link',
        hardSkills: [
          {
            title: 'Pandas',
          },
          {
            title: 'NLTK',
          },
        ],
      },
      // ... (Add all other projects)
    ],
  },
  works: {
    // ... (Your full works data)
    title: 'Professional Experience',
    items: [
      {
        title: 'University of Naples Federico II',
        description:
          'Researched LLM vulnerabilities using adversarial prompting and jailbreak strategies to improve model robustness and Responsible AI.',
        date: {
          start: '2025',
          finish: '2025',
        },
        location: 'Naples - Italy',
        type: ' ',
        jobTitle: 'Internship in research on LLM',
        icon: '/assets/images/works/unina.jpg', // Make sure this path exists in /public
        link: '',
        hardSkills: [
          {
            title: 'Python',
          },
          {
            title: 'LLM',
          },
        ],
      },
      // ... (Add all other works)
    ],
  },
  hardSkills: {
    // ... (Your full hardSkills data)
    title: 'Hard Skills',
    items: [
      {
        title: 'Python',
      },
      {
        title: 'R',
      },
      // ... (etc.)
    ],
  },
  softSkills: {
    // ... (Your full softSkills data)
    title: 'Soft Skills',
    items: ['Communication skills', 'Organizing skills', 'Teamwork' /* ... etc. */],
  },
  education: {
    // ... (Your full education data)
    title: 'Educational History',
    items: [
      // ... (Your education items)
    ],
  },
};