import { motion } from "framer-motion";
import { Youtube, Linkedin, Instagram, Mail, Heart, Zap } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { icon: Youtube, href: "https://youtube.com/@shubhamspeaks03" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/iamshubham03" },
  { icon: Instagram, href: "https://www.instagram.com/shubham___speaks" },
  { icon: Mail, href: "itsshubham157@gmail.com" },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="orb orb-purple w-64 h-64 -bottom-32 left-1/4 opacity-10" />
        <div className="orb orb-cyan w-48 h-48 -bottom-24 right-1/3 opacity-10" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-xl mb-4">
              <span className="text-gradient">Shubham</span> Kumar
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              "Engineering + Content + Building"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              © {new Date().getFullYear()} Shubham Kumar — Built with passion 
              <Zap className="w-4 h-4 text-primary" />
            </p>
            
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
