// HERO CARD DATA
export const heroData = {
    name: "Parbat Sunuwar",
    firstName: "Parbat",
    lastName: "Sunuwar",
    statusBadge: "DEV · DATA",
    location: "Lalitpur, Nepal",
    email: "parbatwar@gmail.com",
    tagline: "A software developer and data enthusiast focused on architecting efficient backend systems, automated pipelines, and clean user interfaces.",
    stack: ["Python", "React", "SQL", "Docker", "ETL Pipelines", "AWS"]
}

// ABOUT CARD DATA
export const aboutData = {
    title: "Engineering robust apps and data systems.",
    description1: "Based in Kathmandu, Nepal, I'm a developer with a heavy focus on backend architecture and data engineering. I love designing efficient systems making sure the logic underneath is just as solid as the user experience on top.",
    description2: "I'm a massive data enthusiast, and there is nothing more satisfying than writing clean code that structures and processes complex data efficiently.",
}

// TECH STACK CARD
import {
  FaPython, FaJava, FaJs, FaReact, FaCss3Alt, FaBootstrap,
  FaAws, FaDocker, FaGitAlt, FaLinux, FaDatabase, FaCode,
  FaExchangeAlt, FaTable, FaChartLine, FaBrain, FaMemory,
  FaPaperPlane, FaBook, FaMicrosoft
} from 'react-icons/fa'

export const techStackData = {
    Languages: [
        { name: 'Python',      icon: FaPython,   color: '#3b82f6' },
        { name: 'SQL',         icon: FaDatabase,  color: '#60a5fa' },
        { name: 'C#',          icon: FaCode,      color: '#a78bfa' },
        { name: 'Java',        icon: FaJava,      color: '#f97316' },
        { name: 'JavaScript',  icon: FaJs,        color: '#facc15' },
    ],
    Backend: [
        { name: 'Django',    icon: FaPython,   color: '#4ade80' },
        { name: 'FastAPI',   icon: FaCode,     color: '#34d399' },
        { name: '.NET Core', icon: FaMicrosoft, color: '#7c3aed' },
    ],
    Frontend: [
        { name: 'React',       icon: FaReact,   color: '#38bdf8' },
        { name: 'Tailwind CSS',icon: FaCss3Alt, color: '#06b6d4' },
        { name: 'Bootstrap',   icon: FaBootstrap, color: '#a855f7' },
    ],
    Databases: [
        { name: 'PostgreSQL', icon: FaDatabase, color: '#60a5fa' },
        { name: 'Oracle',     icon: FaDatabase, color: '#f87171' },
        { name: 'MySQL',      icon: FaDatabase, color: '#38bdf8' },
        { name: 'Redis',      icon: FaMemory,   color: '#f87171' },
    ],
    Data: [
        { name: 'ETL Pipelines', icon: FaExchangeAlt, color: '#fb923c' },
        { name: 'Pandas',        icon: FaTable,       color: '#38bdf8' },
        { name: 'NumPy',         icon: FaChartLine,   color: '#4ade80' },
        { name: 'Scikit-Learn',  icon: FaBrain,       color: '#a78bfa' },
        { name: 'Matplotlib',    icon: FaChartLine,   color: '#3b82f6' },
        { name: 'Seaborn',       icon: FaChartLine,   color: '#34d399' },
    ],
    Tools: [
        { name: 'AWS EC2',          icon: FaAws,        color: '#facc15' },
        { name: 'Docker',           icon: FaDocker,     color: '#38bdf8' },
        { name: 'Git',              icon: FaGitAlt,     color: '#f97316' },
        { name: 'Linux',            icon: FaLinux,      color: '#fbbf24' },
        { name: 'Postman',          icon: FaPaperPlane, color: '#f97316' },
        { name: 'VS Code',          icon: FaCode,       color: '#3b82f6' },
        { name: 'Jupyter Notebook', icon: FaBook,       color: '#f97316' },
    ],
}

// EDUCATION CARD DATA
export const educationData = [
  {
    institution: 'Islington College',
    university: 'London Metropolitan University',
    degree: 'BSc (Hons) Computing',
    year: '2023 - 2026',
    icon: 'graduation-cap'
  },
  {
    institution: 'Einstein Academy',
    degree: '+2 Science (Computer Science)',
    year: '2018 - 2019',
    icon: 'school'
  },
  {
    institution: 'United School',
    degree: 'Secondary Education (SEE)',
    year: '2017',
    icon: 'book-open'
  }
]

// EXPERIENCE CARD DATA
export const experienceData = {
    role: 'Backend Developer Intern',
    company: 'BrahmaByte Lab Pvt. Ltd.',
    period: 'Sep 2025 – Dec 2025',
    details: [
        'Built and maintained RESTful APIs using FastAPI for an AI-powered customer service SaaS platform.',
        'Developed multiple third-party integrations handling OAuth authentication, message services, and data storage.',
        'Focused on clean code, scalability, and maintainability following company coding standards.',
    ],
}

// SOCIAL CARD DATA
export const socialsData = {
  github: "https://github.com/parbatwar",
  linkedin: "https://www.linkedin.com/in/parbatwar/",
  facebook: "https://www.facebook.com/parbatsunuwar05/",
  email: "parbatwar@gmail.com",
  youtube: "https://www.youtube.com/@maachaproductions",
  instagramPersonal: "https://www.instagram.com/parbat_war/",
  instagramBrand: "https://www.instagram.com/bythehill_/",
  soundcloud: "https://soundcloud.com/warbatmusic"
}