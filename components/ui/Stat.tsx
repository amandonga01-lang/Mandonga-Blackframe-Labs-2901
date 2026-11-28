"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Count-up stat. Non-numeric values (e.g. "24–48") are shown as-is. */
export default function Stat({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const target = /^\d+(\.\d+)?$/.test(value) ? parseFloat(value) : null;
  const [n, setN] = useState(target === null || reduce ? value : "0");

  useEffect(() => {
    if (!inView || target === null || reduce) return;
    const start = performance.now();
    const dur = 1600;
    const dec = value.includes(".") ? value.split(".")[1].length : 0;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN((target * eased).toFixed(dec));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduce, value]);

  return (
    <div ref={ref}>
      <p className="font-display font-light text-[clamp(40px,4vw,64px)] leading-none tracking-[-0.03em] tabular-nums">
        {n}
        <span className="text-text-3">{suffix}</span>
      </p>
      <p className="t-mono text-text-2 mt-4 max-w-[22ch]">{label}</p>
    </div>
  );
}
