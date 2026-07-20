import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, AlertCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Magnetic from '../ui/Magnetic';

// Custom inline SVG GitHub Icon to bypass brand icon exclusion in lucide-react
const GithubIcon = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom inline SVG LinkedIn Icon to bypass brand icon exclusion in lucide-react
const LinkedInIcon = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Encapsulated Inline Auto-Resizing Input Component
const InlineInput = ({ value, onChange, placeholder, type = "text", id, ...props }) => {
  const spanRef = useRef(null);
  const [width, setWidth] = useState(150);

  useEffect(() => {
    if (spanRef.current) {
      // Measure dummy span size and add a buffer for typing cursor
      const measuredWidth = spanRef.current.offsetWidth;
      setWidth(Math.max(measuredWidth + 10, 120));
    }
  }, [value, placeholder]);

  return (
    <span className="inline-input-wrapper" style={{ width }}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="inline-sentence-input"
        required
        {...props}
      />
      {/* Absolute hidden span mirroring styles for dynamic width calculation */}
      <span ref={spanRef} className="inline-input-dummy" aria-hidden="true">
        {value || placeholder}
      </span>
    </span>
  );
};

export const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', project: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const targetEmail = 'sakibalmahamud34@gmail.com';

    try {
      let response;
      if (web3Key && web3Key !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
        // Submit via Web3Forms API
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: formData.name,
            email: formData.email,
            message: formData.project,
            subject: `Portfolio Inquiry from ${formData.name}`,
            from_name: formData.name
          })
        });
      } else {
        // Fallback: Submit via FormSubmit AJAX endpoint directly to targetEmail
        response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            project_details: formData.project,
            _subject: `New Portfolio Inquiry from ${formData.name}`,
            _captcha: 'false'
          })
        });
      }

      const data = await response.json();
      if (response.ok && (data.success === true || data.success === 'true' || data.status === 'success')) {
        setIsSubmitted(true);
        setFormData({ name: '', project: '', email: '' });
      } else {
        throw new Error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage(err.message || 'Something went wrong while sending your email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const revealVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section id="contact" className="section reveal">
      <motion.div 
        className="container"
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="contact-sentence-layout">
          
          {/* Left Column: Brand Statement */}
          <div className="contact-brand-column">
            <div className="section-header">
              <span className="section-subtitle">PARTNERSHIP & INQUIRIES</span>
              <h2 className="section-title">
                Let's get <span className="title-bold">started.</span>
              </h2>
            </div>
            
            {/* Minimal horizontal icons list matching user's request */}
            <div className="contact-minimal-icons-row">
              <Magnetic range={15}>
                <a 
                  href="mailto:sakibalmahamud34@gmail.com" 
                  className="contact-icon-btn mail" 
                  aria-label="Email Sakib"
                  title="sakibalmahamud34@gmail.com"
                >
                  <Mail size={18} />
                  <span className="tooltip-text">sakibalmahamud34@gmail.com</span>
                </a>
              </Magnetic>

              <Magnetic range={15}>
                <a 
                  href="tel:01641655173" 
                  className="contact-icon-btn phone" 
                  aria-label="Call Sakib"
                  title="01641655173"
                >
                  <Phone size={18} />
                  <span className="tooltip-text">01641655173</span>
                </a>
              </Magnetic>

              <Magnetic range={15}>
                <a 
                  href="https://github.com/34Sakib" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-icon-btn github" 
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <GithubIcon size={18} />
                  <span className="tooltip-text">github.com/34Sakib</span>
                </a>
              </Magnetic>

              <Magnetic range={15}>
                <a 
                  href="https://linkedin.com/in/sakibalmahamud" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-icon-btn linkedin" 
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <LinkedInIcon size={18} />
                  <span className="tooltip-text">linkedin.com/in/sakibalmahamud</span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Sentence Form or Success State */}
          <div className="contact-form-column">
            {isSubmitted ? (
              <div className="sentence-success-state">
                <h3 className="success-heading">Message sent.</h3>
                <p className="success-paragraph">
                  Thank you for reaching out. I will review your details and get back to you within 24 hours to get things started.
                </p>
                <button 
                  type="button" 
                  onClick={() => setIsSubmitted(false)}
                  className="sentence-reset-btn"
                >
                  — SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="sentence-contact-form">
                <div className="sentence-container">
                  My name is <InlineInput id="name" value={formData.name} onChange={handleChange} placeholder="YOUR FULL NAME" aria-label="Your full name" /> and I have a <InlineInput id="project" value={formData.project} onChange={handleChange} placeholder="WEBSITE, FULL-TIME JOB, ETC." aria-label="Your website or job details" /> that needs help. You can reach me at <InlineInput id="email" type="email" value={formData.email} onChange={handleChange} placeholder="YOUR EMAIL ADDRESS" aria-label="Your email address" /> to get things started.
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="sentence-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="inline-spinner"></span> SENDING...
                      </>
                    ) : (
                      <>
                        — SEND INFO
                      </>
                    )}
                  </button>

                  {errorMessage && (
                    <div className="sentence-error-box" role="alert">
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
