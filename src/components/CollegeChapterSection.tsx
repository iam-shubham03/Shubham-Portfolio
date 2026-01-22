import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Search, BarChart3, Users, Layers, Sparkles } from "lucide-react";

const features = [
  { icon: Search, title: "College Finder", desc: "Search and explore colleges easily" },
  { icon: BarChart3, title: "Cutoff Explorer", desc: "Check cutoffs for various branches" },
  { icon: Users, title: "Counselling Support", desc: "Get guidance for admissions" },
  { icon: Layers, title: "Category Discovery", desc: "Browse by category and filters" },
  { icon: Sparkles, title: "Clean Student UI", desc: "Designed for students, by a student" },
];

const CollegeChapterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="collegechapter" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="orb orb-pink w-96 h-96 top-1/4 -left-48 opacity-20" />
        <div className="orb orb-purple w-80 h-80 bottom-0 right-1/4 opacity-20" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6"
          >
            <span className="text-2xl">🚀</span>
            <span className="text-sm font-medium text-primary">FOUNDER SPOTLIGHT</span>
          </motion.div>
          
          <h2 className="section-title">
            Founder of <span className="text-gradient">CollegeChapter</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Helping students explore colleges, cutoffs, counselling insights, and real guidance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-card-glow p-8 rounded-3xl relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-primary via-secondary to-accent opacity-50" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                  <img
                       src= "/logo.png"
                       alt="Logo"
                       className="w-10 h-10 object-contain"
                   />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">CollegeChapter</h3>
                    <p className="text-muted-foreground">Find the Right College Start Your Best Chapter</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A comprehensive platform built to help Indian students navigate their college admissions journey with accurate data, counselling insights, and a clean, modern interface.
                </p>

                <div className="flex gap-4">
                  <a
                    href="https://college-chapter-frontend.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Visit Live Website
                  </a>
                  <button className="btn-secondary">View Features</button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 10 }}
                className="glass-card p-4 rounded-xl flex items-center gap-4 group hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CollegeChapterSection;
