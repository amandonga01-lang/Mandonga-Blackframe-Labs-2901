"use client";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import type { ElementType } from "react";
import Rich, { plain } from "./Rich";

/**
 * Headline whose lines slide up from a mask, staggered. Pass `lines` explicitly so the break points are designed.
 * `immediate` animates on mount (heroes); otherwise it plays once the headline scrolls into view.
 * The in-view trigger sits on the wrapper: the hidden lines are clipped by their masks, so they can't observe themselves.
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
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } };
  const line = {
    hidden: { y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 },
    show: { y: "0%", opacity: 1, transition: { duration: reduce ? 0.2 : 1.1, ease: EASE } },
  };
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <Tag className={className} aria-label={plain(lines.join(" "))}>
      <motion.span className="block" variants={container} initial="hidden" {...trigger}>
        {lines.map((l, i) => (
          <span key={i} aria-hidden="true" className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
            <motion.span className="block" variants={line}>
              <Rich text={l} />
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
