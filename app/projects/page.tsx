"use client";

import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { projects } from "@/lib/data/projects";
import { motion } from "framer-motion";
import { EASE } from "@/lib/animation";
import { useState } from "react";

const filters = ["All", "Available", "Few Left"] as const;
type Filter = typeof filters[number];

export default function ProjectsPage() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) =>
        active === "Available" ? p.status === "available" : p.status === "few-left"
      );

  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          className="relative pt-48 pb-20 overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 50% 50% at 80% 10%, rgba(212,160,23,0.14), transparent 60%),
              linear-gradient(180deg, #0F3D2E 0%, #0C3527 100%)
            `,
          }}
          aria-label="Project inventory"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(2.8rem, 5vw + 1rem, 5rem)",
                  color: "var(--bg-cream)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                All projects.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
                className="text-sm tabular-nums"
                style={{ color: "rgba(246,241,231,0.45)", fontFamily: "var(--font-body)" }}
              >
                {projects.length} total · {projects.filter((p) => p.status === "available").length} available
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Grid ─────────────────────────────────────────── */}
        <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--bg-cream)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            {/* Filter pills */}
            <div className="flex items-center gap-2 mb-10">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className="px-4 py-2 text-[13px] rounded-full transition-all"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: active === f ? 600 : 400,
                    backgroundColor: active === f ? "var(--bg-deep)" : "white",
                    color: active === f ? "var(--accent-gold)" : "var(--ink-muted)",
                    border: active === f ? "1px solid var(--bg-deep)" : "1px solid rgba(15,61,46,0.1)",
                    cursor: "pointer",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  animationDelay={i * 0.07}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <ScrollReveal>
                <div className="py-20 text-center">
                  <p style={{ color: "var(--ink-faint)", fontFamily: "var(--font-body)" }}>
                    No projects match this filter right now.
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
    </>
  );
}
