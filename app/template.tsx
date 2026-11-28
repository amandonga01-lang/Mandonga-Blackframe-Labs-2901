"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

type W = Window & { __bfNavigated?: boolean };

/**
 * Route change = a cut: one black frame that fades away while the new page settles in.
 * The very first load renders instantly (server and client agree: no overlay), so the hero poster stays the LCP element.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [animate] = useState(() => typeof window !== "undefined" && !!(window as W).__bfNavigated);
  useEffect(() => {
    (window as W).__bfNavigated = true;
  }, []);
  const on = animate && !reduce;
  return (
    <>
      {on && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[65] bg-ink pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
        />
      )}
      <motion.div initial={on ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
        {children}
      </motion.div>
    </>
  );
}
