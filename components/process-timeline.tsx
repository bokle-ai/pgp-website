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
      {/* Desktop horizontal cards */}
      <div className="hidden lg:grid grid-cols-4 gap-6 relative">
        {/* Animated dotted connecting line through card centres */}
        <motion.div
          className="absolute top-20 left-[12.5%] right-[12.5%] h-px pointer-events-none"
          initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(212,160,23,0.5) 0 6px, transparent 6px 12px)",
          }}
          aria-hidden="true"
        />

        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="relative flex flex-col p-7"
            style={{
              backgroundColor: "var(--bg-cream)",
              borderRadius: 20,
              border: "1px solid rgba(212,160,23,0.16)",
              boxShadow: "0 10px 30px rgba(15,61,46,0.06)",
            }}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.3 + i * 0.15, ease: EASE }}
            whileHover={prefersReduced ? {} : { y: -4 }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-5 text-sm tabular-nums"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                color: "var(--bg-deep)",
                fontFamily: "var(--font-montserrat, sans-serif)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                boxShadow:
                  "0 6px 18px rgba(212,160,23,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
              aria-hidden="true"
            >
              {step.number}
            </div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontWeight: 600,
                fontSize: "1.35rem",
                color: "var(--ink)",
                letterSpacing: "-0.01em",
              }}
            >
              {step.title}
            </h3>
            <p
              className="text-[14px]"
              style={{
                color: "var(--ink-muted)",
                lineHeight: 1.6,
                fontFamily: "var(--font-montserrat, sans-serif)",
              }}
            >
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile vertical */}
      <div className="lg:hidden space-y-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            className="flex gap-5 p-6"
            style={{
              backgroundColor: "var(--bg-cream)",
              borderRadius: 18,
              border: "1px solid rgba(212,160,23,0.16)",
            }}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
          >
            <div
              className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm tabular-nums"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                color: "var(--bg-deep)",
                fontFamily: "var(--font-montserrat, sans-serif)",
                fontWeight: 700,
              }}
              aria-hidden="true"
            >
              {step.number}
            </div>
            <div className="flex-1">
              <h3
                className="mb-1.5"
                style={{
                  fontFamily: "var(--font-playfair, Georgia, serif)",
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  color: "var(--ink)",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-[14px]"
                style={{
                  color: "var(--ink-muted)",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-montserrat, sans-serif)",
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
