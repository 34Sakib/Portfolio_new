import React from 'react';
import { 
  ShoppingCart, 
  Laptop, 
  Database, 
  Coffee, 
  Award, 
  GraduationCap, 
  ExternalLink,
  Check,
  Atom, 
  Layers, 
  FileCode, 
  Code, 
  Cpu, 
  Flame, 
  Globe, 
  Server, 
  Terminal
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

// Custom inline SVG GitHub Icon to bypass brand icon exclusion in lucide-react
const GithubIcon = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Brand theme color configuration mapping
const projectColorMap = {
  'from-teal-500 to-emerald-500': { primary: '#14b8a6', secondary: '#10b981', glow: 'rgba(20, 184, 166, 0.15)' },
  'from-blue-500 to-cyan-500': { primary: '#3b82f6', secondary: '#06b6d4', glow: 'rgba(59, 130, 246, 0.15)' },
  'from-indigo-500 to-blue-500': { primary: '#6366f1', secondary: '#3b82f6', glow: 'rgba(99, 102, 241, 0.15)' },
  'from-purple-500 to-pink-500': { primary: '#a855f7', secondary: '#ec4899', glow: 'rgba(168, 85, 247, 0.15)' },
  'from-amber-500 to-yellow-500': { primary: '#f59e0b', secondary: '#eab308', glow: 'rgba(245, 158, 11, 0.15)' },
  'from-red-500 to-pink-500': { primary: '#ef4444', secondary: '#ec4899', glow: 'rgba(239, 68, 68, 0.15)' },
  'from-indigo-500 to-purple-500': { primary: '#6366f1', secondary: '#a855f7', glow: 'rgba(99, 102, 241, 0.15)' }
};

const getProjectColors = (colorString) => {
  return projectColorMap[colorString] || { primary: '#6C63FF', secondary: '#00D9FF', glow: 'rgba(108, 99, 255, 0.15)' };
};

// Map project icons dynamically
const getProjectIcon = (iconName, colors) => {
  const iconColor = colors ? colors.primary : 'currentColor';
  switch (iconName) {
    case 'ShoppingCart':
      return <ShoppingCart size={18} style={{ color: iconColor }} />;
    case 'Laptop':
      return <Laptop size={18} style={{ color: iconColor }} />;
    case 'Database':
      return <Database size={18} style={{ color: iconColor }} />;
    case 'Coffee':
      return <Coffee size={18} style={{ color: iconColor }} />;
    case 'Award':
      return <Award size={18} style={{ color: iconColor }} />;
    case 'GraduationCap':
      return <GraduationCap size={18} style={{ color: iconColor }} />;
    default:
      return <Laptop size={18} style={{ color: iconColor }} />;
  }
};

// Map technical skill tag names to Lucide icons dynamically
const getTagIcon = (tagName) => {
  const name = tagName.toLowerCase();
  if (name.includes('react')) return <Atom size={12} className="tag-icon text-react" style={{ color: '#00d8ff' }} />;
  if (name.includes('laravel')) return <Flame size={12} className="tag-icon text-laravel" style={{ color: '#ff2d20' }} />;
  if (name.includes('mysql')) return <Database size={12} className="tag-icon text-db" style={{ color: '#336791' }} />;
  if (name.includes('postgres')) return <Database size={12} className="tag-icon text-db" style={{ color: '#336791' }} />;
  if (name.includes('api')) return <Globe size={12} className="tag-icon text-api" style={{ color: '#f59e0b' }} />;
  if (name.includes('php')) return <Cpu size={12} className="tag-icon text-php" style={{ color: '#777bb4' }} />;
  if (name.includes('bootstrap')) return <Layers size={12} className="tag-icon text-tailwind" style={{ color: '#38bdf8' }} />;
  if (name.includes('typescript')) return <FileCode size={12} className="tag-icon text-ts" style={{ color: '#3178c6' }} />;
  if (name.includes('javascript') || name.includes('jquery')) return <Code size={12} className="tag-icon text-js" style={{ color: '#f7df1e' }} />;
  if (name.includes('nestjs')) return <Server size={12} className="tag-icon text-node" style={{ color: '#e0234e' }} />;
  if (name.includes('typeorm')) return <Terminal size={12} className="tag-icon text-vite" style={{ color: '#f59e0b' }} />;
  if (name.includes('blade')) return <Layers size={12} className="tag-icon text-html" style={{ color: '#f0533c' }} />;
  return <Terminal size={12} className="tag-icon" />;
};

export const Projects = () => {
  
  // Custom interactive 3D Tilt and Shine calculations
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = ((x - rect.width / 2) / (rect.width / 2)) * 6; // Max 6 degrees tilt
    const yc = -((y - rect.height / 2) / (rect.height / 2)) * 6;
    
    card.style.transform = `perspective(1000px) rotateX(${yc}deg) rotateY(${xc}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--shine-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--shine-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="projects" className="section reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="projects-gallery-grid">
          {projectsData.map((project) => {
            const colors = getProjectColors(project.color);
            return (
              <GlassCard 
                key={project.id} 
                className="project-gallery-card"
                style={{
                  '--proj-color-primary': colors.primary,
                  '--proj-color-secondary': colors.secondary,
                  '--proj-color-glow': colors.glow
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Shine Overlay Effect */}
                <div className="project-card-shine"></div>

                {/* Project Card Image Frame - Placed at top */}
                <div className="project-gallery-image-box">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-gallery-img" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                  <div className="project-gallery-image-overlay" />
                </div>

                {/* Project Card Header */}
                <div className="project-gallery-header">
                  <div className="project-gallery-icon-box">
                    {getProjectIcon(project.icon, colors)}
                  </div>
                  <h3 className="project-gallery-title">{project.title}</h3>
                </div>

                {/* Project Card Content Body */}
                <div className="project-gallery-body">
                  <p className="project-gallery-desc">{project.description}</p>
                  
                  {/* Detailed checklist from CV */}
                  <ul className="project-features-list">
                    {project.features && project.features.map((feat, fIdx) => (
                      <li key={fIdx} className="project-feature-item">
                        <Check size={14} className="feature-check-icon" />
                        <span className="feature-text">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech badges */}
                  <div className="project-gallery-tags">
                    {project.tags.map((tag, tIdx) => (
                      <Badge key={tIdx} className="project-gallery-tag">
                        {getTagIcon(tag)}
                        <span>{tag}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="project-gallery-footer">
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary project-footer-btn project-btn-github"
                  >
                    <GithubIcon size={16} /> Code Repository
                  </a>
                  {project.demoLink && project.demoLink !== "#" && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary project-footer-btn project-btn-demo"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
