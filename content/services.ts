import type { ServiceSlug } from "./portfolio";

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  promise: string; // one line under the title
  tags: string[]; // mono tags on the services list
  sample: string; // portfolio slug used as the looping hero sample
  summary: string; // 1–2 sentences for the services list
  whatYouGet: string[];
  groups?: { title: string; body: string; points: string[] }[]; // sub-offers (UGC vs AI UGC, long vs short)
  deliverables: string[];
  turnaround: string;
  priceFrom: string; // e.g. "from $1,500 / month"; empty = "Custom quote"
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "podcast-editing",
    number: "01",
    title: "Podcast Editing",
    promise: "The full episode, and the clips that grow it.",
    tags: ["Multicam", "Audio", "Clips", "Thumbnails"],
    sample: "caravan-new-york",
    summary: "Full-episode multicam edits with clean audio, cold opens, and the moments that travel cut for Shorts, Reels and TikTok.",
    whatYouGet: [
      "Multicam full-episode edit for YouTube",
      "Audio cleanup, levelling and a final mix",
      "Cold open and intro",
      "Clips picked for the moments that travel, captioned for sound-off",
      "Thumbnails for the episode and the clips",
    ],
    deliverables: ["Full episode, 16:9 4K/1080p", "6–12 vertical clips per episode", "Captions (SRT + burned-in)", "Thumbnails"],
    turnaround: "Clips in 24–48 h. Full episodes on a date agreed before we start.",
    priceFrom: "",
    faq: [
      { q: "Do you need every camera angle?", a: "Yes, send every angle plus the separate audio tracks if you have them. We sync everything." },
      { q: "Who picks the clips?", a: "We do, then you approve the list before we cut them. You can also send timestamps you already like." },
    ],
  },
  {
    slug: "talking-head",
    number: "02",
    title: "Talking Head",
    promise: "You on camera, cut so people stay to the end.",
    tags: ["YouTube", "Courses", "Reels", "Shorts"],
    sample: "randall-reel-1",
    summary: "Founders, coaches and creators on camera. Long-form YouTube and courses, and short-form for Reels, Shorts and TikTok.",
    whatYouGet: ["A hook in the first sentence", "Dead air and retakes removed", "B-roll, captions and sound design", "The same editors every week, so your style stays yours"],
    groups: [
      { title: "Long-form", body: "YouTube videos, courses and interviews.", points: ["Story structure and pacing", "B-roll and graphics", "Chapters and end screens"] },
      { title: "Short-form", body: "Reels, Shorts and TikTok.", points: ["Retention editing", "Kinetic captions", "Pattern interrupts and sound hits"] },
    ],
    deliverables: ["16:9 and 9:16 masters", "Captions (SRT + burned-in)", "Platform-ready exports"],
    turnaround: "Short-form in 24–48 h. Long-form on an agreed date.",
    priceFrom: "",
    faq: [{ q: "Can you work from a weekly upload?", a: "Yes. Most talking-head clients send one recording a week and we cut a batch from it." }],
  },
  {
    slug: "meta-ads-ugc",
    number: "03",
    title: "Meta Ads & UGC",
    promise: "Ads cut to stop the scroll, delivered in testable batches.",
    tags: ["Hooks", "9:16 · 4:5 · 1:1", "UGC", "AI UGC"],
    sample: "ugc-cerca",
    summary: "Creator footage and AI-generated UGC edited into Meta ads, with hook variations so your media buyer always has something new to test.",
    whatYouGet: ["Several hook variations per script", "Captions that carry the pitch with sound off", "9:16, 4:5 and 1:1 exports", "Creative testing batches on a schedule"],
    groups: [
      { title: "UGC with creators", body: "Real creator footage edited into scroll-stopping ads.", points: ["Hook variations from the same footage", "Offer and CTA end cards", "Safe zones respected"] },
      { title: "AI UGC", body: "AI avatars and AI-generated scenes for fast creative testing at scale.", points: ["Script to finished ad", "Many concepts per week", "Human-edited final cut"] },
    ],
    deliverables: ["Ad batches with hook variations", "9:16 / 4:5 / 1:1 per ad", "Naming that matches your ad account"],
    turnaround: "First batch in 48–72 h, then on a weekly or bi-weekly rhythm.",
    priceFrom: "",
    faq: [{ q: "Do you write the scripts?", a: "We can, or we cut from yours. Tell us what's working in your account and we'll build variations around it." }],
  },
  {
    slug: "saas-videos",
    number: "04",
    title: "SaaS Videos",
    promise: "What your product does, in one clear story.",
    tags: ["Demos", "Launches", "UI motion", "Explainers"],
    sample: "base360",
    summary: "Product demos, launch films, explainers and feature walkthroughs, mixing founder on camera with UI animation and motion graphics.",
    whatYouGet: ["Founder films that mix talking head and UI", "Product demos and feature walkthroughs", "UI animation and motion graphics", "Versions for the site, socials and sales decks"],
    deliverables: ["Launch film or demo, 16:9", "Cut-downs for socials", "Silent loops for the website"],
    turnaround: "Agreed per project, usually 1–2 weeks for a launch film.",
    priceFrom: "",
    faq: [{ q: "Do you need screen recordings from us?", a: "Yes, clean high-res recordings of the flows. We can send a shot list first." }],
  },
  {
    slug: "video-editing",
    number: "05",
    title: "Video Editing",
    promise: "Cuts, pacing, colour, sound and captions, done properly.",
    tags: ["Cuts", "Colour", "Sound", "Motion"],
    sample: "tamebridge",
    summary: "General professional editing for anything that doesn't fit a box: brand films, events, real estate, recaps and documentaries.",
    whatYouGet: ["Story and pacing", "Colour grade", "Sound design and mix", "Motion graphics and captions"],
    deliverables: ["Master file in your format", "Social cut-downs on request"],
    turnaround: "Agreed per project.",
    priceFrom: "",
    faq: [],
  },
  {
    slug: "ai-video-editing",
    number: "06",
    title: "AI Video Editing",
    promise: "AI for speed and scale. Human editors for the finish.",
    tags: ["AI cuts", "AI captions", "AI b-roll", "Upscaling"],
    sample: "ai-commercial-1",
    summary: "AI-assisted workflows for rough cuts, captions, b-roll, voice and upscaling, so you get more output. Every edit is finished by an experienced human editor.",
    whatYouGet: ["AI rough cuts and selects", "AI captions and translations", "AI b-roll and generated scenes", "AI voice and upscaling", "A human editor's final pass on every video"],
    deliverables: ["Finished videos, not raw AI output"],
    turnaround: "Faster than a standard edit; agreed per batch.",
    priceFrom: "",
    faq: [{ q: "Is it just AI?", a: "No. AI handles the repetitive parts. A senior editor makes the decisions and finishes every video." }],
  },
];

/** "Also available": one shared page. */
export const moreServices = [
  "Motion graphics",
  "Subtitles & captions",
  "Thumbnails",
  "Colour grading",
  "Sound design",
  "Documentary & brand films",
  "Event videos",
  "Repurposing: one long video into many shorts",
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
