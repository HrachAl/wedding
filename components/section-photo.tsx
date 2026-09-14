"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { BLUR } from "@/lib/blur";

/**
 * A clear, framed couple photo shown beneath a section's content. Cinematic:
 * a slow Ken Burns zoom plus a gentle scroll-driven parallax. Blur-up loading.
 */
export function SectionPhoto({
  src,
  className,
  aspectClass = "aspect-[16/10]",
}: {
  src: string;
  className?: string;
  aspectClass?: string;
}) {
  const blur = BLUR[src];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <Reveal className={className ?? "mx-auto mt-16 max-w-3xl"}>
      <Tilt3D max={9} scale={1.02} className="rounded-3xl">
        <div
          ref={ref}
          className={`relative ${aspectClass} w-full overflow-hidden rounded-3xl border-[3px] border-ivory shadow-soft ring-1 ring-gold/15`}
        >
          <motion.div style={{ y }} className="absolute inset-[-9%]">
            <Image
              src={src}
              alt="Հրաչ և Լիդա"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              quality={86}
              placeholder={blur ? "blur" : "empty"}
              blurDataURL={blur}
              className="animate-kenburns object-cover"
            />
          </motion.div>
          {/* subtle gold vignette for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              boxShadow: "inset 0 0 60px rgba(120,90,50,0.12)",
            }}
          />
        </div>
      </Tilt3D>
    </Reveal>
  );
}
