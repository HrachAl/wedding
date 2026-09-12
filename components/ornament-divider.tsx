"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * A delicate gold filigree divider that draws itself when scrolled into view —
 * two mirrored flourishes meeting a small diamond at the centre.
 */
export function OrnamentDivider({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className={className ?? "flex justify-center py-2"}>
      <svg
        ref={ref}
        width="220"
        height="28"
        viewBox="0 0 220 28"
        fill="none"
        aria-hidden
        className="text-gold"
      >
        <motion.path
          d="M10 14 C 50 14, 70 6, 95 14 C 102 16, 104 16, 110 14"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
        <motion.path
          d="M210 14 C 170 14, 150 6, 125 14 C 118 16, 116 16, 110 14"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
        <motion.path
          d="M95 14 C 92 9, 92 19, 95 14"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
        <motion.path
          d="M125 14 C 128 9, 128 19, 125 14"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
        <motion.path
          d="M110 8 L 115 14 L 110 20 L 105 14 Z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.18"
          variants={draw}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />
      </svg>
    </div>
  );
}
