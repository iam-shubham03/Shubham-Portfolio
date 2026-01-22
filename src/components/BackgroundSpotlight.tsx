import { useEffect, useState } from "react";

export default function BackgroundSpotlight() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      setActive(true);
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onLeave = () => {
      setActive(false);
      setPos({ x: -999, y: -999 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
      {/* This overlay ONLY enhances existing background grid lines */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-200"
        style={{
          opacity: active ? 1 : 0,
          // spotlight reveal around cursor
          WebkitMaskImage: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 70%)`,
          maskImage: `radial-gradient(220px circle at ${pos.x}px ${pos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 70%)`,
        }}
      >
        {/* Grid highlight layer */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </div>
  );
}
