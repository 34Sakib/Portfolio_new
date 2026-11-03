import readwise from '../assets/readwise.png';
import codexlabasia from '../assets/codexlabasia.png';
import kino from '../assets/kino.png';
import nuvara from '../assets/Nuvara.png';
import mentorsGlobal from '../assets/mentors_global.png';
import erp from '../assets/erp.png';
import fruitmart from '../assets/fruitmart.png';
import crmEcommerce from '../assets/crm_ecommerce.png';
import coffeeBlend from '../assets/coffee_blend.png';
import hospitalManagement from '../assets/hospital_management.png';
import onlineLearning from '../assets/online_learning.png';

const rawProjectsData = [
  {
    id: 13,
    title: "READWISE - Mentors' Vocabulary & Interactive Reader Suite",
    subtitle: "Vocabulary Learning & Interactive Reader Suite",
    keyMetric: "Tested & Scalable • Multi-guard RBAC",
    description: "Full-stack vocabulary learning and reading comprehension platform with interactive word lookups and real-time progress analytics.",
    features: [
      "Designed and implemented an interactive in-text vocabulary engine with instant word definitions, parts-of-speech tagging, and word favoriting.",
      "Built a responsive student dashboard featuring adaptive reading history, Daily 20 practice modules, and visual reading activity metrics.",
      "Implemented multi-guard authentication and role-based access control (RBAC) for students, instructors, and administrators.",
      "Integrated batch & course enrollment pipelines, dynamic article management, Yajra DataTables, and automated daily activity audit logging."
    ],
    image: readwise,
    tags: ["Laravel 12", "PHP 8.2", "MySQL", "Tailwind CSS", "JavaScript", "Vite", "REST API", "Blade", "DataTables"],
    demoLink: "https://readwise.org/",
    icon: "BookOpen",
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-50"
  },
  {
    id: 9,
    title: "Mentors' Global",
    subtitle: "IELTS & PTE Educational Examination Platform",
    keyMetric: "5,000+ Students • Automated Grading",
    description: "Comprehensive education management platform featuring IELTS and PTE course dashboards, online mock testing, and interactive student review systems.",
    features: [
      "Designed and developed the comprehensive admin dashboard panel to manage IELTS & PTE course curricula and scheduling.",
      "Built interactive mock exam test environments and practice modules for student assessment and grading.",
      "Developed secure RESTful API endpoints using Laravel to seamlessly integrate with a React.js client interface.",
      "Optimized MySQL relational database models to store and evaluate mock test results, answers, and student progress metrics."
    ],
    image: mentorsGlobal,
    tags: ["Laravel 10", "React.js", "MySQL", "REST API", "Bootstrap 5"],
    demoLink: "https://mentorsglobal.com.au/",
    icon: "GraduationCap",
    color: "from-rose-500 to-red-600",
    bgColor: "bg-rose-50"
  },
  {
    id: 12,
    title: "Enterprise ERP & HR Management System",
    subtitle: "Full-Stack Enterprise Resource Planning & HRIS",
    keyMetric: "Multi-tenant Scoping • Automated Payroll",
    description: "Full-stack enterprise resource planning platform featuring multi-company RBAC, automated payroll, HRIS, CRM, inventory, and financial accounting modules.",
    features: [
      "Architected a full-stack Enterprise Resource Planning (ERP) platform utilizing Laravel 12, Blade components, and Tailwind CSS 4.",
      "Built comprehensive HRIS & Workforce modules including employee directory, web punch attendance, shift scheduling, and leave approvals.",
      "Engineered an automated payroll system with customizable salary structures, loans/advances management, and PDF payslip generation.",
      "Integrated core enterprise operational tools: Inventory with multi-warehouse support, CRM deals pipeline, and Project time-tracking.",
      "Designed role-based access control (RBAC) with Spatie permissions, multi-tenant company data scoping, and activity audit logging."
    ],
    image: erp,
    tags: ["Laravel 12", "PHP 8.2", "Tailwind CSS 4", "Vite 7", "Spatie RBAC", "Blade", "DataTables", "SQLite / MySQL"],
    githubLink: "https://github.com/34Sakib/ERP",
    demoLink: "#",
    icon: "Building2",
    color: "from-indigo-500 to-violet-600",
    bgColor: "bg-indigo-50"
  },
  {
    id: 11,
    title: "Nuvara E-commerce Platform",
    subtitle: "Global Multilingual E-Commerce Storefront",
    keyMetric: "RTL Arabic & i18n • Real-time Zustand Cart",
    description: "Full-stack modern e-commerce platform with multi-language RTL support, promo code engine, and dynamic theme customization.",
    features: [
      "Built a full-stack e-commerce web app with a React 19 SPA frontend and Laravel RESTful API backend.",
      "Implemented secure user authentication, product catalog, customer reviews, wishlist management, and order processing.",
      "Developed an interactive cart and checkout workflow with real-time promo code engine powered by Zustand.",
      "Integrated multi-language localization (i18n) supporting English, Spanish, Bengali, and native RTL Arabic layout.",
      "Designed a mobile-responsive UI with light/dark theme toggle, Framer Motion animations, and an admin dashboard."
    ],
    image: nuvara,
    tags: ["React 19", "Vite", "Laravel 12", "Tailwind CSS", "Zustand", "i18next", "MySQL"],
    githubLink: "https://github.com/34Sakib/Nuvara",
    demoLink: "#",
    icon: "ShoppingBag",
    color: "from-teal-500 to-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    id: 10,
    title: "Kino Atelier",
    subtitle: "Curated Handcrafted Home Decor Storefront",
    keyMetric: "Filament Admin • Stripe Checkout Integrated",
    description: "Elegant e-commerce storefront specializing in curated handcrafted travertine, white oak, and fluted earthenware home decor.",
    features: [
      "Designed and developed a high-fidelity Single Page Application (SPA) frontend focused on premium design aesthetics, fluid transitions, and dynamic scroll-responsive navigation.",
      "Built a comprehensive administration dashboard panel utilizing Filament to manage product inventory, categories, active coupon codes, and shipping logs.",
      "Developed secure RESTful API endpoints using Laravel 12 to handle user authentication, product catalogs, and cart state management.",
      "Integrated Stripe Checkout for seamless, secure transaction processing and payment verification.",
      "Optimized database models and media libraries to manage product variations, galleries, and client review media."
    ],
    image: kino,
    tags: ["Laravel 12", "React.js", "Tailwind CSS", "Zustand", "MySQL", "Stripe API"],
    githubLink: "https://github.com/34Sakib/Kino",
    demoLink: "#",
    icon: "ShoppingBag",
    color: "from-amber-600 to-orange-700",
    bgColor: "bg-amber-50"
  },
  {
    id: 1,
    title: "FruitMart E-commerce",
    subtitle: "Fresh Farm Produce & Organics Portal",
    keyMetric: "Live Vendor Scoping • Order Tracking",
    description: "Laravel-based platform for fresh fruit sales with inventory, orders, and vendor management.",
    features: [
      "Built a complete e-commerce platform for online fruit sales.",
      "Implemented secure authentication, product management, cart, and order system.",
      "Developed a custom admin dashboard for product and vendor management.",
      "Designed responsive UI for mobile and desktop users."
    ],
    image: fruitmart,
    tags: ["Laravel 10", "MySQL", "JavaScript", "Bootstrap 5"],
    githubLink: "https://github.com/34Sakib/Fruit-Page",
    demoLink: "#",
    icon: "ShoppingCart",
    color: "from-green-600 to-emerald-600",
    bgColor: "bg-green-50"
  },
  {
    id: 2,
    title: "CodexLabAsia Business Hub",
    subtitle: "IT Solutions & Business Management Portal",
    keyMetric: "Spatie Permissions • High-traffic DataTables",
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
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50"
  },
  {
    id: 3,
    title: "CRM E-Commerce Suite (ShopVerse)",
    subtitle: "B2B Enterprise Commerce & Lead CRM",
    keyMetric: "B2B Deals Pipeline • RESTful Microservices",
    description: "Full-stack e-commerce system featuring API-driven checkouts and role access permissions.",
    features: [
      "Designed and implemented RESTful APIs to handle product management, cart, and order processing.",
      "Built dynamic, responsive user interfaces with React.js for product browsing and checkout.",
      "Implemented secure authentication and role-based access for users and administrators.",
      "Integrated product inventory management, order tracking, and admin dashboard functionalities."
    ],
    image: crmEcommerce,
    tags: ["Laravel 10", "React.js", "REST API", "MySQL", "Bootstrap 5"],
    githubLink: "https://github.com/34Sakib/CRM-E-Commerce",
    demoLink: "#",
    icon: "Database",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-blue-50"
  },
  {
    id: 4,
    title: "Coffee Blend Cafe",
    subtitle: "Artisanal Cafe Ordering & Menu Suite",
    keyMetric: "Real-time Order Workflow • Responsive Menu",
    description: "Responsive cafe customer ordering and menu administration site.",
    features: [
      "Built a coffee shop website with user registration and ordering system.",
      "Developed admin dashboard for menu and content management.",
      "Designed responsive pages for menu, services, about, and contact sections."
    ],
    image: coffeeBlend,
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap 5"],
    githubLink: "https://github.com/34Sakib/Coffee_Shop",
    demoLink: "#",
    icon: "Coffee",
    color: "from-amber-700 to-yellow-800",
    bgColor: "bg-amber-50"
  },
  {
    id: 6,
    title: "Hospital Management System",
    subtitle: "Clinical Healthcare & Appointments Platform",
    keyMetric: "Doctor Scheduling • Patient Records System",
    description: "Laravel-based panel for doctor assignments, appointments, and billing.",
    features: [
      "Designed complete relational database schema for doctor scheduling and patient records.",
      "Implemented secure registration pipelines and patient scheduling controls.",
      "Built clean dashboard control panels using Bootstrap 5 for administrators, doctors, and patients."
    ],
    image: hospitalManagement,
    tags: ["PHP", "Laravel", "Bootstrap", "MySQL"],
    githubLink: "https://github.com/34Sakib/Hospital_Management",
    demoLink: "#",
    icon: "Award",
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50"
  },
  {
    id: 8,
    title: "Online Learning System Backend",
    subtitle: "EdTech Learning Platform API Microservice",
    keyMetric: "NestJS Architecture • JWT Role Guards",
    description: "Structured NestJS API backend for student registrations and course enrollments.",
    features: [
      "Designed and implemented structured REST APIs using NestJS and TypeScript.",
      "Configured secure JWT role-based authentication guards.",
      "Structured entity relationships and database operations with PostgreSQL using TypeORM."
    ],
    image: onlineLearning,
    tags: ["TypeScript", "NestJS", "PostgreSQL", "TypeORM"],
    githubLink: "https://github.com/34Sakib/Online-Learning-System",
    demoLink: "#",
    icon: "GraduationCap",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50"
  }
];

// Helper to ensure READWISE is pinned as #1 and Mentors' Global as #2
const orderFeaturedProjects = (projects) => {
  const copy = [...projects];
  
  // Extract READWISE if present
  const readwiseIndex = copy.findIndex(
    (p) => p.id === 13 || (p.title && p.title.toLowerCase().includes('readwise'))
  );
  let readwiseItem = null;
  if (readwiseIndex !== -1) {
    [readwiseItem] = copy.splice(readwiseIndex, 1);
  }

  // Extract Mentors' Global if present
  const mentorsIndex = copy.findIndex(
    (p) => p.id === 9 || (p.title && p.title.toLowerCase().includes('mentors'))
  );
  let mentorsItem = null;
  if (mentorsIndex !== -1) {
    [mentorsItem] = copy.splice(mentorsIndex, 1);
  }

  const result = [];
  if (readwiseItem) result.push(readwiseItem);
  if (mentorsItem) result.push(mentorsItem);
  result.push(...copy);
  return result;
};

export const projectsData = orderFeaturedProjects(rawProjectsData);
