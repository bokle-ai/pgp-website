"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/animation";
import { PGPLogo } from "./pgp-logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Plots", href: "/#plots" },
  { label: "Construction", href: "/#construction" },
  { label: "Resale", href: "/#resale" },
  { label: "Locations", href: "/#locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-9 left-0 right-0 z-40"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      style={{
        backgroundColor: scrolled ? "rgba(246,241,231,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(217,207,184,0.4)" : "none",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
        height: "80px",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
        <Link href="/" aria-label="Prime Golden Properties home">
          <PGPLogo darkMode={false} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {mounted && navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: EASE }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-[var(--accent-gold)]"
                style={{
                  color: "var(--ink-muted)",
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.55, ease: EASE }}
            >
              <Link
                href="/#site-visit"
                className="hidden lg:inline-flex items-center px-5 h-11 text-sm font-medium transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--accent-gold)",
                  color: "var(--bg-deep)",
                  fontFamily: "var(--font-dm-sans, sans-serif)",
                  fontWeight: 500,
                  borderRadius: "6px",
                }}
              >
                Schedule Site Visit
              </Link>
            </motion.div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 rounded-md transition-colors hover:bg-[var(--accent-gold-soft)]"
                style={{ color: "var(--ink)" }}
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72"
              style={{ backgroundColor: "var(--bg-cream)" }}
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="pt-6">
                <PGPLogo />
                <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile navigation">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05, ease: EASE }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 px-2 text-base font-medium border-b transition-colors hover:text-[var(--accent-gold)]"
                        style={{
                          color: "var(--ink)",
                          borderColor: "var(--line)",
                          fontFamily: "var(--font-dm-sans, sans-serif)",
                          fontWeight: 500,
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: navLinks.length * 0.05 + 0.05, ease: EASE }}
                  >
                    <Link
                      href="/#site-visit"
                      onClick={() => setOpen(false)}
                      className="mt-6 flex items-center justify-center h-12 text-sm font-medium"
                      style={{
                        backgroundColor: "var(--accent-gold)",
                        color: "var(--bg-deep)",
                        fontFamily: "var(--font-dm-sans, sans-serif)",
                        fontWeight: 500,
                        borderRadius: "6px",
                      }}
                    >
                      Schedule Site Visit
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
