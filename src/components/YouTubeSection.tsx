import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import CountUp from "react-countup";
import { Youtube, Users, Eye, Video, Bell } from "lucide-react";

type YTData = {
  channel: {
    title: string;
    subscribers: string;
    totalViews: string;
    totalVideos: string;
  };
  recentVideos: {
    id: string;
    title: string;
    thumbnail: string;
    views: string;
    url: string;
  }[];
};

const YouTubeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<YTData | null>(null);

  useEffect(() => {
    const fetchYT = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/youtube");
        const json = await res.json();
        setData(json);
      } catch (e) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchYT();
  }, []);

  const stats = useMemo(() => {
    const subs = Number(data?.channel?.subscribers || 0);
    const views = Number(data?.channel?.totalViews || 0);
    const videos = Number(data?.channel?.totalVideos || 0);

    return [
      { icon: Users, label: "Subscribers", value: subs, color: "text-red-500" },
      { icon: Eye, label: "Total Views", value: views, color: "text-blue-400" },
      { icon: Video, label: "Videos", value: videos, color: "text-green-400" },
    ];
  }, [data]);

  return (
    <section id="youtube" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
      <div className="absolute inset-0">
        <div className="orb orb-pink w-80 h-80 top-20 -right-40 opacity-20" />
        <div className="orb orb-purple w-64 h-64 bottom-20 -left-32 opacity-20" />
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
            <Youtube className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium">YOUTUBE DASHBOARD</span>
          </motion.div>

          <h2 className="section-title">
            <span className="text-gradient">Shubham</span> Speaks
          </h2>

          <p className="section-subtitle mx-auto mt-4">
            Live stats + latest videos from my YouTube channel 🚀
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card-glow p-6 rounded-2xl text-center"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />

              <p className="text-3xl sm:text-4xl font-bold text-foreground">
                {loading ? (
                  <span className="opacity-60">---</span>
                ) : (
                  isInView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                    />
                  )
                )}
              </p>

              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold text-foreground text-center mb-8">
            Recent Videos
          </h3>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card rounded-xl overflow-hidden">
                  <div className="aspect-video bg-white/5 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-4/5 bg-white/5 rounded animate-pulse" />
                    <div className="h-3 w-2/5 bg-white/5 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {(data?.recentVideos || []).slice(0, 3).map((video, index) => (
                <motion.a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="glass-card rounded-xl overflow-hidden group cursor-pointer block"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                        <Youtube className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-foreground line-clamp-2 mb-1">
                      {video.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {Number(video.views).toLocaleString()} views
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://www.youtube.com/@shubhamspeaks03"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 bg-red-600 hover:bg-red-700"
            style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}
          >
            <Youtube size={20} />
            Visit Channel
          </a>

          <a
            href="https://www.youtube.com/@shubhamspeaks03?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            <Bell size={18} />
            Subscribe
          </a>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          
        </motion.p>
      </div>
    </section>
  );
};

export default YouTubeSection;
