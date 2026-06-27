import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Laptop, 
  Database, 
  Coffee, 
  Server, 
  Award, 
  GraduationCap, 
  ExternalLink 
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

// Custom IceCream icon
const IceCreamIcon = ({ size = 20, ...props }) => (
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
    <path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11" />
    <path d="M17 7A5 5 0 0 0 7 7" />
    <path d="M19 7v12a5 5 0 0 1-10 0V7" />
  </svg>
);

// Map technical skill icon names to actual components
const getProjectIcon = (iconName) => {
  switch (iconName) {
    case 'ShoppingCart':
      return <ShoppingCart className="project-card-icon-svg" />;
    case 'Laptop':
      return <Laptop className="project-card-icon-svg" />;
    case 'Database':
      return <Database className="project-card-icon-svg" />;
    case 'Coffee':
      return <Coffee className="project-card-icon-svg" />;
    case 'Server':
      return <Server className="project-card-icon-svg" />;
    case 'Award':
      return <Award className="project-card-icon-svg" />;
    case 'IceCream':
      return <IceCreamIcon size={20} />;
    case 'GraduationCap':
      return <GraduationCap className="project-card-icon-svg" />;
    default:
      return <Laptop className="project-card-icon-svg" />;
  }
};

const colorMap = {
  "from-blue-500 to-cyan-500": "linear-gradient(135deg, #3b82f6, #06b6d4)",
  "from-indigo-500 to-blue-500": "linear-gradient(135deg, #6366f1, #3b82f6)",
  "from-purple-500 to-pink-500": "linear-gradient(135deg, #a855f7, #ec4899)",
  "from-amber-500 to-yellow-500": "linear-gradient(135deg, #f59e0b, #eab308)",
  "from-green-500 to-emerald-500": "linear-gradient(135deg, #22c55e, #10b981)",
  "from-red-500 to-pink-500": "linear-gradient(135deg, #ef4444, #ec4899)",
  "from-cyan-500 to-blue-500": "linear-gradient(135deg, #06b6d4, #3b82f6)",
  "from-indigo-500 to-purple-500": "linear-gradient(135deg, #6366f1, #a855f7)",
  "from-green-600 to-emerald-600": "linear-gradient(135deg, #16a34a, #059669)",
};

const bgColorMap = {
  "bg-blue-50": "rgba(59, 130, 246, 0.08)",
  "bg-indigo-50": "rgba(99, 102, 241, 0.08)",
  "bg-purple-50": "rgba(168, 85, 247, 0.08)",
  "bg-amber-50": "rgba(245, 158, 11, 0.08)",
  "bg-green-50": "rgba(34, 197, 94, 0.08)",
  "bg-red-50": "rgba(239, 68, 68, 0.08)",
  "bg-cyan-50": "rgba(6, 180, 212, 0.08)",
  "bg-emerald-50": "rgba(16, 185, 129, 0.08)",
};

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects', count: projectsData.length },
    { id: 'laravel', label: 'Laravel', count: projectsData.filter(p => p.tags.some(tag => tag.toLowerCase().includes('laravel'))).length },
    { id: 'php', label: 'PHP', count: projectsData.filter(p => p.tags.some(tag => tag.toLowerCase().includes('php'))).length },
    { id: 'mysql', label: 'MySQL', count: projectsData.filter(p => p.tags.some(tag => tag.toLowerCase().includes('mysql'))).length },
    { id: 'javascript', label: 'JavaScript', count: projectsData.filter(p => p.tags.some(tag => tag.toLowerCase().includes('javascript'))).length },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => 
        project.tags.some(tag => tag.toLowerCase().includes(activeFilter))
      );

  // Custom interactive 3D Tilt and Shine effect handlers
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized values from -1 to 1
    const xc = ((x - rect.width / 2) / (rect.width / 2)) * 8; // Max rotate 8 degrees
    const yc = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    
    card.style.transform = `perspective(800px) rotateX(${yc}deg) rotateY(${xc}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Update variables for shine element placement
    card.style.setProperty('--shine-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--shine-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="projects" className="section reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Filter Buttons */}
        <div className="projects-filter-container">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`projects-filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            >
              <span>{filter.label}</span>
              <span className="projects-filter-badge">
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => {
            const hasDemo = project.demoLink && project.demoLink !== '#';
            return (
              <GlassCard 
                key={project.id} 
                className="project-card-interactive"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Shine Overlay */}
                <div className="project-card-shine"></div>

                {/* Project Image Frame */}
                <div 
                  className="project-card-image-box"
                  style={{ background: bgColorMap[project.bgColor] || 'rgba(10, 14, 26, 0.3)' }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-card-img-contain" 
                  />
                  
                  {/* Floating Project Icon */}
                  <div 
                    className="project-card-icon-badge"
                    style={{ background: colorMap[project.color] || 'var(--gradient-accent)' }}
                  >
                    {getProjectIcon(project.icon)}
                  </div>

                  <div className="project-card-overlay">
                    <div className="project-card-links">
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link-btn"
                        aria-label={`View ${project.title} source code on Github`}
                      >
                        <GithubIcon size={20} />
                      </a>
                      {hasDemo && (
                        <a 
                          href={project.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-link-btn"
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content Frame */}
                <div className="project-card-content">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  
                  <div className="project-card-tags">
                    {project.tags.map((tag, tIdx) => (
                      <Badge key={tIdx} className="project-tag-badge">
                        {tag}
                      </Badge>
                    ))}
                  </div>
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
