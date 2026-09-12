"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const SIZE = 320;

/**
 * Soft gold glow that trails the cursor. Desktop (fine pointer) only — hidden
 * on touch and for reduced-motion users.
 */
export function CursorGlow() {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.5 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, rgba(185,147,90,0.18) 0%, rgba(185,147,90,0.08) 35%, transparent 70%)",
      }}
      className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full mix-blend-plus-lighter"
    />
  );
}
