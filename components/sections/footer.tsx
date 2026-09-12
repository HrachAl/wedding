"use client";

import { MonogramDraw } from "@/components/monogram-draw";
import { Reveal } from "@/components/motion/reveal";
import { WEDDING } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night py-20 text-center text-white sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(185,147,90,0.18),_transparent_65%)]" />
      <Reveal className="container relative">
        <MonogramDraw className="mx-auto mb-10 h-20 w-20" />
        <p className="font-serif text-2xl font-light italic text-champagne sm:text-3xl">
          {WEDDING.footerNote}
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-lg">🤍</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <h3 className="mt-8 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
          {WEDDING.groom}{" "}
          <span className="text-gold">🤍</span> {WEDDING.bride}
        </h3>

        <p className="mt-10 text-xs uppercase tracking-widest text-white/40">
          {WEDDING.dateLabel}
        </p>
      </Reveal>
    </footer>
  );
}
