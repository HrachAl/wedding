"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Monogram «Հ ❤ Լ» whose rings draw themselves and whose letters fade in when
 * it scrolls into view. Used as the footer flourish.
 */
export function MonogramDraw({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Հրաչ և Լիդա"
      className={cn("h-20 w-20", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      <defs>
        <linearGradient id="mono-draw-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7cfa0" />
          <stop offset="50%" stopColor="#b9935a" />
          <stop offset="100%" stopColor="#9a7740" />
        </linearGradient>
      </defs>

      <motion.circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke="url(#mono-draw-gold)"
        strokeWidth="1.4"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.9 } }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke="url(#mono-draw-gold)"
        strokeWidth="0.6"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.55 } }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
      />

      <motion.g
        variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.6, delay: 1.1 }}
        style={{ transformOrigin: "center" }}
      >
        <text
          x="34"
          y="74"
          textAnchor="middle"
          fontFamily="var(--font-serif), Georgia, serif"
          fontSize="46"
          fontWeight="600"
          fill="url(#mono-draw-gold)"
        >
          Հ
        </text>
        <text
          x="86"
          y="74"
          textAnchor="middle"
          fontFamily="var(--font-serif), Georgia, serif"
          fontSize="46"
          fontWeight="600"
          fill="url(#mono-draw-gold)"
        >
          Լ
        </text>
        <path
          d="M60 64 c-3.4-4.2-9-3.1-9 1.7 c0 3.3 4.2 6.2 9 9.3 c4.8-3.1 9-6 9-9.3 c0-4.8-5.6-5.9-9-1.7 z"
          fill="url(#mono-draw-gold)"
        />
      </motion.g>
    </motion.svg>
  );
}
