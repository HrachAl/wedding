"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

import { FlowerPetals } from "@/components/effects/flower-petals";
import { Particles } from "@/components/effects/particles";
import { ParticleText } from "@/components/motion/particle-text";
import { ScratchReveal } from "@/components/motion/scratch-reveal";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { useCountdown } from "@/hooks/use-countdown";
import { BLUR } from "@/lib/blur";
import { WEDDING } from "@/lib/constants";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const UNITS = [
  { key: "days", label: "Օր" },
  { key: "hours", label: "Ժամ" },
  { key: "minutes", label: "Րոպե" },
  { key: "seconds", label: "Վրկ" },
] as const;

function pad(v: number) {
  return v.toString().padStart(2, "0");
}

function HeroCountdown() {
  const timeLeft = useCountdown(WEDDING.dateISO);
  if (timeLeft?.isComplete) {
    return (
      <p className="text-center font-serif text-2xl text-gold">Այսօր է մեր օրը 🎉</p>
    );
  }
  return (
    <div className="flex items-stretch justify-center gap-2.5 sm:gap-4">
      {UNITS.map((unit) => {
        const value = timeLeft ? timeLeft[unit.key] : 0;
        return (
          <Tilt3D
            key={unit.key}
            max={16}
            className="min-w-[64px] rounded-2xl sm:min-w-[76px]"
          >
            <div className="glass-panel flex h-full flex-col items-center rounded-2xl px-3 py-3 sm:py-4">
              <div className="relative h-[1.1em] overflow-hidden font-serif text-3xl font-semibold tabular-nums leading-none text-ink sm:text-4xl">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={value}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {pad(value)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mt-1.5 text-[10px] uppercase tracking-widest text-gold sm:text-xs">
                {unit.label}
              </span>
            </div>
          </Tilt3D>
        );
      })}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-24"
    >
      {/* Background photo */}
      <Image
        src="/photos/hero.jpg"
        alt="Հրաչ և Լիդա"
        fill
        priority
        sizes="100vw"
        quality={86}
        placeholder="blur"
        blurDataURL={BLUR["/photos/hero.jpg"]}
        className="animate-kenburns object-cover object-[50%_20%] sm:object-[50%_28%]"
      />
      {/* Veil for text legibility — theme-adaptive: light cream in light mode, dark in dark mode */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--scrim) / 0.72) 0%, hsl(var(--scrim) / 0.5) 35%, hsl(var(--scrim) / 0.55) 65%, hsl(var(--scrim) / 0.82) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 46%, hsl(var(--scrim) / 0.75) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0">
        <Particles count={22} />
      </div>
      <FlowerPetals count={10} />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container relative z-20 flex flex-col items-center text-center"
      >
        <motion.p variants={item} className="eyebrow mb-5 sm:mb-6">
          Մեր հարսանիքը
        </motion.p>

        <h1 className="font-serif text-6xl font-medium leading-none tracking-tightest text-ink sm:text-7xl md:text-8xl">
          <ParticleText text={WEDDING.groom} delay={0.15} />
        </h1>

        <motion.div variants={item} className="my-3 flex items-center gap-5 sm:my-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold sm:w-20" />
          <motion.span
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart
              className="h-7 w-7 fill-white text-gold/50 drop-shadow-[0_2px_6px_rgba(185,147,90,0.35)] sm:h-9 sm:w-9"
              strokeWidth={1.2}
            />
          </motion.span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold sm:w-20" />
        </motion.div>

        <h1 className="font-serif text-6xl font-medium leading-none tracking-tightest text-ink sm:text-7xl md:text-8xl">
          <ParticleText text={WEDDING.bride} delay={0.45} />
        </h1>

        {/* Date — scratch the gold heart to reveal it (no time) */}
        <motion.div variants={item} className="mt-5 flex flex-col items-center">
          <ScratchReveal
            shape="heart"
            className="h-[170px] w-[250px] sm:h-[190px] sm:w-[280px]"
            hint="Ջնջիր"
            threshold={0.42}
          >
            <p className="px-6 text-center font-serif text-xl font-semibold text-gold sm:text-2xl">
              {WEDDING.dateLabel}
            </p>
          </ScratchReveal>
          <p className="-mt-1 text-sm font-medium tracking-wide text-ink/70">
            Ջնջիր սիրտը՝ ամսաթիվը տեսնելու համար
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div variants={item} className="mt-8 w-full">
          <HeroCountdown />
        </motion.div>
      </motion.div>
    </section>
  );
}
