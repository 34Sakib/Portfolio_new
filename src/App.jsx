import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import AllProjects from './components/Projects/AllProjects';
import Education from './components/Education/Education';
import Certificates from './components/Certificates/Certificates';
import Contact from './components/Contact/Contact';
import WhatsAppButton from './components/ui/WhatsAppButton';
import { useScrollReveal } from './hooks/useScrollReveal';

const getInitialRoute = () => {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname;
  const hash = window.location.hash;
  if (path === '/projects' || path.endsWith('/projects') || hash === '#/projects' || hash === '#projects-all') {
    return '/projects';
  }
  return '/';
};

function App() {
  const [glowVisible, setGlowVisible] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);

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

  // Synchronize route with browser history (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/projects' || path.endsWith('/projects') || hash === '#/projects' || hash === '#projects-all') {
        setCurrentRoute('/projects');
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((path, targetSection = null) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);

    if (path === '/') {
      if (targetSection) {
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="app-layout">
      {/* Premium background grain overlay */}
      <div className="grain" />

      {/* Premium Spotlight cursor glow background */}
      <div className={`global-mouse-glow ${glowVisible ? 'visible' : ''}`} />

      <Navbar 
        currentRoute={currentRoute} 
        onNavigateHome={(sectionId) => navigateTo('/', sectionId)} 
      />

      <main>
        {currentRoute === '/projects' ? (
          /* Dedicated All Projects Page */
          <AllProjects onBack={() => navigateTo('/', 'projects')} />
        ) : (
          /* Standard Home Page: Strictly Top 4 Projects */
          <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects onNavigateToAll={() => navigateTo('/projects')} />
            <Education />
            <Certificates />
            <Contact />
          </>
        )}
      </main>

      <footer className="footer glass-panel">
        <div className="container footer-container">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Sakib Al Mahamud.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp chat widget */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
