import { siteConfig } from "@/lib/data/site";
import { faqs } from "@/lib/data/faqs";

const BASE_URL = "https://www.primegoldenproperties.in";

/** Organization + LocalBusiness schema — included on every page via layout */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Prime Golden Properties",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+91-${siteConfig.phonePlain}`,
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Tamil"],
        },
        sameAs: Object.values(siteConfig.social),
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${BASE_URL}/#business`,
        name: "Prime Golden Properties",
        url: BASE_URL,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: "No. 12, GST Road",
          addressLocality: "Maraimalai Nagar",
          addressRegion: "Tamil Nadu",
          postalCode: "603209",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 12.7922,
          longitude: 80.0172,
        },
        telephone: `+91-${siteConfig.phonePlain}`,
        email: siteConfig.email,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday"],
            opens: "10:00",
            closes: "16:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Maraimalai Nagar" },
          { "@type": "City", name: "Kundrathur" },
          { "@type": "City", name: "Tambaram" },
        ],
        priceRange: "₹₹",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** FAQ schema — used on home page FAQ section */
export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** LocalBusiness schema per location page */
export function LocationSchema({
  name,
  slug,
  startingPrice,
}: {
  name: string;
  slug: string;
  startingPrice: string;
}) {
  const geoMap: Record<string, { lat: number; lng: number; postal: string }> = {
    "maraimalai-nagar": { lat: 12.7922, lng: 80.0172, postal: "603209" },
    kundrathur: { lat: 13.0089, lng: 80.0908, postal: "600069" },
    tambaram: { lat: 12.9249, lng: 80.1000, postal: "600045" },
  };
  const geo = geoMap[slug] ?? { lat: 12.9249, lng: 80.1, postal: "600001" };

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `Prime Golden Properties — ${name}`,
    url: `${BASE_URL}/locations/${slug}`,
    description: `DTCP-approved residential plots and turnkey construction in ${name}, Chennai outskirts. Starting at ${startingPrice}.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: name,
      addressRegion: "Tamil Nadu",
      postalCode: geo.postal,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    areaServed: { "@type": "City", name },
    telephone: `+91-${siteConfig.phonePlain}`,
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
