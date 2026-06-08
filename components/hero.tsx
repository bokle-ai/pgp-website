"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/count-up";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ledger = [
  { value: 310, suffix: "+", label: "Families housed" },
  { value: 12, suffix: " yrs", label: "On the ground" },
  { value: 6, suffix: "", label: "Live projects" },
  { value: 100, suffix: "%", label: "DTCP approved" },
];

export function Hero() {
  const reduce = useReducedMotion();

  // Orchestrated single page-load. Each element rises in sequence.
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: EASE },
        };

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      aria-label="Hero"
      style={{ minHeight: "100svh", backgroundColor: "#082819" }}
    >
      {/* ── Full-bleed land photograph (the photo IS the hero) ── */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? { opacity: 1 } : { scale: 1.09, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src="/images/brand/hero-aerial-plots.webp"
          alt="Aerial view of a Prime Golden plotted layout at Cheyyar, palm-lined roads under a sunset sky"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 38%" }}
        />
      </motion.div>

      {/* ── Editorial scrims: keep the photo readable, anchor the text ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,32,22,0.45) 0%, rgba(6,32,22,0.10) 30%, rgba(6,32,22,0.45) 64%, rgba(6,32,22,0.94) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,32,22,0.82) 0%, rgba(6,32,22,0.30) 42%, transparent 72%)",
        }}
      />

      {/* ── Cartographic coordinate tag (land/survey POV, not a generic kicker) ── */}
      <motion.div
        {...rise(0.35)}
        className="absolute left-0 right-0 z-10"
        style={{ top: "clamp(7rem, 14vh, 11rem)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span
            className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs"
            style={{
              color: "rgba(248,245,239,0.82)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.14em",
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 1px 12px rgba(6,32,22,0.6)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                border: "1.5px solid var(--accent-gold)",
                display: "inline-block",
              }}
            />
            12.68&deg;N&nbsp;&nbsp;79.54&deg;E&nbsp;&nbsp;&middot;&nbsp;&nbsp;CHEYYAR&nbsp;TALUK, TAMIL&nbsp;NADU
          </span>
        </div>
      </motion.div>

      {/* ── Headline + CTA + ledger, bottom-anchored ── */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-44 pb-9 lg:pb-12">
          <h1
            className="font-display"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "clamp(2.9rem, 8vw + 0.5rem, 7rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "var(--bg-cream)",
              textShadow: "0 2px 30px rgba(6,32,22,0.45)",
              maxWidth: "16ch",
            }}
          >
            <motion.span className="block" {...rise(0.45)}>
              Land that turns
            </motion.span>
            <motion.span className="block" {...rise(0.6)}>
              into{" "}
              <span style={{ color: "var(--accent-gold)" }}>legacy.</span>
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.78)}
            className="mt-7 text-base lg:text-lg"
            style={{
              color: "rgba(248,245,239,0.86)",
              lineHeight: 1.6,
              fontFamily: "var(--font-body)",
              maxWidth: "46ch",
              textShadow: "0 1px 16px rgba(6,32,22,0.5)",
            }}
          >
            DTCP-approved plots and turnkey construction, ~100&nbsp;km south-west
            of Chennai. One corridor, run end-to-end.
          </motion.p>

          <motion.div
            {...rise(0.92)}
            className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7"
          >
            <Link
              href="/#site-visit"
              className="inline-flex items-center justify-center px-8 h-[58px] text-[15px] transition-transform active:scale-[0.98] hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--accent-gold)",
                color: "#1A1305",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                borderRadius: 2,
                letterSpacing: "0.01em",
              }}
            >
              Book a site visit
            </Link>
            <Link
              href="/#plots"
              className="group inline-flex items-center gap-2 text-[15px]"
              style={{
                color: "var(--bg-cream)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  borderBottom: "1px solid rgba(248,245,239,0.4)",
                  paddingBottom: 2,
                }}
              >
                Browse available plots
              </span>
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
                style={{ color: "var(--accent-gold)" }}
              >
                &rarr;
              </span>
            </Link>
          </motion.div>

          {/* ── Ledger: understated proof, hairline-ruled. No glass cards. ── */}
          <motion.dl
            {...rise(1.08)}
            className="mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-y-7"
            style={{ borderTop: "1px solid rgba(248,245,239,0.18)", paddingTop: 24 }}
          >
            {ledger.map((s, i) => (
              <div
                key={s.label}
                style={
                  i === 0
                    ? undefined
                    : { paddingLeft: "clamp(1rem, 4vw, 2.5rem)" }
                }
                className={i > 0 ? "sm:border-l sm:border-white/15" : undefined}
              >
                <dt
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    color: "var(--bg-cream)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <CountUp value={s.value} suffix={s.suffix} />
                </dt>
                <dd
                  className="mt-2 text-[12px] sm:text-[13px]"
                  style={{
                    color: "rgba(248,245,239,0.66)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
