"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import VideoPlayer, { type VideoPlayerHandle } from "./VideoPlayer";
import { showreel } from "@/content/portfolio";
import { track } from "@/lib/analytics";

/**
 * Large rounded showreel. Muted preview loops in view; click = play the full reel from the start,
 * with sound if the reel has it, plus minimal custom controls (play/pause, sound, scrub, full-screen).
 */
export default function ShowreelPlayer({ id = "showreel" }: { id?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const player = useRef<VideoPlayerHandle>(null);
  const [inView, setInView] = useState(false);
  const [full, setFull] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(!showreel.hasSound);
  const [t, setT] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  const v = () => player.current?.el ?? null;
  const start = () => {
    setFull(true);
    track("video_play", { slug: "showreel", where: "home" });
    requestAnimationFrame(() => {
      const el = v();
      if (!el) return;
      el.currentTime = 0;
      el.muted = !showreel.hasSound;
      el.play().catch(() => {});
    });
  };
  const toggle = () => {
    const el = v();
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <div ref={wrap} id={id} className="relative overflow-hidden rounded-xl bg-surface aspect-video scroll-mt-28">
      {!full ? (
        <button type="button" onClick={start} data-cursor="play" className="group absolute inset-0">
          <Image src={showreel.poster} alt="" fill sizes="100vw" className="object-cover" />
          <VideoPlayer src={showreel.previewSrc} mode="preview" active={inView} className="absolute inset-0 h-full w-full" />
          <span className="absolute left-5 bottom-5 md:left-8 md:bottom-8 flex items-center gap-3 rounded-full bg-ink/70 backdrop-blur px-4 py-2.5 t-mono text-text transition-colors duration-500 group-hover:bg-signal group-hover:text-ink">
            ▶ Play showreel · 00:36
          </span>
        </button>
      ) : (
        <>
          <VideoPlayer
            ref={player}
            src={showreel.fullSrc}
            poster={showreel.poster}
            mode="full"
            lazy={false}
            label="Showreel"
            className="absolute inset-0 h-full w-full"
          />
          <Controls
            getEl={v}
            playing={playing}
            setPlaying={setPlaying}
            muted={muted}
            setMuted={setMuted}
            t={t}
            setT={setT}
            onToggle={toggle}
            wrap={wrap}
          />
        </>
      )}
    </div>
  );
}

function Controls({
  getEl, playing, setPlaying, muted, setMuted, t, setT, onToggle, wrap,
}: {
  getEl: () => HTMLVideoElement | null;
  playing: boolean; setPlaying: (b: boolean) => void;
  muted: boolean; setMuted: (b: boolean) => void;
  t: number; setT: (n: number) => void;
  onToggle: () => void;
  wrap: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const el = getEl();
    if (!el) return;
    const up = () => setT(el.duration ? el.currentTime / el.duration : 0);
    const p = () => setPlaying(true), s = () => setPlaying(false);
    el.addEventListener("timeupdate", up);
    el.addEventListener("play", p);
    el.addEventListener("pause", s);
    return () => {
      el.removeEventListener("timeupdate", up);
      el.removeEventListener("play", p);
      el.removeEventListener("pause", s);
    };
  }, [getEl, setPlaying, setT]);

  return (
    <div className="absolute inset-x-3 bottom-3 md:inset-x-6 md:bottom-6 flex items-center gap-3 rounded-full bg-ink/70 backdrop-blur px-3 py-2">
      <button type="button" onClick={onToggle} className="h-9 w-9 rounded-full hover:bg-surface-2 t-mono" aria-label={playing ? "Pause" : "Play"}>
        {playing ? "❚❚" : "▶"}
      </button>
      <input
        type="range"
        min={0}
        max={1000}
        value={Math.round(t * 1000)}
        onChange={(e) => {
          const el = getEl();
          if (el?.duration) el.currentTime = (Number(e.target.value) / 1000) * el.duration;
        }}
        aria-label="Seek"
        className="flex-1 accent-[var(--signal)] h-1"
      />
      <button
        type="button"
        onClick={() => {
          const el = getEl();
          if (!el) return;
          el.muted = !el.muted;
          setMuted(el.muted);
        }}
        className="t-mono px-2 h-9 rounded-full hover:bg-surface-2"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? "Sound off" : "Sound on"}
      </button>
      <button type="button" onClick={() => wrap.current?.requestFullscreen?.()} className="t-mono px-2 h-9 rounded-full hover:bg-surface-2" aria-label="Full screen">
        ⤢
      </button>
    </div>
  );
}
