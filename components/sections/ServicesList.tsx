"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHead from "./SectionHead";
import VideoPlayer from "../video/VideoPlayer";
import { services } from "@/content/services";
import { bySlug } from "@/content/portfolio";
import { EASE } from "@/lib/motion";

/** Numbered service rows. Desktop: a small rounded preview follows the cursor and the row's summary opens. */
export default function ServicesList({ index }: { index: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const follower = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!fine) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.14;
      cy += (y - cy) * 0.14;
      if (follower.current) follower.current.style.transform = `translate3d(${cx + 28}px, ${cy - 90}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [fine]);

  const sample = hover !== null ? bySlug(services[hover].sample) : null;

  return (
    <section className="wrap section">
      <SectionHead index={index} label="Services" lines={["What we **edit.**"]} />
      <ol className="mt-16 md:mt-24 border-t border-muted/70" onMouseLeave={() => setHover(null)}>
        {services.map((s, i) => {
          const open = hover === i || !fine;
          const thumb = bySlug(s.sample);
          return (
            <li key={s.slug} className="border-b border-muted/70" onMouseEnter={() => setHover(i)}>
              <Link href={`/services/${s.slug}`} className="group grid grid-cols-12 gap-x-[var(--gutter)] gap-y-3 py-8 md:py-10 items-baseline">
                <span className="t-mono text-text-3 col-span-2 md:col-span-1">{s.number}</span>
                <span className="col-span-10 md:col-span-6 font-display font-light text-[clamp(26px,2.6vw,42px)] leading-[1.05] tracking-[-0.025em] text-text-2 group-hover:text-text transition-[color,transform] duration-700 ease-studio group-hover:translate-x-2">
                  {s.title}
                </span>
                <span className="hidden md:flex col-span-5 flex-wrap justify-end gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="t-mono rounded-full border border-muted px-3 py-1.5 text-text-2">{t}</span>
                  ))}
                </span>
                <motion.span
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="col-span-12 md:col-start-2 md:col-span-6 overflow-hidden"
                >
                  <span className="flex items-start gap-4 pt-2">
                    {!fine && thumb && (
                      <Image src={thumb.poster} alt="" width={64} height={64} className={`shrink-0 rounded-sm object-cover ${thumb.format === "vertical" ? "h-20 w-12" : "h-12 w-20"}`} />
                    )}
                    <span className="t-body text-[17px]">{s.summary}</span>
                  </span>
                </motion.span>
              </Link>
            </li>
          );
        })}
      </ol>
      {fine && (
        <div ref={follower} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[55]">
          <AnimatePresence>
            {sample && (
              <motion.div
                key={sample.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`overflow-hidden rounded-md border border-muted bg-surface ${sample.format === "vertical" ? "w-[150px] aspect-[9/16]" : "w-[260px] aspect-video"}`}
              >
                <VideoPlayer src={sample.previewSrc} poster={sample.poster} mode="preview" active lazy={false} className="h-full w-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
