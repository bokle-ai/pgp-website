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

  // Big & prominent full-lockup logo: 100 px tall at rest, 64 px when scrolled.
  const logoHeight = scrolled ? 64 : 100;
  const barPaddingY = scrolled ? "8px" : "10px";

  return (
    <motion.header
      // Sits below the 36px utility bar at rest; slides up to the top edge
      // when the utility bar hides on scroll.
      className="fixed left-0 right-0 z-40"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
      style={{
        top: scrolled ? "0px" : "36px",
        transition:
          "top 0.4s cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 0.3s ease",
        backgroundColor: scrolled ? "rgba(15,61,46,0.92)" : "var(--bg-deep)",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(212,160,23,0.18)"
          : "1px solid rgba(212,160,23,0.08)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between"
        style={{
          paddingTop: barPaddingY,
          paddingBottom: barPaddingY,
          transition: "padding 0.3s ease",
        }}
      >
        {/* LEFT: big logo + nav links (desktop) */}
        <div className="flex items-center gap-8 lg:gap-10">
          <Link
            href="/"
            aria-label="Prime Golden Properties home"
            className="relative flex items-center gap-3.5"
          >
            {/* Soft gold halo behind the emblem */}
            <span
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                left: 0,
                top: 0,
                width: logoHeight * 0.9,
                height: logoHeight,
                background:
                  "radial-gradient(circle, rgba(212,160,23,0.28) 0%, rgba(212,160,23,0) 65%)",
                transform: "scale(1.3)",
              }}
            />
            <PGPLogo variant="icon" size={logoHeight} />
            <div
              className="hidden sm:flex flex-col"
              style={{ lineHeight: 1 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-playfair, Georgia, serif)",
                  fontWeight: 700,
                  fontSize: scrolled ? "1.15rem" : "1.4rem",
                  color: "var(--bg-cream)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  transition: "font-size 0.3s ease",
                }}
              >
                Prime Golden
              </span>
              <span
                style={{
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  fontWeight: 700,
                  fontSize: scrolled ? "0.6rem" : "0.7rem",
                  color: "var(--accent-gold)",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  marginTop: 4,
                  transition: "font-size 0.3s ease",
                }}
              >
                Properties
              </span>
            </div>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Main navigation"
          >
            {mounted &&
              navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    className="group relative text-[17px] transition-colors"
                    style={{
                      color: "rgba(248,245,239,0.96)",
                      fontFamily: "var(--font-montserrat, sans-serif)",
                      fontWeight: 500,
                      letterSpacing: "0.005em",
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
        </div>

        {/* RIGHT: CTA + mobile hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden lg:inline-flex items-center text-[16px] transition-colors hover:text-[var(--accent-gold)]"
            style={{
              color: "rgba(248,245,239,0.88)",
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontWeight: 500,
            }}
          >
            Sign in
          </Link>

          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.55, ease: EASE }}
            >
              <Link
                href="/#site-visit"
                className="hidden lg:inline-flex items-center text-[16px] transition-all active:scale-[0.98] hover:brightness-110"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                  color: "var(--bg-deep)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  padding: scrolled ? "9px 20px" : "11px 24px",
                  borderRadius: "999px",
                  boxShadow:
                    "0 6px 18px rgba(212,160,23,0.32), inset 0 1px 0 rgba(255,255,255,0.28)",
                  transition: "padding 0.3s ease",
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
                  backgroundColor: "rgba(248,245,239,0.08)",
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
    </motion.header>
  );
}
