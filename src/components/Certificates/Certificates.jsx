import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X, ZoomIn } from 'lucide-react';
import { certificatesData } from '../../data/certificates';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

export const Certificates = () => {
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  const openLightbox = (image) => {
    setActiveLightboxImage(image);
    document.body.style.overflow = 'hidden'; // Lock scrolling during popup
  };

  const closeLightbox = () => {
    setActiveLightboxImage(null);
    document.body.style.overflow = 'auto'; // Restore scroll
  };

  return (
    <section id="certificates" className="section reveal">
      <div className="container">
        
        <div className="section-header">
          <span className="section-subtitle">Credentials</span>
          <h2 className="section-title">Certifications & Courses</h2>
        </div>

        <div className="certificates-gallery-grid">
          {certificatesData.map((cert, idx) => (
            <GlassCard key={idx} className="certificate-gallery-card">
              
              {/* Image Frame with zoom trigger */}
              <div 
                className="certificate-image-box"
                onClick={() => openLightbox(cert.image)}
              >
                <img 
                  src={cert.image} 
                  alt={`${cert.title} Certificate`} 
                  className="certificate-gallery-img"
                  referrerPolicy="no-referrer"
                />
                <div className="certificate-image-overlay">
                  <ZoomIn size={24} className="zoom-icon-svg" />
                  <span className="zoom-text">Click to View Image</span>
                </div>
              </div>

              {/* Certificate content and tags */}
              <div className="certificate-gallery-content">
                <div className="cert-meta-header">
                  <Badge className="cert-issuer-badge">{cert.issuer}</Badge>
                  <span className="cert-date">{cert.date}</span>
                </div>
                
                <h3 className="certificate-gallery-title">{cert.title}</h3>
                
                {cert.credentialId && (
                  <p className="certificate-cred-id">
                    ID: <code>{cert.credentialId}</code>
                  </p>
                )}

                <a 
                  href={cert.verifyLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-verify-cred"
                >
                  Verify Credential <ExternalLink size={14} />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal Overlay for Certificate Zoom */}
      {activeLightboxImage && createPortal(
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close image viewer">
            <X size={30} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeLightboxImage} 
              alt="Enlarged Certificate Credential" 
              className="lightbox-image" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Certificates;
