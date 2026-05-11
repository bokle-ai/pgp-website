import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
  title: "Prime Golden Properties | DTCP Plots, Construction & Resale in Chennai",
  description:
    "DTCP-approved plots, turnkey construction at honest rates, and trusted resale across Chennai's southern and western corridors — Maraimalai Nagar, Kundrathur, and Tambaram.",
  openGraph: {
    title: "Prime Golden Properties — Right Location. Right Decision.",
    description:
      "DTCP-approved plots, turnkey construction, and trusted resale across Maraimalai Nagar, Kundrathur, and Tambaram.",
    type: "website",
    locale: "en_IN",
    siteName: "Prime Golden Properties",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body style={{ fontFamily: "var(--font-montserrat, 'Helvetica Neue', sans-serif)" }}>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
