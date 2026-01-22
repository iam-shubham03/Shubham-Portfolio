import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import { GraduationCap, Rocket, Video, Users } from "lucide-react";

const achievements = [
  {
    icon: GraduationCap,
    title: "BTech CSE",
    subtitle: "Cybersecurity",
    value: 2025,
    suffix: "",
    isYear: true,
  },
  {
    icon: Rocket,
    title: "CollegeChapter",
    subtitle: "Founder",
    value: 1,
    suffix: "",
    isYear: false,
    displayValue: "🚀",
  },
  {
    icon: Video,
    title: "Content Creator",
    subtitle: "Education Videos",
    value: 200,
    suffix: "+",
  },
  {
    icon: Users,
    title: "Students Helped",
    subtitle: "Through CollegeChapter",
    value: 20000,
    suffix: "+",
  },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

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
            <span className="text-2xl">🏆</span>
            <span className="text-sm font-medium text-primary">ACHIEVEMENTS</span>
          </motion.div>

          <h2 className="section-title">
            Milestones & <span className="text-gradient">Highlights</span>
          </h2>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-card-glow p-6 rounded-2xl text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <achievement.icon className="w-8 h-8 text-primary" />
              </div>
              
              <div className="text-3xl font-bold text-foreground mb-1">
                {achievement.displayValue ? (
                  achievement.displayValue
                ) : achievement.isYear ? (
                  achievement.value
                ) : isInView ? (
                  <>
                    <CountUp end={achievement.value} duration={2} separator="," />
                    {achievement.suffix}
                  </>
                ) : (
                  "0"
                )}
              </div>
              
              <h3 className="font-semibold text-foreground">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
