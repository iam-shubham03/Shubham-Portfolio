import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  life: number; // 1 -> 0
  size: number;
};

type Ripple = {
  id: number;
  x: number;
  y: number;
  life: number; // 1 -> 0
  size: number; // grows
};

export default function CursorAura() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [ringPos, setRingPos] = useState({ x: -999, y: -999 });
  const [active, setActive] = useState(false);

  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number | null>(null);

  const idRef = useRef(0);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    let last = { x: -999, y: -999 };

    const onMove = (e: MouseEvent) => {
      setActive(true);
      const x = e.clientX;
      const y = e.clientY;

      setPos({ x, y });

      // spawn subtle particles only when movement is real
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 6) {
        particlesRef.current.push({
          id: idRef.current++,
          x,
          y,
          life: 1,
          size: Math.max(3.2, Math.min(7.5, dist / 6)),
        });

        // keep particle list small for performance
        if (particlesRef.current.length > 90) {
          particlesRef.current.splice(0, particlesRef.current.length - 95);
        }
      }

      last = { x, y };
    };

    const onClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      ripplesRef.current.push({
        id: rippleIdRef.current++,
        x,
        y,
        life: 1,
        size: 12,
      });

      // keep ripple list tiny
      if (ripplesRef.current.length > 6) {
        ripplesRef.current.splice(0, ripplesRef.current.length - 6);
      }
    };

    const onLeave = () => {
      setActive(false);
      setPos({ x: -999, y: -999 });
      setRingPos({ x: -999, y: -999 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("mouseleave", onLeave);

    // smooth ring follow + particle fade
    const animate = () => {
      setRingPos((prev) => {
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        return {
          x: lerp(prev.x, pos.x, 0.14),
          y: lerp(prev.y, pos.y, 0.14),
        };
      });

      // fade particles
      particlesRef.current = particlesRef.current
        .map((p) => ({ ...p, life: p.life - 0.045 }))
        .filter((p) => p.life > 0);

      // ripple expand + fade
      ripplesRef.current = ripplesRef.current
        .map((r) => ({
          ...r,
          life: r.life - 0.04,
          size: r.size + 2.6,
        }))
        .filter((r) => r.life > 0);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos.x, pos.y]);

  const particles = particlesRef.current;
  const ripples = ripplesRef.current;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {/* subtle glow */}
      <div
        style={{
          transform: `translate(${pos.x - 170}px, ${pos.y - 170}px)`,
          opacity: active ? 1 : 0,
        }}
        className="absolute w-[340px] h-[340px] rounded-full blur-3xl transition-opacity duration-200"
      >
        <div className="w-full h-full rounded-full bg-primary/8" />
      </div>

      {/* click ripple waves */}
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{
            transform: `translate(${r.x - r.size / 2}px, ${r.y - r.size / 2}px)`,
            width: r.size,
            height: r.size,
            opacity: r.life * 0.6,
          }}
          className="absolute rounded-full border border-primary/40"
        />
      ))}

      {/* dotted ring (antigravity vibe) */}
      <div
        style={{
          transform: `translate(${ringPos.x - 24}px, ${ringPos.y - 24}px)`,
          opacity: active ? 1 : 0,
        }}
        className="absolute w-12 h-12 rounded-full transition-opacity duration-200"
      >
        {/* ring base */}
        <div className="absolute inset-0 rounded-full border border-primary/15 backdrop-blur-sm" />

        {/* dots around ring */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          const radius = 22;
          const x = 24 + Math.cos(angle) * radius;
          const y = 24 + Math.sin(angle) * radius;

          return (
            <div
              key={i}
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                opacity: 0.55,
              }}
              className="absolute w-[3px] h-[3px] rounded-full bg-primary"
            />
          );
        })}
      </div>

      {/* inner dot */}
      <div
        style={{
          transform: `translate(${pos.x - 3}px, ${pos.y - 3}px)`,
          opacity: active ? 1 : 0,
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-primary transition-opacity duration-200"
      />

      {/* dotted particles trail */}
{particles.map((p) => (
  <div
    key={p.id}
    style={{
      transform: `translate(${p.x - p.size / 2}px, ${p.y - p.size / 2}px)`,
      width: p.size,
      height: p.size,
      opacity: p.life * 0.55,
    }}
    className="absolute rounded-full bg-primary/70 blur-[0.6px]"
  />
))}
    </div>
  );
}
