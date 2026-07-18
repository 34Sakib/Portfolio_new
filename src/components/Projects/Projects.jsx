import React, { useState, useEffect } from 'react';
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
  Terminal,
  ChevronLeft,
  ChevronRight,
  Lock,
  RotateCw
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projectsData } from '../../data/projects';
import Badge from '../ui/Badge';
import Magnetic from '../ui/Magnetic';

// Custom inline SVG GitHub Icon
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
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const totalProjects = projectsData.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  // Keyboard controls for projects carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      const projectsEl = document.getElementById('projects');
      if (!projectsEl) return;
      const rect = projectsEl.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        if (e.key === 'ArrowRight') {
          nextSlide();
        } else if (e.key === 'ArrowLeft') {
          prevSlide();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Autoplay function
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7500);
    return () => clearInterval(interval);
  }, [isHovering, currentIndex]);

  const activeProject = projectsData[currentIndex];
  const colors = getProjectColors(activeProject.color);

  // Address formatter helper for Chrome/Safari highlight style
  const formatAddress = (project) => {
    let url = "";
    if (project.demoLink && project.demoLink !== "#") {
      url = project.demoLink.replace(/^https?:\/\//, '');
    } else {
      url = `sakib.dev/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    }
    
    const slashIndex = url.indexOf('/');
    if (slashIndex !== -1) {
      const domain = url.substring(0, slashIndex);
      const path = url.substring(slashIndex);
      return (
        <>
          <span className="address-domain">{domain}</span>
          <span className="address-path">{path}</span>
        </>
      );
    }
    return <span className="address-domain">{url}</span>;
  };

  // Animation variants for the entire card to avoid sync lag & layout shifts
  const cardVariants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.4 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
      }
    : {
        enter: (dir) => ({
          x: dir > 0 ? 40 : -40,
          opacity: 0,
          scale: 0.99
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
        exit: (dir) => ({
          x: dir < 0 ? 40 : -40,
          opacity: 0,
          scale: 0.99,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        })
      };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Portfolio</span>
          <h2 className="section-title">Featured <span className="title-bold">Projects</span></h2>
        </div>

        {/* Carousel Wrapper with colors applied to parent container */}
        <div 
          className="projects-carousel-wrapper"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            '--proj-color-primary': colors.primary,
            '--proj-color-secondary': colors.secondary,
            '--proj-color-glow': colors.glow
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="projects-carousel-card glass-panel"
            >
              {/* Inner Ambient Glow layer */}
              <div className="projects-card-glow-overlay"></div>

              <div className="projects-carousel-grid">
                
                {/* Left Side: Staggered details */}
                <div className="projects-carousel-left">
                  <div className="projects-carousel-badge">
                    <span className="projects-badge-index">0{currentIndex + 1}</span>
                    <span className="projects-badge-separator">/</span>
                    <span className="projects-badge-total">0{totalProjects}</span>
                    <span className="projects-badge-tagline" style={{ marginLeft: '0.5rem', opacity: 0.6 }}>Featured Work</span>
                  </div>

                  <h3 className="projects-carousel-title">
                    {activeProject.title}
                  </h3>

                  <p className="projects-carousel-desc">
                    {activeProject.description}
                  </p>

                  {/* Checklist features */}
                  <ul className="projects-carousel-features">
                    {activeProject.features && activeProject.features.map((feat, fIdx) => (
                      <li key={fIdx} className="projects-carousel-feature-item">
                        <Check size={14} className="feature-check-icon" style={{ color: colors.primary }} />
                        <span className="feature-text">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  <div className="projects-carousel-tags">
                    {activeProject.tags.map((tag, tIdx) => (
                      <Badge key={tIdx} className="projects-carousel-tag">
                        {getTagIcon(tag)}
                        <span>{tag}</span>
                      </Badge>
                    ))}
                  </div>

                  {/* Action link buttons */}
                  <div className="projects-carousel-buttons">
                    <Magnetic>
                      <a 
                        href={activeProject.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-secondary project-btn-github"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <GithubIcon size={16} /> Code Repository
                      </a>
                    </Magnetic>
                    {activeProject.demoLink && activeProject.demoLink !== "#" && (
                      <Magnetic>
                        <a 
                          href={activeProject.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-primary project-btn-demo"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </div>

                {/* Right Side: Mockup Browser Frame */}
                <div className="projects-carousel-right">
                  <div className="projects-browser-mockup">
                    <div className="browser-topbar">
                      <div className="browser-dots">
                        <span className="browser-dot red"></span>
                        <span className="browser-dot yellow"></span>
                        <span className="browser-dot green"></span>
                      </div>
                      <div className="browser-address">
                        <Lock size={12} className="browser-lock-icon" />
                        {formatAddress(activeProject)}
                        <RotateCw size={11} className="browser-reload-icon" />
                      </div>
                    </div>
                    
                    <div className="browser-screen">
                      <img 
                        src={activeProject.image} 
                        alt={activeProject.title} 
                        className="browser-screen-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop";
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel navigation controls */}
          <div className="projects-carousel-controls">
            <div className="projects-carousel-dots">
              {projectsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`projects-carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Autoplay progress bar */}
            <div className="projects-carousel-progress-container">
              <motion.div 
                key={currentIndex + (isHovering ? '-paused' : '-playing')}
                initial={{ width: '0%' }}
                animate={{ width: isHovering ? '0%' : '100%' }}
                transition={{ duration: isHovering ? 0 : 7.5, ease: 'linear' }}
                className="projects-carousel-progress-bar"
              />
            </div>

            <div className="projects-carousel-arrows">
              <Magnetic range={30}>
                <button 
                  onClick={prevSlide}
                  className="projects-carousel-arrow-btn"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={20} />
                </button>
              </Magnetic>
              <Magnetic range={30}>
                <button 
                  onClick={nextSlide}
                  className="projects-carousel-arrow-btn"
                  aria-label="Next project"
                >
                  <ChevronRight size={20} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
