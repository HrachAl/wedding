"use client";

import { Monogram } from "@/components/monogram";
import { Reveal } from "@/components/motion/reveal";
import { OrnamentDivider } from "@/components/ornament-divider";
import { SectionPhoto } from "@/components/section-photo";
import { WELCOME } from "@/lib/constants";

export function Welcome() {
  return (
    <section id="welcome" className="relative bg-ivory py-24 sm:py-32">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Monogram className="mx-auto mb-8 h-14 w-14" />
          <p className="eyebrow mb-6">{WELCOME.eyebrow}</p>
          <p className="text-balance font-serif text-xl font-light leading-relaxed text-ink sm:text-2xl md:text-3xl">
            {WELCOME.text}
          </p>
          <OrnamentDivider className="mt-7 flex justify-center" />
        </Reveal>

        <SectionPhoto
          src="/photos/welcome.jpg"
          aspectClass="aspect-[3/4]"
          className="mx-auto mt-14 max-w-md sm:max-w-lg"
        />
      </div>
    </section>
  );
}
