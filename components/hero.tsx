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
  visible: { transition: { staggerChildren: 0.15 } },
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
      className="relative min-h-[88vh] flex items-center pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden"
      aria-label="Hero"
      style={{
        backgroundColor: "var(--bg-cream)",
        background:
          "radial-gradient(circle at 90% 10%, rgba(201,162,75,0.08), transparent 50%), var(--bg-cream)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 items-center">
          {/* Left column */}
          <div className="lg:col-span-7">
            <motion.div
              {...(prefersReduced ? {} : { initial: "hidden", animate: "visible", variants: stagger })}
            >
              <motion.div {...motionProps(0)} className="flex items-center gap-3 mb-6">
                <div
                  className="h-px w-8"
                  style={{ backgroundColor: "var(--accent-gold)" }}
                  aria-hidden="true"
                />
                <span
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{
                    color: "var(--accent-gold)",
                    letterSpacing: "0.18em",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                  }}
                >
                  Est. 2013 · Chennai Outskirts
                </span>
              </motion.div>

              <motion.h1
                {...motionProps(0.1)}
                className="font-display leading-[1.05] tracking-tight mb-6"
                style={{
                  fontSize: "clamp(2.2rem, 5vw + 1rem, 5.5rem)",
                  fontFamily: "var(--font-playfair, Georgia, serif)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
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
                {...motionProps(0.22)}
                className="text-base lg:text-lg mb-8 max-w-[50ch]"
                style={{
                  color: "var(--ink-muted)",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-montserrat, sans-serif)",
                }}
              >
                DTCP-approved plots, turnkey construction at honest rates, and
                trusted resale — across Papanthangal, Perumpallam, and Cheyyar.
                Three corridors, one quietly relentless team.
              </motion.p>

              <motion.div
                {...motionProps(0.34)}
                className="flex flex-col sm:flex-row gap-3 mb-10"
              >
                <Link
                  href="/#site-visit"
                  className="inline-flex items-center justify-center px-7 h-14 text-sm font-medium transition-opacity hover:opacity-90 active:scale-[0.98]"
                  style={{
                    backgroundColor: "var(--accent-gold)",
                    color: "var(--bg-deep)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 500,
                    borderRadius: "6px",
                    minHeight: "56px",
                  }}
                >
                  Schedule a Site Visit
                </Link>
                <Link
                  href="/#plots"
                  className="inline-flex items-center justify-center px-7 h-14 text-sm font-medium border group transition-all hover:border-[var(--accent-gold)]"
                  style={{
                    color: "var(--ink)",
                    borderColor: "var(--line)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 500,
                    borderRadius: "6px",
                    minHeight: "56px",
                  }}
                >
                  Browse Available Plots
                  <span
                    className="ml-1.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </motion.div>

              <motion.div
                {...motionProps(0.46)}
                className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-5 gap-y-3"
              >
                {[
                  "DTCP & CMDA Approved",
                  "RERA Registered",
                  "100% Clear Titles",
                  "Local Since 2013",
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-2">
                    {i > 0 && (
                      <span
                        className="hidden sm:block w-1 h-1 rounded-full"
                        style={{ backgroundColor: "var(--accent-gold)" }}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className="flex items-center gap-1.5 text-sm"
                      style={{
                        color: "var(--ink-muted)",
                        fontFamily: "var(--font-montserrat, sans-serif)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="7"
                          cy="7"
                          r="7"
                          fill="var(--accent-gold)"
                          opacity="0.2"
                        />
                        <path
                          d="M4 7l2 2 4-4"
                          stroke="var(--accent-gold)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right column — image collage */}
          <div className="lg:col-span-5 relative h-[540px] lg:h-[600px] hidden md:block">
            {/* Large image — aerial plots (with parallax) */}
            <motion.div
              style={{ y: parallaxY }}
              className="absolute right-0 top-0 w-[75%] aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(14,43,34,0.18)] img-warm"
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
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
              className="absolute left-0 bottom-10 w-[52%] aspect-square rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(14,43,34,0.15)] img-warm"
              style={{ zIndex: 2 }}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            >
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop"
                alt="Young family reviewing property documents at a site visit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 20vw"
              />
            </motion.div>

            {/* Smallest image — blueprint */}
            <motion.div
              className="absolute left-10 top-0 w-[36%] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(14,43,34,0.12)] img-warm"
              style={{ zIndex: 3 }}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            >
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=280&h=373&fit=crop"
                alt="Construction blueprint and survey documents for a plot layout"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 14vw"
              />
            </motion.div>

            {/* Floating inventory card */}
            <motion.div
              className="absolute right-4 bottom-4 z-10 px-4 py-3 rounded-xl"
              style={{
                backgroundColor: "var(--bg-deep)",
                border: "1px solid var(--accent-gold)",
                minWidth: "200px",
              }}
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
            >
              <div className="flex items-center gap-2 mb-1">
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent-gold)" }}
                  animate={prefersReduced ? {} : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{
                    color: "var(--accent-gold)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Live inventory
                </span>
              </div>
              <p
                className="text-sm font-medium"
                style={{
                  color: "var(--bg-cream)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                }}
              >
                Plots available across
                <br />6 active projects
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
