"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import { locations } from "@/lib/data/locations";

export function LocationsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="space-y-0">
      {locations.map((loc, index) => {
        const textOnLeft = index % 2 === 0;
        return (
          <motion.div
            key={loc.slug}
            className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px]"
            style={{ borderTop: "1px solid var(--line)" }}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Text column */}
            <motion.div
              className={`lg:col-span-7 py-14 flex flex-col justify-center ${
                textOnLeft ? "lg:pr-14" : "lg:order-2 lg:pl-14"
              }`}
              initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: textOnLeft ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              <div
                className="text-6xl font-display font-semibold mb-3 opacity-15 tabular-nums select-none"
                style={{
                  fontFamily: "var(--font-fraunces, Georgia, serif)",
                  color: "var(--ink)",
                }}
                aria-hidden="true"
              >
                {loc.number}
              </div>
              <h3
                className="mb-1"
                style={{
                  fontFamily: "var(--font-fraunces, Georgia, serif)",
                  fontWeight: 600,
                  fontSize: "1.875rem",
                  color: "var(--ink)",
                }}
              >
                {loc.name}
              </h3>
              <p
                className="mb-5 italic"
                style={{
                  color: "var(--accent-gold)",
                  fontFamily: "var(--font-fraunces, Georgia, serif)",
                  fontSize: "1.0625rem",
                }}
              >
                {loc.tagline}
              </p>
              <div className="space-y-3 mb-7">
                {loc.body.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm"
                    style={{
                      color: "var(--ink-muted)",
                      lineHeight: 1.7,
                      fontFamily: "var(--font-dm-sans, sans-serif)",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-7">
                {[
                  { label: "Active projects", value: loc.stats.activeProjects },
                  { label: "Starting price", value: loc.stats.startingPrice },
                  { label: "Distance from Chennai", value: loc.stats.distanceFromChennai },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="text-xs uppercase tracking-wide"
                      style={{
                        color: "var(--ink-faint)",
                        fontFamily: "var(--font-dm-sans, sans-serif)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {stat.label}
                    </p>
                    <p
                      className="text-sm font-medium tabular-nums"
                      style={{
                        color: "var(--ink)",
                        fontFamily: "var(--font-dm-sans, sans-serif)",
                        fontWeight: 500,
                      }}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href={`/locations/${loc.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 w-fit group"
                style={{
                  color: "var(--accent-gold)",
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontWeight: 500,
                }}
              >
                Explore {loc.name}
                <span
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </motion.div>

            {/* Image column */}
            <motion.div
              className={`lg:col-span-5 relative min-h-[300px] ${textOnLeft ? "" : "lg:order-1"}`}
              initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: textOnLeft ? 32 : -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            >
              <div className="absolute inset-0 overflow-hidden img-warm">
                <Image
                  src={loc.image}
                  alt={loc.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
