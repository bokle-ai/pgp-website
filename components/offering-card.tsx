"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import { PlotIcon } from "./icons/plot-icon";
import { HouseIcon } from "./icons/house-icon";
import { HandshakeIcon } from "./icons/handshake-icon";

interface OfferingCardProps {
  type: "plots" | "construction" | "resale";
  animationDelay?: number;
}

const data = {
  plots: {
    icon: PlotIcon,
    title: "Plots",
    tagline: "DTCP & CMDA approved layouts in Chennai's growth corridors.",
    bullets: [
      "Sizes from 600 to 2,400 sq ft",
      "Starting at ₹1,650 / sq ft",
      "Clear titles, full legal due diligence",
      "Site visits 7 days a week",
    ],
    cta: { label: "View available plots", href: "/#plots" },
    featured: false,
    badge: null,
    pricingTable: null,
  },
  construction: {
    icon: HouseIcon,
    title: "Construction",
    tagline: "Turnkey home construction at transparent per-sq-ft rates.",
    bullets: null,
    cta: { label: "Get a construction quote", href: "/#construction" },
    featured: true,
    badge: "Most asked for",
    pricingTable: [
      { tier: "Standard", rate: "₹1,850", notes: "Foundation to handover, basic finishes" },
      { tier: "Premium", rate: "₹2,450", notes: "Vitrified flooring, modular kitchen" },
      { tier: "Luxury", rate: "₹3,200", notes: "Imported finishes, smart home" },
    ],
  },
  resale: {
    icon: HandshakeIcon,
    title: "Resale",
    tagline: "Already own land? We'll find the right buyer.",
    bullets: [
      "Verified buyer network",
      "Professional listing & valuation",
      "Documentation handled end-to-end",
      "Transparent commission structure",
    ],
    cta: { label: "List your property", href: "/contact?type=resale" },
    featured: false,
    badge: null,
    pricingTable: null,
  },
};

export function OfferingCard({ type, animationDelay = 0 }: OfferingCardProps) {
  const d = data[type];
  const Icon = d.icon;
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="relative flex flex-col p-8 group h-full"
      style={{
        backgroundColor: d.featured ? "rgba(232,212,160,0.22)" : "white",
        border: "1px solid var(--line)",
        borderRadius: 0,
      }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: animationDelay, ease: EASE }}
      whileHover={prefersReduced ? {} : { y: -4 }}
    >
      {/* Hover gold left border */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: "var(--accent-gold)" }}
        initial={{ scaleY: 0, originY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        aria-hidden="true"
      />

      {d.badge && (
        <div
          className="absolute top-4 right-4 px-2.5 py-1 text-xs font-medium"
          style={{
            backgroundColor: "var(--accent-gold)",
            color: "var(--bg-deep)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            borderRadius: "4px",
          }}
        >
          {d.badge}
        </div>
      )}

      <div className="mb-5" style={{ color: "var(--accent-gold)" }}>
        <Icon />
      </div>

      <h3
        className="mb-2"
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontWeight: 600,
          fontSize: "1.5rem",
          color: "var(--ink)",
        }}
      >
        {d.title}
      </h3>
      <p
        className="mb-6 text-sm"
        style={{
          color: "var(--ink-muted)",
          lineHeight: 1.6,
          fontFamily: "var(--font-montserrat, sans-serif)",
        }}
      >
        {d.tagline}
      </p>

      {d.bullets && (
        <ul className="flex-1 mb-7 space-y-2.5">
          {d.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-sm"
              style={{
                color: "var(--ink-muted)",
                fontFamily: "var(--font-montserrat, sans-serif)",
              }}
            >
              <span
                className="mt-0.5 shrink-0 font-bold"
                style={{ color: "var(--accent-gold)" }}
                aria-hidden="true"
              >
                —
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {d.pricingTable && (
        <div
          className="flex-1 mb-7 overflow-hidden"
          style={{ border: "1px solid var(--line)", borderRadius: "4px" }}
        >
          <table
            className="w-full text-xs"
            style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}
          >
            <thead>
              <tr style={{ backgroundColor: "rgba(201,162,75,0.1)" }}>
                <th
                  className="text-left px-3 py-2 font-medium"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Tier
                </th>
                <th
                  className="text-left px-3 py-2 font-medium"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Rate
                </th>
                <th
                  className="text-left px-3 py-2 font-medium hidden sm:table-cell"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Inclusions
                </th>
              </tr>
            </thead>
            <tbody>
              {d.pricingTable.map((row, i) => (
                <tr
                  key={row.tier}
                  style={{ borderTop: i > 0 ? "1px solid var(--line)" : "none" }}
                >
                  <td
                    className="px-3 py-2.5 font-medium"
                    style={{ color: "var(--ink)" }}
                  >
                    {row.tier}
                  </td>
                  <td
                    className="px-3 py-2.5 tabular-nums font-medium"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {row.rate}
                    <span className="text-[10px]">/sq ft</span>
                  </td>
                  <td
                    className="px-3 py-2.5 text-[10px] hidden sm:table-cell"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {row.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link
        href={d.cta.href}
        className="text-sm font-medium transition-colors hover:opacity-70 flex items-center gap-1 group/link"
        style={{
          color: "var(--accent-gold)",
          fontFamily: "var(--font-montserrat, sans-serif)",
          fontWeight: 500,
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
    </motion.div>
  );
}
