"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";

interface PricingTierProps {
  tier: "standard" | "premium" | "luxury";
  animationDelay?: number;
}

const tiers = {
  standard: {
    name: "Standard",
    rate: "₹1,850",
    label: null as string | null,
    blurb: "The honest baseline — turnkey construction at builder rates.",
    features: [
      "Foundation to handover (turnkey)",
      "RCC frame structure",
      "Standard MS doors & windows",
      "Ceramic flooring (vitrified in living)",
      "Standard sanitaryware (Cera / Hindware)",
      "Single-coat exterior emulsion",
      "Basic electrical points",
      "12-month structural warranty",
    ],
  },
  premium: {
    name: "Premium",
    rate: "₹2,450",
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
  luxury: {
    name: "Luxury",
    rate: "₹3,200",
    label: null as string | null,
    blurb: "Everything imported, smart, and tailored to how you actually live.",
    features: [
      "Everything in Premium, plus:",
      "Imported tile / wood flooring",
      "Modular kitchen (chef-grade)",
      "Smart home automation",
      "Landscaped garden + driveway",
      "Solar + rainwater harvesting",
      "Custom interior consultation",
      "10-year structural warranty",
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
        backgroundColor: isFeatured ? "var(--bg-deep)" : "var(--bg-cream)",
        borderRadius: 24,
        border: isFeatured
          ? "1px solid rgba(212,160,23,0.55)"
          : "1px solid rgba(15,61,46,0.08)",
        boxShadow: isFeatured
          ? "0 24px 60px rgba(15,61,46,0.4), 0 0 0 1px rgba(212,160,23,0.1)"
          : "0 14px 36px rgba(15,61,46,0.08)",
        transform: isFeatured ? "translateY(-8px)" : "translateY(0)",
      }}
      initial={prefersReduced ? { opacity: 1, y: isFeatured ? -8 : 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: isFeatured ? -8 : 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: animationDelay, ease: EASE }}
      whileHover={prefersReduced ? {} : { y: isFeatured ? -14 : -6 }}
    >
      {t.label && (
        <div
          className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase"
          style={{
            backgroundColor: "var(--accent-gold)",
            color: "var(--bg-deep)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 700,
            letterSpacing: "0.14em",
            borderRadius: 999,
            boxShadow: "0 6px 18px rgba(212,160,23,0.4)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--bg-deep)" }}
            aria-hidden="true"
          />
          {t.label}
        </div>
      )}

      <div className="p-8 lg:p-10 flex flex-col flex-1">
        <span
          className="text-[10px] uppercase mb-4"
          style={{
            color: "var(--accent-gold)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            letterSpacing: "0.24em",
            fontWeight: 700,
          }}
        >
          {t.name}
        </span>

        <div className="mb-2 flex items-baseline gap-1.5">
          <span
            className="tabular-nums"
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontWeight: 600,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: isFeatured ? "var(--bg-cream)" : "var(--ink)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {t.rate}
          </span>
          <span
            className="text-sm"
            style={{
              color: isFeatured ? "rgba(246,241,231,0.6)" : "var(--ink-faint)",
              fontFamily: "var(--font-montserrat, sans-serif)",
            }}
          >
            / sq ft
          </span>
        </div>

        <p
          className="mb-7 text-[14px]"
          style={{
            color: isFeatured ? "rgba(246,241,231,0.75)" : "var(--ink-muted)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            lineHeight: 1.6,
          }}
        >
          {t.blurb}
        </p>

        <div
          className="h-px w-full mb-6"
          style={{
            backgroundColor: isFeatured
              ? "rgba(212,160,23,0.2)"
              : "rgba(15,61,46,0.08)",
          }}
          aria-hidden="true"
        />

        <ul className="flex-1 space-y-3 mb-8">
          {t.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[13.5px]"
              style={{
                color: isFeatured ? "rgba(246,241,231,0.85)" : "var(--ink-muted)",
                fontFamily: "var(--font-montserrat, sans-serif)",
              }}
            >
              <Check
                size={14}
                className="shrink-0 mt-1"
                style={{ color: "var(--accent-gold)" }}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/contact?type=construction"
          className="inline-flex items-center justify-center gap-2 text-[14px] transition-all hover:brightness-110 active:scale-[0.98]"
          style={{
            background: isFeatured
              ? "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)"
              : "transparent",
            color: isFeatured ? "var(--bg-deep)" : "var(--bg-deep)",
            border: isFeatured
              ? "none"
              : "1.5px solid var(--bg-deep)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 600,
            padding: "13px 22px",
            borderRadius: 999,
            boxShadow: isFeatured
              ? "0 8px 22px rgba(212,160,23,0.4), inset 0 1px 0 rgba(255,255,255,0.3)"
              : "none",
          }}
        >
          Request detailed quote
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
