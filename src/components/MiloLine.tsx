import { useEffect, useRef, useState } from "react";
import { Search, Scissors, Volume2, Palette, CheckCircle } from "lucide-react";
import IncreasingCounter from "./IncreasingCounter";

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: any;
  detail: string;
  metrics: { label: string; value: number; suffix?: string; prefix?: string }[];
}

export default function MiloLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = [
    {
      num: "01",
      title: "Send Footage",
      desc: "Upload raw clips, brand notes, references, and the goal for each piece of content.",
      icon: Search,
      detail: "Use our direct portal, Google Drive, or Dropbox to securely queue your video assets.",
      metrics: [
        { label: "INGEST CHANNELS", value: 4 },
        { label: "INGEST SPEED", value: 100, suffix: "%" }
      ]
    },
    {
      num: "02",
      title: "We Shape the Edit",
      desc: "We handle structure, hooks, pacing, captions, music, sound design, and formatting.",
      icon: Scissors,
      detail: "Senior editors trim dead space, insert custom captions, mix foley, and polish colors.",
      metrics: [
        { label: "RESOLUTION FORMAT", value: 10, suffix: "-bit UHD" },
        { label: "TIMELINE EDITORS", value: 1 }
      ]
    },
    {
      num: "03",
      title: "Review & Refine",
      desc: "You review the edit, leave notes, and we tighten the cut until it feels right.",
      icon: Volume2,
      detail: "Leave frame-specific annotations inside our easy-to-use review dashboard.",
      metrics: [
        { label: "REVISIONS DRAFTS", value: 1, prefix: "v" },
        { label: "DEDICATED REVISION", value: 100, suffix: "%" }
      ]
    },
    {
      num: "04",
      title: "Publish Consistently",
      desc: "You receive polished assets ready for Reels, TikTok, Shorts, ads, or campaigns.",
      icon: Palette,
      detail: "Each file is delivered in the right aspect ratio, resolution, and format for the platform you plan to publish on.",
      metrics: [
        { label: "READY DELIVERIES", value: 100, suffix: "%" },
        { label: "TARGET PLATFORMS", value: 5 }
      ]
    }
  ];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileSize = windowWidth < 640;
  const cardWidth = isMobileSize ? 280 : 320;
  const cardGap = isMobileSize ? 32 : 48;
  const totalConveyorDistance = 3 * (cardWidth + cardGap);

  // Smooth lerp factor for the conveyor cards
  const LERP_FACTOR = 0.045;
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  // Smooth lerp animation loop — cards trail behind scroll with buttery motion
  useEffect(() => {
    let animId: number;
    const update = () => {
      const target = targetProgress.current;
      const current = currentProgress.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        const next = current + diff * LERP_FACTOR;
        currentProgress.current = next;
        setScrollProgress(next);
      } else if (current !== target) {
        currentProgress.current = target;
        setScrollProgress(target);
      }

      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Continuous scroll tracking — no locking, just smooth following
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(rect.height - viewportHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);

      // Just set the target — the lerp loop handles smooth interpolation
      targetProgress.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Determine active state smoothly based on scrollProgress
  let activeState = 0;
  if (scrollProgress < 0.1667) activeState = 0;
  else if (scrollProgress < 0.5) activeState = 1;
  else if (scrollProgress < 0.8333) activeState = 2;
  else activeState = 3;

  const centeredIndex = activeState;

  // Determine which steps are reached based on progress (0 to 1)
  const isStepReached = (idx: number) => {
    if (idx === 0) return true;
    return scrollProgress >= idx * 0.3333 - 0.05;
  };

  const getInterpolatedMetricValue = (idx: number, maxVal: number) => {
    if (idx === 0) {
      const p = Math.max(0, Math.min(1, scrollProgress / 0.3333));
      return Math.floor(p * maxVal);
    }
    const start = (idx - 1) * 0.3333;
    const end = idx * 0.3333;
    if (scrollProgress <= start) return 0;
    if (scrollProgress >= end) return maxVal;
    const p = (scrollProgress - start) / 0.3333;
    return Math.floor(p * maxVal);
  };

  const formatMetricValue = (val: number, prefix = "", suffix = "") => {
    return `${prefix}${val.toLocaleString()}${suffix}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600svh] lg:h-[550vh] bg-[#FBFBFA] select-none border-y border-[#E2E2DF]"
    >
      {/* Content Wrapper pinned — viewport height so it sticks while vertical scroll drives horizontal cards */}
      <div ref={pinRef} className="sticky top-16 lg:top-0 h-[calc(100svh-4rem)] lg:h-screen w-full overflow-hidden flex flex-col justify-center px-5 sm:px-6 md:px-12 lg:px-20 pt-6 pb-8 md:py-8">

        {/* Workspace Document Header Info */}
        <div className="max-w-7xl mx-auto w-full mb-3 lg:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6 relative z-20">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C69214] uppercase mb-2 font-bold">
              <span>BLACKFRAME WORKFLOW</span>
              <span>•</span>
              <span>CLIENT WORKFLOW</span>
            </div>
            <h2 className="text-[1.55rem] sm:text-3xl md:text-5xl font-black tracking-tight uppercase text-[#1A1A1A] leading-tight">
              A simple workflow <span className="text-[#C69214]">built for speed.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs md:text-sm text-[#5F6368] leading-relaxed font-sans font-normal max-md:hidden">
            A clear four-step process from footage upload to final delivery, built to keep revisions simple and turnaround times predictable.
          </p>
        </div>

        {/* Sliding Conveyor Section with Center Timeline */}
        <div className="relative w-full max-w-7xl mx-auto min-h-[52svh] lg:min-h-[50vh] flex flex-col justify-center select-none">

          {/* Background Solid Rail Line (laser-thin) */}
          <div className="absolute left-0 right-0 h-[1.5px] bg-[#E2E2DF] z-0 top-1/2 -translate-y-1/2" />

          {/* Active Painted Track Line (Laser-thin, dark charcoal/gold ink trace) - GPU accelerated */}
          <div
            className="absolute left-0 right-0 h-[2px] bg-[#1A1A1A] z-10 top-1/2 -translate-y-1/2 origin-left will-change-transform"
            style={{ transform: `scaleX(${scrollProgress}) translate3d(0, 0, 0)` }}
          />

          {/* Active glowing tip at the end of the expanding line */}
          <div
            className="absolute w-2 h-2 rounded-full bg-[#C69214] z-20 top-1/2 -translate-y-1/2 will-change-transform"
            style={{
              left: `calc(${scrollProgress * 100}% - 4px)`,
              transform: "translate3d(0, 0, 0)"
            }}
          />

          {/* Sliding Conveyor Container */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[390px] sm:h-[420px] overflow-hidden flex items-center z-20">
            <div
              className="flex flex-row items-center gap-8 sm:gap-12 select-none will-change-transform"
              style={{
                paddingLeft: "50%",
                marginLeft: `-${cardWidth / 2}px`,
                transform: `translate3d(${-scrollProgress * totalConveyorDistance}px, 0, 0)`,
                transition: 'none'
              }}
            >
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isReached = isStepReached(idx);
                const isCentered = idx === centeredIndex;
                const cardProgress = idx / (steps.length - 1);
                const focus = Math.max(0, 1 - Math.abs(scrollProgress - cardProgress) * (steps.length - 1));

                return (
                  <div
                    key={step.num}
                    className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-md text-left group hover:border-[#1A1A1A] transition-all duration-500 flex flex-col justify-between h-[340px] sm:h-[360px] w-[280px] sm:w-[320px] shrink-0 ${isCentered
                      ? "border-[#1A1A1A] opacity-100 scale-105 shadow-lg z-20"
                      : "border-[#E2E2DF] opacity-30 scale-95 grayscale"
                      }`}
                    style={{
                      opacity: 0.3 + focus * 0.7,
                      transform: `scale(${0.95 + focus * 0.05})`,
                      filter: `grayscale(${1 - focus})`,
                      transition: 'border-color 100ms linear'
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-mono text-[9px] tracking-widest font-bold ${isCentered ? "text-[#C69214]" : "text-[#D0D0CD]"}`}>
                          PHASE // {step.num}
                        </span>
                        <StepIcon className={`w-4 h-4 transition-transform duration-500 group-hover:rotate-12 ${isCentered ? "text-[#C69214]" : "text-[#D0D0CD]"
                          }`} />
                      </div>

                      <h3 className={`text-md font-bold uppercase tracking-tight mb-2 transition-colors ${isCentered ? "text-[#1A1A1A]" : "text-[#D0D0CD]"}`}>
                        {step.title}
                      </h3>

                      <p className={`text-[11px] font-sans font-normal leading-relaxed mb-4 transition-colors ${isCentered ? "text-[#5F6368]" : "text-[#D0D0CD]"}`}>
                        {step.desc}
                      </p>
                    </div>

                    <div>
                      {/* Counters Section (Only active when reached) */}
                      <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-[#F5F5F3] my-2 select-text">
                        {step.metrics.map((m) => (
                          <div key={m.label} className="text-left">
                            <span className="font-mono text-[7px] text-[#D0D0CD] block font-bold leading-none mb-1">
                              {m.label}
                            </span>
                            <span className={`text-xs md:text-sm font-black block font-mono transition-colors ${isCentered ? "text-[#1A1A1A]" : "text-[#D0D0CD]"}`}>
                              {formatMetricValue(getInterpolatedMetricValue(idx, m.value), m.prefix, m.suffix)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <p className={`text-[9px] font-mono leading-relaxed font-light mt-1 transition-colors ${isCentered ? "text-[#5F6368]" : "text-[#D0D0CD]"}`}>
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Dynamic Progress Indicator Footer inside sticky area */}
        <div className="max-w-7xl mx-auto w-full mt-4 lg:mt-8 flex flex-col gap-3 lg:gap-4 border-t border-[#E2E2DF] pt-4 lg:pt-6 z-20 font-mono text-[10px] text-[#5F6368]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <span className="font-bold tracking-widest uppercase">PROJECT WORKFLOW</span>
              <div className="w-20 sm:w-24 h-1 bg-[#E2E2DF] rounded-full overflow-hidden shrink-0">
                <div
                  className="h-full bg-[#1A1A1A] origin-left will-change-transform"
                  style={{ transform: `scaleX(${scrollProgress}) translate3d(0,0,0)`, width: "100%" }}
                />
              </div>
              <span className="font-bold text-[#1A1A1A]">{Math.round(scrollProgress * 100)}%</span>
            </div>

            <div className="flex items-center gap-2 font-bold text-[#1A1A1A] tracking-wider min-w-0">
              <span className="hidden sm:inline">STATUS:</span>
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#1A1A1A] rounded uppercase text-[7px] sm:text-[8px] font-bold text-white whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
                {scrollProgress >= 0.85 ? "READY FOR DELIVERY" : "IN PROGRESS"}
              </span>
            </div>
          </div>

          {/* Interactive Bullet indicators for Milo-Line on mobile */}
          <div className="flex items-center gap-2 md:hidden justify-center relative z-30">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const targetProgressVal = idx * 0.3333;
                  if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const containerOffsetTop = window.scrollY + rect.top;
                    const scrollableDistance = Math.max(containerRef.current.offsetHeight - window.innerHeight, 1);
                    window.scrollTo({
                      top: containerOffsetTop + scrollableDistance * targetProgressVal,
                      behavior: "smooth"
                    });
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeState ? "bg-[#C69214] w-6" : "bg-[#E2E2DF]"
                  }`}
                aria-label={`Go to phase ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
