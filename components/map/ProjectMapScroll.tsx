"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { geoMercator, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import { MAP_PROJECTS, CORRIDORS, CHENNAI_REFERENCE } from "@/lib/data/map-projects";

/**
 * Static, info-first locations panel.
 *
 * - LEFT: a small SVG map showing Tamil Nadu with Chennai pinned and a gold
 *   dashed arc pointing to the Cheyyar pocket where every PGP project lives.
 *   Inside the highlighted pocket sits a numbered cluster (1–6) — one number
 *   per project, lightly fanned out so the pins don't overlap.
 *
 * - RIGHT: a clean numbered list of the same 6 projects with name, location,
 *   plot size, price, status, and a "View" arrow link. Numbers match the pins.
 *
 * No scroll-driven zooming — that approach made the pin labels overlap and
 * hid the actual plot information, which is what visitors come here for.
 */

const SVG_W = 520;
const SVG_H = 600;

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  available: { label: "Available", color: "var(--available, #2E7D5B)" },
  few_left: { label: "Few left", color: "var(--few-left, #B8860B)" },
  sold_out: { label: "Sold out", color: "var(--sold-out, #8B3A3A)" },
};

// Hand-tuned offsets so the 6 pin numbers don't pile on top of each other.
// Real coords are within ~7 km so on a state-scale map they'd collide; we
// nudge them in screen space ONLY for visual separation. The corridor data
// + list still shows the accurate village.
const PIN_VISUAL_OFFSETS: Record<string, { dx: number; dy: number }> = {
  "sulaman-nagar":              { dx: -10, dy: -16 },
  "vetrivel-nagar":             { dx:  12, dy:  -6 },
  "valli-murugan-nagar":        { dx:  20, dy:   8 },
  "amma-nagar":                 { dx:  -8, dy:   6 },
  "brindavanan-nagar-sengadu":  { dx: -16, dy:  14 },
  "brindavanan-nagar-irungal":  { dx:   6, dy:  22 },
};

export function ProjectMapScroll() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [tnGeoJSON, setTnGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    fetch("/data/tamil-nadu.geojson")
      .then((r) => r.json())
      .then(setTnGeoJSON)
      .catch(console.error);
  }, []);

  if (!tnGeoJSON) {
    return (
      <div
        style={{ height: "60vh", backgroundColor: "var(--bg-cream)" }}
        className="flex items-center justify-center"
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "2px solid var(--accent-gold)",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const projection = geoMercator().fitSize(
    [SVG_W, SVG_H],
    tnGeoJSON as GeoPermissibleObjects
  );
  const pathGen = geoPath(projection);
  const tnPath = pathGen(tnGeoJSON.features[0] as GeoJSON.Feature) || "";

  const project = (lat: number, lng: number): [number, number] => {
    const r = projection([lng, lat]);
    return r ?? [SVG_W / 2, SVG_H / 2];
  };

  const [chennaiX, chennaiY] = project(CHENNAI_REFERENCE.lat, CHENNAI_REFERENCE.lng);
  const cheyyar = CORRIDORS.find((c) => c.id === "cheyyar")!.center;
  const [cheyyarX, cheyyarY] = project(cheyyar.lat, cheyyar.lng);

  // Bezier control point for the arc — gives it a soft southward curve.
  const cpX = (chennaiX + cheyyarX) / 2 + 24;
  const cpY = (chennaiY + cheyyarY) / 2 - 28;
  const arcD = `M ${chennaiX} ${chennaiY} Q ${cpX} ${cpY} ${cheyyarX} ${cheyyarY}`;

  return (
    <div
      ref={sectionRef}
      className="py-20 lg:py-28"
      style={{ backgroundColor: "var(--bg-cream)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div
            className="text-[10px] uppercase mb-3"
            style={{
              color: "var(--accent-gold)",
              fontFamily: "var(--font-montserrat, sans-serif)",
              letterSpacing: "0.24em",
              fontWeight: 700,
            }}
          >
            Where we build
          </div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontWeight: 600,
              fontSize: "clamp(2rem, 3.5vw + 1rem, 3.4rem)",
              color: "var(--ink)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            One quiet pocket.{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--accent-gold)",
              }}
            >
              Six projects.
            </em>
          </h2>
          <p
            className="max-w-[60ch]"
            style={{
              color: "var(--ink-muted)",
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontSize: "16px",
              lineHeight: 1.65,
            }}
          >
            Every PGP project sits inside <strong style={{ color: "var(--ink)" }}>Cheyyar Taluk</strong>
            , Tiruvannamalai district — a quiet farming-village pocket about
            <strong style={{ color: "var(--ink)" }}> 100 km south-west of Chennai</strong>. One
            corridor, run end-to-end.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT — map */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div
              className="relative p-6 lg:p-8"
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                border: "1px solid rgba(15,61,46,0.08)",
                boxShadow: "0 18px 48px rgba(15,61,46,0.08)",
              }}
            >
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                width="100%"
                height="auto"
                className="overflow-visible"
                role="img"
                aria-label="Tamil Nadu with Chennai pinned and 6 PGP projects in Cheyyar Taluk"
              >
                <defs>
                  <radialGradient id="cheyyarHaloStatic" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D4A017" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Tamil Nadu landmass — soft fill */}
                <path
                  d={tnPath}
                  fill="rgba(15,61,46,0.06)"
                  stroke="rgba(15,61,46,0.35)"
                  strokeWidth={1.1}
                />

                {/* Glow under the cluster */}
                <circle cx={cheyyarX} cy={cheyyarY} r={42} fill="url(#cheyyarHaloStatic)" />

                {/* Chennai → Cheyyar arc */}
                <path
                  d={arcD}
                  fill="none"
                  stroke="var(--accent-gold)"
                  strokeWidth={1.3}
                  strokeDasharray="4 4"
                  opacity={0.85}
                />

                {/* Chennai pin */}
                <g>
                  <circle
                    cx={chennaiX}
                    cy={chennaiY}
                    r={4}
                    fill="var(--accent-gold)"
                    stroke="white"
                    strokeWidth={1.5}
                  />
                  <text
                    x={chennaiX + 8}
                    y={chennaiY - 6}
                    fontFamily="var(--font-montserrat, sans-serif)"
                    fontSize={10}
                    fontWeight={700}
                    fill="var(--ink)"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    CHENNAI
                  </text>
                </g>

                {/* Project pins — numbered, fanned out around Cheyyar */}
                {MAP_PROJECTS.map((p, i) => {
                  const off = PIN_VISUAL_OFFSETS[p.slug] ?? { dx: 0, dy: 0 };
                  const px = cheyyarX + off.dx;
                  const py = cheyyarY + off.dy;
                  return (
                    <g key={p.slug}>
                      <circle
                        cx={px}
                        cy={py}
                        r={10}
                        fill="var(--accent-gold)"
                        stroke="white"
                        strokeWidth={2}
                        style={{
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.18))",
                        }}
                      />
                      <text
                        x={px}
                        y={py + 4}
                        textAnchor="middle"
                        fontFamily="var(--font-montserrat, sans-serif)"
                        fontSize={11}
                        fontWeight={700}
                        fill="var(--bg-deep)"
                      >
                        {i + 1}
                      </text>
                    </g>
                  );
                })}

                {/* "Cheyyar Taluk" caption near the cluster */}
                <text
                  x={cheyyarX + 50}
                  y={cheyyarY + 40}
                  fontFamily="var(--font-playfair, Georgia, serif)"
                  fontSize={14}
                  fontStyle="italic"
                  fill="var(--accent-gold)"
                  fontWeight={500}
                >
                  Cheyyar Taluk
                </text>
              </svg>

              {/* Distance pill */}
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-2 rounded-full text-[12px] uppercase whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                  color: "var(--bg-deep)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  boxShadow:
                    "0 8px 20px rgba(212,160,23,0.34), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                ~100 km · 2 hrs from Chennai
              </div>
            </div>
          </motion.div>

          {/* RIGHT — numbered project list */}
          <motion.ol
            className="lg:col-span-7 space-y-3"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            {MAP_PROJECTS.map((p, i) => {
              const status = STATUS_LABELS[p.status] || STATUS_LABELS.available;
              return (
                <motion.li
                  key={p.slug}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.45,
                    delay: 0.25 + i * 0.06,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex items-center gap-5 p-4 lg:p-5 transition-all hover:translate-x-1"
                    style={{
                      backgroundColor: "white",
                      borderRadius: 18,
                      border: "1px solid rgba(15,61,46,0.08)",
                      boxShadow: "0 6px 20px rgba(15,61,46,0.05)",
                    }}
                  >
                    {/* Number badge */}
                    <span
                      className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full text-[14px] tabular-nums"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                        color: "var(--bg-deep)",
                        fontWeight: 700,
                        fontFamily: "var(--font-montserrat, sans-serif)",
                        boxShadow:
                          "0 4px 12px rgba(212,160,23,0.34), inset 0 1px 0 rgba(255,255,255,0.34)",
                      }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>

                    {/* Name + location */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h3
                          className="truncate"
                          style={{
                            fontFamily: "var(--font-playfair, Georgia, serif)",
                            fontWeight: 600,
                            fontSize: "1.15rem",
                            color: "var(--ink)",
                            letterSpacing: "-0.005em",
                          }}
                        >
                          {p.name}
                        </h3>
                        <span
                          className="text-[11px] uppercase"
                          style={{
                            color: status.color,
                            backgroundColor: `${status.color}20`,
                            fontFamily: "var(--font-montserrat, sans-serif)",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            padding: "2px 8px",
                            borderRadius: 999,
                          }}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p
                        className="mt-1 text-[13px] truncate"
                        style={{
                          color: "var(--ink-muted)",
                          fontFamily: "var(--font-montserrat, sans-serif)",
                        }}
                      >
                        {p.corridorDisplay} · {p.sizes} · {p.approval} approved
                      </p>
                    </div>

                    {/* Price */}
                    <div
                      className="shrink-0 text-right hidden sm:block"
                      style={{
                        fontFamily: "var(--font-playfair, Georgia, serif)",
                        fontWeight: 600,
                        color: "var(--bg-deep)",
                        fontSize: "1.2rem",
                        lineHeight: 1,
                      }}
                    >
                      ₹{p.priceInLakhs} L
                      <div
                        className="mt-1 text-[10px] uppercase"
                        style={{
                          color: "var(--ink-faint)",
                          fontFamily: "var(--font-montserrat, sans-serif)",
                          letterSpacing: "0.16em",
                          fontWeight: 600,
                        }}
                      >
                        {p.sizes.replace(/\s/g, "")}
                      </div>
                    </div>

                    {/* Arrow */}
                    <span
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                      style={{
                        color: "var(--accent-gold)",
                        fontSize: "20px",
                        fontWeight: 600,
                      }}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </div>
  );
}
