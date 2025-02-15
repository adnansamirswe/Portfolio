'use client';
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
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
      <div className="flex flex-col items-center gap-6">
        <div className="w-px h-full bg-gray-700/50 absolute right-2" />
        {sections.map(({ id, label }) => (
          <div
            key={id}
            className="relative group cursor-pointer flex items-center"
            onClick={() => scrollToSection(id)}
          >
            <span className="absolute right-full mr-4 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap translate-y-[1px]">
              {label}
            </span>
            <motion.div
              className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 
                ${activeSection === id ? 'bg-green-400 border-green-400' : 'border-gray-600 hover:border-green-400'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
