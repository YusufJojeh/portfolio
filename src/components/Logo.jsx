'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const { theme } = useTheme();
  
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

  const svgSize = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64
  };

  // Theme-based colors
  const colors = theme === 'dark' 
    ? {
        color1: '#ffc107', // Gold
        color2: '#ffb300', // Darker gold
        color3: '#ffa000'  // Amber
      }
    : {
        color1: '#2196f3', // Blue
        color2: '#1e88e5', // Darker blue
        color3: '#1976d2'  // Deep blue
      };

  // Unique gradient ID for each logo instance to avoid conflicts
  const gradientId = `logoGradient-${size}-${theme}`;
  const filterId = `glow-${size}-${theme}`;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        width={svgSize[size]} 
        height={svgSize[size]}
        className={sizeClasses[size]}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.color1} stopOpacity="1" />
            <stop offset="50%" stopColor={colors.color2} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.color3} stopOpacity="1" />
          </linearGradient>
          <radialGradient id={`${gradientId}-radial`} cx="50%" cy="50%">
            <stop offset="0%" stopColor={colors.color1} stopOpacity="0.18" />
            <stop offset="100%" stopColor={colors.color3} stopOpacity="0.04" />
          </radialGradient>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background - Subtle Elegant Glow */}
        <circle cx="50" cy="50" r="45" fill={`url(#${gradientId}-radial)`}/>
        <circle cx="50" cy="50" r="43" fill="none" stroke={`url(#${gradientId})`} strokeWidth="0.5" opacity="0.08"/>
        
        {/* Premium YJ Monogram - Special Design */}
        <g filter={`url(#${filterId})`}>
          {/* Y Letter - Bold & Elegant */}
          <path d="M30 25 L38 38 L38 65 L44 65 L44 38 L52 25 L46 25 L41 32 L36 25 Z" 
                fill={`url(#${gradientId})`}/>
          
          {/* J Letter - Bold & Elegant with Perfect Hook */}
          <path d="M58 25 L72 25 L72 60 Q72 68 62 68 L58 68 Q54 68 54 64 L54 60 L60 60 L60 64 Q60 64 60 64 L60 60 L58 60 Q54 60 54 56 L54 25 Z" 
                fill={`url(#${gradientId})`}/>
          {/* J Hook - Simple Elegant Curve */}
          <path d="M54 60 Q54 65 59 65 L63 65 Q68 65 68 60 L68 55 Q68 50 63 50 L59 50 Q54 50 54 55 L54 60 Z" 
                fill={`url(#${gradientId})`}/>
        </g>
        
        {/* Premium Accent Elements */}
        <circle cx="33" cy="30" r="2.5" fill={colors.color1} opacity="0.8" filter={`url(#${filterId})`}/>
        <circle cx="67" cy="30" r="2.5" fill={colors.color3} opacity="0.8" filter={`url(#${filterId})`}/>
        
        {/* Center Special Element - Unique Touch */}
        <circle cx="50" cy="50" r="3.5" fill={`url(#${gradientId})`} opacity="0.5" filter={`url(#${filterId})`}/>
      </svg>
      {showText && (
        <span className={`font-bold gradient-text ${textSizes[size]}`}>
          Yusuf Jojeh
        </span>
      )}
    </motion.div>
  );
};

export default Logo; 