"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { isLowPower } from "@/lib/device";

const TimelineScene = dynamic(() => import("./TimelineScene"), { ssr: false });

/**
 * Loads the WebGL timeline only on capable desktops, after the page is idle.
 * The CSS scene (#hero-css) is the instant poster; the canvas fades in over it when the video is playing.
 * Scroll progress drives the playhead / hand-off; the scene stops once the hero has scrolled away.
 */
export default function HeroScene() {
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [gone, setGone] = useState(false);
  const progress = useRef(0);

  useEffect(() => {
    if (isLowPower()) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => setLoad(true);
    if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 2500 });
    else setTimeout(go, 1200);
  }, []);

  useEffect(() => {
    if (!load) return;
    const onScroll = () => {
      const h = window.innerHeight;
      const p = Math.min(1.2, window.scrollY / (h * 0.9));
      progress.current = p;
      setGone(p >= 1.1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [load]);

  const onReady = useCallback(() => {
    setReady(true);
    const css = document.getElementById("hero-css");
    if (css) css.style.opacity = "0";
  }, []);

  if (!load || gone) return null;
  return (
    <div aria-hidden="true" className="absolute inset-0 transition-opacity duration-[1200ms] ease-studio" style={{ opacity: ready ? 1 : 0 }}>
      <TimelineScene onReady={onReady} progress={progress} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
