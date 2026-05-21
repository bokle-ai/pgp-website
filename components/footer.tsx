import Link from "next/link";
import { PGPLogo } from "./pgp-logo";
import { siteConfig } from "@/lib/data/site";

const serviceLinks = [
  { label: "Plots", href: "/#plots" },
  { label: "Construction", href: "/#construction" },
  { label: "Resale", href: "/#resale" },
  { label: "NRI Services", href: "/contact?type=nri" },
  { label: "Home Loans", href: "/contact?type=loan" },
  { label: "About", href: "/about" },
];

const locationLinks = [
  "Papanthangal",
  "Perumpallam",
  "Cheyyar",
  "Thavasi",
  "Sengadu",
  "Irungal",
];

const seoKeywords = [
  "Plots in Papanthangal",
  "Plots in Perumpallam",
  "Plots in Cheyyar",
  "DTCP Approved Plots Chennai",
  "Plots near Cheyyar",
  "Affordable plots Tamil Nadu",
];

function SocialIcon({ type, href }: { type: string; href: string }) {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors hover:text-[var(--accent-gold)]"
      style={{ color: "rgba(246,241,231,0.45)" }}
      aria-label={`PGP on ${type}`}
    >
      {icons[type]}
    </a>
  );
}

const headingStyle: React.CSSProperties = {
  color: "var(--accent-gold)",
  fontFamily: "var(--font-montserrat, sans-serif)",
  letterSpacing: "0.2em",
};

const linkStyle: React.CSSProperties = {
  color: "rgba(246,241,231,0.6)",
  fontFamily: "var(--font-montserrat, sans-serif)",
};

export function Footer() {
  return (
    <footer
      className="grain-overlay"
      style={{ backgroundColor: "var(--bg-deep)" }}
      aria-label="Site footer"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 mb-16">
          {/* Col 1 — Brand */}
          <div>
            <PGPLogo variant="stacked" darkMode={true} />
            <p
              className="mt-5 text-sm max-w-[28ch]"
              style={{ color: "rgba(246,241,231,0.55)", fontFamily: "var(--font-montserrat, sans-serif)", lineHeight: 1.65 }}
            >
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {Object.entries(siteConfig.social).map(([type, href]) => (
                <SocialIcon key={type} type={type} href={href} />
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="text-[10px] uppercase mb-5" style={headingStyle}>
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--accent-gold)]"
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Locations */}
          <div>
            <h3 className="text-[10px] uppercase mb-5" style={headingStyle}>
              Locations
            </h3>
            <ul className="space-y-3">
              {locationLinks.map((loc) => {
                const slug = loc.toLowerCase().replace(/\s+/g, "-");
                return (
                  <li key={loc}>
                    <Link
                      href={`/locations/${slug}`}
                      className="text-sm transition-colors hover:text-[var(--accent-gold)]"
                      style={linkStyle}
                    >
                      {loc}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-[10px] uppercase mb-5" style={headingStyle}>
              Contact
            </h3>
            <address className="not-italic space-y-3" style={{ fontFamily: "var(--font-montserrat, sans-serif)" }}>
              <a
                href={`tel:${siteConfig.phonePlain}`}
                className="block text-sm transition-colors hover:text-[var(--accent-gold)]"
                style={linkStyle}
              >
                {siteConfig.phone}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm transition-colors hover:text-[var(--accent-gold)]"
                style={linkStyle}
              >
                WhatsApp
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-sm transition-colors hover:text-[var(--accent-gold)]"
                style={linkStyle}
              >
                {siteConfig.email}
              </a>
              <p className="text-sm" style={{ color: "rgba(246,241,231,0.55)", lineHeight: 1.6 }}>
                {siteConfig.address}
              </p>
              <p className="text-xs pt-1" style={{ color: "rgba(246,241,231,0.4)" }}>
                {siteConfig.workingHours}
              </p>
            </address>
          </div>
        </div>

        {/* SEO keyword row */}
        <div
          className="py-8"
          style={{ borderTop: "1px solid var(--line-dark)", borderBottom: "1px solid var(--line-dark)" }}
        >
          <p
            className="text-[11px] flex flex-wrap items-center gap-x-3 gap-y-1.5"
            style={{
              color: "rgba(246,241,231,0.4)",
              fontFamily: "var(--font-montserrat, sans-serif)",
              letterSpacing: "0.04em",
            }}
          >
            {seoKeywords.map((kw, i) => (
              <span key={kw} className="flex items-center gap-3">
                {i > 0 && (
                  <span style={{ color: "rgba(212,160,23,0.5)" }} aria-hidden="true">·</span>
                )}
                {kw}
              </span>
            ))}
          </p>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            color: "rgba(246,241,231,0.35)",
            fontFamily: "var(--font-montserrat, sans-serif)",
          }}
        >
          <p>&copy; 2025 Prime Golden Properties. RERA Reg. No. {siteConfig.rera}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-[var(--accent-gold)]">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[var(--accent-gold)]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
