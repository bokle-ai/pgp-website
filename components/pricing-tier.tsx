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
    label: null,
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
    label: null,
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
      className="relative flex flex-col p-8"
      style={{
        border: isFeatured ? "2px solid var(--accent-gold)" : "1px solid var(--line)",
        backgroundColor: isFeatured ? "var(--bg-deep)" : "white",
        borderRadius: 0,
      }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: animationDelay, ease: EASE }}
      whileHover={
        prefersReduced || isFeatured
          ? {}
          : { y: -4, transition: { duration: 0.2 } }
      }
    >
      {t.label && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium whitespace-nowrap"
          style={{
            backgroundColor: "var(--accent-gold)",
            color: "var(--bg-deep)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            borderRadius: "4px",
          }}
        >
          {t.label}
        </div>
      )}

      <div
        className="text-xs uppercase tracking-widest mb-2"
        style={{
          color: isFeatured ? "var(--accent-gold)" : "var(--ink-muted)",
          fontFamily: "var(--font-montserrat, sans-serif)",
          letterSpacing: "0.18em",
        }}
      >
        {t.name}
      </div>

      <div className="mb-1 flex items-end gap-1">
        <span
          className="tabular-nums"
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontWeight: 600,
            fontSize: "2.5rem",
            color: isFeatured ? "var(--bg-cream)" : "var(--ink)",
            lineHeight: 1,
          }}
        >
          {t.rate}
        </span>
      </div>
      <div
        className="text-xs mb-8"
        style={{
          color: isFeatured ? "rgba(246,241,231,0.55)" : "var(--ink-faint)",
          fontFamily: "var(--font-montserrat, sans-serif)",
        }}
      >
        / sq ft starting
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {t.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm"
            style={{
              color: isFeatured ? "rgba(246,241,231,0.8)" : "var(--ink-muted)",
              fontFamily: "var(--font-montserrat, sans-serif)",
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
        className="flex items-center justify-center h-11 text-sm font-medium transition-opacity hover:opacity-90"
        style={{
          backgroundColor: isFeatured ? "var(--accent-gold)" : "transparent",
          color: isFeatured ? "var(--bg-deep)" : "var(--accent-gold)",
          border: isFeatured ? "none" : "1px solid var(--accent-gold)",
          fontFamily: "var(--font-montserrat, sans-serif)",
          fontWeight: 500,
          borderRadius: "6px",
        }}
      >
        Request a detailed quote
      </Link>
    </motion.div>
  );
}
