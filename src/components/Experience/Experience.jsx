import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Atom, 
  Layers, 
  FileCode, 
  Code, 
  Cpu, 
  Flame, 
  Globe, 
  Database, 
  Terminal, 
  Lock, 
  Zap 
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceData } from '../../data/experience';
import Badge from '../ui/Badge';

// Map technical skill tag names to Lucide icons dynamically
const getTagIcon = (tagName) => {
  const name = tagName.toLowerCase();
  if (name.includes('react')) return <Atom size={12} className="tag-icon text-react" style={{ color: '#00d8ff', marginRight: '0.35rem' }} />;
  if (name.includes('laravel')) return <Flame size={12} className="tag-icon text-laravel" style={{ color: '#ff2d20', marginRight: '0.35rem' }} />;
  if (name.includes('mysql')) return <Database size={12} className="tag-icon text-db" style={{ color: '#336791', marginRight: '0.35rem' }} />;
  if (name.includes('postgres')) return <Database size={12} className="tag-icon text-db" style={{ color: '#336791', marginRight: '0.35rem' }} />;
  if (name.includes('api')) return <Globe size={12} className="tag-icon text-api" style={{ color: '#f59e0b', marginRight: '0.35rem' }} />;
  if (name.includes('php')) return <Cpu size={12} className="tag-icon text-php" style={{ color: '#777bb4', marginRight: '0.35rem' }} />;
  if (name.includes('bootstrap')) return <Layers size={12} className="tag-icon text-tailwind" style={{ color: '#38bdf8', marginRight: '0.35rem' }} />;
  if (name.includes('typescript')) return <FileCode size={12} className="tag-icon text-ts" style={{ color: '#3178c6', marginRight: '0.35rem' }} />;
  if (name.includes('javascript') || name.includes('jquery')) return <Code size={12} className="tag-icon text-js" style={{ color: '#f7df1e', marginRight: '0.35rem' }} />;
  if (name.includes('sanctum') || name.includes('spatie') || name.includes('auth')) return <Lock size={12} className="tag-icon text-auth" style={{ color: '#10b981', marginRight: '0.35rem' }} />;
  if (name.includes('vite')) return <Zap size={12} className="tag-icon text-vite" style={{ color: '#f59e0b', marginRight: '0.35rem' }} />;
  if (name.includes('blade') || name.includes('html') || name.includes('css')) return <Layers size={12} className="tag-icon text-html" style={{ color: '#f0533c', marginRight: '0.35rem' }} />;
  return <Terminal size={12} className="tag-icon text-terminal" style={{ marginRight: '0.35rem' }} />;
};


export const Experience = () => {
  const shouldReduceMotion = useReducedMotion();

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
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
      };

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Journey</span>
          <h2 className="section-title">
            Work <span className="title-bold">Experience</span>
          </h2>
        </div>

        <motion.div 
          className="experience-browser-mockup glass-panel"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="browser-topbar">
            <div className="browser-dots">
              <span className="browser-dot red"></span>
              <span className="browser-dot yellow"></span>
              <span className="browser-dot green"></span>
            </div>
            <div className="browser-window-title">Experience</div>
          </div>

          <div className="browser-content">
            <div className="experience-tree">
              {experienceData.map((exp, idx) => {
                return (
                  <motion.div 
                    key={idx} 
                    className="experience-company-node"
                    variants={itemVariants}
                  >
                    {/* Company Header: Logo + Name */}
                    <div className="company-info-row">
                      <div className="company-logo-circle">
                        {exp.logo ? (
                          <img 
                            src={exp.logo} 
                            alt={`${exp.company} Logo`} 
                            className="company-logo-img"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="company-logo-placeholder" 
                          style={{ display: exp.logo ? 'none' : 'flex' }}
                        >
                          {exp.company.substring(0, 1)}
                        </div>
                      </div>
                      <h3 className="company-name">{exp.company}</h3>
                    </div>

                    {/* Role Details container with branch curve */}
                    <div className="role-details-container">
                      <div className="role-content-card">
                        <div className="role-header-row">
                          <h4 className="role-title">{exp.role}</h4>
                          <span className="verified-badge-wrap">
                            <CheckCircle2 size={15} className="verified-icon" />
                          </span>
                        </div>

                        {/* Metadata row */}
                        <div className="role-meta-row">
                          <span className="meta-item period">{exp.period} ({exp.duration})</span>
                          <span className="meta-separator">•</span>
                          <span className="meta-item location">{exp.location}</span>
                          <span className="meta-separator">•</span>
                          <span className="meta-item type">{exp.type}</span>
                        </div>

                        {/* Short 1-3 line description */}
                        <p className="role-description">
                          {exp.description}
                        </p>

                        {/* Tech tags */}
                        <div className="role-tags-row">
                          {exp.tags.map((tag, tIdx) => (
                            <Badge key={tIdx} className="experience-tag-badge" style={{ display: 'inline-flex', alignItems: 'center' }}>
                              {getTagIcon(tag)}
                              <span>{tag}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
