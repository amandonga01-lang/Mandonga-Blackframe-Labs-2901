"use client";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import VideoCard from "../video/VideoCard";
import Lightbox from "../video/Lightbox";
import YouTubeEmbed from "../video/YouTubeEmbed";
import { FILTERS, matches, toRows, type FilterId, type FormatId } from "./filters";
import { episodes, portfolio } from "@/content/portfolio";
import { EASE } from "@/lib/motion";

/** Filters (pill chips) + format toggle + aspect-aware grid + deep-linkable lightbox (/work?v=slug). */
export default function WorkBrowser({ only }: { only?: FilterId }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filter = (only ?? (params.get("filter") as FilterId) ?? "all") as FilterId;
  const format = (params.get("format") as FormatId) ?? "all";
  const v = params.get("v");

  const items = useMemo(() => portfolio.filter((p) => matches(p, FILTERS.some((f) => f.id === filter) ? filter : "all", format)), [filter, format]);
  const rows = useMemo(() => toRows(items), [items]);
  const openIndex = v ? items.findIndex((p) => p.slug === v) : -1;

  const setParam = (k: string, val: string | null) => {
    const q = new URLSearchParams(params.toString());
    if (val === null || val === "all") q.delete(k);
    else q.set(k, val);
    const s = q.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const showEpisodes = !only && (filter === "all" || filter === "podcast-editing" || filter === "long-form") && format !== "vertical" && episodes.length > 0;

  return (
    <>
      {!only && (
        <div className="sticky top-[76px] md:top-24 z-30 mt-12 -mx-[var(--margin)] px-[var(--margin)] py-3 flex flex-col md:flex-row md:items-center gap-3 bg-ink/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
          <div role="toolbar" aria-label="Filter by service" className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              const count = portfolio.filter((p) => matches(p, f.id, format)).length;
              if (!count && f.id !== "all") return null;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setParam("filter", f.id)}
                  className={`t-mono shrink-0 rounded-full border px-4 py-2.5 backdrop-blur-md transition-colors duration-500 ${
                    active ? "border-signal bg-signal text-ink" : "border-muted bg-ink/70 text-text-2 hover:border-text hover:text-text"
                  }`}
                >
                  {f.label} <span>{count}</span>
                </button>
              );
            })}
          </div>
          <div role="radiogroup" aria-label="Format" className="flex w-fit shrink-0 rounded-full border border-muted bg-ink/70 p-1 backdrop-blur-md">
            {(["all", "landscape", "vertical"] as FormatId[]).map((f) => (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={format === f}
                onClick={() => setParam("format", f)}
                className={`t-mono rounded-full px-3.5 py-2 transition-colors duration-500 ${format === f ? "bg-text text-ink" : "text-text-2 hover:text-text"}`}
              >
                {f === "all" ? "All" : f === "landscape" ? "16:9" : "9:16"}
              </button>
            ))}
          </div>
        </div>
      )}

      {showEpisodes && (
        <section aria-label="Full episodes" className="mt-16">
          <h2 className="t-mono text-text-3">Full episodes</h2>
          <div className="mt-6 grid gap-[var(--gutter)] md:grid-cols-2">
            {episodes.map((ep) => <YouTubeEmbed key={ep.youtubeId} ep={ep} />)}
          </div>
        </section>
      )}

      <LayoutGroup>
        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          <AnimatePresence mode="popLayout">
            {rows.map((row, r) => (
              <motion.div
                key={row.items.map((i) => i.slug).join("|")}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: Math.min(r, 4) * 0.05 }}
                className={`grid gap-x-[var(--gutter)] gap-y-12 ${row.kind === "vertical" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"}`}
              >
                {row.items.map((it) => (
                  <VideoCard
                    key={it.slug}
                    item={it}
                    onOpen={() => setParam("v", it.slug)}
                    sizes={row.kind === "vertical" ? "(max-width:768px) 50vw, 25vw" : "(max-width:768px) 100vw, 50vw"}
                  />
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
          {items.length === 0 && <p className="t-body">Nothing in this combination yet. Try another filter.</p>}
        </div>
      </LayoutGroup>

      <Lightbox
        items={items}
        index={openIndex >= 0 ? openIndex : null}
        onIndex={(i) => setParam("v", items[i].slug)}
        onClose={() => setParam("v", null)}
      />
    </>
  );
}
