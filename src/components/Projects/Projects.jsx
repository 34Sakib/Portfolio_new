import React from 'react';
import { 
  ShoppingCart, 
  Laptop, 
  Database, 
  Coffee, 
  Award, 
  GraduationCap, 
  ExternalLink,
  Check
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

// Map project icons dynamically
const getProjectIcon = (iconName) => {
  switch (iconName) {
    case 'ShoppingCart':
      return <ShoppingCart size={18} className="text-cyan" />;
    case 'Laptop':
      return <Laptop size={18} className="text-purple" />;
    case 'Database':
      return <Database size={18} className="text-orange" />;
    case 'Coffee':
      return <Coffee size={18} className="text-amber" />;
    case 'Award':
      return <Award size={18} className="text-pink" />;
    case 'GraduationCap':
      return <GraduationCap size={18} className="text-indigo" />;
    default:
      return <Laptop size={18} />;
  }
};

export const Projects = () => {
  
  // Custom interactive 3D Tilt and Shine calculations
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = ((x - rect.width / 2) / (rect.width / 2)) * 5; // Max 5 degrees tilt
    const yc = -((y - rect.height / 2) / (rect.height / 2)) * 5;
    
    card.style.transform = `perspective(1000px) rotateX(${yc}deg) rotateY(${xc}deg) scale3d(1.01, 1.01, 1.01)`;
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
          {projectsData.map((project) => (
            <GlassCard 
              key={project.id} 
              className="project-gallery-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Shine Overlay Effect */}
              <div className="project-card-shine"></div>

              {/* Project Card Header */}
              <div className="project-gallery-header">
                <div className="project-gallery-icon-box">
                  {getProjectIcon(project.icon)}
                </div>
                <h3 className="project-gallery-title">{project.title}</h3>
              </div>

              {/* Project Card Image Frame */}
              <div className="project-gallery-image-box">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-gallery-img" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop";
                  }}
                />
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
                      {tag}
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
                  className="btn btn-secondary project-footer-btn"
                >
                  <GithubIcon size={16} /> Code Repository
                </a>
                {project.demoLink && project.demoLink !== "#" && (
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary project-footer-btn"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
