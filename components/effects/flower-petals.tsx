"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { useMounted } from "@/hooks/use-mounted";

interface Petal {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  hue: string;
}

/**
 * Deterministic pseudo-random generator so SSR/CSR markup never diverges
 * before mount. Seeded by index.
 */
function makePetals(count: number): Petal[] {
  const hues = ["#f5ead9", "#f3dcc4", "#e9c9a3", "#d4b483"];
  return Array.from({ length: count }, (_, i) => {
    const seed = (i + 1) * 9301;
    const rand = (n: number) => ((seed * (n + 7)) % 997) / 997;
    return {
      left: rand(1) * 100,
      size: 10 + rand(2) * 16,
      duration: 12 + rand(3) * 12,
      delay: rand(4) * 12,
      drift: (rand(5) - 0.5) * 160,
      rotate: rand(6) * 360,
      hue: hues[i % hues.length],
    };
  });
}

/**
 * Soft flower petals drifting down the screen. Pointer-events disabled so
 * the layer never interferes with interaction. Hidden for reduced-motion users.
 */
export function FlowerPetals({ count = 14 }: { count?: number }) {
  const mounted = useMounted();
  const petals = useMemo(() => makePetals(count), [count]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden motion-reduce:hidden"
    >
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-[-8%] block rounded-[60%_40%_55%_45%]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${p.hue} 70%)`,
            opacity: 0.7,
          }}
          initial={{ y: "-10vh", x: 0, rotate: p.rotate, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, p.drift, p.drift * 0.5],
            rotate: p.rotate + 280,
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
