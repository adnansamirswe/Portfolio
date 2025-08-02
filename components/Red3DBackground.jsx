'use client';
import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const Red3DBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  const initParticles = useCallback((canvas) => {
    const particles = [];
    const particleCount = 80; // Reduced for better performance

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 800 + 200,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: Math.random() * 1.5 + 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    return particles;
  }, []);

  const animate = useCallback((canvas, ctx, particles) => {
    // Optimized clear with fade effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const time = Date.now() * 0.001;

    particles.forEach((particle, index) => {
      // Update particle position with smoother movement
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z -= particle.vz;
      particle.pulse += 0.02;

      // Reset particle with better distribution
      if (particle.z <= 0 || particle.x < -50 || particle.x > canvas.width + 50 || 
          particle.y < -50 || particle.y > canvas.height + 50) {
        particle.x = Math.random() * (canvas.width + 100) - 50;
        particle.y = Math.random() * (canvas.height + 100) - 50;
        particle.z = 800 + Math.random() * 200;
      }

      // Enhanced 3D projection
      const scale = 800 / (800 + particle.z);
      const x2d = particle.x * scale + canvas.width / 2 * (1 - scale);
      const y2d = particle.y * scale + canvas.height / 2 * (1 - scale);
      const size2d = particle.size * scale;

      // Pulsing opacity effect
      const pulseOpacity = particle.opacity * (0.7 + 0.3 * Math.sin(particle.pulse));

      // Enhanced gradient with better colors
      const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size2d * 4);
      gradient.addColorStop(0, `rgba(255, 23, 68, ${pulseOpacity * scale})`);
      gradient.addColorStop(0.3, `rgba(255, 69, 105, ${pulseOpacity * scale * 0.7})`);
      gradient.addColorStop(0.7, `rgba(255, 0, 0, ${pulseOpacity * scale * 0.3})`);
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x2d, y2d, size2d * 4, 0, Math.PI * 2);
      ctx.fill();

      // Optimized connection lines (reduced frequency)
      if (index % 3 === 0) { // Only check every 3rd particle
        particles.slice(index + 1, index + 5).forEach((other) => { // Limit connections
          const otherScale = 800 / (800 + other.z);
          const otherX2d = other.x * otherScale + canvas.width / 2 * (1 - otherScale);
          const otherY2d = other.y * otherScale + canvas.height / 2 * (1 - otherScale);
          
          const distance = Math.sqrt(
            Math.pow(x2d - otherX2d, 2) + Math.pow(y2d - otherY2d, 2)
          );

          if (distance < 120 && particle.z < 400 && other.z < 400) {
            const lineOpacity = (1 - distance / 120) * 0.25 * scale * otherScale;
            ctx.strokeStyle = `rgba(255, 23, 68, ${lineOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(otherX2d, otherY2d);
            ctx.stroke();
          }
        });
      }
    });

    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx, particles));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Enable hardware acceleration
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    particlesRef.current = initParticles(canvas);
    animate(canvas, ctx, particlesRef.current);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      
      {/* Optimized floating 3D cubes */}
      <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border border-red-neon/20 gpu-optimized"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              transform: 'rotateX(45deg) rotateY(45deg)',
            }}
            animate={{
              rotateX: [45, 135, 225, 315, 45],
              rotateY: [45, 135, 225, 315, 45],
              y: [-15, 15, -15],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-red-neon/15 to-transparent backdrop-blur-sm rounded-sm" />
          </motion.div>
        ))}
      </div>

      {/* Optimized matrix grid overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-1 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 79px, rgba(255, 23, 68, 0.02) 81px, transparent 82px),
            linear-gradient(rgba(255, 23, 68, 0.02) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '81px 81px',
        }}
      />
      
      {/* Enhanced red gradient overlay */}
      <div className="fixed inset-0 bg-gradient-radial from-red-primary/3 via-transparent to-transparent pointer-events-none z-1" />
    </>
  );
};

export default Red3DBackground;
