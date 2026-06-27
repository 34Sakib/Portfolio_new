import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Terminal } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ROLES = [
  "Full Stack Developer",
  "Laravel & React.js",
  "PHP Specialist",
  "Problem Solver"
];

export const Hero = () => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  
  // Typewriter states
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typewriter effect logic
  useEffect(() => {
    let timer;
    const currentFullText = ROLES[roleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText((prev) => currentFullText.substring(0, prev.length + 1));
        setTypingSpeed(100);

        if (displayText === currentFullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setDisplayText((prev) => currentFullText.substring(0, prev.length - 1));
        setTypingSpeed(50);

        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  // Particle background engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 120 };

    const getThemeColors = () => {
      if (theme === 'dark') {
        return {
          particleColor: 'rgba(108, 99, 255, 0.45)',
          linkColor: 'rgba(0, 217, 255, 0.08)',
          mouseLinkColor: 'rgba(0, 217, 255, 0.25)'
        };
      } else {
        return {
          particleColor: 'rgba(91, 82, 224, 0.3)',
          linkColor: 'rgba(0, 180, 212, 0.06)',
          mouseLinkColor: 'rgba(0, 180, 212, 0.15)'
        };
      }
    };

    let colors = getThemeColors();

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 15;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }

      draw() {
        ctx.fillStyle = colors.particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            this.x -= directionX * force * 3;
            this.y -= directionY * force * 3;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 11000), 100);
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const drawLines = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.hypot(dx, dy);

          if (distance < 110) {
            ctx.strokeStyle = colors.linkColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          let dx = particles[a].x - mouse.x;
          let dy = particles[a].y - mouse.y;
          let distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            ctx.strokeStyle = colors.mouseLinkColor;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [theme]);

  return (
    <section id="home" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas"></canvas>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse"></span>
            Available for new opportunities
          </div>
          
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Sakib Al Mahamud</span>
          </h1>
          
          <h2 className="hero-subtitle">
            I am a <span className="typewriter">{displayText}</span><span className="cursor">|</span>
          </h2>
          
          <p className="hero-desc">
            Full Stack Developer with 1.5+ years of professional experience building scalable web applications using PHP, Laravel, and React.js. Focused on responsive UIs, secure RESTful APIs, and clean code structures.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View Work <ChevronRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let's Talk
            </a>
          </div>
        </div>

        {/* Interactive Terminal Panel Mockup */}
        <div className="hero-terminal glass-panel">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="terminal-title">
              <Terminal size={14} /> guest@sakib: ~
            </div>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="prompt">guest@sakib:~$</span> <span className="cmd">whoami</span>
            </div>
            <div className="terminal-output">
              Full Stack Developer specializing in Laravel and React.js ecosystems. Experienced in delivering complete full-stack web applications with responsive user interfaces and modern backend routing.
            </div>
            <div className="terminal-line">
              <span className="prompt">guest@sakib:~$</span> <span className="cmd">cat skills.json</span>
            </div>
            <div className="terminal-output json">
              {"{"}
              <br />
              &nbsp;&nbsp;<span className="key">"frontend"</span>: [<span className="val">"React.js"</span>, <span className="val">"JavaScript"</span>, <span className="val">"HTML5"</span>, <span className="val">"CSS3"</span>, <span className="val">"Bootstrap"</span>],
              <br />
              &nbsp;&nbsp;<span className="key">"backend"</span>: [<span className="val">"Laravel"</span>, <span className="val">"PHP"</span>, <span className="val">"REST APIs"</span>],
              <br />
              &nbsp;&nbsp;<span className="key">"database"</span>: [<span className="val">"MySQL"</span>]
              <br />
              {"}"}
            </div>
            <div className="terminal-line">
              <span className="prompt">guest@sakib:~$</span> <span className="cursor-active">_</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
