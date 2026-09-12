"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { useMounted } from "@/hooks/use-mounted";

interface Particle {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = (i + 3) * 7507;
    const rand = (n: number) => ((seed * (n + 5)) % 991) / 991;
    return {
      left: rand(1) * 100,
      top: rand(2) * 100,
      size: 2 + rand(3) * 4,
      duration: 4 + rand(4) * 6,
      delay: rand(5) * 6,
    };
  });
}

/**
 * Floating golden light particles for hero/ambient backgrounds.
 * Absolutely positioned within the nearest relative parent.
 */
export function Particles({ count = 22 }: { count?: number }) {
  const mounted = useMounted();
  const particles = useMemo(() => makeParticles(count), [count]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            filter: "blur(0.5px)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [0, -30, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
