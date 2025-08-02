'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function MouseTrail() {
  const [trails, setTrails] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Create new trail particles
      const newTrails = Array.from({ length: 3 }, (_, i) => ({
        id: trailId++,
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        delay: i * 0.05,
        size: Math.random() * 6 + 4,
        opacity: Math.random() * 0.8 + 0.2,
        type: Math.random() > 0.7 ? 'spark' : 'particle'
      }));

      setTrails(prev => [...prev, ...newTrails].slice(-50)); // Keep only last 50 particles
    };

    const handleMouseEnter = () => {
      document.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      setTrails([]);
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);

    // Clean up old trails
    const cleanupInterval = setInterval(() => {
      setTrails(prev => prev.slice(-30));
    }, 2000);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Main cursor glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 23, 68, 0.4) 0%, rgba(255, 23, 68, 0.1) 50%, transparent 100%)',
          filter: 'blur(8px)',
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          duration: 0.1
        }}
      />

      {/* Trail particles */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: trail.size,
              height: trail.size,
              background: trail.type === 'spark' 
                ? 'linear-gradient(45deg, #ff1744, #ff6b9d, #ff1744)'
                : 'radial-gradient(circle, #ff1744 0%, #cc1235 50%, transparent 100%)',
              boxShadow: trail.type === 'spark' 
                ? '0 0 15px #ff1744, 0 0 30px #ff1744'
                : '0 0 10px rgba(255, 23, 68, 0.6)',
            }}
            initial={{
              x: trail.x - trail.size / 2,
              y: trail.y - trail.size / 2,
              opacity: trail.opacity,
              scale: 1,
            }}
            animate={{
              x: trail.x - trail.size / 2 + (Math.random() - 0.5) * 100,
              y: trail.y - trail.size / 2 + (Math.random() - 0.5) * 100,
              opacity: 0,
              scale: trail.type === 'spark' ? 0.2 : 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: trail.type === 'spark' ? 1.5 : 2,
              delay: trail.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Cyberpunk scan lines effect near cursor */}
      <motion.div
        className="absolute w-32 h-32 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, transparent 48%, rgba(255, 23, 68, 0.1) 49%, rgba(255, 23, 68, 0.2) 50%, rgba(255, 23, 68, 0.1) 51%, transparent 52%),
            linear-gradient(0deg, transparent 48%, rgba(255, 23, 68, 0.1) 49%, rgba(255, 23, 68, 0.2) 50%, rgba(255, 23, 68, 0.1) 51%, transparent 52%)
          `,
          borderRadius: '50%',
          filter: 'blur(1px)',
        }}
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          rotate: [0, 360],
        }}
        transition={{
          x: { type: "spring", damping: 20, stiffness: 100 },
          y: { type: "spring", damping: 20, stiffness: 100 },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
      />

      {/* Digital glitch effect */}
      <motion.div
        className="absolute w-2 h-16 pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(0deg, transparent, #ff1744, transparent)',
          filter: 'blur(2px)',
        }}
        animate={{
          x: mousePosition.x + Math.sin(Date.now() * 0.01) * 50,
          y: mousePosition.y - 32,
          opacity: [0.3, 0.7, 0.3],
          scaleX: [1, 1.5, 1],
        }}
        transition={{
          x: { type: "spring", damping: 25, stiffness: 120 },
          y: { type: "spring", damping: 25, stiffness: 120 },
          opacity: { duration: 0.5, repeat: Infinity },
          scaleX: { duration: 0.3, repeat: Infinity }
        }}
      />
    </div>
  );
}
