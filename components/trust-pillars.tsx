"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";

const principles = [
  {
    title: "Local expertise, local accountability",
    body: "We work three corridors, not thirty. The same faces walk you through the plot and pick up the phone two years later.",
  },
  {
    title: "Clear titles, every time",
    body: "DTCP / CMDA approval, patta, EC and parent documents, verified and shared before you sign anything.",
  },
  {
    title: "One team, end to end",
    body: "The people who sell you the plot are the people who build on it. No handoffs, no finger-pointing.",
  },
  {
    title: "Published, honest pricing",
    body: "Per-square-foot rates are printed on this website. Government charges itemised. No quote-then-upcharge.",
  },
];

const facts = [
  { value: "12", label: "years" },
  { value: "3", label: "corridors" },
  { value: "6", label: "active projects" },
];

export function TrustPillars() {
  const reduce = useReducedMotion();

  return (
    <div className="max-w-5xl">
      {/* Lead statement — the 310+ figure woven into the voice */}
      <motion.p
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="max-w-[28ch]"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: "clamp(1.5rem, 2.6vw, 2.3rem)",
          color: "var(--ink)",
          lineHeight: 1.22,
          letterSpacing: "-0.02em",
        }}
      >
        <span style={{ color: "var(--gold-ink)" }}>310+ families</span> have
        trusted us with their land since 2013. Here is what they were buying
        into.
      </motion.p>

      {/* Index of principles — hairline-ruled rows, no cards */}
      <div
        className="mt-11 lg:mt-14"
        style={{ borderTop: "1px solid rgba(15,61,46,0.18)" }}
      >
        {principles.map((p, i) => (
          <motion.div
            key={p.title}
            className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-1.5 md:gap-12 py-6 lg:py-7"
            style={{ borderBottom: "1px solid rgba(15,61,46,0.12)" }}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "clamp(1.2rem, 1.7vw, 1.5rem)",
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              {p.title}
            </h3>
            <p
              className="text-[15px] md:pt-1"
              style={{
                color: "var(--ink-muted)",
                lineHeight: 1.65,
                fontFamily: "var(--font-body)",
                maxWidth: "52ch",
              }}
            >
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Proof figures + story link */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
        className="mt-9 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
      >
        <div className="flex items-baseline gap-x-7 gap-y-2 flex-wrap">
          {facts.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-baseline gap-1.5"
              style={{ fontFamily: "var(--font-body)", color: "var(--ink-muted)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                }}
              >
                {f.value}
              </span>
              <span className="text-sm">{f.label}</span>
            </span>
          ))}
        </div>

        <Link
          href="/about"
          className="group inline-flex items-center gap-2 text-[15px] self-start sm:self-auto"
          style={{
            color: "var(--bg-deep)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              borderBottom: "1.5px solid var(--accent-gold)",
              paddingBottom: 2,
            }}
          >
            Read our story
          </span>
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
            style={{ color: "var(--gold-ink)" }}
          >
            &rarr;
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
