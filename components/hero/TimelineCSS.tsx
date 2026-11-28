import Image from "next/image";
import { bySlug } from "@/content/portfolio";

// The editing timeline as a static, CSS-only scene. It is the hero's poster (LCP) and the fallback on
// mobile / low-power / reduced-motion. Clips sit on tracks receding in depth; a red playhead crosses them.
const CLIPS: { slug: string; track: number; x: number; w: number }[] = [
  { slug: "base360", track: 0, x: 4, w: 30 },
  { slug: "caravan-new-york", track: 0, x: 38, w: 26 },
  { slug: "ugc-cerca", track: 1, x: 14, w: 9 },
  { slug: "randall-reel-1", track: 1, x: 26, w: 9 },
  { slug: "ht-human-friendly-robotics", track: 1, x: 52, w: 9 },
  { slug: "tamebridge", track: 2, x: 2, w: 24 },
  { slug: "perception-reel-1", track: 2, x: 30, w: 9 },
  { slug: "ai-commercial-1", track: 2, x: 42, w: 9 },
];

export default function TimelineCSS({ animated = true }: { animated?: boolean }) {
  return (
    <div id="hero-css" aria-hidden="true" className="absolute inset-0 overflow-hidden [perspective:1400px] transition-opacity duration-[1200ms] ease-studio">
      <div
        className="absolute right-[-8%] top-[10%] h-[85%] w-[78%] origin-right [transform-style:preserve-3d]"
        style={{ transform: "rotateY(-24deg) rotateX(8deg)" }}
      >
        {[0, 1, 2].map((t) => (
          <div key={t} className="absolute inset-x-0 h-px bg-muted/70" style={{ top: `${8 + t * 32}%` }} />
        ))}
        {CLIPS.map((c, i) => {
          const p = bySlug(c.slug);
          if (!p) return null;
          const vertical = p.format === "vertical";
          return (
            <div
              key={c.slug}
              className={`absolute overflow-hidden rounded-[18px] border border-muted bg-surface ${animated ? "motion-safe:animate-[drift_14s_ease-in-out_infinite_alternate]" : ""}`}
              style={{
                left: `${c.x}%`,
                top: `${10 + c.track * 32}%`,
                width: `${c.w}%`,
                aspectRatio: vertical ? "9 / 16" : "16 / 9",
                animationDelay: `${-i * 1.7}s`,
              }}
            >
              <Image src={p.poster} alt="" fill sizes="30vw" priority={i < 3} className="object-cover opacity-80" />
            </div>
          );
        })}
        <div className="absolute inset-y-[2%] w-px bg-signal motion-safe:animate-[playhead_16s_linear_infinite]" style={{ left: "46%" }}>
          <span className="absolute -top-1.5 -left-[5px] h-[11px] w-[11px] rounded-[3px] bg-signal" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
