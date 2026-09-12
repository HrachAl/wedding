# Հրաչյա ❤️ Լիդա — Wedding Invitation

A premium, luxury wedding invitation website built with **Next.js 15 (App
Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** and
**shadcn/ui**-style components.

Designed to feel expensive, minimal and romantic — fully responsive and
mobile-first, with smooth, subtle animations.

---

## ✨ Features

- **Cinematic envelope intro** — wax-sealed envelope with the couple monogram that opens on tap (shown once per session, also acts as preloader)
- **Day / evening theme** — light & luxe dark theme toggle, persisted, no flash on load
- **Background music** — floating speaker toggle, starts on the envelope-open gesture
- **Hero** — full-screen, animated names, floating particles, **mouse / device-tilt parallax**, scroll indicator
- **Live countdown** — days / hours / minutes / seconds, animated, updates every second
- **Our story** — "how we met" timeline
- **Wedding details** — glassmorphism cards + **Add to calendar** (Google / Apple / Outlook) & **Share** buttons
- **Location** — embedded Google Map + "Open in Google Maps" button
- **Schedule** — elegant vertical timeline with icons
- **Gallery** — responsive grid with a click-to-zoom lightbox
- **Dress code** — colour palette guidance
- **RSVP** — modern form with **React Hook Form + Zod**, posted to an API route that forwards to a webhook (Google Sheet / Telegram) when configured
- **Custom monogram** — gold `Հ ❤ Լ` SVG used in the seal, footer and preloader
- **Footer** — closing message
- **Effects** — fade / slide / scroll-reveal, floating particles, flower petals, glassmorphism, soft shadows, smooth scrolling
- Respects `prefers-reduced-motion`

---

## 🚀 Getting started

Requirements: **Node.js 18.18+** (Node 20+ recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open <http://localhost:3000> in your browser.

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## 🎨 Customisation

Almost everything lives in **`lib/constants.ts`**:

| What | Where |
| --- | --- |
| Couple names, date, venue, invitation text | `WEDDING` |
| Countdown target (timezone-aware ISO) | `WEDDING.dateISO` |
| Google Maps embed + link | `WEDDING.mapEmbedSrc`, `WEDDING.mapLink` |
| Schedule / timeline items | `SCHEDULE` |
| Gallery photos | `GALLERY` |
| RSVP food options | `FOOD_OPTIONS` |

### Colours & typography

- Palette and design tokens: `tailwind.config.ts` (`ivory`, `champagne`, `gold`, …)
- Fonts: `app/layout.tsx` (Noto Serif/Sans Armenian via `next/font`)
- Global styles & helpers: `app/globals.css`

### Replacing gallery images

See `public/gallery/README.md`. By default the gallery uses Unsplash
placeholders; swap in local files under `public/gallery/` and update `GALLERY`.

### Background music

Drop a track at `public/audio/ambient.mp3` (see `public/audio/README.md`).
It starts when the guest opens the envelope and can be toggled any time. With
no file present the button simply stays silent.

### Adding events to the calendar

The "Add to calendar" buttons (Google / Apple / Outlook) and "Share" button are
generated automatically from `WEDDING.dateISO` in `lib/constants.ts`
(see `lib/calendar.ts`). The event duration defaults to 6 hours.

### Collecting real RSVP responses

The form POSTs to the `/api/rsvp` route (`app/api/rsvp/route.ts`), which
**validates again on the server** and forwards the submission to the webhook in
`RSVP_WEBHOOK_URL`. Copy `.env.example` to `.env.local` and set it:

```bash
cp .env.example .env.local
# RSVP_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```

Two easy options for the webhook:

1. **Google Sheets** — create an Apps Script Web App that appends a row from the
   posted JSON, deploy it as "Anyone", and paste its `/exec` URL.
2. **Telegram** — point it at a small proxy / automation (Zapier, Make, a
   serverless function) that calls the Bot API `sendMessage`.

With no `RSVP_WEBHOOK_URL` set, submissions are accepted and logged to the
server console, so the form always works in development.

---

## 🗂️ Project structure

```
app/
  layout.tsx            # Root layout, fonts, metadata, theme script
  page.tsx              # Section composition
  globals.css           # Tailwind layers + light/dark design tokens
  api/rsvp/route.ts     # Server-validated RSVP endpoint (forwards to webhook)
components/
  sections/             # Hero, Countdown, Story, Details, Location, Schedule,
                        #   Gallery, DressCode, Rsvp, Footer
  effects/              # FlowerPetals, Particles
  motion/               # Reveal (scroll-reveal wrapper)
  ui/                   # Button, Card, Input, Label, Select, Textarea
  envelope-intro.tsx    # Cinematic entry screen
  monogram.tsx          # Հ ❤ Լ gold SVG
  music-toggle.tsx      # Background-music control
  theme-toggle.tsx      # Day / evening switch
  theme-script.tsx      # No-flash theme bootstrap
  calendar-actions.tsx  # Add-to-calendar / share buttons
  section-heading.tsx
hooks/
  use-countdown.ts      # Live countdown hook
  use-mounted.ts        # Client-mount guard
  use-parallax.ts       # Pointer / device-tilt parallax
lib/
  constants.ts          # ← edit wedding details, story, dress code here
  calendar.ts           # Google / .ics calendar links
  rsvp-schema.ts        # Zod schema for the RSVP form
  utils.ts              # cn() class merger
public/
  gallery/              # Drop your photos here
  audio/                # Drop ambient.mp3 here
```

### Theme & colours

The light/dark themes are driven by CSS variables in `app/globals.css`
(`--ivory`, `--ink`, `--surface-alt`, glass + hero tokens). The brand gold and
typography live in `tailwind.config.ts`. Glass cards use the `.glass-panel`
helper so they adapt to both themes automatically.

---

## 🛠️ Tech stack

- [Next.js 15](https://nextjs.org/) (App Router, React 19)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate`
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [lucide-react](https://lucide.dev/) icons
- shadcn/ui-style primitives (`class-variance-authority`, `tailwind-merge`)

---

Made with ❤️ for Հրաչյա & Լիդա.
