// Generated from the portfolio media manifest. Edit titles/clients freely;
// video and poster files live in /public/work.
export type WorkCategory = "ugc" | "reels" | "podcast" | "motion" | "realestate";

export interface WorkItem {
  id: string;
  title: string;
  client: string;
  category: WorkCategory;
  categoryLabel: string;
  summary: string;
  videoUrl: string;
  posterUrl: string;
  aspect: "vertical" | "horizontal";
  aspectLabel: string;
  duration: string;
  featured: boolean;
}

export const CATEGORY_ORDER: WorkCategory[] = ["ugc", "reels", "podcast", "motion", "realestate"];

export const CATEGORY_LABELS: Record<WorkCategory, string> = {
  ugc: "AI UGC Ads",
  reels: "Short-form Reels",
  podcast: "Podcasts & Interviews",
  motion: "Motion & SaaS",
  realestate: "Real Estate & Brand",
};

export const WORK: WorkItem[] = [
  {
    "id": "randall-reel-april",
    "title": "Randall — April Reel",
    "client": "Randall Shaw",
    "category": "reels",
    "categoryLabel": "Retention edit",
    "summary": "Short-form edit cut for retention: punchy hook, kinetic captions, sound design and pattern interrupts.",
    "videoUrl": "/work/randall-reel-april.mp4",
    "posterUrl": "/work/randall-reel-april.jpg",
    "aspect": "vertical",
    "aspectLabel": "9:16",
    "duration": "0:19",
    "featured": false
  },
  {
    "id": "morning-mistakes",
    "title": "Morning Mistakes",
    "client": "Fitness creator",
    "category": "reels",
    "categoryLabel": "Retention edit",
    "summary": "Short-form edit cut for retention: punchy hook, kinetic captions, sound design and pattern interrupts.",
    "videoUrl": "/work/morning-mistakes.mp4",
    "posterUrl": "/work/morning-mistakes.jpg",
    "aspect": "vertical",
    "aspectLabel": "9:16",
    "duration": "0:59",
    "featured": false
  },
  {
    "id": "4000-kcals",
    "title": "4,000 kcal in a Day",
    "client": "Fitness creator",
    "category": "reels",
    "categoryLabel": "Retention edit",
    "summary": "Short-form edit cut for retention: punchy hook, kinetic captions, sound design and pattern interrupts.",
    "videoUrl": "/work/4000-kcals.mp4",
    "posterUrl": "/work/4000-kcals.jpg",
    "aspect": "vertical",
    "aspectLabel": "9:16",
    "duration": "1:30",
    "featured": false
  },
  {
    "id": "lose-weight",
    "title": "You Don't Need $250,000 to Lose Weight",
    "client": "Fitness creator",
    "category": "reels",
    "categoryLabel": "Retention edit",
    "summary": "Short-form edit cut for retention: punchy hook, kinetic captions, sound design and pattern interrupts.",
    "videoUrl": "/work/lose-weight.mp4",
    "posterUrl": "/work/lose-weight.jpg",
    "aspect": "vertical",
    "aspectLabel": "9:16",
    "duration": "1:23",
    "featured": false
  },
  {
    "id": "caravan-new-york",
    "title": "Caravan — New York Vibe Edit",
    "client": "The Caravan",
    "category": "podcast",
    "categoryLabel": "Dialogue & captions",
    "summary": "Podcast and interview edit: multicam cutting, clean audio, branded captions and story-first pacing.",
    "videoUrl": "/work/caravan-new-york.mp4",
    "posterUrl": "/work/caravan-new-york.jpg",
    "aspect": "horizontal",
    "aspectLabel": "16:9",
    "duration": "0:55",
    "featured": true
  },
  {
    "id": "caravan-open-recap",
    "title": "Caravan Open — Event Recap",
    "client": "The Caravan",
    "category": "podcast",
    "categoryLabel": "Dialogue & captions",
    "summary": "Podcast and interview edit: multicam cutting, clean audio, branded captions and story-first pacing.",
    "videoUrl": "/work/caravan-open-recap.mp4",
    "posterUrl": "/work/caravan-open-recap.jpg",
    "aspect": "vertical",
    "aspectLabel": "9:16",
    "duration": "0:39",
    "featured": false
  },
  {
    "id": "caravan-ad",
    "title": "Caravan — Promo Ad",
    "client": "The Caravan",
    "category": "podcast",
    "categoryLabel": "Dialogue & captions",
    "summary": "Podcast and interview edit: multicam cutting, clean audio, branded captions and story-first pacing.",
    "videoUrl": "/work/caravan-ad.mp4",
    "posterUrl": "/work/caravan-ad.jpg",
    "aspect": "vertical",
    "aspectLabel": "9:16",
    "duration": "0:17",
    "featured": false
  },
  {
    "id": "ht-human-friendly-robotics",
    "title": "Human Friendly Robotics — Samoon Siddiqui",
    "client": "Interview series",
    "category": "podcast",
    "categoryLabel": "Dialogue & captions",
    "summary": "Podcast and interview edit: multicam cutting, clean audio, branded captions and story-first pacing.",
    "videoUrl": "/work/ht-human-friendly-robotics.mp4",
    "posterUrl": "/work/ht-human-friendly-robotics.jpg",
    "aspect": "vertical",
    "aspectLabel": "9:16",
    "duration": "0:49",
    "featured": false
  },
  {
    "id": "ht-iconavize",
    "title": "Iconavize — Afaf Saleh",
    "client": "Interview series",
    "category": "podcast",
    "categoryLabel": "Dialogue & captions",
    "summary": "Podcast and interview edit: multicam cutting, clean audio, branded captions and story-first pacing.",
    "videoUrl": "/work/ht-iconavize.mp4",
    "posterUrl": "/work/ht-iconavize.jpg",
    "aspect": "vertical",
    "aspectLabel": "9:16",
    "duration": "0:31",
    "featured": false
  },
  {
    "id": "tamebridge",
    "title": "Tamebridge Industrial Estate",
    "client": "Tamebridge",
    "category": "realestate",
    "categoryLabel": "Property film",
    "summary": "Real estate and brand film: smooth walkthrough pacing, colour grade and music-led storytelling.",
    "videoUrl": "/work/tamebridge.mp4",
    "posterUrl": "/work/tamebridge.jpg",
    "aspect": "horizontal",
    "aspectLabel": "16:9",
    "duration": "0:27",
    "featured": false
  },
  {
    "id": "robinson-roofing",
    "title": "Robinson Roofing",
    "client": "Robinson",
    "category": "realestate",
    "categoryLabel": "Property film",
    "summary": "Real estate and brand film: smooth walkthrough pacing, colour grade and music-led storytelling.",
    "videoUrl": "/work/robinson-roofing.mp4",
    "posterUrl": "/work/robinson-roofing.jpg",
    "aspect": "horizontal",
    "aspectLabel": "16:9",
    "duration": "0:37",
    "featured": false
  },
  {
    "id": "robinson-east-grinstead",
    "title": "Robinson — East Grinstead",
    "client": "Robinson",
    "category": "realestate",
    "categoryLabel": "Property film",
    "summary": "Real estate and brand film: smooth walkthrough pacing, colour grade and music-led storytelling.",
    "videoUrl": "/work/robinson-east-grinstead.mp4",
    "posterUrl": "/work/robinson-east-grinstead.jpg",
    "aspect": "horizontal",
    "aspectLabel": "16:9",
    "duration": "0:29",
    "featured": false
  },
  {
    "id": "false-ceiling",
    "title": "Best False Ceiling Designs",
    "client": "Interior brand",
    "category": "realestate",
    "categoryLabel": "Property film",
    "summary": "Real estate and brand film: smooth walkthrough pacing, colour grade and music-led storytelling.",
    "videoUrl": "/work/false-ceiling.mp4",
    "posterUrl": "/work/false-ceiling.jpg",
    "aspect": "horizontal",
    "aspectLabel": "16:9",
    "duration": "10:12",
    "featured": false
  }
];
