"use client";

import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { VisitForm } from "@/components/visit-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { siteConfig } from "@/lib/data/site";
import { motion } from "framer-motion";
import { EASE } from "@/lib/animation";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phonePlain}`,
    sub: "Mon to Sat, 9am to 7pm",
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    sub: "We reply within 4 hours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: siteConfig.address,
    href: null,
    sub: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: siteConfig.workingHours,
    href: null,
    sub: "Site visits available weekends",
  },
];

export default function ContactPage() {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section
          className="relative pt-48 pb-20 overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 60% 60% at 10% 90%, rgba(212,160,23,0.12), transparent 60%),
              linear-gradient(180deg, #0F3D2E 0%, #0C3527 100%)
            `,
          }}
          aria-label="Contact us"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 5vw + 1rem, 5rem)",
                color: "var(--bg-cream)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              {"Let's talk land."}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="mt-5 max-w-[50ch] text-[1.0625rem]"
              style={{ color: "rgba(246,241,231,0.6)", fontFamily: "var(--font-body)", lineHeight: 1.7 }}
            >
              Fill in the form below or reach us directly. We respond within 4 working hours.
            </motion.p>
          </div>
        </section>

        {/* ── Form + Details ───────────────────────────────── */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-cream)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-14 items-start">

              {/* Form */}
              <ScrollReveal className="lg:col-span-7" delay={0.1}>
                <div
                  className="p-8 lg:p-10"
                  style={{
                    backgroundColor: "white",
                    borderRadius: 24,
                    border: "1px solid rgba(15,61,46,0.07)",
                    boxShadow: "0 8px 40px rgba(15,61,46,0.07)",
                  }}
                >
                  <h2
                    className="mb-7"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Schedule a site visit
                  </h2>
                  <VisitForm />
                </div>
              </ScrollReveal>

              {/* Contact details */}
              <div className="lg:col-span-5 space-y-4">
                {contactDetails.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <ScrollReveal key={item.label} delay={0.1 + i * 0.08} direction="right">
                      <motion.div
                        className="flex gap-4 p-5"
                        style={{
                          backgroundColor: "white",
                          borderRadius: 18,
                          border: "1px solid rgba(15,61,46,0.07)",
                          boxShadow: "0 4px 16px rgba(15,61,46,0.05)",
                        }}
                        whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(15,61,46,0.1)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      >
                        <div
                          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl"
                          style={{ backgroundColor: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.24)" }}
                        >
                          <Icon size={18} style={{ color: "var(--accent-gold)" }} aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-[10px] uppercase tracking-wider mb-1"
                            style={{ color: "var(--ink-faint)", fontFamily: "var(--font-body)", fontWeight: 700 }}
                          >
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="block text-[15px] transition-colors hover:text-[var(--accent-gold)]"
                              style={{ color: "var(--ink)", fontFamily: "var(--font-body)", fontWeight: 600, lineHeight: 1.4 }}
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p style={{ color: "var(--ink)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9375rem", lineHeight: 1.5 }}>
                              {item.value}
                            </p>
                          )}
                          {item.sub && (
                            <p className="mt-0.5 text-xs" style={{ color: "var(--ink-faint)", fontFamily: "var(--font-body)" }}>
                              {item.sub}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  );
                })}

                {/* WhatsApp CTA */}
                <ScrollReveal delay={0.45} direction="right">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20site%20visit.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-4 text-sm font-semibold transition-all hover:brightness-105 active:scale-[0.98]"
                    style={{
                      backgroundColor: "#128C7E",
                      color: "white",
                      borderRadius: 18,
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      boxShadow: "0 6px 20px rgba(37,211,102,0.28)",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Message us on WhatsApp
                  </a>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
    </>
  );
}
