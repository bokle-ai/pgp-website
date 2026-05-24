"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE } from "@/lib/animation";

const pillars = [
  {
    icon: "📍",
    title: "Local expertise, local accountability.",
    body: "We work three corridors. Not thirty. We're around when you need us.",
  },
  {
    icon: "📜",
    title: "Clear titles, every time.",
    body: "DTCP / CMDA approval, patta, EC, parent docs — verified before you sign.",
  },
  {
    icon: "🤝",
    title: "One team, end-to-end.",
    body: "Plot, construction, resale — handled by people who know your project.",
  },
  {
    icon: "💰",
    title: "Transparent pricing.",
    body: "Per-sq-ft rates published. Government charges itemised. No hidden costs.",
  },
];

function PillarIcon({ kind }: { kind: number }) {
  const paths: Record<number, React.ReactNode> = {
    0: (
      <path
        d="M14 26c4.5-5.5 9-10.4 9-15a9 9 0 10-18 0c0 4.6 4.5 9.5 9 15zm0-12.5a3 3 0 110-6 3 3 0 010 6z"
        fill="currentColor"
      />
    ),
    1: (
      <path
        d="M6 5h13l4 4v15a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zm12 1.5V10h3.5L18 6.5zM8 13h12v1.5H8V13zm0 4h12v1.5H8V17zm0 4h8v1.5H8V21z"
        fill="currentColor"
      />
    ),
    2: (
      <path
        d="M10 8a3 3 0 116 0 3 3 0 01-6 0zm-6 14a6 6 0 0118 0v1H4v-1zm15-9a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm5 9v.5h-4v-.5a8 8 0 00-1.4-4.5A4.5 4.5 0 0124 22z"
        fill="currentColor"
      />
    ),
    3: (
      <path
        d="M14 4a10 10 0 100 20 10 10 0 000-20zm.9 16v-1.4c-2-.3-3.4-1.4-3.5-3.3h1.7c.1 1 .8 1.7 1.9 1.9V14c-2.2-.5-3.3-1.5-3.3-3.1 0-1.7 1.3-2.8 3.3-3v-1.3h1.3v1.3c2 .2 3.2 1.2 3.4 3h-1.7c-.1-.8-.7-1.4-1.7-1.6v3l.5.1c2.2.5 3.4 1.5 3.4 3.2 0 1.8-1.4 2.9-3.5 3.1V20h-1.3z"
        fill="currentColor"
      />
    ),
  };
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      style={{ color: "var(--accent-gold)" }}
      aria-hidden="true"
    >
      {paths[kind]}
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
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
              fontSize: "clamp(4rem, 8vw, 6.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              display: "block",
              backgroundImage:
                "linear-gradient(135deg, #D4A017 0%, #E0B43F 50%, #C68F12 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            310+
          </span>
        </motion.div>
        <motion.p
          variants={item}
          className="mt-5 max-w-[24ch]"
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontWeight: 400,
            fontSize: "1.6rem",
            color: "var(--ink)",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          families have trusted us with their land decisions since 2013.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap gap-2"
        >
          {["12 years", "3 corridors", "6 active projects"].map((s) => (
            <span
              key={s}
              className="inline-flex items-center px-3 py-1.5 text-[11px] uppercase"
              style={{
                color: "var(--bg-deep)",
                backgroundColor: "rgba(212,160,23,0.18)",
                border: "1px solid rgba(212,160,23,0.32)",
                letterSpacing: "0.16em",
                fontFamily: "var(--font-montserrat, sans-serif)",
                fontWeight: 700,
                borderRadius: 999,
              }}
            >
              {s}
            </span>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80 group/link"
            style={{
              color: "var(--bg-deep)",
              backgroundColor: "var(--accent-gold)",
              padding: "11px 22px",
              borderRadius: 999,
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontWeight: 600,
              boxShadow:
                "0 6px 16px rgba(212,160,23,0.32), inset 0 1px 0 rgba(255,255,255,0.28)",
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

      {/* Right — pillar grid */}
      <motion.div
        className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
        variants={container}
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            variants={item}
            className="flex flex-col p-6"
            style={{
              backgroundColor: "white",
              borderRadius: 18,
              border: "1px solid rgba(15,61,46,0.08)",
              boxShadow: "0 6px 20px rgba(15,61,46,0.05)",
            }}
            whileHover={prefersReduced ? {} : { y: -4 }}
          >
            <div
              className="w-11 h-11 mb-4 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: "rgba(212,160,23,0.12)",
                border: "1px solid rgba(212,160,23,0.28)",
              }}
            >
              <PillarIcon kind={i} />
            </div>
            <h4
              className="mb-2"
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "var(--ink)",
                lineHeight: 1.25,
                letterSpacing: "-0.005em",
              }}
            >
              {p.title}
            </h4>
            <p
              className="text-[13.5px]"
              style={{
                color: "var(--ink-muted)",
                lineHeight: 1.6,
                fontFamily: "var(--font-montserrat, sans-serif)",
              }}
            >
              {p.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
