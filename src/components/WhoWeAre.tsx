import { useState } from "react";
import IncreasingCounter from "./IncreasingCounter";

export default function WhoWeAre() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="pt-20 pb-28 md:pb-20 bg-[#FBFBFA] select-none">
      <div className="max-w-7xl mx-auto px-6 text-left">
        
        {/* Title */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C69214] uppercase mb-2 font-bold">
            <span>ABOUT BLACKFRAME LABS</span>
            <span>•</span>
            <span>VIDEO EDITING AGENCY</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase text-[#1A1A1A]">
            ABOUT <span className="text-[#C69214]">BLACKFRAME LABS</span>
          </h2>
        </div>

        {/* 60/40 Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image (60% width on large screens => lg:col-span-7) */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E2DF] bg-white p-2 shadow-sm transition-all duration-500 hover:border-[#1A1A1A]">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200"
                alt="Professional video editing workspace at Blackframe Labs"
                onError={() => setImgFailed(true)}
                className="w-full aspect-[16/10] object-cover rounded-xl contrast-105 saturate-95 group-hover:scale-[1.01] transition-transform duration-[1s]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Geometric lens tag overlay */}
            <div className="absolute bottom-6 left-6 bg-[#1A1A1A] text-white border border-white/10 px-4 py-2.5 rounded-xl text-left font-mono">
              <div className="text-[8px] text-[#C69214] tracking-widest uppercase font-bold">BLACKFRAME STUDIO</div>
              <div className="text-[10px] text-white font-bold">POST-PRODUCTION WORKSPACE</div>
            </div>
          </div>

          {/* Right Column: Narrative + Raw Stats (40% width => lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-[#1A1A1A] leading-tight">
                A focused post-production team <span className="text-[#C69214]">built for consistent content.</span>
              </h3>
              
              <p className="text-[#5F6368] text-xs md:text-sm font-sans font-normal leading-relaxed select-text">
                Blackframe Labs is a professional video editing studio for brands, creators, agencies, podcasts, and real estate teams that need reliable post-production support. We turn raw footage into polished videos that are easier to watch, share, and publish.
              </p>
              
              <p className="text-[#5F6368] text-xs md:text-sm font-sans font-normal leading-relaxed select-text">
                Our team manages the complete editing workflow, including story structure, pacing, captions, color, sound design, motion graphics, and platform-specific exports. Whether you need short-form reels, listing videos, podcast clips, YouTube edits, or ad creatives, we keep the process clear and the final output professional.
              </p>
            </div>

            {/* Raw Retention Statistics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E2E2DF] select-text">
              
              {/* Stat 1 */}
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-[#D0D0CD] tracking-widest uppercase block font-bold">
                  PROJECTS DELIVERED
                </span>
                <span className="text-2xl md:text-3xl font-black tracking-tight text-[#1A1A1A] block font-mono">
                  <IncreasingCounter value={1200} suffix="+" />
                </span>
                <span className="text-[8px] text-[#C69214] font-mono uppercase tracking-wider block font-bold">
                  VIDEO ASSETS
                </span>
              </div>

              {/* Stat 2 */}
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-[#D0D0CD] tracking-widest uppercase block font-bold">
                  ACTIVE PARTNERS
                </span>
                <span className="text-2xl md:text-3xl font-black tracking-tight text-[#1A1A1A] block font-mono">
                  <IncreasingCounter value={40} suffix="+" />
                </span>
                <span className="text-[8px] text-[#C69214] font-mono uppercase tracking-wider block font-bold">
                  CREATORS & BRANDS
                </span>
              </div>

              {/* Stat 3 */}
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-[#D0D0CD] tracking-widest uppercase block font-bold">
                  ON-TIME DELIVERY
                </span>
                <span className="text-2xl md:text-3xl font-black tracking-tight text-[#C69214] block font-mono">
                  <IncreasingCounter value={99} suffix=".8%" />
                </span>
                <span className="text-[8px] text-[#1A1A1A] font-mono uppercase tracking-wider block font-bold">
                  DELIVERY RATE
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
