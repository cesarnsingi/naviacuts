# Na Via Cuts — Website 🌐

> **Landing page for the Na Via Cuts barbershop app**
> Built with Next.js 14 · TypeScript · Tailwind CSS
> Minimalist dark theme · Bilingual PT/EN · App Store download focused

---

## Live Preview

```
naвiacuts.ao  (or any custom domain you connect)
```

The site has one goal: **get visitors to download the mobile app.**
Every section leads to an App Store or Google Play badge.

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Fonts | Bebas Neue (display) + DM Sans (body) via Google Fonts |
| Store Badges | Inline SVG — official Apple & Google paths, no external images |
| Animations | CSS keyframes + Intersection Observer scroll reveals |
| Deploy | Vercel (recommended) — zero config |

---

## Project Structure

```
na-via-website/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind base, grain overlay, shimmer text,
│   │   │                        #   scroll reveal classes, store badge pulse ring
│   │   ├── layout.tsx           # Root layout — SEO metadata, Open Graph,
│   │   │                        #   viewport, Google Fonts link
│   │   └── page.tsx             # Single page — mounts all sections,
│   │                            #   runs Intersection Observer for reveals
│   └── components/
│       ├── Navbar.tsx           # Sticky top bar — logo, nav links,
│       │                        #   PT/EN language toggle, App Store badge CTA
│       ├── Hero.tsx             # Full-viewport hero — headline, subtext,
│       │                        #   App Store + Google Play badges, phone mockup,
│       │                        #   social proof (ratings + avatar stack)
│       ├── AppPreview.tsx       # 3 phone screens — Home / Book / Explore
│       │                        #   showing the actual app UI
│       ├── Features.tsx         # 6 feature cards in a glass-morphism grid
│       ├── Barbers.tsx          # 4 barber profile cards with ratings & badges
│       ├── HowItWorks.tsx       # 3-step flow with connector line
│       ├── Download.tsx         # Final CTA — headline + both store badges + stats
│       ├── Footer.tsx           # Links, legal, mini download CTA
│       └── StoreBadge.tsx       # ★ Official Apple & Google Play SVG badges
│                                #   sizes: sm | md | lg
├── tailwind.config.ts           # Brand tokens — gold palette, ink backgrounds,
│                                #   custom animations (shimmer, float, scan-line…)
├── postcss.config.js
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### 1. Install

```bash
cd na-via-website
npm install
```

### 2. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

### 3. Type check

```bash
npm run type-check
```

### 4. Production build

```bash
npm run build
npm run start
```

---

## Deploy to Vercel (Recommended)

### Option A — Drag & Drop (fastest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag the `na-via-website` folder into the browser
3. Vercel detects Next.js automatically — click **Deploy**
4. You get a free `*.vercel.app` URL in ~60 seconds

### Option B — CLI

```bash
npm install -g vercel
cd na-via-website
vercel --prod
```

### Option C — GitHub (best for ongoing updates)

1. Push the project to a GitHub repo
2. Connect the repo at [vercel.com/new](https://vercel.com/new)
3. Every `git push` auto-deploys

---

## Connect Your Custom Domain

1. In the Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `naвiacuts.ao` or `naвiacuts.com`)
3. Vercel shows you two DNS records to add at your registrar:
   - `A` record pointing to `76.76.21.21`
   - `CNAME` for `www` pointing to `cname.vercel-dns.com`
4. Wait 5–30 minutes for DNS propagation
5. SSL certificate is issued automatically — free

---

## Add Your Real App Store URLs

Once your apps are approved and live, open `src/components/StoreBadge.tsx`
and replace the `href` values:

```tsx
// Line ~16 — iOS
href="https://apps.apple.com/ao/app/na-via-cuts/id YOUR_APP_STORE_ID"

// Line ~65 — Android  
href="https://play.google.com/store/apps/details?id=com.naвiacuts.app"
```

That's the only change needed. Both badges are already using the
**official Apple and Google SVG logos** — no emoji, no external images.

---

## Customisation

### Update app store URLs

See section above — only one file to edit: `StoreBadge.tsx`.

### Change barbers or services

Edit the arrays at the top of `Barbers.tsx` and `Features.tsx`.
No other files need to change.

### Add a third language

In `Navbar.tsx`, extend the `copy` object and the language toggle:

```tsx
const copy = {
  pt: { nav: [...], cta: "Descarregar App" },
  en: { nav: [...], cta: "Download App"   },
  fr: { nav: [...], cta: "Télécharger"    },  // ← add
};
```

Then add `"fr"` to the toggle button list.

### Change the gold accent colour

In `tailwind.config.ts`, update the `gold` token:

```ts
colors: {
  gold:       "#c9a84c",   // ← change this
  "gold-light": "#e8c97a", // ← and this (hover state)
}
```

The colour propagates everywhere automatically.

### Update SEO metadata

Edit `src/app/layout.tsx` — the `metadata` export:

```ts
export const metadata: Metadata = {
  title:       "Na Via Cuts · Barbearia em Luanda",
  description: "...",
  openGraph: {
    title:       "...",
    description: "...",
  },
};
```

Add your real `metadataBase` URL once you have a domain:

```ts
metadataBase: new URL("https://naвiacuts.ao"),
```

### Replace the privacy / terms links

In `Footer.tsx`, update the `href` values on the legal links:

```tsx
<a href="/privacy">Privacidade</a>
<a href="/terms">Termos</a>
<a href="mailto:hello@naвiacuts.ao">Contacto</a>
```

---

## SEO & Performance Notes

- All fonts load via `<link>` in `layout.tsx` with `display=swap` — no layout shift
- Images: none. All visuals are CSS + SVG — zero image requests
- The grain overlay uses an inline SVG data URI — no network request
- Store badges are inline SVG — render immediately, work offline
- Intersection Observer triggers CSS class additions — no JavaScript animation libraries
- `next/font` not used (Google Fonts CDN link instead) — simpler for static export

---

## Scores to expect (Lighthouse)

| Metric | Expected |
|---|---|
| Performance | 95–100 |
| Accessibility | 90+ |
| Best Practices | 100 |
| SEO | 100 |

---

## License

MIT — free to use, modify, and deploy commercially.

---

```
Na Via Cuts · Luanda, Angola 🇦🇴
naвiacuts.ao
```
