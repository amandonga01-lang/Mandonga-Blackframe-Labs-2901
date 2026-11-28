"use client";
import { useState } from "react";
import Link from "next/link";
import VideoCard from "../video/VideoCard";
import Lightbox from "../video/Lightbox";
import SectionHead from "./SectionHead";
import Reveal from "../type/Reveal";
import { portfolio, type PortfolioItem } from "@/content/portfolio";

// Editorial asymmetric placement on the 12-col grid (desktop). Slots are designed per format, and featured
// items are poured into them by format, so the layout holds whatever order the data file is in.
const PATTERN: { f: "L" | "V"; cls: string }[] = [
  { f: "L", cls: "md:col-span-9" },
  { f: "V", cls: "md:col-span-3 md:self-end" },
  { f: "V", cls: "md:col-span-3" },
  { f: "L", cls: "md:col-span-6 md:self-center" },
  { f: "V", cls: "md:col-span-3" },
  { f: "V", cls: "md:col-span-3" },
  { f: "V", cls: "md:col-span-3" },
  { f: "L", cls: "md:col-span-6 md:self-center" },
];

function arrange(items: PortfolioItem[]) {
  const L = items.filter((i) => i.format === "landscape");
  const V = items.filter((i) => i.format !== "landscape");
  const out: { item: PortfolioItem; cls: string }[] = [];
  for (const slot of PATTERN) {
    const item = (slot.f === "L" ? L : V).shift();
    if (item) out.push({ item, cls: slot.cls });
  }
  [...L, ...V].forEach((item) => out.push({ item, cls: "md:col-span-4" }));
  return out;
}

export default function SelectedWork({ index }: { index: number }) {
  const placed = arrange(portfolio.filter((p) => p.featured).slice(0, 8));
  const items = placed.map((p) => p.item);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="wrap section">
      <div className="grid-12 items-end gap-y-8">
        <SectionHead index={index} label="Selected work" lines={["Selected work."]} className="col-span-12 md:col-span-8" />
        <Reveal className="col-span-12 md:col-span-4 md:justify-self-end">
          <Link href="/work" className="t-mono text-text-2 hover:text-text inline-flex items-center gap-2">
            All work <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
      <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-12 gap-x-[var(--gutter)] gap-y-12 md:gap-y-16">
        {placed.map(({ item: it, cls }, i) => (
          <Reveal key={it.slug} delay={(i % 3) * 0.08} className={`${it.format === "landscape" ? "col-span-2" : "col-span-1"} ${cls}`}>
            <VideoCard item={it} onOpen={() => setOpen(i)} sizes={it.format === "landscape" ? "(max-width:768px) 100vw, 60vw" : "(max-width:768px) 50vw, 25vw"} />
          </Reveal>
        ))}
      </div>
      <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
