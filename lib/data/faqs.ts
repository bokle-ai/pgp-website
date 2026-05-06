export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "dtcp-cmda",
    question: "What's the difference between DTCP and CMDA approval?",
    answer:
      "DTCP (Directorate of Town and Country Planning) approval applies to plots in areas outside the Chennai Metropolitan Area — typically in districts like Kancheepuram and Chengalpattu, which includes Maraimalai Nagar and Kundrathur. CMDA (Chennai Metropolitan Development Authority) approval applies to layouts within the CMA. Both are valid government approvals that ensure the layout meets legal subdivision norms. All PGP projects carry one or the other — we verify and share the approval documents before any booking.",
  },
  {
    id: "stamp-duty",
    question: "What are the stamp duty and registration charges in Tamil Nadu?",
    answer:
      "In Tamil Nadu, stamp duty is 7% of the property's guideline value (the government's assessed value, which may differ from the market price). Registration charges are an additional 4%. A local surcharge (cess) of 10% on stamp duty may also apply in some panchayat areas, adding roughly 0.7%. We calculate the exact registration cost for each plot and include it in your pre-booking cost sheet — no surprises on registration day.",
  },
  {
    id: "home-loan",
    question: "Can I get a home loan on these plots?",
    answer:
      "Yes, DTCP and CMDA approved plots are eligible for plot purchase loans from most nationalised and private banks, including SBI, HDFC, ICICI, and Axis. Loan-to-value is typically 70–75% of the guideline value for plot loans, with tenures up to 15 years. If you're also constructing, a composite plot + construction loan is available. We work with tie-up DSAs at SBI and HDFC who can pre-process your application before your site visit.",
  },
  {
    id: "construction",
    question: "Do you handle construction if I buy a plot from you?",
    answer:
      "Yes, and this is a core differentiator. PGP's construction division handles end-to-end turnkey home construction on any plot you purchase from us, at fixed per-sq-ft rates (Standard ₹1,850, Premium ₹2,450, Luxury ₹3,200). We also take construction projects on plots purchased elsewhere — subject to a site inspection. The same team that sells you the plot manages the construction, so there's continuity on legal and site knowledge.",
  },
  {
    id: "documents",
    question: "What documents do I need to verify before buying?",
    answer:
      "The essential chain: parent document (original sale deed tracing title back at least 30 years), encumbrance certificate (EC) from sub-registrar's office for the full chain period, patta (ownership record), DTCP/CMDA approval copy, layout plan with plot number, and the approved survey sketch. PGP prepares a full due diligence folder for every project and shares it before any advance is collected. We also recommend appointing your own advocate — we can refer one if needed.",
  },
  {
    id: "resale",
    question: "How does PGP help with reselling later?",
    answer:
      "If you purchased a plot from any PGP layout, you get lifetime listing access — we market your resale to our active buyer network at a flat 1.5% commission (below the 2–2.5% market rate). We handle valuation, buyer verification, and all documentation. For plots not originally from PGP, we offer the same service at 2% commission. We've completed 85+ resale transactions since 2020.",
  },
  {
    id: "nri",
    question: "Are NRIs welcome? What's the documentation process?",
    answer:
      "Yes, NRIs can purchase residential plots in India under FEMA regulations (no RBI permission needed for residential plots). Documents required: OCI/PIO card or valid Indian passport, overseas address proof, and PAN card (or Form 60 if PAN isn't available). Payment must route through NRE/NRO account. We handle site visits virtually (video walkthrough + drone footage), send all documents digitally for e-signature where permitted, and coordinate with a local advocate for the physical registration. We have 30+ NRI buyers currently and can connect you with a CA familiar with repatriation rules.",
  },
  {
    id: "built-up-carpet",
    question: "What's the difference between built-up area and carpet area?",
    answer:
      "Carpet area is the actual usable floor space inside the walls — where you'd lay carpet. Built-up area includes carpet area plus the thickness of all walls (typically adding 10–15%). Super built-up area (common in apartments) further includes proportional common areas like lobbies and staircases — this doesn't apply to independent home construction. For PGP construction quotes, we price on built-up area, which is clearly defined in the agreement. We provide a room-by-room floor plan with dimensions before you sign.",
  },
];
