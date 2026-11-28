"use client";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import type { ReactNode } from "react";

/** Calm fade + small rise when scrolled into view. */
export default function Reveal({ children, delay = 0, className = "", y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
