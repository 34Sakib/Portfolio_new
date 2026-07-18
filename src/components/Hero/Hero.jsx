import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import profileImageUrl from '../../assets/profile.png';
import Magnetic from '../ui/Magnetic';

const ROLES = [
  'Full Stack Developer',
  'Laravel Specialist',
  'React Developer',
  'API Architect'
];

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Cycle roles every 2.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Animation variants to match given specs (rise Y by 18px with cubic-bezier(.22,1,.36,1))
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = shouldReduceMotion 
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { 
        hidden: { opacity: 0, y: 18 }, 
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
        } 
      };

  const profileVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { 
        hidden: { opacity: 0, y: 30, scale: 0.98 }, 
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } 
        } 
      };

  const bgTextVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { 
        hidden: { opacity: 0, y: 15 }, 
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] } 
        } 
      };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero">
      {/* Ambient blobs */}
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      
      {/* Centering wrapper for background text to avoid translate conflicts with motion */}
      <div className="ghost-text-wrapper">
        <motion.div 
          className="ghost-text"
          variants={bgTextVariants}
          initial="hidden"
          animate="visible"
        >
          Hey, there
        </motion.div>
      </div>

      <motion.div 
        className="grid"
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Badge, Name, and CTA Buttons */}
        <div className="col-left">
          <motion.div className="badge" variants={itemVariants}>
            <span className="pulse-wrap"><span className="core"></span></span>
            AVAILABLE FOR NEW OPPORTUNITIES
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="eyebrow">I am</p>
            <h1 className="name">
              SAKIB<span className="last">AL MAHAMUD</span>
            </h1>
          </motion.div>
          <div className="cta-row">
            <Magnetic range={20}>
              <motion.a 
                href="#projects" 
                onClick={(e) => handleNavClick(e, '#projects')}
                className="btn btn-solid"
                variants={itemVariants}
              >
                View My Work
              </motion.a>
            </Magnetic>
            <Magnetic range={20}>
              <motion.a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn btn-outline"
                variants={itemVariants}
              >
                Get In Touch
              </motion.a>
            </Magnetic>
          </div>
        </div>

        {/* Center Column: Portrait Image Stage */}
        <motion.div 
          className="col-center"
          variants={profileVariants}
        >
          <div className="photo-stage">
            <img 
              src={profileImageUrl} 
              alt="Sakib Al Mahamud Portrait" 
            />
          </div>
        </motion.div>

        {/* Right Column: Roles & Description */}
        <div className="col-right">
          <motion.div variants={itemVariants}>
            <p className="role-line">Specialized in</p>
            <div className="role-cycle-container">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  className="role-cycle-text"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ROLES[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="desc">
              Building high-performance, secure REST APIs, scalable database schemas, and modern responsive interfaces.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
