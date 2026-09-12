"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionBg } from "@/components/section-bg";
import { SectionHeading } from "@/components/section-heading";
import { DRESS_CODE } from "@/lib/constants";

export function DressCode() {
  return (
    <section
      id="dresscode"
      className="relative overflow-hidden bg-surface-alt py-24 sm:py-32"
    >
      <SectionBg src="/photos/p5.jpg" />
      <div className="container relative z-10">
        <SectionHeading eyebrow="Տոնական տեսք" title={DRESS_CODE.title} />

        <Reveal className="mx-auto mt-10 max-w-xl text-center" delay={0.1}>
          <p className="leading-relaxed text-ink/70">
            {DRESS_CODE.description}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-xl flex-wrap items-end justify-center gap-6">
          {DRESS_CODE.palette.map((color, i) => (
            <Reveal
              key={color.name}
              direction="up"
              delay={i * 0.07}
              className="flex flex-col items-center gap-3"
            >
              <span
                className="h-16 w-16 rounded-full shadow-soft ring-1 ring-black/5 transition-transform duration-500 hover:scale-110 sm:h-20 sm:w-20"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs uppercase tracking-widest text-ink/60">
                {color.name}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
