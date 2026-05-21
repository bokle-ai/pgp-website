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
    tagline: "West Chennai's rising address.",
    number: "01",
    shortDesc: "Close to Chennai with excellent road connectivity and growing infrastructure.",
    body: [
      "Papanthangal is a fast-developing locality on Chennai's western edge, well-connected by road to the city centre and major IT corridors including Porur and Vadapalani. Residential demand here has grown steadily as families seek quality land close to the city at accessible prices.",
      "Our Sulaman Nagar layout here offers 1,200 sq ft plots at ₹9 Lakhs — among the most value-packed opportunities in this corridor. Ready-to-construct status means you can break ground immediately after registration.",
    ],
    stats: {
      activeProjects: 1,
      startingPrice: "₹9 Lakhs",
      distanceFromChennai: "15 km",
    },
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=600&fit=crop",
    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=500&fit=crop",
    imageAlt: "Residential plots in Papanthangal, West Chennai",
  },
  {
    slug: "perumpallam",
    name: "Perumpallam",
    tagline: "Affordable land, lasting value.",
    number: "02",
    shortDesc: "Two active layouts offering flexible plot sizes at some of our most accessible prices.",
    body: [
      "Perumpallam is a locality with strong potential for first-time landowners seeking a foothold in Tamil Nadu's real estate market. Two of our active projects here — Vetrivel Nagar and Valli Murugan Nagar — cater to different budgets, with plot sizes from 600 to 1,150 sq ft.",
      "Both projects are ready to construct, with clear titles and full documentation. Perumpallam's improving road links and proximity to key towns make it an attractive option for families and investors alike.",
    ],
    stats: {
      activeProjects: 2,
      startingPrice: "₹4 Lakhs",
      distanceFromChennai: "50 km",
    },
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop",
    mapImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop",
    imageAlt: "Plots in Perumpallam with open land and clear titles",
  },
  {
    slug: "cheyyar",
    name: "Cheyyar",
    tagline: "Space, security, and peace of mind.",
    number: "03",
    shortDesc: "Three gated layouts in Thavasi, Sengadu, and Irungal — ideal for investment and retirement.",
    body: [
      "Cheyyar and its surrounding villages — Thavasi, Sengadu, Irungal — offer spacious plots at some of Tamil Nadu's most accessible prices. Our three layouts here range from 1,000 to 2,400 sq ft, starting at just ₹5 Lakhs.",
      "The Brindavanan Nagar projects (Sengadu and Irungal) come with full amenities: water line, CCTV, a fully compounded perimeter, and 24×7 security. Amma Nagar in Thavasi offers a generous 2,400 sq ft plot at ₹5 Lakhs — exceptional value for families planning a future home.",
    ],
    stats: {
      activeProjects: 3,
      startingPrice: "₹5 Lakhs",
      distanceFromChennai: "100 km",
    },
    image:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=900&h=600&fit=crop",
    mapImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=500&fit=crop",
    imageAlt: "Open plots in Cheyyar area with compounded layouts",
  },
];
