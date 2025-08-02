'use client';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HoverCard, HoverCardTrigger} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, CheckCircle2, MapPin, ExternalLink, Zap, Code, Palette } from "lucide-react";
import Red3DBackground from "@/components/Red3DBackground";
import Enhanced3DCard from "@/components/Enhanced3DCard";
import RedNeonButton from "@/components/RedNeonButton";
import SkillsSection from "@/components/SkillsSection";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ScrollNav from "@/components/ScrollNav";

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
  const [showClientsOnly, setShowClientsOnly] = React.useState(false);
  const filteredProjects = showClientsOnly ? projects.filter(p => p.client) : projects;

  return (
    <div className="min-h-screen bg-black-primary relative overflow-hidden">
      <Red3DBackground />
      <ScrollNav />
      
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
            <h1 className="text-8xl md:text-9xl font-black mb-6 neon-text gradient-text tracking-wider">
              ADNAN SAMIR
            </h1>
            <motion.div 
              className="text-3xl md:text-4xl text-white/90 mb-4 font-light tracking-wide"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="text-red-neon">Elite</span> Full-Stack Developer
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
            <RedNeonButton 
              variant="primary" 
              size="lg"
              onClick={() => window.open('https://github.com/adnansamirswe', '_blank')}
              className="group"
            >
              <Github className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" /> 
              GitHub
            </RedNeonButton>
            
            <RedNeonButton 
              variant="secondary" 
              size="lg"
              onClick={() => window.open('https://www.linkedin.com/in/adnan-samir-8887562a2/', '_blank')}
              className="group"
            >
              <Linkedin className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" /> 
              LinkedIn
            </RedNeonButton>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <RedNeonButton 
                    variant="ghost" 
                    size="lg"
                    onClick={handleEmailClick}
                    className={`transition-all duration-300 ${showEmail ? 'min-w-[280px]' : ''} group`}
                  >
                    {showEmail ? (
                      copied ? (
                        <>
                          <CheckCircle2 className="mr-3 h-5 w-5 text-green-400 animate-bounce" />
                          <span className="text-green-400 font-bold">COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Mail className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                          adnansamir.d@gmail.com
                        </>
                      )
                    ) : (
                      <>
                        <Mail className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" /> 
                        Contact Me
                      </>
                    )}
                  </RedNeonButton>
                </TooltipTrigger>
                <TooltipContent className="glass-effect border-red-neon/30">
                  <p className="text-red-neon">{showEmail ? 'Click to copy' : 'Click to reveal email'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4"
              animate={{ rotate: 360, y: [-20, 20, -20] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code className="w-12 h-12 text-red-neon/30" />
            </motion.div>
            <motion.div
              className="absolute top-1/3 right-1/4"
              animate={{ rotate: -360, y: [20, -20, 20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-10 h-10 text-red-neon/40" />
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 left-1/6"
              animate={{ rotate: 180, y: [-15, 15, -15] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Palette className="w-8 h-8 text-red-neon/35" />
            </motion.div>
          </div>
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
          <h2 className="text-6xl font-black mb-6 neon-text gradient-text">
            MY PROJECTS
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Cutting-edge web applications that push the boundaries of what&apos;s possible
          </p>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <RedNeonButton
            variant={showClientsOnly ? "primary" : "secondary"}
            onClick={() => setShowClientsOnly(!showClientsOnly)}
            className="text-lg px-8 py-4"
          >
            {showClientsOnly ? 'Show All Projects' : 'Show Client Projects Only'}
          </RedNeonButton>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 text-center relative z-10">
        <Enhanced3DCard className="max-w-4xl mx-auto glass-effect">
          <div className="p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl font-black mb-8 neon-text gradient-text">
                LET&apos;S BUILD SOMETHING EPIC
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Ready to transform your vision into a digital masterpiece? 
                Let&apos;s create something that will blow your clients away.
              </p>
              
              <div className="flex gap-6 justify-center flex-wrap">
                <RedNeonButton 
                  variant="primary" 
                  size="lg"
                  onClick={handleEmailClick}
                  className="group transform hover:scale-105"
                >
                  <Mail className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Start Project
                </RedNeonButton>
                
                <RedNeonButton 
                  variant="secondary" 
                  size="lg"
                  onClick={() => window.open('https://github.com/adnansamirswe', '_blank')}
                  className="group"
                >
                  <Github className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  View Code
                </RedNeonButton>
              </div>
            </motion.div>
          </div>
        </Enhanced3DCard>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-red-neon/20 relative z-10">
        <p className="text-white/60">
          © 2025 <span className="text-red-neon font-bold">Adnan Samir</span>. 
          Crafted with <span className="text-red-neon">❤️</span> and <span className="text-red-neon">React</span>
        </p>
      </footer>
    </div>
  );
}
