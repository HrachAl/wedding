"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { STORY } from "@/lib/constants";

export function Story() {
  return (
    <section id="story" className="relative bg-ivory py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Մեր պատմությունը" title="Ինչպես ամեն ինչ սկսվեց" />

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="relative border-l border-gold/30 pl-8 sm:pl-12">
            {STORY.map((item, i) => (
              <Reveal
                key={item.date}
                direction="right"
                delay={i * 0.08}
                className="relative pb-12 last:pb-0"
              >
                {/* Node */}
                <span className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center sm:-left-[53px]">
                  <span className="absolute h-4 w-4 rounded-full bg-gold/20" />
                  <span className="h-2 w-2 rounded-full bg-gold-gradient" />
                </span>

                <p className="font-serif text-lg text-gold">{item.date}</p>
                <h3 className="mt-1 font-serif text-2xl font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/70">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
