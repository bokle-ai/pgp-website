import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { OrganizationSchema } from "@/components/json-ld";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prime Golden Properties | DTCP Plots, Construction & Resale in Chennai",
    template: "%s | Prime Golden Properties",
  },
  description:
    "DTCP-approved plots, turnkey construction at honest rates, and trusted resale across Chennai's southern and western corridors — Maraimalai Nagar, Kundrathur, and Tambaram.",
  metadataBase: new URL("https://www.primegoldenproperties.in"),
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
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <head>
        <OrganizationSchema />
      </head>
      <body style={{ fontFamily: "var(--font-montserrat, 'Helvetica Neue', sans-serif)" }}>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
