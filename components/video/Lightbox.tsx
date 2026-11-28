"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import Button from "../ui/Button";
import type { PortfolioItem } from "@/content/portfolio";
import { SERVICE_LABEL, metaLine } from "@/lib/labels";
import { EASE } from "@/lib/motion";
import { track } from "@/lib/analytics";
import { bookingUrl } from "@/content/site";

type Props = { items: PortfolioItem[]; index: number | null; onIndex: (i: number) => void; onClose: () => void };

/** Full-screen dark player with sound, metadata and next/previous. Esc closes; swipe down closes on touch. */
export default function Lightbox({ items, index, onIndex, onClose }: Props) {
  const open = index !== null && !!items[index];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(<AnimatePresence>{open && <Inner items={items} index={index!} onIndex={onIndex} onClose={onClose} />}</AnimatePresence>, document.body);
}

function Inner({ items, index, onIndex, onClose }: { items: PortfolioItem[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const item = items[index];
  const panel = useRef<HTMLDivElement>(null);
  const touchY = useRef<number | null>(null);
  const prev = () => onIndex((index - 1 + items.length) % items.length);
  const next = () => onIndex((index + 1) % items.length);

  // Open/close: scroll lock, Lenis pause, initial focus, focus restore. Runs once per open.
  useEffect(() => {
    const lastFocus = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      lastFocus?.focus();
    };
  }, []);

  // Keys, in the capture phase so native video controls can't swallow Esc.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Tab" && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>("button, a, video[controls]"));
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length, onClose]);

  const vertical = item.format === "vertical";
  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchY.current = e.touches[0].clientY)}
      onTouchEnd={(e) => {
        if (touchY.current !== null && e.changedTouches[0].clientY - touchY.current > 120) onClose();
        touchY.current = null;
      }}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        initial={{ y: 24, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="absolute inset-2 md:inset-6 flex flex-col lg:flex-row overflow-hidden rounded-xl border border-muted bg-surface shadow-[0_20px_60px_rgba(0,0,0,.45)]"
      >
        <div className="relative flex-1 min-h-0 flex items-center justify-center bg-black p-2 md:p-6">
          <VideoPlayer
            key={item.slug}
            src={item.fullSrc}
            poster={item.poster}
            mode="full"
            autoPlay
            controls
            lazy={false}
            label={`${item.title} video`}
            objectFit="contain"
            onPlay={() => track("video_play", { slug: item.slug, where: "lightbox" })}
            className={`max-h-full rounded-lg ${vertical ? "h-full aspect-[9/16] max-w-full" : "w-full aspect-video"}`}
          />
        </div>
        <aside className="lg:w-[380px] shrink-0 border-t lg:border-t-0 lg:border-l border-muted p-6 md:p-8 flex flex-col gap-5 overflow-y-auto max-h-[42vh] lg:max-h-none">
          <div className="flex items-center justify-between gap-3">
            <span className="t-mono text-text-3">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            <div className="flex gap-2">
              <IconBtn onClick={prev} label="Previous video">←</IconBtn>
              <IconBtn onClick={next} label="Next video">→</IconBtn>
              <IconBtn onClick={onClose} label="Close" autofocus>✕</IconBtn>
            </div>
          </div>
          <div>
            <p className="t-mono text-text-3">{metaLine(item)}</p>
            <h2 className="t-h3 mt-3">{item.title}</h2>
            {item.client && <p className="mt-1 text-text-2">{item.client}</p>}
          </div>
          <ul className="flex flex-wrap gap-2">
            {item.services.map((s) => (
              <li key={s} className="t-mono rounded-full border border-muted px-3 py-1.5 text-text-2">{SERVICE_LABEL[s]}</li>
            ))}
          </ul>
          {item.description && <p className="text-text-2 text-[16px]">{item.description}</p>}
          {item.results && item.results.length > 0 && (
            <dl className="grid grid-cols-2 gap-4 border-t border-muted pt-5">
              {item.results.map((r) => (
                <div key={r.label}>
                  <dt className="t-mono text-text-3">{r.label}</dt>
                  <dd className="font-display text-[32px] font-light leading-none mt-1">{r.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-auto pt-4">
            <Button href={bookingUrl()} event="book_call_click" className="w-full justify-center">Book a call about this</Button>
          </div>
        </aside>
      </motion.div>
    </motion.div>
  );
}

function IconBtn({ onClick, label, children, autofocus }: { onClick: () => void; label: string; children: React.ReactNode; autofocus?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-autofocus={autofocus ? "" : undefined}
      className="h-10 w-10 rounded-full border border-muted text-text-2 transition-colors duration-500 hover:border-text hover:text-text"
    >
      {children}
    </button>
  );
}
