"use client";

import { useEffect, useRef } from "react";

interface ParticleTextProps {
  text: string;
  /** Typography/colour classes for the crisp final text (also defines size). */
  className?: string;
  /** Seconds before the particles begin assembling. */
  delay?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const PALETTE = ["#d4b483", "#b9935a", "#e9d6ad", "#caa86a", "#ffffff"];
const DURATION = 1000; // assembly time (ms)

interface P {
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  d: number;
  c: string;
  r: number;
}

/**
 * Renders text whose glyphs assemble out of a swarm of golden particles that
 * fly in from the centre, then settle into a faint shimmer while a crisp,
 * perfectly legible copy of the text fades in underneath. The particle target
 * points are sampled from the *inherited* font so it matches the surrounding
 * typography exactly. Respects prefers-reduced-motion (shows text instantly).
 */
export function ParticleText({ text, className, delay = 0 }: ParticleTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const textEl = textRef.current;
    if (!wrap || !canvas || !textEl) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: P[] = [];
    let start = 0;
    let raf = 0;
    let cancelled = false;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Mirror the visible text's resolved font to get pixel-accurate targets.
      const cs = getComputedStyle(textEl);
      const fontPx = parseFloat(cs.fontSize) || 64;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${cs.fontWeight} ${fontPx}px ${cs.fontFamily}`;
      ctx.fillText(text, w / 2, h / 2);

      const stride = w * dpr;
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      ctx.clearRect(0, 0, w, h);

      const gap = w < 360 ? 4 : 3;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const idx =
            (Math.floor(y * dpr) * stride + Math.floor(x * dpr)) * 4 + 3;
          if (img[idx] > 128) pts.push({ x, y });
        }
      }

      particles = pts.map((p, i) => {
        const ang = ((i * 137.5) * Math.PI) / 180; // golden-angle, deterministic
        const radMax = Math.max(80, w * 0.55);
        const rad = 50 + ((i * 53) % Math.round(radMax));
        return {
          tx: p.x,
          ty: p.y,
          sx: w / 2 + Math.cos(ang) * rad,
          sy: h / 2 + Math.sin(ang) * rad * 0.7,
          d: ((i % 40) / 40) * 350,
          c: PALETTE[i % PALETTE.length],
          r: 0.8 + (((i * 7) % 10) / 10) * 1.0,
        };
      });
    };

    const draw = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      const rect = wrap.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const local = Math.max(0, Math.min(1, (t - p.d) / DURATION));
        const e = easeOutCubic(local);
        const x = p.sx + (p.tx - p.sx) * e;
        const y = p.sy + (p.ty - p.sy) * e;
        const shimmer = local >= 1 ? Math.sin(t / 600 + i) * 0.4 : 0;
        ctx.globalAlpha = Math.min(1, local * 1.4);
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(x + shimmer, y + shimmer, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (t < DURATION + 1100) {
        raf = requestAnimationFrame(draw);
      } else {
        canvas.style.transition = "opacity 1.2s ease";
        canvas.style.opacity = "0.35"; // settle into a faint sparkle layer
      }
    };

    const run = () => {
      build();
      if (reduced) {
        textEl.style.opacity = "1";
        return;
      }
      start = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
      textEl.style.transition = "opacity 0.7s ease";
      window.setTimeout(() => {
        textEl.style.opacity = "1";
      }, DURATION * 0.4);
    };

    const begin = () => {
      if (cancelled) return;
      window.setTimeout(run, delay * 1000);
    };

    const fonts = (document as unknown as { fonts?: { ready: Promise<unknown> } })
      .fonts;
    if (fonts?.ready) fonts.ready.then(begin);
    else begin();

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [text, delay]);

  return (
    <span ref={wrapRef} className="relative inline-block align-bottom">
      <span ref={textRef} className={className} style={{ opacity: 0 }}>
        {text}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      />
    </span>
  );
}
