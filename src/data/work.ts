// Portfolio. Video + poster files live in /public/work/<id>.mp4|.jpg.
// `client` is left empty when the client isn't named publicly; the card then shows the category.
// `length` is the length of the original piece; files longer than 90s are trimmed web excerpts.

export type WorkCategory = "ugc" | "reels" | "podcast" | "motion" | "realestate";

export interface WorkItem {
  id: string;
  title: string;
  client?: string;
  category: WorkCategory;
  aspect: "vertical" | "horizontal";
  length: string;
  /** Extra clips shown together, e.g. a hook test pack. */
  variants?: string[];
  note?: string;
}

export const CATEGORY_ORDER: WorkCategory[] = ["ugc", "reels", "podcast", "motion", "realestate"];

export const CATEGORY_LABELS: Record<WorkCategory, string> = {
  ugc: "AI UGC ads",
  reels: "Short-form",
  podcast: "Podcasts",
  motion: "Motion & SaaS",
  realestate: "Real estate & brand",
};

export const CATEGORY_BLURB: Record<WorkCategory, string> = {
  ugc: "Ads for paid social. Hook in the first second, captions that carry the pitch, a CTA that lands.",
  reels: "Talking-head and creator content cut for the feed: pattern interrupts, kinetic captions, sound hits.",
  podcast: "Long conversations turned into clips people finish. Multicam, cleaned audio, branded captions.",
  motion: "Product demos, explainers and show intros. UI animation, kinetic type, brand polish.",
  realestate: "Property walkthroughs and brand films. Smooth pacing, a proper grade, music-led.",
};

const v = (id: string) => `/work/${id}.mp4`;
export const videoUrl = (item: WorkItem) => v(item.id);
export const posterUrl = (item: WorkItem) => `/work/${item.id}.jpg`;

export const WORK: WorkItem[] = [
  // AI UGC ads
  { id: "ugc-cerca", title: "Dating app ad", client: "Cerca", category: "ugc", aspect: "vertical", length: "0:29" },
  {
    id: "ugc-hook-4",
    title: "Hook test pack: one script, six openings",
    category: "ugc",
    aspect: "vertical",
    length: "6 × 0:10–0:15",
    variants: ["ugc-hook-1", "ugc-hook-2", "ugc-hook-3", "ugc-hook-4", "ugc-hook-5", "ugc-hook-6"].map(v),
    note: "Same body, six different first seconds, so the media buyer can test which opening holds attention.",
  },
  { id: "ugc-boy", title: "AI UGC ad, full cut", category: "ugc", aspect: "vertical", length: "0:35" },
  { id: "ugc-test-package", title: "AI UGC test package", category: "ugc", aspect: "vertical", length: "1:41" },
  { id: "ai-commercial-1", title: "AI cinematic commercial", category: "ugc", aspect: "vertical", length: "0:15" },
  { id: "ai-vertical-ad", title: "AI animated vertical ad", category: "ugc", aspect: "vertical", length: "0:12" },

  // Short-form
  { id: "randall-reel-1", title: "Wilderness reel 01", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:47" },
  { id: "morning-mistakes", title: "Morning mistakes", category: "reels", aspect: "vertical", length: "0:59" },
  { id: "randall-reel-11", title: "Wilderness reel 11", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:42" },
  { id: "4000-kcals", title: "4,000 kcal in a day", category: "reels", aspect: "vertical", length: "1:30" },
  { id: "randall-reel-9", title: "Wilderness reel 09", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:40" },
  { id: "lose-weight", title: "You don't need $250,000 to lose weight", category: "reels", aspect: "vertical", length: "1:23" },
  { id: "randall-reel-10", title: "Wilderness reel 10", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:29" },
  { id: "creatine", title: "Creatine, explained", category: "reels", aspect: "vertical", length: "0:58" },
  { id: "randall-reel-april", title: "April reel", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:19" },
  { id: "ryan-demo", title: "Talking-head reel", client: "Ryan", category: "reels", aspect: "vertical", length: "0:57" },
  { id: "perception-reel-1", title: "Reel 01", client: "Perception Studios", category: "reels", aspect: "vertical", length: "0:49" },
  { id: "perception-reel-2", title: "Reel 02", client: "Perception Studios", category: "reels", aspect: "vertical", length: "0:57" },

  // Podcasts
  { id: "caravan-new-york", title: "New York vibe edit", client: "The Caravan", category: "podcast", aspect: "horizontal", length: "0:55" },
  { id: "caravan-open-recap", title: "Caravan Open recap", client: "The Caravan", category: "podcast", aspect: "vertical", length: "0:39" },
  { id: "caravan-ad", title: "Promo", client: "The Caravan", category: "podcast", aspect: "vertical", length: "0:17" },
  { id: "ht-human-friendly-robotics", title: "Human Friendly Robotics: Samoon Siddiqui", category: "podcast", aspect: "vertical", length: "0:49" },
  { id: "ht-iconavize", title: "Iconavize: Afaf Saleh", category: "podcast", aspect: "vertical", length: "0:31" },
  { id: "ht-ai-controversy", title: "AI controversy compilation", category: "podcast", aspect: "vertical", length: "1:00" },
  { id: "neel-patel-podcast", title: "Podcast clip", client: "Neel Patel", category: "podcast", aspect: "vertical", length: "0:38" },
  { id: "interview-1", title: "Founder interview, cut 01", category: "podcast", aspect: "vertical", length: "1:26" },
  { id: "interview-5", title: "Founder interview, cut 05", category: "podcast", aspect: "vertical", length: "1:03" },
  { id: "pod-teaser", title: "Episode teaser", category: "podcast", aspect: "vertical", length: "0:29" },

  // Motion & SaaS
  { id: "superintelligence-intro", title: "Show intro", client: "Superintelligence Podcast", category: "motion", aspect: "horizontal", length: "0:07" },
  { id: "explainer", title: "Options explainer", category: "motion", aspect: "horizontal", length: "0:55" },
  { id: "edith-demo", title: "Product demo", client: "Edith", category: "motion", aspect: "horizontal", length: "0:31" },
  { id: "devin-demo", title: "Product demo", client: "Devin", category: "motion", aspect: "vertical", length: "0:13" },
  { id: "helo-demo", title: "Product demo", client: "Helo", category: "motion", aspect: "vertical", length: "1:38" },
  { id: "intro-animation", title: "Logo intro", category: "motion", aspect: "horizontal", length: "0:04" },

  // Real estate & brand
  { id: "premium-real-estate", title: "Premium property reel", category: "realestate", aspect: "vertical", length: "0:35" },
  { id: "real-estate-walkthrough", title: "Property walkthrough", category: "realestate", aspect: "vertical", length: "1:33" },
  { id: "tamebridge", title: "Tamebridge Industrial Estate", client: "Robinsons Roofing & Cladding", category: "realestate", aspect: "horizontal", length: "0:27" },
  { id: "robinson-roofing", title: "Company film", client: "Robinsons Roofing & Cladding", category: "realestate", aspect: "horizontal", length: "0:37" },
  { id: "robinson-east-grinstead", title: "East Grinstead project", client: "Robinsons Roofing & Cladding", category: "realestate", aspect: "horizontal", length: "0:29" },
  { id: "false-ceiling", title: "Best false ceiling designs (excerpt)", category: "realestate", aspect: "horizontal", length: "10:12" },
  { id: "wallpaper", title: "How to pick wallpaper (excerpt)", category: "realestate", aspect: "horizontal", length: "14:47" },
];

/** Clips used in the home-page timeline, in order. */
export const HERO_REEL = ["ugc-cerca", "randall-reel-1", "caravan-open-recap", "morning-mistakes", "ai-commercial-1", "premium-real-estate"];

export const CLIENTS = ["Cerca", "The Caravan", "Randall Shaw", "Superintelligence Podcast", "Perception Studios", "Robinsons Roofing", "Helo", "Neel Patel"];
