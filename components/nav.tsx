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

// Logo sits between these two halves at the visual centre of the nav.
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

  // Centred transparent logo — the cream nav itself acts as the backdrop.
  const logoHeight = scrolled ? 88 : 124;

  return (
    <motion.header
      className="fixed left-0 right-0 z-40"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
      style={{
        top: scrolled ? "0px" : "36px",
        backgroundColor: "var(--bg-cream)",
        boxShadow: scrolled
          ? "0 8px 24px rgba(15,61,46,0.10), 0 1px 0 rgba(15,61,46,0.06)"
          : "0 4px 14px rgba(15,61,46,0.05)",
        borderBottom: scrolled
          ? "1px solid rgba(212,160,23,0.18)"
          : "1px solid rgba(15,61,46,0.04)",
        transition:
          "top 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, padding 0.3s ease",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-5 lg:px-10 relative flex items-center justify-between"
        style={{
          paddingTop: scrolled ? "10px" : "14px",
          paddingBottom: scrolled ? "10px" : "14px",
          transition: "padding 0.3s ease",
        }}
      >
        {/* Centered logo — absolutely positioned so left/right sections lay out naturally
            around it without ever colliding. */}
        <Link
          href="/"
          aria-label="Prime Golden Properties home"
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 pointer-events-auto"
        >
          <PGPLogo variant="full" height={logoHeight} />
        </Link>

        {/* Mobile: small logo on left, hamburger on right */}
        <Link
          href="/"
          aria-label="Prime Golden Properties home"
          className="lg:hidden block"
        >
          <PGPLogo variant="full" height={scrolled ? 52 : 68} />
        </Link>

        {/* Desktop: LEFT nav links (Plots / Construction / Resale) */}
        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Main navigation (left)"
        >
          {mounted &&
            navLinksLeft.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.05, ease: EASE }}
              >
                <Link
                  href={link.href}
                  className="group relative text-[16px] transition-colors"
                  style={{
                    color: "var(--bg-deep)",
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

        {/* Desktop: RIGHT nav links (Locations / About / Contact) + Schedule CTA inline */}
        <div className="hidden lg:flex items-center gap-7">
          <nav className="flex items-center gap-7" aria-label="Main navigation (right)">
            {mounted &&
              navLinksRight.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.05, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    className="group relative text-[16px] transition-colors"
                    style={{
                      color: "var(--bg-deep)",
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

          {/* Schedule CTA — inline with right nav so it's always to the right of "Contact",
              never overlapping it. */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.55, ease: EASE }}
            >
              <Link
                href="/#site-visit"
                className="inline-flex items-center text-[14px] transition-all active:scale-[0.98] hover:brightness-110 whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                  color: "var(--bg-deep)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  padding: scrolled ? "8px 16px" : "10px 20px",
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
        </div>

        {/* Mobile-only right-side hamburger */}
        <div className="lg:hidden flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2.5 rounded-full transition-colors"
                style={{
                  color: "var(--bg-deep)",
                  backgroundColor: "rgba(15,61,46,0.06)",
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
                <PGPLogo variant="full" height={140} />
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
