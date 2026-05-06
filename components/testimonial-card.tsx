"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCard({
  testimonial,
  animationDelay = 0,
}: {
  testimonial: Testimonial;
  animationDelay?: number;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      className="flex flex-col p-7 bg-white"
      style={{ borderLeft: "4px solid var(--accent-gold)" }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: animationDelay, ease: EASE }}
      whileHover={prefersReduced ? {} : { y: -4, transition: { duration: 0.2 } }}
    >
      <div
        className="flex gap-0.5 mb-4"
        aria-label={`${testimonial.stars} out of 5 stars`}
      >
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="var(--accent-gold)"
            aria-hidden="true"
          >
            <path d="M7 1l1.55 3.14L12 4.63l-2.5 2.43.59 3.44L7 8.77l-3.09 1.73.59-3.44L2 4.63l3.45-.49L7 1z" />
          </svg>
        ))}
      </div>

      <blockquote
        className="flex-1 mb-5"
        style={{
          fontFamily: "var(--font-fraunces, Georgia, serif)",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "1rem",
          color: "var(--ink)",
          lineHeight: 1.65,
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <footer className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
          style={{
            backgroundColor: "var(--bg-deep)",
            color: "var(--accent-gold)",
            fontFamily: "var(--font-dm-sans, sans-serif)",
          }}
          aria-hidden="true"
        >
          {testimonial.initials}
        </div>
        <div>
          <p
            className="text-sm font-medium"
            style={{
              color: "var(--ink)",
              fontFamily: "var(--font-dm-sans, sans-serif)",
              fontWeight: 500,
            }}
          >
            {testimonial.name}
          </p>
          <p
            className="text-xs"
            style={{
              color: "var(--ink-faint)",
              fontFamily: "var(--font-dm-sans, sans-serif)",
            }}
          >
            {testimonial.project} · {testimonial.location}
          </p>
        </div>
      </footer>
    </motion.article>
  );
}
