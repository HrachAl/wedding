"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { WEDDING } from "@/lib/constants";

/**
 * A full-width statement band where the couple's names are cut out as a mask —
 * the living couple photo shows *through* the letterforms and slowly pans as
 * you scroll. A premium, magazine-style moment.
 */
export function NamesBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ivory py-24 sm:py-32"
    >
      <div className="container flex flex-col items-center text-center">
        <p className="eyebrow mb-6">Միասին ընդմիշտ</p>
        <motion.h2
          aria-label={`${WEDDING.groom} & ${WEDDING.bride}`}
          className="font-serif text-[18vw] font-semibold leading-[0.9] tracking-tightest sm:text-8xl md:text-9xl"
          style={{
            backgroundImage: "url(/photos/hero.jpg)",
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundPositionY: bgY,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          }}
        >
          {WEDDING.groom}
          <span className="mx-2 align-middle">&</span>
          {WEDDING.bride}
        </motion.h2>
        <p className="mt-8 text-base tracking-[0.4em] text-gold sm:text-lg">
          07 · 10 · 2026
        </p>
      </div>
    </section>
  );
}
