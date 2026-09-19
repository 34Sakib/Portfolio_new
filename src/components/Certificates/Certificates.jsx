import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ZoomIn, 
  Copy, 
  Check, 
  Award, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  Calendar,
  CheckCircle2,
  BadgeCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { certificatesData } from '../../data/certificates';

// 3D Holographic Glass Plaque Card Component
const HolographicCertCard = ({ cert, onOpenLightbox, onCopyId, isCopied }) => {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // -7deg to +7deg
    const rotateY = ((x - centerX) / centerX) * 7;   // -7deg to +7deg
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  const truncateId = (id) => {
    if (!id) return '';
    if (id.length <= 14) return id;
    return `${id.slice(0, 8)}...`;
  };

  return (
    <div className="holographic-cert-perspective">
      <div
        ref={cardRef}
        className={`holographic-cert-card ${tilt.isHovered ? 'hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          '--cert-brand-color': cert.brandColor,
          '--cert-brand-glow': cert.brandGlow,
          '--glare-x': `${tilt.glareX}%`,
          '--glare-y': `${tilt.glareY}%`,
          transform: shouldReduceMotion
            ? 'none'
            : `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${tilt.isHovered ? -6 : 0}px)`,
          borderColor: tilt.isHovered ? `${cert.brandColor}66` : undefined,
          boxShadow: tilt.isHovered 
            ? `0 24px 50px rgba(0, 0, 0, 0.45), 0 0 25px ${cert.brandGlow}`
            : undefined
        }}
      >
        {/* Holographic Prismatic Rainbow Edge Sheen */}
        <div className="holographic-rainbow-border" />

        {/* Dynamic Specular Light Glare */}
        <div className="holographic-specular-glare" />

        {/* Ambient Brand Glow Aura */}
        <div className="cert-brand-aura" />

        {/* Plaque Header: Issuer Authority Badge & Verified Accreditation Seal */}
        <div className="cert-plaque-header">
          <div className="cert-issuer-badge">
            <span 
              className="issuer-dot" 
              style={{ backgroundColor: cert.brandColor, boxShadow: `0 0 8px ${cert.brandColor}` }} 
            />
            <span className="issuer-name">{cert.issuer}</span>
          </div>

          <div className="cert-verified-pill">
            <ShieldCheck size={12} className="verified-shield-icon" />
            <span>VERIFIED</span>
            <span className="verified-beacon" />
          </div>
        </div>

        {/* Matted Certificate Image Canvas Frame */}
        <div 
          className="cert-canvas-frame"
          onClick={() => onOpenLightbox(cert)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox(cert)}
          aria-label={`Enlarge ${cert.title} Certificate`}
        >
          <img 
            src={cert.image} 
            alt={`${cert.title} Certificate`} 
            className="cert-canvas-img"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="cert-canvas-overlay">
            <div className="cert-zoom-btn">
              <ZoomIn size={13} />
              <span>Inspect Certificate</span>
            </div>
          </div>
        </div>

        {/* Certificate Title & Metadata Details */}
        <div className="cert-plaque-body">
          <h3 className="cert-plaque-title" title={cert.title}>
            {cert.title}
          </h3>

          <div className="cert-meta-row">
            <span className="cert-meta-chip date">
              <Calendar size={12} />
              <span>Issued {cert.date}</span>
            </span>
            <span className="cert-meta-chip verified-badge">
              <BadgeCheck size={12} style={{ color: cert.brandColor }} />
              <span>{cert.issuer} Certified</span>
            </span>
          </div>
        </div>

        {/* Bottom Actions: Verify Credential & One-Click Copy ID */}
        <div className="cert-plaque-actions">
          <a 
            href={cert.verifyLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cert-btn-verify"
          >
            <span>Verify Credential</span>
            <ExternalLink size={12} />
          </a>

          {cert.credentialId && (
            <button
              type="button"
              className={`cert-btn-copy ${isCopied ? 'copied' : ''}`}
              onClick={() => onCopyId(cert.credentialId, cert.id)}
              aria-label="Copy credential ID"
              title="Click to copy credential ID"
            >
              {isCopied ? (
                <>
                  <Check size={12} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>ID: {truncateId(cert.credentialId)}</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export const Certificates = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [activeLightboxCert, setActiveLightboxCert] = useState(null);

  const currentIndex = activeLightboxCert 
    ? certificatesData.findIndex(c => c.id === activeLightboxCert.id) 
    : -1;

  const handlePrevCert = useCallback((e) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setActiveLightboxCert(certificatesData[currentIndex - 1]);
    } else {
      setActiveLightboxCert(certificatesData[certificatesData.length - 1]);
    }
  }, [currentIndex]);

  const handleNextCert = useCallback((e) => {
    e?.stopPropagation();
    if (currentIndex >= 0 && currentIndex < certificatesData.length - 1) {
      setActiveLightboxCert(certificatesData[currentIndex + 1]);
    } else {
      setActiveLightboxCert(certificatesData[0]);
    }
  }, [currentIndex]);

  const handleCopy = (id, certId) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(certId);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy credential ID: ', err);
    });
  };

  const openLightbox = (cert) => {
    setActiveLightboxCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveLightboxCert(null);
    document.body.style.overflow = 'auto';
  };

  // Keyboard navigation for lightbox: Escape to close, Left/Right arrow keys to step through
  useEffect(() => {
    if (!activeLightboxCert) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCert();
      } else if (e.key === 'ArrowRight') {
        handleNextCert();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxCert, handlePrevCert, handleNextCert]);

  return (
    <section id="certificates" className="section reveal">
      {/* Ambient Lighting Backdrop */}
      <div className="cert-ambient-backdrop" aria-hidden="true" />
      
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">
            <Sparkles size={13} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '5px' }} />
            Credentials
          </span>
          <h2 className="section-title">
            Certifications & <span className="title-bold">Accreditations</span>
          </h2>
          <p className="section-description">
            Officially authenticated credentials certified by global technology and educational leaders.
          </p>
        </div>

        {/* 3D Holographic Plaque Grid — All 9 Credentials Displayed Seamlessly */}
        <div className="holographic-cert-grid">
          {certificatesData.map((cert) => (
            <HolographicCertCard
              key={cert.id}
              cert={cert}
              onOpenLightbox={openLightbox}
              onCopyId={handleCopy}
              isCopied={copiedId === cert.id}
            />
          ))}
        </div>

      </div>

      {/* High-Resolution Certificate Lightbox Modal with Full-Visibility Frame & One-by-One Navigation */}
      {activeLightboxCert && createPortal(
        <div className="cert-lightbox-overlay" onClick={closeLightbox}>
          <div 
            className="cert-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeLightboxCert.title} Certificate`}
          >
            {/* Modal Top Bar */}
            <div className="cert-lightbox-topbar">
              <div className="cert-lightbox-header-info">
                <h3 className="cert-lightbox-title">{activeLightboxCert.title}</h3>
                <div className="cert-lightbox-subrow">
                  <span 
                    className="cert-lightbox-issuer-pill" 
                    style={{ color: activeLightboxCert.brandColor }}
                  >
                    {activeLightboxCert.issuer}
                  </span>
                  <span className="cert-lightbox-subdivider">•</span>
                  <span>Issued {activeLightboxCert.date}</span>
                  <span className="cert-lightbox-subdivider">•</span>
                  <span className="cert-lightbox-counter">
                    {currentIndex + 1} of {certificatesData.length}
                  </span>
                </div>
              </div>
              <button 
                type="button"
                className="cert-lightbox-close"
                onClick={closeLightbox}
                aria-label="Close certificate inspection"
              >
                <X size={18} />
              </button>
            </div>

            {/* Certificate Display Canvas with Floating Side Arrows */}
            <div className="cert-lightbox-img-wrapper">
              <button 
                type="button"
                className="cert-lightbox-nav-btn prev"
                onClick={handlePrevCert}
                aria-label="Previous certificate"
                title="Previous certificate (Left Arrow key)"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="cert-lightbox-img-container">
                <img 
                  src={activeLightboxCert.image} 
                  alt={`${activeLightboxCert.title} Certificate`}
                  className="cert-lightbox-img"
                  referrerPolicy="no-referrer"
                />
              </div>

              <button 
                type="button"
                className="cert-lightbox-nav-btn next"
                onClick={handleNextCert}
                aria-label="Next certificate"
                title="Next certificate (Right Arrow key)"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Modal Footer with One-by-One Controls & Verification */}
            <div className="cert-lightbox-footer">
              <div className="cert-lightbox-footer-left">
                <span className="cert-lightbox-cred-label">
                  Credential ID: <code className="cert-lightbox-cred-code">{activeLightboxCert.credentialId || 'N/A'}</code>
                </span>
                <span className="cert-lightbox-nav-hint">
                  Use <kbd>←</kbd> <kbd>→</kbd> to browse
                </span>
              </div>
              
              <div className="cert-lightbox-footer-actions">
                <a 
                  href={activeLightboxCert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary cert-lightbox-verify-btn"
                  style={{
                    backgroundColor: activeLightboxCert.brandColor,
                    borderColor: activeLightboxCert.brandColor
                  }}
                >
                  <span>Verify on {activeLightboxCert.issuer}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Certificates;
