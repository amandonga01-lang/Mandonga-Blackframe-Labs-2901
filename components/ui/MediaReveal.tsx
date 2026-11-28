"use client";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Media reveal: scales 1.08 → 1 while the rounded clip opens up, once, on scroll. */
export default function MediaReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`overflow-hidden rounded-xl ${className}`}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(8% 6% 8% 6% round 40px)", opacity: 0.4 }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0% round 40px)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div initial={reduce ? false : { scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "0px 0px -15% 0px" }} transition={{ duration: 1.4, ease: EASE }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
