import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { experienceData } from '../../data/experience';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

export const Experience = () => {
  return (
    <section id="experience" className="section reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Journey</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className="timeline-container">
          {/* Vertical axis line */}
          <div className="timeline-line"></div>

          <div className="timeline-items">
            {experienceData.map((exp, idx) => (
              <div 
                key={idx} 
                className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
              >
                {/* Visual marker node on the axis line */}
                <div className="timeline-dot">
                  <div className="timeline-dot-inner"></div>
                </div>

                <GlassCard className="timeline-card">
                  <div className="timeline-card-header">
                    <span className="timeline-period">
                      <Calendar size={14} /> {exp.period}
                    </span>
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
                  
                  <p className="timeline-desc">{exp.description}</p>
                  
                  <div className="timeline-tags">
                    {exp.tags.map((tag, tIdx) => (
                      <Badge key={tIdx} className="timeline-tag">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
