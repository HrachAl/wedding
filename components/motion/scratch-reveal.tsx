"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScratchRevealProps {
  /** Hidden content shown once the foil is scratched away. */
  children: ReactNode;
  className?: string;
  /** Shape of the scratchable foil. */
  shape?: "rect" | "heart";
  /** Text printed on the foil. */
  hint?: string;
  /** Fraction (0..1) of foil that must be cleared to auto-reveal. */
  threshold?: number;
  onComplete?: () => void;
}

/**
 * A lottery-style scratch card: the children (e.g. the wedding date) are
 * hidden under a gold foil that the guest scratches off with mouse / finger.
 * With shape="heart" the foil itself is a heart. Once enough is cleared the
 * rest fades away to reveal the content.
 */
export function ScratchReveal({
  children,
  className,
  shape = "heart",
  hint = "Ջնջիր",
  threshold = 0.5,
  onComplete,
}: ScratchRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const doneRef = useRef(false);
  const initialOpaqueRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const STRIDE = 4 * 24; // sample every 24th pixel

    const traceHeart = (cx: number, cy: number, w: number, h: number) => {
      // (cx, top) anchored heart — rounder lobes + a crisper lower point for
      // a more classic, elegant silhouette than a plain two-bézier heart.
      const top = cy - h / 2;
      const topCurve = h * 0.34;
      const lobeW = w * 0.52;
      ctx.beginPath();
      ctx.moveTo(cx, top + topCurve * 0.86);
      ctx.bezierCurveTo(
        cx - lobeW * 0.18,
        top - topCurve * 0.32,
        cx - lobeW,
        top - topCurve * 0.1,
        cx - lobeW,
        top + topCurve * 0.72
      );
      ctx.bezierCurveTo(
        cx - lobeW,
        top + (h + topCurve) / 2.15,
        cx - w * 0.22,
        top + h * 0.78,
        cx,
        top + h
      );
      ctx.bezierCurveTo(
        cx + w * 0.22,
        top + h * 0.78,
        cx + lobeW,
        top + (h + topCurve) / 2.15,
        cx + lobeW,
        top + topCurve * 0.72
      );
      ctx.bezierCurveTo(
        cx + lobeW,
        top - topCurve * 0.1,
        cx + lobeW * 0.18,
        top - topCurve * 0.32,
        cx,
        top + topCurve * 0.86
      );
      ctx.closePath();
    };

    const paintFoil = () => {
      const { width, height } = wrap.getBoundingClientRect();
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const hw = width * 0.94;
      const hh = height * 0.92;

      if (shape === "heart") {
        // soft ambient shadow beneath the heart for a bit of lift/depth.
        ctx.save();
        traceHeart(cx, cy, hw, hh);
        ctx.shadowColor = "rgba(154,119,64,0.45)";
        ctx.shadowBlur = height * 0.12;
        ctx.shadowOffsetY = height * 0.035;
        ctx.fillStyle = "rgba(154,119,64,0.001)";
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      if (shape === "heart") {
        traceHeart(cx, cy, hw, hh);
        ctx.clip();
      }

      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "#d4b483");
      g.addColorStop(0.5, "#e9d6ad");
      g.addColorStop(1, "#9a7740");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // soft sheen
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      ctx.fillRect(0, 0, width, height * 0.4);
      ctx.restore();

      if (shape === "heart") {
        // heart outline for definition
        traceHeart(cx, cy, hw, hh);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(122,90,48,0.6)";
        ctx.stroke();
      }

      // hint text
      ctx.fillStyle = "rgba(86,64,34,0.9)";
      ctx.font = `600 ${Math.round(height * 0.13)}px "Noto Sans Armenian", system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(hint, cx, cy - height * 0.04);

      // count initial opaque samples for progress tracking
      let opaque = 0;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let i = 3; i < data.length; i += STRIDE) {
        if (data[i] > 0) opaque++;
      }
      initialOpaqueRef.current = opaque;
    };

    paintFoil();

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const checkRatio = () => {
      if (doneRef.current || !initialOpaqueRef.current) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let opaque = 0;
      for (let i = 3; i < data.length; i += STRIDE) {
        if (data[i] > 0) opaque++;
      }
      const cleared = 1 - opaque / initialOpaqueRef.current;
      if (cleared > threshold) {
        doneRef.current = true;
        setDone(true);
        onCompleteRef.current?.();
      }
    };

    const onDown = (e: PointerEvent) => {
      if (doneRef.current) return;
      drawingRef.current = true;
      const p = pos(e);
      scratch(p.x, p.y);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {}
    };
    const onMove = (e: PointerEvent) => {
      if (!drawingRef.current || doneRef.current) return;
      const p = pos(e);
      scratch(p.x, p.y);
    };
    const onUp = () => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      checkRatio();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", paintFoil);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", paintFoil);
    };
  }, [hint, threshold, shape]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "relative", touchAction: "none" }}
    >
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full transition-opacity duration-700"
        style={{
          opacity: done ? 0 : 1,
          pointerEvents: done ? "none" : "auto",
          cursor: done ? "default" : "grab",
        }}
      />
    </div>
  );
}
