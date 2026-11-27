import { useEffect, useRef, useState } from "react";
import { HERO_REEL, WORK, posterUrl, videoUrl } from "../data/work";

const SEGMENT = 4; // seconds each clip holds before the cut
const FPS = 25;

const clips = HERO_REEL.map((id) => WORK.find((w) => w.id === id)!).filter(Boolean);

const timecode = (seconds: number) => {
  const f = Math.floor((seconds % 1) * FPS);
  const s = Math.floor(seconds) % 60;
  const m = Math.floor(seconds / 60) % 60;
  return `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
};

/**
 * The home-page signature: a monitor that cuts between real ads every few seconds,
 * flashing one black frame on each cut, with a scrubbable timeline underneath.
 */
export default function CutMonitor() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0); // seconds into the current segment
  const [black, setBlack] = useState(false);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const elapsedRef = useRef(0);

  const cutTo = (i: number) => {
    elapsedRef.current = 0;
    setBlack(true);
    window.setTimeout(() => {
      setIndex(i);
      setElapsed(0);
      setBlack(false);
    }, 42); // ~one frame at 24fps
  };

  // Advance the playhead; cut when the segment ends.
  useEffect(() => {
    if (paused || reduced) return;
    let raf = 0;
    let last = performance.now();
    let e = elapsedRef.current;
    const tick = (now: number) => {
      e += (now - last) / 1000;
      last = now;
      if (e >= SEGMENT) {
        elapsedRef.current = 0;
        cutTo((index + 1) % clips.length);
        return;
      }
      elapsedRef.current = e;
      setElapsed(e);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, paused, reduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {});
  }, [index, muted]);

  const clip = clips[index];
  const total = index * SEGMENT + Math.min(elapsed, SEGMENT);

  return (
    <div className="flex flex-col gap-3">
      {/* Monitor */}
      <div className="relative mx-auto w-full max-w-[360px] lg:max-w-none aspect-[9/16] bg-black border border-rule">
        <video
          ref={videoRef}
          key={clip.id}
          src={videoUrl(clip)}
          poster={posterUrl(clip)}
          muted={muted}
          autoPlay
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {black && <div className="absolute inset-0 bg-black" />}
        <div className="absolute inset-x-0 top-0 flex justify-between p-2 tc text-bone">
          <span className="bg-ink/70 px-1.5 py-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tally" aria-hidden="true" /> PGM
          </span>
          <span className="bg-ink/70 px-1.5 py-0.5">{timecode(total)}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-2 flex items-end justify-between gap-2">
          <span className="tc bg-ink/70 px-1.5 py-0.5 text-bone max-w-[70%] truncate">
            {clip.client ?? clip.title}
          </span>
          <span className="flex gap-1">
            <button type="button" onClick={() => setPaused((p) => !p)} className="tc bg-ink/80 border border-rule px-2 py-1 hover:border-bone" aria-label={paused ? "Resume auto-cut" : "Pause auto-cut"}>
              {paused ? "▶" : "❚❚"}
            </button>
            <button type="button" onClick={() => setMuted((m) => !m)} className="tc bg-ink/80 border border-rule px-2 py-1 hover:border-bone">
              {muted ? "Sound on" : "Mute"}
            </button>
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="border border-rule bg-panel p-2" aria-label="Reel timeline">
        <div className="flex justify-between tc text-dim text-[10px] mb-1 px-0.5" aria-hidden="true">
          {clips.map((_, i) => (
            <span key={i}>{timecode(i * SEGMENT).slice(3, 8)}</span>
          ))}
        </div>
        <div className="relative flex gap-px">
          {clips.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => cutTo(i)}
              aria-label={`Cut to ${c.title}${c.client ? `, ${c.client}` : ""}`}
              aria-pressed={i === index}
              className={`relative flex-1 h-12 overflow-hidden ${i === index ? "outline outline-2 outline-tally -outline-offset-2" : "opacity-60 hover:opacity-100"}`}
            >
              <img src={posterUrl(c)} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
          <span
            className="pointer-events-none absolute -top-1 -bottom-1 w-0.5 bg-tally"
            style={{ left: `${(total / (clips.length * SEGMENT)) * 100}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="sprockets mt-1.5" aria-hidden="true" />
      </div>
    </div>
  );
}
