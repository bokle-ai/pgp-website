"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";

interface PricingTierProps {
  tier: "standard" | "premium";
  animationDelay?: number;
}

const tiers = {
  standard: {
    name: "Standard",
    rate: "₹2,200",
    unit: "/ sq ft",
    label: null as string | null,
    blurb: "The honest baseline. Turnkey construction at builder rates.",
    features: [
      "Foundation to handover (turnkey)",
      "RCC frame structure",
      "Standard MS doors and windows",
      "Ceramic flooring (vitrified in living)",
      "Standard sanitaryware (Cera / Hindware)",
      "Single-coat exterior emulsion",
      "Basic electrical points",
      "12-month structural warranty",
    ],
  },
  premium: {
    name: "Premium",
    rate: "₹2,500",
    unit: "/ sq ft",
    label: "Most popular",
    blurb: "Our most-asked tier. Strong finishes, no compromise on essentials.",
    features: [
      "Everything in Standard, plus:",
      "Vitrified flooring throughout",
      "Modular kitchen (basic)",
      "Premium fittings (Jaquar / Kohler)",
      "2-coat textured exterior",
      "Aluminium / UPVC windows",
      "Designer false ceiling in living",
      "5-year structural warranty",
    ],
  },
};

export function PricingTier({ tier, animationDelay = 0 }: PricingTierProps) {
  const t = tiers[tier];
  const isFeatured = tier === "premium";
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="relative flex flex-col h-full overflow-hidden"
      style={{
        backgroundColor: isFeatured ? "var(--bg-deep)" : "rgba(248,245,239,0.6)",
        borderRadius: 24,
        border: isFeatured
          ? "1px solid rgba(212,160,23,0.5)"
          : "1px solid rgba(15,61,46,0.08)",
        boxShadow: isFeatured
          ? "0 32px 72px rgba(15,61,46,0.45), 0 0 0 1px rgba(212,160,23,0.12)"
          : "0 8px 32px rgba(15,61,46,0.07)",
      }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: isFeatured ? -12 : 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: animationDelay, ease: EASE }}
      whileHover={prefersReduced ? {} : {
        y: isFeatured ? -20 : -8,
        boxShadow: isFeatured
          ? "0 40px 80px rgba(15,61,46,0.5), 0 0 0 1px rgba(212,160,23,0.18)"
          : "0 16px 48px rgba(15,61,46,0.12)",
      }}
    >
      {/* Top accent bar on featured */}
      {isFeatured && (
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: "linear-gradient(90deg, var(--accent-gold), #E0B43F, var(--accent-gold))",
          }}
          aria-hidden="true"
        />
      )}

      {t.label && (
        <div
          className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase"
          style={{
            backgroundColor: "var(--accent-gold)",
            color: "var(--bg-deep)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            letterSpacing: "0.14em",
            borderRadius: 999,
            boxShadow: "0 4px 12px rgba(212,160,23,0.4)",
          }}
        >
          {t.label}
        </div>
      )}

      <div className="p-8 lg:p-10 flex flex-col flex-1 pt-10">
        <span
          className="text-[10px] uppercase mb-4 tracking-widest"
          style={{
            color: isFeatured ? "var(--accent-gold)" : "var(--gold-ink)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
          }}
        >
          {t.name}
        </span>

        <div className="mb-1 flex items-baseline gap-2">
          <span
            className="tabular-nums"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 4vw, 3rem)",
              color: isFeatured ? "var(--bg-cream)" : "var(--ink)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {t.rate}
          </span>
          <span
            className="text-sm"
            style={{
              color: isFeatured ? "rgba(246,241,231,0.5)" : "var(--ink-faint)",
              fontFamily: "var(--font-body)",
            }}
          >
            {t.unit}
          </span>
        </div>

        <p
          className="mb-7 text-[13.5px] leading-relaxed"
          style={{
            color: isFeatured ? "rgba(246,241,231,0.65)" : "var(--ink-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {t.blurb}
        </p>

        <div
          className="h-px w-full mb-6"
          style={{
            backgroundColor: isFeatured
              ? "rgba(212,160,23,0.18)"
              : "rgba(15,61,46,0.07)",
          }}
          aria-hidden="true"
        />

        <ul className="flex-1 space-y-2.5 mb-8">
          {t.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[13px]"
              style={{
                color: isFeatured ? "rgba(246,241,231,0.8)" : "var(--ink-muted)",
                fontFamily: "var(--font-body)",
                lineHeight: 1.5,
              }}
            >
              <Check
                size={14}
                className="shrink-0 mt-0.5"
                style={{ color: "var(--accent-gold)" }}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/contact?type=construction"
          className="group/cta inline-flex items-center justify-between gap-2 text-[14px] pl-5 pr-2 py-2 active:scale-[0.98] ease-[cubic-bezier(0.32,0.72,0,1)] transition-transform duration-300"
          style={{
            backgroundColor: isFeatured ? "var(--accent-gold)" : "transparent",
            color: isFeatured ? "#1A1305" : "var(--bg-deep)",
            border: isFeatured ? "none" : "1.5px solid rgba(15,61,46,0.25)",
            fontFamily: "var(--font-body)",
            fontWeight: isFeatured ? 700 : 600,
            borderRadius: 999,
            boxShadow: isFeatured ? "inset 0 1px 0 rgba(255,255,255,0.3)" : "none",
          }}
        >
          Request a quote
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full ease-[cubic-bezier(0.32,0.72,0,1)] transition-transform duration-300 group-hover/cta:translate-x-0.5"
            style={{
              backgroundColor: isFeatured
                ? "rgba(26,19,5,0.12)"
                : "rgba(15,61,46,0.08)",
              color: isFeatured ? "#1A1305" : "var(--gold-ink)",
            }}
          >
            &rarr;
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
