"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ShapeName } from "@/lib/shapes";

const ParticleScene = dynamic(() => import("./ParticleScene"), { ssr: false });

/**
 * Fixed, page-wide particle cloud behind the content (pointer-events: none).
 * Sections declare what they want with data-shape="play|phone|timeline|mic|wave|globe|scatter"
 * and data-side="right|center|left". Off for reduced motion, Save-Data and devices without WebGL;
 * desktop only (phones and tablets keep the page light).
 */
export default function ParticleField() {
  const [cfg, setCfg] = useState<{ count: number; opacity: number } | null>(null);
  const [ready, setReady] = useState(false);
  const shape = useRef<ShapeName>("play");
  const side = useRef(0.24);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {}
    if (reduce || nav.connection?.saveData || !webgl) return;
    // Phones and tablets skip it: the cloud is subtle there, and three.js costs ~0.5 s of main-thread time on mobile.
    const small = window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;
    if (small) return;
    const weak = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    const go = () => setCfg(weak ? { count: 3500, opacity: 0.8 } : { count: 7000, opacity: 1 });
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 2000 });
    else setTimeout(go, 800);
  }, []);

  // Pick the section nearest the middle of the screen.
  useEffect(() => {
    if (!cfg) return;
    const sideOf = (v: string | null) => (v === "center" ? 0 : v === "mid" ? 0.08 : v === "left" ? -0.24 : 0.24);
    let raf = 0;
    const pick = () => {
      raf = 0;
      const mid = innerHeight * 0.5;
      let best: HTMLElement | null = null;
      for (const el of document.querySelectorAll<HTMLElement>("[data-shape]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) { best = el; break; }
      }
      // Outside any section (e.g. the footer) the cloud dissolves into dust.
      shape.current = best ? (best.dataset.shape as ShapeName) : "scatter";
      side.current = best ? sideOf(best.dataset.side ?? null) : 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pick); };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [cfg]);

  if (!cfg) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-[1500ms] ease-studio" style={{ opacity: ready ? 1 : 0 }}>
      <ParticleScene shape={shape} side={side} count={cfg.count} opacity={cfg.opacity} onReady={() => setReady(true)} />
    </div>
  );
}
