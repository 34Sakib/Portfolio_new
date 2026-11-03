import React from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Building2, 
  ShoppingBag, 
  ShoppingCart, 
  Laptop, 
  Database, 
  Coffee, 
  Award, 
  Code,
  Atom,
  Flame,
  Globe,
  Cpu,
  Layers,
  FileCode,
  Server,
  Terminal
} from 'lucide-react';

// Custom inline SVG GitHub Icon using pure React.createElement
export const GithubIcon = ({ size = 18, ...props }) => (
  React.createElement('svg', {
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    stroke: 'currentColor',
    strokeWidth: 2,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...props
  }, 
    React.createElement('path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' }),
    React.createElement('path', { d: 'M9 18c-4.51 2-5-2-7-2' })
  )
);

// High-fidelity color palettes precisely extracted from the actual project screenshot images
export const projectColorPalette = {
  13: { // READWISE -> Warm Amber Gold
    primary: '#F59E0B',
    secondary: '#D97706',
    glow: 'rgba(245, 158, 11, 0.28)',
    accent: '#FDE68A',
    category: 'EdTech & E-Learning Platform'
  },
  9: { // Mentors' Global -> Crimson / Scarlet Red
    primary: '#E11D48',
    secondary: '#BE123C',
    glow: 'rgba(225, 29, 72, 0.28)',
    accent: '#FDA4AF',
    category: 'International Education Platform'
  },
  12: { // Enterprise ERP -> Electric Violet / Royal Indigo
    primary: '#6366F1',
    secondary: '#7C3AED',
    glow: 'rgba(99, 102, 241, 0.28)',
    accent: '#C4B5FD',
    category: 'Enterprise Resource Planning & HRIS'
  },
  11: { // Nuvara -> Lush Emerald / Teal Green & Sunny Gold
    primary: '#0D9488',
    secondary: '#10B981',
    glow: 'rgba(13, 148, 136, 0.28)',
    accent: '#FACC15',
    category: 'Global Multilingual E-Commerce'
  },
  10: { // Kino Atelier -> Champagne Travertine / Amber Oak
    primary: '#D4A373',
    secondary: '#B45309',
    glow: 'rgba(212, 163, 115, 0.28)',
    accent: '#FEF3C7',
    category: 'Luxury Handcrafted Home Decor'
  },
  1: { // FruitMart -> Fresh Botanical / Leaf Green
    primary: '#16A34A',
    secondary: '#15803D',
    glow: 'rgba(226, 163, 74, 0.28)',
    accent: '#F59E0B',
    category: 'Fresh Farm Produce & Organics'
  },
  2: { // CodexLabAsia -> Electric Tech Sky Blue
    primary: '#0284C7',
    secondary: '#06B6D4',
    glow: 'rgba(2, 132, 199, 0.28)',
    accent: '#38BDF8',
    category: 'IT Solutions & Cloud Consultancy'
  },
  3: { // CRM E-Commerce -> Cobalt Royal Blue & Tangerine
    primary: '#2563EB',
    secondary: '#EA580C',
    glow: 'rgba(37, 99, 235, 0.28)',
    accent: '#10B981',
    category: 'B2B Enterprise Commerce CRM'
  },
  4: { // Coffee Blend -> Roasted Cafe Espresso & Caramel Gold
    primary: '#C49B63',
    secondary: '#8C6239',
    glow: 'rgba(196, 155, 99, 0.28)',
    accent: '#EED9B3',
    category: 'Artisanal Cafe Ordering Suite'
  },
  6: { // Hospital Management -> Clinical Aqua Teal
    primary: '#00A8B5',
    secondary: '#0284C7',
    glow: 'rgba(0, 168, 181, 0.28)',
    accent: '#67E8F9',
    category: 'Clinical Healthcare & Appointments'
  },
  8: { // Online Learning System -> Electric Violet & Indigo
    primary: '#8B5CF6',
    secondary: '#4F46E5',
    glow: 'rgba(139, 92, 246, 0.28)',
    accent: '#F43F5E',
    category: 'EdTech Learning Platform API'
  }
};

export const getProjectColors = (project) => {
  if (!project) return { primary: '#F0824A', secondary: '#E36A2E', glow: 'rgba(240, 130, 74, 0.25)', accent: '#FDE68A', category: 'Production Case Study' };
  if (projectColorPalette[project.id]) return projectColorPalette[project.id];
  return { primary: '#F0824A', secondary: '#E36A2E', glow: 'rgba(240, 130, 74, 0.25)', accent: '#FDE68A', category: 'Production Case Study' };
};

export const getProjectIcon = (iconName) => {
  switch (iconName) {
    case 'BookOpen': return React.createElement(BookOpen, { size: 15 });
    case 'GraduationCap': return React.createElement(GraduationCap, { size: 15 });
    case 'Building2': return React.createElement(Building2, { size: 15 });
    case 'ShoppingBag': return React.createElement(ShoppingBag, { size: 15 });
    case 'ShoppingCart': return React.createElement(ShoppingCart, { size: 15 });
    case 'Laptop': return React.createElement(Laptop, { size: 15 });
    case 'Database': return React.createElement(Database, { size: 15 });
    case 'Coffee': return React.createElement(Coffee, { size: 15 });
    case 'Award': return React.createElement(Award, { size: 15 });
    default: return React.createElement(Code, { size: 15 });
  }
};

export const getTagIcon = (tagName) => {
  const name = tagName.toLowerCase();
  if (name.includes('react')) return React.createElement(Atom, { size: 12, className: "tag-icon text-react", style: { color: '#00d8ff' } });
  if (name.includes('laravel')) return React.createElement(Flame, { size: 12, className: "tag-icon text-laravel", style: { color: '#ff2d20' } });
  if (name.includes('mysql') || name.includes('postgres') || name.includes('sqlite')) return React.createElement(Database, { size: 12, className: "tag-icon text-db", style: { color: '#336791' } });
  if (name.includes('api')) return React.createElement(Globe, { size: 12, className: "tag-icon text-api", style: { color: '#f59e0b' } });
  if (name.includes('php')) return React.createElement(Cpu, { size: 12, className: "tag-icon text-php", style: { color: '#777bb4' } });
  if (name.includes('bootstrap') || name.includes('tailwind')) return React.createElement(Layers, { size: 12, className: "tag-icon text-tailwind", style: { color: '#38bdf8' } });
  if (name.includes('vite')) return React.createElement(Flame, { size: 12, className: "tag-icon text-vite", style: { color: '#646cff' } });
  if (name.includes('zustand')) return React.createElement(Cpu, { size: 12, className: "tag-icon text-zustand", style: { color: '#ff9900' } });
  if (name.includes('i18n')) return React.createElement(Globe, { size: 12, className: "tag-icon text-i18n", style: { color: '#10b981' } });
  if (name.includes('typescript')) return React.createElement(FileCode, { size: 12, className: "tag-icon text-ts", style: { color: '#3178c6' } });
  if (name.includes('javascript') || name.includes('jquery')) return React.createElement(Code, { size: 12, className: "tag-icon text-js", style: { color: '#f7df1e' } });
  if (name.includes('nestjs')) return React.createElement(Server, { size: 12, className: "tag-icon text-node", style: { color: '#e0234e' } });
  if (name.includes('typeorm')) return React.createElement(Terminal, { size: 12, className: "tag-icon text-vite", style: { color: '#f59e0b' } });
  if (name.includes('blade') || name.includes('datatables')) return React.createElement(Layers, { size: 12, className: "tag-icon text-html", style: { color: '#f0533c' } });
  return React.createElement(Terminal, { size: 12, className: "tag-icon" });
};

