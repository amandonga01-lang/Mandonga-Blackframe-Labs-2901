// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO. Every video on the site comes from this file.
// How to add a video: see HOW-TO-ADD-VIDEOS.md in the project root.
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceSlug =
  | "video-editing"
  | "ai-video-editing"
  | "meta-ads-ugc"
  | "saas-videos"
  | "podcast-editing"
  | "talking-head"
  | "more";

/** Extra filters on the Work page that aren't services. */
export type Tag = "long-form" | "short-form" | "motion-graphics";

export type PortfolioItem = {
  slug: string; // unique, used in the URL: /work?v=slug
  title: string;
  client: string; // "" if the client can't be named publicly
  services: ServiceSlug[]; // which service pages show it
  tags?: Tag[];
  format: "landscape" | "vertical" | "square";
  poster: string; // image path, e.g. /work/my-video.jpg
  previewSrc: string; // short muted loop (mp4). Can be the same file as fullSrc.
  fullSrc: string; // full video: .mp4, or a .m3u8 link from Mux / Cloudflare Stream / Bunny
  duration?: string; // "mm:ss"
  description?: string;
  results?: { label: string; value: string }[]; // only real, verified numbers, e.g. { label: "Views", value: "2.1M" }
  featured?: boolean; // shows in "Selected work" on the home page
  caseStudySlug?: string;
  beforeSrc?: string; // raw footage for the before/after slider
  published?: string; // real publish date "YYYY-MM-DD"; items with a date get VideoObject structured data
};

export const portfolio: PortfolioItem[] = [
  { slug: "caravan-new-york", title: "New York vibe edit", client: "The Caravan", services: ["podcast-editing", "video-editing"], tags: ["long-form"], format: "landscape", poster: "/work/caravan-new-york.jpg", previewSrc: "/work/previews/caravan-new-york.mp4", fullSrc: "/work/caravan-new-york.mp4", duration: "00:55", featured: true },
  { slug: "caravan-open-recap", title: "Caravan Open recap", client: "The Caravan", services: ["podcast-editing", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/caravan-open-recap.jpg", previewSrc: "/work/previews/caravan-open-recap.mp4", fullSrc: "/work/caravan-open-recap.mp4", duration: "00:39" },
  { slug: "caravan-ad", title: "Caravan Podcast promo", client: "The Caravan", services: ["podcast-editing", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/caravan-ad.jpg", previewSrc: "/work/previews/caravan-ad.mp4", fullSrc: "/work/caravan-ad.mp4", duration: "00:17" },
  { slug: "ht-human-friendly-robotics", title: "Human Friendly Robotics: Shamoon Siddiqui", client: "HabibiTech Summit", services: ["podcast-editing", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/ht-human-friendly-robotics.jpg", previewSrc: "/work/previews/ht-human-friendly-robotics.mp4", fullSrc: "/work/ht-human-friendly-robotics.mp4", duration: "00:49", featured: true },
  { slug: "ht-iconavize", title: "Iconavize: Afaf Saleh", client: "HabibiTech Summit", services: ["podcast-editing", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/ht-iconavize.jpg", previewSrc: "/work/previews/ht-iconavize.mp4", fullSrc: "/work/ht-iconavize.mp4", duration: "00:31" },
  { slug: "ht-ai-controversy", title: "AI controversy: founder vox-pops", client: "HabibiTech Summit", services: ["podcast-editing", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/ht-ai-controversy.jpg", previewSrc: "/work/previews/ht-ai-controversy.mp4", fullSrc: "/work/ht-ai-controversy.mp4", duration: "01:00" },
  { slug: "neel-patel-podcast", title: "Studio podcast clip", client: "Neel Patel", services: ["podcast-editing", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/neel-patel-podcast.jpg", previewSrc: "/work/previews/neel-patel-podcast.mp4", fullSrc: "/work/neel-patel-podcast.mp4", duration: "00:38" },
  { slug: "interview-1", title: "Founder interview, cut 01", client: "", services: ["podcast-editing", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/interview-1.jpg", previewSrc: "/work/previews/interview-1.mp4", fullSrc: "/work/interview-1.mp4", duration: "01:26" },
  { slug: "interview-5", title: "Founder interview, cut 05", client: "", services: ["podcast-editing", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/interview-5.jpg", previewSrc: "/work/previews/interview-5.mp4", fullSrc: "/work/interview-5.mp4", duration: "01:03" },
  { slug: "pod-teaser", title: "Episode teaser", client: "", services: ["podcast-editing", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/pod-teaser.jpg", previewSrc: "/work/previews/pod-teaser.mp4", fullSrc: "/work/pod-teaser.mp4", duration: "00:29" },
  { slug: "randall-reel-1", title: "Wilderness reel 01", client: "Randall Shaw", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/randall-reel-1.jpg", previewSrc: "/work/previews/randall-reel-1.mp4", fullSrc: "/work/randall-reel-1.mp4", duration: "00:47", featured: true },
  { slug: "perception-reel-1", title: "Founder story, in the car", client: "Perception Studios", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/perception-reel-1.jpg", previewSrc: "/work/previews/perception-reel-1.mp4", fullSrc: "/work/perception-reel-1.mp4", duration: "00:49", featured: true },
  { slug: "randall-reel-11", title: "Wilderness reel 11", client: "Randall Shaw", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/randall-reel-11.jpg", previewSrc: "/work/previews/randall-reel-11.mp4", fullSrc: "/work/randall-reel-11.mp4", duration: "00:42" },
  { slug: "ryan-demo", title: "Gym owner talking-head ad", client: "Ryan", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/ryan-demo.jpg", previewSrc: "/work/previews/ryan-demo.mp4", fullSrc: "/work/ryan-demo.mp4", duration: "00:57" },
  { slug: "perception-reel-2", title: "Founder story, part two", client: "Perception Studios", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/perception-reel-2.jpg", previewSrc: "/work/previews/perception-reel-2.mp4", fullSrc: "/work/perception-reel-2.mp4", duration: "00:57" },
  { slug: "randall-reel-9", title: "Wilderness reel 09", client: "Randall Shaw", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/randall-reel-9.jpg", previewSrc: "/work/previews/randall-reel-9.mp4", fullSrc: "/work/randall-reel-9.mp4", duration: "00:40" },
  { slug: "randall-reel-10", title: "Wilderness reel 10", client: "Randall Shaw", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/randall-reel-10.jpg", previewSrc: "/work/previews/randall-reel-10.mp4", fullSrc: "/work/randall-reel-10.mp4", duration: "00:29" },
  { slug: "randall-reel-april", title: "April reel", client: "Randall Shaw", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/randall-reel-april.jpg", previewSrc: "/work/previews/randall-reel-april.mp4", fullSrc: "/work/randall-reel-april.mp4", duration: "00:19" },
  { slug: "morning-mistakes", title: "Morning mistakes", client: "", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/morning-mistakes.jpg", previewSrc: "/work/previews/morning-mistakes.mp4", fullSrc: "/work/morning-mistakes.mp4", duration: "00:59" },
  { slug: "lose-weight", title: "You don't need $250,000 to lose weight", client: "", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/lose-weight.jpg", previewSrc: "/work/previews/lose-weight.mp4", fullSrc: "/work/lose-weight.mp4", duration: "01:23" },
  { slug: "4000-kcals", title: "4,000 kcal in a day", client: "", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/4000-kcals.jpg", previewSrc: "/work/previews/4000-kcals.mp4", fullSrc: "/work/4000-kcals.mp4", duration: "01:30" },
  { slug: "creatine", title: "Creatine, explained", client: "", services: ["talking-head", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/creatine.jpg", previewSrc: "/work/previews/creatine.mp4", fullSrc: "/work/creatine.mp4", duration: "00:58" },
  { slug: "ugc-cerca", title: "Dating app ad", client: "Cerca", services: ["meta-ads-ugc", "ai-video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/ugc-cerca.jpg", previewSrc: "/work/previews/ugc-cerca.mp4", fullSrc: "/work/ugc-cerca.mp4", duration: "00:29", featured: true },
  { slug: "ugc-boy", title: "AI UGC ad, full cut", client: "", services: ["meta-ads-ugc", "ai-video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/ugc-boy.jpg", previewSrc: "/work/previews/ugc-boy.mp4", fullSrc: "/work/ugc-boy.mp4", duration: "00:35" },
  { slug: "ugc-test-package", title: "AI UGC test package", client: "", services: ["meta-ads-ugc", "ai-video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/ugc-test-package.jpg", previewSrc: "/work/previews/ugc-test-package.mp4", fullSrc: "/work/ugc-test-package.mp4", duration: "01:41" },
  { slug: "ai-commercial-1", title: "AI cinematic commercial", client: "", services: ["meta-ads-ugc", "ai-video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/ai-commercial-1.jpg", previewSrc: "/work/previews/ai-commercial-1.mp4", fullSrc: "/work/ai-commercial-1.mp4", duration: "00:15", featured: true },
  { slug: "ai-vertical-ad", title: "AI animated vertical ad", client: "", services: ["meta-ads-ugc", "ai-video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/ai-vertical-ad.jpg", previewSrc: "/work/previews/ai-vertical-ad.mp4", fullSrc: "/work/ai-vertical-ad.mp4", duration: "00:12" },
  { slug: "base360", title: "Founder film: a $1B rental company run on AI", client: "Base360", services: ["saas-videos", "talking-head"], tags: ["long-form", "motion-graphics"], format: "landscape", poster: "/work/base360.jpg", previewSrc: "/work/previews/base360.mp4", fullSrc: "/work/base360.mp4", duration: "02:40", description: "A founder-led product film: talking head, UI walkthroughs and motion captions in one story.", featured: true },
  { slug: "superintelligence-intro", title: "Show intro", client: "Superintelligence Podcast", services: ["more"], tags: ["long-form", "motion-graphics"], format: "landscape", poster: "/work/superintelligence-intro.jpg", previewSrc: "/work/previews/superintelligence-intro.mp4", fullSrc: "/work/superintelligence-intro.mp4", duration: "00:07" },
  { slug: "explainer", title: "Options explainer", client: "", services: ["saas-videos"], tags: ["long-form", "motion-graphics"], format: "landscape", poster: "/work/explainer.jpg", previewSrc: "/work/previews/explainer.mp4", fullSrc: "/work/explainer.mp4", duration: "00:55" },
  { slug: "edith-demo", title: "Edith product demo", client: "Edith", services: ["saas-videos"], tags: ["long-form", "motion-graphics"], format: "landscape", poster: "/work/edith-demo.jpg", previewSrc: "/work/previews/edith-demo.mp4", fullSrc: "/work/edith-demo.mp4", duration: "00:31" },
  { slug: "devin-demo", title: "Devin product demo", client: "Devin", services: ["saas-videos"], tags: ["short-form", "motion-graphics"], format: "vertical", poster: "/work/devin-demo.jpg", previewSrc: "/work/previews/devin-demo.mp4", fullSrc: "/work/devin-demo.mp4", duration: "00:13" },
  { slug: "helo-demo", title: "Helo product demo", client: "Helo", services: ["saas-videos"], tags: ["short-form", "motion-graphics"], format: "vertical", poster: "/work/helo-demo.jpg", previewSrc: "/work/previews/helo-demo.mp4", fullSrc: "/work/helo-demo.mp4", duration: "01:38" },
  { slug: "intro-animation", title: "Logo intro", client: "", services: ["more"], tags: ["long-form", "motion-graphics"], format: "landscape", poster: "/work/intro-animation.jpg", previewSrc: "/work/previews/intro-animation.mp4", fullSrc: "/work/intro-animation.mp4", duration: "00:04" },
  { slug: "premium-real-estate", title: "Premium property reel", client: "", services: ["more", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/premium-real-estate.jpg", previewSrc: "/work/previews/premium-real-estate.mp4", fullSrc: "/work/premium-real-estate.mp4", duration: "00:35" },
  { slug: "real-estate-walkthrough", title: "Property walkthrough", client: "", services: ["more", "video-editing"], tags: ["short-form"], format: "vertical", poster: "/work/real-estate-walkthrough.jpg", previewSrc: "/work/previews/real-estate-walkthrough.mp4", fullSrc: "/work/real-estate-walkthrough.mp4", duration: "01:33" },
  { slug: "tamebridge", title: "Tamebridge Industrial Estate", client: "Robinsons Roofing & Cladding", services: ["more", "video-editing"], tags: ["long-form"], format: "landscape", poster: "/work/tamebridge.jpg", previewSrc: "/work/previews/tamebridge.mp4", fullSrc: "/work/tamebridge.mp4", duration: "00:27", featured: true },
  { slug: "robinson-roofing", title: "Company film", client: "Robinsons Roofing & Cladding", services: ["more", "video-editing"], tags: ["long-form"], format: "landscape", poster: "/work/robinson-roofing.jpg", previewSrc: "/work/previews/robinson-roofing.mp4", fullSrc: "/work/robinson-roofing.mp4", duration: "00:37" },
  { slug: "robinson-east-grinstead", title: "East Grinstead project", client: "Robinsons Roofing & Cladding", services: ["more", "video-editing"], tags: ["long-form"], format: "landscape", poster: "/work/robinson-east-grinstead.jpg", previewSrc: "/work/previews/robinson-east-grinstead.mp4", fullSrc: "/work/robinson-east-grinstead.mp4", duration: "00:29" },
  { slug: "false-ceiling", title: "Best false ceiling designs (excerpt)", client: "", services: ["more", "video-editing"], tags: ["long-form"], format: "landscape", poster: "/work/false-ceiling.jpg", previewSrc: "/work/previews/false-ceiling.mp4", fullSrc: "/work/false-ceiling.mp4", duration: "10:12" },
  { slug: "wallpaper", title: "How to pick wallpaper (excerpt)", client: "", services: ["more", "video-editing"], tags: ["long-form"], format: "landscape", poster: "/work/wallpaper.jpg", previewSrc: "/work/previews/wallpaper.mp4", fullSrc: "/work/wallpaper.mp4", duration: "14:47" },
];

/** Full episodes hosted on YouTube (shown under Podcast). Add the id after "watch?v=". */
/** `thumb` is optional: a local copy (public/work/episodes/<id>.jpg) loads faster than YouTube's. */
export type Episode = { youtubeId: string; show: string; title: string; duration: string; thumb?: string };

export const episodes: Episode[] = [
  { youtubeId: "UFQYuy2KIXE", show: "Superintelligence", title: "Open-source AI vs. frontier models: DataCamp's real-world test", duration: "51:02", thumb: "/work/episodes/UFQYuy2KIXE.jpg" },
];

/**
 * Showreel: a 36 s 16:9 cut assembled from the portfolio (silent for now).
 * Replace with your own reel with music when ready: same file names, or point fullSrc at a stream.
 */
export const showreel = {
  title: "BlackFrameLabs showreel",
  poster: "/work/showreel.jpg",
  previewSrc: "/work/previews/showreel.mp4",
  fullSrc: "/work/showreel.mp4",
  format: "landscape" as const,
  hasSound: false as boolean, // set to true when the reel has a soundtrack
};

export const bySlug = (slug: string) => portfolio.find((p) => p.slug === slug);
export const forService = (s: ServiceSlug) => portfolio.filter((p) => p.services.includes(s));
