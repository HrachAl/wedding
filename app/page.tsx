import { CursorGlow } from "@/components/effects/cursor-glow";
import { EnvelopeIntro } from "@/components/envelope-intro";
import { MusicToggle } from "@/components/music-toggle";
import { ScrollNav } from "@/components/scroll-nav";
import { Calendar } from "@/components/sections/calendar";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { NamesBand } from "@/components/sections/names-band";
import { NoteSection } from "@/components/sections/note-section";
import { Rsvp } from "@/components/sections/rsvp";
import { Schedule } from "@/components/sections/schedule";
import { Welcome } from "@/components/sections/welcome";
import { ThemeToggle } from "@/components/theme-toggle";
import { NOTES } from "@/lib/constants";

export default function Home() {
  return (
    <>
      {/* Cinematic entry — shown once per session */}
      <EnvelopeIntro />

      {/* Floating controls + ambient layers */}
      <ScrollNav />
      <ThemeToggle />
      <MusicToggle />
      <CursorGlow />

      <main className="relative">
        <Hero />
        <Welcome />
        <Calendar />
        <Schedule />
        <Location />
        <NamesBand />
        <NoteSection note={NOTES.children} tone="ivory" />
        <Rsvp />
        <Footer />
      </main>
    </>
  );
}
