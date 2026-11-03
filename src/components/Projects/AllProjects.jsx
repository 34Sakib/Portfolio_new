import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowLeft,
  ArrowUpRight,
  Sparkles, 
  Lock, 
  Eye,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projectsData } from '../../data/projects';
import Magnetic from '../ui/Magnetic';
import { getProjectColors } from './projectHelpers';
import ProjectDetailModal from './ProjectDetailModal';

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'edtech', label: 'EdTech & Learning' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'enterprise', label: 'ERP & Enterprise' },
  { id: 'it', label: 'IT & Cloud Services' }
];

export const AllProjects = ({ onBack }) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [touchedCardId, setTouchedCardId] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projectsData;
    if (selectedFilter === 'edtech') {
      return projectsData.filter(p => [13, 9, 8].includes(p.id));
    }
    if (selectedFilter === 'ecommerce') {
      return projectsData.filter(p => [11, 10, 1, 4].includes(p.id));
    }
    if (selectedFilter === 'enterprise') {
      return projectsData.filter(p => [12, 3, 6].includes(p.id));
    }
    if (selectedFilter === 'it') {
      return projectsData.filter(p => [2, 3].includes(p.id));
    }
    return projectsData;
  }, [selectedFilter]);

  // Modal navigation helpers
  const currentModalIndex = activeModalProject 
    ? filteredProjects.findIndex((p) => p.id === activeModalProject.id) 
    : -1;

  const handlePrevProject = useCallback(() => {
    if (currentModalIndex > 0) {
      setActiveModalProject(filteredProjects[currentModalIndex - 1]);
    } else {
      setActiveModalProject(filteredProjects[filteredProjects.length - 1]);
    }
  }, [currentModalIndex, filteredProjects]);

  const handleNextProject = useCallback(() => {
    if (currentModalIndex >= 0 && currentModalIndex < filteredProjects.length - 1) {
      setActiveModalProject(filteredProjects[currentModalIndex + 1]);
    } else {
      setActiveModalProject(filteredProjects[0]);
    }
  }, [currentModalIndex, filteredProjects]);

  const openDetailModal = (project) => {
    setActiveModalProject(project);
  };

  const closeDetailModal = () => {
    setActiveModalProject(null);
  };

  return (
    <div className="all-projects-page-wrapper section">
      <div className="container">
        
        {/* Top Back Navigation Bar */}
        <div className="all-projects-topbar">
          <Magnetic range={20}>
            <button
              type="button"
              className="all-projects-back-btn"
              onClick={onBack}
              aria-label="Back to Homepage"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
          </Magnetic>

          <span className="all-projects-archive-pill">
            <Layers size={13} />
            <span>Complete Production Archive</span>
          </span>
        </div>

        {/* Page Header */}
        <div className="section-header all-projects-header">
          <span className="section-subtitle">
            <Sparkles size={13} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '5px' }} />
            All Engineering Works
          </span>
          <h1 className="section-title">
            All Projects & <span className="title-bold">Production Platforms</span>
          </h1>
          <p className="section-description">
            Complete catalog of {projectsData.length} production-deployed systems, enterprise software, and client platforms. Hover or touch any preview to smoothly scroll through the full landing page from top to bottom.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="all-projects-filters-bar">
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                className={`all-projects-filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                <span>{filter.label}</span>
                {filter.id === 'all' && (
                  <span className="filter-count-chip">{projectsData.length}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* All Projects Showcase Grid */}
        <div className="projects-showcase-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const projColors = getProjectColors(project);
              const isTouched = touchedCardId === project.id;

              return (
                <motion.article
                  key={project.id}
                  className="project-card-container"
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ 
                    duration: 0.32, 
                    delay: shouldReduceMotion ? 0 : Math.min(idx * 0.05, 0.25),
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
                        loading={idx < 4 ? "eager" : "lazy"}
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
          </AnimatePresence>
        </div>

        {/* Bottom Back Button Bar */}
        <div className="all-projects-bottom-bar">
          <Magnetic range={25}>
            <button
              type="button"
              className="all-projects-bottom-back-btn"
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
          </Magnetic>
        </div>

      </div>

      {/* The Description Page Detail Modal (Rendered via Portal to Document Body) */}
      {activeModalProject && createPortal(
        <ProjectDetailModal
          project={activeModalProject}
          onClose={closeDetailModal}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
          currentIndex={currentModalIndex}
          totalCount={filteredProjects.length}
        />,
        document.body
      )}

    </div>
  );
};

export default AllProjects;
