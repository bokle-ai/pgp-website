"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE } from "@/lib/animation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type RowProps = {
  id: string;
  index: string;
  title: string;
  heading: string;
  image: string;
  imageAlt: string;
  imageLeft: boolean;
  bullets?: string[];
  pricing?: { tier: string; rate: string; notes: string }[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
};

function Row(props: RowProps) {
  const prefersReduced = useReducedMotion();
  const {
    id,
    index,
    title,
    heading,
    image,
    imageAlt,
    imageLeft,
    bullets,
    pricing,
    ctaLabel,
    ctaHref,
    featured,
    badge,
  } = props;

  const ImageBlock = (
    <motion.div
      className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full img-warm overflow-hidden"
      initial={prefersReduced ? false : { opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 45vw"
      />
    </motion.div>
  );

  const TextBlock = (
    <motion.div
      className="flex flex-col justify-center py-14 lg:py-24 px-6 sm:px-10 lg:px-16"
      style={{
        backgroundColor: featured
          ? "rgba(212,160,23,0.07)"
          : "var(--bg-cream)",
      }}
      variants={fadeUp}
      initial={prefersReduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {badge && (
        <span
          className="inline-flex w-fit items-center px-3 py-1 text-[10px] uppercase mb-5"
          style={{
            backgroundColor: "var(--accent-gold)",
            color: "var(--bg-deep)",
            letterSpacing: "0.18em",
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 600,
          }}
        >
          {badge}
        </span>
      )}

      <div className="flex items-center gap-3 mb-5">
        <span
          className="h-px w-8"
          style={{ backgroundColor: "var(--accent-gold)" }}
          aria-hidden="true"
        />
        <span
          className="text-xs uppercase"
          style={{
            color: "var(--accent-gold)",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-montserrat, sans-serif)",
          }}
        >
          {index} · {title}
        </span>
      </div>

      <h3
        className="mb-7 max-w-[20ch]"
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontWeight: 500,
          fontSize: "clamp(1.75rem, 3vw + 0.4rem, 2.75rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--ink)",
        }}
      >
        {heading}
      </h3>

      {bullets && (
        <ul className="mb-9 space-y-3 max-w-[42ch]">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 text-[0.95rem]"
              style={{
                color: "var(--ink-muted)",
                fontFamily: "var(--font-montserrat, sans-serif)",
                lineHeight: 1.6,
              }}
            >
              <span
                className="mt-1 shrink-0"
                style={{ color: "var(--accent-gold)" }}
                aria-hidden="true"
              >
                —
              </span>
              {b}
            </li>
          ))}
        </ul>
      )}

      {pricing && (
        <div className="mb-9 max-w-md">
          <div
            className="border"
            style={{ borderColor: "rgba(212,160,23,0.3)" }}
          >
            {pricing.map((row, i) => (
              <div
                key={row.tier}
                className="flex items-baseline justify-between px-5 py-4"
                style={{
                  borderTop: i > 0 ? "1px solid rgba(212,160,23,0.18)" : "none",
                }}
              >
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: "var(--ink)",
                      fontFamily: "var(--font-montserrat, sans-serif)",
                    }}
                  >
                    {row.tier}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{
                      color: "var(--ink-faint)",
                      fontFamily: "var(--font-montserrat, sans-serif)",
                    }}
                  >
                    {row.notes}
                  </p>
                </div>
                <p
                  className="tabular-nums"
                  style={{
                    fontFamily: "var(--font-playfair, Georgia, serif)",
                    fontWeight: 500,
                    fontSize: "1.35rem",
                    color: "var(--accent-gold)",
                  }}
                >
                  {row.rate}
                  <span
                    className="text-[10px] ml-0.5"
                    style={{
                      color: "var(--ink-faint)",
                      fontFamily: "var(--font-montserrat, sans-serif)",
                    }}
                  >
                    /sqft
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href={ctaHref}
        className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 group/cta w-fit"
        style={{
          color: "var(--accent-gold)",
          fontFamily: "var(--font-montserrat, sans-serif)",
          fontWeight: 500,
          letterSpacing: "0.04em",
        }}
      >
        {ctaLabel}
        <span
          className="transition-transform group-hover/cta:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </Link>
    </motion.div>
  );

  // Mobile: image first then text. Desktop: depends on imageLeft.
  return (
    <div
      id={id}
      className="grid grid-cols-1 lg:grid-cols-100 min-h-[60vh]"
      style={{
        gridTemplateColumns: undefined,
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-12 w-full"
        style={{ minHeight: "inherit" }}
      >
        {imageLeft ? (
          <>
            <div className="lg:col-span-5 order-1">{ImageBlock}</div>
            <div className="lg:col-span-7 order-2">{TextBlock}</div>
          </>
        ) : (
          <>
            <div className="lg:col-span-7 order-2 lg:order-1">{TextBlock}</div>
            <div className="lg:col-span-5 order-1 lg:order-2">{ImageBlock}</div>
          </>
        )}
      </div>
    </div>
  );
}

export function ServiceRows() {
  return (
    <div>
      <Row
        id="plots"
        index="01"
        title="Plots"
        heading="DTCP-approved land in Chennai's fastest-growing corridors."
        image="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=1200&h=900&fit=crop"
        imageAlt="Aerial view of a plotted residential layout"
        imageLeft={true}
        bullets={[
          "Sizes from 600 to 2,400 sq ft. Starting at ₹1,650 / sq ft.",
          "Clear titles. Patta, EC, parent docs — verified before you sign.",
          "Site visits seven days a week. NRI video walkthroughs on request.",
        ]}
        ctaLabel="View available plots"
        ctaHref="/projects"
      />

      <Row
        id="construction"
        index="02"
        title="Construction"
        heading="Turnkey homes. Transparent per-sqft pricing."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=900&fit=crop"
        imageAlt="Construction site with skilled workers building a home"
        imageLeft={false}
        featured
        badge="Most asked for"
        pricing={[
          { tier: "Standard", rate: "₹1,850", notes: "Foundation to handover, basic finishes" },
          { tier: "Premium", rate: "₹2,450", notes: "Vitrified flooring, modular kitchen" },
          { tier: "Luxury", rate: "₹3,200", notes: "Imported finishes, smart home" },
        ]}
        ctaLabel="Get a construction quote"
        ctaHref="/#construction-pricing"
      />

      <Row
        id="resale"
        index="03"
        title="Resale"
        heading="Already own land? We'll find the right buyer."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=900&fit=crop"
        imageAlt="Family discussing property documents at a meeting"
        imageLeft={true}
        bullets={[
          "A verified buyer network built over a decade in Chennai.",
          "Professional listing, valuation, and documentation end-to-end.",
          "Transparent commission. No surprises after the deal closes.",
        ]}
        ctaLabel="List your property"
        ctaHref="/contact?type=resale"
      />
    </div>
  );
}
