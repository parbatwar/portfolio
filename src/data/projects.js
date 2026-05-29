export const projectsData = [
  {
    id: 1,
    title: 'Vehicle Parts Management System',
    category: 'Fullstack App',
    description: 'A full-stack multi-role web platform for managing vehicle garage operations including inventory, sales, and services.',
    longDescription: 'Vehicle parts management system designed that supports inventory management, purchase invoicing, sales processing, and service tracking. The system includes role-based authentication, financial reporting dashboards, automated email notifications, low-stock alerts, and optimized performance features like caching, pagination, and rate limiting. Built using Clean Architecture and fully containerized for cloud deployment on AWS EC2 with Docker and Nginx reverse proxy setup.',
     tags: ['React', 'ASP.NET Core', 'Docker', 'AWS', 'PostgreSQL', 'JWT', 'Entity Framework'],
    gradient: 'from-blue-500/10 via-cyan-500/5 to-transparent',
    borderColor: 'group-hover:border-blue-500/30',
    repoUrl: 'https://github.com/parbatwar/VehicleParts_Frontend.git'
  },
  {
    id: 2,
    title: 'HR Management System',
    category: 'Fullstack App',
    description: 'Full-stack employee management engine using Django MVT structure and automated session workflows.',
    longDescription: 'HRMS that streamlines the entire employee lifecycle from recruitment to retirement by replacing manual HR processes with an automated, data-driven platform. It includes features like AI-powered CV matching, GPS-based geofencing attendance, an applicant tracking system with a public job portal, and an employee self-service portal. The system also provides payroll processing, leave management, attendance tracking,  HR analytics dashboards with interactive visualizations, and supports easy export of reports.',
    tags: ['Django', 'Python', 'PostgreSQL'],
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
    borderColor: 'group-hover:border-purple-500/30',
    repoUrl: 'https://github.com/parbatwar/HRMS-One.git'
  },
  {
    id: 3,
    title: 'E-Commerce Website',
    category: 'Fullstack App',
    description: 'A Django-based e-commerce platform with product listing, search, and admin management features.',
    longDescription: 'A fully functional e-commerce marketplace built using Django following the MVT architecture. The system includes product management with image upload, dynamic product display, search and filtering functionality, and a customized admin panel. It also implements template inheritance for reusable UI structure and handles static and media files efficiently. Built as part of academic project work focusing on full-stack web development fundamentals.',
    tags: ['Django', 'Python', 'SQLite', 'HTML', 'CSS', 'Git'],
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    borderColor: 'group-hover:border-emerald-500/30',
    repoUrl: 'https://github.com/yourusername/ecommerce-django'
  }
]