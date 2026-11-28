"use client";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import type { ElementType } from "react";

/**
 * Headline whose lines slide up from a mask, staggered. Pass `lines` explicitly so the break points are designed, not accidental.
 * `immediate` animates on mount (heroes); otherwise it plays when scrolled into view.
 */
export default function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  immediate = false,
  delay = 0,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const variants = {
    hidden: { y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 },
    show: (i: number) => ({ y: "0%", opacity: 1, transition: { duration: reduce ? 0.2 : 1.1, ease: EASE, delay: delay + i * 0.08 } }),
  };
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span className="block" custom={i} variants={variants} initial="hidden" {...trigger}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
