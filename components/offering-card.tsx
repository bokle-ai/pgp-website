"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";

interface OfferingCardProps {
  type: "plots" | "construction" | "resale";
  animationDelay?: number;
}

const data = {
  plots: {
    title: "Plots",
    eyebrow: "DTCP & CMDA approved",
    tagline:
      "Cleared, ready-to-build plots in the Cheyyar corridor — sizes from 600 to 2,400 sq ft, starting at ₹4 Lakhs.",
    bullets: [
      "Clear titles, full legal due diligence",
      "Plot sizes 600 – 2,400 sq ft",
      "Site visits 7 days a week",
    ],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=600&fit=crop",
    imageAlt: "Aerial view of a plotted residential layout",
    cta: { label: "View available plots", href: "/#plots" },
    badge: null as string | null,
  },
  construction: {
    title: "Construction",
    eyebrow: "Turnkey · transparent rates",
    tagline:
      "Per-sq-ft pricing from foundation to handover. What's listed is what you pay — no surprise extras.",
    bullets: [
      "Standard from ₹1,850 / sq ft",
      "Premium ₹2,450 — vitrified, modular kitchen",
      "Luxury ₹3,200 — imported finishes, smart home",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=600&fit=crop",
    imageAlt: "Construction of a contemporary home",
    cta: { label: "Get a construction quote", href: "/#construction-pricing" },
    badge: "Most asked for",
  },
  resale: {
    title: "Resale",
    eyebrow: "Buyer network · end-to-end",
    tagline:
      "Already own land in the Chennai outskirts? We'll find the right buyer and run the paperwork.",
    bullets: [
      "Verified buyer network",
      "Professional listing & valuation",
      "Documentation handled end-to-end",
    ],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=600&fit=crop",
    imageAlt: "Family reviewing property documents",
    cta: { label: "List your property", href: "/contact?type=resale" },
    badge: null as string | null,
  },
};

export function OfferingCard({ type, animationDelay = 0 }: OfferingCardProps) {
  const d = data[type];
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="group relative flex flex-col h-full overflow-hidden"
      style={{
        backgroundColor: "var(--bg-cream)",
        borderRadius: 24,
        border: "1px solid rgba(212,160,23,0.18)",
        boxShadow: "0 18px 48px rgba(0,0,0,0.25)",
      }}
      initial={
        prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: animationDelay, ease: EASE }}
      whileHover={prefersReduced ? {} : { y: -6 }}
    >
      {/* Image header */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={d.image}
          alt={d.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Bottom fade so the eyebrow chip below it reads cleanly */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,61,46,0) 50%, rgba(15,61,46,0.35) 100%)",
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
              boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
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
            color: "var(--accent-gold)",
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
          className="inline-flex items-center gap-2 self-start text-[14px] transition-all group/link"
          style={{
            color: "var(--bg-deep)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 600,
            backgroundColor: "var(--accent-gold)",
            padding: "10px 18px",
            borderRadius: 999,
            boxShadow:
              "0 6px 16px rgba(212,160,23,0.32), inset 0 1px 0 rgba(255,255,255,0.28)",
          }}
        >
          {d.cta.label}
          <span
            className="transition-transform group-hover/link:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
