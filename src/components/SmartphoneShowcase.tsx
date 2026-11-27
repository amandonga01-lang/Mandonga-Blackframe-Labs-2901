import { useEffect, useRef, useState } from "react";
import { Heart, Share2, Eye, Sparkles, Cpu, Unlock, ArrowRight, MessageSquare, Clock, TrendingUp, Volume2, Palette, Activity, RefreshCw, Zap } from "lucide-react";
import { motion } from "motion/react";

interface ReelVideo {
  id: number;
  title: string;
  client: string;
  url: string;
  likes: number;
  shares: number;
  views: number;
  tags: string[];
}

interface ReelVideoPlayerProps {
  url: string;
  isActive: boolean;
}

function ReelVideoPlayer({ url, isActive }: ReelVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch((err) => {
        console.warn("Autoplay was prevented:", err);
      });
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={url}
      muted
      playsInline
      loop
      preload={isActive ? "auto" : "metadata"}
      className="w-full h-full object-cover brightness-[92%] saturate-[102%]"
    />
  );
}

const STAGE_PROGRESS = [0.32, 0.62, 0.84];

// Smooth lerp factor: lower = smoother/more trailing, higher = snappier
// 0.045 gives a slow trailing feel that still keeps up with scroll
const LERP_FACTOR = 0.045;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const getSegmentProgress = (progress: number, start: number, end: number) => {
  const linear = Math.min(Math.max((progress - start) / Math.max(end - start, 0.001), 0), 1);
  return easeInOutCubic(linear);
};

const getStageFromProgress = (progress: number) => {
  if (progress >= 0.73) return 2;
  if (progress >= 0.48) return 1;
  return 0;
};

export default function SmartphoneShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionActive, setSectionActive] = useState(false);
  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const sectionActiveRef = useRef(false);

  // Smooth scroll-following refs
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isLocked = false; // kept for UI compatibility, never actually locks

  const reels: ReelVideo[] = [
    {
      id: 1,
      title: "Cerca // AI UGC Ad",
      client: "Cerca",
      url: "/work/ugc-cerca.mp4",
      likes: 12450,
      shares: 3410,
      views: 78926,
      tags: ["#cinematic", "#survival", "#wilderness"],
    },
    {
      id: 2,
      title: "Wilderness Survival // Retention Cut",
      client: "Randall Shaw",
      url: "/work/randall-reel-1.mp4",
      likes: 42100,
      shares: 9810,
      views: 245100,
      tags: ["#podcast", "#vfx", "#storytelling"],
    },
    {
      id: 3,
      title: "Morning Mistakes // Fitness Reel",
      client: "Fitness creator",
      url: "/work/morning-mistakes.mp4",
      likes: 98500,
      shares: 24300,
      views: 520400,
      tags: ["#colorgrading", "#cinematic", "#hdr"],
    },
  ];

  // Track window resizing for responsive animations
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Smooth lerp animation loop — cards trail behind the scroll with buttery motion
  useEffect(() => {
    let animId: number;
    const update = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        const factor = prefersReducedMotion ? 1 : LERP_FACTOR;
        const next = current + diff * factor;
        currentProgressRef.current = next;
        setScrollProgress(next);
      } else if (current !== target) {
        // Snap to exact target when close enough
        currentProgressRef.current = target;
        setScrollProgress(target);
      }

      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [prefersReducedMotion]);

  // Update active reel index based on smoothed scroll progress
  useEffect(() => {
    setActiveIndex(getStageFromProgress(scrollProgress));
  }, [scrollProgress]);

  // Continuous scroll tracking — no locking, just smooth following
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(rect.height - viewportHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
      const isActive = rect.top <= viewportHeight * 0.35 && rect.bottom >= viewportHeight * 0.65;

      setSectionActive(isActive);
      sectionActiveRef.current = isActive;

      // Just set the target — the lerp loop handles smooth interpolation
      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleBulletClick = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const targetProgress = STAGE_PROGRESS[index];
    const scrollableDistance = Math.max(containerRef.current.offsetHeight - window.innerHeight, 1);
    window.scrollTo({
      top: absoluteTop + scrollableDistance * targetProgress,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const getInitialAnimation = () => {
    if (prefersReducedMotion) return { opacity: 1, x: 0, y: 0 };
    if (isDesktop) return { y: 120, opacity: 0 };
    if (isTablet) return { x: 80, opacity: 0 };
    return { x: -60, opacity: 0 };
  };

  const activeReel = reels[activeIndex];
  const activeLikesText = activeIndex === 0 ? "756" : activeIndex === 1 ? "4,198" : "98,340";
  const activeViewsText = activeIndex === 0 ? "20,602" : activeIndex === 1 ? "112,408" : "1,245,670";

  const smallCards = [
    { id: "small-view", title: "VIEWS", icon: Eye, value: "TRACKING" },
    { id: "small-like", title: "LIKES", icon: Heart, value: "ENGAGED" },
    { id: "small-message", title: "COMMENTS", icon: MessageSquare, value: "READY" },
    { id: "small-share", title: "SHARES", icon: Share2, value: "12K+" }
  ];

  const cardConfigs = [
    // Stage 1 (activeIndex = 0)
    [
      {
        id: "views-1",
        title: "Real-Time Views",
        value: "78,926",
        icon: Eye,
        placement: "left",
        sparklinePath: "M 0 22 L 15 15 L 30 5 L 45 25 L 60 12 L 75 22 L 90 8 L 100 15"
      },
      {
        id: "likes-1",
        title: "Like-To-View Ratio",
        value: "11.2%",
        icon: Heart,
        placement: "right",
        sparklinePath: "M 0 25 L 15 12 L 30 22 L 45 8 L 60 28 L 75 14 L 90 18 L 100 2"
      }
    ],
    // Stage 2 (activeIndex = 1)
    [
      {
        id: "views-2",
        title: "Real-Time Views",
        value: "112,408",
        icon: Eye,
        placement: "left",
        sparklinePath: "M 0 28 L 20 22 L 40 18 L 60 10 L 80 5 L 100 2"
      },
      {
        id: "likes-2",
        title: "Like-To-View Ratio",
        value: "14.8%",
        icon: Heart,
        placement: "right",
        sparklinePath: "M 0 25 L 20 18 L 40 22 L 60 12 L 80 15 L 100 8"
      }
    ],
    // Stage 3 (activeIndex = 2)
    [
      {
        id: "views-3",
        title: "Real-Time Views",
        value: "1,245,670",
        icon: Eye,
        placement: "left",
        sparklinePath: "M 0 18 L 15 25 L 35 12 L 55 5 L 75 22 L 100 10"
      },
      {
        id: "likes-3",
        title: "Like-To-View Ratio",
        value: "18.3%",
        icon: Heart,
        placement: "right",
        sparklinePath: "M 0 15 L 25 22 L 50 12 L 75 25 L 100 5"
      }
    ]
  ];

  const getSmallCardStyles = (id: string, isMobile: boolean) => {
    let finalX = 0;
    let finalY = 0;
    let finalRotate = 0;
    const scaleMultiplier = isMobile ? 0.78 : 1;

    if (id === "small-view") {
      finalX = -230;
      finalY = -178;
      finalRotate = -4;
    } else if (id === "small-like") {
      finalX = 230;
      finalY = -178;
      finalRotate = 4;
    } else if (id === "small-message") {
      finalX = -230;
      finalY = 132;
      finalRotate = -3;
    } else if (id === "small-share") {
      finalX = 230;
      finalY = 132;
      finalRotate = 3;
    }

    if (isMobile) {
      finalX *= 0.57;
      finalY *= 0.57;
    }

    const entrance = getSegmentProgress(scrollProgress, 0.01, 0.22);
    const exit = 1 - getSegmentProgress(scrollProgress, 0.80, 0.98);
    const reveal = Math.min(entrance, exit);
    const x = finalX * reveal;
    const y = finalY * reveal;
    const rotate = finalRotate * reveal;
    const opacity = prefersReducedMotion ? (reveal > 0 ? 1 : 0) : reveal * 0.98;
    const scale = scaleMultiplier * (0.86 + reveal * 0.14);

    return {
      transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale}) rotate(${rotate}deg)`,
      opacity,
      zIndex: 5,
    };
  };

  const getBigCardStyles = (placement: string, isMobile: boolean, stageIndex: number) => {
    const stageWindows = [
      { inStart: 0.06, inEnd: 0.22, outStart: 0.36, outEnd: 0.52 },
      { inStart: 0.46, inEnd: 0.61, outStart: 0.62, outEnd: 0.77 },
      { inStart: 0.71, inEnd: 0.86, outStart: 0.84, outEnd: 0.98 },
    ];
    const timing = stageWindows[stageIndex];
    const entrance = getSegmentProgress(scrollProgress, timing.inStart, timing.inEnd);
    const exit = 1 - getSegmentProgress(scrollProgress, timing.outStart, timing.outEnd);
    const visibility = Math.min(entrance, exit);
    const direction = placement === "left" ? -1 : 1;
    const scaleMultiplier = isMobile ? 0.72 : 1;
    const x = direction * (isMobile ? 142 : 250);
    const baseY = isMobile ? -10 : -20;
    const motionY = prefersReducedMotion ? 0 : 14 * (1 - entrance) - 9 * (1 - exit);
    const scale = scaleMultiplier * (0.975 + visibility * 0.025);
    const rotate = direction * 2.5 * visibility;
    const opacity = prefersReducedMotion ? (visibility > 0 ? 1 : 0) : visibility;

    return {
      transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${baseY + motionY}px), 0) scale(${scale}) rotate(${rotate}deg)`,
      opacity,
      zIndex: 6 + stageIndex,
    };
  };

  const reelDeckProgress = scrollProgress < 0.42
    ? 0
    : scrollProgress < 0.54
      ? getSegmentProgress(scrollProgress, 0.42, 0.54)
      : scrollProgress < 0.67
        ? 1
        : scrollProgress < 0.79
          ? 1 + getSegmentProgress(scrollProgress, 0.67, 0.79)
          : 2;

  const renderLargeCards = (placement: "left" | "right", cardIndex: 0 | 1) =>
    cardConfigs.map((stageCards, stageIndex) => {
      const cardData = stageCards[cardIndex];
      const CardIcon = cardData.icon;
      const styles = getBigCardStyles(placement, !isDesktop, stageIndex);
      const gradientId = `spark-grad-${cardData.id}`;

      return (
        <div
          key={cardData.id}
          style={styles}
          aria-hidden={styles.opacity === 0}
          className="absolute left-1/2 top-1/2 select-none pointer-events-none w-[160px] h-[100px] sm:w-[210px] sm:h-[130px] will-change-transform"
        >
          <div className="w-full h-full rounded-[18px] sm:rounded-[22px] bg-black/90 backdrop-blur-xl border border-white/12 p-3 sm:p-4 flex flex-col justify-between shadow-[0_22px_55px_rgba(0,0,0,0.6),_inset_0_1px_1px_rgba(255,255,255,0.12)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#121212] via-black to-[#C69214]/15 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_5px] pointer-events-none" />

            <div className="h-full flex flex-col justify-between relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#C69214]">
                  <div className="w-5.5 h-5.5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                    <CardIcon className="w-3 h-3 text-[#C69214]" />
                  </div>
                  <span className="font-mono text-[7px] sm:text-[8.5px] font-bold text-white/70 tracking-wider uppercase">{cardData.title}</span>
                </div>
                <div className="h-1 w-6 sm:w-8 bg-white/10 rounded-full" />
              </div>

              <div className="mt-1 sm:mt-2">
                <span className="text-lg sm:text-2xl lg:text-[26px] font-black tracking-tight text-white font-sans block leading-none">
                  {cardData.value}
                </span>
              </div>

              <div className="h-5 sm:h-7 w-full mt-1.5 relative overflow-hidden opacity-80 rounded-b-lg">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C69214" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#C69214" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={cardData.sparklinePath}
                    fill="none"
                    stroke="#C69214"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`${cardData.sparklinePath} L 100 30 L 0 30 Z`}
                    fill={`url(#${gradientId})`}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500svh] lg:h-[480vh] bg-[#FBFBFA] select-none border-y border-[#E2E2DF]"
    >
      <div className="sticky top-16 lg:top-0 h-[calc(100svh-4rem)] lg:h-screen w-full overflow-hidden flex items-center justify-center py-6 sm:py-8 lg:py-16 xl:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-16 items-center justify-items-center relative z-10">

          {/* Left Column: Interactive Details Block */}
          <div className="lg:col-span-5 space-y-3 lg:space-y-6 text-left max-lg:text-center w-full max-w-md">
            <div className="flex items-center justify-start max-lg:justify-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] sm:tracking-[0.3em] text-[#C69214] uppercase font-bold">
              <span>RETENTION ENGINEERED EDITING</span>
            </div>

            <h2 className="text-[1.7rem] sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight uppercase text-[#1A1A1A] leading-tight">
              Every frame <span className="text-[#C69214]">has a job</span>.
            </h2>

            <p className="text-[#5F6368] text-xs md:text-sm font-sans font-normal leading-relaxed select-text hidden sm:block">
              We build edits around hooks, pacing, captions, sound design, and platform-native structure, so your content feels sharper from the first second to the final call-to-action.
            </p>

            <ul className="text-xs space-y-2 text-[#5F6368] font-mono text-left max-lg:hidden pt-2">
              <li className="flex items-center gap-2"><span className="text-[#C69214] font-bold">•</span> Hook-first editing</li>
              <li className="flex items-center gap-2"><span className="text-[#C69214] font-bold">•</span> Clean captions</li>
              <li className="flex items-center gap-2"><span className="text-[#C69214] font-bold">•</span> Fast-paced cuts</li>
              <li className="flex items-center gap-2"><span className="text-[#C69214] font-bold">•</span> Sound design polish</li>
              <li className="flex items-center gap-2"><span className="text-[#C69214] font-bold">•</span> Platform-ready exports</li>
            </ul>

            <div className="pt-2">
              <div className="flex items-center justify-between max-lg:justify-center gap-2 mb-2">
                <span className="font-mono text-[8px] text-[#D0D0CD] tracking-widest uppercase font-bold">
                  SCROLL TO EXPLORE
                </span>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-md font-mono text-[8px] text-[#C69214] font-bold transition-all duration-300">
                    <Unlock className="w-2.5 h-2.5 text-neutral-400" />
                    <span>{`Reel ${activeIndex + 1}`}</span>
                </div>
              </div>

              <div className="w-full h-[3px] bg-[#E2E2DF] rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-[#C69214] origin-left will-change-transform"
                  style={{ transform: prefersReducedMotion ? "none" : `scaleX(${scrollProgress}) translate3d(0,0,0)`, width: "100%" }}
                />
              </div>

              <div className="flex items-center gap-2 justify-start max-lg:justify-center relative z-30">
                {reels.map((_, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleBulletClick(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isActive ? "bg-[#C69214] w-6" : "bg-[#E2E2DF] hover:bg-[#D0D0CD]"
                        }`}
                      aria-label={`Go to reel ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Centered Phone & Floating Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center relative w-full h-full">

            <div className="relative flex justify-center items-center w-full max-w-2xl h-[54svh] min-h-[420px] sm:h-[62svh] lg:h-[75vh] xl:h-[80vh] max-h-[820px]">

              <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden xl:block font-mono text-[8px] text-[#D0D0CD] uppercase font-bold tracking-[0.3em] rotate-90 whitespace-nowrap">
                BLACKFRAME POST-PRODUCTION STUDIO
              </div>

              {/* The 4 Small Cards floating beside the phone mockup */}
              {smallCards.map((card) => {
                const styles = getSmallCardStyles(card.id, !isDesktop);
                const CardIcon = card.icon;
                return (
                  <div
                    key={card.id}
                    style={styles}
                    className="absolute left-1/2 top-1/2 select-none pointer-events-none w-[115px] h-[36px] sm:w-[145px] sm:h-[44px] will-change-transform"
                  >
                    <div className="w-full h-full rounded-xl bg-black/90 backdrop-blur-xl border border-white/12 px-2.5 sm:px-3.5 flex items-center justify-between shadow-[0_12px_28px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.12)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#121212] via-black to-[#C69214]/12 pointer-events-none" />
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

                      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                        <div className="w-4.5 h-4.5 sm:w-6 sm:h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <CardIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#C69214]" />
                        </div>
                        <div className="flex flex-col text-left leading-none">
                          <span className="font-mono text-[5px] sm:text-[6.5px] text-white/50 font-bold tracking-wider uppercase">{card.title}</span>
                          <span className="font-mono text-[7px] sm:text-[8.5px] text-[#C69214] font-black tracking-tight mt-0.5">{card.value}</span>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C69214] animate-pulse" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Large cards are layered by reel and driven directly by scroll progress. */}
              {renderLargeCards("left", 0)}
              {renderLargeCards("right", 1)}

              {/* Premium iPhone Mockup Frame */}
              <motion.div
                initial={getInitialAnimation()}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[9/18.5] h-full bg-black rounded-[42px] sm:rounded-[54px] p-[5px] sm:p-[8px] shadow-[0_30px_80px_rgba(0,0,0,0.4),_0_0_0_1.5px_rgba(255,255,255,0.08),_inset_0_0_6px_3px_rgba(255,255,255,0.12)] border-[3px] sm:border-[4px] border-[#3a3a3c] flex flex-col overflow-hidden select-none z-10"
              >
                {/* Dynamic Island */}
                <div className="absolute top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-black rounded-full z-40 flex items-center justify-between px-2.5 sm:px-3 shadow-inner">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#101010] border border-neutral-900/40 flex items-center justify-center">
                    <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-blue-950/40" />
                  </div>
                  <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#C69214]/65 animate-pulse" />
                </div>

                {/* Screen Container */}
                <div className="relative w-full h-full rounded-[36px] sm:rounded-[46px] bg-black overflow-hidden flex flex-col justify-between border border-black/80">

                  {/* Scrollable reels deck */}
                  <div
                    className="absolute top-0 left-0 w-full h-full flex flex-col z-0 will-change-transform"
                    style={{
                      transform: `translate3d(0, -${reelDeckProgress * 100}%, 0)`,
                      transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {reels.map((reel, idx) => (
                      <div key={reel.id} className="w-full h-full relative shrink-0">
                        <ReelVideoPlayer url={reel.url} isActive={activeIndex === idx} />
                      </div>
                    ))}
                  </div>

                  {/* Top Overlay bar */}
                  <div className="relative z-10 p-4 sm:p-5 pt-8 sm:pt-11 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#C69214] animate-pulse" />
                      <span className="font-mono text-[7px] sm:text-[9px] text-white tracking-widest font-bold">
                        {activeReel.client.toUpperCase()} EDIT
                      </span>
                    </div>
                    <Cpu className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#C69214] animate-pulse" />
                  </div>

                  {/* Inside-phone floating reaction counters */}
                  <div className="absolute right-3 sm:right-4 bottom-20 sm:bottom-24 z-10 flex flex-col gap-3.5 sm:gap-5 text-white items-center pointer-events-none">
                    <div className="flex flex-col items-center">
                      <div className="w-7 sm:w-9 h-7 sm:h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <Heart className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 text-[#C69214] fill-[#C69214]" />
                      </div>
                      <span className="font-mono text-[7px] sm:text-[8px] mt-0.5 sm:mt-1 text-white/90 font-bold">
                        {activeLikesText}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-7 sm:w-9 h-7 sm:h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <Share2 className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 text-[#C69214]" />
                      </div>
                      <span className="font-mono text-[7px] sm:text-[8px] mt-0.5 sm:mt-1 text-white/90 font-bold">
                        {(activeReel.shares / 1000).toFixed(1)}k
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-7 sm:w-9 h-7 sm:h-9 rounded-full bg-[#C69214]/20 backdrop-blur-md flex items-center justify-center border border-[#C69214]/50">
                        <Eye className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 text-[#C69214]" />
                      </div>
                      <span className="font-mono text-[7px] sm:text-[8px] mt-0.5 sm:mt-1 text-white font-bold bg-[#C69214] px-1 py-0.5 rounded text-center">
                        Views
                      </span>
                    </div>
                  </div>

                  {/* Bottom Video details overlay */}
                  <div className="relative z-10 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent space-y-1.5 sm:space-y-2 text-left pointer-events-none">
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {activeReel.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[6px] sm:text-[7px] text-[#C69214] font-bold tracking-wider uppercase px-1 sm:px-1.5 py-0.5 bg-[#C69214]/10 rounded border border-[#C69214]/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h4 className="text-[10px] sm:text-xs font-black text-white uppercase tracking-tight line-clamp-1">
                      {activeReel.title}
                    </h4>

                    <p className="text-[8px] sm:text-[10px] text-white/75 font-sans leading-normal line-clamp-2">
                      Architected by Blackframe Labs. Multi-cam splicing, After Effects motion tracking overlays, and Hollywood grading.
                    </p>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
