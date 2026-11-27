// Motion kit, adapted from the reference site's language into Black Frame:
// spotlight cones, word-by-word headline reveals, scroll-linked giant type,
// words that split around a piece of media, stacked "echo" type, and reveal-on-enter.
// Everything degrades to static under prefers-reduced-motion.
import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from "react";

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** 0 when the element's top hits the bottom of the viewport, 1 when its bottom leaves the top. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setP(0.5);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      setP(Math.min(1, Math.max(0, (window.innerHeight - r.top) / total)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

/** Fades and lifts children the first time they scroll into view. */
export function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: { children: ReactNode; delay?: number; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${shown ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-[6px]"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline that types in word by word from behind a mask, the way the reference hero does.
 * Pass lines as an array; wrap a word in [brackets] to colour it tally.
 */
export function WordReveal({ lines, className = "", as: Tag = "h1", start = 120 }: { lines: string[]; className?: string; as?: ElementType; start?: number }) {
  const [go, setGo] = useState(prefersReducedMotion());
  useEffect(() => {
    const id = requestAnimationFrame(() => setGo(true));
    return () => cancelAnimationFrame(id);
  }, []);
  let i = 0;
  return (
    <Tag className={className} aria-label={lines.join(" ").replace(/[[\]]/g, "")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(" ").map((word, wi) => {
            const accent = word.startsWith("[");
            const clean = word.replace(/[[\]]/g, "");
            const d = start + i++ * 70;
            return (
              <span key={wi} className="inline-block overflow-hidden align-bottom pb-[0.04em] mr-[0.22em] last:mr-0">
                <span
                  className={`inline-block transition-[transform,filter,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${accent ? "text-tally" : ""} ${
                    go ? "translate-y-0 opacity-100 blur-0" : "translate-y-[105%] opacity-0 blur-[8px]"
                  }`}
                  style={{ transitionDelay: `${d}ms` }}
                >
                  {clean}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Soft amber cone of light from the top edge, like the reference's stage spotlight. */
export function Spotlight({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 h-[90vh] animate-[spot_2.4s_cubic-bezier(0.16,1,0.3,1)_both] ${className}`}
      style={{
        background:
          "radial-gradient(ellipse 34% 70% at 50% -8%, rgba(255,176,0,0.20), rgba(255,176,0,0.06) 45%, transparent 72%), conic-gradient(from 180deg at 50% -10%, transparent 160deg, rgba(255,176,0,0.07) 175deg, rgba(255,176,0,0.10) 180deg, rgba(255,176,0,0.07) 185deg, transparent 200deg)",
      }}
    />
  );
}

/** Giant single line of type that slides sideways as the section scrolls through. */
export function ScrollType({ text, className = "", reverse = false }: { text: string; className?: string; reverse?: boolean }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  const x = (reverse ? -1 : 1) * (30 - p * 90); // vw
  return (
    <div ref={ref} className={`overflow-hidden select-none ${className}`} aria-hidden="true">
      <div className="display whitespace-nowrap text-[22vw] md:text-[16vw] leading-[0.85] will-change-transform" style={{ transform: `translate3d(${x}vw,0,0)` }}>
        {text}
      </div>
    </div>
  );
}

/** Two words that slide apart around a piece of media as you scroll ("Payouts [card] Certificates"). */
export function SplitAround({ left, right, children }: { left: string; right: string; children: ReactNode }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  const spread = Math.min(1, Math.max(0, (p - 0.15) / 0.4)); // 0 -> 1 between 15% and 55% progress
  // Words start just clear of the card (half its width + a gap), then drift apart.
  const base = typeof window !== "undefined" && window.innerWidth < 768 ? 16.5 : 10;
  const shift = base + spread * (base > 10 ? 6 : 16); // vw
  const word: CSSProperties = { transition: "transform 80ms linear" };
  return (
    <div ref={ref} className="relative py-10 md:py-16 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span className="display text-[12vw] md:text-[13vw] text-bone/90" style={{ ...word, transform: `translateX(-${shift}vw)` }}>
          {left}
        </span>
        <span className="display text-[12vw] md:text-[13vw] text-bone/25" style={{ ...word, transform: `translateX(${shift}vw)` }}>
          {right}
        </span>
      </div>
      <div className="relative mx-auto w-[30vw] max-w-[260px] md:w-[17vw]" style={{ transform: `scale(${0.86 + spread * 0.14})`, transition: "transform 80ms linear" }}>
        {children}
      </div>
    </div>
  );
}

/** The reference's stacked "Start earning ×7": one bold line over fading outlined echoes. */
export function Echo({ text, rows = 5, className = "" }: { text: string; rows?: number; className?: string }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} className={`relative select-none ${className}`} aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="display leading-[0.86] whitespace-nowrap"
          style={{
            color: i === 0 ? "var(--color-tally)" : "transparent",
            WebkitTextStroke: i === 0 ? undefined : "1px rgba(255,176,0,0.45)",
            opacity: i === 0 ? 1 : Math.max(0.08, 0.7 - i * 0.14),
            transform: `translateX(${(i * (p - 0.5)) * 6}vw)`,
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}

/** Thin crosshair lines connecting a few real facts (no invented metrics). */
export function FactField({ facts }: { facts: { value: string; label: string }[] }) {
  const pos = ["md:col-start-1 md:row-start-1", "md:col-start-3 md:row-start-1 md:mt-16", "md:col-start-2 md:row-start-2", "md:col-start-4 md:row-start-2 md:-mt-10"];
  return (
    <div className="relative grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-x-6 gap-y-14">
      <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M10 20 L60 30 L35 75 L85 65" fill="none" stroke="rgba(255,176,0,0.35)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" strokeDasharray="1 1.4" />
      </svg>
      {facts.map((f, i) => (
        <Reveal key={f.label} delay={i * 120} className={`relative ${pos[i] ?? ""}`}>
          <span className="absolute -left-3 -top-3 w-3 h-3 border-l border-t border-tally/70" aria-hidden="true" />
          <p className="display text-6xl md:text-7xl text-bone">{f.value}</p>
          <p className="tc text-dim mt-2 max-w-[16ch]">{f.label}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Endless "Let's talk" marquee used at the bottom of every page. */
export function TalkMarquee() {
  const words = Array.from({ length: 6 });
  return (
    <a href="#/contact" className="group block overflow-hidden border-t border-rule py-6 md:py-10" aria-label="Let's talk: send us footage">
      <div className="flex w-max animate-[marquee_22s_linear_infinite] group-hover:[animation-play-state:paused]" aria-hidden="true">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {words.map((_, i) => (
              <span key={i} className="display text-[18vw] md:text-[12vw] px-[2vw] leading-[0.9] text-bone group-hover:text-tally transition-colors">
                Let's talk <span className="text-tally group-hover:text-bone">✺</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </a>
  );
}
