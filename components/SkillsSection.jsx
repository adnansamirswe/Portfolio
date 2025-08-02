'use client';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Enhanced3DCard from "./Enhanced3DCard";
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaDocker, 
  FaAws, 
  FaPython 
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer,
  SiExpress, 
  SiPostgresql, 
  SiMongodb, 
  SiMysql 
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { VscGithubAction } from "react-icons/vsc";

const skills = {
  "Frontend": [
    { name: "React", icon: <FaReact className="text-red-neon" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-red-neon" /> },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-red-neon" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-red-neon" /> }
  ],
  "Backend": [
    { name: "Node.js", icon: <FaNodeJs className="text-red-neon" /> },
    { name: "Express", icon: <SiExpress className="text-white" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-red-neon" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-red-neon" /> },
    { name: "SQL", icon: <SiMysql className="text-red-neon" /> },
    { name: "REST APIs", icon: <TbApi className="text-red-neon" /> },
    { name: "Python", icon: <FaPython className="text-red-neon" /> }
  ],
  "Tools & Others": [
    { name: "Git", icon: <FaGitAlt className="text-red-neon" /> },
    { name: "Docker", icon: <FaDocker className="text-red-neon" /> },
    { name: "AWS", icon: <FaAws className="text-red-neon" /> },
    { name: "CI/CD", icon: <VscGithubAction className="text-white" /> }
  ]
};

export default function SkillsSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-black mb-6 gradient-text-title">
          SKILLS
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Mastering cutting-edge technologies to build the future of web development
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 50, rotateY: 45 }}
            animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: 45 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
          >
            <Enhanced3DCard className="h-full p-8" glowIntensity="low">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-red-neon mb-2">
                  {category}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-red-neon to-red-primary mx-auto rounded-full" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: (categoryIndex * 0.2) + (index * 0.1),
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.02, 
                      rotateY: 5,
                      boxShadow: "0 8px 25px rgba(255, 23, 68, 0.2)"
                    }}
                    className="p-4 rounded-lg bg-black-tertiary/50 border border-red-neon/20 
                             hover:border-red-neon/60 transition-all duration-300 cursor-default
                             flex flex-col items-center gap-2 group glass-effect"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </span>
                    <span className="text-sm font-medium text-white/80 group-hover:text-red-neon transition-colors text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Enhanced3DCard>
          </motion.div>
        ))}
      </div>
      
      {/* Floating skill icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 text-red-neon/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaReact className="w-full h-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
