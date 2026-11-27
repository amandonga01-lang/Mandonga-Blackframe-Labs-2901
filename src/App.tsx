import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Studio from "./pages/Studio";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import { TalkMarquee } from "./components/motion";

export type Route = "/" | "/work" | "/services" | "/studio" | "/contact" | "/careers";

// Old URLs keep working.
const ALIASES: Record<string, Route> = {
  "/": "/",
  "/home": "/",
  "/work": "/work",
  "/showcase": "/work",
  "/services": "/services",
  "/capabilities": "/services",
  "/solutions": "/services",
  "/studio": "/studio",
  "/team": "/studio",
  "/testimonials": "/studio",
  "/contact": "/contact",
  "/book": "/contact",
  "/careers": "/careers",
};

const TITLES: Record<Route, string> = {
  "/": "Blackframe Labs: podcast, talking-head and short-form editing",
  "/work": "Work | Blackframe Labs",
  "/services": "Services | Blackframe Labs",
  "/studio": "Studio | Blackframe Labs",
  "/contact": "Send footage | Blackframe Labs",
  "/careers": "Careers | Blackframe Labs",
};

const LABELS: Record<Route, string> = { "/": "Home", "/work": "Work", "/services": "Services", "/studio": "Studio", "/contact": "Send footage", "/careers": "Careers" };

const readRoute = (): Route => {
  const raw = window.location.hash.replace(/^#/, "").split("?")[0] || "/";
  return ALIASES[raw] ?? "/";
};

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  // Read the hash synchronously so deep links never mount the home page first.
  const [route, setRoute] = useState<Route>(readRoute);
  // Page transition phase: idle -> in (slate covers) -> out (slate leaves) -> idle.
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const [slateLabel, setSlateLabel] = useState("");
  // Remount the page when the query changes too (e.g. #/work?c=podcast -> #/work?c=ugc).
  const [hashKey, setHashKey] = useState(() => window.location.hash);

  useEffect(() => {
    const timers: number[] = [];
    const swap = () => {
      setRoute(readRoute());
      setHashKey(window.location.hash);
      window.scrollTo(0, 0);
    };
    const onHash = () => {
      timers.forEach(clearTimeout);
      if (reducedMotion()) return swap();
      setSlateLabel(LABELS[readRoute()]);
      setPhase("in");
      timers.push(
        window.setTimeout(() => {
          swap();
          setPhase("out");
        }, 340),
        window.setTimeout(() => setPhase("idle"), 340 + 560),
      );
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    document.title = TITLES[route];
  }, [route]);

  const page = (() => {
    switch (route) {
      case "/work":
        return <Work />;
      case "/services":
        return <Services />;
      case "/studio":
        return <Studio />;
      case "/contact":
        return <Contact />;
      case "/careers":
        return <Careers />;
      default:
        return <Home />;
    }
  })();

  return (
    <>
      {/* Hash routing owns the URL fragment, so "skip" focuses <main> instead of linking to #main. */}
      <button
        type="button"
        onClick={() => document.getElementById("main")?.focus()}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] bg-tally text-ink px-3 py-2"
      >
        Skip to content
      </button>
      <Header route={route} />
      <main id="main" key={hashKey} tabIndex={-1} className="outline-none">
        {page}
      </main>
      {route !== "/contact" && <TalkMarquee />}
      <Footer />
      <div className="slate" data-phase={phase} aria-hidden="true" style={phase === "idle" ? { visibility: "hidden" } : undefined}>
        <div className="flex flex-col items-center gap-3">
          <span className="tc text-dim">00:00:00:00</span>
          <span className="display text-6xl md:text-8xl text-bone">
            <span className="text-tally">▸</span> {slateLabel}
          </span>
        </div>
      </div>
    </>
  );
}
