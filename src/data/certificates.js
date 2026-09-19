import agenticFrontendCodex from '../assets/certificates/agentic_frontend_codex.jpg';
import aiEngineerAssociate from '../assets/certificates/AI-Engineer_for_Developers_Associate.jpg';

export const certificateFilterGroups = [
  { id: 'all', label: 'All Credentials', icon: 'Sparkles' },
  { id: 'ai', label: 'AI & Emerging Tech', icon: 'Cpu' },
  { id: 'fullstack', label: 'Full-Stack & Laravel', icon: 'Layers' },
  { id: 'frontend', label: 'Frontend & Core', icon: 'Code' },
  { id: 'git', label: 'Git & DevOps', icon: 'GitBranch' },
];

export const certificatesData = [
  {
    id: 1,
    title: "Full Stack Web Development with PHP, Laravel & Vue JS",
    issuer: "Ostad",
    date: "2025",
    category: "Full-Stack Development",
    filterGroup: "fullstack",
    credentialId: "C32929",
    image: "https://lh3.googleusercontent.com/d/1EjvExHwZL7M-hBEsErCe6bHoJgLIurSo",
    verifyLink: "https://ostad.app/share/certificate/c32929-sakib-al-mahamud",
    brandColor: "#FF5B5B",
    brandGlow: "rgba(255, 91, 91, 0.28)"
  },
  {
    id: 2,
    title: "PHP Laravel: Build Travel Agency Management System",
    issuer: "Udemy",
    date: "2026",
    category: "Backend Development",
    filterGroup: "fullstack",
    credentialId: "UC-0de7ecd3-04de-4d3b-aed5-a47159abf6d3",
    image: "https://lh3.googleusercontent.com/d/1gxYLuRkOctiwhC6FgaUNpNd-2_TPcAMx",
    verifyLink: "https://ude.my/UC-0de7ecd3-04de-4d3b-aed5-a47159abf6d3",
    brandColor: "#A435F0",
    brandGlow: "rgba(164, 53, 240, 0.28)"
  },
  {
    id: 3,
    title: "PHP with MySQL: Build Complete Coffee Shop System",
    issuer: "Udemy",
    date: "2025",
    category: "Backend Development",
    filterGroup: "fullstack",
    credentialId: "UC-839428f7-2118-45cd-9617-e8f0c5e3d66a",
    image: "https://lh3.googleusercontent.com/d/13NZPN9B2yVXoiBHGTqWW1viJwtShT9zP",
    verifyLink: "https://www.udemy.com/certificate/UC-839428f7-2118-4c5d-9617-e8f0c5e3d66a/",
    brandColor: "#A435F0",
    brandGlow: "rgba(164, 53, 240, 0.28)"
  },
  {
    id: 4,
    title: "Agentic Frontend Development with Codex",
    issuer: "Master.dev",
    date: "2026",
    category: "Frontend Development",
    filterGroup: "ai",
    credentialId: "a7369a9728-FJJmMtPYYU",
    image: agenticFrontendCodex,
    verifyLink: "https://static.frontendmasters.com/ud/c/a7369a9728/FJJmMtPYYU/codex-masterdev.pdf",
    brandColor: "#8B5CF6",
    brandGlow: "rgba(139, 92, 246, 0.32)"
  },
  {
    id: 5,
    title: "AI Engineer for Developers Associate",
    issuer: "DataCamp",
    date: "2026",
    category: "Artificial Intelligence",
    filterGroup: "ai",
    credentialId: "AIEDA0013165163293",
    image: aiEngineerAssociate,
    verifyLink: "https://www.datacamp.com/certificate/AIEDA0013165163293",
    brandColor: "#03EF62",
    brandGlow: "rgba(3, 239, 98, 0.32)"
  },
  {
    id: 6,
    title: "Introduction to Git",
    issuer: "Microsoft",
    date: "2026",
    category: "Version Control",
    filterGroup: "git",
    credentialId: "F5DD6607D36D0F71",
    image: "https://lh3.googleusercontent.com/d/1jMXne4c-KS1o26uMBhWDbQPEij9QMOm7",
    verifyLink: "https://learn.microsoft.com/api/achievements/share/en-us/SAKIBALMAHAMUD-2258/JHLKW5UT?sharingId=F5DD6607D36D0F71",
    brandColor: "#00A4EF",
    brandGlow: "rgba(0, 164, 239, 0.3)"
  },
  {
    id: 7,
    title: "Introduction to GitHub",
    issuer: "Microsoft",
    date: "2026",
    category: "Collaboration",
    filterGroup: "git",
    credentialId: "F5DD6607D36D0F71",
    image: "https://lh3.googleusercontent.com/d/1vz6R_d0NznAMBpbVe-5bB6SXgN1QOzNo",
    verifyLink: "https://learn.microsoft.com/api/achievements/share/en-us/SAKIBALMAHAMUD-2258/U7W62VL3?sharingId=F5DD6607D36D0F71",
    brandColor: "#00A4EF",
    brandGlow: "rgba(0, 164, 239, 0.3)"
  },
  {
    id: 8,
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    date: "2026",
    category: "Frontend Development",
    filterGroup: "frontend",
    credentialId: "719766121a78afef4bcde5c0ec25a0e8",
    image: "https://lh3.googleusercontent.com/d/1R60l7o2okldTSmKskzUGvbN99bYpFC62",
    verifyLink: "https://coursera.org/share/719766121a78afef4bcde5c0ec25a0e8",
    brandColor: "#1877F2",
    brandGlow: "rgba(24, 119, 242, 0.3)"
  },
  {
    id: 9,
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "2025",
    category: "Programming",
    filterGroup: "frontend",
    credentialId: "d92f9199-2f2f-49f1-bc5d-475791bfe8dc",
    image: "https://lh3.googleusercontent.com/d/1PMNyQ77yLGDXXdD2YxvbKmi-5sYdGApx",
    verifyLink: "https://www.netacad.com/certificates/?issuanceId=d92f9199-2f2f-49f1-bc5d-475791bfe8dc",
    brandColor: "#049FD9",
    brandGlow: "rgba(4, 159, 217, 0.3)"
  }
];
