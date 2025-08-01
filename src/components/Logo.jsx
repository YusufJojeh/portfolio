import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <img 
        src="/logo.svg" 
        alt="YJ Logo" 
        className={sizeClasses[size]}
        loading="eager"
      />
      {showText && (
        <span className={`font-bold gradient-text ${textSizes[size]}`}>
          Yusuf Jojeh
        </span>
      )}
    </motion.div>
  );
};

export default Logo; 