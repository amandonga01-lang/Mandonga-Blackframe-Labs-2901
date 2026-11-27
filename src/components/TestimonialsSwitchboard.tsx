import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Zap, Clock, Quote, CheckCircle, Sparkles, Layers, Pause, Play, Grid } from "lucide-react";
import IncreasingCounter from "./IncreasingCounter";

interface CreatorTestimonial {
  id: string;
  name: string;
  channel: string;
  metrics: string;
  statLabel: string;
  quote: string;
  fullStory: string;
  projectSpecs: string;
}

export default function TestimonialsSwitchboard() {
  const [activeClientIndex, setActiveClientIndex] = useState(0);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [viewMode, setViewMode] = useState<"marquee" | "grid">("marquee");

  const outcomes = [
    {
      label: "Faster publishing rhythm",
      desc: "Turn raw footage into usable assets without slowing down your content calendar.",
      icon: Clock,
      stat: "2.5x Speed",
    },
    {
      label: "Stronger first impression",
      desc: "Make every clip feel polished, intentional, and unmistakably brand-aligned.",
      icon: CheckCircle,
      stat: "+92% Quality",
    },
    {
      label: "Better retention structure",
      desc: "Use hooks, pacing, captions, and visual rhythm to keep viewers watching longer.",
      icon: TrendingUp,
      stat: "+68% Watch Time",
    },
    {
      label: "Easier creative testing",
      desc: "Create rapid variations for different platforms, angles, offers, and audiences.",
      icon: Zap,
      stat: "10x Variants",
    },
    {
      label: "Stronger opening hooks",
      desc: "Shape the first few seconds so viewers understand the value quickly and stay engaged.",
      icon: Sparkles,
      stat: "3s Hook Lift",
    },
    {
      label: "Omnichannel format scale",
      desc: "Seamlessly convert core edits into native 9:16 vertical shorts, 16:9 cinema, and 1:1 feeds.",
      icon: Layers,
      stat: "Multi-Platform",
    },
  ];

  const testimonials: CreatorTestimonial[] = [
    {
      id: "test-1",
      name: "Randall Shaw",
      channel: "Wilderness Creator",
      metrics: "+340k Subscribers in 60 days",
      statLabel: "Growth result",
      quote: "Blackframe Labs turned my raw wilderness footage into clean, fast-paced edits that immediately felt more professional and easier to watch.",
      fullStory: "Randall Shaw's outdoor and survival content had rich raw value but struggled with mid-video retention drops. We analyzed audience drop-off points, optimized his hooks, and created short cuts that keep viewers watching.",
      projectSpecs: "Short-form editing, color, captions, and sound design",
    },
    {
      id: "test-2",
      name: "Naveed Haque & Humza Shazad",
      channel: "The Caravan Podcast",
      metrics: "5.4m+ Cumulative views",
      statLabel: "Distribution impact",
      quote: "We needed an editing team that could keep long conversations engaging while making the clips feel clean, branded, and ready for every platform.",
      fullStory: "The Caravan Podcast requires multi-cam alignment with dynamic kinetic subtitles and visual assets designed to loop seamlessly. Our team implemented custom pacing and clean lower thirds to turn discussions into engaging visual clips.",
      projectSpecs: "Podcast clips, multi-camera editing, captions, and audio cleanup",
    },
    {
      id: "test-3",
      name: "Kim Isenberg & Peter Thum",
      channel: "Superintelligence Labs",
      metrics: "2.8x Click-through multiplier",
      statLabel: "Engagement lift",
      quote: "Direct access to the editing team made the process faster. We could review, refine, and publish without unnecessary back-and-forth.",
      fullStory: "Superintelligence Labs produces highly demanding analytical reports. By eliminating standard account managers, our technical editors synced directly with their asset drive, trimming revision cycles down to single-digit hours.",
      projectSpecs: "Long-form edits, social cuts, audio mix, and delivery masters",
    },
  ];

  const currentTestimonial = testimonials[activeClientIndex];

  return (
    <section 
      id="testimonials" 
      className="pt-24 pb-32 md:pb-24 bg-[#FBFBFA] select-none"
      style={{ paddingBottom: "calc(8rem + env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Route Header Info & Controls */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C69214] uppercase mb-2 font-bold">
              <span>BLACKFRAME OUTCOMES</span>
              <span>•</span>
              <span>CLIENT BENEFITS</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase text-[#1A1A1A]">
              Built for consistent <span className="text-[#C69214]">content output</span>
            </h2>
            <p className="max-w-xl text-xs md:text-sm text-[#5F6368] leading-relaxed font-sans mt-2 font-normal">
              A professional editing partner helps you publish more consistently, improve production quality, and turn existing footage into useful content assets.
            </p>
          </div>

          {/* Marquee Motion Controls Toggle */}
          <div className="flex items-center gap-2 shrink-0 bg-white border border-[#E2E2DF] p-1.5 rounded-xl shadow-sm">
            <button
              onClick={() => setViewMode("marquee")}
              className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 clickable ${
                viewMode === "marquee" 
                  ? "bg-[#1A1A1A] text-white shadow" 
                  : "text-[#5F6368] hover:text-[#1A1A1A]"
              }`}
            >
              {isMarqueePaused ? <Play className="w-3 h-3 text-[#C69214]" /> : <Pause className="w-3 h-3 text-[#C69214]" />}
              <span>Auto Scroll</span>
            </button>

            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 clickable ${
                viewMode === "grid" 
                  ? "bg-[#1A1A1A] text-white shadow" 
                  : "text-[#5F6368] hover:text-[#1A1A1A]"
              }`}
            >
              <Grid className="w-3 h-3 text-[#C69214]" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* 6 Outcome Cards - Moving Format (Continuous Loop) vs Grid */}
        {viewMode === "marquee" ? (
          <div 
            className="relative w-full overflow-hidden py-4 mb-20 group"
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
            onTouchStart={() => setIsMarqueePaused(true)}
            onTouchEnd={() => setIsMarqueePaused(false)}
          >
            {/* Edge Blur Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#FBFBFA] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#FBFBFA] to-transparent z-10 pointer-events-none" />

            {/* Continuous Marquee Track - Smooth Pause/Resume in place */}
            <div
              className="animate-marquee flex gap-6 w-max"
              style={{
                animationPlayState: isMarqueePaused ? "paused" : "running",
              }}
            >
              {/* Duplicated array for seamless infinite loop */}
              {[...outcomes, ...outcomes].map((card, index) => {
                const MetricIcon = card.icon;
                return (
                  <motion.div 
                    key={`${card.label}-${index}`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="w-[280px] sm:w-[320px] bg-white border border-[#E2E2DF] hover:border-[#C69214] hover:shadow-xl rounded-2xl p-5 transition-all duration-300 relative group/card flex flex-col justify-between shrink-0 cursor-pointer"
                  >
                    {/* Floating graphic icon */}
                    <div className="flex items-center justify-between w-full mb-3">
                      <span className="font-mono text-[9px] font-bold text-[#C69214] bg-[#C69214]/10 border border-[#C69214]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {card.stat}
                      </span>
                      <div className="p-2 bg-[#F5F5F3] border border-[#E2E2DF] text-[#1A1A1A] group-hover/card:text-[#C69214] group-hover/card:bg-[#C69214]/10 rounded-xl transition-all duration-300">
                        <MetricIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-2 text-left pt-2">
                      <h3 className="text-sm font-extrabold text-[#1A1A1A] uppercase tracking-tight group-hover/card:text-[#C69214] transition-colors">
                        {card.label}
                      </h3>
                      <p className="text-xs text-[#5F6368] leading-relaxed font-sans font-normal line-clamp-2">
                        {card.desc}
                      </p>
                    </div>

                    <div className="h-[1px] bg-[#E2E2DF] my-3.5 group-hover/card:bg-[#C69214]/30 transition-colors" />

                    <div className="flex items-center justify-between font-mono text-[8.5px] text-[#A0A0A0] tracking-widest uppercase font-bold text-left">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C69214]" />
                        <span>CLIENT BENEFIT</span>
                      </div>
                      <span className="text-[#C69214] group-hover/card:translate-x-1 transition-transform">↗</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Static 6-Card Grid Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {outcomes.map((card) => {
              const MetricIcon = card.icon;
              return (
                <motion.div 
                  key={card.label}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-[#E2E2DF] hover:border-[#1A1A1A] hover:shadow-lg rounded-2xl p-5 transition-all duration-300 relative group/card flex flex-col justify-between text-left"
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="font-mono text-[9px] font-bold text-[#C69214] bg-[#C69214]/10 border border-[#C69214]/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {card.stat}
                    </span>
                    <div className="p-2 bg-[#F5F5F3] border border-[#E2E2DF] text-[#1A1A1A] group-hover/card:text-[#C69214] group-hover/card:bg-[#C69214]/10 rounded-xl transition-all duration-300">
                      <MetricIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-sm font-extrabold text-[#1A1A1A] uppercase tracking-tight">
                      {card.label}
                    </h3>
                    <p className="text-xs text-[#5F6368] leading-relaxed font-sans font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="h-[1px] bg-[#E2E2DF] my-3.5" />

                  <div className="flex items-center gap-1.5 font-mono text-[8.5px] text-[#A0A0A0] tracking-widest uppercase font-bold">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C69214]" />
                    <span>VERIFIED OUTCOME</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* The Client Quote Switchboard Workspace */}
        <div className="border-t border-[#E2E2DF] pt-12">
          <div className="mb-8 text-left">
            <span className="font-mono text-[10px] text-[#C69214] tracking-widest uppercase block mb-1 font-bold">
              Client case studies
            </span>
            <h3 className="text-xl font-black uppercase text-[#1A1A1A]">
              Client feedback
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Sidebar (lg:col-span-4): Vertical Tabbed Switchboard */}
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              {testimonials.map((client, idx) => {
                const isActive = activeClientIndex === idx;
                return (
                  <button
                    key={client.id}
                    onClick={() => setActiveClientIndex(idx)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-4 group relative clickable ${
                      isActive
                        ? "bg-[#202124] border-[#202124] text-white shadow-md"
                        : "bg-white border-[#E2E2DF] text-[#1A1A1A] hover:border-[#202124]"
                    }`}
                  >
                    {/* Active gold vertical bar */}
                    {isActive && (
                      <div className="absolute top-5 bottom-5 left-0 w-1 bg-[#C69214] rounded-r-md" />
                    )}

                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#E2E2DF] bg-[#F5F5F3]">
                      <div
                        aria-hidden="true"
                        className={`w-full h-full flex items-center justify-center font-black text-sm ${
                          isActive ? "bg-[#C69214] text-[#1A1A1A]" : "bg-[#1A1A1A] text-[#C69214]"
                        }`}
                      >
                        {client.name.split(" ").filter((part) => /^[A-Z]/.test(part)).map((part) => part[0]).join("").slice(0, 2)}
                      </div>
                    </div>

                    <div className="min-w-0 flex-grow text-left">
                      <span className={`font-mono text-[8px] tracking-widest uppercase block mb-0.5 font-bold ${
                        isActive ? "text-[#C69214]" : "text-[#5F6368]"
                      }`}>
                        {client.channel}
                      </span>
                      <h4 className="text-sm font-extrabold uppercase tracking-tight leading-snug whitespace-normal break-words">
                        {client.name}
                      </h4>
                    </div>

                    <span className="font-mono text-[10px] text-[#D0D0CD] group-hover:text-[#1A1A1A] transition-colors ml-auto shrink-0">
                      &gt;&gt;
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Main Panel (lg:col-span-8): Dynamic Focal Card */}
            <div className="lg:col-span-8 bg-white border border-[#E2E2DF] rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden min-h-[420px] flex flex-col justify-between">
              
              {/* Backglow line */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#C69214] via-[#202124] to-[#C69214]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 text-left flex-grow"
                >
                  {/* Dynamic Metric Tag Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DF]">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C69214] animate-ping" />
                      <span className="font-mono text-[9px] text-[#5F6368] tracking-widest uppercase font-bold">
                        {currentTestimonial.statLabel}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] font-bold text-[#C69214] px-3 py-1 bg-[#C69214]/5 border border-[#C69214]/10 rounded-full">
                      {currentTestimonial.metrics}
                    </span>
                  </div>

                  {/* Elegant Quote Display */}
                  <div className="relative pt-6">
                    <Quote className="absolute top-0 left-0 w-8 h-8 text-[#C69214]/10 rotate-180 -translate-y-4" />
                    
                    <p className="text-md md:text-lg font-bold text-[#1A1A1A] leading-relaxed relative z-10 pl-6 select-text italic">
                      "{currentTestimonial.quote}"
                    </p>
                  </div>

                  {/* Case File breakdown */}
                  <div className="pl-6 space-y-3 pt-4">
                    <span className="font-mono text-[9px] text-[#C69214] tracking-widest uppercase block font-bold">
                      Client objective and outcome
                    </span>
                    <p className="text-xs md:text-sm text-[#5F6368] leading-relaxed font-sans font-normal select-text">
                      {currentTestimonial.fullStory}
                    </p>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Immutable Specs line footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-8 border-t border-[#E2E2DF] font-mono text-[9px] text-[#D0D0CD] tracking-widest uppercase font-bold text-left">
                <span>Services delivered: {currentTestimonial.projectSpecs}</span>
                <span className="text-[#C69214]">Quality checked</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
