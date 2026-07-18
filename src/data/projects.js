import codexlabasia from '../assets/codexlabasia.png';

export const projectsData = [
  {
    id: 9,
    title: "Mentors' Global",
    description: "Comprehensive education management platform featuring IELTS and PTE course dashboards, online mock testing, and interactive student review systems.",
    features: [
      "Designed and developed the comprehensive admin dashboard panel to manage IELTS & PTE course curricula and scheduling.",
      "Built interactive mock exam test environments and practice modules for student assessment and grading.",
      "Developed secure RESTful API endpoints using Laravel to seamlessly integrate with a React.js client interface.",
      "Optimized MySQL relational database models to store and evaluate mock test results, answers, and student progress metrics."
    ],
    image: "https://lh3.googleusercontent.com/d/1fPgL0H1kOFlZroXzbq_1F4JIJaAqtAJT",
    tags: ["Laravel 10", "React.js", "MySQL", "REST API", "Bootstrap 5"],
    demoLink: "https://mentorsglobal.com.au/",
    icon: "GraduationCap",
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50"
  },
  {
    id: 1,
    title: "FruitMart E-commerce",
    description: "Laravel-based platform for fresh fruit sales with inventory, orders, and vendor management.",
    features: [
      "Built a complete e-commerce platform for online fruit sales.",
      "Implemented secure authentication, product management, cart, and order system.",
      "Developed a custom admin dashboard for product and vendor management.",
      "Designed responsive UI for mobile and desktop users."
    ],
    image: "https://i.postimg.cc/BQP7Pbdv/image.png",
    tags: ["Laravel 10", "MySQL", "JavaScript", "Bootstrap 5"],
    githubLink: "https://github.com/34Sakib/Fruit-Page",
    demoLink: "#",
    icon: "ShoppingCart",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    title: "CodexLabAsia Business Hub",
    description: "Official business system for CodexLabAsia, featuring CMS, portfolios, and job tracking.",
    features: [
      "Developed a Laravel-based business management system with frontend and admin modules.",
      "Implemented role-based authentication using Laravel Sanctum and Spatie Permission.",
      "Created CMS for services, portfolio, team, and career sections.",
      "Integrated job application system with file uploads and application tracking."
    ],
    image: codexlabasia,
    tags: ["Laravel", "MySQL", "Blade", "Bootstrap 5", "jQuery"],
    githubLink: "https://github.com/34Sakib/TechSolution_IT",
    demoLink: "#",
    icon: "Laptop",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50"
  },
  {
    id: 3,
    title: "CRM E-Commerce Suite (ShopVerse)",
    description: "Full-stack e-commerce system featuring API-driven checkouts and role access permissions.",
    features: [
      "Designed and implemented RESTful APIs to handle product management, cart, and order processing.",
      "Built dynamic, responsive user interfaces with React.js for product browsing and checkout.",
      "Implemented secure authentication and role-based access for users and administrators.",
      "Integrated product inventory management, order tracking, and admin dashboard functionalities."
    ],
    image: "https://i.postimg.cc/rFJVWtjt/image.png",
    tags: ["Laravel 10", "React.js", "REST API", "MySQL", "Bootstrap 5"],
    githubLink: "https://github.com/34Sakib/CRM-E-Commerce",
    demoLink: "#",
    icon: "Database",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50"
  },
  {
    id: 4,
    title: "Coffee Blend Cafe",
    description: "Responsive cafe customer ordering and menu administration site.",
    features: [
      "Built a coffee shop website with user registration and ordering system.",
      "Developed admin dashboard for menu and content management.",
      "Designed responsive pages for menu, services, about, and contact sections."
    ],
    image: "https://i.postimg.cc/C5htVd85/image.png",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap 5"],
    githubLink: "https://github.com/34Sakib/Coffee_Shop",
    demoLink: "#",
    icon: "Coffee",
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-50"
  },
  {
    id: 6,
    title: "Hospital Management System",
    description: "Laravel-based panel for doctor assignments, appointments, and billing.",
    features: [
      "Designed complete relational database schema for doctor scheduling and patient records.",
      "Implemented secure registration pipelines and patient scheduling controls.",
      "Built clean dashboard control panels using Bootstrap 5 for administrators, doctors, and patients."
    ],
    image: "https://i.postimg.cc/wjYPWY5W/image.png",
    tags: ["PHP", "Laravel", "Bootstrap", "MySQL"],
    githubLink: "https://github.com/34Sakib/Hospital_Management",
    demoLink: "#",
    icon: "Award",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50"
  },
  {
    id: 8,
    title: "Online Learning System Backend",
    description: "Structured NestJS API backend for student registrations and course enrollments.",
    features: [
      "Designed and implemented structured REST APIs using NestJS and TypeScript.",
      "Configured secure JWT role-based authentication guards.",
      "Structured entity relationships and database operations with PostgreSQL using TypeORM."
    ],
    image: "https://i.postimg.cc/sfBpvQFW/Screenshot-2025-06-04-155348.png",
    tags: ["TypeScript", "NestJS", "PostgreSQL", "TypeORM"],
    githubLink: "https://github.com/34Sakib/Online-Learning-System",
    demoLink: "#",
    icon: "GraduationCap",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50"
  }
];
