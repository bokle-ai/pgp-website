"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";

interface CountUpProps {
  /** Target number to count to. */
  value: number;
  /** Text appended after the number, e.g. "+" or "%". */
  suffix?: string;
  /** Text shown before the number. */
  prefix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Counts from 0 up to `value` once, the first time it scrolls into view.
 * Respects prefers-reduced-motion (renders the final value immediately).
 */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.4,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;

    if (prefersReduced) {
      node.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const controls = animate(count, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, prefix, duration, prefersReduced, count]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}0{suffix}
    </span>
  );
}
