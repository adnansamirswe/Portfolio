'use client';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = {
  "Frontend": ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  "Backend": ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs", "Python"],
  "Tools & Others": ["Git", "Docker", "AWS", "CI/CD"]
};

export default function SkillsSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" ref={ref}>
      <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
        Skills & Technologies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="p-6 bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-700/50"
          >
            <h3 className="text-xl font-semibold mb-4 text-green-400">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {categorySkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                  className="px-4 py-2 rounded-lg bg-gray-700/30 text-gray-300 hover:text-green-400 
                           hover:bg-gray-700/50 transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
