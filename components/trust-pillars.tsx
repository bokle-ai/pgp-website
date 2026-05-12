"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE } from "@/lib/animation";

const pillars = [
  {
    title: "Local expertise, local accountability.",
    body: "We work three corridors. Not thirty. We're around when you need us.",
  },
  {
    title: "Clear titles, every time.",
    body: "DTCP / CMDA approval, patta, EC, parent docs — verified before you sign.",
  },
  {
    title: "One team, end-to-end.",
    body: "Plot, construction, resale — handled by people who know your project.",
  },
  {
    title: "Transparent pricing.",
    body: "Per-sq-ft rates published. Government charges itemised. No hidden costs.",
  },
];

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ color: "var(--accent-gold)" }}
    >
      <path
        d="M3.5 9.5l3.5 3.5L14.5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrustPillars() {
  const prefersReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: 0.1,
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
      {/* Left — heritage statement */}
      <motion.div
        className="lg:col-span-5"
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
      >
        <motion.div variants={item}>
          <span
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontWeight: 500,
              fontSize: "clamp(4rem, 8vw, 6rem)",
              color: "var(--accent-gold)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              display: "block",
            }}
          >
            200+
          </span>
        </motion.div>
        <motion.p
          variants={item}
          className="mt-5 max-w-[24ch]"
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontWeight: 400,
            fontSize: "1.5rem",
            color: "var(--ink)",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
          }}
        >
          families have trusted us with their land decisions since 2013.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap gap-x-4 gap-y-2"
        >
          {["12 years", "3 corridors", "18 projects"].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              {i > 0 && (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: "var(--accent-gold)" }}
                  aria-hidden="true"
                />
              )}
              <span
                className="text-xs uppercase"
                style={{
                  color: "var(--ink-muted)",
                  letterSpacing: "0.18em",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                }}
              >
                {s}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 group/link"
            style={{
              color: "var(--accent-gold)",
              fontFamily: "var(--font-montserrat, sans-serif)",
            }}
          >
            Our story
            <span
              className="transition-transform group-hover/link:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right — pillar list */}
      <motion.ul
        className="lg:col-span-7"
        variants={container}
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {pillars.map((p, i) => (
          <motion.li
            key={p.title}
            variants={item}
            className="flex items-start gap-5 py-6"
            style={{
              borderTop:
                i === 0 ? "1px solid var(--line)" : "1px solid var(--line)",
              borderBottom:
                i === pillars.length - 1 ? "1px solid var(--line)" : "none",
            }}
          >
            <span className="mt-1 shrink-0">
              <Check />
            </span>
            <div className="flex-1">
              <h4
                className="mb-1.5"
                style={{
                  fontFamily: "var(--font-playfair, Georgia, serif)",
                  fontWeight: 500,
                  fontSize: "1.15rem",
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.title}
              </h4>
              <p
                className="text-sm"
                style={{
                  color: "var(--ink-muted)",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-montserrat, sans-serif)",
                }}
              >
                {p.body}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
