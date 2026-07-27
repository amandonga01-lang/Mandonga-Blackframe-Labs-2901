import { motion } from "motion/react";
import { ArrowRight, Zap, Globe, Sparkles } from "lucide-react";

export default function CareersPage() {
  const roles = [
    {
      title: "Senior Video Editor",
      type: "Full-Time",
      location: "Remote (Global)",
      description: "We are looking for a skilled editor who understands pacing, storytelling, captions, sound, and platform-ready delivery. Premiere Pro and After Effects experience is required.",
    },
    {
      title: "Motion Graphics Designer",
      type: "Contract",
      location: "Remote (Global)",
      description: "Seeking a highly creative motion designer to build custom assets, typography, and visual effects for high-end YouTube and commercial projects.",
    },
    {
      title: "Content Strategist",
      type: "Full-Time",
      location: "Remote (Global)",
      description: "Looking for an analytical mind to script hooks, analyze retention graphs, and direct the creative flow of our top-tier clients' content.",
    }
  ];
  const reveal = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    show: (idx: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        delay: idx * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const perks = [
    {
      title: "Remote First",
      description: "Work from anywhere in the world. We care about output, not office hours.",
      icon: Globe
    },
    {
      title: "Elite Clients",
      description: "Work with creators, founders, agencies, and brands that care about quality and consistency.",
      icon: Sparkles
    },
    {
      title: "High Performance",
      description: "Join a culture of relentless improvement. We build systems to work faster and better.",
      icon: Zap
    }
  ];

  return (
    <section className="pt-32 pb-32 bg-[#FBFBFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        
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
              <span>CAREERS</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase text-[#1A1A1A] mb-6">
              Join <span className="text-[#C69214]">Blackframe Labs.</span>
            </h1>
            <p className="text-sm md:text-base text-[#5F6368] leading-relaxed font-sans select-text max-w-2xl mx-auto">
              We are building a focused remote team of editors, motion designers, and content strategists who care about clean work, reliable delivery, and thoughtful creative decisions.
            </p>
          </motion.div>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <motion.div 
                key={i}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white border border-[#E2E2DF] rounded-2xl p-6 flex flex-col items-start hover:border-[#C69214] hover:shadow-[0_18px_38px_rgba(0,0,0,0.08)] transition-colors duration-300"
              >
                <div className="p-3 bg-[#F5F5F3] rounded-xl mb-4 text-[#C69214]">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide text-sm">{perk.title}</h3>
                <p className="text-xs text-[#5F6368] leading-relaxed">{perk.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Open Roles */}
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#1A1A1A] mb-8 flex items-center gap-3">
            Open <span className="text-[#C69214]">Roles</span>
          </h2>
          
          <div className="flex flex-col gap-4">
            {roles.map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.006, transition: { duration: 0.22, ease: "easeOut" } }}
                whileTap={{ scale: 0.992 }}
                className="group bg-white border border-[#E2E2DF] hover:border-[#C69214] rounded-2xl p-6 md:p-8 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                onClick={() => window.location.href = "mailto:hello@blackframelabs.com?subject=Application:%20" + encodeURIComponent(role.title)}
              >
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] uppercase tracking-wide group-hover:text-[#C69214] transition-colors">{role.title}</h3>
                    <span className="px-2.5 py-1 bg-[#F5F5F3] text-[#5F6368] text-[10px] font-mono font-bold tracking-wider uppercase rounded-full">
                      {role.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A0A0A0] font-mono tracking-widest uppercase mb-4">
                    {role.location}
                  </div>
                  <p className="text-sm text-[#5F6368] leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[#1A1A1A] group-hover:text-[#C69214] font-bold text-sm tracking-wide uppercase transition-colors shrink-0">
                  Apply Now 
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F3] group-hover:bg-[#C69214]/10 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* General Application */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-[#1A1A1A] rounded-2xl text-center border border-[#333]"
        >
          <h3 className="text-white font-bold uppercase tracking-wide mb-2">Don't see your role?</h3>
          <p className="text-[#A0A0A0] text-sm mb-6">We are always looking for exceptional talent. Send us your portfolio.</p>
          <a href="mailto:hello@blackframelabs.com?subject=General%20Application" className="inline-flex items-center justify-center h-10 px-6 bg-[#C69214] hover:bg-[#D4A32B] text-white font-bold text-[11px] tracking-widest uppercase rounded-full transition-colors">
            Send Portfolio
          </a>
        </motion.div>

      </div>
    </section>
  );
}
