import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Certificates from './components/Certificates/Certificates';
import Contact from './components/Contact/Contact';
import WhatsAppButton from './components/ui/WhatsAppButton';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  const [glowVisible, setGlowVisible] = useState(false);

  // Initialize standard scroll reveal observer
  useScrollReveal();

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      if (!glowVisible) setGlowVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [glowVisible]);

  return (
    <div className="app-layout">
      {/* Premium background grain overlay */}
      <div className="grain" />

      {/* Premium Spotlight cursor glow background */}
      <div className={`global-mouse-glow ${glowVisible ? 'visible' : ''}`} />

      <Navbar />
      
      <main>
        {/* All sections rendered in order on a single page */}
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>

      <footer className="footer glass-panel">
        <div className="container footer-container">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Sakib Al Mahamud. Built with React & Vite.
          </p>
          <div className="footer-links">
            <a href="#home" className="footer-link">Home</a>
            <a href="#about" className="footer-link">About</a>
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#certificates" className="footer-link">Certificates</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp chat widget */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
