"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import type { Testimonial } from "@/lib/data/testimonials";

export function TestimonialCard({
  testimonial,
  animationDelay = 0,
  disableReveal = false,
}: {
  testimonial: Testimonial;
  animationDelay?: number;
  /** Skip the scroll-into-view entrance (used inside the auto-scroll marquee). */
  disableReveal?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const revealProps =
    disableReveal || prefersReduced
      ? { initial: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.65, delay: animationDelay, ease: EASE },
        };

  return (
    <motion.article
      className="relative flex flex-col h-full"
      style={{
        backgroundColor: "white",
        borderRadius: 24,
        border: "1px solid rgba(15,61,46,0.07)",
        boxShadow: "0 8px 32px rgba(15,61,46,0.08), 0 2px 8px rgba(15,61,46,0.04)",
        padding: "36px 32px 32px",
      }}
      {...revealProps}
      whileHover={prefersReduced ? {} : { y: -8, scale: 1.015 }}
    >
      {/* Big gold opening quote */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-6 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontSize: "6rem",
          lineHeight: 1,
          color: "var(--accent-gold)",
          opacity: 0.35,
        }}
      >
        “
      </span>

      <blockquote
        className="relative flex-1 mt-6 mb-7"
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontWeight: 400,
          fontSize: "1.1rem",
          color: "var(--ink)",
          lineHeight: 1.55,
          letterSpacing: "-0.005em",
        }}
      >
        {testimonial.quote}
      </blockquote>

      <footer className="flex items-center gap-4 pt-5" style={{ borderTop: "1px solid rgba(15,61,46,0.1)" }}>
        {/* Initial avatar */}
        <div
          className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "var(--bg-deep)",
            color: "var(--accent-gold)",
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontWeight: 600,
            fontSize: "1.1rem",
            border: "1px solid rgba(212,160,23,0.4)",
          }}
          aria-hidden="true"
        >
          {testimonial.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontWeight: 600,
              fontSize: "1rem",
              color: "var(--ink)",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {testimonial.name}
          </p>
          <p
            className="mt-1 text-[10px] uppercase truncate"
            style={{
              color: "var(--gold-ink)",
              fontFamily: "var(--font-montserrat, sans-serif)",
              letterSpacing: "0.18em",
              fontWeight: 700,
            }}
          >
            {testimonial.project} · {testimonial.location}
          </p>
        </div>
      </footer>
    </motion.article>
  );
}
