"use client";

import { motion, useInView } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text: string;
  by?: "word" | "letter";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Reveals text word-by-word or letter-by-letter, each part rising from a
 * clipped baseline. Uses a ref-based `useInView` for reliable triggering.
 * Once the reveal finishes the clip is removed so tall/low parts of the
 * glyphs (common in Armenian) are never cut off. Accessible via aria-label.
 */
export function SplitText({
  text,
  by = "word",
  className,
  delay = 0,
  stagger = 0.05,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const parts = by === "letter" ? Array.from(text) : text.split(" ");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const totalMs = (delay + parts.length * stagger + 0.8) * 1000;
    const t = setTimeout(() => setRevealed(true), totalMs);
    return () => clearTimeout(t);
  }, [inView, delay, stagger, parts.length]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {parts.map((part, i) => {
        // Preserve spaces between words/letters OUTSIDE the clipped box,
        // otherwise overflow-hidden trims trailing whitespace and the words
        // run together.
        if (part === " ") {
          return (
            <span key={i} aria-hidden>
              {" "}
            </span>
          );
        }
        return (
          <Fragment key={i}>
            <span
              aria-hidden
              className="inline-block align-bottom"
              style={{
                lineHeight: 1.15,
                // Clip only while animating; show full glyphs once revealed.
                overflow: revealed ? "visible" : "hidden",
                paddingBottom: "0.12em",
              }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "120%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : { y: "120%", opacity: 0 }}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                  delay: delay + i * stagger,
                }}
              >
                {part}
              </motion.span>
            </span>
            {by === "word" && i < parts.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
