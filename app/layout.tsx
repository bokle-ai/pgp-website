import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { OrganizationSchema } from "@/components/json-ld";

// Display / headings — Sora: geometric, confident, modern. No serifs.
const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Body / UI — Plus Jakarta Sans: clean, friendly, highly legible.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prime Golden Properties | DTCP Plots, Construction & Resale in Chennai",
    template: "%s | Prime Golden Properties",
  },
  description:
    "DTCP-approved plots, turnkey construction at honest rates, and trusted resale across Chennai's southern and western corridors — Maraimalai Nagar, Kundrathur, and Tambaram.",
  metadataBase: new URL("https://www.primegoldenproperties.com"),
  openGraph: {
    title: "Prime Golden Properties — Land that turns into legacy.",
    description:
      "DTCP-approved plots, turnkey construction, and trusted resale across Maraimalai Nagar, Kundrathur, and Tambaram.",
    type: "website",
    locale: "en_IN",
    siteName: "Prime Golden Properties",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Golden Properties — Land that turns into legacy.",
    description: "DTCP-approved plots, construction, and resale across Chennai's growth corridors.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable}`}>
      <head>
        {/* Opt out of LLM training and image-model scraping. Honoured by
            content-aware crawlers; pairs with the AI-bot blocks in robots.txt. */}
        <meta name="robots" content="noai, noimageai" />
        <meta name="googlebot" content="noai, noimageai" />
        <OrganizationSchema />
      </head>
      <body style={{ fontFamily: "var(--font-sans, 'Helvetica Neue', sans-serif)" }}>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
