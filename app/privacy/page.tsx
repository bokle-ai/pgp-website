import { UtilityBar } from "@/components/utility-bar";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy | Prime Golden Properties" };

export default function PrivacyPage() {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main id="main-content" className="pt-40 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h1 className="mb-8" style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontWeight: 600, fontSize: "2.5rem", color: "var(--ink)" }}>Privacy Policy</h1>
          <div className="space-y-5 text-sm" style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.75 }}>
            <p>Prime Golden Properties collects your name, phone number, and email when you submit a site visit request. This information is used solely to contact you about your enquiry.</p>
            <p>We do not sell, rent, or share your personal data with third parties except as required by law.</p>
            <p>For questions, write to {" "}<a href="mailto:info@primegoldenproperties.in" className="underline" style={{ color: "var(--accent-gold)" }}>info@primegoldenproperties.in</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
