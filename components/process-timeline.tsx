"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";

const steps = [
  {
    number: "01",
    title: "Discover",
    body: "Tell us your budget, location preference, and goal. We'll shortlist 2–3 projects.",
  },
  {
    number: "02",
    title: "Site Visit",
    body: "Walk the layout with our local team. Soil, neighbourhood, infrastructure, paperwork — all transparent.",
  },
  {
    number: "03",
    title: "Documentation",
    body: "DTCP / CMDA / patta / EC verified. Sale agreement drafted. Stamp duty and registration calculated upfront.",
  },
  {
    number: "04",
    title: "Registration & Handover",
    body: "Sub-registrar appointment, registration, and physical handover. We're with you on the day.",
  },
];

export function ProcessTimeline() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Desktop horizontal timeline */}
      <div className="hidden lg:grid grid-cols-4 relative">
        {/* Animated connecting line */}
        <motion.div
          className="absolute top-6 left-[12.5%] right-[12.5%] h-px"
          initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          style={{ backgroundColor: "var(--accent-gold)", opacity: 0.45 }}
          aria-hidden="true"
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="relative pt-14 pr-8"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.3 + i * 0.18, ease: EASE }}
          >
            <motion.div
              className="absolute top-0 left-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium tabular-nums"
              style={{
                backgroundColor: "var(--accent-gold)",
                color: "var(--bg-deep)",
                fontFamily: "var(--font-dm-sans, sans-serif)",
                fontWeight: 500,
              }}
              initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.18, ease: EASE }}
              aria-hidden="true"
            >
              {step.number}
            </motion.div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-fraunces, Georgia, serif)",
                fontWeight: 600,
                fontSize: "1.25rem",
                color: "var(--ink)",
              }}
            >
              {step.title}
            </h3>
            <p
              className="text-sm"
              style={{
                color: "var(--ink-muted)",
                lineHeight: 1.65,
                fontFamily: "var(--font-dm-sans, sans-serif)",
              }}
            >
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile vertical */}
      <div className="lg:hidden space-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="flex gap-5"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.15, ease: EASE }}
          >
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                style={{
                  backgroundColor: "var(--accent-gold)",
                  color: "var(--bg-deep)",
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontWeight: 500,
                }}
                aria-hidden="true"
              >
                {step.number}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 w-px mt-2 min-h-[48px]"
                  style={{ backgroundColor: "var(--line)" }}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="pb-8">
              <h3
                className="mb-1.5"
                style={{
                  fontFamily: "var(--font-fraunces, Georgia, serif)",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  color: "var(--ink)",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm"
                style={{
                  color: "var(--ink-muted)",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                }}
              >
                {step.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
