'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const RedNeonButton = ({ children, variant = 'primary', size = 'md', className = '', onClick, disabled, ...props }) => {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: 'bg-red-primary hover:bg-red-neon text-white font-bold',
    secondary: 'bg-transparent border-2 border-red-neon text-red-neon hover:bg-red-neon hover:text-white font-bold',
    ghost: 'bg-transparent text-red-neon hover:bg-red-neon/20 font-bold border border-red-neon/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-xl font-bold
        transition-all duration-500 ease-out gpu-optimized
        transform-gpu perspective-1000
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={!disabled ? { 
        scale: 1.05, 
        rotateX: 3,
        y: -3,
        boxShadow: '0 25px 50px rgba(255, 23, 68, 0.4), 0 0 80px rgba(255, 23, 68, 0.3)'
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.98,
        rotateX: -2,
        y: 1
      } : {}}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {/* Enhanced animated background - only for primary variant */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #ff1744, #ff0000, #cc0000, #ff1744)',
            backgroundSize: '300% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      
      {/* Enhanced glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(255, 23, 68, 0.6) 0%, rgba(255, 23, 68, 0.2) 50%, transparent 70%)',
          filter: 'blur(10px)',
        }}
        animate={{
          opacity: isPressed ? 0.7 : 0,
          scale: isPressed ? 1.1 : 1,
        }}
        transition={{
          duration: 0.3,
        }}
      />
      
      {/* Enhanced shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(45deg, transparent 20%, rgba(255, 255, 255, 0.2) 50%, transparent 80%)',
          transform: 'translateX(-100%) skewX(-15deg)',
        }}
        animate={{
          transform: isPressed 
            ? 'translateX(100%) skewX(-15deg)' 
            : 'translateX(-100%) skewX(-15deg)',
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      />
      
      {/* Content with better visibility */}
      <span className="relative z-20 block font-bold tracking-wide drop-shadow-lg">
        {children}
      </span>
      
      {/* Particle effect on click */}
      {isPressed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-red-neon rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 50,
                y: Math.sin((i * Math.PI * 2) / 8) * 50,
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};

export default RedNeonButton;
