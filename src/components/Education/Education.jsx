import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { educationData } from '../../data/education';

// Logo Sub-component with image fallback
const EducationLogo = ({ logo, alt, initial, institution }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="education-card-logo-badge" title={institution}>
      {logo && !hasError ? (
        <img
          src={logo}
          alt={alt || `${institution} logo`}
          className="education-card-logo-img"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : (
        <span className="education-card-logo-initial">
          {initial || (institution ? institution.charAt(0) : 'E')}
        </span>
      )}
    </div>
  );
};

export const Education = () => {
  const shouldReduceMotion = useReducedMotion();

  // Scroll Reveal Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
      };

  // Ambient blob motion (disabled if reduced motion)
  const blob1Variants = shouldReduceMotion
    ? {}
    : {
        animate: {
          x: [0, 25, -15, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.95, 1],
          transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' }
        }
      };

  const blob2Variants = shouldReduceMotion
    ? {}
    : {
        animate: {
          x: [0, -30, 20, 0],
          y: [0, 25, -20, 0],
          scale: [1, 0.92, 1.05, 1],
          transition: { duration: 22, repeat: Infinity, ease: 'easeInOut' }
        }
      };

  return (
    <section id="education" className="education-glass-section">
      {/* Ambient Soft Blurred Blobs for Depth */}
      <motion.div 
        className="education-ambient-blob blob-1" 
        variants={blob1Variants} 
        animate="animate" 
        aria-hidden="true" 
      />
      <motion.div 
        className="education-ambient-blob blob-2" 
        variants={blob2Variants} 
        animate="animate" 
        aria-hidden="true" 
      />

      <motion.div 
        className="container education-glass-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Centered Heading */}
        <motion.div className="section-header centered-header" variants={cardVariants}>
          <span className="section-subtitle education-eyebrow">QUALIFICATIONS</span>
          <h2 className="section-title education-main-title">
            <span className="title-bold">My</span> <span className="title-serif-italic">Education</span>
          </h2>
        </motion.div>

        {/* Frosted Glass Floating Cards Stack */}
        <div className="education-cards-stack">
          {educationData.map((item) => (
            <motion.div 
              key={item.id} 
              className="education-frosted-card"
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              {/* Card Inner Layout */}
              <div className="education-card-inner">
                {/* Left: Circular Logo Badge */}
                <div className="education-card-logo-wrapper">
                  <EducationLogo 
                    logo={item.logo}
                    alt={item.alt}
                    initial={item.initial}
                    institution={item.institution}
                  />
                </div>

                {/* Right: Content & Details */}
                <div className="education-card-content">
                  {/* Metadata line: Date range • Duration • Location */}
                  <div className="education-card-meta">
                    <span className="meta-date">{item.dateRange}</span>
                    {item.duration && <span className="meta-dot">•</span>}
                    {item.duration && <span className="meta-duration">{item.duration}</span>}
                    {item.location && <span className="meta-dot">•</span>}
                    {item.location && <span className="meta-location">{item.location}</span>}
                  </div>

                  {/* Degree Title */}
                  <h3 className="education-card-degree">{item.degree}</h3>

                  {/* Institution Name */}
                  <h4 className="education-card-institution">{item.institution}</h4>

                  {/* Row of Pill-shaped Chips */}
                  {Array.isArray(item.chips) && item.chips.length > 0 && (
                    <div className="education-card-chips-row">
                      {item.chips.map((chipText, cIdx) => (
                        <span 
                          key={cIdx} 
                          className={`education-pill-chip ${cIdx === 0 ? 'highlight-gpa-chip' : ''}`}
                        >
                          {chipText}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
