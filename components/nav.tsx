"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
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
      className="fixed left-0 right-0 z-40 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      style={{
        top: scrolled ? "10px" : "46px",
        transition: "top 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <motion.div
        className="mx-auto flex items-center justify-between rounded-full"
        animate={{
          maxWidth: scrolled ? 960 : 1120,
          paddingTop: scrolled ? 8 : 12,
          paddingBottom: scrolled ? 8 : 12,
        }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: "rgba(248,245,239,0.82)",
          backdropFilter: "blur(16px) saturate(1.4)",
          WebkitBackdropFilter: "blur(16px) saturate(1.4)",
          border: "1px solid rgba(15,61,46,0.08)",
          boxShadow: scrolled
            ? "0 10px 40px rgba(15,61,46,0.14), inset 0 1px 0 rgba(255,255,255,0.5)"
            : "0 6px 28px rgba(15,61,46,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Logo — desktop: full PNG at readable size · mobile: icon emblem only */}
        <Link
          href="/"
          aria-label="Prime Golden Properties home"
          className="flex items-center shrink-0"
        >
          {/* Desktop: full portrait PNG, text is readable at this height */}
          <span className="hidden lg:block">
            <PGPLogo variant="full" height={scrolled ? 68 : 92} />
          </span>
          {/* Mobile: just the emblem mark — keeps the pill compact */}
          <span className="lg:hidden">
            <PGPLogo variant="icon" size={44} />
          </span>
        </Link>

        {/* CENTER — desktop nav with animated hover pill */}
        <nav
          className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
          aria-label="Main navigation"
          onMouseLeave={() => setHovered(null)}
        >
          {mounted &&
            navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 + i * 0.05, ease: EASE }}
              >
                <Link
                  href={link.href}
                  onMouseEnter={() => setHovered(link.label)}
                  className="relative block px-3.5 py-2 text-[14.5px] rounded-full transition-colors"
                  style={{
                    color:
                      hovered === link.label
                        ? "var(--bg-deep)"
                        : "var(--ink-muted)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {hovered === link.label && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-full -z-0"
                      style={{ backgroundColor: "rgba(212,160,23,0.16)" }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </motion.div>
            ))}
        </nav>

        {/* RIGHT — phone (desktop) + CTA + mobile hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          {mounted && (
            <motion.a
              href={`tel:${siteConfig.phonePlain}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45, ease: EASE }}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-[14px] rounded-full transition-colors hover:bg-[rgba(15,61,46,0.05)]"
              style={{
                color: "var(--bg-deep)",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
              aria-label="Call us"
            >
              <Phone size={14} style={{ color: "var(--accent-gold)" }} />
              {siteConfig.phone}
            </motion.a>
          )}

          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.5, ease: EASE }}
              className="hidden sm:block"
            >
              <Link
                href="/#site-visit"
                className="inline-flex items-center text-[14px] transition-all active:scale-[0.97] hover:brightness-105 whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-gold) 0%, #E0B43F 100%)",
                  color: "var(--bg-deep)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  padding: "10px 18px",
                  borderRadius: "999px",
                  boxShadow:
                    "0 6px 18px rgba(212,160,23,0.32), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                Book a Visit
              </Link>
            </motion.div>
          )}

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2.5 rounded-full transition-colors"
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
                <div className="pt-6 px-1">
                  <PGPLogo variant="full" height={120} />
                  <nav
                    className="mt-10 flex flex-col gap-1"
                    aria-label="Mobile navigation"
                  >
                    <AnimatePresence>
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
                            className="block py-3 px-2 text-base border-b transition-colors hover:text-[var(--accent-gold)]"
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
                    </AnimatePresence>
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
                        className="mt-6 flex items-center justify-center h-12 text-sm"
                        style={{
                          backgroundColor: "var(--accent-gold)",
                          color: "var(--bg-deep)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 600,
                          borderRadius: "999px",
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
