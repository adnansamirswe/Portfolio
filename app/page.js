'use client';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HoverCard, HoverCardTrigger} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, CheckCircle2, MapPin, ExternalLink, Zap, Code, Palette, Download, FileText } from "lucide-react";
import Red3DBackground from "@/components/Red3DBackground";
import Enhanced3DCard from "@/components/Enhanced3DCard";
import RedNeonButton from "@/components/RedNeonButton";
import SkillsSection from "@/components/SkillsSection";
import LoadingScreen from "@/components/LoadingScreen";
import HackingTerminal from "@/components/HackingTerminal";
import AsteroidTargetedText from "@/components/AsteroidTargetedText";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ScrollNav from "@/components/ScrollNav";
import { getPerformanceLevel, getOptimizedAnimationProps, shouldSkipAnimation } from "@/lib/performance";

const projects = [
    {
    title: "EzeSite - Website Builder",
    description: "Ready-made template-based eCommerce website builder for quick business setup",
    image: "/ezesite.png",
    tech: ["Next.js", "TailwindCSS", "Node.js", "SQL", "Template Engine"],
    link: "https://ezesite.com",
    client: false
  },
  {
    title: "Arofume - Sales Order Tracker",
    description: "Track and note sales orders for Arofume. Built with React.js and Firebase Firestore for real-time order management.",
    image: "/salesmanage.png", // Add a preview image to public/ if available
    tech: ["React.js", "Firebase Firestore", "Vercel"],
    link: "https://arofume.vercel.app/",
    client: true
  },
  {
    title: "Visiotec Alchemy",
    description: "IT solutions agency platform with a modern stack. Cloudflare D1 SQL backend, Node.js API, Vite + React + TypeScript + TailwindCSS frontend.",
    image: "/visiotecalchemy-preview.png",
    tech: ["Vite", "React", "TypeScript", "TailwindCSS", "Node.js", "Cloudflare D1 (SQL)", "Cloudflare", "API"],
    link: "https://visiotecalchemy.com/",
    client: true
  },
  {
    title: "Modern Landing Page",
    description: "Clean and contemporary landing page with sleek animations",
    image: "/modern-landing-preview.png",
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Responsive Design"],
    link: "https://modernlandingpage-7pg3.vercel.app/",
    client: false
  },
  {
    title: "SaaS Landing Page",
    description: "Modern SaaS product landing page with elegant design",
    image: "/saas-preview.png",
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn"],
    link: "https://saas-product-landing-page-two.vercel.app/",
    client: false
  },
  {
    title: "Blog Site",
    description: "A modern blog platform with dynamic content management",
    image: "/blog-preview.png",
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn"],
    link: "https://blogsiteportfolio.vercel.app/",
    client: false
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured online shopping platform with modern UI",
    image: "/ecommerce-preview.png",
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn"],
    link: "https://ecommerce-nine-ecru-76.vercel.app/",
    client: false
  },
  {
    title: "Event Website",
    description: "Dynamic event management and booking platform",
    image: "/event-preview.png",
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn"],
    link: "https://event-website-beta.vercel.app/",
    client: false
  },
  {
    title: "Gym Landing Page",
    description: "Modern and responsive gym website with animations",
    image: "/gym-preview.png",
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn"],
    link: "https://gym-landing-page-rose.vercel.app/",
    client: false
  }
];

export default function Home() {
  const [copied, setCopied] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [performanceLevel, setPerformanceLevel] = React.useState('high');
  // Initialize performance detection
  React.useEffect(() => {
    setPerformanceLevel(getPerformanceLevel());
  }, []);

  const handleCvDownload = () => {
    // Create download link
    const link = document.createElement('a');
    link.href = '/Adnan_Samir_CV.pdf';
    link.download = 'Adnan_Samir_CV.pdf';
    link.click();
  };

  const handleEmailClick = async () => {
    if (!showEmail) {
      setShowEmail(true);
      return;
    }

    try {
      await navigator.clipboard.writeText('adnansamir.d@gmail.com');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowEmail(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Filter state for client projects
  const filteredProjects = projects;

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black-primary relative overflow-hidden">
      <Red3DBackground />
      <ScrollNav />
      <HackingTerminal />
      
      {/* Hero Section */}
      <motion.section 
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center relative z-10 px-4"
      >
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <AsteroidTargetedText 
              text="ADNAN_SAMIR"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-wider"
              asteroidCount={2}
            />
            <motion.div 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 font-light tracking-wide"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ fontWeight: '300' }}
            >
              <AsteroidTargetedText 
                text="Full-Stack_Developer"
                className="inline-block font-light"
                asteroidCount={1}
                highlightWord="Full-Stack"
              />
            </motion.div>
            <motion.div 
              className="flex items-center justify-center gap-2 text-red-neon/80 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-medium">Bangladesh</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex gap-6 justify-center flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {/* GitHub Button - Matrix Code Effect */}
            <motion.button
              onClick={() => window.open('https://github.com/adnansamirswe', '_blank')}
              className="group relative overflow-hidden bg-transparent border-2 border-red-neon text-red-neon hover:text-white font-bold px-6 py-2.5 text-base rounded-xl transition-all duration-500 cursor-pointer"
              whileHover={performanceLevel !== 'low' ? { 
                scale: 1.05, 
                y: -3,
                boxShadow: '0 25px 50px rgba(255, 23, 68, 0.4), 0 0 80px rgba(255, 23, 68, 0.3)'
              } : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Matrix rain effect on hover - Skip on low performance */}
              {!shouldSkipAnimation('complex', performanceLevel) && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  {[...Array(performanceLevel === 'medium' ? 4 : 8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-green-400 text-xs font-mono"
                      style={{ left: `${i * (100 / (performanceLevel === 'medium' ? 4 : 8))}%`, top: '-20px' }}
                      animate={{
                        y: ['-20px', '80px'],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: performanceLevel === 'medium' ? 3 : 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'linear'
                      }}
                    >
                      {Math.random() > 0.5 ? '1' : '0'}
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Background color transition */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-neon via-red-600 to-red-neon"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              
              <span className="relative z-10 flex items-center">
                <Github className="mr-2 h-4 w-4 group-hover:rotate-[360deg] transition-transform duration-700" /> 
                GitHub
              </span>
            </motion.button>
            
            {/* LinkedIn Button - Professional Pulse Effect */}
            <motion.button
              onClick={() => window.open('https://www.linkedin.com/in/adnan-samir-8887562a2/', '_blank')}
              className="group relative overflow-hidden bg-transparent border-2 border-blue-400 text-blue-400 hover:text-white font-bold px-6 py-2.5 text-base rounded-xl transition-all duration-500 cursor-pointer"
              whileHover={performanceLevel !== 'low' ? { 
                scale: 1.05, 
                y: -3,
                boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.3)'
              } : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Professional ripple effect - Skip on low performance */}
              {!shouldSkipAnimation('complex', performanceLevel) && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-blue-400"
                  animate={{
                    scale: [1, 1.2, 1.4],
                    opacity: [0.5, 0.2, 0]
                  }}
                  transition={{
                    duration: performanceLevel === 'medium' ? 3 : 2,
                    repeat: Infinity,
                    ease: 'easeOut'
                  }}
                />
              )}
              
              {/* LinkedIn blue gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
                initial={{ scale: 0, borderRadius: '50%' }}
                whileHover={{ scale: 1.5, borderRadius: '0%' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              
              <span className="relative z-10 flex items-center">
                <Linkedin className="mr-2 h-4 w-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500" /> 
                LinkedIn
              </span>
            </motion.button>
            
            {/* Email Button - Envelope Opening Effect */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={handleEmailClick}
                    className={`group relative overflow-hidden bg-transparent border-2 border-purple-400 text-purple-400 hover:text-white font-bold px-6 py-2.5 text-base rounded-xl transition-all duration-500 cursor-pointer ${showEmail ? 'min-w-[250px]' : ''}`}
                    whileHover={performanceLevel !== 'low' ? { 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: '0 25px 50px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.3)'
                    } : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Email particle effect - Skip on low performance */}
                    {!shouldSkipAnimation('particle', performanceLevel) && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                        {[...Array(performanceLevel === 'medium' ? 4 : 6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full"
                            style={{ 
                              left: `${20 + i * (60 / (performanceLevel === 'medium' ? 4 : 6))}%`, 
                              top: '50%' 
                            }}
                            animate={{
                              y: [0, -15, 0],
                              opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                              duration: performanceLevel === 'medium' ? 2 : 1.5,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: 'easeInOut'
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Purple gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{ transformOrigin: 'left' }}
                    />
                    
                    <span className="relative z-10 flex items-center">
                      {showEmail ? (
                        copied ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-400 animate-bounce" />
                            <span className="text-green-400 font-bold">COPIED!</span>
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                            adnansamir.d@gmail.com
                          </>
                        )
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4 group-hover:rotate-y-180 transition-transform duration-500" /> 
                          Contact Me
                        </>
                      )}
                    </span>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent className="glass-effect border-red-neon/30">
                  <p className="text-red-neon">{showEmail ? 'Click to copy' : 'Click to reveal email'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* CV Download Button - Professional Document Effect */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={handleCvDownload}
                    className="group relative overflow-hidden bg-transparent border-2 border-green-400 text-green-400 hover:text-white font-bold px-6 py-2.5 text-base rounded-xl transition-all duration-500 cursor-pointer"
                    whileHover={performanceLevel !== 'low' ? { 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: '0 25px 50px rgba(34, 197, 94, 0.4), 0 0 80px rgba(34, 197, 94, 0.3)'
                    } : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Document floating effect - Skip on low performance */}
                    {!shouldSkipAnimation('particle', performanceLevel) && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                        {[...Array(performanceLevel === 'medium' ? 3 : 5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-green-300 text-xs"
                            style={{ 
                              left: `${15 + i * (70 / (performanceLevel === 'medium' ? 3 : 5))}%`, 
                              top: '20%' 
                            }}
                            animate={{
                              y: [0, -10, 0],
                              opacity: [0.3, 1, 0.3],
                              rotate: [0, 5, 0]
                            }}
                            transition={{
                              duration: performanceLevel === 'medium' ? 2.5 : 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: 'easeInOut'
                            }}
                          >
                            <FileText className="w-3 h-3" />
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {/* Green gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-400"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{ transformOrigin: 'bottom' }}
                    />
                    
                    <span className="relative z-10 flex items-center">
                      <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      Download CV
                    </span>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent className="glass-effect border-green-400/30">
                  <p className="text-green-400">Click to download my resume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          {/* Floating Icons - Skip on low performance */}
          {!shouldSkipAnimation('float', performanceLevel) && (
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/4"
                animate={{ rotate: 360, y: [-20, 20, -20] }}
                transition={{ 
                  duration: performanceLevel === 'low' ? 12 : 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Code className="w-12 h-12 text-red-neon/30" />
              </motion.div>
              <motion.div
                className="absolute top-1/3 right-1/4"
                animate={{ rotate: -360, y: [20, -20, 20] }}
                transition={{ 
                  duration: performanceLevel === 'low' ? 10 : 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Zap className="w-10 h-10 text-red-neon/40" />
              </motion.div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-neon/50 to-transparent" />

      {/* Skills Section */}
      <section id="skills" className="relative z-10">
        <SkillsSection />
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-neon/50 to-transparent" />

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black mb-6 gradient-text-title">
            MY PROJECTS
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Cutting-edge web applications that push the boundaries of what&apos;s possible
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <Enhanced3DCard 
                className="h-full cursor-pointer"
                onClick={() => window.open(project.link, '_blank')}
                glowIntensity="medium"
              >
                {/* Client Badge */}
                {project.client && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-red-neon text-black font-bold px-3 py-1 animate-pulse">
                      CLIENT
                    </Badge>
                  </div>
                )}
                
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-t-lg group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    priority={index === 0}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/600x400/0a0a0a/ff1744/png?text=${encodeURIComponent(project.title)}`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-neon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-6 h-6 text-red-neon" />
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-red-neon mb-3 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <Badge 
                        key={i} 
                        className="bg-black-tertiary/80 text-red-neon border border-red-neon/30 hover:bg-red-neon/20 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Enhanced3DCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-neon/50 to-transparent" />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-red-neon/20 relative z-10">
        <p className="text-white/60">
          © 2023 <span className="text-red-neon font-bold">Adnan_Samir</span>. 
          Crafted with <span>React</span>
        </p>
      </footer>
    </div>
  );
}
