import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Rocket, BookOpen, Layout, Smartphone } from "lucide-react";

const projects = [
  {
    title: "CollegeChapter",
    description: "A comprehensive platform helping students explore colleges, cutoffs, and counselling insights with real guidance.",
    tags: ["React", "TailwindCSS", "Vercel", "Student-First"],
    liveUrl: "https://college-chapter-frontend.vercel.app",
    icon: Rocket,
    featured: true,
  },
  {
    title: "College Info Platform",
    description: "Counselling support and cutoff finder to help students make informed decisions about their education.",
    tags: ["React", "Firebase", "APIs"],
    icon: BookOpen,
  },
  {
    title: "Education Content System",
    description: "Streamlined content management for educational videos and resources across platforms.",
    tags: ["Content Strategy", "SEO", "YouTube"],
    icon: Layout,
  },
  {
    title: "Portfolio & Landing Pages",
    description: "Premium portfolio builds and landing pages with modern design and animations.",
    tags: ["React", "Framer Motion", "TailwindCSS"],
    icon: Smartphone,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="orb orb-purple w-96 h-96 -top-48 left-1/4 opacity-20" />
        <div className="orb orb-cyan w-80 h-80 bottom-0 right-0 opacity-20" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-4">PROJECTS</p>
          <h2 className="section-title">
            Things I've <span className="text-gradient">Built</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            From student platforms to content systems — building tools that make a difference.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`glass-card p-6 rounded-2xl group relative overflow-hidden ${
                project.featured ? "md:col-span-2 border-primary/30" : ""
              }`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <project.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.featured && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Visit Live Site
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
