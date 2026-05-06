import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use | Prime Golden Properties" };

export default function TermsPage() {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content" className="pt-40 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h1 className="mb-8" style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontWeight: 600, fontSize: "2.5rem", color: "var(--ink)" }}>Terms of Use</h1>
          <div className="space-y-5 text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.75 }}>
            <p>This website is operated by Prime Golden Properties. By accessing this site, you agree to these terms.</p>
            <p>All content on this site — including plot rates, project details, and construction pricing — is provided for informational purposes. Rates are subject to change. All transactions are governed by the sale agreement executed between the buyer and Prime Golden Properties.</p>
            <p>Plot prices and availability are indicative. Final rates are confirmed at the time of booking. Government charges (stamp duty, registration) are additional and vary by property value.</p>
            <p>For disputes, the jurisdiction shall be courts in Chengalpattu District, Tamil Nadu, India.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
