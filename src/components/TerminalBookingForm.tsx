import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Send, Check, User, Mail, Link, Clock, MapPin, Radio, Phone, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const STUDIO_EMAIL = "hello@blackframelab.com";

export default function TerminalBookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    socialLink: "",
    location: "",
    services: [] as string[],
    duration: "",
    rawAssets: "",
    budget: "",
  });

  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const block4Ref = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLDivElement>(null);

  const availableServices = [
    "AI UGC Ads",
    "Short-Form Editing",
    "Podcast Repurposing",
    "Real Estate Video Editing",
    "Personal Brand Content",
    "Ad Creative Editing",
    "Motion Graphics & Captions",
  ];

  const budgetTiers = [
    "< $1k",
    "$1k - $3k",
    "$3k - $5k",
    "$5k - $10k",
    "$10k+",
  ];

  // Block completion calculations
  const isBlock1Complete = 
    formData.name.trim() !== "" && 
    formData.email.trim() !== "" && 
    formData.phone.trim() !== "" && 
    formData.socialLink.trim() !== "" && 
    formData.location.trim() !== "";

  const isBlock2Complete = formData.services.length > 0;

  const isBlock3Complete = 
    formData.duration.trim() !== "" && 
    formData.rawAssets.trim() !== "";

  const isBlock4Complete = formData.budget !== "";

  // Auto-scroll triggers when a block is completed
  useEffect(() => {
    if (isBlock1Complete && block2Ref.current) {
      block2Ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isBlock1Complete]);

  useEffect(() => {
    if (isBlock2Complete && block3Ref.current) {
      block3Ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isBlock2Complete]);

  useEffect(() => {
    if (isBlock3Complete && block4Ref.current) {
      block4Ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isBlock3Complete]);

  useEffect(() => {
    if (isBlock4Complete && submitRef.current) {
      submitRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isBlock4Complete]);

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [submitError, setSubmitError] = useState("");

  const buildBrief = () =>
    [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Channel / website: ${formData.socialLink}`,
      `Location: ${formData.location}`,
      `Services: ${formData.services.join(", ")}`,
      `Video length / volume: ${formData.duration}`,
      `Raw footage: ${formData.rawAssets}`,
      `Budget: ${formData.budget}`,
    ].join("\n");

  // Sends the brief to the studio inbox. With VITE_WEB3FORMS_KEY set (free key from web3forms.com)
  // it is delivered silently; otherwise the visitor's email app opens with the brief pre-filled.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const subject = `New project brief from ${formData.name}`;
    const key = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
    if (key) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: key, subject, from_name: "Blackframe Labs website", replyto: formData.email, message: buildBrief() }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setIsSubmitted(true);
        return;
      } catch {
        setSubmitError("We couldn't send that automatically. Your email app will open with the brief instead.");
      }
    }
    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBrief())}`;
    setIsSubmitted(true);
  };

  return (
    <section 
      id="book" 
      className="pt-24 pb-32 md:pb-24 bg-[#FBFBFA] select-none text-left"
      style={{ paddingBottom: "calc(8rem + env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="mb-16 text-left">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C69214] uppercase mb-2 font-bold">
            <span>START WORKING WITH US</span>
            <span>•</span>
            <span>QUOTE REQUEST</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase text-[#1A1A1A]">
            Request a <span className="text-[#C69214]">Project Quote</span>
          </h2>
          <p className="max-w-xl text-xs md:text-sm text-[#5F6368] leading-relaxed font-sans font-normal mt-2">
            Tell us what you need edited, share your goals, and we will review the project scope before recommending the right workflow.
          </p>
        </div>

        {/* 12-Column Split Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Extensive Single-Sheet Ingestion Matrix */}
          <div className="lg:col-span-8 bg-white border border-[#E2E2DF] rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
            
            {/* Top Sheet Watermark */}
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#C69214] via-[#1A1A1A] to-[#C69214]" />
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#E2E2DF] font-mono text-[9px] text-[#D0D0CD] tracking-widest uppercase font-bold text-left">
              <span>BLACKFRAME PROJECT BRIEF</span>
              <span>RESPONSE WITHIN 12 HOURS</span>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-12 text-left">
                
                {/* 01. CLIENT IDENTITY */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#F5F5F3] text-[#1A1A1A] border border-[#E2E2DF] rounded">
                        STEP 01
                      </span>
                      <h3 className="text-xs font-mono tracking-widest text-[#1A1A1A] uppercase font-bold">
                        CLIENT DETAILS
                      </h3>
                    </div>

                    {/* Gold indicator checkmark animates when block is completed */}
                    <AnimatePresence>
                      {isBlock1Complete && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex items-center gap-1 font-mono text-[9px] text-[#C69214] font-bold"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Completed</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Client Name */}
                    <div className="group relative flex flex-col">
                      <label className="font-mono text-[9px] text-[#5F6368] tracking-widest uppercase mb-1 flex items-center gap-2 group-focus-within:text-[#C69214] transition-colors font-bold">
                        <User className="w-3 h-3 text-[#D0D0CD]" /> CLIENT NAME
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Randall Shaw"
                          className="w-full py-2 bg-transparent text-[#1A1A1A] font-sans text-sm outline-none placeholder-[#D0D0CD] relative z-10 font-medium"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E2E2DF]" />
                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C69214] transition-all duration-300 ease-out group-focus-within:w-full" />
                        <div className="absolute inset-0 bg-[#C69214]/0 group-focus-within:bg-[#C69214]/[0.01] blur-md transition-all duration-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Client Email */}
                    <div className="group relative flex flex-col">
                      <label className="font-mono text-[9px] text-[#5F6368] tracking-widest uppercase mb-1 flex items-center gap-2 group-focus-within:text-[#C69214] transition-colors font-bold">
                        <Mail className="w-3 h-3 text-[#D0D0CD]" /> CLIENT EMAIL
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., randall@creator.com"
                          className="w-full py-2 bg-transparent text-[#1A1A1A] font-sans text-sm outline-none placeholder-[#D0D0CD] relative z-10 font-medium"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E2E2DF]" />
                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C69214] transition-all duration-300 ease-out group-focus-within:w-full" />
                        <div className="absolute inset-0 bg-[#C69214]/0 group-focus-within:bg-[#C69214]/[0.01] blur-md transition-all duration-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Phone Input with +1 prefix */}
                    <div className="group relative flex flex-col">
                      <label className="font-mono text-[9px] text-[#5F6368] tracking-widest uppercase mb-1 flex items-center gap-2 group-focus-within:text-[#C69214] transition-colors font-bold">
                        <Phone className="w-3 h-3 text-[#D0D0CD]" /> PHONE CONTACT (INTL)
                      </label>
                      <div className="relative flex items-center">
                        <span className="font-mono text-xs text-[#C69214] pr-2.5 select-none border-r border-[#E2E2DF] mr-2.5 py-0.5 font-bold">
                          +1
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="(555) 000-0000"
                          className="w-full py-2 bg-transparent text-[#1A1A1A] font-mono text-sm outline-none placeholder-[#D0D0CD] relative z-10"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E2E2DF]" />
                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C69214] transition-all duration-300 ease-out group-focus-within:w-full" />
                        <div className="absolute inset-0 bg-[#C69214]/0 group-focus-within:bg-[#C69214]/[0.01] blur-md transition-all duration-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Social Media Link */}
                    <div className="group relative flex flex-col">
                      <label className="font-mono text-[9px] text-[#5F6368] tracking-widest uppercase mb-1 flex items-center gap-2 group-focus-within:text-[#C69214] transition-colors font-bold">
                        <Link className="w-3 h-3 text-[#D0D0CD]" /> CHANNEL / PORTFOLIO LINK
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          name="socialLink"
                          value={formData.socialLink}
                          onChange={handleInputChange}
                          required
                          placeholder="https://youtube.com/@yourchannel"
                          className="w-full py-2 bg-transparent text-[#1A1A1A] font-sans text-sm outline-none placeholder-[#D0D0CD] relative z-10"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E2E2DF]" />
                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C69214] transition-all duration-300 ease-out group-focus-within:w-full" />
                        <div className="absolute inset-0 bg-[#C69214]/0 group-focus-within:bg-[#C69214]/[0.01] blur-md transition-all duration-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Exact Location */}
                    <div className="group relative flex flex-col md:col-span-2">
                      <label className="font-mono text-[9px] text-[#5F6368] tracking-widest uppercase mb-1 flex items-center gap-2 group-focus-within:text-[#C69214] transition-colors font-bold">
                        <MapPin className="w-3 h-3 text-[#D0D0CD]" /> EXACT LOCATION (CITY & REGION)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Los Angeles, California"
                          className="w-full py-2 bg-transparent text-[#1A1A1A] font-sans text-sm outline-none placeholder-[#D0D0CD] relative z-10"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E2E2DF]" />
                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C69214] transition-all duration-300 ease-out group-focus-within:w-full" />
                        <div className="absolute inset-0 bg-[#C69214]/0 group-focus-within:bg-[#C69214]/[0.01] blur-md transition-all duration-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 02. SERVICES REQUIRED */}
                <div 
                  ref={block2Ref}
                  className={`space-y-6 transition-all duration-500 ${isBlock1Complete ? "opacity-100" : "opacity-40 pointer-events-none"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#F5F5F3] text-[#1A1A1A] border border-[#E2E2DF] rounded">
                        STEP 02
                      </span>
                      <h3 className="text-xs font-mono tracking-widest text-[#1A1A1A] uppercase font-bold">
                        SELECT SERVICES
                      </h3>
                    </div>

                    <AnimatePresence>
                      {isBlock2Complete && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex items-center gap-1 font-mono text-[9px] text-[#C69214] font-bold"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Selected</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {availableServices.map((service) => {
                      const isSelected = formData.services.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`flex items-center justify-between p-4 rounded-xl border font-mono text-[11px] text-left tracking-wide transition-all duration-300 clickable ${
                            isSelected
                              ? "bg-[#C69214]/5 border-[#C69214] text-[#C69214] shadow-sm font-bold"
                              : "bg-[#F5F5F3] border-[#E2E2DF] text-[#5F6368] hover:border-[#202124]"
                          }`}
                        >
                          <span>{service}</span>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                            isSelected ? "bg-[#C69214] border-[#C69214] text-white" : "border-[#D0D0CD] bg-white"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 03. TIMELINE & ASSETS */}
                <div 
                  ref={block3Ref}
                  className={`space-y-6 transition-all duration-500 ${isBlock2Complete ? "opacity-100" : "opacity-40 pointer-events-none"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#F5F5F3] text-[#1A1A1A] border border-[#E2E2DF] rounded">
                        STEP 03
                      </span>
                      <h3 className="text-xs font-mono tracking-widest text-[#1A1A1A] uppercase font-bold">
                        ASSETS & TIMELINE
                      </h3>
                    </div>

                    <AnimatePresence>
                      {isBlock3Complete && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex items-center gap-1 font-mono text-[9px] text-[#C69214] font-bold"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Est Duration */}
                    <div className="group relative flex flex-col">
                      <label className="font-mono text-[9px] text-[#5F6368] tracking-widest uppercase mb-1 flex items-center gap-2 group-focus-within:text-[#C69214] transition-colors font-bold">
                        <Clock className="w-3 h-3 text-[#D0D0CD]" /> EST. RAW DURATION
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., 45 minutes"
                          className="w-full py-2 bg-transparent text-[#1A1A1A] font-sans text-sm outline-none placeholder-[#D0D0CD] relative z-10"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E2E2DF]" />
                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C69214] transition-all duration-300 ease-out group-focus-within:w-full" />
                        <div className="absolute inset-0 bg-[#C69214]/0 group-focus-within:bg-[#C69214]/[0.01] blur-md transition-all duration-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Drive Link */}
                    <div className="group relative flex flex-col md:col-span-2">
                      <label className="font-mono text-[9px] text-[#5F6368] tracking-widest uppercase mb-1 flex items-center gap-2 group-focus-within:text-[#C69214] transition-colors font-bold">
                        RAW FOOTAGE DRIVE LINK
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="rawAssets"
                          value={formData.rawAssets}
                          onChange={handleInputChange}
                          required
                          placeholder="Google Drive, Dropbox or Frame.io URL"
                          className="w-full py-2 bg-transparent text-[#1A1A1A] font-mono text-sm outline-none placeholder-[#D0D0CD] relative z-10"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E2E2DF]" />
                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C69214] transition-all duration-300 ease-out group-focus-within:w-full" />
                        <div className="absolute inset-0 bg-[#C69214]/0 group-focus-within:bg-[#C69214]/[0.01] blur-md transition-all duration-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 04. PROJECT BUDGET SELECTOR */}
                <div 
                  ref={block4Ref}
                  className={`space-y-6 transition-all duration-500 ${isBlock3Complete ? "opacity-100" : "opacity-40 pointer-events-none"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#F5F5F3] text-[#1A1A1A] border border-[#E2E2DF] rounded">
                        STEP 04
                      </span>
                      <h3 className="text-xs font-mono tracking-widest text-[#1A1A1A] uppercase font-bold">
                        PROJECT BUDGET
                      </h3>
                    </div>

                    <AnimatePresence>
                      {isBlock4Complete && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex items-center gap-1 font-mono text-[9px] text-[#C69214] font-bold"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Selected</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                    {budgetTiers.map((tier) => {
                      const isSelected = formData.budget === tier;
                      return (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, budget: tier }))}
                          className={`py-3.5 px-2 rounded-xl border font-mono text-xs text-center font-bold transition-all duration-300 clickable ${
                            isSelected
                              ? "bg-[#C69214]/10 border-[#C69214] text-[#C69214] shadow-sm"
                              : "bg-[#F5F5F3] border-[#E2E2DF] text-[#5F6368] hover:border-[#202124] hover:text-[#1A1A1A]"
                          }`}
                        >
                          {tier}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit CTA with Liquid Gold Background Flood */}
                <div ref={submitRef} className={`pt-6 transition-all duration-500 ${isBlock4Complete ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2, scale: 1.004 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative w-full h-14 rounded-2xl border border-[#C69214] overflow-hidden group/submit transition-colors duration-500 clickable flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.25em] text-[#C69214] hover:text-white font-bold"
                  >
                    {/* Liquid Background Flood Effect */}
                    <div className="absolute inset-0 bg-[#C69214] transform translate-y-full group-hover/submit:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                    
                    {/* Text content flipping color on hover */}
                    <span className="relative z-10 flex items-center gap-2 group-hover/submit:text-white">
                      Submit Project Brief <Send className="w-4 h-4" />
                    </span>
                  </motion.button>
                  {submitError && <p role="alert" className="mt-3 text-xs text-[#B3261E]">{submitError}</p>}
                </div>

              </form>
            ) : (
              // Success Ingestion Block
              <div className="py-12 px-4 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#C69214]/10 border border-[#C69214]/30 flex items-center justify-center mx-auto animate-pulse">
                  <Check className="w-8 h-8 text-[#C69214]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#1A1A1A]">
                    SUBMISSION RECEIVED
                  </h3>
                  <p className="max-w-md mx-auto text-xs md:text-sm text-[#5F6368] leading-relaxed font-normal font-sans">
                    Thank you, <span className="text-[#C69214] font-mono font-bold">{formData.name}</span>. Our production team has received your project details and will be in touch shortly.
                  </p>
                </div>

                <div className="max-w-md mx-auto p-5 bg-[#F5F5F3] rounded-2xl border border-[#E2E2DF] text-left font-mono text-[10px] text-[#5F6368] space-y-1.5 shadow-inner">
                  <div>Status: received</div>
                  <div>Location: {formData.location}</div>
                  <div>Phone: +1 {formData.phone}</div>
                  <div>Budget: {formData.budget || "Not specified"}</div>
                  <div>Selected services: {formData.services.length}</div>
                  <div>Next step: team review</div>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      socialLink: "",
                      location: "",
                      services: [],
                      duration: "",
                      rawAssets: "",
                      budget: "",
                    });
                  }}
                  className="px-6 py-2.5 bg-[#202124] text-white border border-[#202124] hover:bg-black rounded-full font-mono text-[10px] tracking-widest uppercase transition-all duration-300 clickable font-bold"
                >
                  File another request
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Sticky 24-Hour Active Support IST Response Protocol */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-[#1A1A1A] text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden text-left"
            >
              
              {/* Backglow line */}
              <div className="absolute top-0 right-0 left-0 h-[3px] bg-[#C69214]" />

              <div className="flex items-center gap-2 font-mono text-[9px] text-[#C69214] tracking-widest uppercase font-bold">
                <Radio className="w-4 h-4 animate-pulse" />
                Project support
              </div>

              <h3 className="text-xl font-bold uppercase tracking-tight font-sans">
                Fast, organized <span className="text-[#C69214]">post-production support</span>
              </h3>

              <div className="h-[1px] bg-white/10" />

              <p className="text-xs text-[#D0D0CD] leading-relaxed font-sans font-light select-text">
                Blackframe Labs supports creators, brands, agencies, and businesses with reliable editing workflows, clear communication, and flexible turnaround options.
              </p>

              <div className="space-y-4 font-mono text-[11px] text-[#D0D0CD]">
                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-[#C69214] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-bold">EXPRESS TURNAROUND</span>
                    <span>Rush editing may be available depending on project size and current schedule.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C69214] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-bold">PRODUCTION HOURS</span>
                    <span>Monday to Sunday, with flexible project support.</span>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/919428614172"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-[#C69214]/20 border border-white/5 hover:border-[#C69214]/40 rounded-xl transition-all duration-300 font-mono text-[10px] font-bold tracking-widest text-white uppercase group clickable"
                >
                  <span>WhatsApp</span>
                  <span className="text-[#C69214] group-hover:translate-x-1 transition-transform">+91 94286 14172 &gt;&gt;</span>
                </a>

                <a
                  href="mailto:hello@blackframelab.com"
                  className="flex items-center justify-between p-3.5 bg-white/5 hover:bg-[#C69214]/20 border border-white/5 hover:border-[#C69214]/40 rounded-xl transition-all duration-300 font-mono text-[10px] font-bold tracking-widest text-white uppercase group clickable"
                >
                  <span>Email</span>
                  <span className="text-[#C69214] group-hover:translate-x-1 transition-transform">hello@blackframelab.com &gt;&gt;</span>
                </a>
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
