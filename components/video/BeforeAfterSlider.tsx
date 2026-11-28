"use client";
import { useEffect, useRef, useState } from "react";

/** Raw footage vs final edit, synced, with a draggable (and keyboard-accessible) split. */
export default function BeforeAfterSlider({ before, after, poster, labels = ["Raw footage", "Final edit"] }: { before: string; after: string; poster?: string; labels?: [string, string] }) {
  const box = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  // Keep the two videos in sync.
  useEffect(() => {
    const A = a.current!, B = b.current!;
    const sync = () => {
      if (Math.abs(A.currentTime - B.currentTime) > 0.08) B.currentTime = A.currentTime;
    };
    A.addEventListener("timeupdate", sync);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { A.play().catch(() => {}); B.play().catch(() => {}); }
      else { A.pause(); B.pause(); }
    });
    if (box.current) io.observe(box.current);
    return () => { A.removeEventListener("timeupdate", sync); io.disconnect(); };
  }, []);

  const setFrom = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className="relative aspect-video overflow-hidden rounded-xl bg-surface select-none touch-pan-y"
      onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); setFrom(e.clientX); }}
      onPointerMove={(e) => dragging.current && setFrom(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      <video ref={b} src={after} poster={poster} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <video ref={a} src={before} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <span className="t-mono absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5">{labels[0]}</span>
      <span className="t-mono absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1.5">{labels[1]}</span>
      <div className="absolute inset-y-0 w-px bg-signal" style={{ left: `${pos}%` }}>
        <button
          type="button"
          role="slider"
          aria-label="Compare raw footage and final edit"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-signal text-ink t-mono"
        >
          ⇆
        </button>
      </div>
    </div>
  );
}
