"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { EASE } from "@/lib/animation";
import { MAP_PROJECTS } from "@/lib/data/map-projects";

// ─── Data ────────────────────────────────────────────────────────────────────
const corridors = [
  {
    id: "papanthangal",
    name: "Papanthangal",
    tagline: "15 min from Cheyyar town",
    color: "rgba(212,160,23,0.12)",
    borderColor: "rgba(212,160,23,0.35)",
    projects: MAP_PROJECTS.filter((p) => p.corridor === "papanthangal"),
  },
  {
    id: "perumpallam",
    name: "Perumpallam",
    tagline: "2 km from Cheyyar town",
    color: "rgba(15,61,46,0.06)",
    borderColor: "rgba(15,61,46,0.14)",
    projects: MAP_PROJECTS.filter((p) => p.corridor === "perumpallam"),
  },
  {
    id: "cheyyar",
    name: "Cheyyar",
    tagline: "Cheyyar Taluk heart",
    color: "rgba(212,160,23,0.08)",
    borderColor: "rgba(212,160,23,0.25)",
    projects: MAP_PROJECTS.filter((p) => p.corridor === "cheyyar"),
  },
];

// ─── Road animation ───────────────────────────────────────────────────────────
const roadVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

const dotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.6 + i * 0.15, ease: EASE },
  }),
};

// ─── Component ───────────────────────────────────────────────────────────────
export function DriveStrip() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref}>
      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 lg:pt-28 pb-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)",
              color: "var(--ink)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            One corridor,{" "}
            <span style={{ color: "var(--gold-ink)", fontStyle: "italic" }}>known by heart.</span>
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="text-sm max-w-[38ch] lg:text-right"
            style={{ color: "var(--ink-muted)", fontFamily: "var(--font-body)", lineHeight: 1.65 }}
          >
            Every PGP project sits inside <strong style={{ color: "var(--ink)" }}>Cheyyar Taluk</strong>,
            Tiruvannamalai district. One corridor, run end-to-end.
          </motion.p>
        </div>
      </div>

      {/* ── Drive visualization ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-10">
        <div className="relative flex items-center" style={{ height: 80 }}>

          {/* Chennai pill */}
          <motion.div
            custom={0}
            initial={prefersReduced ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
            variants={dotVariants}
            className="shrink-0 relative z-10"
          >
            <div
              className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-sm"
              style={{
                backgroundColor: "var(--bg-deep)",
                color: "var(--bg-cream)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.04em",
              }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: "var(--accent-gold)" }}
              />
              CHENNAI
            </div>
          </motion.div>

          {/* Road */}
          <div className="flex-1 relative mx-4" style={{ height: 24 }}>
            {/* Road base */}
            <motion.div
              className="absolute inset-y-[10px] left-0 right-0 rounded-full"
              style={{ backgroundColor: "rgba(15,61,46,0.1)", height: 4, top: "50%", transform: "translateY(-50%)" }}
              variants={roadVariants}
              initial={prefersReduced ? false : "hidden"}
              animate={inView ? "visible" : "hidden"}
            />
            {/* Dashed centre line */}
            <motion.div
              className="absolute left-0 right-0"
              style={{ top: "50%", transform: "translateY(-50%)", height: 2, overflow: "hidden" }}
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: "repeating-linear-gradient(to right, var(--accent-gold) 0 10px, transparent 10px 20px)",
                  opacity: 0.6,
                }}
              />
            </motion.div>

            {/* Distance label */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-1 text-center"
              initial={prefersReduced ? false : { opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.4, ease: EASE }}
            >
              <span
                className="text-[11px] uppercase tracking-widest"
                style={{ color: "var(--ink-faint)", fontFamily: "var(--font-body)", fontWeight: 600 }}
              >
                ~100 km · NH48 → SH66 · ~2 hrs drive
              </span>
            </motion.div>
          </div>

          {/* Cheyyar pill */}
          <motion.div
            custom={1}
            initial={prefersReduced ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
            variants={dotVariants}
            className="shrink-0 relative z-10"
          >
            <div
              className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-sm"
              style={{
                backgroundColor: "var(--accent-gold)",
                color: "var(--bg-deep)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.04em",
                boxShadow: "0 4px 16px rgba(212,160,23,0.35)",
              }}
            >
              <MapPin size={12} />
              CHEYYAR TALUK
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Three corridor cards ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {corridors.map((corridor, ci) => (
            <motion.div
              key={corridor.id}
              initial={prefersReduced ? false : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + ci * 0.12, ease: EASE }}
              className="flex flex-col rounded-2xl overflow-hidden"
              style={{
                border: `1px solid ${corridor.borderColor}`,
                backgroundColor: corridor.color,
              }}
            >
              {/* Card header */}
              <div
                className="px-6 py-5 flex items-start justify-between"
                style={{ borderBottom: `1px solid ${corridor.borderColor}` }}
              >
                <div>
                  <div
                    className="text-[10px] uppercase tracking-widest mb-1"
                    style={{ color: "var(--accent-gold)", fontFamily: "var(--font-body)", fontWeight: 700 }}
                  >
                    {corridor.tagline}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "1.4rem",
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {corridor.name}
                  </h3>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full shrink-0 mt-1"
                  style={{
                    backgroundColor: "var(--bg-deep)",
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    letterSpacing: "0.06em",
                  }}
                >
                  {corridor.projects.length} {corridor.projects.length === 1 ? "project" : "projects"}
                </span>
              </div>

              {/* Project rows */}
              <div className="flex flex-col flex-1 divide-y" style={{ borderColor: corridor.borderColor }}>
                {corridor.projects.map((project, pi) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/60"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] tabular-nums"
                        style={{
                          backgroundColor: "var(--accent-gold)",
                          color: "var(--bg-deep)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 800,
                        }}
                      >
                        {pi + 1}
                      </span>
                      <div className="min-w-0">
                        <p
                          className="truncate text-[14px]"
                          style={{ color: "var(--ink)", fontFamily: "var(--font-body)", fontWeight: 600 }}
                        >
                          {project.name}
                        </p>
                        <p
                          className="text-[12px]"
                          style={{ color: "var(--ink-muted)", fontFamily: "var(--font-body)" }}
                        >
                          {project.sizes}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <span
                        className="text-[14px] tabular-nums"
                        style={{ color: "var(--bg-deep)", fontFamily: "var(--font-body)", fontWeight: 700 }}
                      >
                        ₹{project.priceInLakhs} L
                      </span>
                      <ArrowRight
                        size={14}
                        style={{ color: "var(--accent-gold)" }}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Card footer, starting price */}
              <div
                className="px-6 py-3 flex items-center justify-between"
                style={{ borderTop: `1px solid ${corridor.borderColor}` }}
              >
                <span
                  className="text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--ink-faint)", fontFamily: "var(--font-body)", fontWeight: 600 }}
                >
                  Starting from
                </span>
                <span
                  className="text-base tabular-nums"
                  style={{ color: "var(--accent-gold)", fontFamily: "var(--font-heading)", fontWeight: 800 }}
                >
                  ₹{Math.min(...corridor.projects.map((p) => p.priceInLakhs))} Lakhs
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
