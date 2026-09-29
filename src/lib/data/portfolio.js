export const personalInfo = {
  name: "Yusuf Mohammad Jojeh",
  title: "Backend Engineer for SaaS, CRM/ERP & AI-Integrated Systems",
  location: "Aleppo, Syria | Full Remote",
  summary: "Backend engineer with 4+ years building scalable SaaS systems, AI-integrated platforms, and production-grade APIs. Specialized in Laravel and NestJS backend architecture, secure authentication systems, and complex business logic implementation. Proven ability to design and deliver systems that handle real-world operational complexity—including CRM/ERP functionality, multi-role permission structures, and AI-driven features integrated into product workflows. Comfortable contributing across the stack with strong backend-first mindset focused on performance, maintainability, and shipping reliable systems.",
  tagline: "Scalable Backend Systems → SaaS & AI Products → Production-Ready Architecture",
  contact: {
    phone: "+963 980 278 664",
    email: "yassaf.jojeh@gmail.com",
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

// TODO: Add live demo URLs when available
const DEMO_COMING_SOON = null;

export const caseStudies = [
  {
    id: "rakez-erp",
    githubUrl: "https://github.com/YusufJojeh/rakez-erp",
    demoUrl: DEMO_COMING_SOON,
    stack: ["Laravel 12", "React", "PostgreSQL", "Redis", "OpenAI API", "Laravel Reverb", "Spatie Permission"]
  },
  {
    id: "matjrii",
    githubUrl: "https://github.com/YusufJojeh/matjrii-saas",
    demoUrl: DEMO_COMING_SOON,
    stack: ["Laravel", "React", "Inertia.js", "MySQL", "PostgreSQL", "OpenAI API", "Stripe", "Tailwind CSS"]
  },
  {
    id: "restocafe",
    githubUrl: "https://github.com/YusufJojeh/restocafe-os",
    demoUrl: DEMO_COMING_SOON,
    stack: ["NestJS", "React", "TypeScript", "PostgreSQL", "Socket.IO", "Redis", "Docker", "Kubernetes"]
  },
  {
    id: "medical",
    githubUrl: "https://github.com/YusufJojeh/medical-booking-system",
    demoUrl: DEMO_COMING_SOON,
    stack: ["Laravel", "MySQL", "Redis", "Stripe", "OpenAI"]
  },
  {
    id: "leadscope",
    githubUrl: DEMO_COMING_SOON,
    demoUrl: DEMO_COMING_SOON,
    stack: ["FastAPI", "Pydantic v2", "SQLAlchemy 2", "Alembic", "MariaDB", "React", "TypeScript", "Vite", "Docker Compose", "GitHub Actions"]
  },
  {
    id: "ilogistics",
    githubUrl: "https://github.com/YusufJojeh/Logistics-MovingBookingSystem",
    demoUrl: DEMO_COMING_SOON,
    stack: ["Laravel", "MySQL", "Redis", "REST APIs", "JWT", "RBAC", "Docker"]
  },
  {
    id: "hirelens",
    githubUrl: null,
    demoUrl: DEMO_COMING_SOON,
    stack: ["Laravel 12", "PHP 8.2+", "Inertia.js 2", "React 19", "Tailwind CSS 4", "Radix UI", "Pest/PHPUnit", "Playwright", "PHPStan/Larastan"]
  },
  {
    id: "linguacoach",
    githubUrl: null,
    demoUrl: DEMO_COMING_SOON,
    stack: ["Next.js", "TypeScript", "FastAPI", "Pydantic", "SQLAlchemy 2", "Alembic", "PostgreSQL", "Redis", "Docker Compose", "Vitest", "Playwright"]
  },
  {
    id: "dhura",
    githubUrl: null,
    demoUrl: DEMO_COMING_SOON,
    stack: ["Laravel", "React", "PostgreSQL", "Redis", "RBAC", "OpenAI API"]
  },
  {
    id: "careerguide",
    githubUrl: null,
    demoUrl: DEMO_COMING_SOON,
    stack: ["React 19", "Vite", "TypeScript", "Tailwind CSS 4", "FastAPI", "SQLAlchemy 2", "Alembic", "ReportLab", "PostgreSQL"]
  },
  {
    id: "mtjri",
    githubUrl: null,
    demoUrl: DEMO_COMING_SOON,
    stack: ["Laravel", "React", "MySQL", "RBAC", "Web Installer"]
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
    description: "Medical appointment booking and patient management platform with multi-role workflows, payment processing integration, automated reminders, AI-assisted booking and workflow automation, health metrics tracking, subscriptions, referral system, and privacy-aware data handling.",
    technologies: ["Laravel", "Blade", "Vite", "Tailwind CSS", "MySQL", "Redis", "Stripe", "OpenAI", "Pest", "Alpine.js"],
    githubUrl: "https://github.com/YusufJojeh/medical-booking-system"
  },
  {
    id: "11",
    title: "Rakez ERP – Enterprise Resource Planning System",
    description: "Enterprise-grade ERP platform for real estate and sales management with automated commission calculation (multi-party distribution, approval workflows, VAT), advanced booking/reservations with waiting list system, 67+ role-based permissions across 9 predefined roles, real-time WebSocket notifications, AI-powered assistant (OpenAI with Arabic support), comprehensive analytics dashboards, marketing budget tracking with platform integrations (Facebook SDK, TikTok API), media management, 150+ protected API endpoints, and production-ready architecture for complex business operations.",
    technologies: ["Laravel 12", "PHP 8.2+", "MySQL", "PostgreSQL", "Redis", "Laravel Reverb", "Sanctum", "Spatie Permission", "Vite", "Vue/React", "OpenAI", "Facebook SDK", "TikTok API", "mPDF"],
    githubUrl: "https://github.com/YusufJojeh/rakez-erp"
  },
  {
    id: "12",
    title: "E-Commerce Platform – Modern Digital Commerce Solution",
    description: "Production-ready enterprise e-commerce platform with sophisticated product management, premium glassmorphism UI with 3D animations, powerful Orchid admin dashboard for content management, multi-level caching strategy (page, fragment, query with Redis), automatic image optimization with WebP conversion, advanced product filtering and search, wishlist system, promotional banners/slides, offer management, complete backup/versioning infrastructure, responsive design across all devices, and optimized performance architecture delivering < 2 second page loads.",
    technologies: ["Laravel 12", "React 18", "PHP 8.2+", "MySQL", "PostgreSQL", "Vite", "Redux Toolkit", "React Router", "React Query", "Tailwind CSS", "Redis", "Intervention Image", "Orchid Platform", "Framer Motion", "React Hook Form"],
    featured: true,
    githubUrl: "https://github.com/YusufJojeh/ecommerce-platform"
  }
];

export const skillGroups = [
  {
    id: "backend",
    skills: ["Laravel", "FastAPI", "NestJS", "REST APIs", "API versioning", "Validation", "Services", "Queues", "Webhooks"]
  },
  {
    id: "saas",
    skills: ["CRM", "ERP", "RBAC", "Multi-role workflows", "Tenant isolation", "Reporting dashboards", "Audit logs"]
  },
  {
    id: "database",
    skills: ["MySQL", "PostgreSQL", "MariaDB", "Redis", "Indexing", "Eager loading", "Query profiling", "Caching"]
  },
  {
    id: "frontend",
    skills: ["React", "TypeScript", "Inertia.js", "Vite", "Tailwind CSS", "shadcn/ui", "Responsive UI"]
  },
  {
    id: "ai",
    skills: ["OpenAI API", "Ollama", "LLM workflows", "RAG basics", "AI assistants", "Structured JSON outputs", "Prompt context design"]
  },
  {
    id: "devops",
    skills: ["Docker", "GitHub Actions", "PHPUnit", "Playwright", "CI/CD checks", "Deployment readiness"]
  }
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
