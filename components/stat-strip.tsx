"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import { siteConfig } from "@/lib/data/site";

function parseValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(\D*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1]), suffix: match[2] };
}

function AnimatedStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();
  const { num, suffix } = parseValue(value);
  const [displayNum, setDisplayNum] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || prefersReduced) {
      if (isInView) setDisplayNum(num);
      return;
    }
    hasAnimated.current = true;

    const duration = 1800;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime - delay * 1000;
      if (elapsed < 0) {
        requestAnimationFrame(step);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, num, delay, prefersReduced]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <div
        className="tabular-nums"
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontWeight: 600,
          fontSize: "clamp(2rem, 4vw, 3rem)",
          color: "var(--accent-gold)",
          lineHeight: 1,
        }}
        aria-label={`${value} ${label}`}
      >
        {displayNum}
        {suffix}
      </div>
      <div
        className="mt-2 text-xs uppercase tracking-widest"
        style={{
          color: "rgba(246,241,231,0.5)",
          fontFamily: "var(--font-montserrat, sans-serif)",
          letterSpacing: "0.1em",
        }}
        aria-hidden="true"
      >
        {label}
      </div>
    </motion.div>
  );
}

export function StatStrip() {
  return (
    <section
      className="relative grain-overlay py-20"
      style={{ backgroundColor: "var(--bg-deep)" }}
      aria-label="Company statistics"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-between gap-y-10 gap-x-6 sm:gap-8 lg:gap-0">
        {siteConfig.stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-8 lg:gap-12">
            <AnimatedStat value={stat.value} label={stat.label} delay={i * 0.12} />
            {i < siteConfig.stats.length - 1 && (
              <div
                className="hidden sm:block w-px h-12 self-center"
                style={{ backgroundColor: "var(--line-dark)" }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
