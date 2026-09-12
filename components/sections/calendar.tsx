"use client";

import { Heart } from "lucide-react";

import { CalendarActions } from "@/components/calendar-actions";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SectionPhoto } from "@/components/section-photo";
import { WEDDING, WEEKDAYS } from "@/lib/constants";

export function Calendar() {
  const y = WEDDING.calendarYear;
  const m = WEDDING.calendarMonth;
  const day = WEDDING.calendarDay;

  // Monday-first grid for the wedding month
  const firstWeekday = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <section id="calendar" className="relative bg-surface-alt py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Ամսաթիվ" title={WEDDING.calendarMonthLabel} />

        <Reveal className="mx-auto mt-12 max-w-md" delay={0.1}>
          <div className="glass-panel rounded-3xl p-5 sm:p-8">
            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((w) => (
                <div
                  key={w}
                  className="pb-3 text-[10px] font-medium uppercase tracking-wide text-gold sm:text-xs"
                >
                  {w}
                </div>
              ))}
              {cells.map((d, i) => (
                <div
                  key={i}
                  className="relative flex aspect-square items-center justify-center text-sm sm:text-base"
                >
                  {d === day ? (
                    <>
                      <Heart
                        className="absolute h-9 w-9 fill-white text-gold/60 drop-shadow-[0_2px_7px_rgba(185,147,90,0.4)] sm:h-12 sm:w-12"
                        strokeWidth={1.1}
                      />
                      <span className="relative z-10 font-serif font-semibold text-night">
                        {d}
                      </span>
                    </>
                  ) : d ? (
                    <span className="text-ink/70">{d}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.15}>
          <CalendarActions />
        </Reveal>

        <SectionPhoto src="/photos/p7.jpg" />
      </div>
    </section>
  );
}
