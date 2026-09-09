import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const AudioContext = createContext(null);

const TARGET_VOLUME = 0.70;

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isUserPausedRef = useRef(false);

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isUserPausedRef.current = false;
    audio.volume = TARGET_VOLUME;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback deferred until user interaction:', err);
        });
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    isUserPausedRef.current = true;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // Single-click toggle: always sync with actual audio playback state
  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [playAudio, pauseAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = TARGET_VOLUME;
    audio.muted = false;

    // 1. Attempt direct unmuted playback on initial website entry
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        setIsPlaying(true);
        removeGlobalListeners();
      }).catch(() => {
        // Browser requires first user activation before audio output is permitted
        setIsPlaying(true);
      });
    }

    // 2. Global activation: ANY click, tap, or key anywhere on the website unlocks sound
    const handleGlobalActivation = (e) => {
      if (isUserPausedRef.current) return;
      // If user clicked the toggle button directly, toggleAudio handles it
      if (e && e.target && e.target.closest && e.target.closest('.audio-toggle-btn')) {
        return;
      }

      if (audio) {
        audio.muted = false;
        audio.volume = TARGET_VOLUME;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              removeGlobalListeners();
            })
            .catch(() => {});
        }
      }
    };

    const removeGlobalListeners = () => {
      window.removeEventListener('pointerdown', handleGlobalActivation, { capture: true });
      window.removeEventListener('click', handleGlobalActivation, { capture: true });
      window.removeEventListener('touchstart', handleGlobalActivation, { capture: true });
      window.removeEventListener('keydown', handleGlobalActivation, { capture: true });
      document.removeEventListener('pointerdown', handleGlobalActivation, { capture: true });
      document.removeEventListener('click', handleGlobalActivation, { capture: true });
    };

    window.addEventListener('pointerdown', handleGlobalActivation, { capture: true, passive: true });
    window.addEventListener('click', handleGlobalActivation, { capture: true, passive: true });
    window.addEventListener('touchstart', handleGlobalActivation, { capture: true, passive: true });
    window.addEventListener('keydown', handleGlobalActivation, { capture: true, passive: true });
    document.addEventListener('pointerdown', handleGlobalActivation, { capture: true, passive: true });
    document.addEventListener('click', handleGlobalActivation, { capture: true, passive: true });

    return () => {
      removeGlobalListeners();
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        toggleAudio,
        playAudio,
        pauseAudio
      }}
    >
      <audio
        ref={audioRef}
        src="/audio/metabole-ambient.mp3"
        loop
        autoPlay
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          if (isUserPausedRef.current) {
            setIsPlaying(false);
          }
        }}
      />
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
