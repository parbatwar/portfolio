// HERO CARD DATA
export const navigationData = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const heroData = {
  name: 'Parbat Sunuwar',
  firstName: 'Parbat',
  lastName: 'Sunuwar',
  email: 'parbatwar@gmail.com',
  tagline: ['Coding', 'Automating', 'Marketing'],
}
    
// ABOUT CARD DATA
export const aboutData = {
  title: 'Building systems that save time and drive results.',
  description1:
    "I've always enjoyed figuring out how things work and finding ways to make them better. Combining coding with marketing lets me pair that analytical, developer mindset with human psychology, creativity, and business, and then see the results in real revenue.",
  description2:
    "That's what sets my work apart: I don't just build things that work technically. I build them for real brands, with real customer data, where the impact shows up in the numbers.",
}

// TECH STACK CARD
import {
  FaPython,
  FaJava,
  FaJs,
  FaReact,
  FaCss3Alt,
  FaBootstrap,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaDatabase,
  FaCode,
  FaExchangeAlt,
  FaTable,
  FaChartLine,
  FaBrain,
  FaMemory,
  FaPaperPlane,
  FaBook,
  FaMicrosoft,
} from 'react-icons/fa'

export const techStackData = {
  Languages: [
    { name: 'Python', icon: FaPython, color: '#3b82f6' },
    { name: 'SQL', icon: FaDatabase, color: '#60a5fa' },
    { name: 'JavaScript', icon: FaJs, color: '#facc15' },
    { name: 'C#', icon: FaCode, color: '#a78bfa' },
    { name: 'Java', icon: FaJava, color: '#f97316' },
  ],
  Backend: [
    { name: 'Django', icon: FaPython, color: '#4ade80' },
    { name: 'FastAPI', icon: FaCode, color: '#34d399' },
    { name: 'REST APIs', icon: FaExchangeAlt },
    { name: 'OAuth', icon: FaCode },
    { name: '.NET Core', icon: FaMicrosoft, color: '#7c3aed' },
  ],
  'Automation & AI': [
    { name: 'Klaviyo API', icon: FaExchangeAlt },
    { name: 'Shopify API', icon: FaExchangeAlt },
    { name: 'Omnisend', icon: FaPaperPlane },
  ],
  Frontend: [
    { name: 'React', icon: FaReact, color: '#38bdf8' },
    { name: 'Tailwind CSS', icon: FaCss3Alt, color: '#06b6d4' },
    { name: 'Bootstrap', icon: FaBootstrap, color: '#a855f7' },
  ],
  Databases: [
    { name: 'PostgreSQL', icon: FaDatabase, color: '#60a5fa' },
    { name: 'Oracle', icon: FaDatabase, color: '#f87171' },
    { name: 'MySQL', icon: FaDatabase, color: '#38bdf8' },
    { name: 'Redis', icon: FaMemory, color: '#f87171' },
  ],
  Data: [
    { name: 'ETL Pipelines', icon: FaExchangeAlt, color: '#fb923c' },
    { name: 'Pandas', icon: FaTable, color: '#38bdf8' },
    { name: 'NumPy', icon: FaChartLine, color: '#4ade80' },
    { name: 'Scikit-Learn', icon: FaBrain, color: '#a78bfa' },
    { name: 'Matplotlib', icon: FaChartLine, color: '#3b82f6' },
    { name: 'Seaborn', icon: FaChartLine, color: '#34d399' },
  ],
  Tools: [
    { name: 'AWS EC2', icon: FaAws, color: '#facc15' },
    { name: 'Docker', icon: FaDocker, color: '#38bdf8' },
    { name: 'Git', icon: FaGitAlt, color: '#f97316' },
    { name: 'Linux', icon: FaLinux, color: '#fbbf24' },
    { name: 'Postman', icon: FaPaperPlane, color: '#f97316' },
    { name: 'VS Code', icon: FaCode, color: '#3b82f6' },
    { name: 'Jupyter Notebook', icon: FaBook, color: '#f97316' },
  ],
}

// EDUCATION CARD DATA
export const educationData = [
  {
    institution: 'Islington College',
    university: 'London Metropolitan University',
    degree: 'BSc (Hons) Computing',
    year: '2023 - 2026',
    icon: 'graduation-cap',
  },
  {
    institution: 'Einstein Academy',
    degree: '+2 Science (Computer Science)',
    year: '2018 - 2019',
    icon: 'school',
  },
  {
    institution: 'United School',
    degree: 'Secondary Education (SEE)',
    year: '2017',
    icon: 'book-open',
  },
]

// EXPERIENCE CARD DATA
export const experienceData = [
  {
    role: 'Klaviyo Technician',
    company: 'The Great Emails',
    details: [
      'Build and manage automated email workflows triggered by customer behavior for eCommerce brands',
      'Work with customer data, event tracking, and segmentation in Klaviyo',
      'Set up and troubleshoot integrations between Klaviyo, Shopify, and other platforms',
    ],
  },
  {
    role: 'Backend Developer',
    company: 'BrahmaByte Lab Pvt. Ltd.',
    details: [
      'Built and maintained RESTful APIs using FastAPI for an AI-powered customer service SaaS platform.',
      'Developed multiple third-party integrations handling OAuth authentication, message services, and data storage.',
      'Focused on clean code, scalability, and maintainability following company coding standards.',
    ],
  },
    {
    role: 'Video Editor',
    company: 'Freelance',
    details: [
      'Edit talking-head, promotional, and social media videos for agencies, brands, and businesses',
      'Create motion graphics, animated captions, and visual effects that keep viewers engaged',
      'Design brand identities and visual assets, including logos, typography, and graphics',
    ],
  },
]

// SOCIAL CARD DATA
export const socialsData = {
  github: 'https://github.com/parbatwar',
  linkedin: 'https://www.linkedin.com/in/parbatwar/',
  facebook: 'https://www.facebook.com/parbatsunuwar05/',
  email: 'parbatwar@gmail.com',
  youtube: 'https://www.youtube.com/@maachaproductions',
  instagramPersonal: 'https://www.instagram.com/parbat_war/',
  instagramBrand: 'https://www.instagram.com/bythehill_/',
  soundcloud: 'https://soundcloud.com/warbatmusic',
}
