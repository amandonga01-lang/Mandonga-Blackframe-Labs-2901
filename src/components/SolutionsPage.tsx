import { motion } from "motion/react";
import { UserCheck, Layers, Repeat, Compass, CheckCircle } from "lucide-react";

export default function SolutionsPage() {
  const solutions = [
    {
      id: "dedicated-editor",
      title: "Dedicated Editor",
      icon: UserCheck,
      description: "Your brand gets a consistent editor who understands your style, pacing, audience, and content goals. This is ideal for creators, founders, coaches, agencies, and businesses that need regular editing without explaining the same vision every time.",
      capabilities: [
        "Short-form videos & long-form edits",
        "YouTube content & podcast clips",
        "Captions, hooks & pacing",
        "Sound design & platform-ready exports"
      ],
      bestFor: "Ongoing content, personal brands, weekly uploads, social media growth, founder-led content."
    },
    {
      id: "project-based",
      title: "Project Based",
      icon: Layers,
      description: "For one-time edits, launches, campaigns, event videos, real estate showcases, ads, reels, brand films, or YouTube videos, we work project by project with a clear scope and timeline.",
      capabilities: [
        "Raw footage organization & sync",
        "Reference matching & goal alignment",
        "Polished cinematic final edits",
        "Story, retention & clarity focus"
      ],
      bestFor: "Campaign edits, launch videos, one-off YouTube videos, showreels, real estate videos, ads, and event content."
    },
    {
      id: "retainer",
      title: "Retainer",
      icon: Repeat,
      description: "For brands that need consistent output every month, our retainer gives you a reliable editing system. We plan, edit, refine, and deliver content on a recurring schedule so your brand never slows down.",
      capabilities: [
        "Short-form clips & long-form videos",
        "Podcast repurposing & YouTube edits",
        "Social media cuts & captioning",
        "Thumbnails direction & writing support"
      ],
      bestFor: "Agencies, creators, podcasts, startups, real estate teams, coaches, and brands posting every week."
    },
    {
      id: "consulting",
      title: "Consulting",
      icon: Compass,
      description: "If you already have editors or a team, we help improve your content system. We review your current workflow, edit style, retention, hooks, structure, posting format, and content strategy.",
      capabilities: [
        "System & workflow audits",
        "Creative direction & structure",
        "Retention & hook analysis",
        "Production speed optimization"
      ],
      bestFor: "Teams that need creative direction, workflow improvement, content strategy, or editing feedback."
    }
  ];
  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.98, filter: "blur(8px)" },
    show: (idx: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.56,
        delay: idx * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="pt-32 pb-32 lg:pb-40 bg-[#FBFBFA] select-none min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="mb-20 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest text-[#C69214] uppercase mb-4 font-bold">
              <span>BLACKFRAME LABS</span>
              <span>•</span>
              <span>SERVICE MODELS</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase text-[#1A1A1A] mb-6">
              Video Editing <span className="text-[#C69214]">Solutions.</span>
            </h1>
            <p className="text-sm md:text-base text-[#5F6368] leading-relaxed font-sans select-text max-w-2xl mx-auto">
              Choose the video editing model that fits your content schedule, from one-time projects to ongoing monthly post-production support.
            </p>
          </motion.div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {solutions.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.id}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                whileHover={{ y: -8, scale: 1.015, transition: { delay: 0, duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.992 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group bg-white border border-[#E2E2DF] rounded-3xl p-6 md:p-8 hover:border-[#C69214] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-colors duration-500 flex flex-col justify-between z-10 relative hover:z-20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(198,146,20,0.07),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#F5F5F3] border border-[#E2E2DF] text-[#1A1A1A] group-hover:text-[#C69214] group-hover:bg-[#C69214]/10 rounded-2xl transition-all duration-300">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black uppercase text-[#1A1A1A] tracking-tight group-hover:text-[#C69214] transition-colors">
                      {solution.title}
                    </h2>
                  </div>

                  <p className="text-[#5F6368] text-xs md:text-sm leading-relaxed font-sans mb-6 select-text">
                    {solution.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    <span className="font-mono text-[9px] text-[#A0A0A0] tracking-widest uppercase font-bold block mb-3">
                      INCLUDED CAPABILITIES
                    </span>
                    {solution.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C69214] shrink-0 mt-0.5" />
                        <span className="text-[13px] md:text-sm font-medium text-[#1A1A1A] select-text">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#E2E2DF] mt-auto">
                  <div className="font-mono text-[9px] text-[#C69214] tracking-widest uppercase font-bold mb-1.5">
                    IDEAL FIT //
                  </div>
                  <p className="text-[#1A1A1A] text-xs md:text-[13px] leading-relaxed font-bold uppercase tracking-wide select-text">
                    {solution.bestFor}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
