import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WhatsAppFAB } from "@/components/whatsapp-fab";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects | Prime Golden Properties",
  description: "Browse all active DTCP-approved plotted layouts by Prime Golden Properties across Maraimalai Nagar, Kundrathur, and Tambaram.",
};

export default function ProjectsPage() {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content" className="pt-40 pb-24" style={{ backgroundColor: "var(--bg-cream)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: "var(--accent-gold)" }} aria-hidden="true" />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-montserrat, sans-serif)", letterSpacing: "0.18em" }}>Active inventory</span>
          </div>
          <h1 className="mb-12" style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontWeight: 600, fontSize: "clamp(2.5rem, 4vw + 1rem, 4rem)", color: "var(--ink)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            All projects.
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
