import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, Copy, Check, Award } from 'lucide-react';
import { certificatesData } from '../../data/certificates';

export const Certificates = () => {
  const [copiedId, setCopiedId] = useState(null); // Tracks which certificate's ID is copied
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  const handleCopy = (id, idx) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(idx);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy credential ID: ', err);
    });
  };

  const openLightbox = (image) => {
    setActiveLightboxImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveLightboxImage(null);
    document.body.style.overflow = 'auto';
  };

  const truncateId = (id) => {
    if (!id) return '';
    if (id.length <= 16) return id;
    return `${id.slice(0, 10)}...${id.slice(-6)}`;
  };

  return (
    <section id="certificates" className="section reveal">
      <div className="container">
        
        {/* Premium section header matching reference image */}
        <div className="section-header">
          <span className="section-subtitle">Credentials</span>
          <h2 className="section-title">
            Certifications & <span className="title-bold">Courses</span>
          </h2>
        </div>

        {/* 2-Column Minimalist List Grid */}
        <div className="certificates-list-grid">
          {certificatesData.map((cert, idx) => (
            <div key={idx} className="certificate-grid-card">
              
              {/* Left Column: Very compact matted thumbnail */}
              <div 
                className="cert-thumbnail-wrapper"
                onClick={() => openLightbox(cert.image)}
                title="Click to view full certificate"
              >
                <div className="cert-thumbnail-mat">
                  <img 
                    src={cert.image} 
                    alt={`${cert.title} Certificate`} 
                    className="cert-thumbnail-img"
                    referrerPolicy="no-referrer"
                  />
                  <div className="cert-thumbnail-overlay">
                    <ZoomIn size={12} className="zoom-icon-small" />
                  </div>
                </div>
              </div>

              {/* Right Column: Improved Premium Typography Details */}
              <div className="cert-details-col">
                <h3 className="certificate-grid-title">
                  {cert.title}
                </h3>
                
                <div className="cert-meta-info-row">
                  <Award size={14} className="cert-award-icon" />
                  <span className="cert-issuer-text">{cert.issuer}</span>
                  <span className="cert-meta-separator">•</span>
                  <span className="cert-date-text">Earned {cert.date}</span>
                </div>

                <div className="cert-actions-inline">
                  <a 
                    href={cert.verifyLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cert-inline-action"
                  >
                    Verify Credential
                  </a>
                  {cert.credentialId && (
                    <>
                      <span className="cert-action-dot">•</span>
                      <button 
                        className={`cert-inline-action copy-action-trigger ${copiedId === idx ? 'copied' : ''}`}
                        onClick={() => handleCopy(cert.credentialId, idx)}
                        aria-label="Copy credential ID"
                      >
                        {copiedId === idx ? "Copied!" : `ID: ${truncateId(cert.credentialId)}`}
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
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
