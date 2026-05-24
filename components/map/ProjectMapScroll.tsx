"use client";

import { useEffect, useRef, useState } from "react";
import { geoMercator, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { MAP_PROJECTS, CORRIDORS, CHENNAI_REFERENCE, CLUSTER_CENTER } from "@/lib/data/map-projects";

/**
 * Scroll-driven 2D map: starts wide on Tamil Nadu with Chennai pinned, then as
 * the user scrolls the camera zooms south-west into Cheyyar Taluk and the
 * 6 plot pins fade in. Built with framer-motion `useScroll` + `useTransform`.
 *
 * The map is rendered as a single SVG with a viewBox that stays constant.
 * Zoom + pan is achieved by transforming a <g> wrapper (scale + translate),
 * so a single d3 projection is reused throughout — no re-projection on
 * scroll, just GPU transforms.
 */

const SVG_W = 1200;
const SVG_H = 800;

// Composition target viewports in lat/lng space — what the camera should
// "look at" at each scroll stage. Picked manually to favour the storyline.
const VIEWS = {
  // Stage 0 — wide TN, Chennai visible
  wide: { lat: 11.2, lng: 78.5, scale: 1 },
  // Stage 1 — zoomed into NE Tamil Nadu (Chennai + Cheyyar corridor)
  corridor: { lat: 12.85, lng: 79.9, scale: 2.4 },
  // Stage 2 — tight on Cheyyar Taluk (the project cluster)
  tight: { lat: 12.66, lng: 79.55, scale: 5.5 },
};

interface TnFeature {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon;
}

export function ProjectMapScroll() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tnGeoJSON, setTnGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);
  const [districtGeoJSON, setDistrictGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/tamil-nadu.geojson").then((r) => r.json()),
      fetch("/data/tamil-nadu-districts.geojson").then((r) => r.json()),
    ])
      .then(([tn, d]) => {
        setTnGeoJSON(tn);
        setDistrictGeoJSON(d);
      })
      .catch(console.error);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Build the projection from the TN geojson so it fills the viewBox.
  // The same projection is used for every lat/lng → SVG conversion below.
  const projection =
    tnGeoJSON &&
    geoMercator().fitSize([SVG_W, SVG_H], tnGeoJSON as GeoPermissibleObjects);

  // Helper to convert a lat/lng into SVG coords.
  const project = (lat: number, lng: number): [number, number] => {
    if (!projection) return [SVG_W / 2, SVG_H / 2];
    const r = projection([lng, lat]);
    return r ?? [SVG_W / 2, SVG_H / 2];
  };

  // Helper to make geo coordinate → CSS transform that recenters that
  // point and applies a scale.
  const makeTransform = (view: { lat: number; lng: number; scale: number }) => {
    if (!projection) return "translate(0px, 0px) scale(1)";
    const [px, py] = project(view.lat, view.lng);
    const cx = SVG_W / 2;
    const cy = SVG_H / 2;
    const tx = (cx - px) * view.scale;
    const ty = (cy - py) * view.scale;
    return `translate(${tx}px, ${ty}px) scale(${view.scale})`;
  };

  // Drive a smooth transform across 3 stages: wide → corridor → tight.
  const transform = useTransform(scrollYProgress, [0, 0.5, 1], [
    makeTransform(VIEWS.wide),
    makeTransform(VIEWS.corridor),
    makeTransform(VIEWS.tight),
  ]);

  // Opacity of TN-wide context (districts) — fades out as we zoom into Cheyyar.
  const tnOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.55, 0.18]);
  // Cheyyar highlight grows in as we approach.
  const cheyyarOpacity = useTransform(scrollYProgress, [0.2, 0.55, 1], [0, 0.6, 1]);
  // Chennai pin always visible.
  const chennaiOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  // Corridor arc fades in mid-way.
  const arcOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  // Project pins fade in toward the end.
  const projectPinsOpacity = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);

  // Stage indicator (which of the 3 captions to highlight). Driven by raw
  // scroll progress in state so we can render text outside the SVG.
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setStage(v < 0.33 ? 0 : v < 0.7 ? 1 : 2);
    });
    return () => unsub();
  }, [scrollYProgress]);

  if (!tnGeoJSON || !districtGeoJSON || !projection) {
    return (
      <div
        ref={containerRef}
        style={{ height: "80vh", backgroundColor: "var(--bg-cream)" }}
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

  const pathGen = geoPath(projection);
  const tnPath = pathGen(tnGeoJSON.features[0] as TnFeature) || "";

  // Find the Cheyyar district polygon for the highlight overlay
  const cheyyarDistricts = districtGeoJSON.features.filter((f) => {
    const name = (f.properties as Record<string, unknown>)?.district as string;
    return name === "Tiruvannamalai" || name === "Kancheepuram" || name === "Thiruvallur";
  });
  const cheyyarRegionPath = cheyyarDistricts
    .map((f) => pathGen(f as GeoJSON.Feature) || "")
    .join(" ");

  const districtPaths = districtGeoJSON.features.map((f) => ({
    name: (f.properties as Record<string, unknown>)?.district as string,
    d: pathGen(f as GeoJSON.Feature) || "",
  }));

  const [chennaiX, chennaiY] = project(CHENNAI_REFERENCE.lat, CHENNAI_REFERENCE.lng);
  const [clusterX, clusterY] = project(CLUSTER_CENTER.lat, CLUSTER_CENTER.lng);

  // Bezier control point for the Chennai → Cheyyar arc.
  const cpX = (chennaiX + clusterX) / 2 + 30;
  const cpY = (chennaiY + clusterY) / 2 - 30;
  const arcD = `M ${chennaiX} ${chennaiY} Q ${cpX} ${cpY} ${clusterX} ${clusterY}`;

  return (
    <div ref={containerRef} className="relative" style={{ height: "320vh" }}>
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh", backgroundColor: "var(--bg-cream)" }}
      >
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-x-8 max-w-7xl mx-auto px-6 lg:px-10 items-center">
          {/* LEFT — narrative copy */}
          <div className="lg:col-span-4 z-10 pointer-events-none pt-24 lg:pt-0">
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
              className="mb-6"
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontWeight: 600,
                fontSize: "clamp(2rem, 3.5vw + 1rem, 3.4rem)",
                color: "var(--ink)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              One state.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--accent-gold)",
                }}
              >
                One quiet pocket.
              </em>
            </h2>

            <ol className="space-y-4">
              {[
                {
                  num: "01",
                  title: "Start with Chennai.",
                  body: "Our base since 2013 — every project is reachable on a Saturday morning drive.",
                },
                {
                  num: "02",
                  title: "~100 km south-west.",
                  body: "We don't sprawl across Tamil Nadu. One corridor, run end-to-end, every weekend.",
                },
                {
                  num: "03",
                  title: "Cheyyar Taluk.",
                  body: "6 active projects across Papanthangal, Perumpallam, and Cheyyar villages.",
                },
              ].map((step, i) => {
                const active = i === stage;
                return (
                  <li
                    key={step.num}
                    className="flex items-start gap-4"
                    style={{
                      opacity: active ? 1 : 0.42,
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    <span
                      className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full text-[12px] tabular-nums"
                      style={{
                        background: active
                          ? "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)"
                          : "transparent",
                        border: active
                          ? "none"
                          : "1px solid rgba(15,61,46,0.22)",
                        color: active ? "var(--bg-deep)" : "var(--ink-muted)",
                        fontWeight: 700,
                        fontFamily: "var(--font-montserrat, sans-serif)",
                        boxShadow: active
                          ? "0 6px 16px rgba(212,160,23,0.32), inset 0 1px 0 rgba(255,255,255,0.3)"
                          : "none",
                        transition: "all 0.4s ease",
                      }}
                      aria-hidden="true"
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3
                        className="mb-1 text-[15px]"
                        style={{
                          fontFamily: "var(--font-playfair, Georgia, serif)",
                          fontWeight: 600,
                          color: "var(--ink)",
                          letterSpacing: "-0.005em",
                          lineHeight: 1.25,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-[13.5px]"
                        style={{
                          color: "var(--ink-muted)",
                          fontFamily: "var(--font-montserrat, sans-serif)",
                          lineHeight: 1.55,
                        }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* RIGHT — the SVG map */}
          <div className="lg:col-span-8 relative h-full flex items-center justify-center">
            <motion.svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              width="100%"
              height="80%"
              className="overflow-visible"
              style={{ maxHeight: "80vh" }}
            >
              <defs>
                <radialGradient id="cheyyarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D4A017" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
                </radialGradient>
                <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>

              <motion.g style={prefersReduced ? {} : { transform }}>
                {/* Tamil Nadu landmass outline (faint base) */}
                <motion.path
                  d={tnPath}
                  fill="rgba(15,61,46,0.06)"
                  stroke="rgba(15,61,46,0.35)"
                  strokeWidth={1.2}
                  style={{ opacity: tnOpacity }}
                />

                {/* District boundaries — very subtle */}
                <motion.g style={{ opacity: tnOpacity }}>
                  {districtPaths.map((d) => (
                    <path
                      key={d.name}
                      d={d.d}
                      fill="transparent"
                      stroke="rgba(15,61,46,0.16)"
                      strokeWidth={0.5}
                      strokeDasharray="2 3"
                    />
                  ))}
                </motion.g>

                {/* Cheyyar region highlight (Tiruvannamalai + Kancheepuram + Thiruvallur) */}
                <motion.path
                  d={cheyyarRegionPath}
                  fill="rgba(212,160,23,0.16)"
                  stroke="rgba(212,160,23,0.55)"
                  strokeWidth={1}
                  style={{ opacity: cheyyarOpacity }}
                />

                {/* Soft glow under the cluster */}
                <motion.circle
                  cx={clusterX}
                  cy={clusterY}
                  r={36}
                  fill="url(#cheyyarGlow)"
                  style={{ opacity: cheyyarOpacity }}
                />

                {/* Chennai → Cheyyar arc */}
                <motion.path
                  d={arcD}
                  fill="none"
                  stroke="var(--accent-gold)"
                  strokeWidth={1.4}
                  strokeDasharray="4 4"
                  style={{ opacity: arcOpacity }}
                />

                {/* Chennai pin */}
                <motion.g style={{ opacity: chennaiOpacity }}>
                  <circle
                    cx={chennaiX}
                    cy={chennaiY}
                    r={4.5}
                    fill="var(--accent-gold)"
                    stroke="white"
                    strokeWidth={1.5}
                  />
                  <text
                    x={chennaiX + 9}
                    y={chennaiY + 4}
                    fontFamily="var(--font-montserrat, sans-serif)"
                    fontSize={11}
                    fontWeight={700}
                    fill="var(--ink)"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    CHENNAI
                  </text>
                </motion.g>

                {/* The 6 project pins */}
                <motion.g style={{ opacity: projectPinsOpacity }}>
                  {MAP_PROJECTS.map((p, i) => {
                    const [x, y] = project(p.coordinates.lat, p.coordinates.lng);
                    return (
                      <g key={p.slug}>
                        <circle
                          cx={x}
                          cy={y}
                          r={3}
                          fill="var(--accent-gold)"
                          stroke="var(--bg-deep)"
                          strokeWidth={0.8}
                        />
                        {/* Stagger labels so they don't overlap */}
                        <text
                          x={x + 5}
                          y={y + (i % 2 === 0 ? -4 : 8)}
                          fontFamily="var(--font-montserrat, sans-serif)"
                          fontSize={6}
                          fontWeight={600}
                          fill="var(--bg-deep)"
                          style={{ letterSpacing: "0.03em" }}
                        >
                          {p.name}
                        </text>
                      </g>
                    );
                  })}
                </motion.g>
              </motion.g>
            </motion.svg>

            {/* Distance summary badge — pinned overlay (not scaled) */}
            <motion.div
              className="absolute bottom-8 right-6 lg:right-10"
              style={{ opacity: arcOpacity }}
            >
              <div
                className="px-4 py-2.5 rounded-full text-[12px] uppercase"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                  color: "var(--bg-deep)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  boxShadow:
                    "0 8px 24px rgba(212,160,23,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                ~100 km · 2 hrs from Chennai
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint at the bottom */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase pointer-events-none"
          style={{
            color: "var(--ink-faint)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            letterSpacing: "0.24em",
            opacity: stage === 0 ? 0.75 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          Scroll to zoom in ↓
        </div>
      </div>

      {/* Final view: a compact summary list of the 6 projects, reachable
          once the user finishes scrolling through the map sequence. */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none h-0">
        <div className="sr-only">
          <h2>Projects in Cheyyar Taluk</h2>
          <ul>
            {MAP_PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`}>
                  {p.name} — {p.corridorDisplay} — ₹{p.priceInLakhs} Lakhs
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            {CORRIDORS.map((c) => (
              <li key={c.id}>
                {c.name} — {c.tagline}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
