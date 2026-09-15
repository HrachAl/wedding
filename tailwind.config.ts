import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        white: "#ffffff",
        // Theme-adaptive surfaces/text (driven by CSS vars, switch in dark mode)
        ivory: "hsl(var(--ivory) / <alpha-value>)",
        ink: "hsl(var(--ink) / <alpha-value>)",
        "surface-alt": "hsl(var(--surface-alt) / <alpha-value>)",
        // Fixed brand tones
        champagne: "#f5ead9",
        night: "#15110d",
        gold: {
          DEFAULT: "#b9935a",
          light: "#d4b483",
          dark: "#9a7740",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        // Display type now uses the modern Armenian sans (no serifs) per the
        // chosen direction; `font-serif` is kept as the display token.
        serif: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        wider: "0.05em",
        widest: "0.25em",
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(185, 147, 90, 0.25)",
        glass: "0 8px 32px -8px rgba(43, 38, 34, 0.12)",
        "gold-glow": "0 0 60px -15px rgba(185, 147, 90, 0.45)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #d4b483 0%, #b9935a 50%, #9a7740 100%)",
        "ivory-fade":
          "linear-gradient(180deg, #ffffff 0%, #faf7f2 50%, #f5ead9 100%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.14) translate(-1.5%, -1%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        kenburns: "kenburns 22s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
