export type ProjectStatus = "available" | "few-left" | "sold-out";

export interface ProjectFeature {
  title: string;
  desc: string;
}

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
  statusLine: string;           // the raw "Project Status" line from the brief
  image: string;
  approval: string;             // "DTCP" etc. Empty string = no approval badge.
  description: string[];        // project write-up (paragraphs)
  whyChoose: string[];          // "Why choose" bullet points
  features: ProjectFeature[];   // features & amenities (title + description)
  amenities: string[];          // short chips (derived from features)
}

// Final inventory — 9 projects across the Cheyyar Taluk corridor.
// Content from "PGP Plot Projects — Complete Description Guide".
export const projects: Project[] = [
  {
    slug: "teachers-colony",
    name: "Teachers Colony",
    location: "Papanthangal",
    locationSlug: "papanthangal",
    plotSizeSqFt: 1200,
    sizes: "1,200 sq ft",
    priceInLakhs: 9,
    rate: 750,
    status: "available",
    statusLine: "Ready to Construct",
    image: "/images/brand/project-sulaman-nagar.webp",
    approval: "DTCP",
    description: [
      "Welcome to Teachers Colony, a thoughtfully planned residential plot community located in the growing neighborhood of Papanthangal. Designed for those who seek a secure and peaceful living environment, this layout offers spacious plots ideal for building your dream home. With ready-to-construct status and all essential amenities in place, Teachers Colony is the perfect starting point for families and investors alike.",
      "Whether you are planning to build immediately or looking for a solid long-term investment, Teachers Colony offers the perfect opportunity at an affordable price point with strong future appreciation potential.",
    ],
    whyChoose: [
      "Prime Location – Situated in Papanthangal, a fast-developing residential corridor with excellent connectivity.",
      "Ready to Construct – No waiting period. Start building your dream home right away.",
      "Spacious Plots – 1200 Sq.Ft plots offering ample space for comfortable living.",
      "Strong Appreciation Potential – Growing infrastructure around the area ensures long-term value growth.",
      "Ideal for Families & Investors – Perfect for end users looking to settle and investors seeking returns.",
      "Clear Legal Documents – Hassle-free ownership with transparent documentation.",
    ],
    features: [
      { title: "Blacktop Roads", desc: "Smooth and well-laid internal roads for easy access" },
      { title: "Water Supply", desc: "Reliable water availability within the layout" },
      { title: "Electricity", desc: "Underground electrical connections provided" },
      { title: "Green Surroundings", desc: "Peaceful and pollution-free environment" },
    ],
    amenities: ["Ready to Construct", "Blacktop Roads", "Water Supply", "Electricity"],
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
    statusLine: "Ready to Construct",
    image: "/images/brand/project-vetrivel-nagar.webp",
    approval: "DTCP",
    description: [
      "Welcome to Vetrivel Nagar, a premium residential layout nestled in the serene locality of Perumpallam. This well-planned community is crafted for those who value both tranquility and growth. With plots ready for immediate construction, Vetrivel Nagar offers a rare combination of peaceful surroundings and strong investment potential in one of the region's most promising locations.",
      "Vetrivel Nagar is ideal for families dreaming of a comfortable home and for savvy investors looking to capitalize on the area's rapid development. Secure your plot today and be part of a thriving community.",
    ],
    whyChoose: [
      "Serene Location – Perumpallam offers a calm, pollution-free atmosphere perfect for residential living.",
      "Immediate Construction Ready – Begin building without any delays.",
      "Well-Planned Layout – Thoughtfully designed streets and plots for maximum utility.",
      "High Investment Value – Strong growth corridor ensuring excellent returns over time.",
      "Community Living – Safe and welcoming neighborhood environment.",
      "Transparent Ownership – Clear title deeds and legal documentation assured.",
    ],
    features: [
      { title: "Internal Roads", desc: "Well-laid roads connecting all plots within the layout" },
      { title: "Water Connection", desc: "Water line available within the community" },
      { title: "Drainage System", desc: "Proper drainage infrastructure in place" },
      { title: "Natural Environment", desc: "Lush greenery and fresh air surroundings" },
    ],
    amenities: ["Ready to Construct", "Internal Roads", "Water Connection", "Drainage System"],
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
    statusLine: "Ready to Construct",
    image: "/images/brand/project-valli-murugan-nagar.webp",
    approval: "DTCP",
    description: [
      "Welcome to Valli Murugan Nagar, an affordable yet value-packed residential plot community in Perumpallam. Designed for first-time buyers and budget-conscious investors, this layout provides an excellent entry point into real estate ownership. With compact and efficient plot sizes, Valli Murugan Nagar makes owning land accessible to everyone without compromising on quality or location.",
      "This is your golden opportunity to own a piece of land at an affordable price in a developing locality. Valli Murugan Nagar is perfect for small families, young couples, or anyone taking their first step into real estate.",
    ],
    whyChoose: [
      "Affordable Entry Point – One of the most budget-friendly plot options in the region.",
      "Ready to Build – Plots are fully prepared for immediate construction.",
      "Growing Locality – Perumpallam is witnessing consistent residential and commercial growth.",
      "Ideal for First-Time Buyers – Perfect for those entering the real estate market.",
      "Compact & Efficient – 600 Sq.Ft plots smartly designed for comfortable small homes.",
      "Clear Documentation – Full legal clarity and hassle-free ownership process.",
    ],
    features: [
      { title: "Internal Roads", desc: "Accessible roads within the layout" },
      { title: "Water Access", desc: "Water facility available nearby" },
      { title: "Electricity Lines", desc: "Power connections readily available" },
      { title: "Safe Locality", desc: "Peaceful and secure residential area" },
    ],
    amenities: ["Ready to Construct", "Internal Roads", "Water Access", "Electricity Lines"],
  },
  {
    slug: "brindavanan-nagar-sengathankudi",
    name: "Brindavanan Nagar (Sengathankudi)",
    location: "Sengathankudi",
    locationSlug: "cheyyar",
    plotSizeSqFt: 1200,
    sizes: "1,200 sq ft",
    priceInLakhs: 7.5,
    rate: 625,
    status: "available",
    statusLine: "Available, Ready to Construct, Water Line Available, CCTV, Fully Compounded, 24x7 Security",
    image: "/images/brand/project-brindavanan-sengadu.webp",
    approval: "DTCP",
    description: [
      "Welcome to Brindavanan Nagar, Sengathankudi — a fully secured and feature-rich residential plot community offering the highest standards of gated living. This premium layout is designed for families who prioritize safety, comfort, and quality. With 24x7 security, CCTV surveillance, full compound wall, and water line already in place, Brindavanan Nagar Sengathankudi is truly move-in ready.",
      "Experience the peace of mind that comes with living in a fully compounded, CCTV-monitored community with round-the-clock security. Brindavanan Nagar Sengathankudi is not just a plot — it is a complete secured lifestyle.",
    ],
    whyChoose: [
      "24x7 Security – Round-the-clock security personnel ensuring complete safety.",
      "CCTV Surveillance – Full camera coverage across the entire layout.",
      "Fully Compounded – Complete compound wall for maximum privacy and protection.",
      "Water Line Available – Ready water supply infrastructure already installed.",
      "Ready to Construct – No delays. Start building your dream home immediately.",
      "Premium Lifestyle – All amenities of a gated community at an accessible price.",
    ],
    features: [
      { title: "24x7 Security", desc: "Round-the-clock security for safe and peaceful living" },
      { title: "CCTV Coverage", desc: "Full surveillance system across the layout" },
      { title: "Compound Wall", desc: "Fully compounded boundary for privacy and safety" },
      { title: "Water Line", desc: "Water supply infrastructure already in place" },
    ],
    amenities: ["Ready to Construct", "24x7 Security", "CCTV Coverage", "Fully Compounded", "Water Line"],
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
    statusLine: "Available, Ready to Construct, Water Line Available, CCTV, Fully Compounded, 24x7 Security",
    image: "/images/brand/project-brindavanan-irungal.webp",
    approval: "DTCP",
    description: [
      "Welcome to Brindavanan Nagar, Irungal — a premium gated residential plot community located in the peaceful surroundings of Irungal, Cheyyar Taluk. This thoughtfully developed layout brings together modern security infrastructure and natural tranquility, making it an ideal choice for families seeking a secure and serene lifestyle away from the city rush.",
      "With all essential amenities already established — including water lines, CCTV, full compounding, and 24x7 security — Brindavanan Nagar Irungal offers everything you need for a worry-free life. Secure your plot today and step into a community built for your peace of mind.",
    ],
    whyChoose: [
      "Secure Gated Community – Fully compounded with 24x7 security and CCTV monitoring.",
      "Irungal Location Advantage – Peaceful locality within Cheyyar Taluk with growing connectivity.",
      "Water Infrastructure Ready – Water line already installed and functional.",
      "Ready to Construct – Begin building your home without any waiting period.",
      "Great Investment – Cheyyar Taluk is rapidly developing making this a high-value investment.",
      "Community Safety – Safe environment perfect for families and senior citizens.",
    ],
    features: [
      { title: "24x7 Security", desc: "Dedicated security personnel on duty at all times" },
      { title: "CCTV Monitoring", desc: "Advanced camera surveillance throughout the layout" },
      { title: "Full Compound Wall", desc: "Secured boundary wall enclosing the entire community" },
      { title: "Water Supply", desc: "Functional water line infrastructure ready for use" },
    ],
    amenities: ["Ready to Construct", "24x7 Security", "CCTV Monitoring", "Full Compound Wall", "Water Supply"],
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
    statusLine: "DTCP Approved",
    image: "/images/brand/project-sks-nagar.webp",
    approval: "DTCP",
    description: [
      "Welcome to SKS Nagar, a DTCP approved residential plot layout located in Sengadu, Cheyyar. Government approved and legally clear, SKS Nagar offers complete peace of mind for buyers looking for a safe and verified real estate investment. Situated in the growing locality of Sengadu, this layout is perfectly positioned for both residential development and long-term value appreciation.",
      "SKS Nagar is your assurance of a legally verified, government-approved plot purchase in a rapidly developing location. With DTCP approval in place, your investment is completely secured and future-proof.",
    ],
    whyChoose: [
      "DTCP Approved – Fully government approved layout ensuring complete legal safety.",
      "Sengadu Location – A fast-growing area in Cheyyar with strong development momentum.",
      "Clear Title Deeds – Transparent and hassle-free documentation for buyers.",
      "1200 Sq.Ft Plots – Spacious plots suitable for comfortable residential construction.",
      "Strong Future Value – Cheyyar region is an emerging real estate hotspot.",
      "Trusted Developer – Backed by Prime Golden Properties with 15+ years of experience.",
    ],
    features: [
      { title: "DTCP Approved", desc: "Government certified layout with full legal clearance" },
      { title: "Blacktop Roads", desc: "Well-laid internal roads for smooth access" },
      { title: "Clear Documents", desc: "Transparent title deeds and ownership papers" },
      { title: "Developing Location", desc: "Sengadu is witnessing rapid residential growth" },
    ],
    amenities: ["DTCP Approved", "Blacktop Roads", "Clear Documents"],
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
    statusLine: "Blacktop Road, Main City Road in Town",
    image: "/images/brand/project-mahalakshmi-nagar.webp",
    approval: "",
    description: [
      "Welcome to Mahalakshmi Nagar, a prestigious residential plot community located right in the heart of Cheyyar Town. With direct access to the main city road and premium blacktop roads within the layout, Mahalakshmi Nagar offers unmatched connectivity and urban convenience. This is your rare opportunity to own a plot in the most sought-after location within Cheyyar — the town center itself.",
      "Owning a plot in Mahalakshmi Nagar means owning a piece of Cheyyar Town's prime real estate. With city-level connectivity, blacktop roads, and a prestigious town center address, this is both a lifestyle upgrade and a powerful investment.",
    ],
    whyChoose: [
      "Prime Town Center Location – Situated directly on the main city road of Cheyyar Town.",
      "Blacktop Roads – Premium quality internal roads for smooth and comfortable access.",
      "Maximum Connectivity – Walking distance to markets, schools, hospitals, and transport.",
      "High Appreciation Value – Town center plots are among the fastest appreciating assets.",
      "Prestigious Address – Own a plot in the heart of Cheyyar with a landmark location.",
      "Ideal for Commercial or Residential Use – Flexible usage options due to prime location.",
    ],
    features: [
      { title: "Main Road Access", desc: "Direct frontage on Cheyyar Town's main city road" },
      { title: "Blacktop Roads", desc: "Premium quality smooth roads within the layout" },
      { title: "Urban Connectivity", desc: "Walking distance to all city essentials" },
      { title: "Prime Address", desc: "Most coveted location within Cheyyar Town" },
    ],
    amenities: ["Blacktop Road", "Main City Road", "Urban Connectivity"],
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
    statusLine: "Fully Surrendered by Owner, Blacktop Road",
    image: "/images/brand/project-arunachalam-nagar.webp",
    approval: "",
    description: [
      "Welcome to Arunachalam Nagar, a residential plot community located in the peaceful and well-connected locality of Puliyarambakkam, Cheyyar. This layout comes with the unique advantage of being fully surrendered by the owner — ensuring complete and undisputed ownership transfer to buyers. With blacktop roads already in place, Arunachalam Nagar is ready to welcome you home.",
      "Arunachalam Nagar stands out for its complete ownership clarity and infrastructure readiness. Fully surrendered by the original owner and equipped with quality blacktop roads, this is one of the most trustworthy investment options in the Cheyyar region.",
    ],
    whyChoose: [
      "Fully Owner Surrendered – Complete legal transfer with zero ownership disputes.",
      "Blacktop Roads – Quality internal roads already constructed and functional.",
      "Puliyarambakkam Location – A serene and well-connected locality near Cheyyar.",
      "Undisputed Ownership – Clean title deeds for complete buyer confidence.",
      "Ready Infrastructure – Roads and basic amenities already in place.",
      "Peaceful Surroundings – Ideal for families seeking a calm residential environment.",
    ],
    features: [
      { title: "Blacktop Roads", desc: "Fully laid quality blacktop roads within the layout" },
      { title: "Clear Ownership", desc: "Fully surrendered by owner — zero legal disputes" },
      { title: "Peaceful Location", desc: "Serene residential atmosphere in Puliyarambakkam" },
      { title: "Easy Access", desc: "Well-connected to Cheyyar main roads and highways" },
    ],
    amenities: ["Blacktop Road", "Clear Ownership", "Peaceful Location"],
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
    statusLine: "Blacktop Road, DTCP Approved",
    image: "/images/brand/project-rich-india.webp",
    approval: "DTCP",
    description: [
      "Welcome to Rich India, a DTCP approved premium residential plot layout located in Meranam, Cheyyar. Combining government approval with quality blacktop road infrastructure, Rich India offers a complete and secure real estate investment in one of Cheyyar's developing localities. Designed for those who want the assurance of legal clarity and the comfort of ready infrastructure, Rich India is your ideal destination.",
      "Rich India lives up to its name by offering a wealth of advantages — from DTCP government approval to smooth blacktop roads and a prime location in Meranam, Cheyyar. This is where smart investors and aspiring homeowners come together.",
    ],
    whyChoose: [
      "DTCP Approved – Government certified layout ensuring complete legal protection.",
      "Blacktop Roads – Smooth and durable internal roads already in place.",
      "Meranam Location – A developing locality in Cheyyar with strong growth prospects.",
      "Legal Security – Full government approval means zero risk for buyers.",
      "Infrastructure Ready – Roads and essential connections already established.",
      "Prime Investment – Cheyyar's growing real estate market makes this a high-value buy.",
    ],
    features: [
      { title: "DTCP Approved", desc: "Fully government approved and legally certified layout" },
      { title: "Blacktop Roads", desc: "Premium internal roads for smooth and easy access" },
      { title: "Meranam Location", desc: "Growing locality with excellent future potential" },
      { title: "Legal Clarity", desc: "Clear documents and transparent ownership process" },
    ],
    amenities: ["DTCP Approved", "Blacktop Roads", "Legal Clarity"],
  },
];
