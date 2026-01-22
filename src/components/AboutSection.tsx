import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Youtube, Scissors, Palette, TrendingUp, Rocket } from "lucide-react";
import shubhamImage from "@/assets/shubham-hero.png";

const roles = [
  { icon: GraduationCap, title: "Engineer", desc: "CSE - Cybersecurity, July 2025" },
  { icon: Youtube, title: "YouTuber", desc: "Education + College Reviews" },
  { icon: Scissors, title: "Video Editing", desc: "Premiere Pro & CapCut" },
  { icon: Palette, title: "Graphic Design", desc: "Thumbnails & Posters" },
  { icon: TrendingUp, title: "Content Strategy", desc: "Growth & SEO" },
  { icon: Rocket, title: "Startup Builder", desc: "CollegeChapter" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="orb orb-purple w-96 h-96 -top-48 right-0 opacity-20" />
        <div className="orb orb-cyan w-80 h-80 bottom-0 -left-40 opacity-20" />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4">ABOUT ME</p>
          <h2 className="section-title">
            The <span className="text-gradient">Story</span> Behind
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Mixing engineering + creativity to build platforms and content that guide students.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image and story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative mb-8">
              <div className="w-48 h-48 mx-auto lg:mx-0 rounded-2xl overflow-hidden neon-ring">
                <img
                  src={shubhamImage}
                  alt="Shubham Kumar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <p className="text-muted-foreground leading-relaxed">
                I'm <span className="text-foreground font-semibold">Shubham</span> — I mix engineering + creativity to build platforms and content that guide students. From coding to creating videos, I love making complex info simple & useful.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                As the founder of <span className="text-primary font-semibold">CollegeChapter</span>, I'm on a mission to help students navigate their college journey with real insights, not just rankings.
              </p>
            </div>
          </motion.div>

          {/* Right side - Role cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-5 rounded-xl text-center group hover:glass-card-glow transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <role.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{role.title}</h3>
                <p className="text-xs text-muted-foreground">{role.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
