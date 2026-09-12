"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface ParallaxValues {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Pointer + device-orientation parallax. Returns smoothed motion values in the
 * range roughly [-strength, strength] that you can map onto layer offsets.
 * No-ops for users who prefer reduced motion.
 */
export function useParallax(strength = 20): ParallaxValues {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const onMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(nx * strength);
      rawY.set(ny * strength);
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      rawX.set((Math.max(-45, Math.min(45, e.gamma)) / 45) * strength);
      rawY.set((Math.max(-45, Math.min(45, e.beta - 45)) / 45) * strength);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("deviceorientation", onOrient);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, [rawX, rawY, strength]);

  return { x, y };
}
