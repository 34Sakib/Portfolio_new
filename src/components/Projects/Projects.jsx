import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  Lock, 
  Sparkles, 
  ArrowUpRight, 
  Eye
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { projectsData } from '../../data/projects';
import Magnetic from '../ui/Magnetic';
import { getProjectColors } from './projectHelpers';
import ProjectDetailModal from './ProjectDetailModal';

export const Projects = ({ onNavigateToAll }) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [touchedCardId, setTouchedCardId] = useState(null);

  // Home page strictly shows ONLY the 4 main featured projects
  const homeProjects = projectsData.slice(0, 4);

  // Modal navigation helpers
  const currentModalIndex = activeModalProject 
    ? homeProjects.findIndex((p) => p.id === activeModalProject.id) 
    : -1;

  const handlePrevProject = useCallback(() => {
    if (currentModalIndex > 0) {
      setActiveModalProject(homeProjects[currentModalIndex - 1]);
    } else {
      setActiveModalProject(homeProjects[homeProjects.length - 1]);
    }
  }, [currentModalIndex, homeProjects]);

  const handleNextProject = useCallback(() => {
    if (currentModalIndex >= 0 && currentModalIndex < homeProjects.length - 1) {
      setActiveModalProject(homeProjects[currentModalIndex + 1]);
    } else {
      setActiveModalProject(homeProjects[0]);
    }
  }, [currentModalIndex, homeProjects]);

  const openDetailModal = (project) => {
    setActiveModalProject(project);
  };

  const closeDetailModal = () => {
    setActiveModalProject(null);
  };

  const handleSeeMoreClick = () => {
    if (onNavigateToAll) {
      onNavigateToAll();
    } else {
      window.history.pushState({}, '', '/projects');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="section projects-section-root">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header projects-showcase-header">
          <span className="section-subtitle">
            <Sparkles size={13} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '5px' }} />
            Featured Work
          </span>
          <h2 className="section-title">
            Engineering & <span className="title-bold">Production Platforms</span>
          </h2>
          <p className="section-description">
            Showcase of production-deployed full-stack web applications. Hover or touch any card preview to smoothly scroll through the full landing page from top to bottom.
          </p>
        </div>

        {/* 4 Main Projects Showcase Grid */}
        <div className="projects-showcase-grid">
          {homeProjects.map((project, idx) => {
            const projColors = getProjectColors(project);
            const isTouched = touchedCardId === project.id;

            return (
              <motion.article
                key={project.id}
                className="project-card-container"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.35, 
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                style={{
                  '--proj-brand': projColors.primary,
                  '--proj-secondary': projColors.secondary,
                  '--proj-glow': projColors.glow,
                  '--proj-accent': projColors.accent
                }}
              >
                {/* Fixed-Size macOS Image Box with Smooth Top-to-Bottom Scroll */}
                <div 
                  className={`project-fixed-image-box ${isTouched ? 'is-scrolling' : ''}`}
                  onTouchStart={() => setTouchedCardId(project.id)}
                  onTouchEnd={() => {
                    setTimeout(() => setTouchedCardId(null), 2500);
                  }}
                  onClick={() => openDetailModal(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openDetailModal(project)}
                  aria-label={`Open ${project.title} description and details`}
                >
                  {/* macOS Browser Chrome Bar */}
                  <div className="project-image-box-topbar">
                    <div className="image-box-dots">
                      <span className="image-box-dot red" />
                      <span className="image-box-dot yellow" />
                      <span className="image-box-dot green" />
                    </div>

                    <div className="image-box-domain-pill">
                      <Lock size={10} className="domain-lock-icon" style={{ color: projColors.primary }} />
                      <span className="domain-text">
                        {project.demoLink && project.demoLink !== '#'
                          ? project.demoLink.replace(/^https?:\/\//, '').replace(/\/$/, '')
                          : `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.app`}
                      </span>
                    </div>

                    <span className="image-box-live-badge" style={{ color: projColors.primary }}>
                      <span className="live-beacon-dot" style={{ backgroundColor: projColors.primary }} />
                      <span>Live</span>
                    </span>
                  </div>

                  {/* Screenshot Viewport Container */}
                  <div className="project-image-viewport">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="project-card-screenshot-img"
                      loading="eager"
                    />

                    {/* Floating Scroll Cue Badge */}
                    <div className="image-scroll-cue-pill">
                      <Eye size={12} />
                      <span>Hover to scroll ↕</span>
                    </div>
                  </div>
                </div>

                {/* Minimal Project Title Bar (Image Hover + Project Name) */}
                <div 
                  className="project-card-body project-card-body-minimal"
                  onClick={() => openDetailModal(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openDetailModal(project)}
                  aria-label={`Open ${project.title} specifications`}
                >
                  <div className="project-card-title-row">
                    <h3 
                      className="project-card-title-minimal"
                      style={{ color: projColors.primary }}
                    >
                      {project.title}
                    </h3>
                    <span className="project-card-arrow-chip" style={{ color: projColors.primary }}>
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Clean "See More" Button taking visitors to the All Projects page */}
        <div className="projects-see-more-wrapper">
          <Magnetic range={25}>
            <button
              type="button"
              className="projects-see-more-link"
              onClick={handleSeeMoreClick}
              aria-label="See More Projects"
            >
              <span>See More</span>
              <ArrowUpRight size={18} className="see-more-arrow" />
            </button>
          </Magnetic>
        </div>

      </div>

      {/* Premium Executive Project Description Modal */}
      {activeModalProject && createPortal(
        <ProjectDetailModal
          project={activeModalProject}
          onClose={closeDetailModal}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
          currentIndex={currentModalIndex}
          totalCount={homeProjects.length}
        />,
        document.body
      )}

    </section>
  );
};

export default Projects;
