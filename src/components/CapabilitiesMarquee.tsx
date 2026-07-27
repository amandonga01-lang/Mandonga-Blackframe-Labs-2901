import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, Film, Video, Tv, Users, Brain, Music, Compass, Sparkles, AlertCircle, Scissors, Palette, Volume2, Cpu, Database
} from "lucide-react";

interface PackageItem {
  id: string;
  title: string;
  desc: string;
  icon: any;
  category: "editing" | "creative";
  size: "large" | "medium";
  features: string[];
  metrics: string;
  revealSpecs: {
    software: string;
    pipeline: string;
    benchmark: string;
  };
}

export default function CapabilitiesMarquee() {
  const [activeFilter, setActiveFilter] = useState<"all" | "editing" | "creative">("all");
  const [expandedPkg, setExpandedPkg] = useState<string | null>(null);

  const packages: PackageItem[] = [
    {
      id: "pkg-1",
      title: "Short-Form Editing",
      desc: "Short-form video editing for Reels, TikTok, YouTube Shorts, and paid social campaigns.",
      icon: Scissors,
      category: "editing",
      size: "large",
      features: [
        "Hook optimization",
        "Pacing & fast-paced cuts",
        "Vertical crop & formats",
        "Trending sound overlays"
      ],
      metrics: "Reels / TikTok / Shorts",
      revealSpecs: {
        software: "Adobe Premiere Pro CC / After Effects",
        pipeline: "Vertical video export workflow",
        benchmark: "Designed for strong hooks, clear pacing, and platform-ready delivery"
      }
    },
    {
      id: "pkg-2",
      title: "Podcast Repurposing",
      desc: "Turn long-form conversations into short clips, quote moments, and platform-ready assets.",
      icon: Volume2,
      category: "editing",
      size: "medium",
      features: [
        "Multi-camera editing",
        "Key moments identification",
        "Animated subtitles & captions",
        "Clips pack compilation"
      ],
      metrics: "Clips & Moments",
      revealSpecs: {
        software: "DaVinci Resolve / Adobe Audition",
        pipeline: "Dialogue isolation & leveling",
        benchmark: "Consistent output from long form to multi-clip assets"
      }
    },
    {
      id: "pkg-3",
      title: "Real Estate Video Editing",
      desc: "Premium property edits, listing videos, agent reels, and real estate brand content.",
      icon: Compass,
      category: "creative",
      size: "medium",
      features: [
        "Smooth gimbal stabilizing",
        "Exposure matching & dynamic range",
        "Speed-ramped transitions",
        "Property detail highlight cards"
      ],
      metrics: "Listing Media",
      revealSpecs: {
        software: "Premiere Pro / After Effects",
        pipeline: "HDR 4K property walkthrough mastering",
        benchmark: "Elegant, high-end visual pacing for property listings"
      }
    },
    {
      id: "pkg-4",
      title: "Personal Brand Content",
      desc: "Founder, creator, coach, and consultant videos shaped for authority and consistency.",
      icon: Users,
      category: "editing",
      size: "medium",
      features: [
        "Personal style templates",
        "B-roll & asset sourcing",
        "Clear visual hooks",
        "Consistency branding kits"
      ],
      metrics: "Authority Content",
      revealSpecs: {
        software: "Adobe Premiere CC / After Effects",
        pipeline: "Custom style guide presets & elements",
        benchmark: "Consistent visual presence designed for trust"
      }
    },
    {
      id: "pkg-5",
      title: "Ad Creative Editing",
      desc: "Campaign-ready video ads with strong openings, clear offers, captions, and creative variations.",
      icon: Film,
      category: "creative",
      size: "large",
      features: [
        "Hook variation A/B tests",
        "Clear calls-to-action",
        "Dynamic graphic slide-ins",
        "Paid ads layout compliance"
      ],
      metrics: "Paid Social",
      revealSpecs: {
        software: "Premiere Pro / After Effects CC",
        pipeline: "A/B Hook variant rendering pipelines",
        benchmark: "Structured for paid social testing and clear conversion messaging"
      }
    },
    {
      id: "pkg-6",
      title: "Motion Graphics & Captions",
      desc: "Branded captions, subtle motion, clean lower thirds, and visual polish.",
      icon: Brain,
      category: "creative",
      size: "medium",
      features: [
        "Kinetic caption typography",
        "Custom transition graphic assets",
        "Subtle logo loop animations",
        "Lower third titles"
      ],
      metrics: "Visual Polish",
      revealSpecs: {
        software: "After Effects / Photoshop",
        pipeline: "Vector automation preset pipelines",
        benchmark: "Clean branded motion that supports the message without distracting from it"
      }
    }
  ];

  const filteredPackages = activeFilter === "all" 
    ? packages 
    : packages.filter(pkg => pkg.category === activeFilter);

  const filterTabs = [
    { id: "all", label: "All Services" },
    { id: "editing", label: "Video Editing" },
    { id: "creative", label: "Creative Services" }
  ];

  const handleToggleExpand = (pkgId: string) => {
    setExpandedPkg(expandedPkg === pkgId ? null : pkgId);
  };

  return (
    <section 
      id="capabilities" 
      className="pt-24 pb-32 md:pb-24 bg-[#FBFBFA] select-none"
      style={{ paddingBottom: "calc(8rem + env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C69214] uppercase mb-2">
              <span>BLACKFRAME SERVICES</span>
              <span>•</span>
              <span>EDITING SYSTEMS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-[#1A1A1A]">
              Editing systems for <span className="text-[#C69214]">modern content teams.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs md:text-sm text-[#5F6368] leading-relaxed font-sans select-text">
            Explore professional video editing, post-production, captions, motion graphics, podcast clips, real estate videos, and campaign creative services.
          </p>
        </div>

        {/* Minimalist Document Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-14 border-b border-[#E2E2DF] pb-5">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id as any);
                  setExpandedPkg(null);
                }}
                className={`relative px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 rounded-lg border font-bold clickable ${
                  isActive
                    ? "bg-[#202124] border-[#202124] text-white shadow-sm"
                    : "bg-white border-[#E2E2DF] text-[#5F6368] hover:border-[#202124] hover:text-[#1A1A1A]"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C69214] inline-block mr-2 animate-pulse" />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid Layout to align cards exactly in the same row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full min-h-[300px] items-start">
          <AnimatePresence>
            {filteredPackages.map((pkg) => {
              const Icon = pkg.icon;
              const isExpanded = expandedPkg === pkg.id;

              return (
                <motion.div
                  layout
                  key={pkg.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleToggleExpand(pkg.id)}
                  className={`group relative bg-white border border-[#E2E2DF] rounded-2xl p-6 flex flex-col justify-between hover:border-[#1A1A1A] hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out hover:-translate-y-1.5 cursor-pointer w-full`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="p-3 bg-[#F5F5F3] border border-[#E2E2DF] rounded-xl text-[#1A1A1A] group-hover:bg-[#C69214]/10 group-hover:border-[#C69214]/20 group-hover:text-[#C69214] transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <span className="font-mono text-[9px] tracking-wider text-[#C69214] px-2.5 py-1 bg-[#C69214]/5 border border-[#C69214]/10 rounded-full font-bold">
                        {pkg.metrics}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1A1A1A] uppercase tracking-tight mb-2 flex items-center gap-2 group-hover:text-[#C69214] transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    
                    <p className="text-xs text-[#5F6368] font-sans font-normal leading-relaxed mb-6 select-text">
                      {pkg.desc}
                    </p>
                  </div>

                  {/* Progressive Reveal Details Panel (Sleek CSS layout) */}
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden border-[#E2E2DF] ${
                      isExpanded 
                        ? "max-h-[220px] opacity-100 pb-5 mb-5 border-t pt-5" 
                        : "lg:group-hover:max-h-[220px] lg:group-hover:opacity-100 lg:group-hover:pb-5 lg:group-hover:mb-5 lg:group-hover:border-t lg:group-hover:pt-5 max-h-0 opacity-0"
                    }`}
                  >
                    <div className="font-mono text-[8px] text-[#C69214] tracking-widest uppercase font-bold mb-3 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Service details</span>
                    </div>
                    <div className="space-y-2.5 text-left font-mono text-[9px] text-[#5F6368] leading-tight select-text">
                      <div>
                        <span className="text-[#1A1A1A] font-bold">Software:</span> {pkg.revealSpecs.software}
                      </div>
                      <div>
                        <span className="text-[#1A1A1A] font-bold">Workflow:</span> {pkg.revealSpecs.pipeline}
                      </div>
                      <div>
                        <span className="text-[#1A1A1A] font-bold">Goal:</span> {pkg.revealSpecs.benchmark}
                      </div>
                    </div>
                  </div>

                  {/* Bullet Features & Footer */}
                  <div className="space-y-4 pt-4 border-t border-[#E2E2DF]">
                    <div className="space-y-1.5">
                      <span className="font-mono text-[8px] text-[#D0D0CD] tracking-widest uppercase block mb-2 font-bold">
                        Included
                      </span>
                      {pkg.features.map((feature, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-2 font-sans text-[11px] text-[#1A1A1A] font-medium"
                        >
                          <Check className="w-3 h-3 text-[#C69214] shrink-0 stroke-[2.5]" />
                          <span className="select-text">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 text-[9px] font-mono text-[#D0D0CD]">
                      <span className="text-[8px]">Professional workflow</span>
                      <span className="group-hover:text-[#1A1A1A] text-[8px] transition-colors flex items-center gap-1">
                        {isExpanded ? "Show less" : "View details"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Status Panel */}
        <div className="mt-12 p-4 bg-[#F5F5F3] border border-[#E2E2DF] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-[#5F6368]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C69214]" />
            <span>All deliverables are exported in platform-ready formats for web, social, ads, and long-form publishing.</span>
          </div>
          <span className="font-bold">Quality checked before delivery</span>
        </div>

      </div>
    </section>
  );
}
