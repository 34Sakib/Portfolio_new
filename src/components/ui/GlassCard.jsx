import React from 'react';

export const GlassCard = ({ children, className = '', onClick, ...props }) => {
  return (
    <div 
      className={`glass-panel ${className}`} 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
