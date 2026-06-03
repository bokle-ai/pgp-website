"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/animation";
import { PGPLogo } from "./pgp-logo";
import { siteConfig } from "@/lib/data/site";
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

function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      {/* Emblem — clean crop of the golden pin/lotus icon only */}
      <PGPLogo variant="icon" size={size} />
      {/* Sora wordmark — one font, no serif, reads as one brand */}
      <div style={{ lineHeight: 1.15 }}>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: size > 36 ? "1rem" : "0.9rem",
            color: "var(--bg-deep)",
            letterSpacing: "-0.02em",
          }}
        >
          Prime Golden
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "0.55rem",
            color: "var(--accent-gold)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Properties
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 z-40 px-4 lg:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      style={{
        top: scrolled ? "8px" : "44px",
        transition: "top 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <motion.div
        className="mx-auto flex items-center justify-between rounded-full"
        animate={{ maxWidth: scrolled ? 980 : 1140 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          paddingLeft: 18,
          paddingRight: 18,
          paddingTop: scrolled ? 8 : 10,
          paddingBottom: scrolled ? 8 : 10,
          backgroundColor: "rgba(248,245,239,0.9)",
          backdropFilter: "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: "blur(20px) saturate(1.6)",
          border: "1px solid rgba(15,61,46,0.1)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(15,61,46,0.13), inset 0 1px 0 rgba(255,255,255,0.65)"
            : "0 4px 24px rgba(15,61,46,0.08), inset 0 1px 0 rgba(255,255,255,0.65)",
        }}
      >
        {/* ── LEFT: Logo ──────────────────────────────── */}
        <Link href="/" aria-label="Prime Golden Properties home">
          <LogoMark size={38} />
        </Link>

        {/* ── CENTER: Nav links with sliding pill ─────── */}
        <nav
          className="hidden lg:flex items-center gap-0.5"
          aria-label="Main navigation"
          onMouseLeave={() => setHovered(null)}
        >
          {mounted && navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              className="relative"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.04, ease: EASE }}
            >
              <Link
                href={link.href}
                onMouseEnter={() => setHovered(link.label)}
                className="relative z-10 block px-4 py-2 text-[14px] rounded-full"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  color: hovered === link.label ? "rgba(248,245,239,0.95)" : "var(--ink)",
                  transition: "color 0.18s ease",
                  position: "relative",
                }}
              >
                {/* Sliding background pill — shared layoutId animates between links */}
                <AnimatePresence>
                  {hovered === link.label && (
                    <motion.span
                      layoutId="nav-sliding-pill"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ backgroundColor: "var(--bg-deep)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </AnimatePresence>
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* ── RIGHT: Phone + CTA ─────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">
          {mounted && (
            <motion.a
              href={`tel:${siteConfig.phonePlain}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45, ease: EASE }}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-[13.5px] rounded-full transition-colors hover:bg-[rgba(15,61,46,0.06)]"
              style={{
                color: "var(--ink-muted)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
              aria-label="Call us"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--accent-gold)" }}>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.34a16 16 0 006.29 6.29l1.56-1.34a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              {siteConfig.phone}
            </motion.a>
          )}

          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.52, ease: EASE }}
              className="hidden sm:block"
            >
              <Link
                href="/#site-visit"
                className="inline-flex items-center text-[14px] transition-all active:scale-[0.97] hover:brightness-105 whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                  color: "var(--bg-deep)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  padding: "10px 20px",
                  borderRadius: 999,
                  boxShadow: "0 4px 16px rgba(212,160,23,0.32), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                Book a Visit
              </Link>
            </motion.div>
          )}

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2.5 rounded-full transition-colors"
                  style={{ color: "var(--bg-deep)", backgroundColor: "rgba(15,61,46,0.06)" }}
                  aria-label="Open navigation menu"
                >
                  <Menu size={20} />
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72" style={{ backgroundColor: "var(--bg-cream)" }}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="pt-6 px-2">
                  <LogoMark size={40} />

                  <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile navigation">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: i * 0.05, ease: EASE }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="block py-3 px-2 text-[15px] border-b transition-colors hover:text-[var(--accent-gold)]"
                          style={{
                            color: "var(--ink)",
                            borderColor: "var(--line)",
                            fontFamily: "var(--font-body)",
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
                        className="mt-6 flex items-center justify-center h-12 text-sm"
                        style={{
                          backgroundColor: "var(--accent-gold)",
                          color: "var(--bg-deep)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 700,
                          borderRadius: 999,
                        }}
                      >
                        Book a Site Visit
                      </Link>
                    </motion.div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
