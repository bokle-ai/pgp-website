"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
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

// Logo sits between these two halves at the visual centre of the pill.
const navLinksLeft = navLinks.slice(0, 3);  // Plots, Construction, Resale
const navLinksRight = navLinks.slice(3);    // Locations, About, Contact

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo grows/shrinks with scroll. Big & prominent ≈ 1.6× the previous icon (58 → 92).
  const logoSize = scrolled ? 64 : 92;
  // Pill padding shrinks slightly when scrolled.
  const pillPaddingY = scrolled ? "10px" : "14px";

  return (
    <motion.header
      // Sits below the 36px utility bar. When the utility bar slides up
      // (scrolled past 40px), the nav slides up to follow it.
      className="fixed left-0 right-0 z-40"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      style={{
        top: scrolled ? "8px" : "44px",
        transition: "top 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div
          className="relative rounded-full flex items-center"
          style={{
            background: `linear-gradient(135deg, #0F3D2E 0%, #163F30 100%)`,
            border: "1px solid rgba(212,160,23,0.32)",
            boxShadow: scrolled
              ? "0 12px 36px rgba(15,61,46,0.42), 0 2px 6px rgba(15,61,46,0.18), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 14px 44px rgba(15,61,46,0.38), 0 3px 10px rgba(15,61,46,0.16), inset 0 1px 0 rgba(255,255,255,0.05)",
            paddingTop: pillPaddingY,
            paddingBottom: pillPaddingY,
            paddingLeft: "20px",
            paddingRight: "8px",
            transition:
              "padding 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Subtle gold inner glow ring */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(212,160,23,0.08), transparent 60%)",
            }}
          />

          {/* Mobile: logo on the left, hamburger on the right */}
          <Link
            href="/"
            aria-label="Prime Golden Properties home"
            className="lg:hidden relative z-10"
          >
            <PGPLogo variant="icon" size={scrolled ? 44 : 52} />
          </Link>

          {/* Desktop: nav with logo centred between two halves of links */}
          <nav
            className="hidden lg:flex items-center justify-center gap-7 flex-1 relative z-10"
            aria-label="Main navigation"
          >
            {mounted && navLinksLeft.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: EASE }}
              >
                <Link
                  href={link.href}
                  className="group relative text-sm transition-colors"
                  style={{
                    color: "rgba(248,245,239,0.82)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  <span className="transition-colors group-hover:text-[var(--accent-gold)]">
                    {link.label}
                  </span>
                  <span
                    className="absolute left-0 right-0 -bottom-1.5 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-center"
                    style={{ backgroundColor: "var(--accent-gold)" }}
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}

            {/* Centre logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className="mx-3"
            >
              <Link
                href="/"
                aria-label="Prime Golden Properties home"
                className="block relative"
              >
                {/* Soft golden glow halo behind the logo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,160,23,0.22) 0%, rgba(212,160,23,0) 70%)",
                    transform: "scale(1.6)",
                  }}
                />
                <PGPLogo variant="icon" size={logoSize} />
              </Link>
            </motion.div>

            {mounted && navLinksRight.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + (navLinksLeft.length + i) * 0.06,
                  ease: EASE,
                }}
              >
                <Link
                  href={link.href}
                  className="group relative text-sm transition-colors"
                  style={{
                    color: "rgba(248,245,239,0.82)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  <span className="transition-colors group-hover:text-[var(--accent-gold)]">
                    {link.label}
                  </span>
                  <span
                    className="absolute left-0 right-0 -bottom-1.5 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-center"
                    style={{ backgroundColor: "var(--accent-gold)" }}
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right side: Schedule + mobile menu */}
          <div className="flex items-center gap-2 relative z-10 ml-auto">
            {mounted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.55, ease: EASE }}
              >
                <Link
                  href="/#site-visit"
                  className="hidden lg:inline-flex items-center text-sm transition-all active:scale-[0.98] hover:brightness-110"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                    color: "var(--bg-deep)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    padding: scrolled ? "8px 18px" : "10px 22px",
                    borderRadius: "999px",
                    boxShadow:
                      "0 6px 16px rgba(212,160,23,0.32), inset 0 1px 0 rgba(255,255,255,0.3)",
                    transition: "padding 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  Schedule Site Visit
                </Link>
              </motion.div>
            )}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden p-2.5 rounded-full transition-colors"
                  style={{
                    color: "var(--bg-cream)",
                    backgroundColor: "rgba(248,245,239,0.06)",
                  }}
                  aria-label="Open navigation menu"
                >
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72"
                style={{ backgroundColor: "var(--bg-cream)" }}
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="pt-6">
                  <PGPLogo variant="stacked" />
                  <nav
                    className="mt-10 flex flex-col gap-1"
                    aria-label="Mobile navigation"
                  >
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
                            fontFamily: "var(--font-montserrat, sans-serif)",
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
                      transition={{
                        duration: 0.3,
                        delay: navLinks.length * 0.05 + 0.05,
                        ease: EASE,
                      }}
                    >
                      <Link
                        href="/#site-visit"
                        onClick={() => setOpen(false)}
                        className="mt-6 flex items-center justify-center h-12 text-sm font-medium"
                        style={{
                          backgroundColor: "var(--accent-gold)",
                          color: "var(--bg-deep)",
                          fontFamily: "var(--font-montserrat, sans-serif)",
                          fontWeight: 500,
                          borderRadius: "999px",
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
      </div>
    </motion.header>
  );
}
