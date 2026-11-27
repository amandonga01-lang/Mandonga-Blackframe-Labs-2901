import { ArrowRight, Globe, Twitter, Instagram, Linkedin } from "lucide-react";
import GargantuaLogo from "./GargantuaLogo";

interface FooterProps {
  onPathChange: (path: string) => void;
}

// Add the studio's real profile URLs here; icons only render for entries that exist.
const SOCIAL_LINKS: { href: string; label: string; Icon: typeof Globe }[] = [
  // { href: "https://www.instagram.com/your-handle", label: "Instagram", Icon: Instagram },
  // { href: "https://www.linkedin.com/company/your-company", label: "LinkedIn", Icon: Linkedin },
  // { href: "https://x.com/your-handle", label: "X / Twitter", Icon: Twitter },
];

export default function Footer({ onPathChange }: FooterProps) {
  return (
    <>
      <div className="w-full h-1.5 bg-[#C69214]" />
      <footer className="relative z-10 bg-[#EFEFEE] pt-16 pb-8 px-6 md:px-12 lg:px-20 font-sans text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Top Header: Logo & Socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <GargantuaLogo size={32} />
            <span className="font-black tracking-tighter text-2xl text-[#1A1A1A]">
              BLACKFRAME <span className="text-[#C69214]">LABS</span>
            </span>
          </div>
          
          {SOCIAL_LINKS.length > 0 && (
            <div className="flex items-center gap-6">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-[#C69214] transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          )}
        </div>



        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20 text-xs md:text-sm">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold font-mono tracking-widest uppercase mb-1 text-[11px] md:text-xs text-[#1A1A1A]">QUICK LINKS</h4>
            <button onClick={() => onPathChange("/")} className="text-left text-[#C69214] font-medium hover:underline">Home</button>
            <button onClick={() => onPathChange("/team")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Team</button>
            <button onClick={() => onPathChange("/capabilities")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Capabilities</button>
            <button onClick={() => onPathChange("/solutions")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Solutions</button>
            <button onClick={() => onPathChange("/showcase")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Showcase</button>
            <button onClick={() => onPathChange("/testimonials")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Testimonials</button>
            <button onClick={() => onPathChange("/book")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Request Quote</button>
            <button onClick={() => onPathChange("/careers")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Careers</button>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold font-mono tracking-widest uppercase mb-1 text-[11px] md:text-xs text-[#1A1A1A]">SOLUTIONS</h4>
            <button onClick={() => onPathChange("/solutions")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Dedicated Editor</button>
            <button onClick={() => onPathChange("/solutions")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Project Based</button>
            <button onClick={() => onPathChange("/solutions")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Retainer</button>
            <button onClick={() => onPathChange("/solutions")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Consulting</button>
            <button onClick={() => onPathChange("/book")} className="text-left text-[#5F6368] font-medium hover:text-[#C69214] transition-colors">Request a Quote</button>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold font-mono tracking-widest uppercase mb-1 text-[11px] md:text-xs text-[#1A1A1A]">CONTACT US</h4>
              <a href="https://wa.me/919428614172" target="_blank" rel="noopener noreferrer" className="text-[#5F6368] font-medium hover:text-[#C69214]">WhatsApp: +91 94286 14172</a>
              <a href="mailto:hello@blackframelab.com" className="text-[#5F6368] font-medium hover:text-[#C69214]">Email: hello@blackframelab.com</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-bold font-mono tracking-widest uppercase mb-1 text-[11px] md:text-xs text-[#1A1A1A]">CAREER ENQUIRY</h4>
              <a href="mailto:join@blackframelab.com" className="text-[#5F6368] font-medium hover:text-[#C69214]">Email: join@blackframelab.com</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#D9D9D9] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-[#888885] font-medium">
            Copyright © Blackframe Labs Pvt Ltd {new Date().getFullYear()}
          </span>
        </div>

      </div>
    </footer>
    </>
  );
}
