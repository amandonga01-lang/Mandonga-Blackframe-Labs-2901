import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Film, Milestone } from "lucide-react";

interface MotionStripDividerProps {
  label?: string;
}

export default function MotionStripDivider({ label = "POST_PRODUCTION" }: MotionStripDividerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    // Dynamic ticking timecode generator for high-fidelity movie feel
    const interval = setInterval(() => {
      const pad = (n: number) => n.toString().padStart(2, "0");
      const hours = pad(Math.floor(Math.random() * 2));
      const mins = pad(Math.floor(Math.random() * 60));
      const secs = pad(Math.floor(Math.random() * 60));
      const frames = pad(Math.floor(Math.random() * 24));
      setTimecode(`${hours}:${mins}:${secs}:${frames}`);
    }, 250);

    return () => {
      mediaQuery.removeEventListener("change", listener);
      clearInterval(interval);
    };
  }, []);

  const repeatCount = 8;
  const tickerWords = Array(repeatCount).fill(`BLACKFRAME LABS // VIDEO EDITING // COLOR // CAPTIONS // SOUND DESIGN // TIMECODE: [${timecode}]`);

  return (
    <div className="relative w-full h-14 bg-[#0A0A09] border-y border-white/[0.06] overflow-hidden select-none flex items-center">
      {/* High-Contrast Timeline Calibration Ticks (Visual representation of an edit ruler) */}
      <div className="absolute top-0 left-0 right-0 h-2 flex justify-between px-2 opacity-35 pointer-events-none">
        {Array.from({ length: 48 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-[1px] bg-white transition-all duration-300 ${
              i % 6 === 0 ? "h-2 bg-[#C69214]" : i % 3 === 0 ? "h-1.5" : "h-1"
            }`} 
          />
        ))}
      </div>

      {/* Laser-thin scrolling ticker with post-production parameters */}
      <div className="w-full flex overflow-hidden whitespace-nowrap pointer-events-none relative z-10">
        <div 
          className={`font-mono text-[8px] tracking-[0.25em] text-[#C69214]/80 font-bold uppercase ${
            prefersReducedMotion ? "flex items-center gap-16" : "animate-marquee gap-16"
          }`}
          style={{
            animationPlayState: prefersReducedMotion ? "paused" : "running"
          }}
        >
          {tickerWords.map((word, idx) => (
            <div key={idx} className="flex items-center gap-6 shrink-0">
              <Film className="w-3 h-3 text-white/30 shrink-0" />
              <span>{word}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>{label}_0{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Center Camera Overlay Framing Bracket */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-20">
        <div className="px-4 py-1.5 bg-[#0D0D0C]/90 border border-white/10 rounded-md backdrop-blur-md flex items-center gap-2.5 shadow-[0_0_15px_rgba(0,0,0,0.6)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C69214] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C69214]"></span>
          </span>
          <span className="font-mono text-[8px] text-white tracking-[0.2em] font-extrabold uppercase whitespace-nowrap">
            EDITING WORKFLOW
          </span>
        </div>
      </div>

      {/* Bottom Timeline Calibration Ticks */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex justify-between px-2 opacity-35 pointer-events-none">
        {Array.from({ length: 48 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-[1px] bg-white transition-all duration-300 ${
              i % 6 === 0 ? "h-2 bg-[#C69214]" : i % 3 === 0 ? "h-1.5" : "h-1"
            }`} 
          />
        ))}
      </div>
    </div>
  );
}
