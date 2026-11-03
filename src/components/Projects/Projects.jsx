import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ShoppingCart, 
  Laptop, 
  Database, 
  Coffee, 
  Award, 
  GraduationCap, 
  Building2,
  ShoppingBag,
  BookOpen,
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
  Lock,
  RotateCw,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Play,
  Pause
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { projectsData } from '../../data/projects';
import Badge from '../ui/Badge';
import Magnetic from '../ui/Magnetic';

// Custom inline SVG GitHub Icon
const GithubIcon = ({ size = 18, ...props }) => (
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

// High-fidelity color palettes precisely extracted from the actual project screenshot images
const projectColorPalette = {
  13: { // READWISE -> Warm Amber Gold & Midnight Navy
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
  1: { // FruitMart (GreenRootMart) -> Fresh Botanical / Leaf Green
    primary: '#16A34A',
    secondary: '#15803D',
    glow: 'rgba(22, 163, 74, 0.28)',
    accent: '#F59E0B',
    category: 'Fresh Farm Produce & Organics'
  },
  2: { // CodexLabAsia -> Electric Tech Sky Blue & Cyan Circuit
    primary: '#0284C7',
    secondary: '#06B6D4',
    glow: 'rgba(2, 132, 199, 0.28)',
    accent: '#38BDF8',
    category: 'IT Solutions & Cloud Consultancy'
  },
  3: { // CRM E-Commerce (CodexLabBd) -> Cobalt Royal Blue & Tangerine
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
  6: { // Hospital Management (Chiropractic) -> Clinical Aqua Teal
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

const getProjectColors = (project) => {
  if (!project) return { primary: '#f0824a', secondary: '#e36a2e', glow: 'rgba(240, 130, 74, 0.25)', accent: '#fdb48f', category: 'Production Case Study' };
  if (projectColorPalette[project.id]) return projectColorPalette[project.id];
  return { primary: '#f0824a', secondary: '#e36a2e', glow: 'rgba(240, 130, 74, 0.25)', accent: '#fdb48f', category: 'Production Case Study' };
};

// Map project icons dynamically
const getProjectIcon = (iconName) => {
  switch (iconName) {
    case 'BookOpen': return <BookOpen size={15} />;
    case 'GraduationCap': return <GraduationCap size={15} />;
    case 'Building2': return <Building2 size={15} />;
    case 'ShoppingBag': return <ShoppingBag size={15} />;
    case 'ShoppingCart': return <ShoppingCart size={15} />;
    case 'Laptop': return <Laptop size={15} />;
    case 'Database': return <Database size={15} />;
    case 'Coffee': return <Coffee size={15} />;
    case 'Award': return <Award size={15} />;
    default: return <Code size={15} />;
  }
};

// Map technical skill tag names to Lucide icons dynamically
const getTagIcon = (tagName) => {
  const name = tagName.toLowerCase();
  if (name.includes('react')) return <Atom size={12} className="tag-icon text-react" style={{ color: '#00d8ff' }} />;
  if (name.includes('laravel')) return <Flame size={12} className="tag-icon text-laravel" style={{ color: '#ff2d20' }} />;
  if (name.includes('mysql') || name.includes('postgres') || name.includes('sqlite')) return <Database size={12} className="tag-icon text-db" style={{ color: '#336791' }} />;
  if (name.includes('api')) return <Globe size={12} className="tag-icon text-api" style={{ color: '#f59e0b' }} />;
  if (name.includes('php')) return <Cpu size={12} className="tag-icon text-php" style={{ color: '#777bb4' }} />;
  if (name.includes('bootstrap') || name.includes('tailwind')) return <Layers size={12} className="tag-icon text-tailwind" style={{ color: '#38bdf8' }} />;
  if (name.includes('vite')) return <Flame size={12} className="tag-icon text-vite" style={{ color: '#646cff' }} />;
  if (name.includes('zustand')) return <Cpu size={12} className="tag-icon text-zustand" style={{ color: '#ff9900' }} />;
  if (name.includes('i18n')) return <Globe size={12} className="tag-icon text-i18n" style={{ color: '#10b981' }} />;
  if (name.includes('typescript')) return <FileCode size={12} className="tag-icon text-ts" style={{ color: '#3178c6' }} />;
  if (name.includes('javascript') || name.includes('jquery')) return <Code size={12} className="tag-icon text-js" style={{ color: '#f7df1e' }} />;
  if (name.includes('nestjs')) return <Server size={12} className="tag-icon text-node" style={{ color: '#e0234e' }} />;
  if (name.includes('typeorm')) return <Terminal size={12} className="tag-icon text-vite" style={{ color: '#f59e0b' }} />;
  if (name.includes('blade') || name.includes('datatables')) return <Layers size={12} className="tag-icon text-html" style={{ color: '#f0533c' }} />;
  return <Terminal size={12} className="tag-icon" />;
};

export const Projects = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchPaused, setIsTouchPaused] = useState(false);
  const mockupRef = useRef(null);
  
  const totalProjects = projectsData.length;
  const isPaused = isHovering || isTouchPaused;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  }, [totalProjects]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  }, [totalProjects]);

  // Touch gesture swipe support for mobile and tablets
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const sectionRef = useRef(null);
  const dockContainerRef = useRef(null);
  const activeDockItemRef = useRef(null);

  // Check if projects section is currently visible in the viewport
  const isSectionInView = useInView(sectionRef, { amount: 0.15 });

  // Auto-scroll the active dock item ONLY inside its horizontal dock container
  // (NEVER uses scrollIntoView which causes the browser window to jump down)
  useEffect(() => {
    const item = activeDockItemRef.current;
    const container = dockContainerRef.current;
    if (item && container) {
      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      const containerWidth = container.offsetWidth;
      const targetScrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    // Pause autoplay immediately on touch so user can examine card details
    setIsTouchPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 45; // 45px swipe threshold
    if (diff > threshold) {
      nextSlide();
      setIsTouchPaused(false);
    } else if (diff < -threshold) {
      prevSlide();
      setIsTouchPaused(false);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
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
  }, [currentIndex, nextSlide, prevSlide]);

  // Autoplay functionality: automatically rotates projects one by one every 7.5 seconds
  // Pauses when user hovers cursor or touches any project card, or when section is not in view
  useEffect(() => {
    if (isPaused || !isSectionInView) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 7500);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, isSectionInView, nextSlide]);

  const activeProject = projectsData[currentIndex];
  const colors = getProjectColors(activeProject);

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

  // Motion Variants for Staggered Parallax Transition
  const containerVariants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
      }
    : {
        enter: (dir) => ({
          opacity: 0,
          x: dir > 0 ? 40 : -40,
          scale: 0.99
        }),
        center: {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: {
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.07,
            delayChildren: 0.05
          }
        },
        exit: (dir) => ({
          opacity: 0,
          x: dir < 0 ? 40 : -40,
          scale: 0.99,
          transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1]
          }
        })
      };

  const childVariants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        enter: { opacity: 0, y: 14 },
        center: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } 
        },
        exit: { opacity: 0, y: -8, transition: { duration: 0.3 } }
      };

  const mockupVariants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        enter: (dir) => ({
          opacity: 0,
          x: dir > 0 ? 45 : -45,
          scale: 0.97
        }),
        center: {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
        },
        exit: (dir) => ({
          opacity: 0,
          x: dir < 0 ? 45 : -45,
          scale: 0.97,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        })
      };

  return (
    <section id="projects" ref={sectionRef} className="section projects-section-root">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <Sparkles size={13} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '5px' }} />
            Featured Work
          </span>
          <h2 className="section-title">
            Engineering & <span className="title-bold">Production Apps</span>
          </h2>
        </div>

        {/* Carousel Stage Wrapper with Dynamic Ambient Mesh Glow */}
        <div 
          className="projects-carousel-wrapper"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            '--proj-color-primary': colors.primary,
            '--proj-color-secondary': colors.secondary,
            '--proj-color-glow': colors.glow,
            '--proj-color-accent': colors.accent
          }}
        >
          {/* Top Stage Header with Category & Project Counter Badge */}
          <div className="projects-stage-topbar">
            <div className="projects-counter-badge">
              <span 
                className={`projects-live-pulse ${isPaused ? 'paused' : ''}`} 
                style={{ 
                  backgroundColor: isPaused ? '#f59e0b' : colors.primary,
                  boxShadow: isPaused ? '0 0 6px rgba(245, 158, 11, 0.5)' : `0 0 10px ${colors.primary}`
                }}
              />
              <span className="projects-counter-current">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="projects-counter-separator">/</span>
              <span className="projects-counter-total">
                {String(totalProjects).padStart(2, '0')}
              </span>
              <span className="projects-counter-label">{colors.category}</span>

              {/* Status pill: indicates pause on cursor/touch and allows toggling */}
              <button
                type="button"
                className={`projects-pause-pill ${isPaused ? 'paused' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTouchPaused(!isPaused);
                  if (isPaused) {
                    setIsHovering(false);
                  }
                }}
                title={isPaused ? "Autoplay paused (Click to resume)" : "Autoplay running (Hover or tap to pause)"}
                aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
              >
                {isPaused ? <Play size={10} /> : <Pause size={10} />}
                <span>{isPaused ? 'Paused' : 'Auto'}</span>
              </button>
            </div>
          </div>

          {/* Main Cinematic Stage Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={containerVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="projects-carousel-card glass-panel"
            >
              {/* Dynamic Mesh Ambient Glow matched to project screenshot */}
              <div className="projects-card-glow-overlay"></div>

              <div className="projects-carousel-grid">
                
                {/* Left Column: Staggered Technical Architecture Details */}
                <div className="projects-carousel-left">
                  
                  <motion.div variants={childVariants} className="projects-meta-headline">
                    <div 
                      className="projects-icon-badge" 
                      style={{ 
                        color: colors.primary, 
                        borderColor: `${colors.primary}44`,
                        background: `${colors.primary}12`,
                        boxShadow: `0 0 16px ${colors.glow}`
                      }}
                    >
                      {getProjectIcon(activeProject.icon)}
                    </div>
                    <span className="projects-category-text" style={{ color: colors.primary }}>
                      {colors.category}
                    </span>
                  </motion.div>

                  <motion.h3 variants={childVariants} className="projects-carousel-title">
                    {activeProject.title}
                  </motion.h3>

                  <motion.p variants={childVariants} className="projects-carousel-desc">
                    {activeProject.description}
                  </motion.p>

                  {/* Core Architecture Highlights Checklist */}
                  <motion.ul variants={childVariants} className="projects-carousel-features">
                    {activeProject.features && activeProject.features.map((feat, fIdx) => (
                      <li key={fIdx} className="projects-carousel-feature-item">
                        <div 
                          className="feature-check-bubble" 
                          style={{ 
                            backgroundColor: `${colors.primary}18`, 
                            color: colors.primary,
                            border: `1px solid ${colors.primary}33`
                          }}
                        >
                          <Check size={12} strokeWidth={2.6} />
                        </div>
                        <span className="feature-text">{feat}</span>
                      </li>
                    ))}
                  </motion.ul>

                  {/* Tech Stack Pills */}
                  <motion.div variants={childVariants} className="projects-carousel-tags">
                    {activeProject.tags.map((tag, tIdx) => (
                      <Badge key={tIdx} className="projects-carousel-tag">
                        {getTagIcon(tag)}
                        <span>{tag}</span>
                      </Badge>
                    ))}
                  </motion.div>

                  {/* Primary & Secondary Call to Actions */}
                  <motion.div variants={childVariants} className="projects-carousel-buttons">
                    {activeProject.demoLink && activeProject.demoLink !== "#" ? (
                      <Magnetic range={15}>
                        <a 
                          href={activeProject.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-primary project-btn-demo"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                            borderColor: colors.primary,
                            boxShadow: `0 8px 24px ${colors.glow}`
                          }}
                        >
                          <ExternalLink size={15} /> Live Demo
                        </a>
                      </Magnetic>
                    ) : null}

                    {activeProject.githubLink ? (
                      <Magnetic range={15}>
                        <a 
                          href={activeProject.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-secondary project-btn-github"
                        >
                          <GithubIcon size={16} /> Source Code
                        </a>
                      </Magnetic>
                    ) : null}
                  </motion.div>

                </div>

                {/* Right Column: Stationary Fixed Browser Frame */}
                <motion.div 
                  variants={mockupVariants} 
                  custom={direction}
                  className="projects-carousel-right"
                >
                  <div 
                    ref={mockupRef}
                    className="projects-mockup-perspective"
                  >
                    <div 
                      className="projects-browser-mockup"
                      style={{
                        transform: 'none',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        borderColor: isHovering ? `${colors.primary}66` : undefined,
                        boxShadow: `0 24px 60px rgba(0, 0, 0, 0.5), 0 0 30px ${colors.glow}`
                      }}
                    >
                      {/* macOS Browser Chrome Bar */}
                      <div className="browser-topbar">
                        <div className="browser-dots">
                          <span className="browser-dot red" title="Close">
                            <span className="dot-glyph">✕</span>
                          </span>
                          <span className="browser-dot yellow" title="Minimize">
                            <span className="dot-glyph">−</span>
                          </span>
                          <span className="browser-dot green" title="Expand">
                            <span className="dot-glyph">+</span>
                          </span>
                        </div>
                        
                        <div 
                          className="browser-address"
                          onClick={() => {
                            if (activeProject.demoLink && activeProject.demoLink !== "#") {
                              window.open(activeProject.demoLink, '_blank');
                            }
                          }}
                          style={{ cursor: activeProject.demoLink && activeProject.demoLink !== "#" ? 'pointer' : 'default' }}
                          title={activeProject.demoLink && activeProject.demoLink !== "#" ? "Click to visit live site" : undefined}
                        >
                          <Lock size={11} className="browser-lock-icon" style={{ color: colors.primary }} />
                          {formatAddress(activeProject)}
                          <RotateCw size={11} className="browser-reload-icon" />
                        </div>
                      </div>
                      
                      {/* Viewport Screen with Glass Sheen Layer */}
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

                        {/* Subtle static ambient glass sheen */}
                        <div 
                          className="browser-glare-sheen"
                          style={{
                            background: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                            opacity: isHovering ? 0.7 : 0.3
                          }}
                        />

                        {/* Direct hover quick action pill */}
                        {activeProject.demoLink && activeProject.demoLink !== "#" && (
                          <a
                            href={activeProject.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="browser-quick-action-pill"
                            style={{
                              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                              boxShadow: `0 6px 20px ${colors.glow}`
                            }}
                          >
                            <span>Preview Live</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>

                      {/* Mockup Status Footer Bar */}
                      <div className="browser-footer-status">
                        <div className="status-item">
                          <Activity size={11} style={{ color: colors.primary }} />
                          <span>Production Build</span>
                        </div>
                        <div className="status-item-separator">•</div>
                        <div className="status-item">
                          <ShieldCheck size={11} style={{ color: colors.primary }} />
                          <span>Tested & Scalable</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Autoplay Progress Line Indicator */}
          <div className="projects-autoplay-track">
            <motion.div 
              key={`${currentIndex}-${isPaused}`}
              initial={{ width: isPaused ? '100%' : '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: isPaused ? 0 : 7.5, ease: 'linear' }}
              className="projects-autoplay-bar"
              style={{
                background: isPaused
                  ? 'rgba(255, 255, 255, 0.25)'
                  : `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                boxShadow: isPaused ? 'none' : `0 0 10px ${colors.glow}`,
                opacity: isPaused ? 0.45 : 1
              }}
            />
          </div>

          {/* macOS Dock-Style Thumbnail Strip (Stripe & Vercel Style) */}
          <div className="macos-dock-wrapper">
            <div ref={dockContainerRef} className="macos-dock-glass">
              {projectsData.map((project, idx) => {
                const isActive = idx === currentIndex;
                const projColors = getProjectColors(project);
                
                return (
                  <button
                    key={project.id}
                    ref={isActive ? activeDockItemRef : null}
                    className={`macos-dock-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                      setIsTouchPaused(false);
                    }}
                    aria-label={`Switch to ${project.title}`}
                  >
                    {/* Animated Sliding Pill Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDockPill"
                        className="macos-dock-active-pill"
                        style={{
                          borderColor: projColors.primary,
                          boxShadow: `0 0 18px ${projColors.glow}, inset 0 0 10px ${projColors.glow}`
                        }}
                        transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                      />
                    )}

                    {/* Miniature Project Thumbnail Container */}
                    <div 
                      className="macos-dock-thumb-container"
                      style={{
                        borderColor: isActive ? projColors.primary : undefined,
                        boxShadow: isActive ? `0 0 14px ${projColors.glow}` : undefined
                      }}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="macos-dock-thumb-img" 
                      />
                      <div className="macos-dock-thumb-overlay" />
                      
                      {/* Mini Icon Badge in corner */}
                      <div 
                        className="macos-dock-icon-tag"
                        style={{
                          backgroundColor: isActive ? projColors.primary : 'rgba(0, 0, 0, 0.7)',
                          color: isActive ? '#fff' : projColors.accent
                        }}
                      >
                        {getProjectIcon(project.icon)}
                      </div>
                    </div>

                    {/* Hover Magnification Tooltip */}
                    <div className="macos-dock-tooltip">
                      <span className="dock-tooltip-title">{project.title}</span>
                      <span className="dock-tooltip-tag" style={{ color: projColors.primary }}>
                        {project.tags[0]}
                      </span>
                    </div>

                    {/* Active Underline Dot */}
                    <div 
                      className={`macos-dock-dot ${isActive ? 'active' : ''}`} 
                      style={{ 
                        backgroundColor: isActive ? projColors.primary : undefined,
                        boxShadow: isActive ? `0 0 8px ${projColors.primary}` : undefined
                      }} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Projects;
