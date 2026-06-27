import React from 'react';
import { Award, Briefcase, Zap, FileText } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import profileImageUrl from '../../assets/profile.png';

export const About = () => {
  return (
    <section id="about" className="section reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Introduction</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          {/* Left Column: Profile Photo Frame */}
          <div className="about-image-wrapper">
            <div className="about-image-glow"></div>
            <div className="about-image-container">
              <img 
                src={profileImageUrl} 
                alt="Sakib Al Mahamud" 
                className="about-image"
              />
            </div>
          </div>

          {/* Right Column: Bio Details, CV Download & Stat Panels */}
          <div className="about-info">
            <h3 className="about-headline">
              Full Stack Developer specializing in Laravel & React.js
            </h3>
            <p className="about-desc">
              I am a Full Stack Developer with 1.5+ years of professional experience building scalable web applications using PHP, Laravel, and React.js. I specialize in RESTful API development, authentication systems, role-based access control, and database design.
            </p>
            <p className="about-desc">
              I am passionate about writing clean, maintainable code, optimizing application performance, and designing intuitive, responsive interfaces. Through my work with companies like Mentors and CodexLabAsia, I have delivered complete software solutions tailored for international and local audiences.
            </p>

            {/* Action button to view CV */}
            <div className="about-actions" style={{ margin: '0.5rem 0 1rem' }}>
              <a 
                href="https://drive.google.com/file/d/1DD_quXm8SlxdOxRw5TgS3wrPo7Zi1aRc/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ display: 'inline-flex', cursor: 'pointer' }}
              >
                <FileText size={18} /> View My CV
              </a>
            </div>

            <div className="about-stats-grid">
              <GlassCard className="about-stat-card">
                <div className="stat-icon-wrapper purple">
                  <Briefcase size={20} />
                </div>
                <div className="stat-number">1.5+</div>
                <div className="stat-label">Years Experience</div>
              </GlassCard>

              <GlassCard className="about-stat-card">
                <div className="stat-icon-wrapper cyan">
                  <Zap size={20} />
                </div>
                <div className="stat-number">4+</div>
                <div className="stat-label">Core Projects</div>
              </GlassCard>

              <GlassCard className="about-stat-card">
                <div className="stat-icon-wrapper orange">
                  <Award size={20} />
                </div>
                <div className="stat-number">4</div>
                <div className="stat-label">Certifications</div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
