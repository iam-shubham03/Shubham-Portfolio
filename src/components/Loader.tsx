import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingTexts = [
  "Initializing...",
  "Loading Projects...",
  "Syncing YouTube Stats...",
  "Almost Ready..."
];

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => {
        if (prev >= loadingTexts.length - 1) {
          clearInterval(textInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb orb-cyan w-96 h-96 -top-48 -left-48" />
        <div className="orb orb-purple w-80 h-80 top-1/2 right-0" />
        <div className="orb orb-pink w-64 h-64 bottom-0 left-1/3" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Spinning ring */}
        <div className="relative">
          <motion.div
            className="w-24 h-24 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: "hsl(199 89% 48%)",
              borderRightColor: "hsl(270 60% 55%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gradient">{progress}%</span>
          </div>
        </div>

        {/* Loading text */}
        <div className="h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-muted-foreground text-lg font-medium"
            >
              {loadingTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--gradient-neon)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Brand */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground mt-8"
        >
          <span className="text-gradient font-semibold">Shubham Kumar</span> • Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
