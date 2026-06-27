import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Phone, MapPin } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

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
const LinkedinIcon = ({ size = 20, ...props }) => (
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

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1800);
  };

  return (
    <section id="contact" className="section reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Get in Touch</span>
          <h2 className="section-title">Contact Me</h2>
        </div>

        <div className="contact-grid">
          {/* Left Column: Contact Cards */}
          <div className="contact-info">
            <h3 className="contact-headline">Let's build something remarkable together.</h3>
            <p className="contact-desc">
              Have a project in mind, looking to hire, or just want to chat about web technology? Feel free to reach out. I am always open to discussing new ideas, software architectures, or full-stack opportunities.
            </p>

            <div className="contact-methods">
              <a href="mailto:sakibalmahamud34@gmail.com" className="contact-method-card glass-panel">
                <div className="contact-icon-box mail">
                  <Mail size={20} />
                </div>
                <div className="contact-method-details">
                  <span className="method-title">Email</span>
                  <span className="method-value">sakibalmahamud34@gmail.com</span>
                </div>
              </a>

              <a href="tel:01641655173" className="contact-method-card glass-panel">
                <div className="contact-icon-box mail" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <Phone size={20} />
                </div>
                <div className="contact-method-details">
                  <span className="method-title">Phone</span>
                  <span className="method-value">01641655173</span>
                </div>
              </a>

              <div className="contact-method-card glass-panel">
                <div className="contact-icon-box mail" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <MapPin size={20} />
                </div>
                <div className="contact-method-details">
                  <span className="method-title">Location</span>
                  <span className="method-value">Kuril, Dhaka, Bangladesh</span>
                </div>
              </div>

              <a href="https://github.com/34Sakib" target="_blank" rel="noopener noreferrer" className="contact-method-card glass-panel">
                <div className="contact-icon-box github">
                  <GithubIcon size={20} />
                </div>
                <div className="contact-method-details">
                  <span className="method-title">GitHub</span>
                  <span className="method-value">github.com/sakib-al-mahamud</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/sakib-al-mahamud" target="_blank" rel="noopener noreferrer" className="contact-method-card glass-panel">
                <div className="contact-icon-box linkedin">
                  <LinkedinIcon size={20} />
                </div>
                <div className="contact-method-details">
                  <span className="method-title">LinkedIn</span>
                  <span className="method-value">linkedin.com/in/sakib-al-mahamud</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-wrapper">
            <GlassCard className="contact-form-card">
              {isSubmitted ? (
                <div className="form-success-state">
                  <CheckCircle size={60} className="success-icon animate-bounce text-cyan" />
                  <h3 className="success-title">Message Sent!</h3>
                  <p className="success-desc">
                    Thank you for reaching out. I have received your message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name" className={formData.name ? 'active' : ''}>Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'input-error' : ''}
                      placeholder="Your Name"
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className={formData.email ? 'active' : ''}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                      placeholder="email@example.com"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className={formData.message ? 'active' : ''}>Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'input-error' : ''}
                      placeholder="Hello! Let's discuss..."
                    ></textarea>
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
