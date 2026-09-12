"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";

import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SectionPhoto } from "@/components/section-photo";
import { Button } from "@/components/ui/button";
import { BLUR } from "@/lib/blur";
import { VENUES } from "@/lib/constants";

export function Location() {
  return (
    <section id="location" className="relative bg-surface-alt py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Ինչպես հասնել" title="Վայրերը" />

        <div className="mx-auto mt-14 max-w-5xl space-y-10">
          {VENUES.map((venue, i) => (
            <Reveal key={venue.name} delay={i * 0.1}>
              <div className="glass-panel overflow-hidden rounded-3xl p-3 sm:p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Venue photo */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={venue.image}
                      alt={venue.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder={BLUR[venue.image] ? "blur" : "empty"}
                      blurDataURL={BLUR[venue.image]}
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-night/55 px-3 py-1 text-xs uppercase tracking-widest text-champagne backdrop-blur-sm">
                      {venue.time}
                    </span>
                  </div>

                  {/* Info + map */}
                  <div className="flex flex-col">
                    <div className="px-2 pt-3">
                      <p className="eyebrow">{venue.label}</p>
                      <h3 className="mt-1 font-serif text-2xl font-medium leading-tight text-ink">
                        {venue.name}
                      </h3>
                      {venue.subtitle ? (
                        <p className="mt-1 text-sm uppercase tracking-widest text-ink/50">
                          {venue.subtitle}
                        </p>
                      ) : null}
                    </div>

                    <Magnetic className="mt-auto px-2 pb-2 pt-6">
                      <Button asChild size="lg" className="w-full sm:w-auto">
                        <a
                          href={venue.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="h-4 w-4" />
                          Քարտեզ
                        </a>
                      </Button>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <SectionPhoto src="/photos/venue.jpg" />
      </div>
    </section>
  );
}
