export const personalInfo = {
  name: "Yusuf Mohammad Jojeh",
  title: "Backend Developer | SaaS & AI Systems Engineer",
  location: "Aleppo, Syria | Full Remote | Willing to Relocate",
  summary: "Backend engineer with 3+ years building scalable SaaS systems, AI-integrated platforms, and production-grade APIs. Specialized in Laravel and NestJS backend architecture, secure authentication systems, and complex business logic implementation. Proven ability to design and deliver systems that handle real-world operational complexity—including CRM/ERP functionality, multi-role permission structures, and AI-driven features integrated into product workflows. Comfortable contributing across the stack with strong backend-first mindset focused on performance, maintainability, and shipping reliable systems.",
  tagline: "Scalable Backend Systems → SaaS & AI Products → Production-Ready Architecture",
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
    title: "Backend Developer | SaaS & AI Systems",
    company: "Rakez Company",
    location: "Remote",
    period: "Dec 2025 – Present",
    description: [
      "Designed and built backend services for AI-powered CRM modules, translating product requirements into secure, scalable API architectures",
      "Developed RESTful APIs and business logic using Laravel and NestJS to support complex CRM workflows and data operations",
      "Integrated AI-driven features (LLM APIs, agents, lead enrichment) into production CRM workflows with focus on reliability",
      "Maintained code quality, system performance, and production readiness through testing, monitoring, and continuous optimization",
      "Collaborated with product and engineering teams to deliver scalable features and system improvements"
    ],
    technologies: ["Laravel", "NestJS", "PostgreSQL", "REST APIs", "LLM Integration", "Docker", "CI/CD", "Python"]
  },
  {
    id: "2",
    title: "Backend Developer | iLogistics SaaS",
    company: "Mermez (Creative Digital Solutions)",
    location: "Remote",
    period: "Jan 2025 – Nov 2025",
    description: [
      "Designed and developed RESTful APIs for iLogistics SaaS platform using Laravel and MySQL, handling multi-tenant operations",
      "Optimized database queries and schemas, resulting in approximately 25% performance improvement across tracking and reporting modules",
      "Implemented secure multi-user authentication, JWT-based authorization, and role-based access control for operational security",
      "Delivered backend functionality for real-time tracking, analytics dashboards, and complex business reporting features",
      "Supported system stability, code reviews, and production deployment processes"
    ],
    technologies: ["Laravel", "MySQL", "Redis", "REST APIs", "JWT", "RBAC", "Docker", "Git"]
  },
  {
    id: "3",
    title: "Full-Stack Developer | CRM Systems",
    company: "Business Flow",
    location: "Remote/Hybrid",
    period: "Nov 2025 – Jan 2026",
    description: [
      "Developed backend-heavy CRM systems and operational dashboards using Laravel with emphasis on secure API design",
      "Built REST APIs with comprehensive RBAC implementation, input validation, and structured business logic workflows",
      "Contributed to full-stack feature delivery while maintaining code quality, performance, and system maintainability",
      "Identified and proposed architectural improvements to enhance scalability and developer efficiency"
    ],
    technologies: ["Laravel", "React", "PostgreSQL", "REST APIs", "RBAC", "Git"]
  },
  {
    id: "4",
    title: "Full-Stack Developer | Freelance",
    company: "Mytrixa",
    location: "Remote",
    period: "2024 – 2025 | Project-Based",
    description: [
      "Translated business requirements into scalable technical architectures and modular backend solutions for multiple clients",
      "Designed and delivered custom REST APIs, database schemas, and backend systems for admin panels and reporting tools",
      "Managed stakeholder communication, feature prioritization, and deployment support",
      "Delivered custom backend and full-stack solutions including operational dashboards and system integrations"
    ],
    technologies: ["Laravel", "NestJS", "React", "MySQL", "PostgreSQL", "REST APIs", "Docker"]
  },
  {
    id: "5",
    title: "Systems Analyst",
    company: "Self-Employed",
    location: "Remote",
    period: "2025",
    description: [
      "Gathered and documented business requirements through stakeholder analysis and process interviews",
      "Developed technical designs, data models, and workflow documentation for system implementation",
      "Identified architecture improvements and process optimization opportunities"
    ],
    technologies: ["Business Analysis", "System Design", "Documentation", "Data Modeling"]
  }
];

// Flagship Systems - Core Technical Achievements
export const flagshipSystems = [
  {
    id: 1,
    title: "CRMA — AI-Native CRM Platform",
    type: "SaaS Business System",
    stack: ["Laravel 12", "React 19", "PostgreSQL", "Python FastAPI", "LLM APIs", "Docker"],
    description: "Multi-tenant CRM system with 300+ versioned REST API endpoints. Core features include lead management, customer relationship tracking, and AI-enhanced insights (lead scoring, enrichment, predictions powered by LLM integration). Architecture designed for scale: web client support with preparation for future mobile expansion.",
    aiFeatures: [
      "LLM-powered lead scoring and enrichment",
      "AI-driven predictive insights and recommendations",
      "Python FastAPI microservices for AI agent workflows"
    ],
    role: "Backend architecture, REST API design, database optimization, AI integration, RBAC implementation, production deployment",
    highlights: ["300+ API Endpoints", "Multi-tenant Architecture", "AI-Integrated CRM", "Production-Ready"],
    demoUrl: null,
    githubUrl: null
  },
  {
    id: 2,
    title: "Logistics & Booking Management System",
    type: "Operations Platform",
    stack: ["Laravel", "React", "MySQL", "Redis", "REST APIs", "Docker"],
    description: "High-scale operational platform with multi-role dashboards, real-time notifications, and complex reporting. Implements secure backend workflows with RBAC, optimized for handling high-volume operations. Features include real-time tracking, operational dashboards, and role-based permission management.",
    aiFeatures: [
      "Role-based access control and permission routing",
      "Real-time notification systems",
      "Complex business logic for operations management"
    ],
    role: "Backend API architecture, RBAC implementation, database optimization, system performance tuning",
    highlights: ["High-Scale Operations", "Real-Time Updates", "Multi-Role Security", "Performance-Optimized"],
    demoUrl: null,
    githubUrl: null
  },
  {
    id: 3,
    title: "AI Marketing Agent Platform",
    type: "SaaS Application",
    stack: ["Next.js", "Flask", "Ollama", "LLM APIs", "PostgreSQL", "Docker"],
    description: "AI-powered SaaS for content generation, analysis, and campaign planning. Integrated local LLM support (Ollama) with multilingual capabilities (Arabic/English with voice support). Built on reliable backend services to ensure stability and performance at scale. Demonstrates practical AI integration within operational workflows.",
    aiFeatures: [
      "Local LLM integration (Ollama) for on-device inference",
      "Multilingual AI support with voice capabilities",
      "Content generation and analysis workflows"
    ],
    role: "Backend API services, AI workflow integration, system architecture, production reliability",
    highlights: ["Local LLM Support", "Multilingual", "Voice AI", "SaaS Infrastructure"],
    demoUrl: null,
    githubUrl: null
  }
];

export const projects = [
  {
    id: "1",
    title: "Logistics & Moving Booking System",
    description: "Production logistics platform featuring order management, real-time tracking, payment gateway integration, multi-role permissions, and RESTful APIs for mobile and web clients.",
    technologies: ["Laravel", "REST API", "MySQL", "Payment Gateway", "Real-time Updates"],
    githubUrl: "https://github.com/YusufJojeh/Logistics-MovingBookingSystem",
    featured: true
  },
  {
    id: "2",
    title: "IdeaVote – Collaborative Voting Platform",
    description: "Real-time collaborative platform with complex voting logic, live analytics, permission structures, and WebSocket integration for instant updates across users.",
    technologies: ["Laravel", "Redis", "MySQL", "WebSockets", "Real-time Analytics"],
    githubUrl: "https://github.com/YusufJojeh/ideavote",
    featured: true
  },
  {
    id: "3",
    title: "ExperienceTracker",
    description: "Developer portfolio platform with structured data models, performance tracking, experience categorization, and analytics dashboard for professional growth monitoring.",
    technologies: ["Laravel", "MySQL", "Data Modeling", "Analytics", "Chart.js"],
    githubUrl: "https://github.com/YusufJojeh/ProfessionalExperienceTracker"
  },
  {
    id: "4",
    title: "TrainingRequests – HR Operations System",
    description: "Enterprise HR workflow system with approval routing, email notifications, PDF document generation, and role-based access control for training approval processes.",
    technologies: ["Laravel", "MySQL", "Workflow Logic", "Email Integration", "PDF"],
    githubUrl: "https://github.com/YusufJojeh/TrainingApplyPlatform"
  },
  {
    id: "5",
    title: "BlogCMS – Content Management System",
    description: "Full-featured CMS with content versioning, SEO optimization framework, real-time analytics, and REST API for headless publishing across multiple channels.",
    technologies: ["Laravel", "MySQL", "REST API", "SEO Architecture", "Analytics"],
    githubUrl: "https://github.com/YusufJojeh/Blog"
  },
  {
    id: "6",
    title: "ProjectTracker – Team Collaboration System",
    description: "Project management backend with task routing, team permissions, real-time updates via WebSockets, file attachment handling, and milestone tracking for agile teams.",
    technologies: ["Laravel", "MySQL", "WebSockets", "File Management", "REST API"],
    githubUrl: "https://github.com/YusufJojeh/project-tracker"
  },
  {
    id: "7",
    title: "FBP (DesignHub)",
    description: "Asset management platform for creative teams with file versioning, permission-based access control, real-time collaboration features, and bulk asset operations.",
    technologies: ["Laravel", "MySQL", "File Management", "RBAC", "Real-time"],
    githubUrl: "https://github.com/YusufJojeh/FBP"
  },
  {
    id: "8",
    title: "RestoCafe OS – Multi-Tenant SaaS POS Platform",
    description: "Production-grade Point-of-Sale system for restaurants and cafés with multi-tenant isolation, real-time kitchen operations via WebSocket, offline-first PWA, optimistic concurrency control, comprehensive audit logging, and load-tested architecture for multi-replica deployments.",
    technologies: ["NestJS", "React", "TypeScript", "PostgreSQL", "WebSocket", "Socket.IO", "Redux", "Service Workers", "Docker", "Kubernetes", "Redis", "Prometheus"],
    githubUrl: "https://github.com/YusufJojeh/restocafe-os"
  },
  {
    id: "9",
    title: "Matjrii – Multi-Store E-Commerce SaaS Platform",
    description: "Comprehensive e-commerce SaaS platform enabling unlimited store creation with 27+ payment gateways, 10+ professional themes, 22+ language support, AI content generation (ChatGPT), multi-tenant isolation, advanced inventory management, POS integration, comprehensive analytics, and enterprise-grade security.",
    technologies: ["Laravel", "React", "TypeScript", "MySQL", "PostgreSQL", "OpenAI API", "Inertia.js", "Tailwind CSS", "Stripe", "PayPal", "Razorpay"],
    githubUrl: "https://github.com/YusufJojeh/matjrii-saas"
  },
  {
    id: "10",
    title: "Medical Booking System – Enterprise Healthcare Platform",
    description: "AI-powered medical appointment booking and patient management platform with multi-role workflows, digital payments (Stripe), real-time video consultations (Jitsi), WhatsApp reminders (Twilio), comprehensive clinical decision support, health metrics tracking, subscriptions, referral system, and full HIPAA-compliance infrastructure.",
    technologies: ["Laravel", "Blade", "Vite", "Tailwind CSS", "MySQL", "Redis", "Stripe", "Twilio", "Jitsi", "OpenAI", "Pest", "Alpine.js"],
    githubUrl: "https://github.com/YusufJojeh/medical-booking-system"
  },
  {
    id: "11",
    title: "Rakez ERP – Enterprise Resource Planning System",
    description: "Enterprise-grade ERP platform for real estate and sales management with automated commission calculation (multi-party distribution, approval workflows, VAT), advanced booking/reservations with waiting list system, 67+ role-based permissions across 9 predefined roles, real-time WebSocket notifications, AI-powered assistant (OpenAI with Arabic support), comprehensive analytics dashboards, marketing budget tracking with platform integrations (Facebook SDK, TikTok API), media management, 150+ protected API endpoints, and production-ready architecture for complex business operations.",
    technologies: ["Laravel 12", "PHP 8.2+", "MySQL", "PostgreSQL", "Redis", "Laravel Reverb", "Sanctum", "Spatie Permission", "Vite", "Vue/React", "OpenAI", "Twilio", "Facebook SDK", "TikTok API", "mPDF"],
    githubUrl: "https://github.com/YusufJojeh/rakez-erp"
  },
  {
    id: "12",
    title: "E-Commerce Platform – Modern Digital Commerce Solution",
    description: "Production-ready enterprise e-commerce platform with sophisticated product management, premium glassmorphism UI with 3D animations, powerful Orchid admin dashboard for content management, multi-level caching strategy (page, fragment, query with Redis), automatic image optimization with WebP conversion, advanced product filtering and search, wishlist system, promotional banners/slides, offer management, complete backup/versioning infrastructure, responsive design across all devices, and optimized performance architecture delivering < 2 second page loads.",
    technologies: ["Laravel 12", "React 18", "PHP 8.2+", "MySQL", "PostgreSQL", "Vite", "Redux Toolkit", "React Router", "React Query", "Tailwind CSS", "Redis", "Intervention Image", "Orchid Platform", "Framer Motion", "React Hook Form"],
    featured: true,
    githubUrl: "https://github.com/YusufJojeh/ecommerce-platform"
  },
  {
    id: "13",
    title: "LeadScope AI (ProspectIQ)",
    description: "LeadScope AI product delivered from the ProspectIQ monorepo: FastAPI with Pydantic v2, SQLAlchemy 2, and Alembic on MariaDB; React, TypeScript, Vite, and Tailwind web client. Includes infra for local and compose-based deployment, GHCR container images, GitHub Actions CI (ruff, mypy, pytest, Alembic checks, Playwright E2E), release workflows, and SSH deploy with stack health and login verification.",
    technologies: ["FastAPI", "Python", "Pydantic", "SQLAlchemy", "Alembic", "MariaDB", "React", "TypeScript", "Vite", "Tailwind CSS", "Docker", "GitHub Actions", "Nginx"],
    featured: true,
    githubUrl: "https://github.com/YusufJojeh/ProspectIQ"
  },
  {
    id: "15",
    title: "AI Business OS – NestJS Backend",
    description: "Production-grade NestJS backend for AI Marketing Agent platform with RESTful APIs for content creation, campaign management, analytics, and AI integrations. Fully TypeScript/Node.js architecture using modular monolith with Clean Architecture principles. Features Prisma ORM with PostgreSQL, Temporal + BullMQ for asynchronous workflow processing, Pino structured logging, Swagger API documentation, and 50+ feature modules organized by domain. Implements Social Media Simulation Mode (regional optimization) with content generation, preview, scheduling, and export capabilities. Designed for independent scaling, fault isolation, and production-ready reliability.",
    technologies: ["NestJS", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Temporal", "BullMQ", "Redis", "Pino", "Swagger", "Docker", "Docker Compose", "REST APIs", "JWT", "RBAC"],
    featured: true,
    githubUrl: null
  }
];

export const skills = [
  // Core Backend Skills
  { name: "Laravel", icon: "laravel", category: "backend", proficiency: 5 },
  { name: "NestJS", icon: "nest", category: "backend", proficiency: 4 },
  { name: "PHP", icon: "php", category: "backend", proficiency: 5 },
  { name: "REST APIs", icon: "api", category: "backend", proficiency: 5 },
  { name: "PostgreSQL", icon: "postgresql", category: "database", proficiency: 4 },
  { name: "MySQL", icon: "mysql", category: "database", proficiency: 5 },
  { name: "TypeScript", icon: "typescript", category: "backend", proficiency: 4 },
  { name: "Authentication & RBAC", icon: "shield", category: "backend", proficiency: 4 },
  { name: "Docker", icon: "docker", category: "devops", proficiency: 4 },
  { name: "CI/CD", icon: "cicd", category: "devops", proficiency: 3 },
  
  // Frontend Skills  
  { name: "React.js", icon: "react", category: "frontend", proficiency: 4 },
  { name: "JavaScript (ES6+)", icon: "javascript", category: "frontend", proficiency: 5 },
  { name: "Next.js", icon: "nextjs", category: "frontend", proficiency: 3 },
  { name: "HTML5", icon: "html5", category: "frontend", proficiency: 5 },
  { name: "CSS3", icon: "css3", category: "frontend", proficiency: 4 },
  { name: "Tailwind CSS", icon: "tailwind", category: "frontend", proficiency: 4 },
  { name: "Bootstrap", icon: "bootstrap", category: "frontend", proficiency: 4 },
  
  // Database & DevOps
  { name: "MongoDB", icon: "mongodb", category: "database", proficiency: 3 },
  { name: "Git", icon: "git", category: "devops", proficiency: 4 },
  { name: "GitHub Actions", icon: "github", category: "devops", proficiency: 3 },
  { name: "PHPUnit", icon: "phpunit", category: "devops", proficiency: 4 },
  { name: "Postman", icon: "postman", category: "devops", proficiency: 4 },
  
  // Other Backend Skills
  { name: "Python", icon: "python", category: "backend", proficiency: 4 },
  { name: "Flask", icon: "flask", category: "backend", proficiency: 3 },
  { name: "SOAP", icon: "soap", category: "backend", proficiency: 3 },
  { name: "Agile (Scrum)", icon: "agile", category: "other", proficiency: 4 },
  { name: "ITIL", icon: "itil", category: "other", proficiency: 3 },
  
  // AI & Productivity Tools (Secondary)
  { name: "OpenAI API Integration", icon: "Sparkles", category: "ai", proficiency: 3 },
  { name: "Prompt Engineering", icon: "Brain", category: "ai", proficiency: 3 },
  { name: "Cursor IDE", icon: "Code2", category: "ai", proficiency: 3 },
  { name: "AI-Assisted Development", icon: "Sparkles", category: "ai", proficiency: 3 }
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
    name: "Generative AI: Elevate your Software Development",
    issuer: "IBM/Coursera",
    date: "Mar 29 2026",
    url: "https://coursera.org/verify/1A4OSELZIBNTdateissuer"
  },
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