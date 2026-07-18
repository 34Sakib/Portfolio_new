import React from 'react';
import { BookOpen, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { educationData } from '../../data/education';

export const Education = () => {
  const shouldReduceMotion = useReducedMotion();

  // Scroll Reveal Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
      };

  const nodeVariants = shouldReduceMotion
    ? { hidden: { scale: 0.5 }, visible: { scale: 1 } }
    : {
        hidden: { scale: 0, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.2 }
        }
      };

  return (
    <section id="education" className="education-section">
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-subtitle">Qualifications</span>
          <h2 className="section-title">
            My <span className="title-bold">Education</span>
          </h2>
        </motion.div>

        {/* Connected Chronological Timeline */}
        <div className="education-timeline">
          {/* Vertical timeline line drawn as you scroll */}
          {!shouldReduceMotion && (
            <motion.div 
              className="timeline-line" 
              variants={lineVariants}
            />
          )}

          {educationData.map((edu, idx) => (
            <div key={idx} className="timeline-item">
              {/* Timeline dot node */}
              <motion.div 
                className="timeline-node"
                variants={nodeVariants}
              >
                <BookOpen size={14} />
              </motion.div>

              {/* Card content */}
              <motion.div 
                className="timeline-content"
                variants={itemVariants}
              >
                <GlassCard className="education-card">
                  <div className="education-header-block">
                    <span className="education-year">{edu.year}</span>
                    <h3 className="education-degree">{edu.degree}</h3>
                    <h4 className="education-school">{edu.school}</h4>
                  </div>

                  <ul className="education-achievements-list">
                    {edu.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="education-achievement-item">
                        <Check size={14} className="achievement-icon" />
                        <span className="text">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
