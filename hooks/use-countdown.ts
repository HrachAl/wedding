"use client";

import { useEffect, useState } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function calculate(target: number): TimeLeft {
  const diff = target - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isComplete: false,
  };
}

/**
 * Live countdown to a target ISO date. Updates every second on the client.
 * Returns null until mounted to avoid hydration mismatches.
 */
export function useCountdown(targetISO: string): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(targetISO).getTime();

    setTimeLeft(calculate(target));
    const interval = setInterval(() => {
      setTimeLeft(calculate(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetISO]);

  return timeLeft;
}
