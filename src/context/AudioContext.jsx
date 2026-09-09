import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const AudioContext = createContext(null);

const TARGET_VOLUME = 0.70; // Increased volume for rich, clear ambient sound
const FADE_IN_DURATION = 600; // ms
const FADE_OUT_DURATION = 400; // ms

export const AudioProvider = ({ children }) => {
  // Starts active by default so animation and playback run on page entry
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const isUserPausedRef = useRef(false);

  // Smooth volume fading utility
  const fadeVolume = useCallback((targetVol, duration, onComplete) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const audio = audioRef.current;
    const startVol = audio.volume;
    const delta = targetVol - startVol;
    const stepTime = 20;
    const steps = Math.max(1, Math.floor(duration / stepTime));
    const stepDelta = delta / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVol = Math.min(1, Math.max(0, startVol + stepDelta * currentStep));
      audio.volume = newVol;

      if (currentStep >= steps) {
        audio.volume = targetVol;
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        if (onComplete) onComplete();
      }
    }, stepTime);
  }, []);

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    isUserPausedRef.current = false;
    setIsPlaying(true);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
        })
        .catch(() => {
          // If browser policy blocks unprompted autoplay, keep isPlaying true
          // so the animation shows, and unlock audio on the very first gesture
        });
    }
  }, [fadeVolume]);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    isUserPausedRef.current = true;

    fadeVolume(0, FADE_OUT_DURATION, () => {
      audio.pause();
      setIsPlaying(false);
    });
  }, [fadeVolume]);

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, playAudio, pauseAudio]);

  // Initialize audio element and handle auto-play on entry
  useEffect(() => {
    const audio = new Audio('/audio/metabole-ambient.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    // 1. Attempt immediate autoplay when page loads
    const initialPromise = audio.play();
    if (initialPromise !== undefined) {
      initialPromise
        .then(() => {
          fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
        })
        .catch(() => {
          // Autoplay blocked by browser policy until interaction
        });
    }

    // 2. Unlock audio immediately on the first user interaction (scroll, click, touch, key)
    const handleFirstInteraction = () => {
      if (!isUserPausedRef.current && audioRef.current) {
        const p = audioRef.current.play();
        if (p !== undefined) {
          p.then(() => {
            fadeVolume(TARGET_VOLUME, FADE_IN_DURATION);
          }).catch(() => {});
        }
      }
      removeInteractionListeners();
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('wheel', handleFirstInteraction, { passive: true, once: true });

    return () => {
      removeInteractionListeners();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, [fadeVolume]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        toggleAudio,
        playAudio,
        pauseAudio
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export default AudioContext;
