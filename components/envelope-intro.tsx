"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "invitation:opened";

// Subtle embossed botanical texture (tiled), tone-on-tone beige.
const BOTANICAL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23cdbe9e' stroke-width='1' opacity='0.5' stroke-linecap='round'%3E%3Cpath d='M28 22c7 5 7 16 0 23c-7-7-7-18 0-23z'/%3E%3Cpath d='M28 22v30'/%3E%3Cpath d='M112 56c8 4 9 15 2 23c-6-8-8-19-2-23z'/%3E%3Cpath d='M112 56l-4 28'/%3E%3Cpath d='M62 104c7 5 7 16 0 23c-7-7-7-18 0-23z'/%3E%3Cpath d='M62 104v30'/%3E%3C/g%3E%3C/svg%3E\")";

/**
 * Cinematic entry: a realistic, contained cream envelope with a wax seal.
 * Tap the seal → the flap lifts, a soft light blooms and the whole scene
 * gently dissolves into the main page (a smooth transition — no card pops out).
 * Shown once per browser session; locks scroll and emits `invitation:open`.
 */
export function EnvelopeIntro() {
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (alreadyOpened) return;
    setVisible(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.dispatchEvent(new Event("invitation:open"));
    sessionStorage.setItem(STORAGE_KEY, "1");
    document.body.style.overflow = "";
    setTimeout(() => setVisible(false), 2100);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Scene — gently scales up and dissolves to reveal the page */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={{
              opacity: opening ? 0 : 1,
              scale: opening ? 1.1 : 1,
            }}
            transition={{ duration: 1.1, delay: opening ? 0.85 : 0, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Ambient backdrop with a soft vignette to focus the center */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 42%, #f6efe1 0%, #ece0cb 52%, #d9c8a9 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{ backgroundImage: BOTANICAL, backgroundSize: "160px 160px" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(85% 70% at 50% 45%, transparent 55%, rgba(90,68,38,0.18) 100%)",
              }}
            />

            {/* Envelope (contained, centered) */}
            <div
              className="relative z-10"
              style={{
                width: "min(86vw, 400px)",
                aspectRatio: "1.42 / 1",
                perspective: 1100,
              }}
            >
              {/* Envelope back wall */}
              <div
                className="absolute inset-0 rounded-[14px]"
                style={{
                  background: "linear-gradient(160deg, #f3e9d6 0%, #e8d9be 100%)",
                  boxShadow:
                    "0 34px 64px -20px rgba(90,66,36,0.55), inset 0 0 0 1.5px rgba(201,168,110,0.55), inset 0 0 0 3px rgba(255,255,255,0.5)",
                }}
              />

              {/* Inner shadow at the mouth (depth where the flap opens) */}
              <motion.div
                aria-hidden
                className="absolute inset-x-0 top-0 z-10 h-1/2 rounded-t-[14px]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(120,90,50,0.28) 0%, transparent 70%)",
                }}
                animate={{ opacity: opening ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />

              {/* Front pocket face (lower triangles / diagonal seams) */}
              <div
                className="absolute inset-0 z-20 overflow-hidden rounded-[14px]"
                aria-hidden
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0 100%, 50% 38%, 100% 100%)",
                    background: "linear-gradient(180deg, #ece0c9 0%, #e2d2b4 100%)",
                    boxShadow: "inset 0 2px 6px rgba(255,255,255,0.4)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0 0, 0 100%, 50% 50%)",
                    background: "linear-gradient(120deg, #e9ddc6 0%, #ddcdae 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
                    background: "linear-gradient(240deg, #e9ddc6 0%, #ddcdae 100%)",
                  }}
                />
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <g stroke="#cdb98f" strokeWidth="0.4" opacity="0.5" fill="none">
                    <line x1="0" y1="0" x2="50" y2="50" />
                    <line x1="100" y1="0" x2="50" y2="50" />
                    <line x1="0" y1="100" x2="50" y2="38" />
                    <line x1="100" y1="100" x2="50" y2="38" />
                  </g>
                </svg>
              </div>

              {/* Top flap — lifts open */}
              <motion.div
                aria-hidden
                className="absolute left-0 top-0 z-30 w-full origin-top"
                style={{
                  height: "62%",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(180deg, #f1e6d2 0%, #e6d6b9 100%)",
                  boxShadow: "0 4px 10px -4px rgba(90,66,36,0.35)",
                }}
                animate={opening ? { rotateX: -172 } : { rotateX: 0 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 62"
                  preserveAspectRatio="none"
                >
                  <line x1="0" y1="0" x2="50" y2="62" stroke="#cdb98f" strokeWidth="0.4" opacity="0.5" />
                  <line x1="100" y1="0" x2="50" y2="62" stroke="#cdb98f" strokeWidth="0.4" opacity="0.5" />
                </svg>
              </motion.div>

              {/* Wax seal — centred, embossed "ՀԼ" monogram */}
              <motion.button
                type="button"
                onClick={open}
                aria-label="Բացել հրավերը"
                className="absolute left-1/2 z-40 rounded-full focus:outline-none"
                style={{ top: "50%", transform: "translate(-50%, -50%)" }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={opening ? { scale: 0, opacity: 0 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full sm:h-[88px] sm:w-[88px]"
                  style={{
                    background:
                      "radial-gradient(circle at 36% 28%, #cf9579 0%, #b56d50 52%, #8f4f37 100%)",
                    boxShadow:
                      "0 12px 26px -8px rgba(110,55,35,0.65), inset 0 2px 6px rgba(255,235,222,0.5), inset 0 -6px 12px rgba(80,38,22,0.55)",
                  }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* scalloped stamp rim */}
                  <span
                    aria-hidden
                    className="absolute inset-[5px] rounded-full"
                    style={{
                      border: "1.5px solid rgba(255,232,218,0.42)",
                      boxShadow: "inset 0 0 6px rgba(80,38,22,0.45)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-[9px] rounded-full"
                    style={{ border: "1px dotted rgba(255,228,212,0.38)" }}
                  />
                  <span
                    className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
                    style={{
                      color: "#a35c41",
                      textShadow:
                        "0 1px 0 rgba(255,228,212,0.55), 0 -1px 1px rgba(70,32,18,0.65)",
                    }}
                  >
                    ՀԼ
                  </span>
                </motion.div>
              </motion.button>
            </div>

            {/* Caption */}
            <motion.p
              className="relative z-10 mt-10 text-center font-serif text-lg leading-relaxed text-[#7a6a4c] sm:text-xl"
              animate={{ opacity: opening ? 0 : [0.6, 1, 0.6] }}
              transition={
                opening
                  ? { duration: 0.4 }
                  : { duration: 2.4, repeat: Infinity }
              }
            >
              Հրավերը բացելու համար
              <br />
              սեղմեք կնիքին
            </motion.p>
          </motion.div>

          {/* Soft light bloom on open — the cinematic flash of the transition */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-50 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,251,242,0.95) 0%, rgba(247,233,205,0.5) 35%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={
              opening
                ? { opacity: [0, 0.85, 0], scale: [0.2, 1.1, 1.6] }
                : { opacity: 0, scale: 0.2 }
            }
            transition={{ duration: 1.4, delay: 0.55, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
