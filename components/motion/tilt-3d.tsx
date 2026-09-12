"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

interface Tilt3DProps {
  children: ReactNode;
  /** Applied to the outer box — put sizing + border-radius here. */
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Hover/press scale. */
  scale?: number;
  /** Show the moving light glare. */
  glare?: boolean;
}

/**
 * Wraps content in an interactive 3D card that tilts toward the pointer (and to
 * the phone's gyroscope on mobile), with a soft light glare that tracks the
 * cursor. Spring-smoothed. Honors prefers-reduced-motion (stays flat).
 */
export function Tilt3D({
  children,
  className,
  max = 12,
  scale = 1.03,
  glare = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const spring = { stiffness: 150, damping: 16 };
  const srx = useSpring(rx, spring);
  const sry = useSpring(ry, spring);
  const sgx = useSpring(gx, { stiffness: 150, damping: 22 });
  const sgy = useSpring(gy, { stiffness: 150, damping: 22 });
  const glareBg = useTransform(
    [sgx, sgy],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.28), transparent 55%)`
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry.set(px * max);
      rx.set(-py * max);
      gx.set((px + 0.5) * 100);
      gy.set((py + 0.5) * 100);
    };
    const onLeave = () => {
      rx.set(0);
      ry.set(0);
      gx.set(50);
      gy.set(50);
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const g = Math.max(-30, Math.min(30, e.gamma)) / 30;
      const b = Math.max(-30, Math.min(30, e.beta - 45)) / 30;
      ry.set(g * max);
      rx.set(-b * max);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("deviceorientation", onOrient);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, [max]);

  return (
    <div ref={ref} className={className} style={{ perspective: 800 }}>
      <motion.div
        className="relative h-full w-full"
        style={{
          rotateX: srx,
          rotateY: sry,
          transformStyle: "preserve-3d",
          borderRadius: "inherit",
        }}
        whileHover={{ scale }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: glareBg,
              borderRadius: "inherit",
              mixBlendMode: "overlay",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
