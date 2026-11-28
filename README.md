# BlackFrameLabs website ("The Edit Bay")

Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion + Lenis + React Three Fiber. Deploys on Vercel.

## Run it (PowerShell)

```powershell
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

## Change content without touching components

| What | File |
| --- | --- |
| Agency name, email, WhatsApp, socials, hero copy, availability badge, client names, stats, team | `content/site.ts` |
| Every video (see HOW-TO-ADD-VIDEOS.md) | `content/portfolio.ts` + `public/work/` |
| Services and their pages | `content/services.ts` |
| Prices / packages | `content/pricing.ts` |
| FAQ | `content/faq.ts` |
| Process steps | `content/process.ts` |
| Testimonials (real only; section hidden while empty) | `content/testimonials.ts` |
| Case studies (`published: true` to show) | `content/case-studies.ts` |

Stats, testimonials, case studies and the availability badge stay **hidden until real values are filled in**.

## Environment variables

Copy `.env.example` to `.env.local` for local dev, and add the same names in Vercel → Settings → Environment Variables:

- `NEXT_PUBLIC_ADOBE_FONTS_KIT`: Adobe Fonts web project ID with Neue Haas Grotesk Display Pro + Text Pro (until set, Helvetica Neue / Arial is used)
- `NEXT_PUBLIC_CAL_LINK`: Cal.com handle (e.g. `blackframelabs/intro`) or a Calendly URL. Every "Book a call" button uses it.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: contact form delivery (the FROM domain must be verified in Resend)
- `NEXT_PUBLIC_SITE_URL`: canonical URL for SEO / sitemap / OG
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)

## Vercel

`vercel.json` tells Vercel this is a Next.js project. If the project in the Vercel dashboard still says "Vite" under Framework Preset, switch it to "Next.js".

## Scripts

- `scripts/make-previews.ps1`: makes 4 s hover-preview loops and posters for new videos (needs ffmpeg).

## Structure

`app/` routes · `components/` (layout, type, ui, video, hero, sections, work, services, case, contact) · `content/` data · `lib/` helpers · `styles/globals.css` design tokens.
