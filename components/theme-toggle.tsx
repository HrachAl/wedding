"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Day / evening theme switch. Persists the choice in localStorage and toggles
 * `data-theme` on <html>. Initial value is set pre-paint by ThemeScript.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Ցերեկային ռեժիմ" : "Երեկոյան ռեժիմ"}
      className="fixed right-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-[var(--glass-bg)] text-gold shadow-glass backdrop-blur-md transition-colors hover:border-gold"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" strokeWidth={1.6} />
        ) : (
          <Moon className="h-5 w-5" strokeWidth={1.6} />
        )}
      </motion.span>
    </button>
  );
}
