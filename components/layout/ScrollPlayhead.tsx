"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** Scroll progress drawn as a timeline playhead: a thin red line with a small handle. */
export default function ScrollPlayhead() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const left = useTransform(p, (v) => `${v * 100}%`);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[2px] pointer-events-none">
      <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-signal" style={{ scaleX: p }} />
      <motion.div className="absolute -top-[3px] h-2 w-2 -ml-1 rounded-full bg-signal" style={{ left }} />
    </div>
  );
}
