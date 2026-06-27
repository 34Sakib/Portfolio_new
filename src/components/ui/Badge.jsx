import React from 'react';

export const Badge = ({ children, className = '', ...props }) => {
  return (
    <span className={`badge ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
