import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

export const AudioToggle = () => {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <div className="audio-toggle-wrapper">
      <button
        type="button"
        onClick={toggleAudio}
        className={`audio-toggle-btn ${isPlaying ? 'is-playing' : 'is-paused'}`}
        aria-label={isPlaying ? "Pause ambient audio" : "Play ambient audio"}
      >
        <div className="audio-wave-container">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="wave"
                className="audio-wave-motion"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <svg 
                  className="audio-wave-svg animate-wave" 
                  viewBox="0 0 32 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Secondary harmonic wave glow */}
                  <path
                    className="audio-wave-path harmonic"
                    d="M -32,10 Q -24,3 -16,10 T 0,10 T 16,10 T 32,10 T 48,10 T 64,10"
                    stroke="var(--primary-accent)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Primary crisp traveling sine wave */}
                  <path
                    className="audio-wave-path primary"
                    d="M -32,10 Q -24,4 -16,10 T 0,10 T 16,10 T 32,10 T 48,10 T 64,10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="straight"
                className="audio-straight-motion"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <svg 
                  className="audio-straight-svg" 
                  viewBox="0 0 32 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <line 
                    x1="6" 
                    y1="10" 
                    x2="26" 
                    y2="10" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    className="audio-straight-line"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
};

export default AudioToggle;
