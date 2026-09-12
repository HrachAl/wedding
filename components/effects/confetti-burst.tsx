"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#b9935a", "#d4b483", "#e7cfa0", "#f5ead9", "#ffffff"];

/**
 * One-shot gold confetti / petal burst. Mount it to play (e.g. on RSVP
 * success). Pure transform animation, pointer-events disabled.
 */
export function ConfettiBurst({ count = 40 }: { count?: number }) {
  const bits = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = (i + 1) * 7919;
      const rand = (n: number) => ((seed * (n + 3)) % 1000) / 1000;
      const angle = rand(1) * Math.PI * 2;
      const dist = 90 + rand(2) * 240;
      const shape = i % 3; // 0 square, 1 ribbon, 2 circle
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 40,
        rot: rand(3) * 720 - 360,
        size: 6 + rand(4) * 9,
        delay: rand(5) * 0.18,
        duration: 1.5 + rand(6) * 0.9,
        color: COLORS[i % COLORS.length],
        shape,
      };
    });
  }, [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-visible"
    >
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{
            width: b.size,
            height: b.shape === 1 ? b.size * 0.45 : b.size,
            backgroundColor: b.color,
            borderRadius: b.shape === 2 ? "50%" : "1px",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            x: b.x,
            y: [b.y, b.y + 200],
            opacity: [1, 1, 0],
            rotate: b.rot,
            scale: [1, 1, 0.5],
          }}
          transition={{ duration: b.duration, delay: b.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
