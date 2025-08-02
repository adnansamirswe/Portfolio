'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Code, Zap, Terminal, Cpu } from 'lucide-react';

export default function LoadingScreen({ onLoadingComplete }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showLogo, setShowLogo] = useState(false);

  const loadingTexts = [
    'INITIALIZING SYSTEMS...',
    'LOADING COMPONENTS...',
    'COMPILING TYPESCRIPT...',
    'OPTIMIZING PERFORMANCE...',
    'DEPLOYING MAGIC...',
    'READY TO DOMINATE!'
  ];

  const codeSnippets = [
    'const developer = "Adnan Samir";',
    'function buildAmazingWebsite() {',
    '  return "Pure Excellence";',
    '}',
    'export default Portfolio;'
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds total loading time
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = (step / steps) * 100;
      setLoadingProgress(progress);

      // Change text at different progress points
      if (progress < 20) {
        setCurrentText(loadingTexts[0]);
      } else if (progress < 40) {
        setCurrentText(loadingTexts[1]);
      } else if (progress < 60) {
        setCurrentText(loadingTexts[2]);
      } else if (progress < 80) {
        setCurrentText(loadingTexts[3]);
      } else if (progress < 95) {
        setCurrentText(loadingTexts[4]);
      } else {
        setCurrentText(loadingTexts[5]);
      }

      if (progress >= 50) {
        setShowLogo(true);
      }

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black-primary z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 23, 68, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 23, 68, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            className="absolute font-mono text-red-neon/40 text-sm"
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${10 + (index * 20)}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
        
        {/* Logo Animation */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              className="mb-8"
            >
              <motion.div
                className="relative inline-block"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <motion.div
                    className="absolute inset-0 border-4 border-red-neon rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-2 border-2 border-red-neon/50 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="w-8 h-8 text-red-neon" />
                  </div>
                </div>
              </motion.div>
              
              <motion.h1
                className="text-4xl md:text-5xl font-black mb-2 gradient-text-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                ADNAN SAMIR
              </motion.h1>
              
              <motion.p
                className="text-red-neon/80 text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Developer Portfolio
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Progress */}
        <div className="mb-8">
          <motion.div
            className="w-full h-2 bg-black-secondary rounded-full overflow-hidden border border-red-neon/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-red-neon to-red-primary relative"
              style={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.1 }}
            >
              <motion.div
                className="absolute right-0 top-0 w-8 h-full bg-white/30 blur-sm"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
          
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-red-neon font-mono">
              {Math.round(loadingProgress)}%
            </span>
            <span className="text-white/60 font-mono">
              {loadingProgress < 100 ? 'LOADING...' : 'COMPLETE!'}
            </span>
          </div>
        </div>

        {/* Status Text */}
        <motion.div
          className="mb-8"
          key={currentText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <p className="text-white/80 font-mono text-sm tracking-wider">
            {currentText}
          </p>
        </motion.div>

        {/* Animated Icons */}
        <div className="flex justify-center gap-6">
          {[Terminal, Cpu, Zap].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{
                y: [-5, 5, -5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-6 h-6 text-red-neon/60" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-neon rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Corner Tech Elements */}
      <div className="absolute top-8 left-8">
        <motion.div
          className="text-red-neon/30 font-mono text-xs"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          [SYSTEM STATUS: OPTIMAL]
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8">
        <motion.div
          className="text-red-neon/30 font-mono text-xs"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          [BUILD: v2025.1.0]
        </motion.div>
      </div>
    </motion.div>
  );
}
