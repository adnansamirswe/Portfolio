'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Enhanced3DCard = ({ children, className = '', glowIntensity = 'medium', ...props }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setMousePosition({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const glowClasses = {
    low: 'shadow-[0_0_15px_rgba(255,23,68,0.15)]',
    medium: 'shadow-[0_0_20px_rgba(255,23,68,0.2)]',
    high: 'shadow-[0_0_25px_rgba(255,23,68,0.25)]',
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-xl bg-black-secondary/90 backdrop-blur-xl
        border border-red-neon/20 transition-all duration-300 ease-out
        ${glowClasses[glowIntensity]} hover:shadow-[0_0_35px_rgba(255,23,68,0.3)]
        hover:border-red-neon/40 group cursor-pointer gpu-optimized
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px',
      }}
      animate={{
        rotateX: isHovered ? mousePosition.y * 8 : 0,
        rotateY: isHovered ? mousePosition.x * 8 : 0,
        scale: isHovered ? 1.03 : 1,
        z: isHovered ? 60 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 20,
        mass: 0.5,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Dynamic glow effect overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, 
                      rgba(255, 23, 68, 0.15) 0%, 
                      rgba(255, 23, 68, 0.08) 30%, 
                      transparent 60%)`,
        }}
      />
      
      {/* Content with proper z-index */}
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Enhanced reflection effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
      />
    </motion.div>
  );
};

export default Enhanced3DCard;
