import React from 'react';
import { 
  Atom, 
  Layers, 
  FileCode, 
  Code, 
  Cpu, 
  Flame, 
  Globe, 
  Database, 
  GitBranch, 
  Zap, 
  Laptop, 
  Server, 
  Wrench,
  Activity
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsData } from '../../data/skills';
import GlassCard from '../ui/GlassCard';

// Map technical skill icon names to actual Lucide-React icons
const getSkillIcon = (iconName) => {
  switch (iconName) {
    case 'React':
      return <Atom className="skill-icon-svg text-react" />;
    case 'Nextjs':
      return <Layers className="skill-icon-svg text-next" />;
    case 'TypeScript':
      return <FileCode className="skill-icon-svg text-ts" />;
    case 'JavaScript':
      return <Code className="skill-icon-svg text-js" />;
    case 'HtmlCss':
      return <Laptop className="skill-icon-svg text-html" />;
    case 'Tailwind':
      return <Layers className="skill-icon-svg text-tailwind" />;
    case 'Php':
      return <Cpu className="skill-icon-svg text-php" />;
    case 'Laravel':
      return <Flame className="skill-icon-svg text-laravel" />;
    case 'Nodejs':
      return <Activity className="skill-icon-svg text-node" />;
    case 'RestApi':
      return <Globe className="skill-icon-svg text-api" />;
    case 'Websocket':
      return <Globe className="skill-icon-svg text-socket" />;
    case 'Mysql':
    case 'Postgresql':
      return <Database className="skill-icon-svg text-db" />;
    case 'Git':
      return <GitBranch className="skill-icon-svg text-git" />;
    case 'Docker':
      return <Server className="skill-icon-svg text-docker" />;
    case 'Vite':
      return <Zap className="skill-icon-svg text-vite" />;
    default:
      return <Code className="skill-icon-svg" />;
  }
};

export const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Abilities</span>
          <h2 className="section-title">My <span className="title-bold">Skillset</span></h2>
        </div>

        <motion.div 
          className="skills-categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillsData.map((categoryGroup, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="skills-category-column"
            >
              <div className="category-header">
                {categoryGroup.category.toLowerCase().includes("frontend") ? (
                  <Laptop size={20} className="category-icon text-cyan" />
                ) : categoryGroup.category.toLowerCase().includes("backend") ? (
                  <Server size={20} className="category-icon text-purple" />
                ) : (
                  <Wrench size={20} className="category-icon text-orange" />
                )}
                <h3 className="category-title">{categoryGroup.category}</h3>
              </div>

              {/* Clean layout displaying only the icon and name, removing percentages */}
              <div className="skills-list">
                {categoryGroup.skills.map((skill, sIdx) => (
                  <GlassCard key={sIdx} className="skill-card">
                    <div className="skill-icon-box">
                      {getSkillIcon(skill.icon)}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
