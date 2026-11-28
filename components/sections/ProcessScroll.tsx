"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import SectionHead from "./SectionHead";
import { process } from "@/content/process";

/** Desktop: the steps scroll sideways like a timeline while the section is pinned. Mobile / reduced motion: a plain list. */
export default function ProcessScroll({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-58%"]);
  const head = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = process.map((s, i) => (
    <li key={s.title} className="relative shrink-0 md:w-[min(34vw,460px)] border-t border-muted pt-8 pr-10">
      <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-[3px] bg-muted" aria-hidden="true" />
      <p className="t-mono text-text-3">{String(i + 1).padStart(2, "0")} / {s.time}</p>
      <h3 className="t-h3 mt-4">{s.title}</h3>
      <p className="t-body mt-3 text-[17px]">{s.body}</p>
    </li>
  ));

  return (
    <section ref={ref} className="relative md:h-[260vh]">
      <div className="md:sticky md:top-0 md:h-[100svh] md:flex md:flex-col md:justify-center overflow-hidden section md:py-0">
        <div className="wrap">
          <SectionHead index={index} label="Process" lines={["Footage in.", "Finished edits out."]} />
        </div>
        <div className="wrap mt-16 md:mt-20 w-full">
          {reduce ? (
            <ol className="grid gap-10 md:grid-cols-5">{steps}</ol>
          ) : (
            <>
              <ol className="flex flex-col gap-12 md:hidden">{steps}</ol>
              <div className="relative hidden md:block">
                <motion.div aria-hidden="true" className="absolute -top-px left-0 h-px bg-signal origin-left w-full" style={{ scaleX: scrollYProgress }} />
                <motion.span aria-hidden="true" className="absolute -top-[6px] h-[11px] w-[11px] -ml-[5px] rounded-[3px] bg-signal" style={{ left: head }} />
                <motion.ol className="flex gap-[var(--gutter)]" style={{ x }}>{steps}</motion.ol>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
