"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHead from "./SectionHead";
import VideoPlayer from "../video/VideoPlayer";
import { services } from "@/content/services";
import { bySlug } from "@/content/portfolio";
import { EASE } from "@/lib/motion";

/**
 * Numbered service rows. Rows never change height: on hover (desktop) the tags cross-fade into a one-line summary,
 * and a small preview follows the cursor. The follow loop only runs while a row is hovered.
 */
export default function ServicesList({ index, head = true }: { index: number; head?: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const follower = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!fine || hover === null) return;
    let cx = target.current.x, cy = target.current.y, raf = 0;
    const move = (e: PointerEvent) => (target.current = { x: e.clientX, y: e.clientY });
    const loop = () => {
      cx += (target.current.x - cx) * 0.14;
      cy += (target.current.y - cy) * 0.14;
      if (follower.current) follower.current.style.transform = `translate3d(${cx + 28}px, ${cy - 90}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [fine, hover]);

  const sample = hover !== null ? bySlug(services[hover].sample) : null;

  return (
    <section className="wrap section">
      {head && <SectionHead index={index} label="Services" lines={["What we edit."]} />}
      <ol className={`${head ? "mt-14 md:mt-20" : ""} border-t border-muted/70`} onMouseLeave={() => setHover(null)}>
        {services.map((s, i) => {
          const on = hover === i;
          return (
            <li
              key={s.slug}
              className="border-b border-muted/70"
              onMouseEnter={(e) => {
                target.current = { x: e.clientX, y: e.clientY };
                setHover(i);
              }}
            >
              <Link href={`/services/${s.slug}`} className="group grid grid-cols-12 items-center gap-x-[var(--gutter)] gap-y-2 py-6 md:py-8">
                <span className="t-mono col-span-2 md:col-span-1 text-text-3">{s.number}</span>
                <span className={`col-span-10 md:col-span-5 font-display font-light text-[clamp(24px,2.4vw,38px)] leading-[1.1] tracking-[-0.02em] transition-[color,transform] duration-700 ease-studio ${on ? "translate-x-2 text-text" : "text-text-2"}`}>
                  {s.title}
                </span>
                {/* Tags and summary share one cell, so hovering never re-flows the list. */}
                <span className="relative col-span-12 col-start-3 md:col-span-6 md:col-start-7 grid">
                  <span className={`[grid-area:1/1] flex flex-wrap gap-2 md:justify-end transition-opacity duration-500 ${on && fine ? "opacity-0" : "opacity-100"}`}>
                    {s.tags.map((t) => (
                      <span key={t} className="t-mono rounded-full border border-muted px-3 py-1.5 text-text-2">{t}</span>
                    ))}
                  </span>
                  {fine && (
                    <span className={`[grid-area:1/1] self-center text-[15px] leading-snug text-text-2 md:text-right transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}>
                      {s.promise}
                    </span>
                  )}
                </span>
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
