import { useState } from "react";
import { Phone, Mail, Clock, Radio, Shield, Layers, Award, CheckCircle } from "lucide-react";
import IncreasingCounter from "./IncreasingCounter";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  skills: string[];
}

export default function TeamSection() {
  const [imgFailed, setImgFailed] = useState(false);

  const team: TeamMember[] = [
    {
      name: "Aman Donga",
      role: "Co-Founder & CEO",
      bio: "Leads client operations, project planning, and delivery systems so every edit moves from brief to final file with clarity and speed.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      skills: ["Client Strategy", "Project Operations", "Delivery Systems"],
    },
    {
      name: "Het Vaghasiya",
      role: "Co-Founder & COO / Creative Director",
      bio: "Shapes the creative direction, pacing, visual style, and sound approach behind each project, keeping client content consistent and polished.",
      avatarUrl: "/het_portrait_2.png",
      skills: ["Creative Direction", "Visual Style", "Motion Design"],
    },
    {
      name: "Harsh Parmar",
      role: "Senior Video Editor",
      bio: "Specializes in clean timelines, color polish, dynamic edits, and audio assembly for short-form, long-form, and campaign content.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      skills: ["Premiere Pro", "Color Polish", "Sound Design"],
    },
    {
      name: "Jimit Ramani",
      role: "Junior Video Editor",
      bio: "Focuses on vertical editing, captions, pacing, and motion details that make social-first content feel sharp and consistent.",
      avatarUrl: "/jimit_portrait.jpeg",
      skills: ["Vertical Editing", "Captions", "Dialogue Pacing"],
    },
  ];

  const valueProps = [
    {
      title: "Direct Access",
      desc: "Work directly with the people editing your content. Clear communication keeps feedback simple and revisions faster.",
      icon: Shield,
      number: 100,
      suffix: "%",
      label: "DIRECT COMMUNICATION"
    },
    {
      title: "Professional Tools",
      desc: "We use trusted editing, motion, audio, and review tools to keep projects organized and delivery quality consistent.",
      icon: Layers,
      number: 2,
      suffix: " CORE ENGINES",
      label: "POST-PRODUCTION STACK"
    },
    {
      title: "Audience Focused",
      desc: "Every edit is shaped around clear hooks, smooth pacing, readable captions, and a stronger viewing experience.",
      icon: Award,
      number: 98,
      suffix: "% FOCUS",
      label: "VIEWER EXPERIENCE"
    },
  ];

  return (
    <section 
      id="team" 
      className="pt-32 pb-40 md:pb-32 bg-[#FBFBFA] select-none"
      style={{ paddingBottom: "calc(10rem + env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Route Header Info */}
        <div className="mb-24">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C69214] uppercase mb-2">
            <span>OUR TEAM</span>
            <span>•</span>
            <span>POST-PRODUCTION SPECIALISTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase text-[#1A1A1A]">
            CREATIVE <span className="text-[#C69214]">TEAM</span>
          </h2>
          <p className="max-w-xl text-xs md:text-sm text-[#5F6368] leading-relaxed font-sans mt-2">
            Meet the creative and operations team behind Blackframe Labs, built to support professional video editing, content repurposing, and consistent delivery.
          </p>
        </div>

        {/* 60/40 Asymmetric Grid Rhythm for Workspace + Team notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-28">
          
          {/* Left Column (60% width equivalent => lg:col-span-7): Premium Workspace Image */}
          <div className="lg:col-span-7 lg:sticky lg:top-32">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2E2DF] shadow-sm bg-white p-2">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200"
                alt="Blackframe Labs Workspace"
                onError={() => setImgFailed(true)}
                className="w-full aspect-[16/10] object-cover rounded-xl contrast-105 saturate-95"
                referrerPolicy="no-referrer"
              />
              
              {/* Clinical Technical HUD overlay */}
              <div className="mt-4 p-4 bg-[#F5F5F3] rounded-lg border border-[#E2E2DF] flex justify-between items-center font-mono text-[9px] text-[#5F6368]">
              <span>Editing, motion, captions, color, and sound</span>
              <span>Remote post-production studio</span>
              </div>
            </div>
          </div>

          {/* Right Column (40% width equivalent => lg:col-span-5): Team Notes */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-[10px] text-[#C69214] tracking-widest uppercase block font-bold">
              Team members
            </span>
            
            {/* Scrollable list of team members */}
            <div className="space-y-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-white border border-[#E2E2DF] rounded-2xl p-5 hover:border-[#1A1A1A] hover:shadow-sm transition-all duration-300 group flex gap-5 items-start"
                >
                  {/* Portrait Avatar with Premium Grayscale to Color Transition */}
                  <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden border border-[#E2E2DF] bg-[#F5F5F3] relative outline outline-2 outline-offset-2 outline-transparent group-hover:outline-[#C69214]/50 transition-all duration-500">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      onError={(event) => {
                        event.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400";
                      }}
                      className="w-full h-full object-cover team-avatar-img"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="absolute top-1 left-1 bg-black/80 px-1 py-0.5 rounded text-[7px] font-mono tracking-widest text-[#C69214]">
                      Team
                    </div>
                  </div>

                  {/* Member info */}
                  <div className="space-y-2 flex-grow text-left">
                    <div>
                      <h4 className="text-md font-extrabold uppercase text-[#1A1A1A] group-hover:text-[#C69214] transition-colors">
                        {member.name}
                      </h4>
                      {/* Line-by-line reveal under role */}
                      <div className="overflow-hidden h-4">
                        <span className="font-mono text-[9px] tracking-widest text-[#5F6368] uppercase block font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#5F6368] leading-relaxed font-sans">
                      {member.bio}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1 pt-1.5 font-mono text-[8px] uppercase tracking-wider text-[#C69214]">
                      {member.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-1.5 py-0.5 bg-[#F5F5F3] border border-[#E2E2DF] rounded hover:border-[#C69214] transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Value Propositions Sub-Grid */}
        <div className="mb-28">
          <div className="border-b border-[#E2E2DF] pb-4 mb-10">
            <span className="font-mono text-[10px] text-[#C69214] tracking-widest uppercase block mb-1 font-bold">
              Why clients work with us
            </span>
            <h3 className="text-xl font-black uppercase text-[#1A1A1A]">
              Clear process. Professional delivery.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop) => {
              const PropIcon = prop.icon;
              return (
                <div 
                  key={prop.title}
                  className="bg-white border border-[#E2E2DF] rounded-2xl p-6 hover:border-[#1A1A1A] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-[#F5F5F3] border border-[#E2E2DF] text-[#1A1A1A] rounded-xl inline-block group-hover:bg-[#C69214]/10 group-hover:text-[#C69214] transition-all duration-300">
                        <PropIcon className="w-5 h-5 text-[#C69214]" />
                      </div>
                      
                      {/* Counter counts up sequentially from 0 on viewport entry */}
                      <span className="font-mono text-xl font-black text-[#1A1A1A] group-hover:text-[#C69214] transition-colors">
                        <IncreasingCounter value={prop.number} suffix={prop.suffix} />
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-bold uppercase text-[#1A1A1A] tracking-tight mb-1">
                        {prop.title}
                      </h4>
                      <span className="font-mono text-[8px] text-[#C69214] block tracking-widest uppercase mb-2 font-bold">
                        {prop.label}
                      </span>
                    </div>
                    
                    <p className="text-xs text-[#5F6368] leading-relaxed font-sans">
                      {prop.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 font-mono text-[8px] text-[#D0D0CD] tracking-widest uppercase font-bold">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C69214]" />
                    <span>Client-ready workflow</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Operations Command Center Banner */}
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          {/* Accent border top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#C69214]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Column 1 */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#C69214] tracking-widest uppercase font-bold">
                <Radio className="w-4 h-4 animate-pulse" />
                Global editing support
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white">
                Remote post-production team <span className="text-[#C69214]">serving global clients</span>
              </h3>
              
              <p className="text-xs md:text-sm text-[#D0D0CD] font-light leading-relaxed max-w-xl font-sans select-text">
                Our remote post-production team supports clients across time zones with organized project handoffs, clear timelines, and flexible delivery for urgent edits and recurring content.
              </p>
            </div>

            {/* Column 2: Direct Contacts */}
            <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10 space-y-5 font-mono text-xs">
              
              {/* WhatsApp Call / Line */}
              <a
                href="https://wa.me/919428614172"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 hover:bg-[#C69214]/15 border border-white/5 hover:border-[#C69214]/30 rounded-2xl transition-all duration-300 group clickable"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C69214]/10 flex items-center justify-center border border-[#C69214]/20 group-hover:bg-[#C69214] transition-colors">
                  <Phone className="w-4 h-4 text-[#C69214] group-hover:text-black" />
                </div>
                <div className="text-left">
                  <span className="text-[8px] text-[#D0D0CD] tracking-widest uppercase block mb-0.5">
                    Phone / WhatsApp Call
                  </span>
                  <span className="text-xs md:text-sm font-bold text-white tracking-tight">
                    +91 94286 14172
                  </span>
                </div>
              </a>

              {/* Official Email */}
              <a
                href="mailto:hello@blackframelab.com"
                className="flex items-center gap-4 p-4 bg-white/5 hover:bg-[#C69214]/15 border border-white/5 hover:border-[#C69214]/30 rounded-2xl transition-all duration-300 group clickable"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C69214]/10 flex items-center justify-center border border-[#C69214]/20 group-hover:bg-[#C69214] transition-colors">
                  <Mail className="w-4 h-4 text-[#C69214] group-hover:text-black" />
                </div>
                <div className="text-left">
                  <span className="text-[8px] text-[#D0D0CD] tracking-widest uppercase block mb-0.5">
                    Official Command Mail
                  </span>
                  <span className="text-xs md:text-sm font-bold text-white tracking-tight">
                    hello@blackframelab.com
                  </span>
                </div>
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
