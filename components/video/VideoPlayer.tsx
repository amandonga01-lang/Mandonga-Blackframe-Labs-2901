"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type VideoPlayerHandle = { el: HTMLVideoElement | null };

type Props = {
  src: string; // .mp4 or .m3u8
  poster?: string;
  /** "preview": muted loop, starts when `active`. "full": normal playback with sound allowed. */
  mode?: "preview" | "full";
  active?: boolean; // preview only: play when true
  lazy?: boolean; // only attach the src once near the viewport
  autoPlay?: boolean; // full mode: try to start (muted policy still applies)
  controls?: boolean; // native controls (custom controls live in ShowreelPlayer)
  label?: string; // aria-label
  className?: string;
  onPlay?: () => void;
  onEnded?: () => void;
  objectFit?: "cover" | "contain";
};

/**
 * One wrapper for every video. Plays MP4 directly; for .m3u8 it uses native HLS (Safari)
 * or lazy-loads hls.js, so items can later point at Mux / Cloudflare Stream / Bunny.
 * Defaults: preload="none", playsInline, never autoplays with sound.
 */
const VideoPlayer = forwardRef<VideoPlayerHandle, Props>(function VideoPlayer(
  { src, poster, mode = "preview", active = false, lazy = true, autoPlay = false, controls = false, label, className = "", onPlay, onEnded, objectFit = "cover" },
  ref,
) {
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(!lazy);
  useImperativeHandle(ref, () => ({ el: video.current }), []);

  // Attach the source only when within ~1 viewport.
  useEffect(() => {
    if (!lazy || near) return;
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [lazy, near]);

  // Source: MP4 directly, HLS natively or via hls.js.
  useEffect(() => {
    const el = video.current;
    if (!el || !near) return;
    if (!src.endsWith(".m3u8")) {
      el.src = src;
      return;
    }
    if (el.canPlayType("application/vnd.apple.mpegurl")) {
      el.src = src;
      return;
    }
    let destroyed = false;
    let hls: { destroy: () => void } | null = null;
    import("hls.js").then(({ default: Hls }) => {
      if (destroyed || !Hls.isSupported()) return;
      const h = new Hls({ capLevelToPlayerSize: true });
      h.loadSource(src);
      h.attachMedia(el);
      hls = h;
    });
    return () => {
      destroyed = true;
      hls?.destroy();
    };
  }, [src, near]);

  // Preview mode: play/pause with `active`, pause when off-screen.
  useEffect(() => {
    const el = video.current;
    if (!el || mode !== "preview" || !near) return;
    if (active) el.play().catch(() => {});
    else {
      el.pause();
      if (el.currentTime > 0) el.currentTime = 0;
    }
  }, [active, mode, near]);

  useEffect(() => {
    const el = video.current;
    if (!el || mode !== "full" || !autoPlay || !near) return;
    el.play().catch(() => {});
  }, [autoPlay, mode, near, src]);

  return (
    <video
      ref={video}
      poster={poster}
      muted={mode === "preview"}
      loop={mode === "preview"}
      playsInline
      preload="none"
      controls={controls}
      aria-label={label}
      onPlay={onPlay}
      onEnded={onEnded}
      className={`${className} ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
    />
  );
});

export default VideoPlayer;
