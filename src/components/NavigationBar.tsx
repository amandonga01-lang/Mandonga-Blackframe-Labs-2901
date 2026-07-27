import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Users, Sparkles, Film, Heart, Terminal, Menu, X, Calendar, Briefcase } from "lucide-react";
import GargantuaLogo from "./GargantuaLogo";

interface NavLink {
  label: string;
  path: string;
  icon: any;
}

interface NavigationBarProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}

export default function NavigationBar({ currentPath, onPathChange }: NavigationBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links: NavLink[] = [
    { label: "Home", path: "/", icon: Home },
    { label: "Team", path: "/team", icon: Users },
    { label: "Capabilities", path: "/capabilities", icon: Sparkles },
    { label: "Solutions", path: "/solutions", icon: Briefcase },
    { label: "Showcase", path: "/showcase", icon: Film },
    { label: "Testimonials", path: "/testimonials", icon: Heart },
    { label: "Book", path: "/book", icon: Terminal },
  ];

  // Disable page scroll when mobile overlay menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = (path: string) => {
    onPathChange(path);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top Fixed Header Bar with Premium Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 h-16 md:h-18 z-50 bg-[#FBFBFA]/85 backdrop-blur-md border-b border-[#E2E2DF]/50 px-4 md:px-6 lg:px-12 flex items-center justify-between select-none">
        
        {/* Left: Brand Logo Block (Interactive, returns to home) */}
        <motion.div 
          onClick={() => handleLinkClick("/")}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <GargantuaLogo size={32} />
          <div className="text-left">
            <span className="font-black tracking-tighter text-xs lg:text-sm uppercase text-[#1A1A1A] block group-hover:text-[#C69214] transition-colors">
              BLACKFRAME <span className="text-[#C69214]">LABS</span>
            </span>
            <span className="font-mono text-[8px] tracking-[0.25em] text-[#5F6368] uppercase block">
              VIDEO EDITING STUDIO
            </span>
          </div>
        </motion.div>

        {/* Centered Floating Pill Navbar (Desktop) */}
        <nav className="hidden lg:block">
          <div className="relative flex items-center gap-1 px-1.5 py-1 bg-black/5 border border-black/5 rounded-full shadow-inner">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <motion.button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={`relative px-4 py-1.5 font-mono text-[9px] tracking-widest uppercase transition-colors duration-300 z-10 clickable font-bold ${
                    isActive ? "text-white" : "text-[#5F6368] hover:text-[#1A1A1A]"
                  }`}
                >
                  {/* Gliding Framer Motion Backdrop - smooth & non-bouncy */}
                  {isActive && (
                    <motion.div
                      layoutId="pill-backdrop"
                      className="absolute inset-0 bg-[#202124] rounded-full -z-10"
                      transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.35,
                      }}
                    />
                  )}
                  {link.label}
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Right Action Block - Prominent on all platforms */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Hamburger Menu button - Mobile & Tablet */}
          <motion.button 
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="lg:hidden p-2 text-[#1A1A1A] hover:bg-black/5 rounded-full transition-colors flex items-center justify-center clickable"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </header>

      {/* Full-Screen Premium Sliding Navigation Drawer (Mobile/Tablet) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[45] bg-black/60 backdrop-blur-md lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#0E0E0E] text-white p-8 pt-24 flex flex-col justify-between border-l border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Links List */}
              <div className="space-y-6">
                <div className="font-mono text-[8px] text-white/40 tracking-[0.25em] uppercase border-b border-white/10 pb-3">
                  Navigation
                </div>
                <nav className="flex flex-col gap-4">
                  {links.map((link, index) => {
                    const isActive = currentPath === link.path;
                    const Icon = link.icon;
                    return (
                      <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={link.path}
                        onClick={() => handleLinkClick(link.path)}
                        className={`flex items-center gap-4 py-3.5 px-4 rounded-xl text-left w-full transition-all duration-300 font-mono text-[11px] tracking-widest uppercase ${
                          isActive 
                            ? "bg-[#C69214] text-white font-bold" 
                            : "bg-white/[0.03] text-white/70 hover:bg-white/[0.07] hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="flex-1">{link.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Drawer Metadata System Info */}
              <div className="space-y-6">
                <div className="p-4 bg-white/[0.03] border border-white/5 rounded-xl text-left font-mono text-[8px] text-white/50 space-y-2 leading-relaxed">
                  <div>Professional video editing for brands, creators, podcasts, and agencies.</div>
                </div>
                <button
                  onClick={() => handleLinkClick("/book")}
                  className="w-full py-4 bg-[#C69214] text-white hover:bg-white hover:text-black font-mono text-[10px] tracking-[0.2em] uppercase font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg clickable"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request a Quote</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
