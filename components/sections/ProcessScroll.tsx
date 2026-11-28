"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHead from "./SectionHead";
import { process } from "@/content/process";

/**
 * Desktop (motion allowed): the section pins and the steps travel sideways like a timeline. The travel distance is
 * measured from the real track width, so the last step always lands fully in view.
 * Mobile or reduced motion: a plain list, no pinning, no extra height.
 */
export default function ProcessScroll({ index }: { index: number }) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  // Hold still for the first and last 8% so the start and end states are readable.
  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -dist], { clamp: true });

  useEffect(() => {
    const measure = () => {
      if (!track.current || !viewport.current) return;
      setDist(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    if (viewport.current) ro.observe(viewport.current);
    return () => ro.disconnect();
  }, []);

  const steps = process.map((s, i) => (
    <li key={s.title} className="relative border-t border-muted pt-8 pr-8 md:shrink-0 md:w-[380px]">
      <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-[3px] bg-muted" aria-hidden="true" />
      <p className="t-mono text-text-3">{String(i + 1).padStart(2, "0")} / {s.time}</p>
      <h3 className="t-h3 mt-4">{s.title}</h3>
      <p className="t-body mt-3">{s.body}</p>
    </li>
  ));

  return (
    <section ref={section} className="relative motion-safe:md:h-[240vh]">
      <div className="section motion-safe:md:sticky motion-safe:md:top-0 motion-safe:md:flex motion-safe:md:h-[100svh] motion-safe:md:flex-col motion-safe:md:justify-center motion-safe:md:py-0 overflow-hidden">
        <div className="wrap w-full">
          <SectionHead index={index} label="Process" lines={["Footage in.", "**Finished edits out.**"]} />
        </div>
        <div className="wrap w-full mt-14 md:mt-20">
          {/* Mobile + reduced motion: plain list */}
          <ol className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 motion-safe:md:hidden">{steps}</ol>
          {/* Desktop with motion: pinned horizontal track */}
          <div ref={viewport} className="relative hidden motion-safe:md:block">
            <motion.ol ref={track} className="flex gap-[var(--gutter)]" style={{ x }}>
              {steps}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  );
}
