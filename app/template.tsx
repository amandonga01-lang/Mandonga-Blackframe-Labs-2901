"use client";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

// The first page load renders instantly (no overlay), so the hero poster stays the LCP element.
let firstLoad = true;

/** Route change = a cut: one black frame that fades away while the new page settles in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = !firstLoad && !reduce;
  firstLoad = false;
  return (
    <>
      {animate && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[65] bg-ink pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
        />
      )}
      <motion.div initial={animate ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
        {children}
      </motion.div>
    </>
  );
}
