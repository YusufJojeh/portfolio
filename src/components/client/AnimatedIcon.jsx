'use client';

import React from 'react';
import { motion } from 'framer-motion';

// SVG Animated Icons Component
const AnimatedIcon = ({ name, size = 24, className = '' }) => {
  const icons = {
    brain: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="12"
          cy="9"
          r="2"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </svg>
    ),

    code: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          d="M8 18L2 12L8 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
        />
        <motion.path
          d="M16 6L22 12L16 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ x: 5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
        />
      </svg>
    ),

    rocket: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: [5, 0, -2, 0], opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        />
      </svg>
    ),

    sparkles: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${8 + i * 4} ${8 + i * 2}L${10 + i * 4} ${10 + i * 2}L${8 + i * 4} ${12 + i * 2}L${6 + i * 4} ${10 + i * 2}Z`}
            fill="currentColor"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </svg>
    ),

    zap: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </svg>
    ),

    workflow: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <motion.circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.line x1="6" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.line x1="18" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
    ),

    messageSquare: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={8 + i * 4}
            cy="10"
            r="1"
            fill="currentColor"
            animate={{ y: [-1, 1, -1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
    ),

    database: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <motion.ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2"
          animate={{ scaleX: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path d="M21 5V19C21 20.66 16.97 22 12 22C7.03 22 3 20.66 3 19V5"
          stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.path d="M21 12C21 13.66 16.97 15 12 15C7.03 15 3 13.66 3 12"
          stroke="currentColor" strokeWidth="2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    ),

    server: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <motion.rect x="3" y="4" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.rect x="3" y="12" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2"
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle cx="7" cy="8" r="1" fill="currentColor"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.circle cx="7" cy="16" r="1" fill="currentColor"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
    ),

    cloud: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <motion.path
          d="M18 10H16.74C16.38 8.28 15.11 6.91 13.46 6.38C13.17 5.05 12.02 4 10.5 4C8.57 4 7 5.57 7 7.5C7 7.64 7.01 7.78 7.02 7.91C5.29 8.35 4 9.99 4 12C4 14.21 5.79 16 8 16H18C19.66 16 21 14.66 21 13C21 11.34 19.66 10 18 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [-2, 2, -2], scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>
    )
  };

  return icons[name] || null;
};

export default AnimatedIcon;
