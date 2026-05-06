import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { VisitForm } from "@/components/visit-form";
import { siteConfig } from "@/lib/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Prime Golden Properties",
  description: "Get in touch with Prime Golden Properties. Schedule a site visit, get a construction quote, or list your property.",
};

export default function ContactPage() {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content" className="relative grain-overlay py-32 min-h-screen" style={{ backgroundColor: "var(--bg-deep)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16">
          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-fraunces, Georgia, serif)",
              fontWeight: 600,
              fontSize: "clamp(2.5rem, 4vw + 1rem, 4rem)",
              color: "var(--bg-cream)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Let&rsquo;s talk land.
          </h1>
          <p className="mb-14 text-base" style={{ color: "rgba(246,241,231,0.65)", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.65 }}>
            Fill in the form or reach us directly. We respond within 4 working hours.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-7">
              <VisitForm />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(246,241,231,0.35)", fontFamily: "var(--font-dm-sans, sans-serif)", letterSpacing: "0.1em" }}>Phone</p>
                <a href={`tel:${siteConfig.phonePlain}`} className="text-2xl font-display transition-opacity hover:opacity-75" style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontWeight: 600, color: "var(--bg-cream)" }}>{siteConfig.phone}</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(246,241,231,0.35)", fontFamily: "var(--font-dm-sans, sans-serif)", letterSpacing: "0.1em" }}>Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-sm transition-colors hover:text-[var(--accent-gold)]" style={{ color: "rgba(246,241,231,0.6)", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{siteConfig.email}</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(246,241,231,0.35)", fontFamily: "var(--font-dm-sans, sans-serif)", letterSpacing: "0.1em" }}>Office</p>
                <address className="not-italic text-sm" style={{ color: "rgba(246,241,231,0.6)", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.65 }}>{siteConfig.address}</address>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(246,241,231,0.35)", fontFamily: "var(--font-dm-sans, sans-serif)", letterSpacing: "0.1em" }}>Hours</p>
                <p className="text-sm" style={{ color: "rgba(246,241,231,0.6)", fontFamily: "var(--font-dm-sans, sans-serif)" }}>{siteConfig.workingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
