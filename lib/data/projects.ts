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
  approval: string;
  amenities: string[];
}

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
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
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
    image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&h=600&fit=crop",
    approval: "DTCP",
    amenities: ["Ready to Construct"],
  },
  {
    slug: "amma-nagar",
    name: "Amma Nagar",
    location: "Thavasi, Cheyyar",
    locationSlug: "cheyyar",
    plotSizeSqFt: 2400,
    sizes: "2,400 sq ft",
    priceInLakhs: 5,
    rate: 208,
    status: "available",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
    approval: "DTCP",
    amenities: ["Ready to Construct"],
  },
  {
    slug: "brindavanan-nagar-sengadu",
    name: "Brindavanan Nagar",
    location: "Sengadu",
    locationSlug: "cheyyar",
    plotSizeSqFt: 1200,
    sizes: "1,200 sq ft",
    priceInLakhs: 7.5,
    rate: 625,
    status: "available",
    image: "https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=800&h=600&fit=crop",
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
    name: "Brindavanan Nagar",
    location: "Irungal, Cheyyar Taluk",
    locationSlug: "cheyyar",
    plotSizeSqFt: 1000,
    sizes: "1,000 sq ft",
    priceInLakhs: 7.25,
    rate: 725,
    status: "available",
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop",
    approval: "DTCP",
    amenities: [
      "Ready to Construct",
      "Water Line Available",
      "CCTV",
      "Fully Compounded",
      "24×7 Security",
    ],
  },
];
