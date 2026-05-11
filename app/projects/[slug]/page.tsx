import { notFound } from "next/navigation";
import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { VisitForm } from "@/components/visit-form";
import { projects } from "@/lib/data/projects";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/data/site";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} | Prime Golden Properties`,
    description: `${project.approval} approved plotted layout in ${project.location}. ${project.plotCount} plots, ${project.sizes}, starting ₹${project.rate.toLocaleString("en-IN")}/sq ft.`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <section className="relative min-h-[55vh] flex items-end pb-14 pt-44">
          <div className="absolute inset-0 img-warm">
            <Image src={project.image} alt={`${project.name} plotted layout`} fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,43,34,0.9), rgba(14,43,34,0.2))" }} aria-hidden="true" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-2 text-xs" style={{ color: "rgba(246,241,231,0.5)", fontFamily: "var(--font-montserrat, sans-serif)" }}>
                <li><Link href="/" className="hover:text-[var(--accent-gold)] transition-colors">Home</Link></li>
                <li aria-hidden="true">›</li>
                <li><Link href="/projects" className="hover:text-[var(--accent-gold)] transition-colors">Projects</Link></li>
                <li aria-hidden="true">›</li>
                <li style={{ color: "var(--accent-gold)" }}>{project.name}</li>
              </ol>
            </nav>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "var(--accent-gold)", color: "var(--bg-deep)", fontFamily: "var(--font-montserrat, sans-serif)" }}>{project.approval} Approved</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: project.status === "available" ? "#2E7D5B" : project.status === "few-left" ? "#B8860B" : "#8B3A3A", color: "white", fontFamily: "var(--font-montserrat, sans-serif)" }}>
                {project.status === "available" ? "Available" : project.status === "few-left" ? "Few Left" : "Sold Out"}
              </span>
            </div>
            <h1 className="mb-2" style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 600, fontSize: "clamp(2.5rem, 4vw + 1rem, 4rem)", color: "var(--bg-cream)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              {project.name}
            </h1>
            <p className="text-base" style={{ color: "rgba(246,241,231,0.7)", fontFamily: "var(--font-montserrat, sans-serif)" }}>
              {project.location} · {project.plotCount} plots · {project.sizes}
            </p>
          </div>
        </section>

        {/* Details + form */}
        <section className="py-24" style={{ backgroundColor: "var(--bg-cream)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
              <div className="lg:col-span-7 space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Plots", value: project.plotCount.toString() },
                    { label: "Sizes", value: project.sizes },
                    { label: "Rate", value: `₹${project.rate.toLocaleString("en-IN")}/sq ft` },
                    { label: "Approval", value: project.approval },
                  ].map((d) => (
                    <div key={d.label} className="p-4" style={{ border: "1px solid var(--line)" }}>
                      <p className="text-xs uppercase tracking-wide mb-1" style={{ color: "var(--ink-faint)", fontFamily: "var(--font-montserrat, sans-serif)", letterSpacing: "0.08em" }}>{d.label}</p>
                      <p className="text-sm font-medium" style={{ color: "var(--ink)", fontFamily: "var(--font-montserrat, sans-serif)", fontWeight: 500 }}>{d.value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className="mb-3" style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 600, fontSize: "1.375rem", color: "var(--ink)" }}>Amenities</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {project.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-montserrat, sans-serif)" }}>
                        <span style={{ color: "var(--accent-gold)" }} aria-hidden="true">—</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-5 p-8" style={{ backgroundColor: "var(--bg-deep)", position: "sticky", top: "110px", alignSelf: "start" }}>
                <h2 className="mb-6" style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 600, fontSize: "1.375rem", color: "var(--bg-cream)" }}>Book a site visit</h2>
                <VisitForm />
                <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--line-dark)" }}>
                  <a href={`tel:${siteConfig.phonePlain}`} className="block text-xl font-display transition-opacity hover:opacity-75" style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 600, color: "var(--accent-gold)" }}>{siteConfig.phone}</a>
                </div>
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
