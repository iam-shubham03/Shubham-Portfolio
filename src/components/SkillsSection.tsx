import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const skillCategories = {
  Developer: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 85 },
    { name: "TailwindCSS", level: 90 },
    { name: "APIs / Integration", level: 75 },
    { name: "Firebase / Supabase", level: 70 },
  ],
  Creator: [
    { name: "Scriptwriting", level: 90 },
    { name: "YouTube Growth Strategy", level: 85 },
    { name: "SEO Basics", level: 80 },
    { name: "Shorts/Reels Hooks", level: 85 },
    { name: "Content Planning", level: 90 },
  ],
  Editing: [
    { name: "Premiere Pro", level: 85 },
    { name: "CapCut", level: 90 },
    { name: "Smooth Transitions", level: 85 },
    { name: "Sound Sync", level: 80 },
    { name: "Color Grading", level: 75 },
  ],
  Design: [
    { name: "Canva", level: 95 },
    { name: "Thumbnails", level: 90 },
    { name: "Posters", level: 85 },
    { name: "Photoshop Basics", level: 70 },
    { name: "UI/UX Concepts", level: 75 },
  ],
};

type Category = keyof typeof skillCategories;

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<Category>("Developer");

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="orb orb-cyan w-80 h-80 top-20 -right-40 opacity-20" />
        <div className="orb orb-pink w-64 h-64 bottom-20 -left-32 opacity-20" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-medium mb-4">SKILLS</p>
          <h2 className="section-title">
            What I <span className="text-gradient">Bring</span> to the Table
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {(Object.keys(skillCategories) as Category[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "btn-primary"
                  : "glass-card hover:bg-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-8 rounded-2xl">
            <div className="space-y-6">
              {skillCategories[activeCategory].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-primary font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ background: "var(--gradient-neon)" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skill chips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {skillCategories[activeCategory].map((skill, index) => (
            <motion.span
              key={skill.name}
              whileHover={{ scale: 1.1, y: -3 }}
              className="glass-card px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all cursor-default"
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
