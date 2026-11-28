"use client";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className="border-t border-muted/70">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q} className="border-b border-muted/70">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-baseline justify-between gap-6 py-6 text-left text-[clamp(19px,1.6vw,24px)]"
              >
                {it.q}
                <span aria-hidden="true" className={`t-mono text-text-3 transition-transform duration-700 ease-studio ${isOpen ? "rotate-45 text-signal" : ""}`}>+</span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="t-body pb-8 pr-10">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
