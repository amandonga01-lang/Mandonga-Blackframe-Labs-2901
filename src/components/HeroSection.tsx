import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Play, Terminal, Film } from "lucide-react";

interface HeroSectionProps {
  onPathChange: (path: string) => void;
  startAnimation?: boolean;
}

export default function HeroSection({ onPathChange, startAnimation = true }: HeroSectionProps) {
  const [prefixIndex, setPrefixIndex] = useState(0);

  const editingPrefixes = [
    ["CINEMATIC", "VIDEO"],
    ["SHORT", "&", "LONG", "FORM"],
    ["PODCAST"],
    ["YOUTUBE"]
  ];

  useEffect(() => {
    if (!startAnimation) return;
    const interval = setInterval(() => {
      setPrefixIndex((prev) => (prev + 1) % editingPrefixes.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [startAnimation]);

  const words = [...editingPrefixes[prefixIndex], "EDITING."];

  return (
    <section
      id="hero"
      className="relative min-h-[68svh] md:min-h-[75vh] flex flex-col justify-center items-center px-6 pb-10 md:pb-0 overflow-hidden select-none bg-[#FBFBFA]"
    >
      {/* Subtle Grid Accent lines - NotebookLM inspired paper style */}
      <motion.div
        initial={{ opacity: 0, backgroundPosition: "0rem 0rem" }}
        animate={startAnimation ? { opacity: 1, backgroundPosition: "4rem 4rem" } : { opacity: 0, backgroundPosition: "0rem 0rem" }}
        transition={{ opacity: { duration: 1.2 }, backgroundPosition: { duration: 28, ease: "linear", repeat: Infinity } }}
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
      />

      {/* Hero Content Wrapper */}
      <div className="max-w-7xl w-full text-center space-y-6 relative z-10 pt-8">

        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="font-mono text-[9px] tracking-[0.35em] text-[#C69214] uppercase font-bold bg-[#C69214]/5 border border-[#C69214]/10 px-3 py-1 rounded-full">
            PROFESSIONAL VIDEO EDITING & POST-PRODUCTION STUDIO
          </span>
        </motion.div>

        {/* Word-by-word Slide-Up Display Headline with Auto-Cycling */}
        <div className="min-h-[140px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[220px] flex items-center justify-center w-full">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[85px] font-black uppercase tracking-tight w-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={prefixIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-1 w-full"
              >
                {words.map((word, idx) => {
                  const isEditing = word === "EDITING.";
                  return (
                    <div key={`${prefixIndex}-${idx}`} className="overflow-hidden py-1.5 inline-block">
                      <motion.span
                        initial={{ y: "115%", filter: "blur(8px)", opacity: 0 }}
                        animate={startAnimation ? { y: "0%", filter: "blur(0px)", opacity: 1 } : { y: "115%", filter: "blur(8px)", opacity: 0 }}
                        exit={{ y: "-115%", filter: "blur(8px)", opacity: 0 }}
                        transition={{
                          duration: 0.85,
                          delay: idx * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`inline-block ${isEditing
                            ? "text-[#C69214] font-black"
                            : "text-[#1A1A1A] font-black"
                          }`}
                      >
                        {word}
                      </motion.span>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-[#1A1A1A] font-sans text-sm md:text-base font-semibold tracking-tight uppercase"
        >
          Video Editing for Brands, Creators, Podcasts, and Real Estate Teams
        </motion.div>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-xs md:text-sm text-[#5F6368] font-sans font-normal leading-relaxed select-text"
        >
          Blackframe Labs turns raw footage into clean, strategic, platform-ready videos. We help businesses, creators, agencies, podcasts, and real estate teams publish sharper content with better pacing, captions, sound design, and visual consistency.
        </motion.p>

        {/* CTA Button Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={startAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {/* Main Action CTA */}
          <motion.button
            onClick={() => onPathChange("/book")}
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full sm:w-auto h-12 px-8 bg-[#1A1A1A] hover:bg-black text-white font-mono text-[10px] tracking-widest uppercase font-bold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2.5 group clickable"
          >
            <Terminal className="w-4 h-4 text-[#C69214]" />
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>

          {/* Secondary Action */}
          <motion.button
            onClick={() => onPathChange("/showcase")}
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full sm:w-auto h-12 px-8 bg-white hover:border-[#1A1A1A] text-[#1A1A1A] font-mono text-[10px] tracking-widest uppercase font-bold rounded-xl border border-[#E2E2DF] transition-all duration-300 flex items-center justify-center gap-2.5 clickable group"
          >
            <Film className="w-4 h-4 text-[#C69214]" />
            <span>View Work</span>
            <Play className="w-3.5 h-3.5 text-[#C69214] fill-[#C69214] transition-transform group-hover:scale-110" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
