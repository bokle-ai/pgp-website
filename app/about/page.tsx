"use client";

import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteConfig } from "@/lib/data/site";
import { motion } from "framer-motion";
import { EASE } from "@/lib/animation";
import Link from "next/link";

const milestones = [
  { year: "2013", title: "First layout sold", body: "One plotted layout in Maraimalai Nagar. Every buyer walked through the full documentation before a single rupee of advance was collected." },
  { year: "2016", title: "Construction division launched", body: "Buyers kept asking us to build on the plots. We launched a turnkey construction arm — fixed per-sq-ft rates, no hidden extras." },
  { year: "2019", title: "Resale network formalised", body: "310+ plot owners needed a trusted channel to sell. We built a verified buyer network and a flat-fee resale process." },
  { year: "2023", title: "Cheyyar corridor opened", body: "Expanded to a 100 km radius — Cheyyar Taluk. Affordable plots in a quiet, growing area with strong infrastructure investment." },
  { year: "Now", title: "6 active projects, 3 corridors", body: "Same team. Same principle. Every project starts with complete due diligence, published before the first site visit." },
];

const values = [
  { icon: "📍", title: "Local only", body: "Three corridors, run end-to-end. We know the soil, the registrar, and the neighbourhood — you won't get that from a pan-India platform." },
  { icon: "📄", title: "Documents first", body: "We share the full due diligence folder — parent doc, EC, patta, approval copies — before collecting any advance. Every time." },
  { icon: "💰", title: "Published prices", body: "Construction rates on this website are the rates you pay. No quote-then-upcharge. No hidden government charges sprung on registration day." },
  { icon: "🤝", title: "One team end-to-end", body: "The person who sold you the plot is the same person who manages your construction and handles your resale. Continuity is the product." },
];

export default function AboutPage() {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          className="relative min-h-[60vh] flex items-end pb-20 pt-48 overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 90% 20%, rgba(212,160,23,0.15), transparent 60%),
              linear-gradient(180deg, #0F3D2E 0%, #0C3527 100%)
            `,
          }}
          aria-label="About PGP"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 w-full">
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="h-px w-8 shrink-0" style={{ backgroundColor: "var(--accent-gold)" }} aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.18em] font-medium" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-body)" }}>
                Our story
              </span>
            </motion.div>

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
              Built on the outskirts.
              <br />
              <span style={{ color: "var(--accent-gold)" }}>Built on trust.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="mt-6 max-w-[52ch] text-[1.0625rem]"
              style={{ color: "rgba(246,241,231,0.65)", fontFamily: "var(--font-body)", lineHeight: 1.7 }}
            >
              Since {siteConfig.foundedYear}, we have helped {310}+ families own land across Chennai&apos;s growth corridors.
              Same team. Same paperwork-first principle. No shortcuts.
            </motion.p>
          </div>
        </section>

        {/* ── Stats bar ────────────────────────────────────── */}
        <section
          className="py-14 border-b"
          style={{ backgroundColor: "var(--bg-cream)", borderColor: "var(--line)" }}
          aria-label="Key facts"
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: `${310}+`, label: "Families housed" },
                { num: "12+", label: "Years operating" },
                { num: "6", label: "Active projects" },
                { num: "3", label: "Corridors covered" },
              ].map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 0.08}>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                        color: "var(--bg-deep)",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {s.num}
                    </div>
                    <div className="mt-1.5 text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-body)" }}>
                      {s.label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Story ────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "white" }} aria-label="Our story">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 items-start">
              <div className="lg:col-span-5">
                <ScrollReveal>
                  <div
                    className="text-[5.5rem] leading-none font-bold tabular-nums"
                    style={{
                      fontFamily: "var(--font-heading)",
                      backgroundImage: "linear-gradient(135deg, #D4A017 0%, #E0B43F 50%, #C68F12 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {siteConfig.foundedYear}
                  </div>
                  <p
                    className="mt-4 text-xl"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.3,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    The year we walked the first buyer through their plot docs before taking a rupee.
                  </p>
                  <p className="mt-4 text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
                    That one decision — documents before advance — became the company&apos;s operating principle.
                    Every project since has worked the same way.
                  </p>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-7 space-y-5">
                {[
                  `Prime Golden Properties was founded in ${siteConfig.foundedYear} by a young entrepreneur who grew up watching Chennai's southern corridors transform from agricultural land into the city's most promising residential belts.`,
                  "The founding insight was simple: the families buying plots in Maraimalai Nagar, Kundrathur, and Tambaram weren't looking for a salesperson. They were looking for a local partner — someone who knew the soil, the approvals, the registrar's office, and the neighbourhood.",
                  "We started with one plotted layout in Maraimalai Nagar. We sold it by doing the one thing most promoters wouldn't: we walked every buyer through the full documentation before collecting a single rupee of advance.",
                  "Twelve years on, that principle is still the product. Every PGP project is backed by complete legal due diligence, published before the first site visit. Our construction team uses the same rates for every client — published on this website.",
                  "We don't cover every corridor in Tamil Nadu. We cover three, and we know them the way you know your own street.",
                ].map((para, i) => (
                  <ScrollReveal key={i} delay={i * 0.07}>
                    <p style={{ color: "var(--ink-muted)", lineHeight: 1.75, fontFamily: "var(--font-body)", fontSize: "1.0625rem" }}>
                      {para}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Milestones ───────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "var(--bg-cream)" }} aria-label="Company milestones">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 shrink-0" style={{ backgroundColor: "var(--accent-gold)" }} aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-body)", fontWeight: 700 }}>Timeline</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw + 1rem, 3rem)", color: "var(--ink)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
                How we got here.
              </h2>
            </ScrollReveal>

            <div className="mt-14 relative">
              {/* Vertical line */}
              <div
                className="absolute left-[72px] top-0 bottom-0 w-px hidden lg:block"
                style={{ backgroundColor: "var(--line)" }}
                aria-hidden="true"
              />

              <div className="space-y-10">
                {milestones.map((m, i) => (
                  <ScrollReveal key={m.year} delay={i * 0.1}>
                    <div className="flex gap-8 lg:gap-12 items-start">
                      <div
                        className="shrink-0 w-[72px] pt-1 tabular-nums text-right"
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 800,
                          fontSize: "1rem",
                          color: "var(--accent-gold)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {m.year}
                      </div>

                      {/* Dot on the line */}
                      <div
                        className="shrink-0 w-3.5 h-3.5 rounded-full mt-1.5 hidden lg:block"
                        style={{
                          backgroundColor: "var(--accent-gold)",
                          boxShadow: "0 0 0 4px rgba(212,160,23,0.18)",
                        }}
                        aria-hidden="true"
                      />

                      <div className="flex-1 pb-2">
                        <h3
                          className="mb-2"
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 600,
                            fontSize: "1.2rem",
                            color: "var(--ink)",
                            letterSpacing: "-0.015em",
                          }}
                        >
                          {m.title}
                        </h3>
                        <p style={{ color: "var(--ink-muted)", fontFamily: "var(--font-body)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
                          {m.body}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "white" }} aria-label="Our values">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 shrink-0" style={{ backgroundColor: "var(--accent-gold)" }} aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-body)", fontWeight: 700 }}>How we work</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw + 1rem, 3rem)", color: "var(--ink)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
                Four things we never compromise on.
              </h2>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} delay={i * 0.08}>
                  <motion.div
                    className="p-7 h-full"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid rgba(15,61,46,0.08)",
                      borderRadius: 20,
                      boxShadow: "0 4px 20px rgba(15,61,46,0.06)",
                    }}
                    whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(15,61,46,0.1)" }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  >
                    <div
                      className="w-11 h-11 mb-5 flex items-center justify-center rounded-xl text-lg"
                      style={{ backgroundColor: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.24)" }}
                      aria-hidden="true"
                    >
                      {v.icon}
                    </div>
                    <h3
                      className="mb-2"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1.1rem", color: "var(--ink)", letterSpacing: "-0.01em" }}
                    >
                      {v.title}
                    </h3>
                    <p style={{ color: "var(--ink-muted)", fontFamily: "var(--font-body)", lineHeight: 1.65, fontSize: "0.9375rem" }}>
                      {v.body}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section
          className="py-24"
          style={{
            background: "linear-gradient(135deg, #0F3D2E 0%, #0C3527 100%)",
          }}
          aria-label="Get in touch"
        >
          <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
            <ScrollReveal>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--bg-cream)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
                Ready to see the land?
              </h2>
              <p className="mt-4 mb-10 max-w-[48ch] mx-auto" style={{ color: "rgba(246,241,231,0.6)", fontFamily: "var(--font-body)", lineHeight: 1.65 }}>
                A site visit takes 90 minutes. We&apos;ll pick you up from the nearest railway station.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#site-visit"
                  className="inline-flex items-center justify-center px-8 py-4 text-[15px] transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-gold), #E0B43F)",
                    color: "var(--bg-deep)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    borderRadius: 999,
                    boxShadow: "0 10px 28px rgba(212,160,23,0.35)",
                  }}
                >
                  Schedule a site visit
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 text-[15px] transition-colors hover:bg-white/10"
                  style={{
                    color: "rgba(246,241,231,0.85)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    borderRadius: 999,
                    border: "1px solid rgba(246,241,231,0.2)",
                  }}
                >
                  Browse projects
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
    </>
  );
}
