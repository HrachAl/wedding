import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { OrnamentDivider } from "@/components/ornament-divider";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  className?: string;
}

/**
 * Centered section heading: eyebrow label, serif title that reveals
 * word-by-word, and a gold divider.
 */
export function SectionHeading({
  eyebrow,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)}>
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
      ) : null}
      <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-5xl">
        <SplitText text={title} by="word" stagger={0.08} />
      </h2>
      <OrnamentDivider className="mt-5 flex justify-center" />
    </div>
  );
}
