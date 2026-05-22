export interface Location {
  slug: string;
  name: string;
  tagline: string;
  number: string;
  shortDesc: string;
  body: string[];
  stats: {
    activeProjects: number;
    startingPrice: string;
    distanceFromChennai: string;
  };
  image: string;
  mapImage: string;
  imageAlt: string;
}

export const locations: Location[] = [
  {
    slug: "papanthangal",
    name: "Papanthangal",
    tagline: "A quiet village pocket inside Cheyyar.",
    number: "01",
    shortDesc: "Village layout in Cheyyar Taluk with clear titles and ready-to-construct plots.",
    body: [
      "Papanthangal is a village inside Cheyyar Taluk in Tiruvannamalai district — roughly 100 km south-west of Chennai and a short drive from Cheyyar town. The area appeals to families looking for spacious plots, breathing room, and prices that simply aren't available closer to the city.",
      "Our Sulaman Nagar layout here offers 1,200 sq ft plots at ₹9 Lakhs. Ready-to-construct status means you can break ground immediately after registration.",
    ],
    stats: {
      activeProjects: 1,
      startingPrice: "₹9 Lakhs",
      distanceFromChennai: "~100 km",
    },
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=600&fit=crop",
    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=500&fit=crop",
    imageAlt: "Residential plots in Papanthangal, Cheyyar Taluk",
  },
  {
    slug: "perumpallam",
    name: "Perumpallam",
    tagline: "Affordable land, 2 km from Cheyyar town.",
    number: "02",
    shortDesc: "Two active layouts just outside Cheyyar town — accessible prices, flexible sizes.",
    body: [
      "Perumpallam is a village in Cheyyar Taluk, Tiruvannamalai district — about 2 km from Cheyyar town and ~100 km from Chennai. Two of our active projects sit here — Vetrivel Nagar and Valli Murugan Nagar — catering to different budgets, with plot sizes from 600 to 1,150 sq ft.",
      "Both projects are ready to construct, with clear titles and full documentation. Perumpallam's proximity to Cheyyar town and growing road links make it an attractive option for families and first-time investors.",
    ],
    stats: {
      activeProjects: 2,
      startingPrice: "₹4 Lakhs",
      distanceFromChennai: "~100 km",
    },
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop",
    mapImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop",
    imageAlt: "Plots in Perumpallam, Cheyyar Taluk",
  },
  {
    slug: "cheyyar",
    name: "Cheyyar",
    tagline: "Space, security, and peace of mind.",
    number: "03",
    shortDesc: "Three gated layouts in Thavasi, Sengadu, and Irungal — ideal for investment and retirement.",
    body: [
      "Cheyyar town and its surrounding villages — Thavasi, Sengadu, Irungal — sit in Tiruvannamalai district, roughly 100 km south-west of Chennai. Our three layouts here range from 1,000 to 2,400 sq ft, starting at just ₹5 Lakhs.",
      "The Brindavanan Nagar projects (Sengadu and Irungal) come with full amenities: water line, CCTV, a fully compounded perimeter, and 24×7 security. Amma Nagar in Thavasi offers a generous 2,400 sq ft plot at ₹5 Lakhs — exceptional value for families planning a future home.",
    ],
    stats: {
      activeProjects: 3,
      startingPrice: "₹5 Lakhs",
      distanceFromChennai: "~100 km",
    },
    image:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=900&h=600&fit=crop",
    mapImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=500&fit=crop",
    imageAlt: "Open plots in Cheyyar area with compounded layouts",
  },
];
