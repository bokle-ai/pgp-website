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
    slug: "maraimalai-nagar",
    name: "Maraimalai Nagar",
    tagline: "The industrial play.",
    number: "01",
    shortDesc: "Chennai's industrial growth corridor — NH32 / GST Road connected.",
    body: [
      "45 km south of central Chennai, Maraimalai Nagar sits between Sriperumbudur and Oragadam — Chennai's industrial spine. Hyundai, Renault-Nissan, BMW, Daimler, and Foxconn all within 25 km.",
      "We've delivered 6 plotted projects here since 2018. Connectivity via NH32 / GST Road. Land appreciation has tracked 12–18% annually in our active layouts.",
    ],
    stats: {
      activeProjects: 3,
      startingPrice: "₹1,650/sq ft",
      distanceFromChennai: "45 km",
    },
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=600&fit=crop",
    mapImage:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=500&fit=crop",
    imageAlt: "Aerial view of plotted residential layout in Maraimalai Nagar",
  },
  {
    slug: "kundrathur",
    name: "Kundrathur",
    tagline: "The family suburb.",
    number: "02",
    shortDesc: "Peaceful western suburb with IT corridor proximity and strong community roots.",
    body: [
      "Kundrathur is Chennai's emerging family suburb — quiet, green, and 12 km from the Porur IT corridor and DLF Cybercity. CBSE schools, hospitals, and the historic Kundrathur Murugan Temple within 5 km.",
      "As western Chennai expands outward, Kundrathur plots have seen steady appreciation of 10–15% annually. Our PGP Greens and PGP Nest layouts have seen full sellout within 8 months of launch.",
    ],
    stats: {
      activeProjects: 2,
      startingPrice: "₹2,050/sq ft",
      distanceFromChennai: "28 km",
    },
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=900&h=600&fit=crop",
    mapImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop",
    imageAlt: "Green residential plots in Kundrathur with family homes",
  },
  {
    slug: "tambaram",
    name: "Tambaram",
    tagline: "The established address.",
    number: "03",
    shortDesc: "South Chennai's most mature suburb — rail connected, airport adjacent.",
    body: [
      "Tambaram is where southern Chennai is anchored. Suburban rail (MTC + MRTS), Chennai Airport ~15 km, and a dense network of schools, hospitals, and commercial hubs. The most mature market we work in — and the most defensible.",
      "Premium plots here carry a higher entry price (₹3,400–₹3,800/sq ft) but also the strongest demand from NRI buyers and second-home seekers. Our PGP Heritage and PGP Crown projects have a combined waitlist of 40+ families.",
    ],
    stats: {
      activeProjects: 2,
      startingPrice: "₹3,400/sq ft",
      distanceFromChennai: "20 km",
    },
    image:
      "https://images.unsplash.com/photo-1467533003447-e295ff1b0435?w=900&h=600&fit=crop",
    mapImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=500&fit=crop",
    imageAlt: "Established residential area in Tambaram, South Chennai",
  },
];
