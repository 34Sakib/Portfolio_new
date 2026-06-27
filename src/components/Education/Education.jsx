import React from 'react';
import { BookOpen } from 'lucide-react';
import { educationData } from '../../data/education';
import GlassCard from '../ui/GlassCard';

export const Education = () => {
  return (
    <section id="education" className="section reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Qualifications</span>
          <h2 className="section-title">Education & Certs</h2>
        </div>

        <div className="education-grid">
          {educationData.map((edu, idx) => (
            <GlassCard key={idx} className="education-card">
              <div className="education-header-block">
                <div className="education-icon-box">
                  <BookOpen size={20} className="text-cyan" />
                </div>
                <div className="education-meta">
                  <span className="education-year">{edu.year}</span>
                  <h3 className="education-degree">{edu.degree}</h3>
                  <h4 className="education-school">{edu.school}</h4>
                </div>
              </div>

              <ul className="education-achievements-list">
                {edu.achievements.map((ach, aIdx) => (
                  <li key={aIdx} className="education-achievement-item">
                    <span className="bullet"></span>
                    <span className="text">{ach}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
