"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only cursor: an 8px dot that grows into a "Play" circle over anything
 * marked data-cursor="play". The native cursor stays visible for accessibility.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"dot" | "play" | "hidden">("hidden");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setMode(t?.getAttribute("data-cursor") === "play" ? "play" : "dot");
    };
    const leave = () => setMode("hidden");
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  const size = mode === "play" ? 76 : 8;
  return (
    <div ref={ref} aria-hidden="true" className="fixed left-0 top-0 z-[80] pointer-events-none" style={{ opacity: mode === "hidden" ? 0 : 1 }}>
      <div
        className="flex items-center justify-center rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-500 ease-studio"
        style={{ width: size, height: size, background: mode === "play" ? "rgb(254 46 75 / 0.92)" : "#fff", mixBlendMode: mode === "play" ? "normal" : "difference" }}
      >
        {mode === "play" && <span className="t-mono text-ink">Play</span>}
      </div>
    </div>
  );
}
