"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE } from "@/lib/animation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const trustChips = ["DTCP", "CMDA", "RERA", "Since 2013"];

export function Hero() {
  const prefersReduced = useReducedMotion();

  const motionProps = (delay: number) =>
    prefersReduced
      ? {}
      : {
          variants: fadeUp,
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section
      className="relative w-full lg:min-h-screen overflow-hidden"
      aria-label="Hero"
      style={{ backgroundColor: "var(--bg-cream)" }}
    >
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        {/* IMAGE — appears first on mobile, right side on desktop */}
        <div
          className="relative order-1 lg:order-2 w-full lg:w-[45%] h-[55vw] sm:h-[50vw] lg:h-auto lg:min-h-screen img-warm"
        >
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=1600&fit=crop"
            alt="Aerial view of plotted layout in Chennai's outskirts"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          {/* subtle dark gradient at bottom-left for floating card legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top right, rgba(15,61,46,0.55) 0%, rgba(15,61,46,0) 45%)",
            }}
            aria-hidden="true"
          />

          {/* Floating inventory card */}
          <motion.div
            className="absolute left-4 bottom-4 lg:left-6 lg:bottom-6 px-4 py-3 lg:px-5 lg:py-4 z-10"
            style={{
              backgroundColor: "var(--bg-deep)",
              border: "1px solid var(--accent-gold)",
              maxWidth: "260px",
            }}
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--accent-gold)" }}
                animate={prefersReduced ? {} : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <span
                className="text-[10px] uppercase"
                style={{
                  color: "var(--accent-gold)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  letterSpacing: "0.16em",
                }}
              >
                Live inventory
              </span>
            </div>
            <p
              className="text-sm leading-snug"
              style={{
                color: "var(--bg-cream)",
                fontFamily: "var(--font-montserrat, sans-serif)",
              }}
            >
              <span className="font-semibold">32 plots available</span>
              <span className="opacity-70"> · </span>
              <span className="opacity-90">4 active projects</span>
            </p>
          </motion.div>
        </div>

        {/* TEXT — second on mobile, left on desktop */}
        <div
          className="order-2 lg:order-1 w-full lg:w-[55%] flex items-center"
          style={{ backgroundColor: "var(--bg-cream)" }}
        >
          <motion.div
            className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-14 lg:py-20"
            initial={prefersReduced ? "visible" : "hidden"}
            animate="visible"
            variants={stagger}
          >
            {/* Eyebrow */}
            <motion.div
              {...motionProps(0)}
              className="flex items-center gap-3 mb-8"
            >
              <span
                className="h-px w-10"
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
                Est. 2013 · Chennai Outskirts
              </span>
            </motion.div>

            {/* Massive headline */}
            <motion.h1
              {...motionProps(0.1)}
              className="mb-7"
              style={{
                fontSize: "clamp(3rem, 6vw + 1rem, 6.5rem)",
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
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

            {/* Subhead */}
            <motion.p
              {...motionProps(0.2)}
              className="mb-10 max-w-[52ch]"
              style={{
                fontSize: "1.1rem",
                color: "var(--ink-muted)",
                lineHeight: 1.7,
                fontFamily: "var(--font-montserrat, sans-serif)",
              }}
            >
              DTCP-approved plots, turnkey construction at honest rates, and
              trusted resale — across Maraimalai Nagar, Kundrathur, and Tambaram.
              Three corridors, one quietly relentless team.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...motionProps(0.3)}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href="/#site-visit"
                className="inline-flex items-center justify-center px-8 h-14 text-sm font-medium transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--accent-gold)",
                  color: "var(--bg-deep)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  fontWeight: 500,
                  borderRadius: "2px",
                }}
              >
                Schedule a Site Visit
              </Link>
              <Link
                href="/#plots"
                className="inline-flex items-center justify-center px-8 h-14 text-sm font-medium border group transition-colors hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
                style={{
                  color: "var(--ink)",
                  borderColor: "var(--ink)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  fontWeight: 500,
                  borderRadius: "2px",
                }}
              >
                Browse Plots
                <span
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              {...motionProps(0.4)}
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              {trustChips.map((chip, i) => (
                <div key={chip} className="flex items-center gap-3">
                  {i > 0 && (
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: "var(--accent-gold)" }}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="text-xs uppercase"
                    style={{
                      color: "var(--ink-muted)",
                      letterSpacing: "0.16em",
                      fontFamily: "var(--font-montserrat, sans-serif)",
                      fontWeight: 500,
                    }}
                  >
                    {chip}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
