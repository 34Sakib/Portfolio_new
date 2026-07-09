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
  const { theme, toggleTheme } = useTheme();
  const canvasRef = useRef(null);
  const terminalBodyRef = useRef(null);
  
  // Typewriter states
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Terminal states
  const [history, setHistory] = useState([
    { type: 'input', text: 'whoami' },
    { type: 'output', text: 'Full Stack Developer specializing in Laravel and React.js ecosystems. Focused on responsive UIs, secure RESTful APIs, and clean code structures.' },
    { type: 'input', text: 'cat skills.json' },
    { type: 'output', text: `{
  "frontend": ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
  "backend": ["Laravel", "PHP", "REST APIs"],
  "database": ["MySQL"]
}`, isJson: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAutoTyping, setIsAutoTyping] = useState(false);

  // Auto-scroll terminal body
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Navigate to section
  const navigateToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navbarHeight = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Command execution
  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : '';

    // Create custom history array locally to resolve race conditions
    let updatedHistory = [...history, { type: 'input', text: trimmed }];

    const addOutput = (text, isJson = false) => {
      updatedHistory.push({ type: 'output', text, isJson });
    };

    switch (command) {
      case 'help':
        addOutput(`Available commands:
  cd [section]   Navigate to section (e.g. cd projects, cd contact)
  ls / dir       List mock directories & files
  cat [file]     Print file contents (e.g. cat bio.txt, cat skills.json)
  whoami         Display short bio description
  theme          Toggle light/dark theme modes
  clear          Clear the terminal logs`);
        break;

      case 'ls':
      case 'dir':
        addOutput(`about/        projects/     skills/       experience/
education/    certificates/ contact/      bio.txt
skills.json   contact.json`);
        break;

      case 'clear':
        setHistory([]);
        setInputValue('');
        return;

      case 'whoami':
        addOutput('Full Stack Developer specializing in Laravel and React.js. Focused on responsive UIs, secure RESTful APIs, and clean code structures.');
        break;

      case 'theme':
        toggleTheme();
        addOutput(`Theme toggled dynamically.`);
        break;

      case 'cat':
        if (!arg) {
          addOutput('Usage: cat [filename]. Type "ls" to view mock files.');
        } else if (arg === 'skills.json' || arg === 'skills' || arg === 'skills/') {
          addOutput(`{
  "frontend": ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
  "backend": ["Laravel", "PHP", "REST APIs"],
  "database": ["MySQL"]
}`, true);
        } else if (arg === 'bio.txt' || arg === 'about' || arg === 'about/') {
          addOutput('Full Stack Developer specializing in Laravel and React.js ecosystems. Experienced in delivering complete full-stack web applications with responsive user interfaces and modern backend routing.');
        } else if (arg === 'contact.json' || arg === 'contact' || arg === 'contact/') {
          addOutput(`{
  "email": "sakibalmahamud@gmail.com",
  "github": "github.com/34Sakib",
  "linkedin": "linkedin.com/in/sakibalmahamud"
}`, true);
        } else {
          addOutput(`cat: ${parts[1]}: No such file or directory`);
        }
        break;

      case 'cd':
        if (!arg || arg === 'home' || arg === 'home/') {
          addOutput('Navigating to Home...');
          navigateToSection('home');
        } else {
          const target = arg.replace('/', '');
          const validSections = ['about', 'skills', 'experience', 'projects', 'education', 'certificates', 'contact'];
          if (validSections.includes(target)) {
            addOutput(`Navigating to ${target.charAt(0).toUpperCase() + target.slice(1)}...`);
            navigateToSection(target);
          } else if (target === '..') {
            addOutput('Navigating to Home...');
            navigateToSection('home');
          } else {
            addOutput(`cd: ${parts[1]}: No such directory`);
          }
        }
        break;

      default:
        addOutput(`shell: command not found: ${command}. Type "help" for a list of commands.`);
    }

    setHistory(updatedHistory);
    setInputValue('');
  };

  // Run guided navigation tour
  const runTour = () => {
    if (isAutoTyping) return;
    setIsAutoTyping(true);
    
    // Reset and initialize tour
    setHistory(prev => [...prev, { type: 'input', text: 'run-navigation-tour' }, { type: 'output', text: 'Starting automatic navigation demo...' }]);
    
    let step = 0;
    const tourSteps = [
      { cmd: 'cd about', delay: 1000 },
      { cmd: 'cd projects', delay: 3000 },
      { cmd: 'cd contact', delay: 3000 },
      { cmd: 'cd home', delay: 3000 }
    ];

    const runStep = () => {
      if (step >= tourSteps.length) {
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'output', text: 'Navigation tour complete! Click on any pill or type commands to explore.' }]);
          setIsAutoTyping(false);
        }, 1000);
        return;
      }

      const { cmd, delay } = tourSteps[step];
      setTimeout(() => {
        let currentText = '';
        let charIndex = 0;
        
        const typeInterval = setInterval(() => {
          if (charIndex < cmd.length) {
            currentText += cmd[charIndex];
            setInputValue(currentText);
            charIndex++;
          } else {
            clearInterval(typeInterval);
            // Execute it
            executeCommand(cmd);
            step++;
            runStep();
          }
        }, 80);
      }, delay);
    };

    runStep();
  };

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

  // Developer syntax background animation engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let tokens = [];
    const mouse = { x: null, y: null, radius: 150 };

    const getThemeColors = () => {
      const style = getComputedStyle(document.documentElement);
      const primary = style.getPropertyValue('--primary-accent').trim() || (theme === 'dark' ? '#6C63FF' : '#5b52e0');
      const secondary = style.getPropertyValue('--secondary-accent').trim() || (theme === 'dark' ? '#00D9FF' : '#00b4d4');
      const muted = style.getPropertyValue('--text-muted').trim() || '#64748B';
      
      const hexToRgb = (hex) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 100, g: 116, b: 139 };
      };

      const mutedRgb = hexToRgb(muted);

      return {
        primaryAccent: primary,
        secondaryAccent: secondary,
        mutedColor: `rgb(${mutedRgb.r}, ${mutedRgb.g}, ${mutedRgb.b})`,
        mutedColorWithAlpha: (alpha) => `rgba(${mutedRgb.r}, ${mutedRgb.g}, ${mutedRgb.b}, ${alpha})`,
        lineColor: theme === 'dark' ? 'rgba(0, 217, 255, 0.08)' : 'rgba(91, 82, 224, 0.06)',
      };
    };

    let colors = getThemeColors();

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initTokens();
    };

    const DEV_TOKENS = [
      'const', 'let', 'function', 'return', 'class', 'import', 'export',
      'useState', 'useEffect', 'useRef', 'React', 'Laravel', 'PHP', 'MySQL',
      'api', 'Route::get', 'echo', '$this', 'SELECT', 'FROM', 'where',
      '{}', '[]', '< />', '=>', '&&', '||', ';', '===', 'npm', 'composer',
      '<div>', 'style', 'config', 'db', 'app', 'git commit', 'git push'
    ];

    class Token {
      constructor(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;
        
        // Depth (parallax effect)
        this.depth = Math.random(); // 0 to 1
        
        // Deeper elements are smaller, move slower, and are fainter
        this.size = Math.floor(11 + this.depth * 8); // 11px to 19px
        this.vx = (Math.random() - 0.5) * (0.15 + this.depth * 0.35);
        this.vy = (Math.random() - 0.5) * (0.15 + this.depth * 0.35);
        
        // Rotation
        this.angle = (Math.random() - 0.5) * 0.4; // Subtle initial tilt
        this.rotationSpeed = (Math.random() - 0.5) * 0.003; // Slow rotations
        
        this.baseOpacity = 0.12 + this.depth * 0.23; // 0.12 to 0.35
        this.opacity = this.baseOpacity;
        this.color = colors.mutedColor;
        this.isHighlighted = false;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.font = `${this.size}px var(--font-mono), monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (this.isHighlighted) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = this.color;
          ctx.fillStyle = this.color;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = colors.mutedColorWithAlpha(this.opacity);
        }
        
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotationSpeed;

        // Wrap around margins with smooth offset transition
        const margin = 50;
        if (this.x < -margin) this.x = canvas.width + margin;
        if (this.x > canvas.width + margin) this.x = -margin;
        if (this.y < -margin) this.y = canvas.height + margin;
        if (this.y > canvas.height + margin) this.y = -margin;

        // Mouse proximity calculation
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const proximity = (mouse.radius - distance) / mouse.radius; // 0 (edge) to 1 (center)
            this.isHighlighted = true;
            
            // Choose color depending on token structure
            this.color = (this.text.charCodeAt(0) % 2 === 0) ? colors.primaryAccent : colors.secondaryAccent;
            this.opacity = this.baseOpacity + (0.9 - this.baseOpacity) * proximity;
            
            // Gentle magnetic attraction
            const force = proximity * 0.4;
            this.x += (dx / distance) * force;
            this.y += (dy / distance) * force;
          } else {
            this.isHighlighted = false;
            this.opacity = this.baseOpacity;
          }
        } else {
          this.isHighlighted = false;
          this.opacity = this.baseOpacity;
        }
      }
    }

    const initTokens = () => {
      tokens = [];
      const densityArea = 22000; // Adjust for density
      const maxCount = 45;
      const count = Math.min(Math.floor((canvas.width * canvas.height) / densityArea), maxCount);
      
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const text = DEV_TOKENS[i % DEV_TOKENS.length];
        tokens.push(new Token(text, x, y));
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < tokens.length; i++) {
        for (let j = i + 1; j < tokens.length; j++) {
          const dx = tokens[i].x - tokens[j].x;
          const dy = tokens[i].y - tokens[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.1;
            
            if (tokens[i].isHighlighted || tokens[j].isHighlighted) {
              const highlightOpacity = (120 - distance) / 120 * 0.25;
              ctx.strokeStyle = tokens[i].isHighlighted ? tokens[i].color : tokens[j].color;
              ctx.globalAlpha = highlightOpacity;
              ctx.lineWidth = 0.8;
              ctx.setLineDash([2, 3]);
            } else {
              ctx.strokeStyle = colors.lineColor;
              ctx.globalAlpha = opacity;
              ctx.lineWidth = 0.5;
              ctx.setLineDash([1, 5]);
            }

            ctx.beginPath();
            ctx.moveTo(tokens[i].x, tokens[i].y);
            ctx.lineTo(tokens[j].x, tokens[j].y);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1.0;
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      tokens.forEach(t => {
        t.update();
        t.draw();
      });
      
      drawConnections();
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
    
    colors = getThemeColors();
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

        {/* Interactive Terminal Panel */}
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
          <div className="terminal-body" ref={terminalBodyRef} style={{ maxHeight: '280px', overflowY: 'auto' }}>
            {history.map((line, idx) => (
              <div key={idx} style={{ marginBottom: '0.5rem' }}>
                {line.type === 'input' ? (
                  <div className="terminal-line">
                    <span className="prompt">guest@sakib:~$</span> <span className="cmd">{line.text}</span>
                  </div>
                ) : (
                  <div className={line.isJson ? "terminal-output json" : "terminal-output"}>
                    {line.isJson ? (
                      <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{line.text}</pre>
                    ) : (
                      line.text.split('\n').map((l, i) => (
                        <div key={i}>{l}</div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {/* Input prompt line */}
            <form onSubmit={(e) => { e.preventDefault(); executeCommand(inputValue); }} className="terminal-line terminal-input-form">
              <span className="prompt">guest@sakib:~$</span>
              <input
                type="text"
                className="terminal-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isAutoTyping}
                placeholder={isAutoTyping ? "Running tour..." : "type 'help' or 'cd projects'..."}
                aria-label="Terminal input"
              />
              {!inputValue && <span className="cursor-active">_</span>}
            </form>
          </div>

          {/* Quick Action Navigation Pills */}
          <div className="terminal-quick-pills">
            <span className="pill-label">Quick Nav:</span>
            <button className="terminal-pill" onClick={() => executeCommand('cd about')} disabled={isAutoTyping}>cd about</button>
            <button className="terminal-pill" onClick={() => executeCommand('cd projects')} disabled={isAutoTyping}>cd projects</button>
            <button className="terminal-pill" onClick={() => executeCommand('cd contact')} disabled={isAutoTyping}>cd contact</button>
            <button className="terminal-pill" onClick={() => executeCommand('theme')} disabled={isAutoTyping}>theme</button>
            <button className="terminal-pill" onClick={() => executeCommand('ls')} disabled={isAutoTyping}>ls</button>
            <button 
              className="terminal-pill tour-btn" 
              onClick={runTour} 
              disabled={isAutoTyping}
            >
              {isAutoTyping ? 'Running...' : 'Run Tour'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
