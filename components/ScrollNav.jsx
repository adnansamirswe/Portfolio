'use client';
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" }
];

export default function ScrollNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="relative flex flex-col items-center gap-6 glass-effect p-4 rounded-2xl border border-red-neon/30">
        {/* Line positioned behind the dots */}
        <div className="absolute w-px bg-red-neon/30 left-1/2 -translate-x-1/2" 
             style={{ top: '32px', bottom: '32px' }} />
        {sections.map(({ id, label }) => (
          <div
            key={id}
            className="relative group cursor-pointer flex items-center"
            onClick={() => scrollToSection(id)}
          >
            <motion.span 
              className="absolute right-full mr-6 text-sm text-red-neon font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap translate-y-[1px] bg-black-secondary/90 px-3 py-1 rounded-lg border border-red-neon/30"
              whileHover={{ x: -5 }}
            >
              {label}
            </motion.span>
            <motion.div
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 relative overflow-hidden z-10 bg-black-primary
                ${activeSection === id 
                  ? 'bg-red-neon border-red-neon shadow-neon-red' 
                  : 'border-red-neon/40 hover:border-red-neon'
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {activeSection === id && (
                <motion.div
                  className="absolute inset-0 bg-red-neon rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-red-neon/20 to-transparent rounded-full" />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
