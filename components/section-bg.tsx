"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { BLUR } from "@/lib/blur";

/**
 * Couple photo behind a section: blur-up loading, gentle scroll parallax
 * (moves slower than the content for depth) and a theme-aware veil so the
 * content stays readable. Decorative only.
 */
export function SectionBg({
  src,
  intensity = "normal",
}: {
  src: string;
  intensity?: "normal" | "strong";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const blur = BLUR[src];

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[9%] h-[118%]">
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          quality={82}
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur}
          className="object-cover"
        />
      </motion.div>
      <div
        className={`absolute inset-0 ${
          intensity === "strong" ? "section-scrim-strong" : "section-scrim"
        }`}
      />
    </div>
  );
}
