"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE } from "@/lib/animation";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  titleDark?: boolean;
  subtitleDark?: boolean;
  className?: string;
  goldRule?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  titleDark = false,
  subtitleDark = false,
  className = "",
  goldRule = false,
}: SectionHeaderProps) {
  const prefersReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReduced ? 0 : 0.12 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial={prefersReduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {goldRule && (
        <motion.div
          variants={fadeUp}
          className="h-px mb-8"
          style={{ backgroundColor: "var(--accent-gold)", width: 64 }}
          aria-hidden="true"
        />
      )}

      <motion.h2
        variants={fadeUp}
        style={{
          fontFamily: "var(--font-playfair, Georgia, serif)",
          fontWeight: 600,
          fontSize: "clamp(1.75rem, 3vw + 1rem, 3.5rem)",
          color: titleDark ? "var(--bg-cream)" : "var(--ink)",
          lineHeight: 1.1,
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-[65ch] text-base"
          style={{
            color: subtitleDark
              ? "rgba(246,241,231,0.65)"
              : "var(--ink-muted)",
            lineHeight: 1.65,
            fontFamily: "var(--font-montserrat, sans-serif)",
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
