'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function AsteroidTargetedText({ text, className = "", asteroidCount = 3, highlightWord = null }) {
  const [letters, setLetters] = useState([]);
  const [asteroids, setAsteroids] = useState([]);
  const [destroyedLetters, setDestroyedLetters] = useState(new Set());
  const containerRef = useRef(null);
  const letterRefs = useRef([]);

  // Initialize letters with positions
  useEffect(() => {
    const initLetters = text.split('').map((char, index) => {
      // Check if this character is part of the highlight word
      const isHighlighted = highlightWord && text.indexOf(highlightWord) <= index && 
                           index < text.indexOf(highlightWord) + highlightWord.length;
      
      return {
        id: index,
        char,
        isDestroyed: false,
        fragments: [],
        repairProgress: 0,
        isHighlighted
      };
    });
    setLetters(initLetters);
    letterRefs.current = new Array(initLetters.length);
  }, [text, highlightWord]);

  // Create asteroid targeting system
  useEffect(() => {
    const createAsteroid = () => {
      const availableTargets = letters
        .map((letter, index) => ({ letter, index }))
        .filter(({ letter, index }) => 
          letter.char !== ' ' && !destroyedLetters.has(index)
        );

      if (availableTargets.length === 0) return null;

      const target = availableTargets[Math.floor(Math.random() * availableTargets.length)];
      
      return {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: -50,
        targetIndex: target.index,
        speed: 2 + Math.random() * 3,
        size: 8 + Math.random() * 12,
        rotation: 0,
        trail: []
      };
    };

    const spawnAsteroid = () => {
      const newAsteroid = createAsteroid();
      if (newAsteroid) {
        setAsteroids(prev => [...prev, newAsteroid]);
      }
    };

    // Spawn asteroids periodically
    const asteroidTimer = setInterval(() => {
      if (asteroids.length < asteroidCount) {
        spawnAsteroid();
      }
    }, 3000 + Math.random() * 4000); // Random spawn between 3-7 seconds

    return () => clearInterval(asteroidTimer);
  }, [letters, destroyedLetters, asteroidCount, asteroids.length]);

  // Animate asteroids and check collisions
  useEffect(() => {
    const animateAsteroids = () => {
      setAsteroids(prev => prev.map(asteroid => {
        const targetLetter = letterRefs.current[asteroid.targetIndex];
        if (!targetLetter) return asteroid;

        const targetRect = targetLetter.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        
        if (!containerRect) return asteroid;

        const targetX = targetRect.left - containerRect.left + targetRect.width / 2;
        const targetY = targetRect.top - containerRect.top + targetRect.height / 2;

        // Calculate direction to target
        const dx = targetX - asteroid.x;
        const dy = targetY - asteroid.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Move towards target
        const newX = asteroid.x + (dx / distance) * asteroid.speed;
        const newY = asteroid.y + (dy / distance) * asteroid.speed;

        // Update trail
        const newTrail = [...asteroid.trail, { x: asteroid.x, y: asteroid.y }];
        if (newTrail.length > 8) newTrail.shift();

        // Check collision with better detection
        if (distance < 30) {
          // Create explosion effect at impact point
          const impactEffect = {
            x: targetX,
            y: targetY,
            timestamp: Date.now()
          };
          
          // Destroy letter with impact effect
          destroyLetter(asteroid.targetIndex);
          return null; // Remove asteroid
        }

        return {
          ...asteroid,
          x: newX,
          y: newY,
          rotation: asteroid.rotation + 5,
          trail: newTrail
        };
      }).filter(Boolean));
    };

    const animationFrame = requestAnimationFrame(animateAsteroids);
    return () => cancelAnimationFrame(animationFrame);
  });

  const destroyLetter = (index) => {
    // Don't immediately hide the letter - show destruction process
    const letterElement = letterRefs.current[index];
    if (!letterElement) return;

    // Create more dramatic fragments with different types
    const fragments = [
      // Main character pieces - actual parts of the letter
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `main-${i}`,
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 400 + (i % 2 === 0 ? -100 : 100),
        vy: (Math.random() - 0.5) * 300 - 150,
        opacity: 1,
        size: Math.random() * 12 + 8,
        type: 'character',
        char: letters[index].char,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20
      })),
      // Spark particles
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `spark-${i}`,
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 500,
        vy: (Math.random() - 0.5) * 500 - 200,
        opacity: 1,
        size: Math.random() * 3 + 1,
        type: 'spark',
        rotation: Math.random() * 360,
        life: 1
      })),
      // Smoke particles
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `smoke-${i}`,
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 100,
        vy: -Math.random() * 150 - 50,
        opacity: 0.6,
        size: Math.random() * 15 + 10,
        type: 'smoke',
        rotation: Math.random() * 360
      }))
    ];

    // Update letter state to show destruction process
    setLetters(prev => prev.map((letter, i) => 
      i === index ? { 
        ...letter, 
        isDestroyed: true, 
        fragments,
        destructionPhase: 'impact' // Add destruction phases
      } : letter
    ));

    // Phase 1: Impact flash (immediate)
    setTimeout(() => {
      setLetters(prev => prev.map((letter, i) => 
        i === index ? { ...letter, destructionPhase: 'breaking' } : letter
      ));
    }, 100);

    // Phase 2: Letter starts breaking apart (after 200ms)
    setTimeout(() => {
      setLetters(prev => prev.map((letter, i) => 
        i === index ? { ...letter, destructionPhase: 'fragments' } : letter
      ));
    }, 300);

    // Phase 3: Letter completely disappears (after 1 second)
    setTimeout(() => {
      setDestroyedLetters(prev => new Set([...prev, index]));
      setLetters(prev => prev.map((letter, i) => 
        i === index ? { ...letter, destructionPhase: 'destroyed' } : letter
      ));
    }, 1000);

    // Start repair after longer delay
    setTimeout(() => {
      repairLetter(index);
    }, 4000 + Math.random() * 2000);
  };

  const repairLetter = (index) => {
    // Start repair process - reset destruction phase and begin repair
    setLetters(prev => prev.map((letter, i) => 
      i === index ? { 
        ...letter, 
        repairProgress: 0.1,
        destructionPhase: 'repairing' // Add repair phase
      } : letter
    ));

    // Gradual repair animation
    const repairInterval = setInterval(() => {
      setLetters(prev => prev.map((letter, i) => {
        if (i === index) {
          const newProgress = letter.repairProgress + 0.1;
          if (newProgress >= 1) {
            setDestroyedLetters(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
            return { 
              ...letter, 
              isDestroyed: false, 
              repairProgress: 1, 
              fragments: [],
              destructionPhase: null // Clear destruction phase completely
            };
          }
          return { ...letter, repairProgress: newProgress };
        }
        return letter;
      }));
    }, 100);

    setTimeout(() => clearInterval(repairInterval), 1000);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Letters */}
      <div className="relative z-10 flex flex-wrap justify-center">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            ref={el => letterRefs.current[index] = el}
            className="relative inline-block"
          >
            {/* Letter character - show during destruction phases */}
            <motion.span
              className={`relative z-20 ${letter.isHighlighted ? 'text-red-neon' : 'text-white'}`}
              style={{
                // Different styling for highlighted vs normal letters
                color: letter.isHighlighted ? '#ff1744' : text === "ADNAN_SAMIR" ? '#cc1235' : '#ffffff',
                textShadow: letter.isHighlighted ? 
                  '0 0 15px #ff1744, 0 0 30px #ff1744, 0 0 45px #ff1744' :
                  text === "ADNAN_SAMIR" ? 
                    '2px 2px 0px #000000, 4px 4px 0px #1a1a1a, 6px 6px 0px #333333, 0 0 15px #cc1235, 0 0 30px #cc1235, 0 0 45px #cc1235' :
                    '0 0 12px rgba(255, 255, 255, 0.8), 0 0 24px rgba(255, 255, 255, 0.6), 0 0 36px rgba(255, 255, 255, 0.4)',
                filter: text === "ADNAN_SAMIR" ? 
                  'brightness(1.3)' : 
                  'brightness(1.3)',
                fontWeight: text === "ADNAN_SAMIR" ? '600' : '300' // Reduced boldness for name
              }}
              animate={{
                // Only hide when completely destroyed, show during repair
                opacity: letter.destructionPhase === 'destroyed' ? 0 : 
                         letter.destructionPhase === 'fragments' ? 0.5 :
                         letter.destructionPhase === 'breaking' ? 0.8 :
                         letter.destructionPhase === 'repairing' ? Math.max(0.9, letter.repairProgress) :
                         letter.repairProgress > 0 ? Math.max(0.9, letter.repairProgress) : 1,
                
                scale: letter.repairProgress > 0 && letter.repairProgress < 1 ? 
                  [0, 0.5, 1.2, 1] : 
                  letter.destructionPhase === 'impact' ? [1, 1.3, 1] :
                  letter.destructionPhase === 'breaking' ? [1, 0.9] : 1,
                
                // Shake effect during destruction
                x: letter.destructionPhase === 'impact' ? [0, -2, 2, -1, 1, 0] :
                   letter.destructionPhase === 'breaking' ? [0, -1, 1, 0] : 0,
                
                textShadow: letter.repairProgress > 0 && letter.repairProgress < 1 ?
                  [
                    '0 0 5px #ff1744',
                    '0 0 20px #ff1744, 0 0 30px #ff1744', 
                    '0 0 40px #ff1744, 0 0 60px #ff1744',
                    '0 0 10px rgba(255, 23, 68, 0.5)'
                  ] : letter.destructionPhase === 'impact' ?
                    '0 0 20px #ff1744, 0 0 40px #ff1744' : 
                    '0 0 2px rgba(255, 23, 68, 0.3)',
                
                filter: letter.repairProgress > 0 && letter.repairProgress < 1 ?
                  ['blur(5px)', 'blur(2px)', 'blur(0px)', 'blur(0px)'] : 
                  letter.destructionPhase === 'breaking' ? 'blur(1px)' : 'blur(0px)'
              }}
              transition={{ 
                duration: letter.destructionPhase === 'impact' ? 0.1 : 
                         letter.destructionPhase === 'repairing' ? 0.3 : 0.8, 
                ease: "easeOut" 
              }}
            >
              {letter.char === '_' ? '\u00A0' : letter.char}
            </motion.span>

            {/* Destruction fragments */}
            <AnimatePresence>
              {letter.isDestroyed && letter.fragments.map(fragment => {
                if (fragment.type === 'character') {
                  return (
                    <motion.div
                      key={fragment.id}
                      className="absolute font-black pointer-events-none"
                      style={{
                        fontSize: '60%',
                        color: '#ff1744',
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'center',
                        zIndex: 30
                      }}
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 0,
                        rotate: fragment.rotation,
                        scale: 1
                      }}
                      animate={{
                        x: fragment.vx,
                        y: fragment.vy,
                        opacity: [0, 1, 0.8, 0],
                        rotate: fragment.rotation + (fragment.rotationSpeed * 100),
                        scale: [1, 0.8, 0.5, 0.2]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 3,
                        ease: 'easeOut',
                        delay: letter.destructionPhase === 'fragments' ? 0 : 0.3
                      }}
                    >
                      {fragment.char}
                    </motion.div>
                  );
                } else if (fragment.type === 'spark') {
                  return (
                    <motion.div
                      key={fragment.id}
                      className="absolute bg-gradient-to-r from-yellow-400 via-red-500 to-red-600 rounded-full pointer-events-none"
                      style={{
                        width: fragment.size,
                        height: fragment.size,
                        left: '50%',
                        top: '50%',
                        boxShadow: '0 0 10px #ff1744',
                        zIndex: 25
                      }}
                      initial={{ 
                        x: fragment.x, 
                        y: fragment.y, 
                        opacity: 1,
                        scale: 1
                      }}
                      animate={{
                        x: fragment.x + fragment.vx,
                        y: fragment.y + fragment.vy,
                        opacity: [1, 0.8, 0.4, 0],
                        scale: [1, 0.7, 0.3, 0]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2.5, ease: 'easeOut' }}
                    />
                  );
                } else if (fragment.type === 'smoke') {
                  return (
                    <motion.div
                      key={fragment.id}
                      className="absolute bg-gray-600/40 rounded-full pointer-events-none"
                      style={{
                        width: fragment.size,
                        height: fragment.size,
                        left: '50%',
                        top: '50%',
                        filter: 'blur(3px)',
                        zIndex: 20
                      }}
                      initial={{ 
                        x: fragment.x, 
                        y: fragment.y, 
                        opacity: fragment.opacity,
                        scale: 0.2
                      }}
                      animate={{
                        x: fragment.x + fragment.vx,
                        y: fragment.y + fragment.vy,
                        opacity: [fragment.opacity, 0.3, 0],
                        scale: [0.2, 1, 1.5]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 4, ease: 'easeOut' }}
                    />
                  );
                }
              })}
            </AnimatePresence>

            {/* Impact flash effect */}
            {letter.destructionPhase === 'impact' && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 1, 0.7, 0],
                  scale: [0.5, 1.5, 2.5, 4]
                }}
                transition={{ duration: 0.4 }}
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 23, 68, 0.7) 30%, rgba(255, 100, 0, 0.5) 60%, transparent 80%)',
                  borderRadius: '50%',
                  zIndex: 35
                }}
              />
            )}

            {/* Repair effect */}
            {letter.destructionPhase === 'repairing' && letter.repairProgress > 0 && letter.repairProgress < 1 && (
              <>
                {/* Reconstruction particles */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(255, 23, 68, 0.6) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%)'
                    ]
                  }}
                  transition={{ duration: 0.3, repeat: 3 }}
                />
                
                {/* Repair sparks */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`repair-${i}`}
                    className="absolute bg-cyan-400 rounded-full pointer-events-none"
                    style={{
                      width: 2,
                      height: 2,
                      left: '50%',
                      top: '50%'
                    }}
                    animate={{
                      x: [0, Math.cos(i * 60 * Math.PI / 180) * 30, 0],
                      y: [0, Math.sin(i * 60 * Math.PI / 180) * 30, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.1,
                      repeat: 1
                    }}
                  />
                ))}
              </>
            )}
          </motion.span>
        ))}
      </div>

      {/* Asteroids */}
      <AnimatePresence>
        {asteroids.map(asteroid => (
          <motion.div
            key={asteroid.id}
            className="absolute pointer-events-none z-30"
            style={{
              left: asteroid.x - asteroid.size / 2,
              top: asteroid.y - asteroid.size / 2,
              width: asteroid.size,
              height: asteroid.size
            }}
          >
            {/* Asteroid trail with better effects */}
            <div className="absolute inset-0">
              {asteroid.trail.map((point, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: point.x - asteroid.x,
                    top: point.y - asteroid.y,
                    width: asteroid.size * (i / asteroid.trail.length) * 0.8,
                    height: asteroid.size * (i / asteroid.trail.length) * 0.8,
                    background: `radial-gradient(circle, 
                      rgba(255, 100, 100, ${i / asteroid.trail.length}) 0%, 
                      rgba(255, 23, 68, ${(i / asteroid.trail.length) * 0.6}) 50%, 
                      transparent 80%)`,
                    filter: 'blur(1px)'
                  }}
                />
              ))}
            </div>
            
            {/* Asteroid body with better design */}
            <motion.div
              className="relative w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #ff6b6b 0%, #ff3333 40%, #cc0000 80%, #800000 100%)',
                boxShadow: `
                  0 0 20px rgba(255, 23, 68, 0.8),
                  inset -3px -3px 6px rgba(0,0,0,0.4),
                  inset 2px 2px 4px rgba(255,100,100,0.3)
                `
              }}
              animate={{ rotate: asteroid.rotation }}
              transition={{ ease: 'linear', duration: 0.1 }}
            >
              {/* Asteroid surface details */}
              <div className="absolute inset-1 bg-red-900/20 rounded-full" />
              <div className="absolute top-2 left-3 w-1.5 h-1.5 bg-red-950 rounded-full" />
              <div className="absolute bottom-2 right-2 w-1 h-1 bg-red-950 rounded-full" />
              <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-red-950 rounded-full" />
              
              {/* Core glow */}
              <div className="absolute inset-2 bg-red-400/30 rounded-full blur-sm" />
            </motion.div>

            {/* Enhanced glow and particle trail */}
            <div className="absolute inset-0">
              {/* Primary glow */}
              <div 
                className="absolute inset-0 bg-red-neon/30 rounded-full blur-md scale-150"
                style={{ animation: 'pulse 1.5s infinite' }}
              />
              
              {/* Secondary glow */}
              <div 
                className="absolute inset-0 bg-orange-500/20 rounded-full blur-lg scale-200"
                style={{ animation: 'pulse 2s infinite reverse' }}
              />
              
              {/* Sparks */}
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: `${50 + Math.sin(asteroid.rotation * 0.1 + i * 120) * 15}%`,
                    top: `${50 + Math.cos(asteroid.rotation * 0.1 + i * 120) * 15}%`
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1.5, 0.5]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
