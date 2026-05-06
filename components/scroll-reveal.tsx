"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  duration = 0.65,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const y = direction === "up" ? 28 : 0;
  const x = direction === "left" ? -32 : direction === "right" ? 32 : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
