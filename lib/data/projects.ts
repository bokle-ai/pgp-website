export type ProjectStatus = "available" | "few-left" | "sold-out";

export interface Project {
  slug: string;
  name: string;
  location: string;
  locationSlug: string;
  plotSizeSqFt: number;         // exact sq ft
  sizes: string;                // display string e.g. "1,200 sq ft"
  priceInLakhs: number;         // total price in lakhs e.g. 9 (for ₹9 Lakhs)
  rate: number;                 // derived ₹/sq ft (for sorting/filtering)
  status: ProjectStatus;
  image: string;
  approval: string;             // "DTCP" etc. Empty string = no approval badge.
  amenities: string[];
}

// Final inventory — 9 projects across the Cheyyar Taluk corridor.
export const projects: Project[] = [
  {
    slug: "sulaman-nagar",
    name: "Sulaman Nagar",
    location: "Papanthangal",
    locationSlug: "papanthangal",
    plotSizeSqFt: 1200,
    sizes: "1,200 sq ft",
    priceInLakhs: 9,
    rate: 750,
    status: "available",
    image: "/images/brand/project-sulaman-nagar.webp",
    approval: "DTCP",
    amenities: ["Ready to Construct"],
  },
  {
    slug: "vetrivel-nagar",
    name: "Vetrivel Nagar",
    location: "Perumpallam",
    locationSlug: "perumpallam",
    plotSizeSqFt: 1150,
    sizes: "1,150 sq ft",
    priceInLakhs: 15,
    rate: 1304,
    status: "available",
    image: "/images/brand/project-vetrivel-nagar.webp",
    approval: "DTCP",
    amenities: ["Ready to Construct"],
  },
  {
    slug: "valli-murugan-nagar",
    name: "Valli Murugan Nagar",
    location: "Perumpallam",
    locationSlug: "perumpallam",
    plotSizeSqFt: 600,
    sizes: "600 sq ft",
    priceInLakhs: 4,
    rate: 667,
    status: "available",
    image: "/images/brand/project-valli-murugan-nagar.webp",
    approval: "DTCP",
    amenities: ["Ready to Construct"],
  },
  {
    slug: "brindavanan-nagar-sengathankudi",
    name: "Brindavanan Nagar (Sengathankudi)",
    location: "Sengathankudi, Cheyyar",
    locationSlug: "cheyyar",
    plotSizeSqFt: 1200,
    sizes: "1,200 sq ft",
    priceInLakhs: 7.5,
    rate: 625,
    status: "available",
    image: "/images/brand/project-brindavanan-sengadu.webp",
    approval: "DTCP",
    amenities: [
      "Ready to Construct",
      "Water Line Available",
      "CCTV",
      "Fully Compounded",
      "24×7 Security",
    ],
  },
  {
    slug: "brindavanan-nagar-irungal",
    name: "Brindavanan Nagar (Irungal)",
    location: "Irungal, Cheyyar Taluk",
    locationSlug: "cheyyar",
    plotSizeSqFt: 1000,
    sizes: "1,000 sq ft",
    priceInLakhs: 7.25,
    rate: 725,
    status: "available",
    image: "/images/brand/project-brindavanan-irungal.webp",
    approval: "DTCP",
    amenities: [
      "Ready to Construct",
      "Water Line Available",
      "CCTV",
      "Fully Compounded",
      "24×7 Security",
    ],
  },
  {
    slug: "sks-nagar",
    name: "SKS Nagar",
    location: "Sengadu, Cheyyar",
    locationSlug: "cheyyar",
    plotSizeSqFt: 1200,
    sizes: "1,200 sq ft",
    priceInLakhs: 3,
    rate: 250,
    status: "available",
    image: "/images/brand/location-cheyyar.webp",
    approval: "DTCP",
    amenities: ["Ready to Construct"],
  },
  {
    slug: "mahalakshmi-nagar",
    name: "Mahalakshmi Nagar",
    location: "Cheyyar Town",
    locationSlug: "cheyyar",
    plotSizeSqFt: 1200,
    sizes: "1,200 sq ft",
    priceInLakhs: 30,
    rate: 2500,
    status: "available",
    image: "/images/brand/project-amma-nagar.webp",
    approval: "",
    amenities: ["Blacktop Road", "Main City Road in Town"],
  },
  {
    slug: "arunachalam-nagar",
    name: "Arunachalam Nagar",
    location: "Puliyarambakkam, Cheyyar",
    locationSlug: "cheyyar",
    plotSizeSqFt: 1200,
    sizes: "1,200 sq ft",
    priceInLakhs: 6.5,
    rate: 542,
    status: "available",
    image: "/images/brand/location-perumpallam.webp",
    approval: "",
    amenities: ["Fully Surrendered by Owner", "Blacktop Road"],
  },
  {
    slug: "rich-india",
    name: "Rich India",
    location: "Meranam, Cheyyar",
    locationSlug: "cheyyar",
    plotSizeSqFt: 1200,
    sizes: "1,200 sq ft",
    priceInLakhs: 5.4,
    rate: 450,
    status: "available",
    image: "/images/brand/location-papanthangal.webp",
    approval: "DTCP",
    amenities: ["Blacktop Road"],
  },
];
