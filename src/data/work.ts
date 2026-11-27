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
  note?: string;
}

export const CATEGORY_ORDER: WorkCategory[] = ["podcast", "reels", "ugc", "motion", "realestate"];

export const CATEGORY_LABELS: Record<WorkCategory, string> = {
  podcast: "Podcasts",
  reels: "Talking heads & short-form",
  ugc: "Meta AI UGC ads",
  motion: "Motion & SaaS",
  realestate: "Real estate & brand",
};

export const CATEGORY_BLURB: Record<WorkCategory, string> = {
  podcast: "Full episodes and the clips that grow them. Multicam, clean audio, story-first pacing, branded captions.",
  reels: "Founders, coaches and creators on camera, cut so people watch to the end: hooks, pattern interrupts, kinetic captions.",
  ugc: "Meta ads built with AI and real creators. A hook in the first second, captions that carry the pitch, a CTA that lands.",
  motion: "Product demos, explainers and show intros. UI animation, kinetic type, brand polish.",
  realestate: "Property walkthroughs and brand films. Smooth pacing, a proper grade, music-led.",
};

const v = (id: string) => `/work/${id}.mp4`;
export const videoUrl = (item: WorkItem) => v(item.id);
export const posterUrl = (item: WorkItem) => `/work/${item.id}.jpg`;

export const WORK: WorkItem[] = [
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

  // Talking heads & short-form
  { id: "randall-reel-1", title: "Wilderness reel 01", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:47" },
  { id: "perception-reel-1", title: "Reel 01", client: "Perception Studios", category: "reels", aspect: "vertical", length: "0:49" },
  { id: "randall-reel-11", title: "Wilderness reel 11", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:42" },
  { id: "ryan-demo", title: "Talking-head reel", client: "Ryan", category: "reels", aspect: "vertical", length: "0:57" },
  { id: "perception-reel-2", title: "Reel 02", client: "Perception Studios", category: "reels", aspect: "vertical", length: "0:57" },
  { id: "randall-reel-9", title: "Wilderness reel 09", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:40" },
  { id: "randall-reel-10", title: "Wilderness reel 10", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:29" },
  { id: "randall-reel-april", title: "April reel", client: "Randall Shaw", category: "reels", aspect: "vertical", length: "0:19" },
  { id: "morning-mistakes", title: "Morning mistakes", category: "reels", aspect: "vertical", length: "0:59" },
  { id: "lose-weight", title: "You don't need $250,000 to lose weight", category: "reels", aspect: "vertical", length: "1:23" },
  { id: "4000-kcals", title: "4,000 kcal in a day", category: "reels", aspect: "vertical", length: "1:30" },
  { id: "creatine", title: "Creatine, explained", category: "reels", aspect: "vertical", length: "0:58" },

  // Meta AI UGC ads
  { id: "ugc-cerca", title: "Dating app ad", client: "Cerca", category: "ugc", aspect: "vertical", length: "0:29" },
  { id: "ugc-boy", title: "AI UGC ad, full cut", category: "ugc", aspect: "vertical", length: "0:35" },
  { id: "ugc-test-package", title: "AI UGC test package", category: "ugc", aspect: "vertical", length: "1:41" },
  { id: "ai-commercial-1", title: "AI cinematic commercial", category: "ugc", aspect: "vertical", length: "0:15" },
  { id: "ai-vertical-ad", title: "AI animated vertical ad", category: "ugc", aspect: "vertical", length: "0:12" },

  // Motion & SaaS
  { id: "base360", title: "Founder film: a $1B rental company run on AI", client: "Base360", category: "motion", aspect: "horizontal", length: "2:40", note: "A founder-led product film: talking head, UI walkthroughs and motion captions in one story." },
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
export const HERO_REEL = ["randall-reel-1", "ht-human-friendly-robotics", "ugc-cerca", "caravan-open-recap", "ai-vertical-ad", "perception-reel-1"];

export const CLIENTS = ["The Caravan Podcast", "Superintelligence", "Base360", "Randall Shaw", "Cerca", "Perception Studios", "Robinsons Roofing", "Neel Patel"];

/** Full episodes on YouTube. Add an entry with the video id (the part after watch?v=). */
export interface Episode {
  youtubeId: string;
  show: string;
  title: string;
  length: string;
}

export const EPISODES: Episode[] = [
  { youtubeId: "UFQYuy2KIXE", show: "Superintelligence", title: "Open-source AI vs. frontier models: DataCamp's real-world test", length: "51:02" },
];
