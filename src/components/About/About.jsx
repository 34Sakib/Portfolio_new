import React, { useState, useEffect, useRef } from 'react';
import { Award, Briefcase, Zap, FileText } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Magnetic from '../ui/Magnetic';

// Animated Count-Up Counter Sub-component
const Counter = ({ value, duration = 1.5, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    const totalMiliseconds = duration * 1000;
    const intervalTime = 30;
    const totalSteps = Math.ceil(totalMiliseconds / intervalTime);
    const increment = end / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      start += increment;
      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setCount(value);
      } else {
        if (value % 1 !== 0) {
          setCount(start.toFixed(1));
        } else {
          setCount(Math.floor(start));
        }
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

export const About = () => {
  const shouldReduceMotion = useReducedMotion();

  // Stagger Choreography Animations
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

  return (
    <section id="about" className="about-section">
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-subtitle">Introduction</span>
          <h2 className="section-title">
            About <span className="title-bold">Me</span>
          </h2>
        </motion.div>

        <div className="about-grid">
          {/* Left Column: Signature Quote & Milestones */}
          <div className="about-left-col">
            {/* Signature Quote Card */}
            <motion.div className="about-quote-card" variants={itemVariants}>
              <span className="quote-mark">“</span>
              <p className="quote-text">
                Good code speaks for itself, great code disappears into the experience.
              </p>
            </motion.div>

            {/* Executive Milestones Card (Fitting neatly in place of Core Stack) */}
            <motion.div className="about-stats-card" variants={itemVariants}>
              {/* Stat 1: 1.5+ Years */}
              <div className="about-stat-item stat-item-experience">
                <div className="about-stat-header">
                  <div className="about-stat-icon primary">
                    <Briefcase size={15} />
                  </div>
                  <span className="about-stat-number">
                    <Counter value={1.5} suffix="+" />
                  </span>
                </div>
                <span className="about-stat-label">Years of professional code</span>
              </div>

              {/* Stat 2: 7+ Projects */}
              <div className="about-stat-item stat-item-projects">
                <div className="about-stat-header">
                  <div className="about-stat-icon cyan">
                    <Zap size={15} />
                  </div>
                  <span className="about-stat-number">
                    <Counter value={10} suffix="+" />
                  </span>
                </div>
                <span className="about-stat-label">Core Projects</span>
              </div>

              {/* Stat 3: 9 Certs */}
              <div className="about-stat-item stat-item-certs">
                <div className="about-stat-header">
                  <div className="about-stat-icon orange">
                    <Award size={15} />
                  </div>
                  <span className="about-stat-number">
                    <Counter value={9} />
                  </span>
                </div>
                <span className="about-stat-label">Certification</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio & Actions */}
          <div className="about-right-col">
            <motion.h3 className="about-headline" variants={itemVariants}>
              Full Stack Developer specializing in Laravel & React.js
            </motion.h3>

            <motion.p className="about-desc" variants={itemVariants}>
              I'm a Full Stack Developer with 1.5+ years of experience building scalable, production-ready web applications with PHP, Laravel, and React.js. My focus areas include RESTful API design, secure authentication systems, role-based access control, and clean, efficient database architecture.
            </motion.p>

            <motion.p className="about-desc" variants={itemVariants}>
              I care about more than just working code, I care about maintainable code. Whether I'm optimizing backend performance or designing an intuitive interface, my goal is always the same: turn complex requirements into software that feels simple to use. I've applied this across both local and international products, delivering complete systems from database to UI.
            </motion.p>

            {/* CV View CTA */}
            <motion.div className="about-actions" variants={itemVariants}>
              <Magnetic range={15}>
                <a
                  href="https://drive.google.com/file/d/1Hf7Rj1IgfsBDmzm46MEyQsxyuI98nhzs/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-solid"
                >
                  <FileText size={16} /> View My CV
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
