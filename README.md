# Prime Golden Properties — Website

Marketing landing page for Prime Golden Properties (PGP), a real estate company operating across Chennai's southern and western outskirts: Maraimalai Nagar, Kundrathur, and Tambaram.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS** with custom PGP brand palette
- **Framer Motion** — hero entrance + scroll reveals
- **shadcn/ui** — Accordion, Sheet, Button primitives
- **react-hook-form + zod** — contact form validation
- **Web3Forms** — form-to-email (no backend required)
- **next/font** — Playfair Display + Montserrat, loaded via Google Fonts with `display: swap`

---

## Running locally

```bash
# 1. Install dependencies
npm install

# 2. Copy env vars
cp .env.example .env.local
# Then edit .env.local and add your Web3Forms key

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import into [Vercel](https://vercel.com) — it detects Next.js automatically.
3. Add environment variable `NEXT_PUBLIC_WEB3FORMS_KEY` in Vercel → Settings → Environment Variables.
4. Deploy. Vercel handles everything else (image optimisation, edge CDN, HTTPS).

### Static export (for shared hosting like Hostinger / GoDaddy)

Add to `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  output: "export",
  // ...existing config
};
```
Then run `npm run build` — the `out/` folder is the deployable static site. Upload its contents to your hosting's `public_html` directory.

> Note: static export disables Server-Side features. The site is fully static by design, so this works fine.

---

## Form setup (Web3Forms)

1. Go to [web3forms.com](https://web3forms.com) and create a free account.
2. Create an access key linked to your email.
3. Set `NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here` in `.env.local` (and in Vercel env vars for production).
4. Form submissions will be emailed to the address you registered.

---

## Swapping placeholder images for real photos

All images are Unsplash placeholders. Replace them by:

1. Put real photos in `public/images/` (e.g. `public/images/projects/aurum.jpg`).
2. Open `lib/data/projects.ts` — update the `image` field for each project:
   ```ts
   image: "/images/projects/aurum.jpg",
   ```
3. Do the same for location images in `lib/data/locations.ts` (`image` and `mapImage` fields).
4. For the hero image, edit `components/hero.tsx` and update the `src` on the `<Image>` tag.

All images are served via `next/image`, which auto-converts to WebP/AVIF and serves the right size per device.

---

## Updating project inventory

Open `lib/data/projects.ts`. Each project is a typed object:

```ts
{
  slug: "pgp-aurum",         // URL slug — used in /projects/[slug]
  name: "PGP Aurum",
  location: "Maraimalai Nagar",
  locationSlug: "maraimalai-nagar", // must match a location in locations.ts
  plotCount: 24,
  sizes: "800–1,800 sq ft",
  rate: 1850,                // in ₹/sq ft — shown as ₹1,850
  status: "available",       // "available" | "few-left" | "sold-out"
  image: "...",
  approval: "DTCP",
  amenities: ["Gated", "40 ft roads", "UG cables", "Park"],
}
```

Add, edit, or remove entries. No component changes needed.

---

## Adding a new location subpage

1. Add an entry to `lib/data/locations.ts` following the existing structure.
2. The `/locations/[slug]` template picks it up automatically via `generateStaticParams`.
3. Add SEO footer links for the new location in `components/footer.tsx` under `locationLinks`.

---

## Key files reference

| File | What to edit |
|---|---|
| `lib/data/site.ts` | Phone, email, RERA number, address, social links |
| `lib/data/projects.ts` | All project inventory |
| `lib/data/locations.ts` | Location details, stats, images |
| `lib/data/testimonials.ts` | Customer testimonials |
| `lib/data/faqs.ts` | FAQ questions and answers |
| `public/logo.png` | Brand logo |
| `app/globals.css` | CSS variables (colors, grain overlay) |
| `tailwind.config.ts` | Tailwind colour + font tokens |
