"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NAV } from "./nav-links";
import Button from "../ui/Button";
import { bookingUrl, site } from "@/content/site";
import { EASE } from "@/lib/motion";

/** Full-screen menu: large Display links numbered in mono. Esc closes; focus is trapped. */
export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const focusables = () => Array.from(el.querySelectorAll<HTMLElement>("a,button"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = focusables();
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const links = [{ href: "/", label: "Home" }, ...NAV, { href: "/contact", label: "Contact" }];
  return (
    <motion.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-0 z-[60] bg-ink px-5 md:px-12 pt-5 pb-8 flex flex-col overflow-y-auto lg:hidden"
    >
      <div className="flex items-center justify-between mb-10">
        <span className="t-mono text-text-3">Menu</span>
        <button type="button" onClick={onClose} className="h-11 rounded-full border border-muted px-4 t-mono">Close</button>
      </div>
      <nav aria-label="Mobile">
        <ol>
          {links.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.05 + i * 0.05 }}
              className="border-b border-muted/60"
            >
              <Link href={l.href} onClick={onClose} className="flex items-baseline gap-4 py-3">
                <span className="t-mono text-text-3 w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display font-light text-[34px] leading-none tracking-[-0.025em]">{l.label}</span>
              </Link>
            </motion.li>
          ))}
        </ol>
      </nav>
      <div className="mt-auto flex flex-col gap-4">
        <Button href={bookingUrl()} event="book_call_click" size="lg" className="justify-center">
          Book a call
        </Button>
        <a href={`mailto:${site.email}`} className="t-mono text-text-2 text-center">{site.email}</a>
      </div>
    </motion.div>
  );
}
