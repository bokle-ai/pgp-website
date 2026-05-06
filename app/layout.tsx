import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prime Golden Properties | DTCP Plots, Construction & Resale in Chennai",
  description:
    "DTCP-approved plots, turnkey construction at honest rates, and trusted resale across Chennai's southern and western corridors — Maraimalai Nagar, Kundrathur, and Tambaram.",
  openGraph: {
    title: "Prime Golden Properties | Land that turns into legacy.",
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
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: "var(--font-dm-sans, 'Helvetica Neue', sans-serif)" }}>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
