export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  project: string;
  location: string;
  stars: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "karthik-divya",
    quote:
      "We looked at five plot promoters before PGP. The difference was the second site visit — they sent a structural engineer to walk soil with us, no extra charge. Three years later, our home is built, and we still call them when we need anything.",
    name: "Karthik & Divya",
    project: "PGP Aurum",
    location: "Maraimalai Nagar",
    stars: 5,
    initials: "KD",
  },
  {
    id: "ravichandran",
    quote:
      "I'm in Singapore. Bought the plot in Tambaram on a video call. Every doc was emailed before they asked for a rupee. Construction starts next month — they're sending weekly drone footage.",
    name: "Ravichandran S.",
    project: "PGP Heritage",
    location: "Tambaram",
    stars: 5,
    initials: "RS",
  },
  {
    id: "lakshmi",
    quote:
      "Sold my late father's plot in Kundrathur through PGP. They valued it 8% above the local rate, found a buyer in six weeks, and handled the paperwork while I focused on my mother. Worth every percent.",
    name: "Lakshmi A.",
    project: "PGP Nest",
    location: "Kundrathur",
    stars: 5,
    initials: "LA",
  },
];
