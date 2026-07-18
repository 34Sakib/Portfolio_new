import React from 'react';
import { Calendar, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceData } from '../../data/experience';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

export const Experience = () => {
  const shouldReduceMotion = useReducedMotion();

  // Scroll Reveal Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  const nodeVariants = shouldReduceMotion
    ? { hidden: { scale: 0.5 }, visible: { scale: 1 } }
    : {
        hidden: { scale: 0, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.15 }
        }
      };

  // Alternating card animations
  const leftCardVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -60 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
      };

  const rightCardVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: 60 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
      };

  return (
    <section id="experience" className="section">
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="section-header">
          <span className="section-subtitle">Journey</span>
          <h2 className="section-title">
            Work <span className="title-bold">Experience</span>
          </h2>
        </div>

        <div className="timeline-container">
          {/* Vertical axis line animated on scroll */}
          {!shouldReduceMotion && (
            <motion.div 
              className="timeline-line"
              variants={lineVariants}
            />
          )}

          <div className="timeline-items">
            {experienceData.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              const isCurrent = exp.period.toLowerCase().includes('present');

              return (
                <div 
                  key={idx} 
                  className={`timeline-item ${isLeft ? 'left' : 'right'}`}
                >
                  {/* Pulsing Visual marker node on the axis line */}
                  <motion.div 
                    className={`timeline-dot ${isCurrent ? 'active' : ''}`}
                    variants={nodeVariants}
                  >
                    <div className="timeline-dot-inner"></div>
                  </motion.div>

                  {/* Alternating Slide-In Card */}
                  <motion.div 
                    className="timeline-card-wrapper"
                    variants={isLeft ? leftCardVariants : rightCardVariants}
                  >
                    <GlassCard className={`timeline-card ${isCurrent ? 'current-role' : ''}`}>
                      <div className="timeline-card-header">
                        <div className="timeline-meta-row">
                          <span className="timeline-period">
                            <Calendar size={13} /> {exp.period}
                          </span>
                          <span className="timeline-duration-badge">
                            {exp.duration}
                          </span>
                        </div>
                        
                        <h3 className="timeline-role">{exp.role}</h3>
                        
                        <div className="timeline-company-wrapper">
                          {exp.logo && (
                            <div className="timeline-company-logo-container">
                              <img 
                                src={exp.logo} 
                                alt={`${exp.company} Logo`} 
                                className="timeline-company-logo" 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                          <h4 className="timeline-company">{exp.company}</h4>
                        </div>
                      </div>
                      
                      {/* Scannable Bullet Point Achievement List */}
                      <ul className="timeline-bullet-list">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="timeline-bullet-item">
                            <Check size={14} className="timeline-bullet-icon" />
                            <span className="bullet-text">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Accent-tinted tech pill tags */}
                      <div className="timeline-tags">
                        {exp.tags.map((tag, tIdx) => (
                          <Badge key={tIdx} className="timeline-tag">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
