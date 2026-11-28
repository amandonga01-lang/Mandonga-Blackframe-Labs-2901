"use client";
import { useState } from "react";
import VideoCard from "../video/VideoCard";
import Lightbox from "../video/Lightbox";
import { bySlug, type PortfolioItem } from "@/content/portfolio";

export default function CaseGallery({ slugs }: { slugs: string[] }) {
  const items = slugs.map(bySlug).filter(Boolean) as PortfolioItem[];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-[var(--gutter)] gap-y-12">
        {items.map((it, i) => (
          <div key={it.slug} className={it.format === "landscape" ? "col-span-2" : ""}>
            <VideoCard item={it} onOpen={() => setOpen(i)} />
          </div>
        ))}
      </div>
      <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
