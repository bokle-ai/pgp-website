"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";

interface OfferingCardProps {
  type: "plots" | "construction";
  animationDelay?: number;
}

const data = {
  plots: {
    title: "Plots",
    eyebrow: "DTCP & CMDA approved",
    tagline:
      "Cleared, ready-to-build plots in the Cheyyar corridor. Sizes from 600 to 2,400 sq ft, starting at ₹4 Lakhs.",
    bullets: [
      "Clear titles, full legal due diligence",
      "Plot sizes 600 - 2,400 sq ft",
      "Site visits 7 days a week",
    ],
    image: "/images/brand/offering-plots.webp",
    imageAlt: "Plotted layout near Cheyyar",
    cta: { label: "View available plots", href: "/#plots" },
    badge: null as string | null,
  },
  construction: {
    title: "Construction",
    eyebrow: "Turnkey · transparent rates",
    tagline:
      "Per-sq-ft pricing from foundation to handover. What's listed is what you pay, no surprise extras.",
    bullets: [
      "Standard from ₹2,200 / sq ft",
      "Premium ₹2,500: vitrified floors, modular kitchen",
      "Turnkey, foundation to handover",
    ],
    image: "/images/brand/offering-construction.webp",
    imageAlt: "Home under construction with PGP",
    cta: { label: "Get a construction quote", href: "/#construction-pricing" },
    badge: "Most asked for",
  },
};

export function OfferingCard({ type, animationDelay = 0 }: OfferingCardProps) {
  const d = data[type];
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      /* Outer shell — the "tray" the inner card sits in (double-bezel) */
      className="group relative h-full p-1.5"
      style={{
        backgroundColor: "rgba(15,61,46,0.025)",
        borderRadius: 26,
        boxShadow:
          "inset 0 0 0 1px rgba(15,61,46,0.08), 0 1px 2px rgba(15,61,46,0.04), 0 18px 48px -18px rgba(15,61,46,0.18)",
        willChange: "transform",
      }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: animationDelay, ease: EASE }}
      whileHover={prefersReduced ? {} : { y: -6, transition: { duration: 0.5, ease: EASE } }}
    >
      {/* Inner core */}
      <div
        className="relative flex flex-col h-full overflow-hidden"
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
        }}
      >
        {/* Image header */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={d.image}
            alt={d.imageAlt}
            fill
            className="object-cover ease-[cubic-bezier(0.32,0.72,0,1)] transition-transform duration-[900ms] group-hover:scale-[1.07]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,61,46,0) 55%, rgba(15,61,46,0.32) 100%)",
            }}
          />
          {d.badge && (
            <div
              className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase"
              style={{
                backgroundColor: "var(--accent-gold)",
                color: "var(--bg-deep)",
                fontFamily: "var(--font-montserrat, sans-serif)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                borderRadius: 999,
                boxShadow: "0 6px 18px rgba(15,61,46,0.22)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--bg-deep)" }}
                aria-hidden="true"
              />
              {d.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-7 lg:p-8">
        <span
          className="text-[10px] uppercase mb-3"
          style={{
            color: "var(--gold-ink)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            letterSpacing: "0.22em",
            fontWeight: 700,
          }}
        >
          {d.eyebrow}
        </span>

        <h3
          className="mb-3"
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontWeight: 600,
            fontSize: "1.85rem",
            color: "var(--ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          {d.title}
        </h3>

        <p
          className="mb-6 text-[15px]"
          style={{
            color: "var(--ink-muted)",
            lineHeight: 1.6,
            fontFamily: "var(--font-montserrat, sans-serif)",
          }}
        >
          {d.tagline}
        </p>

        <ul className="flex-1 mb-7 space-y-2.5">
          {d.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-[14px]"
              style={{
                color: "var(--ink-muted)",
                fontFamily: "var(--font-montserrat, sans-serif)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="7"
                  fill="var(--accent-gold)"
                  opacity="0.18"
                />
                <path
                  d="M4 7l2 2 4-4"
                  stroke="var(--accent-gold)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              {bullet}
            </li>
          ))}
        </ul>

          <Link
            href={d.cta.href}
            className="group/cta inline-flex items-center gap-3 self-start text-[14px] pl-5 pr-2 py-2 active:scale-[0.98] ease-[cubic-bezier(0.32,0.72,0,1)] transition-transform duration-300"
            style={{
              color: "#1A1305",
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontWeight: 700,
              backgroundColor: "var(--accent-gold)",
              borderRadius: 999,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            {d.cta.label}
            {/* Button-in-button trailing icon */}
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full ease-[cubic-bezier(0.32,0.72,0,1)] transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-px"
              style={{ backgroundColor: "rgba(26,19,5,0.12)" }}
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
