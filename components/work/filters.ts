import type { PortfolioItem, ServiceSlug, Tag } from "@/content/portfolio";

export type FilterId = "all" | ServiceSlug | Tag;

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "video-editing", label: "Video Editing" },
  { id: "ai-video-editing", label: "AI" },
  { id: "meta-ads-ugc", label: "Meta Ads & UGC" },
  { id: "saas-videos", label: "SaaS" },
  { id: "podcast-editing", label: "Podcast" },
  { id: "talking-head", label: "Talking Head" },
  { id: "long-form", label: "Long-form" },
  { id: "short-form", label: "Short-form" },
  { id: "motion-graphics", label: "Motion graphics" },
];

export type FormatId = "all" | "landscape" | "vertical";

export const matches = (p: PortfolioItem, f: FilterId, fmt: FormatId) => {
  const okF = f === "all" || p.services.includes(f as ServiceSlug) || (p.tags ?? []).includes(f as Tag);
  const okFmt = fmt === "all" || (fmt === "vertical" ? p.format !== "landscape" : p.format === "landscape");
  return okF && okFmt;
};

/** Aspect-aware rows: verticals in rows of `v`, landscapes in rows of `l`, in order of first appearance. */
export function toRows(items: PortfolioItem[], v = 4, l = 2) {
  const rows: { kind: "vertical" | "landscape"; items: PortfolioItem[] }[] = [];
  const V = items.filter((i) => i.format !== "landscape");
  const L = items.filter((i) => i.format === "landscape");
  // Interleave: one landscape row after every two vertical rows keeps the rhythm varied.
  while (V.length || L.length) {
    for (let k = 0; k < 2 && V.length; k++) rows.push({ kind: "vertical", items: V.splice(0, v) });
    if (L.length) rows.push({ kind: "landscape", items: L.splice(0, l) });
  }
  return rows;
}
