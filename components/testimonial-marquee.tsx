"use client";

import { TestimonialCard } from "./testimonial-card";
import type { Testimonial } from "@/lib/data/testimonials";

/**
 * Continuously auto-scrolls testimonials horizontally in a seamless loop.
 * The list is rendered twice; the track translates by exactly -50% so the
 * second copy lines up with the first. Pauses on hover; reduced-motion users
 * get a manually scrollable row instead (handled in globals.css).
 */
export function TestimonialMarquee({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const loop = [...testimonials, ...testimonials];

  return (
    <div className="pgp-marquee" aria-label="Customer testimonials, auto-scrolling">
      <div className="pgp-marquee-track">
        {loop.map((t, i) => (
          <div
            key={`${t.id}-${i}`}
            className="pgp-marquee-item"
            aria-hidden={i >= testimonials.length ? true : undefined}
          >
            <TestimonialCard testimonial={t} disableReveal />
          </div>
        ))}
      </div>
    </div>
  );
}
