import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { ProjectCard } from "@/components/project-card";
import { VisitForm } from "@/components/visit-form";
import { LocationSchema } from "@/components/json-ld";
import { locations } from "@/lib/data/locations";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/data/site";

export async function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};

  return {
    title: `Plots in ${location.name} | Prime Golden Properties`,
    description: `${location.shortDesc} DTCP-approved residential plots and turnkey home construction in ${location.name}. Site visits 7 days a week.`,
    openGraph: {
      title: `${location.name} Plots | Prime Golden Properties`,
      description: location.shortDesc,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  const locationProjects = projects.filter((p) => p.locationSlug === slug);

  return (
    <>
      <LocationSchema
        name={location.name}
        slug={location.slug}
        startingPrice={location.stats.startingPrice}
      />
      <UtilityBar />
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <section
          className="relative min-h-[60vh] flex items-end pb-16 pt-48"
          aria-label={`${location.name} hero`}
        >
          <div className="absolute inset-0">
            <Image
              src={location.image}
              alt={location.imageAlt}
              fill
              className="object-cover img-warm"
              priority
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(14,43,34,0.85), rgba(14,43,34,0.3))" }}
              aria-hidden="true"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm" style={{ color: "rgba(246,241,231,0.6)", fontFamily: "var(--font-montserrat, sans-serif)" }}>
                <li><Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">Home</Link></li>
                <li aria-hidden="true">›</li>
                <li><Link href="/#locations" className="hover:text-[var(--accent-gold)] transition-colors">Locations</Link></li>
                <li aria-hidden="true">›</li>
                <li style={{ color: "var(--accent-gold)" }}>{location.name}</li>
              </ol>
            </nav>
            <div
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-montserrat, sans-serif)", letterSpacing: "0.18em" }}
            >
              {location.number} — Location guide
            </div>
            <h1
              className="mb-3"
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                fontWeight: 600,
                fontSize: "clamp(2.5rem, 5vw + 1rem, 4.5rem)",
                color: "var(--bg-cream)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {location.name}
            </h1>
            <p
              className="text-xl italic"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              {location.tagline}
            </p>
          </div>
        </section>

        {/* Stats band */}
        <section
          className="py-10"
          style={{ backgroundColor: "var(--bg-deep-2)" }}
          aria-label="Location statistics"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-3 divide-x" style={{ "--tw-divide-opacity": 1, borderColor: "var(--line-dark)" } as React.CSSProperties}>
              {[
                { label: "Active projects", value: location.stats.activeProjects },
                { label: "Starting price", value: location.stats.startingPrice },
                { label: "From Chennai", value: location.stats.distanceFromChennai },
              ].map((stat) => (
                <div key={stat.label} className="px-6 first:pl-0 last:pr-0 text-center">
                  <div
                    className="tabular-nums"
                    style={{
                      fontFamily: "var(--font-playfair, Georgia, serif)",
                      fontWeight: 600,
                      fontSize: "1.875rem",
                      color: "var(--accent-gold)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs mt-1 uppercase tracking-wide"
                    style={{ color: "rgba(246,241,231,0.5)", fontFamily: "var(--font-montserrat, sans-serif)", letterSpacing: "0.08em" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About this location */}
        <section className="py-24 lg:py-32" style={{ backgroundColor: "var(--bg-cream)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
              <div className="lg:col-span-7">
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-playfair, Georgia, serif)",
                    fontWeight: 600,
                    fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)",
                    color: "var(--ink)",
                    lineHeight: 1.15,
                  }}
                >
                  Why {location.name}?
                </h2>
                <div className="space-y-4">
                  {location.body.map((para, i) => (
                    <p
                      key={i}
                      style={{ color: "var(--ink-muted)", lineHeight: 1.7, fontFamily: "var(--font-montserrat, sans-serif)", fontSize: "1.0625rem" }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 relative min-h-[320px] rounded-2xl overflow-hidden img-warm">
                <Image
                  src={location.mapImage}
                  alt={`Map and overview of ${location.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects in this location */}
        {locationProjects.length > 0 && (
          <section className="py-24 lg:py-32" style={{ backgroundColor: "white" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8" style={{ backgroundColor: "var(--accent-gold)" }} aria-hidden="true" />
                  <span
                    className="text-xs uppercase tracking-widest font-medium"
                    style={{ color: "var(--accent-gold)", letterSpacing: "0.18em", fontFamily: "var(--font-montserrat, sans-serif)" }}
                  >
                    Active inventory
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-playfair, Georgia, serif)",
                    fontWeight: 600,
                    fontSize: "clamp(2rem, 3vw + 1rem, 3rem)",
                    color: "var(--ink)",
                    lineHeight: 1.1,
                  }}
                >
                  Plots in {location.name} right now.
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locationProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Site visit CTA */}
        <section
          id="site-visit"
          className="relative grain-overlay py-24 lg:py-32"
          style={{ backgroundColor: "var(--bg-deep)" }}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-12">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-playfair, Georgia, serif)",
                  fontWeight: 600,
                  fontSize: "clamp(2rem, 3vw + 1rem, 3.5rem)",
                  color: "var(--bg-cream)",
                  lineHeight: 1.1,
                }}
              >
                Visit {location.name} with us.
              </h2>
              <p
                style={{ color: "rgba(246,241,231,0.65)", lineHeight: 1.65, fontFamily: "var(--font-montserrat, sans-serif)" }}
              >
                Site visits are 7 days a week. Pick a day that works for you.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-12">
              <div className="lg:col-span-4">
                <VisitForm />
              </div>
              <div className="lg:col-span-3 flex flex-col gap-4">
                <p className="text-sm" style={{ color: "rgba(246,241,231,0.55)", fontFamily: "var(--font-montserrat, sans-serif)", lineHeight: 1.65 }}>
                  Prefer to call directly?
                </p>
                <a
                  href={`tel:${siteConfig.phonePlain}`}
                  className="transition-opacity hover:opacity-75"
                  style={{
                    fontFamily: "var(--font-playfair, Georgia, serif)",
                    fontWeight: 600,
                    fontSize: "1.75rem",
                    color: "var(--bg-cream)",
                  }}
                >
                  {siteConfig.phone}
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium w-fit"
                  style={{
                    backgroundColor: "#25D366",
                    color: "white",
                    borderRadius: "6px",
                    fontFamily: "var(--font-montserrat, sans-serif)",
                    fontWeight: 500,
                  }}
                >
                  WhatsApp us
                </a>
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
