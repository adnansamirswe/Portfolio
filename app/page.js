'use client';
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ExternalLink, CheckCircle2, MapPin } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import SkillsSection from "@/components/SkillsSection";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ScrollNav from "@/components/ScrollNav";
import GradientBackground from '@/components/GradientBackground';

const projects = [
  {
    title: "Blog Site",
    description: "A modern blog platform with dynamic content management",
    image: "/blog-preview.png",  // Must exactly match your file name in public folder
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn"],
    link: "https://blogsiteportfolio.vercel.app/"
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured online shopping platform with modern UI",
    image: "/ecommerce-preview.png",  // Must exactly match your file name in public folder
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn"],
    link: "https://ecommerce-nine-ecru-76.vercel.app/"
  },
  {
    title: "Event Website",
    description: "Dynamic event management and booking platform",
    image: "/event-preview.png",  // Must exactly match your file name in public folder
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn"],
    link: "https://event-website-beta.vercel.app/"
  },
  {
    title: "Gym Landing Page",
    description: "Modern and responsive gym website with animations",
    image: "/gym-preview.png",  // Must exactly match your file name in public folder
    tech: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn"],
    link: "https://gym-landing-page-rose.vercel.app/"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <ScrollNav />
      
      {/* Hero Section */}
      <motion.section 
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <GradientBackground />
        <ParticleBackground />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              Adnan Samir
            </h1>
            <p className="text-2xl text-gray-400 mb-2">React & Next.js Developer</p>
            <div className="flex items-center justify-center gap-1 text-sm text-gray-400 mb-4">
              <MapPin className="w-3 h-3" />
              <span>Bangladesh</span>
            </div>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              I&apos;m a full-stack developer creating innovative and user-friendly web applications with React and Next.js.
            </p>
          </motion.div>
          
          <div className="flex gap-4 justify-center mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                className="rounded-full bg-gray-800/50 backdrop-blur-sm"
                onClick={() => window.open('https://github.com/adnansamirswe', '_blank')}
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                className="rounded-full bg-gray-800/50 backdrop-blur-sm"
                onClick={() => window.open('https://www.linkedin.com/in/adnan-samir-8887562a2/', '_blank')}
              >
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={`rounded-full bg-gray-800/50 backdrop-blur-sm transition-all duration-300 ${showEmail ? 'min-w-[220px]' : ''}`}
                      onClick={handleEmailClick}
                    >
                      {showEmail ? (
                        copied ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            adnansamir.d@gmail.com
                          </>
                        )
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" /> Contact
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700">
                    <p>{showEmail ? 'Click to copy' : 'Click to show email'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      {/* Skills Section */}
      <section id="skills">
        <SkillsSection />
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <GradientBackground />
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card 
                    className="bg-gray-800/50 border-gray-700 hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    <CardHeader className="p-0 relative group">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        priority={index === 0}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/600x400/1a1b1c/31b237/png?text=${encodeURIComponent(project.title)}`
                        }}
                      />
                      <div className="absolute inset-0 bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-green-400">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-gray-700/50">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-gray-800/90 border-gray-700 backdrop-blur-sm">
                  <div className="flex justify-between space-x-4">
                    <div>
                      <h4 className="text-sm font-semibold">{project.title}</h4>
                      <p className="text-sm text-gray-400">View project details →</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 text-center relative">
        <ParticleBackground />
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700 backdrop-blur-sm relative z-10">
          <CardContent className="pt-12 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                Let&apos;s Connect
              </h2>
              <p className="text-gray-400 mb-8">
                Feel free to reach out for collaborations or just a friendly hello
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className={`rounded-full bg-gray-800/50 backdrop-blur-sm transition-all duration-300 ${showEmail ? 'min-w-[220px]' : ''}`}
                        onClick={handleEmailClick}
                      >
                        {showEmail ? (
                          copied ? (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4 text-green-400" />
                              <span className="text-green-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Mail className="mr-2 h-4 w-4" />
                              adnansamir.d@gmail.com
                            </>
                          )
                        ) : (
                          <>
                            <Mail className="mr-2 h-4 w-4" /> Contact
                          </>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border-gray-700">
                      <p>{showEmail ? 'Click to copy' : 'Click to show email'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
