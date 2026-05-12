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
      className="relative flex flex-col p-8 lg:p-10"
      style={{
        backgroundColor: "var(--bg-cream)",
        borderLeft: "3px solid var(--accent-gold)",
      }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: animationDelay, ease: EASE }}
    >
      <span
        aria-hidden="true"
        className="absolute top-2 left-4 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontSize: "5rem",
          lineHeight: 1,
          color: "var(--accent-gold)",
          opacity: 0.3,
        }}
      >
        “
      </span>

      <blockquote
        className="relative flex-1 mb-7 mt-6"
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "1.075rem",
          color: "var(--ink)",
          lineHeight: 1.6,
          letterSpacing: "-0.005em",
        }}
      >
        {testimonial.quote}
      </blockquote>

      <footer>
        <p
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontWeight: 500,
            fontSize: "1rem",
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}
        >
          {testimonial.name}
        </p>
        <p
          className="mt-1 text-[11px] uppercase"
          style={{
            color: "var(--ink-faint)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            letterSpacing: "0.18em",
          }}
        >
          {testimonial.project} · {testimonial.location}
        </p>
      </footer>
    </motion.article>
  );
}
