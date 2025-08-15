'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function MouseTrail() {
  const [trails, setTrails] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Performance detection - disable on low-end devices
    const isMobile = window.innerWidth < 768;
    const isLowEnd = window.devicePixelRatio < 2 || navigator.hardwareConcurrency < 4;
    
    if (isMobile || isLowEnd) {
      setIsEnabled(false);
      return;
    }

    let trailId = 0;
    let lastTrailTime = 0;
    const throttleDelay = 50; // Limit to ~20fps for trail creation

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTrailTime < throttleDelay) return;
      lastTrailTime = now;

      setMousePosition({ x: e.clientX, y: e.clientY });

      // Reduce particle count and complexity for performance
      const particleCount = Math.random() > 0.5 ? 2 : 1; // Random 1-2 particles instead of 3
      const newTrails = Array.from({ length: particleCount }, (_, i) => ({
        id: trailId++,
        x: e.clientX + (Math.random() - 0.5) * 15, // Reduced spread
        y: e.clientY + (Math.random() - 0.5) * 15,
        delay: i * 0.03, // Reduced delay
        size: Math.random() * 4 + 3, // Smaller particles
        opacity: Math.random() * 0.6 + 0.3,
        type: Math.random() > 0.8 ? 'spark' : 'particle' // Fewer sparks
      }));

      setTrails(prev => [...prev, ...newTrails].slice(-30)); // Keep fewer particles
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

    // Clean up old trails less frequently for performance
    const cleanupInterval = setInterval(() => {
      setTrails(prev => prev.slice(-20));
    }, 3000);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  // Early return if disabled for performance
  if (!isEnabled) {
    return null;
  }

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
