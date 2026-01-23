export const personalInfo = {
  name: "Yusuf Mohammad Jojeh",
  title: "Full-Stack & AI Systems Engineer | DevOps Enthusiast | Prompt Engineering Specialist",
  location: "Aleppo, Syria (open to relocation/remote)",
  summary: "I build AI-powered business platforms, healthcare automation systems, and scalable web applications. I leverage advanced AI tools like ChatGPT, Claude, and Cursor to write clean, production-ready code faster and smarter.",
  tagline: "Building Scalable Systems → AI-Native Solutions → DevOps-Ready",
  contact: {
    phone: "+963 980 278 664",
    email: "yassaf.jojah@gmail.com",
    github: "github.com/YusufJojeh",
    linkedin: "www.linkedin.com/in/yusuf-jojeh-95835b26b"
  },
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional Working Proficiency" }
  ]
};

export const experiences = [
  {
    id: "1",
    title: "Back-End Developer",
    company: "Mermez",
    location: "Remote",
    period: "Jan 2025 – Present",
    description: [
      "Develop and maintain Laravel-based web applications",
      "Implement real-time features using WebSockets",
      "Write comprehensive unit tests with PHPUnit",
      "Containerize applications using Docker",
      "Collaborate with cross-functional teams using Agile methodologies",
      "Designed and maintained CI/CD workflows for Laravel applications",
      "Improved deployment reliability using Docker-based environments"
    ],
    technologies: ["Laravel", "MySQL", "PHPUnit", "Docker", "WebSockets", "Git", "CI/CD"]
  },
  {
    id: "2",
    title: "Senior Full-Stack Developer",
    company: "Technology Company",
    location: "Remote",
    period: "2023 – 2024",
    description: [
      "Designed and implemented backend systems using NestJS",
      "Built AI-driven features for business workflows",
      "Developed scalable CRM and internal platforms",
      "Collaborated with product and DevOps teams",
      "Leveraged AI tools (ChatGPT, Claude, Cursor) for rapid development"
    ],
    technologies: ["NestJS", "Next.js", "PostgreSQL", "AI Tools", "Docker", "CI/CD"]
  },
  {
    id: "3",
    title: "Freelance Full-Stack Developer & Tutor",
    company: "Self-Employed",
    location: "Remote",
    period: "Sep 2022 – Present",
    description: [
      "Develop custom Laravel modules and extensions",
      "Create React.js demonstrations and proof-of-concepts",
      "Provide technical tutoring with 150+ hours of experience",
      "Build responsive web applications using modern frameworks",
      "Implement RESTful APIs and database optimization"
    ],
    technologies: ["Laravel", "React", "JavaScript", "MySQL", "REST APIs", "Git"]
  }
];

// Flagship Systems - Main Portfolio Projects
export const flagshipSystems = [
  {
    id: 1,
    title: "AI Business Platform (PR)",
    type: "Enterprise SaaS",
    stack: ["NestJS", "Next.js", "PostgreSQL", "Docker", "CI/CD"],
    description: "Modular AI-driven business management platform with intelligent workflows and real-time analytics.",
    aiFeatures: [
      "AI-assisted code generation & architecture validation",
      "ChatGPT + Code Interpreter for testing and optimization",
      "Automated workflow suggestions using AI"
    ],
    role: "Full-stack development, AI integration, system architecture, CI/CD pipelines",
    highlights: ["Production-ready", "AI-native", "Cloud-ready"],
    demoUrl: null,
    githubUrl: null
  },
  {
    id: 2,
    title: "Medical Mini AI Agent (MedApp)",
    type: "Healthcare AI",
    stack: ["Laravel", "Flask", "Tailwind CSS", "Blade", "APIs"],
    description: "Voice-powered AI assistant for healthcare appointment scheduling and payment automation.",
    aiFeatures: [
      "NLP & voice recognition for natural interaction",
      "Intent detection with AI models",
      "Prompt engineering for booking flows"
    ],
    role: "Backend & frontend development, NLP integration, payment flow, privacy design",
    highlights: ["Voice AI", "Healthcare domain", "Payment integration"],
    demoVideo: null,
    githubUrl: null
  },
  {
    id: 3,
    title: "CRM System",
    type: "Business Platform",
    stack: ["Laravel", "React", "MySQL"],
    description: "Standalone customer relationship management platform with modular architecture and modern frontend.",
    aiFeatures: [
      "AI-assisted module generation",
      "Prompt engineering for CRUD automation",
      "Code optimization with AI tools"
    ],
    role: "Full-stack development, modular API design, enterprise architecture",
    highlights: ["Enterprise-ready", "Modular design", "API-driven"],
    demoUrl: null,
    githubUrl: null
  }
];

export const projects = [
  {
    id: "1",
    title: "Logistics & Moving Booking System",
    description: "A comprehensive logistics management platform for booking and tracking moving services with real-time updates and payment integration.",
    technologies: ["Laravel", "React", "MySQL", "REST API", "Payment Gateway"],
    githubUrl: "https://github.com/YusufJojeh/Logistics-MovingBookingSystem",
    featured: true
  },
  {
    id: "2",
    title: "IdeaVote – Idea Voting Platform",
    description: "A collaborative platform where users can submit, vote, and discuss ideas with real-time voting and analytics dashboard.",
    technologies: ["Laravel", "Vue.js", "MySQL", "WebSockets", "Redis"],
    githubUrl: "https://github.com/YusufJojeh/ideavote",
    featured: true
  },
  {
    id: "3",
    title: "ExperienceTracker",
    description: "A personal experience tracking application for developers to log and categorize their professional experiences and skills.",
    technologies: ["Laravel", "Bootstrap", "MySQL", "Chart.js"],
    githubUrl: "https://github.com/YusufJojeh/ProfessionalExperienceTracker "
  },
  {
    id: "4",
    title: "TrainingRequests",
    description: "An internal training management system for organizations to handle employee training requests and approvals.",
    technologies: ["Laravel", "MySQL", "Email Notifications", "PDF Generation"],
    githubUrl: "https://github.com/YusufJojeh/TrainingApplyPlatform"
  },
  {
    id: "5",
    title: "BlogCMS",
    description: "A modern content management system for blogs with rich text editing, SEO optimization, and analytics.",
    technologies: ["Laravel", "Vue.js", "MySQL", "SEO Tools", "Analytics"],
    githubUrl: "https://github.com/YusufJojeh/Blog"
  },
  {
    id: "6",
    title: "ProjectTracker",
    description: "A project management tool for tracking tasks, milestones, and team collaboration with real-time updates.",
    technologies: ["Laravel", "React", "MySQL", "WebSockets", "File Upload"],
    githubUrl: "https://github.com/YusufJojeh/project-tracker"
  },
  {
    id: "7",
    title: "FBP (DesignHub)",
    description: "A design collaboration platform for creative teams to share, review, and manage design assets and projects.",
    technologies: ["Laravel", "Vue.js", "MySQL", "File Management", "Real-time"],
    githubUrl: "https://github.com/YusufJojeh/FBP"
  }
];

export const skills = [
  // AI & Automation Skills (New - Priority)
  { name: "Prompt Engineering", icon: "Brain", category: "ai", proficiency: 5 },
  { name: "ChatGPT / Claude", icon: "MessageSquare", category: "ai", proficiency: 5 },
  { name: "Cursor IDE", icon: "Code2", category: "ai", proficiency: 5 },
  { name: "AI-Assisted Development", icon: "Sparkles", category: "ai", proficiency: 5 },
  { name: "Code Generation & Optimization", icon: "Zap", category: "ai", proficiency: 5 },
  { name: "Generative AI Workflows", icon: "Workflow", category: "ai", proficiency: 5 },
  { name: "NestJS", icon: "nest", category: "backend", proficiency: 4 },

  // Backend Skills
  { name: "PHP", icon: "php", category: "backend", proficiency: 5 },
  { name: "Laravel", icon: "laravel", category: "backend", proficiency: 5 },
  { name: "Python", icon: "python", category: "backend", proficiency: 4 },
  { name: "Flask", icon: "flask", category: "backend", proficiency: 4 },
  { name: "REST APIs", icon: "api", category: "backend", proficiency: 5 },
  { name: "SOAP", icon: "soap", category: "backend", proficiency: 3 },
  
  // Frontend Skills
  { name: "React.js", icon: "react", category: "frontend", proficiency: 4 },
  { name: "JavaScript (ES6+)", icon: "javascript", category: "frontend", proficiency: 5 },
  { name: "HTML5", icon: "html5", category: "frontend", proficiency: 5 },
  { name: "CSS3", icon: "css3", category: "frontend", proficiency: 4 },
  { name: "Tailwind CSS", icon: "tailwind", category: "frontend", proficiency: 4 },
  { name: "Bootstrap", icon: "bootstrap", category: "frontend", proficiency: 4 },
  { name: "jQuery", icon: "jquery", category: "frontend", proficiency: 3 },
  
  // Database Skills
  { name: "MySQL", icon: "mysql", category: "database", proficiency: 5 },
  { name: "PostgreSQL", icon: "postgresql", category: "database", proficiency: 3 },
  { name: "MongoDB", icon: "mongodb", category: "database", proficiency: 3 },
  
  // DevOps Skills
  { name: "Git", icon: "git", category: "devops", proficiency: 4 },
  { name: "Docker", icon: "docker", category: "devops", proficiency: 4 },
  { name: "GitHub Actions", icon: "github", category: "devops", proficiency: 3 },
  { name: "CI/CD", icon: "cicd", category: "devops", proficiency: 3 },
  { name: "PHPUnit", icon: "phpunit", category: "devops", proficiency: 4 },
  { name: "Postman", icon: "postman", category: "devops", proficiency: 4 },
  
  // Other Skills
  { name: "Agile (Scrum)", icon: "agile", category: "other", proficiency: 4 },
  { name: "ITIL", icon: "itil", category: "other", proficiency: 3 }
];

export const education = {
  degree: "BSc in Information Engineering & Distributed Systems",
  institution: "Al-Shahbaa University",
  period: "2021 - 2026",
  gpa: "3.10",
  description: "Focused on distributed systems, software engineering, and information technology fundamentals."
};

export const certifications = [
  {
    name: "Developing AI Applications with Python and Flask",
    issuer: "IBM/Coursera",
    date: "Jul 15 2025",
    url: "https://www.coursera.org"
  },
  {
    name: "Responsive Web Design",
    issuer: "University of London/Coursera",
    date: "2024",
    url: "https://www.coursera.org"
  },
  {
    name: "Introduction to Artificial Intelligence",
    issuer: "IBM AI Developer/Coursera",
    date: "2024",
    url: "https://www.coursera.org"
  },
  {
    name: "Python for Data Science, AI & Development",
    issuer: "IBM AI Developer/Coursera",
    date: "2024",
    url: "https://www.coursera.org"
  },
  {
    name: "Generative AI: Introduction and Applications",
    issuer: "IBM AI Developer/Coursera",
    date: "2024",
    url: "https://www.coursera.org"
  },
  {
    name: "Generative AI: Prompt Engineering Basics",
    issuer: "IBM AI Developer/Coursera",
    date: "2024",
    url: "https://www.coursera.org"
  },
  {
    name: "Introduction to Software Engineering",
    issuer: "IBM AI Developer/Coursera",
    date: "2024",
    url: "https://www.coursera.org"
  },
  {
    name: "Responsive Website Basics (HTML, CSS, JavaScript)",
    issuer: "University of London/Coursera",
    date: "2022",
    url: "https://www.coursera.org"
  }
]; 