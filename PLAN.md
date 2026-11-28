# BlackFrameLabs website: build plan ("The Edit Bay")

Status: **waiting for approval**. Nothing below has been built yet.

This is an upgrade of the current site (Vite + React, branch `redesign-character`, preview: https://mandonga-blackframe-labs-2901-4pdmpx4wh.vercel.app). It keeps that version's content, copy, contact details and media, and moves it to Next.js with the new art direction.

---

## 0. What carries over from the current version

| Keep | Detail |
| --- | --- |
| Brand + contact | BlackFrameLabs, hello@blackframelab.com, join@blackframelab.com, WhatsApp +91 94286 14172, IST time zone, 4-person team (Aman Donga, Het Vaghasiya, Harsh Parmar, Jimit Ramani) |
| Portfolio | **41 real pieces** already compressed for web (`public/work`, 197 MB, MP4 + poster for each): 10 podcast, 12 talking-head/short-form, 5 Meta AI UGC, 7 SaaS/motion (Base360 film leads), 7 real estate/brand. 30 vertical, 11 landscape. Plus a 14 s studio montage and one full Superintelligence × DataCamp episode on YouTube. |
| Copy that worked | Hero "We cut podcasts people finish." (vs the brief's "We edit videos people actually finish watching." — see §10, Q1), "No account managers", the 4-step process with timecodes, FAQ answers (24–48 h first cut, Drive/Frame.io, Premiere/AE/Audition, sound included, IST advantage), "Send us one video" CTA |
| Ideas | Timecode labels, REC/playhead language, black-frame cut between pages, word-by-word headline reveal, hover-preview cards, honest form states |
| Drop | Anton/Archivo/amber look (replaced by Neue Haas + Plex Mono + signal red), hash routing (replaced by real URLs with redirects from old `#/…` links), the giant scroll-type and echo effects (too loud for the new calm direction) |

Because real work already exists, `content/portfolio.ts` will be seeded with the **41 real items** (correctly tagged by service and format), not 12 placeholders. Placeholders are used only where we have nothing real: stats, testimonials, case-study numbers, before/after footage, pricing.

---

## 1. Sitemap

```
/                         Home
/work                     Full portfolio (filters, ?v=slug deep links)
/services                 Overview
/services/video-editing
/services/ai-video-editing
/services/meta-ads-ugc    (UGC with creators + AI UGC)
/services/saas-videos
/services/podcast-editing
/services/talking-head    (long-form + short-form)
/services/more            Motion graphics, captions, thumbnails, colour, sound, brand films, events, repurposing
/case-studies             Index
/case-studies/[slug]      Detail template
/process
/about
/pricing
/contact                  Cal.com inline + qualifying form
/privacy  /terms          (placeholder legal text, clearly marked)
404
```

Old links redirect: `/#/work → /work`, `/#/showcase → /work`, `/#/team → /about`, `/#/book → /contact`, etc. (client-side, since hash fragments never reach the server).

### Page-by-page sections

**Home** (in brief order)
1. Hero: 3D Timeline over a static poster; label `● REC 00:00:00:00 — VIDEO EDITING STUDIO`; headline; one line on who we work with; Book a call (red) + Watch showreel (outline).
2. Showreel: one large rounded player, muted preview, click for sound/full-screen, custom minimal controls.
3. Client names marquee (see §10, Q4: we have names, not logo files).
4. Selected work: 6–8 `featured` items, asymmetric 12-col grid mixing 16:9 and 9:16.
5. Services list: numbered rows, large Display titles, mono tags right, cursor-following video preview on hover, description expands.
6. Results / numbers: 3–4 count-up stats from `content/site.ts`. **Hidden until real values are filled in** (see §10, Q3).
7. Case study highlight: problem → what we did → result + before/after slider. Hidden until a case study has real `beforeSrc`.
8. Process: 5 steps, horizontal scroll on desktop, vertical list on mobile.
9. Testimonials on the light `#F4F2F0` section. Video cards + text quotes. **Hidden until real entries exist.**
10. Why us / AI + human.
11. FAQ accordion.
12. Final CTA over the second red glow.
13. Footer.

**Work**: filter chips (All, Video Editing, AI, Meta Ads & UGC, SaaS, Podcast, Long-form, Short-form, Motion graphics) + format toggle (All / Landscape / Vertical). Aspect-aware layout: vertical items in their own rows of tall phone-like cards; landscape in wide cards. Lightbox with `?v=slug`. Full YouTube episodes shown in a "Full episodes" row under the Podcast filter.

**Service page template**: hero (title, one-line promise, looping sample) → What you get → filtered portfolio → process → deliverables & turnaround → price "from"/custom → FAQ → CTA. Meta Ads page adds hook variations, 9:16/4:5/1:1 exports and testing batches. Talking Head page splits long-form and short-form.

**Case study template**: hero video → overview → challenge → approach → before/after → deliverables gallery → results → quote → next case study → CTA. Seeded with 2 drafts built from real work (Base360 founder film, The Caravan podcast) with every number marked `TODO`.

**Process**: the 5 steps in more depth, with what you send, what you get, timing.
**About**: studio story, the 4 people (initials until photos arrive), house rules, IST/time-zone advantage, hiring note.
**Pricing**: Starter / Growth (`MOST CHOSEN`, 1px red border) / Partner retainer, all values from `content/pricing.ts`, "Custom quote" until you set numbers. "Not sure? Book a call" below.
**Contact**: Cal.com inline (rounded container) + qualifying form (name, email, company, website, services chips, monthly budget chips, details, how did you hear). Success state: "We'll reply within 24 hours." WhatsApp link kept as a third route.

---

## 2. Design system

### Colour (CSS variables, mapped into Tailwind)
```
--ink        #0F0E0E   page background
--surface    #161316   cards, panels, nav (85% + blur)
--surface-2  #1F1B1D   raised / hover
--muted      #4B4A4B   borders, dividers, timeline tracks
--text       #FFFFFF   primary; --text-2 = 62% white; --text-3 = 48% white (brief said 40%; raised for AA, see below)
--signal     #FE2E4B   CTA, REC dot, active chip, playhead, progress, focus ring (≤ ~5% of a screen)
--glow       radial #FE2E4B → #7A1626 → transparent, low opacity, heavy blur, bottom-left; used twice only (hero, final CTA)
--paper      #F4F2F0   the one light (testimonials) section, with --ink text
```
Contrast check (computed): white on #0F0E0E 19.3:1; 62% white 7.7:1; **40% white only 3.8:1, which fails AA for small text**, so tertiary text uses **48% white (5.0:1)** instead, and true 40% is kept for disabled states and decorative rules only. #FE2E4B on #0F0E0E 5.2:1, so red text passes AA. White text on the red button is 3.7:1, below AA for normal text; ink text on red is 5.2:1. Options: white Medium at 19 px+ bold-ish (counts as large text, needs 3:1) or ink text. I'll use **white, 18 px Medium** on desktop buttons and switch to ink text if the Lighthouse audit flags it.

Film grain: fixed SVG `feTurbulence` noise at 3% opacity, `pointer-events: none`, one layer.

### Type
- Neue Haas Grotesk via Adobe Fonts kit `NEXT_PUBLIC_ADOBE_FONTS_KIT`. Display Pro 45/55/65 for headlines, Text Pro 55/65 for UI and body. Fallback `"Helvetica Neue", Helvetica, Arial, sans-serif` with a size-adjusted `@font-face` fallback to stop layout shift.
- IBM Plex Mono (next/font) for timecodes, metadata, chips, counters, footer. Uppercase, 11–13 px, 0.04em.

| Token | Size (clamp) | Font | Line-height | Tracking |
| --- | --- | --- | --- | --- |
| hero | 72 → 160 px | Display 45 Light | 0.95 | -0.03em |
| h1 | 56 → 104 px | Display 45 Light | 0.98 | -0.03em |
| h2 | 40 → 64 px | Display 55 Roman | 1.02 | -0.025em |
| h3 | 24 → 32 px | Display 55 Roman | 1.15 | -0.015em |
| body | 17 → 19 px | Text 55 Roman | 1.55 | 0, max 62ch |
| ui | 15 → 16 px | Text 65 Medium | 1.2 | 0 |
| mono | 11 → 13 px | Plex Mono | 1.4 | 0.04em, uppercase |

### Spacing, grid, radius, shadow
- 8 px grid. Section padding `clamp(80px, 12vw, 200px)`. Max width 1440, 12 columns, gutter `clamp(16px, 2vw, 32px)`, side margin `clamp(16px, 4vw, 64px)`.
- Radius: `--r-sm 12`, `--r-md 20` (inputs), `--r-lg 28` (media, cards), `--r-xl 40` (feature panels), `--r-full` (buttons, chips, nav). Full-bleed sections only are square.
- Shadows: none by default. One soft elevation for the lightbox and nav: `0 20px 60px rgba(0,0,0,.45)`.

### Motion
- Ease `cubic-bezier(0.22, 1, 0.36, 1)`, 0.6–1.2 s.
- Line reveals (mask + stagger 60–80 ms), media reveals (scale 1.08 → 1 with radius/clip reveal), playhead scroll bar, hover previews, nav hide/show, page transition (a 1-frame black cut, kept from v2, then the headline lines rise).
- Lenis with default-ish settings (`lerp 0.1`), **disabled on touch devices** (native scroll feels better on phones) and under reduced motion.
- Custom cursor (desktop, fine pointer only): 8 px dot → 72 px "Play" circle over video.
- Reduced motion: no parallax, no 3D, no Lenis, no cursor; simple 200 ms fades only.

### Editor details
Timecode section labels counting up (`00:00:04:12 — SELECTED WORK`), REC dot by "Available for N new clients this month" (text and number from `content/site.ts`; hidden if empty), hover metadata `9:16 · 00:42 · META AD`, crop-mark corners on card hover, playhead scroll progress bar, `01 / 02 / 03` numbering.

---

## 3. 3D hero: "The Timeline"

Scene: 7 rounded matte clip planes (mixed 16:9 and 9:16) on thin parallel tracks receding in depth, 1 px `--muted` edge, lit by the red glow from bottom-left. A thin red playhead slides across. Camera follows the mouse (≤ 4°). On scroll (0 → 1 over the hero height) the playhead reaches the centre clip, the other clips slide off along their tracks, and the centre clip scales toward the viewer and hands off to the showreel player below (cross-fade at the end of the scroll range so it reads as one continuous move).

Build: R3F + drei, `dynamic(..., { ssr: false })`, mounted after `requestIdleCallback`, with `<Canvas dpr={[1, 1.5]} frameloop="demand">` and invalidation on scroll/mouse/video frames only. Rounded clips via a custom `RoundedPlane` geometry with a simple unlit/matte material.

**Video textures (performance):** decoding 7 videos at once is the main risk on mid-range laptops. Plan: one **sprite-sheet "contact sheet" video** (a single 1280×720 MP4, ≤ 2 MB, where each clip occupies a tile), so the GPU decodes one stream and each plane samples its own UV region. Fallback if quality suffers: only the 3 nearest clips play, the rest show posters.

LCP + fallbacks:
- The LCP element is a pre-rendered **static poster image of the scene** (AVIF/WebP via next/image, `priority`), rendered on the server. The canvas fades in over it when its first frame is ready.
- Mobile (< 768 px), `prefers-reduced-motion`, `saveData`, or < 4 GB device memory / low GPU tier (drei `PerformanceMonitor` + a quick WebGL check): **CSS-only version**, which is the same poster with 3 real video tiles gently drifting via CSS transforms. No WebGL loaded at all.

---

## 4. Video hosting and playback

- `<VideoPlayer>` wraps `<video>`. If `src` ends in `.m3u8` and the browser lacks native HLS, it dynamically imports `hls.js`; otherwise it plays MP4 directly. Props: `src`, `poster`, `preview` (muted loop mode), `controls="custom" | "native"`, `onPlay` analytics hook.
- Defaults: `preload="none"`, `playsInline`, `muted` for previews, never autoplay with sound, IntersectionObserver lazy-loading (load at 1 viewport away, pause when out of view, max one auto-playing preview at a time on mobile).
- Now: MP4s from `public/work` (already web-encoded). Later: switch any item's `fullSrc` to a Mux / Cloudflare Stream / Bunny `.m3u8` and keep `previewSrc` as a short MP4. No component changes.
- Recommendation: move the 197 MB of video to Bunny Stream or Cloudflare Stream before traffic grows (Vercel bandwidth). Previews should be 3–5 s, ~300–600 KB loops; I'll generate these from the existing files with a PowerShell-runnable ffmpeg script (`scripts/make-previews.ps1`).

---

## 5. Components

```
components/
  layout/      Nav, MobileMenu, Footer, ScrollPlayhead, Grain, SmoothScroll, Cursor, PageTransition
  type/        RevealLines, TimecodeLabel, MonoMeta
  ui/          Button, Chip, ChipGroup, Accordion, Marquee, Stat (count-up), RecDot, CropMarks, Glow
  video/       VideoPlayer, VideoCard, Lightbox, BeforeAfterSlider, ShowreelPlayer, YouTubeEmbed
  hero/        HeroPoster, TimelineScene (R3F, client-only), TimelineCSS (fallback)
  sections/    Showreel, ClientMarquee, SelectedWork, ServicesList, Results, CaseHighlight,
               ProcessScroll, Testimonials, AiHuman, Faq, FinalCta
  work/        WorkFilters, FormatToggle, WorkGrid
  services/    ServiceHero, WhatYouGet, Deliverables, PriceFrom
  case/        CaseHero, CaseSection, ResultsGrid, NextCase
  contact/     CalEmbed, QualifyForm (server action + Resend + honeypot), SuccessState
```

## 6. Folder structure

```
app/
  layout.tsx, page.tsx, not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx
  work/page.tsx
  services/page.tsx, services/[slug]/page.tsx, services/more/page.tsx
  case-studies/page.tsx, case-studies/[slug]/page.tsx
  process/page.tsx, about/page.tsx, pricing/page.tsx, contact/page.tsx, contact/actions.ts
  privacy/page.tsx, terms/page.tsx
components/ (as above)
content/    site.ts, portfolio.ts, services.ts, testimonials.ts, faq.ts, pricing.ts, case-studies.ts, process.ts
lib/        analytics.ts, seo.ts (JSON-LD), motion.ts (eases/variants), device.ts (low-power check)
public/work/  existing MP4s + posters;  public/work/previews/  short loops;  public/hero/  poster + contact-sheet video
scripts/    make-previews.ps1, make-hero-sheet.ps1
styles/     globals.css (tokens, grain, fallback font-face)
HOW-TO-ADD-VIDEOS.md, README.md, .env.example
```

`.env.example`: `NEXT_PUBLIC_ADOBE_FONTS_KIT`, `NEXT_PUBLIC_CAL_LINK`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional; Vercel Analytics otherwise).

All commands in the README are PowerShell-safe (`npm run dev`, `npm run build`, no `&&` chains, no bash-only syntax).

---

## 7. SEO, accessibility, performance
- Per-page `metadata`, generated OG images, `sitemap.ts`, `robots.ts`, JSON-LD: `Organization`, `Service` per service page, `VideoObject` per portfolio item (name, thumbnail, duration, contentUrl).
- Keyboard: focus-trapped lightbox and mobile menu, Esc to close, arrow keys for next/prev, visible red focus rings, labelled players.
- Targets: Lighthouse desktop Performance 90+, Accessibility 95+, SEO 100; LCP < 2.5 s (poster image).
- Analytics events: `book_call_click`, `video_play` (slug, location), `form_submit`.

---

## 8. Build phases
1. Next.js setup, tokens, fonts, layout, nav, footer, Lenis, grain, playhead bar, cursor, page transition.
2. Video components: VideoPlayer, VideoCard, Lightbox, BeforeAfterSlider, preview-loop script.
3. Home (poster fallback hero), all content files seeded.
4. 3D Timeline hero + fallbacks + contact-sheet video.
5. Work page (filters, format toggle, aspect-aware grid, deep links, full episodes).
6. Services overview, template, 7 service pages.
7. Case studies, Process, About, Pricing, Contact (Cal.com + Resend), legal, 404.
8. Motion, accessibility, performance and SEO passes.
9. Production build, fix all warnings, breakpoint check (375/768/1280/1440/1920), report.

After each phase: run it, check it in a real browser at desktop + mobile, 2–3 line summary, push to a Vercel preview.

---

## 9. Where I'd push back on the brief (better-UX suggestions)

1. **Count-up stats and placeholders.** Placeholder numbers that ship by accident are worse than no numbers. A reviewer already flagged the old fake stats as the biggest trust problem. I'll render stats, testimonials and case-study results **only when real values are filled in**, and show a visible `TODO` badge in development only.
2. **Lenis on touch devices.** Smooth-scroll libraries make phones feel laggy, and the previous site's slow Lenis setup was called "broken". I'll keep Lenis on desktop with gentle settings and use native scroll on touch.
3. **"Available for 2 new clients this month."** Great detail, but only if it's true and kept up to date. It lives in `content/site.ts`; empty = hidden.
4. **7 live video textures in WebGL.** Kept, but delivered as one contact-sheet video (see §3) to hold 60 fps.
5. **Services list with a cursor-following preview.** Lovely on desktop, invisible on touch. On mobile each row shows a small static poster instead.
6. **Contrast.** 40% white (3.8:1) and white on #FE2E4B (3.7:1) both fail AA for small text. Tertiary text goes to 48% white; red buttons use large Medium text, or ink text if needed.
7. **Pricing with "from $X/month"** is good for high-ticket filtering, but only if numbers exist. Until then each tier says "Custom quote" and the page still works.
8. **Next.js vs current Vite deploy.** Vercel handles both; the project's Vercel preset will need switching from "Vite" to "Next.js" (one setting), which I'll note in the README.

---

## 10. What I need from you (can be answered now or during the build)

1. **Hero headline:** keep "We cut podcasts people finish." (podcast-first, current) or the brief's "We edit videos people actually finish watching." (broader)? My pick: the broader line, since the new sitemap covers SaaS and Meta ads too.
2. **Adobe Fonts kit ID** with Neue Haas Grotesk Display + Text added (needs an Adobe CC plan). Until then the site renders in Helvetica Neue / Arial, which is close.
3. **Real numbers** for the stats section (views generated, videos delivered, average turnaround, retention). Turnaround "24–48 h first cut" is already real and can show now.
4. **Client logos** as SVG/PNG. Until then the marquee shows names in mono type (The Caravan Podcast, Superintelligence, Base360, Randall Shaw, Cerca, Perception Studios, Robinsons Roofing, Neel Patel).
5. **Cal.com or Calendly link**, and a **Resend API key + verified sending domain** (blackframelab.com).
6. **Prices** for Starter / Growth / Partner, or keep "Custom quote".
7. **Before/after footage** (raw + final of the same moment) for at least one case study.
8. **Testimonials** (video or text, with permission), team photos, social links.
9. **Still open from before:** the two Pixar-style ads ("But we owe", "Are you seriously") as Drive files, the YouTube links of the Caravan and Superintelligence episodes you edited, and whether the four fitness reels should stay.

Reply "approved" (plus any changes) and I'll start Phase 1.
