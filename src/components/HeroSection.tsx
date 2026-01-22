import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Play,
  ExternalLink,
  Mail,
  Download,
  Youtube,
  Instagram,
  Linkedin,
  Users,
  Eye,
  Video,
} from "lucide-react";
import shubhamImage from "@/assets/shubham-hero.png";

const stats = [
  { icon: Users, label: "Subscribers", value: 2800, suffix: "+" },
  { icon: Eye, label: "Total Views", value: 700000, suffix: "+" },
  { icon: Video, label: "Videos", value: 200, suffix: "+" },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb orb-cyan w-[520px] h-[600px] -top-72 -left-80 animate-blob" />
        <div
          className="orb orb-purple w-[500px] h-[500px] top-1/3 -right-48 animate-blob"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="orb orb-pink w-[400px] h-[400px] bottom-0 left-1/4 animate-blob"
          style={{ animationDelay: "4s" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  Let’s build something cool
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-tight mb-6"
              >
                <span className="text-gradient">Engineer.</span>
                <br />
                <span className="text-foreground">Creator.</span>
                <br />
                <span className="text-gradient-primary">Founder.</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-lg mb-8"
              >
                I build student-first platforms and create education content that
                actually helps.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <a
                  href="#projects"
                  className="btn-primary flex items-center gap-2"
                >
                  <Play size={18} />
                  View Projects
                </a>

                <a
                  href="https://college-chapter-frontend.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <ExternalLink size={18} />
                  Explore CollegeChapter
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#contact"
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Mail size={16} />
                  Contact Me
                </a>
                <a
                  href="#"
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </motion.div>
            </motion.div>

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card-glow p-4 rounded-xl text-center"
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    <CountUp end={stat.value} duration={2} separator="," />
                    {stat.suffix}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-3xl opacity-30 scale-110" />

              {/* Image container with neon ring */}
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden neon-ring neon-ring-animated"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={shubhamImage}
                  alt="Shubham Kumar"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating elements */}
              {/* YouTube */}
              <motion.a
                href="https://www.youtube.com/@shubhamspeaks03"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open YouTube Channel"
                title="YouTube"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition-transform"
              >
                <Youtube className="w-5 h-5 text-red-500" />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/shubham___speaks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Instagram Profile"
                title="Instagram"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-16 -right-8 glass-card px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition-transform"
              >
                <Instagram className="w-5 h-5 text-pink-500" />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/iamshubham03"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn Profile"
                title="LinkedIn"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-16 -left-8 glass-card px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition-transform"
              >
                <Linkedin className="w-5 h-5 text-sky-500" />
              </motion.a>

              {/* CSE '25 */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-xl"
              >
                <span className="text-sm font-semibold text-gradient">
                  CSE '25
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
