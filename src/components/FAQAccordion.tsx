import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "What is your turnaround time for cinematic vertical cuts?",
      answer: "Most short-form edits are delivered within 24 to 48 hours after we receive the footage, brief, references, and brand notes. Rush delivery may be available depending on project scope.",
    },
    {
      id: "faq-2",
      question: "How do you coordinate raw footage transfers and timeline sync?",
      answer: "You can share footage through Google Drive, Dropbox, Frame.io, or a similar transfer link. We organize the files, review the brief, and confirm any missing details before editing begins.",
    },
    {
      id: "faq-3",
      question: "Which post-production tools and software suites do you utilize?",
      answer: "Our team primarily uses Adobe Premiere Pro, After Effects, Audition, and supporting post-production tools for editing, motion graphics, captions, color, and audio cleanup.",
    },
    {
      id: "faq-4",
      question: "Do you offer sound design, sub-bass enhancement, and foley separately?",
      answer: "Yes. We can include dialogue cleanup, music selection, sound effects, foley, audio leveling, and final mix polish depending on the package and content type.",
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-12 bg-[#FBFBFA] select-none border-t border-[#E2E2DF]">
      <div className="max-w-4xl mx-auto px-6 text-left">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C69214] uppercase mb-2 font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common questions</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase text-[#1A1A1A]">
            FREQUENTLY ASKED <span className="text-[#C69214]">QUESTIONS</span>
          </h2>
        </div>

        {/* Accordion container */}
        <div className="divide-y divide-[#E2E2DF] border-t border-b border-[#E2E2DF]">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="group py-4 transition-colors duration-300"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left py-4 font-sans text-base font-extrabold uppercase tracking-tight text-[#1A1A1A] hover:text-[#C69214] transition-colors duration-300 clickable"
                >
                  <span className="flex items-center gap-3 pr-4">
                    <span className="font-mono text-[10px] text-[#D0D0CD] group-hover:text-[#C69214]">
                      //
                    </span>
                    {faq.question}
                  </span>
                  
                  {/* Rotating Chevron */}
                  <div className={`p-2 bg-[#F5F5F3] border border-[#E2E2DF] rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-180 bg-[#C69214]/10 border-[#C69214]/20 text-[#C69214]" : "text-[#5F6368] group-hover:border-[#1A1A1A]"
                  }`}>
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Smooth Interpolating Content Container */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen 
                      ? "grid-rows-[1fr] opacity-100 mt-2 pb-4" 
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs md:text-sm text-[#5F6368] leading-relaxed font-sans font-normal pl-7 max-w-3xl select-text">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
