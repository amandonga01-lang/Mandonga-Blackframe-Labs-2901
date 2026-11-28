"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero footage. The poster is the LCP image (server-rendered, priority); the muted loop fades in
 * once it is actually playing. Wide screens get the 16:9 cut, phones the 9:16 cut; only the visible one loads.
 * Reduced motion: poster only.
 */
export default function HeroVideo() {
  const [portrait, setPortrait] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-aspect-ratio: 4/5)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setPortrait(mq.matches);
    const on = () => setPortrait(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    setPlaying(false);
    ref.current?.play().catch(() => {});
  }, [portrait]);

  const src = portrait ? "/hero/hero-9x16.mp4" : "/hero/hero-16x9.mp4";
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <Image src="/hero/hero-16x9.jpg" alt="" fill priority sizes="100vw" className="hidden min-[640px]:block object-cover" />
      <Image src="/hero/hero-9x16.jpg" alt="" fill priority sizes="100vw" className="min-[640px]:hidden object-cover" />
      {portrait !== null && (
        <video
          ref={ref}
          key={src}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-studio ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {/* Legibility: dark from the left (text side) and the bottom; footage stays visible on the right. */}
      <div className="absolute inset-0 hidden min-[640px]:block bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
      {/* Phones: text covers the lower 60%, so dim the footage there much more (burned-in captions must not compete). */}
      <div className="absolute inset-0 min-[640px]:hidden bg-[linear-gradient(to_top,var(--ink)_0%,rgb(15_14_14/0.94)_45%,rgb(15_14_14/0.55)_70%,rgb(15_14_14/0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
