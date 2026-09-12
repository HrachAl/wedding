"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Floating background-music control. Autoplay is blocked until a user gesture,
 * so we begin playback when the envelope is opened (the `invitation:open`
 * event) and otherwise start on the first click of this button.
 *
 * Drop your track at /public/audio/ambient.mp3 (see public/audio/README.md).
 */
export function MusicToggle({ src = "/audio/ambient.mp3" }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", () => setReady(true), {
      once: true,
    });
    // If the file is missing we still render the button (it just won't play).
    audio.addEventListener("error", () => setReady(true), { once: true });
    audioRef.current = audio;

    const onOpen = () => void play();
    window.addEventListener("invitation:open", onOpen);

    return () => {
      window.removeEventListener("invitation:open", onOpen);
      audio.pause();
      audioRef.current = null;
    };
  }, [src, play]);

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={() => (playing ? pause() : play())}
      aria-label={playing ? "Անջատել երաժշտությունը" : "Միացնել երաժշտությունը"}
      className="fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-[var(--glass-bg)] text-gold shadow-glass backdrop-blur-md transition-colors hover:border-gold"
    >
      {playing ? (
        <motion.span
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <Volume2 className="h-5 w-5" strokeWidth={1.6} />
        </motion.span>
      ) : (
        <VolumeX className="h-5 w-5" strokeWidth={1.6} />
      )}
    </button>
  );
}
