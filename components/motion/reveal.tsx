"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 40;

function getVariants(direction: Direction): Variants {
  const map: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: OFFSET },
    down: { x: 0, y: -OFFSET },
    left: { x: OFFSET, y: 0 },
    right: { x: -OFFSET, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = map[direction];

  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  /** Render as a different element while keeping motion behaviour. */
  as?: "div" | "section" | "li" | "span";
}

/**
 * Scroll-reveal wrapper. Fades + slides its children into view once,
 * when the element nears the viewport. Uses a ref-based `useInView` for
 * reliable triggering (whileInView could leave content stuck hidden).
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref as never}
      className={cn(className)}
      variants={getVariants(direction)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
