"use client";

import { Monogram } from "@/components/monogram";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { SectionPhoto } from "@/components/section-photo";
import type { NoteContent } from "@/lib/constants";

/**
 * Elegant centered "note" section — a heartfelt line framed by the monogram,
 * with a clear couple photo beneath it.
 */
export function NoteSection({
  note,
  tone = "ivory",
}: {
  note: NoteContent;
  tone?: "ivory" | "alt";
}) {
  return (
    <section
      id={note.id}
      className={`relative py-24 sm:py-32 ${
        tone === "alt" ? "bg-surface-alt" : "bg-ivory"
      }`}
    >
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Monogram className="mx-auto mb-8 h-14 w-14" />
          <p className="eyebrow mb-5">{note.eyebrow}</p>
        </Reveal>
        <p className="mx-auto max-w-2xl text-balance text-center font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl md:text-4xl">
          <SplitText text={note.text} by="word" stagger={0.06} />
        </p>
        <Reveal className="mx-auto max-w-2xl">
          <div className="divider-gold mt-9" />
        </Reveal>

        <SectionPhoto src={note.bg} />
      </div>
    </section>
  );
}
