import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { siteConfig } from "@/lib/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Prime Golden Properties",
  description: "Learn about Prime Golden Properties — founded in Chennai's outskirts, built on local expertise and transparent dealings.",
};

export default function AboutPage() {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content" className="pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: "var(--accent-gold)" }} aria-hidden="true" />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-montserrat, sans-serif)", letterSpacing: "0.18em" }}>
              Our story
            </span>
          </div>
          <h1
            className="mb-8"
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontWeight: 600,
              fontSize: "clamp(2.5rem, 4vw + 1rem, 4rem)",
              color: "var(--ink)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Built on the outskirts.<br />Built on trust.
          </h1>
          <div className="prose space-y-5">
            {[
              `Prime Golden Properties was founded in ${siteConfig.foundedYear} by a young entrepreneur who grew up watching Chennai's southern corridors transform from agricultural land into the city's most promising residential belts.`,
              "The founding insight was simple: the families buying plots in Maraimalai Nagar, Kundrathur, and Tambaram weren't looking for a salesperson. They were looking for a local partner — someone who knew the soil, the approvals, the registrar's office, and the neighbourhood.",
              "We started with one plotted layout in Maraimalai Nagar. We sold it by doing the one thing most promoters wouldn't: we walked every buyer through the full documentation before collecting a single rupee of advance.",
              "Twelve years on, that principle is still the product. Every PGP project is backed by complete legal due diligence, published before the first site visit. Our construction team uses the same rates for every client — published on this page.",
              "We don't cover every corridor in Tamil Nadu. We cover three, and we know them the way you know your own street.",
            ].map((para, i) => (
              <p key={i} style={{ color: "var(--ink-muted)", lineHeight: 1.75, fontFamily: "var(--font-montserrat, sans-serif)", fontSize: "1.0625rem" }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
