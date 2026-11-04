import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Lock, 
  RotateCw, 
  Eye, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  GithubIcon, 
  getProjectColors, 
  getProjectIcon, 
  getTagIcon 
} from './projectHelpers';
import Badge from '../ui/Badge';
import Magnetic from '../ui/Magnetic';

export const ProjectDetailModal = ({
  project,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount
}) => {
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState(false);
  const colors = getProjectColors(project);

  // Keyboard navigation inside detail modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="project-detail-overlay" onClick={onClose}>
      <div 
        className="project-detail-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} Specifications`}
        style={{
          '--proj-brand': colors.primary,
          '--proj-secondary': colors.secondary,
          '--proj-glow': colors.glow,
          '--proj-accent': colors.accent
        }}
      >
        {/* Modal Top Bar - Centered Category Badge & Next-Line < > Navigation */}
        <div className="project-detail-topbar">
          <div className="detail-topbar-center-col">
            <div 
              className="detail-category-badge"
              style={{ 
                color: colors.primary,
                borderColor: `${colors.primary}35`,
                background: `${colors.primary}12`
              }}
            >
              {getProjectIcon(project.icon)}
              <span>{colors.category}</span>
            </div>

            <div className="detail-topbar-nav-row">
              <div className="detail-nav-group">
                <button
                  type="button"
                  className="detail-nav-btn"
                  onClick={onPrev}
                  aria-label={`Previous project (${currentIndex === 0 ? totalCount : currentIndex} of ${totalCount})`}
                  title="Previous project (←)"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  type="button"
                  className="detail-nav-btn"
                  onClick={onNext}
                  aria-label={`Next project (${currentIndex + 2 > totalCount ? 1 : currentIndex + 2} of ${totalCount})`}
                  title="Next project (→)"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="detail-close-btn"
            onClick={onClose}
            aria-label="Close project specifications"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Executive 2-Column Split Body */}
        <div className="project-detail-split-body">
          
          {/* Left Column: Interactive macOS Browser Mockup with Top-to-Bottom Hover Scroll */}
          <div className="detail-modal-media-col">
            <div 
              className={`detail-browser-frame ${isHoveredOrTouched ? 'is-scrolling' : ''}`}
              onMouseEnter={() => setIsHoveredOrTouched(true)}
              onMouseLeave={() => setIsHoveredOrTouched(false)}
              onTouchStart={() => setIsHoveredOrTouched(true)}
              onTouchEnd={() => setTimeout(() => setIsHoveredOrTouched(false), 2500)}
            >
              {/* Browser Chrome Header */}
              <div className="detail-browser-chrome">
                <div className="browser-dots">
                  <span className="browser-dot red" />
                  <span className="browser-dot yellow" />
                  <span className="browser-dot green" />
                </div>

                <div className="detail-browser-address">
                  <Lock size={11} className="lock-icon" style={{ color: colors.primary }} />
                  <span className="address-text">
                    {project.demoLink && project.demoLink !== '#'
                      ? project.demoLink.replace(/^https?:\/\//, '').replace(/\/$/, '')
                      : `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.app`}
                  </span>
                  <RotateCw size={11} className="reload-icon" />
                </div>

                {project.demoLink && project.demoLink !== '#' && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-chrome-link-btn"
                    style={{ color: colors.primary }}
                    title="Open live website in new tab"
                  >
                    <span>Visit Live</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>

              {/* Viewport Screen with Smooth Top-to-Bottom Scroll on Hover & Touch */}
              <div className="detail-viewport-screen">
                <img
                  src={project.image}
                  alt={project.title}
                  className="detail-scrolling-screenshot"
                  loading="eager"
                />
                
                {/* Minimalist Floating Cue Badge */}
                <div className="detail-viewport-cue-pill">
                  <Eye size={12} />
                  <span>Hover to scroll full page ↕</span>
                </div>
              </div>

              {/* Bottom Browser Status Bar */}
              <div className="detail-browser-statusbar">
                <span className="statusbar-tag">
                  <Sparkles size={11} style={{ color: colors.primary }} />
                  <span>Full-Stack Architecture</span>
                </span>
                <span className="statusbar-tag">
                  <Layers size={11} />
                  <span>Interactive Live Viewport</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Organized Architecture & Specifications Suite */}
          <div className="detail-modal-specs-col">
            <div className="detail-specs-scroll-inner">
              
              {/* Header: Metric + Signature Colored Title */}
              <div className="detail-header-block">
                {project.keyMetric && (
                  <div className="detail-metric-strip">
                    <ShieldCheck size={13} style={{ color: colors.primary }} />
                    <span>{project.keyMetric}</span>
                  </div>
                )}

                <h2 
                  className="detail-project-title"
                  style={{ color: colors.primary }}
                >
                  {project.title}
                </h2>

                {project.subtitle && (
                  <p className="detail-project-subtitle">
                    {project.subtitle}
                  </p>
                )}
              </div>

              {/* Direct Action Buttons */}
              <div className="detail-actions-row">
                {project.demoLink && project.demoLink !== '#' && (
                  <Magnetic range={15}>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary detail-btn-demo"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        boxShadow: `0 8px 24px ${colors.glow}`
                      }}
                    >
                      <ExternalLink size={15} />
                      <span>Live Platform Demo</span>
                    </a>
                  </Magnetic>
                )}

                {project.githubLink && (
                  <Magnetic range={15}>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary detail-btn-github"
                    >
                      <GithubIcon size={15} />
                      <span>Inspect Source Code</span>
                    </a>
                  </Magnetic>
                )}
              </div>

              {/* Overview Section */}
              <div className="detail-section-block">
                <h4 className="detail-section-label">System Overview</h4>
                <p className="detail-description">
                  {project.description}
                </p>
              </div>

              {/* Architectural Highlights Checklist */}
              {project.features && project.features.length > 0 && (
                <div className="detail-section-block">
                  <h4 className="detail-section-label">Architectural Highlights</h4>
                  <ul className="detail-features-grid">
                    {project.features.map((feat, fIdx) => (
                      <li key={fIdx} className="detail-feature-card">
                        <div 
                          className="detail-feature-check-circle"
                          style={{ 
                            backgroundColor: `${colors.primary}18`, 
                            color: colors.primary,
                            border: `1px solid ${colors.primary}40`
                          }}
                        >
                          <Check size={12} strokeWidth={2.8} />
                        </div>
                        <span className="detail-feature-text">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies & Frameworks */}
              <div className="detail-section-block">
                <h4 className="detail-section-label">Stack & Infrastructure</h4>
                <div className="detail-tech-badges">
                  {project.tags.map((tag, tIdx) => (
                    <Badge key={tIdx} className="detail-tech-badge">
                      {getTagIcon(tag)}
                      <span>{tag}</span>
                    </Badge>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Bottom Keyboard Navigation Footer */}
        <div className="project-detail-footer">
          <span className="detail-footer-hint">
            Use <kbd>←</kbd> <kbd>→</kbd> to browse projects • <kbd>Esc</kbd> to close
          </span>

          <div className="detail-footer-actions">
            <button
              type="button"
              className="detail-footer-step-btn"
              onClick={onPrev}
            >
              <ChevronLeft size={15} />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="detail-footer-step-btn"
              onClick={onNext}
            >
              <span>Next</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetailModal;

