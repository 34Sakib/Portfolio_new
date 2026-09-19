import React, { useState, useEffect, useRef } from 'react';
import { Award, Briefcase, Zap, FileText, Atom, Code2, Database, Terminal, Network, Server } from 'lucide-react';
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
          {/* Left Column: Tech Stack & Signature Quote */}
          <div className="about-left-col">
            {/* Signature Quote Card */}
            <motion.div className="about-quote-card" variants={itemVariants}>
              <span className="quote-mark">“</span>
              <p className="quote-text">
                Good code speaks for itself, great code disappears into the experience.
              </p>
            </motion.div>

            {/* Core Tech Stack grid */}
            <motion.div className="about-tech-stack" variants={itemVariants}>
              <h4 className="tech-stack-title">Core Stack</h4>
              <div className="about-tech-grid">
                <div className="tech-badge laravel">
                  <Server size={14} /> Laravel
                </div>
                <div className="tech-badge react">
                  <Atom size={14} /> React.js
                </div>
                <div className="tech-badge php">
                  <Code2 size={14} /> PHP
                </div>
                <div className="tech-badge mysql">
                  <Database size={14} /> MySQL
                </div>
                <div className="tech-badge javascript">
                  <Terminal size={14} /> JavaScript
                </div>
                <div className="tech-badge apis">
                  <Network size={14} /> REST APIs
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio, Actions, and Stat Band */}
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

            {/* Horizontal Stats Band */}
            <motion.div className="about-stat-band" variants={itemVariants}>
              {/* Dominant Stat */}
              <div className="stat-dominant">
                <div className="stat-number">
                  <Counter value={1.5} suffix="+" />
                </div>
                <div className="stat-label">Years of professional code</div>
              </div>

              {/* Secondary Stats */}
              <div className="stat-secondary-group">
                <div className="stat-item">
                  <div className="stat-icon-wrapper cyan">
                    <Zap size={16} />
                  </div>
                  <div>
                    <div className="stat-val">
                      <Counter value={7} suffix="+" />
                    </div>
                    <div className="stat-lbl">Core Projects</div>
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-icon-wrapper orange">
                    <Award size={16} />
                  </div>
                  <div>
                    <div className="stat-val">
                      <Counter value={9} />
                    </div>
                    <div className="stat-lbl">Certifications</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
