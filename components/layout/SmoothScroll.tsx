"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/** Gentle Lenis on desktop only. Touch devices and reduced-motion users keep native scroll. */
export default function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
