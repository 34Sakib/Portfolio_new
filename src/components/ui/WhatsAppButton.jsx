import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Premium Custom SVG WhatsApp icon
const WhatsAppIcon = ({ size = 22, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.57 1.968 14.1 1.94 11.51 1.94c-5.437 0-9.863 4.373-9.867 9.801-.001 1.73.453 3.424 1.316 4.924l-.993 3.63 3.738-.971c1.554.914 3.093 1.378 4.753 1.378zm10.962-6.526c-.304-.152-1.8-.887-2.079-.988-.278-.101-.482-.152-.684.152-.202.304-.783.988-.959 1.189-.177.202-.354.228-.658.076-.304-.152-1.283-.473-2.443-1.507-.903-.805-1.512-1.8-1.689-2.103-.177-.304-.019-.469.133-.62.137-.136.304-.354.456-.531.152-.177.202-.304.304-.506.101-.202.051-.38-.025-.531-.076-.152-.684-1.648-.937-2.256-.247-.593-.497-.512-.684-.522-.177-.01-.38-.01-.582-.01-.202 0-.531.076-.81.38-.278.304-1.062 1.037-1.062 2.529 0 1.492 1.087 2.934 1.238 3.136.152.202 2.14 3.264 5.184 4.575.724.312 1.288.499 1.729.639.728.23 1.39.198 1.91.121.58-.088 1.8-.737 2.054-1.45.253-.714.253-1.326.177-1.45-.076-.123-.278-.202-.582-.354z" />
  </svg>
);

export const WhatsAppButton = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '8801641655173'; // BD country code 88 added, dropped leading 0
  const message = encodeURIComponent("Hi Sakib, I'm interested in your work! Let's discuss.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="whatsapp-float-container">
      {/* Expanding Tooltip Message */}
      <AnimatePresence>
        {isHovered && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="whatsapp-float-tooltip"
          >
            <div className="whatsapp-tooltip-content">
              <span className="whatsapp-tooltip-status">Available Now</span>
              <span className="whatsapp-tooltip-text">Let's talk project! 👋</span>
            </div>
            <span className="whatsapp-tooltip-arrow" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Pulsating Beacon Ring */}
      {!shouldReduceMotion && (
        <div className="whatsapp-float-beacon"></div>
      )}

      {/* Float Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -3 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        className="whatsapp-float-btn glass-panel"
        aria-label="Chat on WhatsApp"
      >
        <div className="whatsapp-btn-inner-glow"></div>
        <WhatsAppIcon className="whatsapp-btn-icon" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
