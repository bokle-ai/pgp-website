"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { EASE } from "@/lib/animation";

const steps = [
  {
    number: "01",
    title: "Discover",
    meta: "A quick call or WhatsApp",
    body: "Tell us your budget, location preference, and goal. We shortlist two or three projects that actually fit, so you don't waste a Sunday on the wrong plot.",
  },
  {
    number: "02",
    title: "Site visit",
    meta: "About 90 minutes on the land",
    body: "Walk the layout with our local team. Soil, neighbourhood, road access, water, paperwork, all out in the open. We pick you up from the nearest railway station.",
  },
  {
    number: "03",
    title: "Documentation",
    meta: "Before any advance changes hands",
    body: "DTCP / CMDA approval, patta, EC and parent documents verified and shared. Sale agreement drafted, with stamp duty and registration calculated upfront.",
  },
  {
    number: "04",
    title: "Registration & handover",
    meta: "Possession day",
    body: "Sub-registrar appointment, registration, and the physical handover of your plot. The same team that started with you is standing there on the day.",
  },
];

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  const SPINE_X = 14; // px from container left to spine/marker centre

  return (
    <div ref={ref} className="relative max-w-3xl">
      {/* Spine: faint track + gold fill that grows with scroll (the "route") */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          left: SPINE_X,
          top: 8,
          bottom: 8,
          width: 2,
          transform: "translateX(-50%)",
          backgroundColor: "rgba(15,61,46,0.12)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute origin-top"
        style={{
          left: SPINE_X,
          top: 8,
          bottom: 8,
          width: 2,
          transform: "translateX(-50%)",
          backgroundColor: "var(--accent-gold)",
          scaleY: reduce ? 1 : fill,
        }}
      />

      <div className="flex flex-col gap-12 lg:gap-16">
        {steps.map((s, i) => (
          <motion.div
            key={s.number}
            className="relative grid grid-cols-[36px_1fr] gap-x-5 lg:gap-x-8"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
          >
            {/* Diamond milestone marker (echoes the logo's plot-diamonds) */}
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute"
                style={{
                  left: SPINE_X,
                  top: 10,
                  width: 15,
                  height: 15,
                  transform: "translateX(-50%) rotate(45deg)",
                  backgroundColor: "var(--accent-gold)",
                  boxShadow: "0 0 0 5px #fff",
                }}
              />
            </div>

            {/* Step content */}
            <div className="pb-1">
              <div className="flex items-baseline gap-3 lg:gap-4">
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 4vw, 2.9rem)",
                    color: "var(--gold-ink)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.number}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                  }}
                >
                  {s.title}
                </h3>
              </div>

              <p
                className="mt-3 max-w-[54ch] text-[15px]"
                style={{
                  color: "var(--ink-muted)",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-body)",
                }}
              >
                {s.body}
              </p>

              <p
                className="mt-3 inline-flex items-center gap-2 text-[13px]"
                style={{
                  color: "var(--gold-ink)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-gold)",
                  }}
                />
                {s.meta}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
