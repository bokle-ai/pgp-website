"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import Link from "next/link";

export function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("main-content");
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      setVisible(heroBottom < 0 || window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-cta"
          className="fixed bottom-6 left-4 z-50 md:hidden"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Link
            href="/#site-visit"
            className="flex items-center gap-2 px-5 h-11 text-sm font-medium shadow-lg"
            style={{
              backgroundColor: "var(--accent-gold)",
              color: "var(--bg-deep)",
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontWeight: 500,
              borderRadius: "100px",
              boxShadow: "0 4px 20px rgba(201,162,75,0.35)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            Schedule Site Visit
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
