"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE } from "@/lib/animation";

const stats = [
  { value: "12+", label: "Years in business" },
  { value: "310+", label: "Happy families" },
  { value: "3", label: "Corridors" },
  { value: "₹4 L", label: "Plots from" },
];

export function StatStrip() {
  const prefersReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <section
      className="relative grain-overlay py-16 lg:py-20"
      style={{ backgroundColor: "var(--bg-deep)" }}
      aria-label="Company statistics"
    >
      <motion.div
        variants={container}
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-y-12"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="relative px-2 lg:px-6 text-center lg:text-left"
          >
            {i > 0 && (
              <div
                className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16"
                style={{ backgroundColor: "rgba(212,160,23,0.3)" }}
                aria-hidden="true"
              />
            )}
            <div
              className="tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--accent-gold)",
              }}
            >
              {stat.value}
            </div>
            <div
              className="mt-3 text-xs uppercase"
              style={{
                color: "rgba(246,241,231,0.55)",
                fontFamily: "var(--font-montserrat, sans-serif)",
                letterSpacing: "0.2em",
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
