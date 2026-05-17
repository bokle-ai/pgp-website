# PGP Website — Handoff Guide

A quick-reference for the founder / ops team to maintain the site without touching component code.

---

## Where to update contact details

File: `lib/data/site.ts`

```ts
export const siteConfig = {
  phone: "+91 98765 43210",       // ← Update this
  phonePlain: "9876543210",       // ← Same number, digits only (for tel: links)
  whatsapp: "919876543210",       // ← Country code + number, no + or spaces
  email: "info@primegoldenproperties.in",  // ← Update this
  address: "...",                 // ← Office address
  rera: "TN/01/Building/0123/2024",        // ← RERA registration number
  workingHours: "Mon–Sat: 9 AM – 6 PM  ·  Sunday: 10 AM – 4 PM",
};
```

After editing, run `npm run build` to verify, then deploy.

---

## How to add a new project to inventory

1. Open `lib/data/projects.ts`
2. Copy an existing entry and add it to the array:

```ts
{
  slug: "pgp-sapphire",          // Unique URL slug, lowercase, hyphens only
  name: "PGP Sapphire",
  location: "Maraimalai Nagar",  // Display name
  locationSlug: "maraimalai-nagar", // Must match: "maraimalai-nagar" | "kundrathur" | "tambaram"
  plotCount: 20,
  sizes: "1,000–2,000 sq ft",
  rate: 1950,                    // ₹ per sq ft (number only)
  status: "available",           // "available" | "few-left" | "sold-out"
  image: "/images/projects/sapphire.jpg",  // Put the image in public/images/projects/
  approval: "DTCP",              // "DTCP" or "CMDA"
  amenities: ["Gated", "30 ft roads", "UG drainage"],
},
```

3. Save. The project appears automatically on the homepage grid and `/projects` page.
4. A dedicated detail page at `/projects/pgp-sapphire` is auto-generated.

---

## How to add a new location subpage

1. Open `lib/data/locations.ts`
2. Add a new entry following the existing structure (copy an existing one, update all fields)
3. The page at `/locations/your-slug` is created automatically
4. Optionally add the location to the footer link list in `components/footer.tsx` under `locationLinks`

---

## Where to swap in real photos

### Project photos
- Put photos in `public/images/projects/` (e.g. `pgp-aurum.jpg`)
- Open `lib/data/projects.ts` and update the `image` field: `image: "/images/projects/pgp-aurum.jpg"`

### Location photos
- Open `lib/data/locations.ts`
- Update `image` (the hero/main photo) and `mapImage` (the secondary/map photo) per location

### Hero image
- Open `components/hero.tsx`
- Find the `<Image src="https://images.unsplash.com/...">` tags and replace with local paths

**Image guidelines:** Use JPEG or WebP. Minimum 1200px wide for hero/location images. The site auto-converts and optimises via next/image.

---

## Changing the RERA number

In `lib/data/site.ts`, update `rera: "TN/XX/..."`. It appears automatically in the utility bar, footer bottom strip, and anywhere `siteConfig.rera` is referenced.

---

## Updating testimonials

File: `lib/data/testimonials.ts`

Each testimonial:
```ts
{
  id: "unique-id",
  quote: "The testimonial text (no quotation marks needed — the component adds them).",
  name: "Customer Name",
  project: "PGP Aurum",
  location: "Maraimalai Nagar",
  stars: 5,
  initials: "CN",     // 2-letter initials shown in the avatar circle
},
```

---

## Updating FAQs

File: `lib/data/faqs.ts`

Each FAQ:
```ts
{
  id: "unique-id",
  question: "What is the stamp duty in Tamil Nadu?",
  answer: "Full answer text here. Can be multiple sentences.",
},
```

---

## Form submissions

Form submissions go to the email linked to your Web3Forms account. To change the recipient email:
1. Log in to [web3forms.com](https://web3forms.com)
2. Update the email on your access key, or create a new key for a new email
3. Update `NEXT_PUBLIC_WEB3FORMS_KEY` in your `.env.local` (and in Vercel environment variables)

---

## Quick build & deploy checklist

1. Edit content in `lib/data/` files
2. Run `npm run build` locally — confirm it passes with 0 errors
3. `git add . && git commit -m "Update project inventory"` 
4. `git push` → Vercel auto-deploys in ~90 seconds
