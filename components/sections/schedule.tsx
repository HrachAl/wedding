"use client";

import { motion, useInView } from "framer-motion";
import { Church, Home, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

import { SectionHeading } from "@/components/section-heading";
import { SCHEDULE, type ScheduleItem } from "@/lib/constants";

const ICONS: Record<ScheduleItem["icon"], LucideIcon> = {
  home: Home,
  church: Church,
  restaurant: UtensilsCrossed,
};

export function Schedule() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section id="schedule" className="relative bg-ivory py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Օրվա ընթացքը" title="Ծրագիր" />

        <div ref={ref} className="relative mx-auto mt-16 max-w-2xl">
          {/* Vertical timeline line — draws itself top→bottom */}
          <motion.div
            aria-hidden
            className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold/10 via-gold/50 to-gold/10 sm:left-1/2 sm:-translate-x-1/2"
            style={{ originY: 0 }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-10">
            {SCHEDULE.map((item, i) => {
              const Icon = ICONS[item.icon];
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, x: isLeft ? 44 : -44 }}
                  animate={
                    inView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: isLeft ? 44 : -44 }
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className={`relative flex items-center gap-6 sm:gap-0 ${
                      isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Icon node */}
                    <motion.div
                      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white bg-gold-gradient text-white shadow-soft sm:absolute sm:left-1/2 sm:-translate-x-1/2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                        delay: 0.45 + i * 0.16,
                      }}
                    >
                      {/* Pulsing radar ring */}
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-gold/60"
                        animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.8 + i * 0.35,
                        }}
                      />
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </motion.div>

                    {/* Card */}
                    <div
                      className={`glass-panel flex-1 rounded-2xl p-6 transition-shadow duration-300 hover:shadow-glass sm:max-w-[44%] ${
                        isLeft ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                      }`}
                    >
                      <p className="font-serif text-2xl font-medium text-gold">
                        {item.time}
                      </p>
                      <p className="mt-1 text-ink/80">{item.title}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
