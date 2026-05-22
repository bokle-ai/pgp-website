import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { StatStrip } from "@/components/stat-strip";
import { ProjectCard } from "@/components/project-card";
import { PricingTier } from "@/components/pricing-tier";
import { TestimonialCard } from "@/components/testimonial-card";
import { FAQAccordion } from "@/components/faq-accordion";
import { VisitForm } from "@/components/visit-form";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { MobileCTA } from "@/components/mobile-cta";
import { SectionHeader } from "@/components/section-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TrustPillars } from "@/components/trust-pillars";
import { ProcessTimeline } from "@/components/process-timeline";
import { LocationsSection } from "@/components/locations-section";
import { OfferingCard } from "@/components/offering-card";
import { FAQSchema } from "@/components/json-ld";
import { projects } from "@/lib/data/projects";
import { testimonials } from "@/lib/data/testimonials";
import { siteConfig } from "@/lib/data/site";
import Link from "next/link";

export default function Home() {
  const displayedProjects = projects.slice(0, 6);

  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <Hero />

        {/* Stats strip */}
        <StatStrip />

        {/* What we do */}
        <section
          id="plots"
          className="py-16 lg:py-32"
          style={{ backgroundColor: "var(--bg-cream)" }}
          aria-label="Our services"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-12">
              <SectionHeader
                eyebrow="What we do"
                title="Three doors. One trusted partner."
                subtitle="Whether you're buying your first plot, building your home, or moving on from an old one — we're the same team end-to-end."
              />
            </div>

            <div
              id="construction"
              className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="[border-color:var(--line)]">
                <OfferingCard type="plots" animationDelay={0} />
              </div>
              <div className="[border-color:var(--line)]">
                <OfferingCard type="construction" animationDelay={0.12} />
              </div>
              <div id="resale" className="[border-color:var(--line)]">
                <OfferingCard type="resale" animationDelay={0.24} />
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section
          id="locations"
          className="py-16 lg:py-32"
          style={{ backgroundColor: "white" }}
          aria-label="Locations we serve"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-14">
              <SectionHeader
                eyebrow="Where we build"
                title={
                  <>
                    Three corridors. Each with its
                    <br className="hidden lg:block" /> own reason to invest.
                  </>
                }
              />
            </div>
            <LocationsSection />
          </div>
        </section>

        {/* Projects grid */}
        <section
          className="py-16 lg:py-32"
          style={{ backgroundColor: "var(--bg-cream)" }}
          aria-label="Active project inventory"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
              <SectionHeader
                eyebrow="Active inventory"
                title="Plots available right now."
              />
              <ScrollReveal delay={0.2}>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--ink-faint)",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                  }}
                >
                  Showing {displayedProjects.length} of {projects.length} active projects
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  animationDelay={i * 0.1}
                />
              ))}
            </div>

            <ScrollReveal className="mt-12 text-center" delay={0.2}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 group"
                style={{
                  color: "var(--accent-gold)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  fontWeight: 500,
                }}
              >
                View all projects
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Construction pricing */}
        <section
          id="construction-pricing"
          className="py-16 lg:py-32"
          style={{ backgroundColor: "white" }}
          aria-label="Construction packages"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-14">
              <SectionHeader
                eyebrow="Build with us"
                title={
                  <>
                    Honest construction. Per square foot.
                    <br className="hidden lg:block" /> No surprises.
                  </>
                }
                subtitle="Most builders quote you a number then surprise you with extras. We don't. Pick a tier — what's listed is what you pay."
              />
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-px"
              style={{ background: "var(--line)" }}
            >
              {(["standard", "premium", "luxury"] as const).map((tier, i) => (
                <PricingTier key={tier} tier={tier} animationDelay={i * 0.14} />
              ))}
            </div>

            <ScrollReveal className="mt-6 text-center" delay={0.2}>
              <p
                className="text-xs"
                style={{
                  color: "var(--ink-faint)",
                  fontFamily: "var(--font-montserrat, sans-serif)",
                  lineHeight: 1.6,
                }}
              >
                Rates are indicative for built-up area, exclude land cost and
                government charges. Final quote depends on plot, design, and
                selections.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Why PGP */}
        <section
          className="py-16 lg:py-32"
          style={{ backgroundColor: "var(--bg-cream)" }}
          aria-label="Why choose PGP"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-14">
              <SectionHeader eyebrow="Why PGP" title="Why families trust us." />
            </div>
            <TrustPillars />
          </div>
        </section>

        {/* Process */}
        <section
          className="py-16 lg:py-32"
          style={{ backgroundColor: "white" }}
          aria-label="How it works"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-14">
              <SectionHeader
                eyebrow="How it works"
                title="From interest to ownership."
              />
            </div>
            <ProcessTimeline />
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="py-16 lg:py-32"
          style={{ backgroundColor: "var(--bg-cream)" }}
          aria-label="Customer testimonials"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-12">
              <SectionHeader title="From the families who built here." />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  animationDelay={i * 0.12}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="py-16 lg:py-32"
          style={{ backgroundColor: "white" }}
          aria-label="Frequently asked questions"
        >
          <FAQSchema />
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className="mb-12">
              <SectionHeader
                eyebrow="Things people ask"
                title="Common questions, answered."
              />
            </div>
            <ScrollReveal delay={0.15}>
              <FAQAccordion />
            </ScrollReveal>
          </div>
        </section>

        {/* Site visit CTA */}
        <section
          id="site-visit"
          className="relative grain-overlay py-24 lg:py-32"
          style={{ backgroundColor: "var(--bg-deep)" }}
          aria-label="Schedule a site visit"
        >
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-12">
              <SectionHeader
                goldRule
                title="Come see the land."
                subtitle="A site visit takes 90 minutes. We'll pick you up from the nearest railway station. Saturday and Sunday slots fill fastest — book early."
                titleDark
                subtitleDark
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
              {/* Form */}
              <ScrollReveal className="lg:col-span-7" delay={0.1}>
                <VisitForm />
              </ScrollReveal>

              {/* Contact panel */}
              <ScrollReveal className="lg:col-span-5" delay={0.25} direction="right">
                <div
                  className="p-7 h-full flex flex-col gap-6"
                  style={{ border: "1px solid var(--line-dark)" }}
                >
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: "var(--font-playfair, Georgia, serif)",
                      fontWeight: 600,
                      fontSize: "1.25rem",
                      color: "var(--accent-gold)",
                    }}
                  >
                    Or just talk to us
                  </h3>
                  <a
                    href={`tel:${siteConfig.phonePlain}`}
                    className="block transition-opacity hover:opacity-75"
                    style={{
                      fontFamily: "var(--font-playfair, Georgia, serif)",
                      fontWeight: 600,
                      fontSize: "2rem",
                      color: "var(--bg-cream)",
                      lineHeight: 1.1,
                    }}
                  >
                    {siteConfig.phone}
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20site%20visit.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 w-fit"
                    style={{
                      backgroundColor: "#25D366",
                      color: "white",
                      fontFamily: "var(--font-montserrat, sans-serif)",
                      fontWeight: 500,
                      borderRadius: "6px",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp us
                  </a>
                  <div
                    className="pt-5"
                    style={{ borderTop: "1px solid var(--line-dark)" }}
                  >
                    <p
                      className="text-xs uppercase tracking-widest mb-2"
                      style={{
                        color: "rgba(246,241,231,0.35)",
                        fontFamily: "var(--font-montserrat, sans-serif)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Office address
                    </p>
                    <address
                      className="not-italic text-sm"
                      style={{
                        color: "rgba(246,241,231,0.55)",
                        fontFamily: "var(--font-montserrat, sans-serif)",
                        lineHeight: 1.65,
                      }}
                    >
                      {siteConfig.address}
                    </address>
                    <p
                      className="mt-3 text-xs"
                      style={{
                        color: "rgba(246,241,231,0.35)",
                        fontFamily: "var(--font-montserrat, sans-serif)",
                      }}
                    >
                      {siteConfig.workingHours}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
      <MobileCTA />
    </>
  );
}
