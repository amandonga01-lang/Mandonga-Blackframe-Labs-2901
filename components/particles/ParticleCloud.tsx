"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ParticleScene = dynamic(() => import("./ParticleScene"), { ssr: false });

/**
 * A contained point cloud that cycles through edit-bay shapes, inside its own reserved column (never behind text).
 * Desktop with a fine pointer and WebGL only; off for reduced motion and Save-Data. Loads when near the viewport
 * and stops rendering when out of view.
 */
export default function ParticleCloud({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {}
    setAllowed(!reduce && desktop && webgl && !nav.connection?.saveData);
  }, []);

  useEffect(() => {
    if (!allowed || !box.current) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting) setNear(true);
    }, { rootMargin: "300px 0px" });
    io.observe(box.current);
    return () => io.disconnect();
  }, [allowed]);

  return (
    <div ref={box} aria-hidden="true" className={`relative ${className}`}>
      {allowed && near && (
        <div className="absolute inset-0 transition-opacity duration-[1500ms] ease-studio" style={{ opacity: ready ? 1 : 0 }}>
          <ParticleScene count={5200} active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
