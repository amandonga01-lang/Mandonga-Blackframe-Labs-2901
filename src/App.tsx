import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "lenis";

import VideoPreloader from "./components/VideoPreloader";
import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import WhoWeAre from "./components/WhoWeAre";
import MiloLine from "./components/MiloLine";
import CapabilitiesMarquee from "./components/CapabilitiesMarquee";
import ShowcaseCinemaGrid from "./components/ShowcaseCinemaGrid";
import TestimonialsSwitchboard from "./components/TestimonialsSwitchboard";
import SolutionsPage from "./components/SolutionsPage";
import CareersPage from "./components/CareersPage";
import TeamSection from "./components/TeamSection";
import FAQAccordion from "./components/FAQAccordion";
import TerminalBookingForm from "./components/TerminalBookingForm";
import GargantuaLogo from "./components/GargantuaLogo";
import SmartphoneShowcase from "./components/SmartphoneShowcase";
import MotionStripDivider from "./components/MotionStripDivider";
import Footer from "./components/Footer";

export default function App() {
  // Global Lenis smooth scrolling setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2, // Increased for a longer, smoother momentum tail
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.35, // Reduced drastically to make scroll feel much slower and heavier
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  const [preloadComplete, setPreloadComplete] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  const routes = new Set(["/", "/home", "/team", "/capabilities", "/showcase", "/testimonials", "/book", "/solutions", "/careers"]);

  // Client-side hash routing resolver for AI Studio preview URLs.
  const getPathFromHash = () => {
    const hashPath = window.location.hash.startsWith("#") ? window.location.hash.substring(1) : "/";
    return routes.has(hashPath) ? hashPath : "/";
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getPathFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    setCurrentPath(getPathFromHash());

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (preloadComplete) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [preloadComplete, currentPath]);

  const handlePathChange = (path: string) => {
    const nextPath = path === "/home" ? "/" : path;
    setCurrentPath(nextPath);
    window.location.hash = nextPath === "/" ? "#/" : `#${nextPath}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render one route at a time so the site behaves like multiple pages, not one long scroll.
  const renderRoute = () => {
    switch (currentPath) {
      case "/team":
        return (
          <div id="team">
            <WhoWeAre />
            <TeamSection />
          </div>
        );
      case "/capabilities":
        return (
          <div id="capabilities">
            <CapabilitiesMarquee />
            <MiloLine />
          </div>
        );
      case "/showcase":
        return (
          <div id="showcase">
            <ShowcaseCinemaGrid />
          </div>
        );
      case "/testimonials":
        return (
          <div id="testimonials">
            <TestimonialsSwitchboard />
          </div>
        );
      case "/solutions":
        return (
          <div id="solutions">
            <SolutionsPage />
          </div>
        );
      case "/careers":
        return (
          <div id="careers">
            <CareersPage />
          </div>
        );
      case "/book":
        return (
          <div id="book">
            <TerminalBookingForm />
          </div>
        );
      case "/":
      case "/home":
      default:
        return (
          <div id="home">
            <HeroSection onPathChange={handlePathChange} startAnimation={preloadComplete} />
            <SmartphoneShowcase />
            <MiloLine />
          </div>
        );
    }
  };

  return (
    <>
      {/* 1. Custom Lag-Free Camera Reticle Cursor */}


      {/* 2. Full-Screen Cinematic Video Preloader (Locks scroll, plays 6s, fades) */}
      {!preloadComplete && (
        <VideoPreloader onComplete={() => setPreloadComplete(true)} />
      )}

      {/* 3. Main Site Architecture (Revealed after preloader completes) */}
      <div 
        className={`relative min-h-screen transition-opacity duration-1000 ${
          preloadComplete ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Global Background Parallax Image with 85% opacity overlay blended as fine texture */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.06] select-none"
          style={{
            backgroundImage: "url('/Gold_BLACKFRAME_labs_logo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Floating Pill Navigation Bar */}
        <NavigationBar currentPath={currentPath} onPathChange={handlePathChange} />

        {/* Dynamic Route View wrapper */}
        <main className="relative z-10 w-full min-h-[80vh] pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(6px)", y: -8 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1], // Cinematic custom curve
              }}
              className="w-full"
            >
              {renderRoute()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Booking FAQ belongs to the Book page instead of extending every route. */}
        {currentPath === "/book" && (
          <div className="relative z-10">
            <FAQAccordion />
          </div>
        )}

        {/* New Symmetrical Footer */}
        <Footer onPathChange={handlePathChange} />
      </div>
    </>
  );
}
