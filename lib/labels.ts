import type { PortfolioItem, ServiceSlug, Tag } from "@/content/portfolio";

export const SERVICE_LABEL: Record<ServiceSlug, string> = {
  "video-editing": "Video editing",
  "ai-video-editing": "AI",
  "meta-ads-ugc": "Meta ad",
  "saas-videos": "SaaS",
  "podcast-editing": "Podcast",
  "talking-head": "Talking head",
  more: "Brand film",
};

export const TAG_LABEL: Record<Tag, string> = {
  "long-form": "Long-form",
  "short-form": "Short-form",
  "motion-graphics": "Motion graphics",
};

export const ratio = (f: PortfolioItem["format"]) => (f === "vertical" ? "9:16" : f === "square" ? "1:1" : "16:9");

/** "9:16 · 00:42 · META AD" */
export const metaLine = (p: PortfolioItem) =>
  [ratio(p.format), p.duration ? `00:${p.duration}`.slice(-5).padStart(5, "0") : null, SERVICE_LABEL[p.services[0]]].filter(Boolean).join(" · ");
