"use client";

import Image from "next/image";
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

export function TrustPillars() {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
      {/* ── Photograph: the human proof, with the headline stat overlaid ── */}
      <motion.figure
        className="relative overflow-hidden min-h-[360px] lg:min-h-[560px]"
        style={{ borderRadius: 4 }}
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <Image
          src="/images/brand/hero-family-handover.webp"
          alt="A family on their newly registered plot at Cheyyar, documents in hand"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,32,22,0) 40%, rgba(6,32,22,0.85) 100%)",
          }}
        />
        <figcaption className="absolute left-0 right-0 bottom-0 p-7 lg:p-8">
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(2.75rem, 5vw, 4rem)",
              color: "var(--bg-cream)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            310+
          </div>
          <div
            className="mt-1.5 text-sm"
            style={{
              color: "rgba(248,245,239,0.82)",
              fontFamily: "var(--font-body)",
            }}
          >
            families housed across the corridor since 2013
          </div>
        </figcaption>
      </motion.figure>

      {/* ── The four commitments, as plain confident type ── */}
      <div className="flex flex-col justify-center">
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[40ch] mb-8 lg:mb-10 text-[15px]"
          style={{
            color: "var(--ink-muted)",
            fontFamily: "var(--font-body)",
            lineHeight: 1.65,
          }}
        >
          Buying land is a decision families live with for a generation. These
          are the four things we hold ourselves to, every project, every time.
        </motion.p>

        <div className="flex flex-col">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              className="py-5"
              style={
                i < principles.length - 1
                  ? { borderBottom: "1px solid rgba(15,61,46,0.12)" }
                  : undefined
              }
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <h3
                className="flex items-start gap-3"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: "1.2rem",
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  className="mt-1 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 9.5l3.5 3.5 7.5-8"
                    fill="none"
                    stroke="var(--accent-gold)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {p.title}
              </h3>
              <p
                className="mt-2 pl-[30px] text-[14.5px]"
                style={{
                  color: "var(--ink-muted)",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.6,
                  maxWidth: "52ch",
                }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-[15px]"
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
          <span
            className="text-sm"
            style={{ color: "var(--ink-faint)", fontFamily: "var(--font-body)" }}
          >
            12 years &middot; 3 corridors &middot; 6 active projects
          </span>
        </motion.div>
      </div>
    </div>
  );
}
