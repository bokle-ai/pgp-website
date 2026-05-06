export type ProjectStatus = "available" | "few-left" | "sold-out";

export interface Project {
  slug: string;
  name: string;
  location: string;
  locationSlug: string;
  plotCount: number;
  sizes: string;
  rate: number;
  status: ProjectStatus;
  image: string;
  approval: string;
  amenities: string[];
}

export const projects: Project[] = [
  {
    slug: "pgp-aurum",
    name: "PGP Aurum",
    location: "Maraimalai Nagar",
    locationSlug: "maraimalai-nagar",
    plotCount: 24,
    sizes: "800–1,800 sq ft",
    rate: 1850,
    status: "available",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    approval: "DTCP",
    amenities: ["Gated", "40 ft roads", "UG cables", "Park"],
  },
  {
    slug: "pgp-greens",
    name: "PGP Greens",
    location: "Kundrathur",
    locationSlug: "kundrathur",
    plotCount: 18,
    sizes: "1,000–2,000 sq ft",
    rate: 2200,
    status: "few-left",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    approval: "CMDA",
    amenities: ["Gated", "30 ft roads", "Drainage", "Street lights"],
  },
  {
    slug: "pgp-heritage",
    name: "PGP Heritage",
    location: "East Tambaram",
    locationSlug: "tambaram",
    plotCount: 12,
    sizes: "1,200–2,400 sq ft",
    rate: 3400,
    status: "available",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
    approval: "DTCP",
    amenities: ["Gated", "40 ft roads", "UG cables", "Landscaped park", "CCTV"],
  },
  {
    slug: "pgp-vista",
    name: "PGP Vista",
    location: "Maraimalai Nagar",
    locationSlug: "maraimalai-nagar",
    plotCount: 30,
    sizes: "600–1,500 sq ft",
    rate: 1650,
    status: "available",
    image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&h=600&fit=crop",
    approval: "DTCP",
    amenities: ["Gated", "30 ft roads", "UG drainage", "Park"],
  },
  {
    slug: "pgp-crown",
    name: "PGP Crown",
    location: "West Tambaram",
    locationSlug: "tambaram",
    plotCount: 9,
    sizes: "1,500–3,000 sq ft",
    rate: 3800,
    status: "available",
    image: "https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=800&h=600&fit=crop",
    approval: "CMDA",
    amenities: ["Gated", "40 ft roads", "UG cables", "Clubhouse", "Jogging track"],
  },
  {
    slug: "pgp-nest",
    name: "PGP Nest",
    location: "Kundrathur",
    locationSlug: "kundrathur",
    plotCount: 22,
    sizes: "800–1,600 sq ft",
    rate: 2050,
    status: "sold-out",
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop",
    approval: "DTCP",
    amenities: ["Gated", "30 ft roads", "Drainage", "Park"],
  },
];
