"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/animation";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Hero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["0%", "-8%"]
  );

  const motionProps = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: "hidden",
          animate: "visible",
          variants: fadeUp,
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center pt-44 lg:pt-52 pb-20 lg:pb-28 overflow-hidden"
      aria-label="Hero"
      style={{
        backgroundColor: "var(--bg-deep)",
        // Two soft golden glows in opposite corners + base gradient
        background: `
          radial-gradient(ellipse 60% 50% at 85% 20%, rgba(212,160,23,0.18), transparent 60%),
          radial-gradient(ellipse 50% 60% at 10% 80%, rgba(212,160,23,0.10), transparent 60%),
          linear-gradient(180deg, #0F3D2E 0%, #0C3527 100%)
        `,
      }}
    >
      {/* Subtle grain / dot texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-14 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-7">
            <motion.div
              {...(prefersReduced
                ? {}
                : { initial: "hidden", animate: "visible", variants: stagger })}
            >
              <motion.div
                {...motionProps(0)}
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-7 rounded-full"
                style={{
                  border: "1px solid rgba(212,160,23,0.32)",
                  backgroundColor: "rgba(212,160,23,0.08)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--accent-gold)" }}
                  aria-hidden="true"
                />
                <span
                  className="text-[11px] uppercase"
                  style={{
                    color: "var(--accent-gold)",
                    letterSpacing: "0.18em",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 600,
                  }}
                >
                  Est. 2013 · Chennai Outskirts · 310+ Families
                </span>
              </motion.div>

              <motion.h1
                {...motionProps(0.08)}
                className="font-display leading-[1.02] tracking-tight mb-7"
                style={{
                  fontSize: "clamp(2.4rem, 5.2vw + 1rem, 6rem)",
                  fontFamily: "var(--font-playfair, Georgia, serif)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  color: "var(--bg-cream)",
                }}
              >
                Land that turns
                <br />
                into{" "}
                <em
                  style={{
                    color: "var(--accent-gold)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  legacy.
                </em>
              </motion.h1>

              <motion.p
                {...motionProps(0.18)}
                className="text-base lg:text-lg mb-10 max-w-[54ch]"
                style={{
                  color: "rgba(248,245,239,0.78)",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-montserrat, sans-serif)",
                }}
              >
                DTCP-approved plots, turnkey construction at honest rates, and
                trusted resale — across Cheyyar Taluk, a quiet 100&nbsp;km south-west of Chennai.
                Three village corridors, one quietly relentless team.
              </motion.p>

              <motion.div
                {...motionProps(0.28)}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-12"
              >
                <Link
                  href="/#site-visit"
                  className="inline-flex items-center justify-center px-8 h-[56px] text-[15px] transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                    color: "var(--bg-deep)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 600,
                    borderRadius: "999px",
                    boxShadow:
                      "0 12px 32px rgba(212,160,23,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
                  }}
                >
                  Schedule a Site Visit
                </Link>
                <Link
                  href="/#plots"
                  className="group inline-flex items-center text-[15px] transition-colors"
                  style={{
                    color: "rgba(248,245,239,0.88)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 500,
                  }}
                >
                  Or browse available plots
                  <span
                    className="ml-2 transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--accent-gold)" }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </motion.div>

              {/* Social proof / trust strip */}
              <motion.div
                {...motionProps(0.4)}
                className="pt-8"
                style={{ borderTop: "1px solid rgba(248,245,239,0.08)" }}
              >
                <p
                  className="text-[11px] uppercase mb-4"
                  style={{
                    color: "rgba(248,245,239,0.55)",
                    letterSpacing: "0.22em",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 600,
                  }}
                >
                  Trusted across the Chennai outskirts since 2013
                </p>
                <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  {[
                    { num: "310+", label: "Families housed" },
                    { num: "12+", label: "Years operating" },
                    { num: "6", label: "Active projects" },
                    { num: "100%", label: "DTCP approved" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-baseline gap-2">
                      <span
                        className="text-2xl"
                        style={{
                          color: "var(--bg-cream)",
                          fontFamily: "var(--font-playfair, Georgia, serif)",
                          fontWeight: 600,
                        }}
                      >
                        {stat.num}
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          color: "rgba(248,245,239,0.6)",
                          fontFamily: "var(--font-montserrat, sans-serif)",
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT — image collage */}
          <div className="lg:col-span-5 relative h-[480px] lg:h-[600px] hidden md:block">
            {/* Soft golden glow behind the visuals */}
            <div
              aria-hidden="true"
              className="absolute -inset-12 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,160,23,0.16) 0%, transparent 60%)",
              }}
            />

            {/* Large image — aerial plots */}
            <motion.div
              style={{ y: parallaxY }}
              className="absolute right-0 top-0 w-[78%] aspect-[4/5] rounded-2xl overflow-hidden img-warm"
              initial={
                prefersReduced ? {} : { opacity: 0, scale: 0.96 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(212,160,23,0.22), 0 24px 64px rgba(0,0,0,0.45)",
                  borderRadius: "1rem",
                }}
              />
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&h=875&fit=crop"
                alt="Aerial view of a plotted residential layout with marked plots and roads"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 35vw"
              />
            </motion.div>

            {/* Smaller image — family site visit */}
            <motion.div
              className="absolute left-0 bottom-12 w-[54%] aspect-square rounded-2xl overflow-hidden img-warm"
              style={{ zIndex: 2 }}
              initial={
                prefersReduced ? {} : { opacity: 0, scale: 0.96 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            >
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(212,160,23,0.2), 0 18px 48px rgba(0,0,0,0.4)",
                  borderRadius: "1rem",
                }}
              />
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop"
                alt="Young family reviewing property documents at a site visit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 20vw"
              />
            </motion.div>

            {/* Floating inventory card — works on dark bg */}
            <motion.div
              className="absolute right-4 bottom-6 z-20 px-5 py-4 rounded-xl"
              style={{
                backgroundColor: "rgba(15,61,46,0.85)",
                border: "1px solid rgba(212,160,23,0.5)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                minWidth: "220px",
                boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
              }}
              initial={
                prefersReduced ? {} : { opacity: 0, y: 16 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent-gold)" }}
                  animate={
                    prefersReduced ? {} : { opacity: [1, 0.3, 1] }
                  }
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <span
                  className="text-[10px] uppercase tracking-wider"
                  style={{
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    letterSpacing: "0.16em",
                    fontWeight: 700,
                  }}
                >
                  Live inventory
                </span>
              </div>
              <p
                className="text-sm"
                style={{
                  color: "var(--bg-cream)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                Plots available across
                <br />
                6 active projects
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
