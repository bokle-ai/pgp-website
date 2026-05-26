# Prime Golden Properties — Brand & Image Guide

> A living guard-rail for everything visual on the PGP site. Read **§1–§3 before writing any prompt**; use **§4 templates** for every individual image; drop generated files into **§5 paths** so the site picks them up automatically.

---

## 1 · Brand identity in one breath

**What we are:** A 12-year-old, family-run Tamil real-estate house. We sell **DTCP-approved plots, turnkey construction, and trusted resale** in **Cheyyar Taluk** — a quiet farming-village pocket of Tiruvannamalai district, ~100 km south-west of Chennai. 310+ families have bought from us since 2013.

**Brand voice:**
- Quietly confident. We don't shout. We don't dress up.
- Long-form trust beats hype. Heritage > novelty.
- "Land that turns into legacy." That's the whole thesis.
- We say *plot*, not *property asset*. We say *family*, not *customer*.

**Audiences:** Salaried Tamilians in Chennai (35-55), NRIs, retirees, first-time landowners. They want low-risk, clear-title, near-the-city land they can drive to on a Saturday.

### 1.1 · Colour palette (use these exact hexes — no hue drift)

| Role | Hex | Notes |
|---|---|---|
| **Deep Green** (primary surface) | `#0F3D2E` | Hero, dark sections, footer. Calm, premium. |
| **Cream** (paper) | `#F8F5EF` | Cards, light sections, nav bar background. |
| **Gold** (accent) | `#D4A017` | CTAs, highlights, eyebrows, gold rim lines. |
| Gold-soft | `#F2C75C` | Gradient stops, hover glow. |
| Gold-glow | `#FFD580` | Sun highlights, light flecks. |
| Ink (text-on-cream) | `#1A1A1A` | Headlines on light bg. |
| Ink-mute | `#4D5D55` | Body copy on light bg. |
| Line | `#E5DDD0` | Hairline borders on cream. |

**Ratio rule:** ~60 % surface (cream or deep green) · ~30 % secondary (ink/inkMute on cream, cream on deep green) · ~10 % gold accent. Gold is a spice, never the wallpaper.

### 1.2 · Type

- **Display / headlines:** *Playfair Display* — italic for the emotional word (e.g. *legacy*, *quiet pocket*). Weight 500–600. Letter-spacing tight (`-0.02em`).
- **Body / UI:** *Montserrat* — 400 for paragraphs, 500 for buttons, 600 for emphasis, **700 for uppercase eyebrows + price tags**.
- **Eyebrows / micro-labels:** Montserrat 700, ALL CAPS, letter-spacing `0.18–0.24em`, gold.
- **No third font ever.** No Roboto, no Inter, no Lato.

### 1.3 · Logo

Use the existing transparent PNG (`/public/logo.png`). It already contains the pin + "PRIME GOLDEN" + "PROPERTIES" wordmark + the tagline "Right Location. Right Decision."

- On **cream surfaces**: drop the logo straight in, no tile.
- On **deep-green surfaces**: wrap in a cream rounded tile so the green elements inside the logo don't disappear.
- **Never** add a synthetic "Prime Golden Properties" text label next to it. The lockup includes its own wordmark — duplicating with Playfair / Montserrat looks broken.

---

## 2 · Photography & illustration principles

We are pivoting **off stock photography** because:
- AI-generated stock has tell-tale tiny garbled signage and 8-fingered hands.
- Unsplash family-with-keys shots scream "generic SaaS site."
- We sell *Tamil village land*. Our visuals should feel like that, not Pinterest USA.

### 2.1 · The PGP photographic look

| Attribute | Direction |
|---|---|
| **Format** | 35 mm photographic realism. Shot on a full-frame DSLR-style render — *not* HDR, *not* fashion-magazine smooth. |
| **Time of day** | Always golden hour (1 hr before sunset) or just-after-dawn. Long warm shadows. Sky has gradient. |
| **Colour grade** | Warm sienna/amber midtones, slightly cool shadows. Black point lifted (cinematic). Slight haze in distance. |
| **Lighting** | Soft sun rim on edges of buildings/people; long shadows pointing toward camera; no harsh on-camera flash. |
| **Composition** | Wide establishing shots, low horizon (sky takes 40-60 % of frame). For detail shots: tight 50 mm equivalents at f/2.8 with smooth bokeh. |
| **People** | Real **South Indian families** — saree-clad grandmothers, men in formal shirts, kids in school uniforms. Not models. Caught mid-gesture (pointing at land, signing papers, looking out at horizon). Faces not always visible. |
| **Land** | Rural Tamil Nadu — open red-earth plots with white survey markers, palm-tree silhouettes on horizon, distant Eastern Ghats, scattered banana trees, dry tropical scrub. **NOT** lush English green lawns. **NOT** desert. |
| **Architecture** | Tamil vernacular: terracotta tiled roofs, lime-washed walls, modest 2-storey homes, traditional verandah. **NOT** glass towers or modernist white cubes. |
| **Detail props** | Brass key, A4 sale-deed with red wax seal, government patta document, hands holding red soil, theodolite/survey instrument, hand-drawn site plan on cream paper. |

### 2.2 · Anti-patterns — reject any image with these

- Tiny garbled text in signage, books, computer screens (AI giveaway #1).
- Western corporate headshot lighting (flat key + softbox fill).
- Models smiling directly at camera with porcelain teeth.
- Picture-frame house shots — sterile, magazine-perfect lawns.
- Glass skyscrapers, escalators, infinity pools.
- "Genericness" — three diverse colleagues high-fiving over a laptop.
- Watermarks, logos, signatures inside the frame.
- Plastic-looking skin or "smoothed" hands.
- More than one obvious styling cliché per image (you can have a key OR a contract, not key + contract + keys-on-tray + smile).
- Wrong palette — pastel pinks, electric blues, neon, anything that fights gold + deep green.

---

## 3 · Image library — what the site needs

### Conventions
- Save files to **`/public/images/brand/`** with the **exact filenames listed**.
- Dimensions are minimums; render at 2× resolution and the Next.js `<Image>` component will downscale.
- Format: **WebP preferred** (smaller). PNG/JPG fine. **No GIF, no SVG for photos.**

### 3.1 · Hero collage (3 images)

The hero carries the brand. These must be the strongest 3 images on the site.

| # | Filename | Dimensions | What it shows |
|---|---|---|---|
| H-1 | `hero-aerial-plots.webp` | 1400 × 1750 | Aerial drone view of a freshly-plotted DTCP layout in rural Tamil Nadu, red-earth soil, white survey markers in a grid, a single tar approach road, palm trees on the boundary, golden-hour shadows. |
| H-2 | `hero-family-handover.webp` | 800 × 800 | A multigenerational South Indian family standing on their newly-bought plot — mother in saree pointing at horizon, father holding rolled sale deed, two children running ahead. Shot from behind/three-quarter, faces partial. |
| H-3 | `hero-survey-detail.webp` | 560 × 800 | Top-down close-up of a hand-drawn DTCP site plan on cream paper, with a brass theodolite/compass, a folded patta document, and a single brass key resting on it. Warm desk-light, deep shadows. |

### 3.2 · Offering-card images (3)

These sit at the top of each "what we do" card.

| # | Filename | Dimensions | What it shows |
|---|---|---|---|
| O-1 | `offering-plots.webp` | 1600 × 1000 | Ground-level wide shot of a flat red-earth plot with white survey corners, a 'DTCP APPROVED' wooden signboard half-visible, palm grove behind, dawn sky. |
| O-2 | `offering-construction.webp` | 1600 × 1000 | Mid-construction of a 2-storey Tamil home — RCC frame up, masons laying terracotta-coloured tiles on the roof, scaffolding, golden hour. Not a finished mansion. |
| O-3 | `offering-resale.webp` | 1600 × 1000 | Two pairs of hands meeting across a wooden desk — one handing over a brass key + folder, the other receiving. Faces cropped out. Warm lamp light. |

### 3.3 · Project-card images (6)

One per project. Treat them as portraits of the specific village/locality.

| # | Filename | Dimensions | Project · Locality |
|---|---|---|---|
| P-1 | `project-sulaman-nagar.webp` | 1200 × 900 | **Sulaman Nagar**, Papanthangal — neat plotted layout with white compound walls, a single coconut tree at the corner, dirt internal roads, dawn light. |
| P-2 | `project-vetrivel-nagar.webp` | 1200 × 900 | **Vetrivel Nagar**, Perumpallam — slightly larger plotted layout, banana trees along one edge, a small water-tank tower in the distance, golden hour. |
| P-3 | `project-valli-murugan-nagar.webp` | 1200 × 900 | **Valli Murugan Nagar**, Perumpallam — compact small-plot layout (600 sq ft units), red-earth ground, neat hedge boundaries, mid-morning. |
| P-4 | `project-amma-nagar.webp` | 1200 × 900 | **Amma Nagar**, Thavasi (Cheyyar) — spacious 2,400 sq ft plots, low-cost lime-washed marker stones, scattered tamarind trees, very dry tropical look. |
| P-5 | `project-brindavanan-sengadu.webp` | 1200 × 900 | **Brindavanan Nagar**, Sengadu — fully compounded layout with continuous boundary wall, CCTV pole, gated entry arch in the distance, dusk. |
| P-6 | `project-brindavanan-irungal.webp` | 1200 × 900 | **Brindavanan Nagar**, Irungal — similar gated layout, water-line trench visible along the road, palm trees, golden hour, slight haze. |

### 3.4 · Location / corridor images (3)

These sit on each `/locations/[slug]` page.

| # | Filename | Dimensions | Corridor |
|---|---|---|---|
| L-1 | `location-papanthangal.webp` | 1800 × 1200 | A village road in **Papanthangal** — single tar lane, a small wayside temple with a kolam, bicycles parked against a wall, distant Eastern Ghats. |
| L-2 | `location-perumpallam.webp` | 1800 × 1200 | **Perumpallam** village pond at golden hour with one banyan tree, reflections, a couple of women carrying brass water-pots, far houses with tiled roofs. |
| L-3 | `location-cheyyar.webp` | 1800 × 1200 | **Cheyyar town** edge — the Cheyyar river crossing, a small bridge, paddy field foreground, brick-and-tile homes background, classic Tamil rural panorama. |

### 3.5 · Testimonial avatar fallbacks (optional, 3-6)

| # | Filename | Dimensions | Use |
|---|---|---|---|
| T-1..T-6 | `avatar-{name-slug}.webp` | 400 × 400 | Square portrait, three-quarter framing, warm light, **face out of frame OR softly blurred**. The point is to avoid AI-face uncanny valley. Use a hand-on-doorframe / hand-holding-key shot as a substitute. |

---

## 4 · Prompt templates (use these verbatim with ChatGPT / Midjourney / DALL-E / Gemini)

### 4.1 · The master pre-prompt (paste this BEFORE every single image prompt)

> **Photographic realism. Shot on a Sony A7 IV with a 35 mm prime, golden hour, soft warm sienna light, cinematic colour grade (warm midtones, slightly lifted blacks, faint haze in the distance). Location: rural Tamil Nadu, India. Architecture and landscape should be authentic to Tiruvannamalai district — red-earth ground, scattered palms, tamarind trees, terracotta-tiled lime-washed homes, distant Eastern Ghats. Composition: low horizon, generous sky, rule-of-thirds. Skin tones natural and warm. No on-camera flash. No HDR. No tilt-shift. No fisheye. No watermarks, signage text, captions, or any text overlay anywhere in the image. Faces of people, if shown, should be partially out-of-frame, in profile, or softly defocused — never a direct smile to camera. Palette must harmonise with deep emerald green #0F3D2E, cream #F8F5EF, and warm gold #D4A017.**

### 4.2 · Universal negative prompt (paste at the end of every prompt)

> `--negative` watermark, signature, text overlay, garbled letters, AI artifact, extra fingers, deformed hand, glossy CGI render, plastic skin, model headshot smile, glass skyscraper, infinity pool, neon, pastel pink, pastel blue, cluttered foreground, dust spots, lens flare logos, Western suburban lawn, modernist white cube architecture, oversaturated grass green.

### 4.3 · Individual image prompts

#### H-1 · Hero aerial plotted layout
> `[master pre-prompt]` Aerial drone view, ~80 m altitude, looking straight down at a freshly-plotted DTCP residential layout in rural Tamil Nadu. Visible: a neat grid of red-earth plots separated by white survey-stake markers, a single newly-laid tar road bisecting the layout, three or four palm trees clustered at one corner, a dirt approach track meeting the main road in the far corner. Golden-hour soft shadows cast long across the soil. No buildings yet — just the imagined future. Aspect ratio 4:5. `[negative prompt]`

#### H-2 · Hero family on their plot
> `[master pre-prompt]` Multigenerational South Indian family of four standing on their newly-bought plot of land in rural Tamil Nadu. Saree-clad grandmother (60s) and mother (35) in cream and emerald sarees, a father (40) in a crisp formal full-sleeve shirt holding a rolled sale-deed document with a red ribbon, a young child running ahead pointing at the horizon. Shot from three-quarter behind so faces are profile or partial. Golden hour, long warm shadows pointing toward camera, vast open red-earth plot with palms in distance. Square aspect ratio. `[negative prompt]`

#### H-3 · Hero survey desk detail
> `[master pre-prompt]` Top-down flat-lay close-up on a warm wooden desk at golden hour. On the desk: a hand-drawn DTCP layout plan on cream paper showing plotted rectangles with hand-inked dimensions, a brass-bodied surveyor's theodolite/compass to one side, a folded government patta document with a faintly visible red wax seal, a single antique brass key resting on the paper. Warm desk-lamp light, deep shadows. Aspect ratio 7:10 portrait. `[negative prompt]`

#### O-1 · Plots offering
> `[master pre-prompt]` Ground-level wide shot looking across a flat red-earth plotted layout in rural Tamil Nadu at dawn. White wooden survey-stake markers stand at each corner. A simple unpainted wooden signboard reads "DTCP" partially visible at the side (only the letters DTCP, no other text). A palm grove silhouetted behind. Light pink-gold dawn sky with thin cloud bands. Aspect ratio 16:10. `[negative prompt]`

#### O-2 · Construction offering
> `[master pre-prompt]` Mid-construction shot of a modest 2-storey Tamil family home at golden hour. RCC frame is up, ground floor is built and lime-washed, masons in lungis are laying terracotta-coloured Mangalore tiles on the sloping roof. Bamboo scaffolding visible on one side. Sunlight catching the rim of the unfinished structure. Background: scattered palms, distant low hills. Aspect ratio 16:10. `[negative prompt]`

#### O-3 · Resale offering
> `[master pre-prompt]` Two pairs of South Indian male hands meeting over a warm wooden desk under a soft lamp. One hand is sliding over a brass key and a manila folder with a red ribbon; the other hand reaches to receive. Faces are completely out of frame. Detail of crisp shirt cuffs. Slight bokeh of a window with golden afternoon light behind. Aspect ratio 16:10. `[negative prompt]`

#### P-1 · Sulaman Nagar
> `[master pre-prompt]` Wide shot of a neatly plotted residential layout named "Sulaman Nagar" in Papanthangal village, Cheyyar Taluk. Internal dirt roads in a grid, white compound walls being built on a few plots, one tall coconut tree at the far corner. Soft dawn light, the sky a pale rose-gold. No signage text visible. Aspect ratio 4:3. `[negative prompt]`

#### P-2 · Vetrivel Nagar
> `[master pre-prompt]` Wide shot of a residential plotted layout in Perumpallam village, golden hour. Banana plantation forms the left boundary, a small concrete water-tank tower stands in the far distance, internal red-earth roads, white survey stones at each plot corner. No people. Aspect ratio 4:3. `[negative prompt]`

#### P-3 · Valli Murugan Nagar
> `[master pre-prompt]` Compact small-plot residential layout, plots roughly 600 square feet each, in Perumpallam village. Mid-morning warm light. Plots delineated by neat low hedge boundaries. Red-earth ground. A single child's bicycle leaning against one boundary stone — no child visible. Aspect ratio 4:3. `[negative prompt]`

#### P-4 · Amma Nagar
> `[master pre-prompt]` Spacious 2,400 sq ft residential plots in Thavasi village (Cheyyar Taluk), very dry tropical Tamil Nadu landscape. Low lime-washed marker stones at each plot corner. Scattered ancient tamarind trees casting dappled shade. Distant low hills. Late-afternoon amber light. Aspect ratio 4:3. `[negative prompt]`

#### P-5 · Brindavanan Nagar (Sengadu)
> `[master pre-prompt]` Fully gated and compounded residential layout in Sengadu village. A continuous painted compound wall runs around the entire layout. A simple gated archway entry visible in the distance with a CCTV pole nearby. Internal road newly laid. Dusk, gold-purple sky. No signage text. Aspect ratio 4:3. `[negative prompt]`

#### P-6 · Brindavanan Nagar (Irungal)
> `[master pre-prompt]` Plotted layout in Irungal village with a freshly dug water-line trench visible along the internal road, palm trees scattered through the layout, golden hour, slight atmospheric haze. The boundary wall is half-built on one side. Aspect ratio 4:3. `[negative prompt]`

#### L-1 · Papanthangal village
> `[master pre-prompt]` Wide eye-level shot of a Papanthangal village road. Single tar lane, a small whitewashed wayside Shiva temple with a fresh kolam drawn on the threshold, two bicycles leaning against the temple wall, distant Eastern Ghats mountains forming the horizon. Golden hour. No people visible, very quiet. Aspect ratio 3:2. `[negative prompt]`

#### L-2 · Perumpallam village pond
> `[master pre-prompt]` A village pond in Perumpallam at golden hour. A single huge banyan tree on the far bank with sun rays through its branches reflecting on the still water. Two women in colourful sarees carrying brass water pots silhouetted on the bank, walking away from camera. Terracotta-tiled village houses in the far background. Aspect ratio 3:2. `[negative prompt]`

#### L-3 · Cheyyar town edge
> `[master pre-prompt]` Wide rural Tamil Nadu panorama looking across paddy fields toward Cheyyar town. The Cheyyar river runs across the mid-ground, crossed by a small low road-bridge. In the background, a cluster of brick-and-tile homes with the silhouette of a small Hindu temple gopuram rising above. Late afternoon golden light. Aspect ratio 3:2. `[negative prompt]`

---

## 5 · Workflow — drop & ship

1. **Generate** the images using ChatGPT (DALL-E), Midjourney, Gemini, or Firefly. Always:
   - Paste **§4.1 master pre-prompt** FIRST, then the **specific prompt from §4.3**, then **§4.2 negative prompt** at the end.
   - Generate at the **highest resolution** the tool offers (2× the dimension in §3 is ideal).
2. **Convert** to WebP if not already (squoosh.app does this in-browser, free).
3. **Save** with the exact filename from §3 (e.g. `hero-aerial-plots.webp`) into:
   ```
   public/images/brand/
   ```
4. **Tell me** which images you've dropped and I'll wire them into the codebase, replacing the Unsplash URLs (20 references currently).
5. We'll keep a running checklist of "shot" vs "open" in this doc so we always know where we stand.

---

## 6 · Hard guard-rails for future visual decisions

When in doubt, ask:

| Question | If "no" → don't ship it |
|---|---|
| Does it look like rural Tamil Nadu, not Pinterest USA? | |
| Are the warm-gold and emerald-green still the dominant duo? | |
| Is there any garbled text or AI watermark anywhere in the frame? | If yes → don't ship |
| Could a real PGP customer point at this and say "yes, that's our area"? | |
| Did we resist the urge to put a smiling model in business attire? | |
| Is the lighting golden hour or just-after-dawn, not midday-flat? | |

---

*Last updated by the design pass on PGP — keep this doc current as we replace stock with real imagery.*
