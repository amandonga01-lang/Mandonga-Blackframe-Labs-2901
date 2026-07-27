import { useState } from "react";
import { ArrowUpRight, Clock, Film, Play, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ShowreelItem {
  id: string;
  fileName: string;
  title: string;
  client: string;
  category: "vertical" | "dialogue" | "grading";
  categoryLabel: string;
  thumbnailUrl: string;
  videoUrl: string;
  aspect: "vertical" | "horizontal";
  fileSize: string;
  fps: string;
}

export default function ShowcaseCinemaGrid() {
  const [selectedProject, setSelectedProject] = useState<ShowreelItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "short" | "long" | "dialogue" | "grading">("all");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const showreels: ShowreelItem[] = [
    // --- 8 SHORT FORM (9:16 VERTICAL) PROJECTS ---
    {
      id: "showcase-01",
      fileName: "randall_shaw_wilderness_cinematic_v09.mp4",
      title: "Vertical Cinematic Wilderness",
      client: "Randall Shaw",
      category: "vertical",
      categoryLabel: "Cinematic Vertical Cut",
      thumbnailUrl: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=800",
      videoUrl: "/RANDALL SHOW.mp4",
      aspect: "vertical",
      fileSize: "184.2 MB",
      fps: "23.976 fps",
    },
    {
      id: "showcase-02",
      fileName: "blackframe_magnific_intro_preloader.mp4",
      title: "Blackframe Magnific Preloader Video",
      client: "Blackframe Labs Studio",
      category: "vertical",
      categoryLabel: "Cinematic Preloader Intro",
      thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      videoUrl: "/magnific_intro.mp4",
      aspect: "vertical",
      fileSize: "13.0 MB",
      fps: "30.00 fps",
    },
    {
      id: "showcase-03",
      fileName: "cyberpunk_neon_tokyo_vertical_cut.mp4",
      title: "Cyberpunk Neon Motion Reel",
      client: "Aethelgard Digital",
      category: "vertical",
      categoryLabel: "Neon Aesthetics 9:16",
      thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-41864-large.mp4",
      aspect: "vertical",
      fileSize: "142.8 MB",
      fps: "60.00 fps",
    },
    {
      id: "showcase-04",
      fileName: "vogue_golden_hour_editorial_short.mp4",
      title: "Golden Hour Luxury Editorial",
      client: "Vogue Milano Shorts",
      category: "vertical",
      categoryLabel: "Master Color & Motion",
      thumbnailUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4",
      aspect: "vertical",
      fileSize: "98.5 MB",
      fps: "23.976 fps",
    },
    {
      id: "showcase-05",
      fileName: "metropolis_hyperlapse_916_grade.mp4",
      title: "Urban High-Speed Hyperlapse",
      client: "Metropolis Vision",
      category: "vertical",
      categoryLabel: "Speed Ramping & VFX",
      thumbnailUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-tunnel-41865-large.mp4",
      aspect: "vertical",
      fileSize: "112.4 MB",
      fps: "59.94 fps",
    },
    {
      id: "showcase-06",
      fileName: "deep_space_cosmic_warp_916.mp4",
      title: "Deep Space Cosmic Tunnel",
      client: "Blackframe Orbit",
      category: "vertical",
      categoryLabel: "VFX & Motion Graphics",
      thumbnailUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4",
      aspect: "vertical",
      fileSize: "86.1 MB",
      fps: "30.00 fps",
    },
    {
      id: "showcase-07",
      fileName: "redline_alpine_descent_tiktok.mp4",
      title: "Extreme Alpine Descent Reel",
      client: "Redline Athletics",
      category: "vertical",
      categoryLabel: "Action Sports Retention Cut",
      thumbnailUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-golden-gate-bridge-at-sunset-12242-large.mp4",
      aspect: "vertical",
      fileSize: "165.0 MB",
      fps: "59.94 fps",
    },
    {
      id: "showcase-08",
      fileName: "spatial_arch_minimalist_reels.mp4",
      title: "Minimalist Architectural Motion",
      client: "Spatial Design Co",
      category: "vertical",
      categoryLabel: "Design & Architectural Reel",
      thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-41864-large.mp4",
      aspect: "vertical",
      fileSize: "72.3 MB",
      fps: "24.00 fps",
    },

    // --- 8 LONG FORM (16:9 HORIZONTAL) PROJECTS ---
    {
      id: "showcase-09",
      fileName: "superintelligence_hdr_timeline_v04.mov",
      title: "Superintelligence Assembly",
      client: "Kim Isenberg & Peter Thum",
      category: "grading",
      categoryLabel: "Timeline Grading & Assembly",
      thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      videoUrl: "/KIM ISENBERG INFO.mp4",
      aspect: "horizontal",
      fileSize: "1.24 GB",
      fps: "24.00 fps",
    },
    {
      id: "showcase-10",
      fileName: "caravan_podcast_ep12_ae_grade_master.mp4",
      title: "The Caravan Podcast Series",
      client: "Naveed & Humza",
      category: "dialogue",
      categoryLabel: "Dialogue & AE Overlay",
      thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-tunnel-41865-large.mp4",
      aspect: "horizontal",
      fileSize: "740.1 MB",
      fps: "29.97 fps",
    },
    {
      id: "showcase-11",
      fileName: "pacific_horizons_sunset_4k_master.mov",
      title: "Golden Gate Sunset Feature",
      client: "Pacific Horizons",
      category: "grading",
      categoryLabel: "4K Aerial Color Grading",
      thumbnailUrl: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-golden-gate-bridge-at-sunset-12242-large.mp4",
      aspect: "horizontal",
      fileSize: "2.10 GB",
      fps: "23.976 fps",
    },
    {
      id: "showcase-12",
      fileName: "astro_interstellar_doc_v02.mp4",
      title: "Interstellar Deep Field Doc",
      client: "Astro Media Corp",
      category: "grading",
      categoryLabel: "Documentary Color Grade",
      thumbnailUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4",
      aspect: "horizontal",
      fileSize: "1.85 GB",
      fps: "24.00 fps",
    },
    {
      id: "showcase-13",
      fileName: "apex_formulae_telemetry_edit_v01.mp4",
      title: "Formula-E Telemetry & Cut",
      client: "Apex Racing Team",
      category: "dialogue",
      categoryLabel: "Multi-Cam Telemetry Splicing",
      thumbnailUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-41864-large.mp4",
      aspect: "horizontal",
      fileSize: "890.0 MB",
      fps: "59.94 fps",
    },
    {
      id: "showcase-14",
      fileName: "summit_alps_expedition_4k_prores.mov",
      title: "High-Altitude Alps Expedition",
      client: "Summit Peak Films",
      category: "grading",
      categoryLabel: "ProRes 4K Feature Master",
      thumbnailUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-golden-gate-bridge-at-sunset-12242-large.mp4",
      aspect: "horizontal",
      fileSize: "3.40 GB",
      fps: "23.976 fps",
    },
    {
      id: "showcase-15",
      fileName: "nexus_esports_grand_finals_intro.mp4",
      title: "E-Sports Global Opener",
      client: "Nexus Gaming League",
      category: "dialogue",
      categoryLabel: "AE Sound Design & Motion",
      thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-light-from-a-tunnel-41865-large.mp4",
      aspect: "horizontal",
      fileSize: "950.4 MB",
      fps: "60.00 fps",
    },
    {
      id: "showcase-16",
      fileName: "deep_ocean_neptune_grade_master.mp4",
      title: "Neptune Oceanography Cut",
      client: "Deep Ocean Institute",
      category: "grading",
      categoryLabel: "Scientific Docu-Series",
      thumbnailUrl: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4",
      aspect: "horizontal",
      fileSize: "1.12 GB",
      fps: "25.00 fps",
    },
  ];

  const filteredProjects = showreels.filter(item => {
    if (activeCategory === "all") return true;
    if (activeCategory === "short") return item.aspect === "vertical";
    if (activeCategory === "long") return item.aspect === "horizontal";
    return item.category === activeCategory;
  });

  const filterTabs = [
    { id: "all", label: "All Work" },
    { id: "short", label: "Short Form" },
    { id: "long", label: "Long Form" },
    { id: "dialogue", label: "Podcast & Dialogue" },
    { id: "grading", label: "Color & Finishing" }
  ];

  const featuredProject = filteredProjects[0] ?? showreels[0];
  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97, filter: "blur(8px)" },
    show: (idx: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: Math.min(idx * 0.045, 0.28),
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.98,
      filter: "blur(6px)",
      transition: { duration: 0.22, ease: "easeOut" },
    },
  };

  return (
    <section 
      id="showcase" 
      className="pt-24 pb-32 md:pb-24 bg-[#FBFBFA] select-none overflow-hidden"
      style={{ paddingBottom: "calc(8rem + env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Route Header Info */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C69214] uppercase mb-2 font-bold">
              <span>Portfolio</span>
              <span>•</span>
              <span>Selected post-production work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase text-[#1A1A1A]">
              Recent <span className="text-[#C69214]">Video Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-xs md:text-sm text-[#5F6368] leading-relaxed font-sans font-normal">
            A cleaner look at short-form edits, podcast clips, branded motion, color finishing, and long-form video projects produced for creators, brands, and content teams.
          </p>
        </div>

        {/* Featured project */}
        <motion.div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedProject(featuredProject)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setSelectedProject(featuredProject);
            }
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.28, ease: "easeOut" } }}
          whileTap={{ scale: 0.992 }}
          className="group w-full max-w-full min-w-0 mb-10 text-left bg-[#111111] rounded-[28px] overflow-hidden border border-black/10 shadow-[0_30px_70px_rgba(0,0,0,0.16)] grid grid-cols-1 lg:grid-cols-12 clickable"
        >
          <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[320px] overflow-hidden">
            <img
              src={featuredProject.thumbnailUrl}
              alt={featuredProject.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-hover:translate-x-1"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/18 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-[420%] transition-all duration-[1200ms] ease-out z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/65" />
            <div className="absolute left-5 bottom-5 flex items-center gap-2 text-white">
              <span className="h-10 w-10 rounded-full bg-white text-[#111] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                <Play className="w-4 h-4 fill-[#111] translate-x-0.5" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold transition-transform duration-300 group-hover:translate-x-1">Play featured work</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-7 md:p-9 flex flex-col justify-between min-h-[320px] min-w-0 overflow-hidden">
            <div className="min-w-0">
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#C69214] uppercase tracking-widest font-bold mb-5">
                <Sparkles className="w-4 h-4" />
                <span>Featured Project</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-4">
                {featuredProject.title}
              </h3>
              <p className="text-sm text-white/68 leading-relaxed max-w-full">
                {featuredProject.categoryLabel} for {featuredProject.client}. Built for stronger pacing, cleaner presentation, and platform-ready delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 min-w-0">
              <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-3 min-w-0">
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest mb-1">Format</span>
                <span className="text-white text-xs font-bold">{featuredProject.aspect === "vertical" ? "9:16" : "16:9"}</span>
              </div>
              <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-3 min-w-0">
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest mb-1">Service</span>
                <span className="text-white text-xs font-bold">Editing</span>
              </div>
              <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-3 min-w-0">
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest mb-1">Status</span>
                <span className="text-white text-xs font-bold">Delivered</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          layout
          className="flex flex-wrap items-center gap-2.5 mb-8 border-b border-[#E2E2DF] pb-5"
        >
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                layout
                className={`relative px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 rounded-full border font-bold clickable ${
                  isActive
                    ? "bg-[#202124] border-[#202124] text-white shadow-sm"
                    : "bg-white border-[#E2E2DF] text-[#5F6368] hover:border-[#202124] hover:text-[#1A1A1A]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="showcase-filter-dot"
                    className="w-1.5 h-1.5 rounded-full bg-[#C69214] inline-block mr-2"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                {tab.label}
              </motion.button>
            );
          })}
          <span className="ml-auto hidden md:inline font-mono text-[10px] text-[#A0A0A0] uppercase tracking-widest">
            {filteredProjects.length} projects
          </span>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item, idx) => {
              const isHovered = hoveredCardId === item.id;
              const isVertical = item.aspect === "vertical";

              return (
                <motion.div
                  layout
                  key={item.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  transition={{ layout: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }}
                  whileHover={{ y: -6, transition: { duration: 0.24, ease: "easeOut" } }}
                  whileTap={{ scale: 0.985 }}
                  onMouseEnter={() => setHoveredCardId(item.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => setSelectedProject(item)}
                  data-cursor="showreel"
                  className="group cursor-pointer bg-white border border-[#E2E2DF] rounded-[22px] overflow-hidden hover:border-[#1A1A1A] hover:shadow-[0_24px_55px_rgba(0,0,0,0.12)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col relative"
                >
                  <div className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(120deg,transparent,rgba(198,146,20,0.08),transparent)] z-20" />
                  <div className={`relative w-full overflow-hidden bg-[#0F0F0F] ${
                    isVertical ? "aspect-[4/5]" : "aspect-[16/10]"
                  }`}>
                    
                    {/* Hover silent preview video */}
                    <AnimatePresence>
                      {isHovered ? (
                        <motion.video
                          key="preview-video"
                          src={item.videoUrl}
                          ref={(el) => {
                            if (el) {
                              el.play().catch((err) => {
                                console.warn("Autoplay was prevented:", err);
                              });
                            }
                          }}
                          muted
                          playsInline
                          loop
                          preload="auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="absolute inset-0 w-full h-full object-cover z-10"
                        />
                      ) : (
                        <motion.img
                          key="preview-thumbnail"
                          src={item.thumbnailUrl}
                          alt={item.title}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/85 transition-all duration-300 z-10" />

                    <div className="absolute inset-x-4 bottom-4 z-20 flex items-end justify-between gap-4">
                      <div>
                        <span className="inline-flex mb-2 font-mono text-[9px] text-[#C69214] tracking-widest uppercase font-bold">
                          {item.categoryLabel}
                        </span>
                        <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <span className="shrink-0 h-10 w-10 rounded-full bg-white text-[#111] flex items-center justify-center shadow-lg opacity-95 group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-[#111] translate-x-0.5" />
                      </span>
                    </div>

                    <div className="absolute top-4 left-4 font-mono text-[8px] text-[#1A1A1A] font-bold tracking-widest uppercase flex items-center gap-1.5 bg-white/92 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm z-20">
                      <Film className="w-2.5 h-2.5 text-[#C69214]" />
                      {isVertical ? "Short Form" : "Long Form"}
                    </div>
                  </div>

                  <div className="p-5 text-left flex flex-col gap-4 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[9px] text-[#A0A0A0] uppercase tracking-widest font-bold block mb-1">
                          Client
                        </span>
                        <p className="text-sm font-bold text-[#1A1A1A]">{item.client}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#C69214] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t border-[#E2E2DF] pt-4 font-mono text-[9px] text-[#5F6368] uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C69214]" />
                        Delivered
                      </span>
                      <span>{isVertical ? "9:16" : "16:9"}</span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Project preview modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(18px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed inset-0 z-[1001] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 select-none"
            >
              
              {/* Back close action overlay */}
              <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedProject(null)} />

              {/* Preview wrapper */}
              <motion.div 
                initial={{ scale: 0.92, y: 24, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0.94, y: 18, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-6xl bg-[#0A0A0A] rounded-[28px] border border-white/10 overflow-hidden z-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              >
                
                {/* Floating close action button */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-3 bg-black/80 hover:bg-[#C69214] text-white hover:text-black rounded-full border border-white/10 hover:border-[#C69214] transition-all duration-300 clickable"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Live video player */}
                <div className="aspect-video w-full h-full bg-black flex items-center justify-center">
                  <video
                    src={selectedProject.videoUrl}
                    ref={(el) => {
                      if (el) {
                        el.play().catch((err) => {
                          console.warn("Autoplay was prevented:", err);
                        });
                      }
                    }}
                    autoPlay
                    controls
                    playsInline
                    preload="auto"
                    className="max-h-[80vh] w-full object-contain"
                  />
                </div>

                <div className="bg-[#050505] px-6 py-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                  <div>
                    <span className="font-mono text-[9px] text-[#C69214] tracking-widest uppercase font-bold">
                      {selectedProject.categoryLabel}
                    </span>
                    <h3 className="text-white text-xl font-black uppercase tracking-tight mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[9px] text-white/55 tracking-widest uppercase font-bold">
                    <span>{selectedProject.client}</span>
                    <span className="w-1 h-1 rounded-full bg-[#C69214]" />
                    <span>{selectedProject.aspect === "vertical" ? "Short-form edit" : "Long-form edit"}</span>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
