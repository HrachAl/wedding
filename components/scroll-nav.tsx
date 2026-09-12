"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Սկիզբ" },
  { id: "welcome", label: "Հրավեր" },
  { id: "calendar", label: "Ամսաթիվ" },
  { id: "schedule", label: "Ծրագիր" },
  { id: "location", label: "Վայրեր" },
  { id: "rsvp", label: "Հաստատում" },
];

export function ScrollNav() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top scroll-progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gold-gradient"
      />

      {/* Side dot navigation (desktop) */}
      <nav
        aria-label="Բաժիններ"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              className="group relative flex items-center"
            >
              <span
                className={`block rounded-full border border-gold transition-all duration-300 ${
                  isActive
                    ? "h-3 w-3 bg-gold"
                    : "h-2.5 w-2.5 bg-transparent group-hover:bg-gold/40"
                }`}
              />
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-full bg-[var(--glass-bg)] px-3 py-1 text-xs tracking-wide text-ink opacity-0 shadow-glass backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                {label}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
