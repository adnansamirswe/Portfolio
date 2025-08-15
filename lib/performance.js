// Performance detection utility
export const getPerformanceLevel = () => {
  if (typeof window === 'undefined') return 'high'; // SSR fallback
  
  const isMobile = window.innerWidth < 768;
  const isLowEnd = window.devicePixelRatio < 2 || navigator.hardwareConcurrency < 4;
  const isSlowConnection = navigator.connection && navigator.connection.effectiveType && 
    (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
  
  if (isMobile && (isLowEnd || isSlowConnection)) return 'low';
  if (isMobile || isLowEnd) return 'medium';
  return 'high';
};

export const getOptimizedAnimationProps = (level = 'high') => {
  const configs = {
    low: {
      transition: { duration: 0.3, ease: 'easeOut' },
      skipComplexAnimations: true,
      reduceParticles: true,
      simplifyEffects: true
    },
    medium: {
      transition: { duration: 0.5, ease: 'easeOut' },
      skipComplexAnimations: false,
      reduceParticles: true,
      simplifyEffects: false
    },
    high: {
      transition: { duration: 0.8, ease: 'easeOut' },
      skipComplexAnimations: false,
      reduceParticles: false,
      simplifyEffects: false
    }
  };
  
  return configs[level] || configs.high;
};

export const shouldSkipAnimation = (animationType, performanceLevel) => {
  const skipRules = {
    low: ['complex', 'particle', 'trail', 'float'],
    medium: ['particle', 'trail'],
    high: []
  };
  
  return skipRules[performanceLevel]?.includes(animationType) || false;
};
