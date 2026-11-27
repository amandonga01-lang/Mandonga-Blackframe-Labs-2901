import { useEffect, useState } from "react";
import type { Route } from "../App";
import Wordmark from "./Wordmark";

const NAV: { href: Route; label: string }[] = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/studio", label: "Studio" },
];

function useIndiaTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmt()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function Header({ route }: { route: Route }) {
  const [open, setOpen] = useState(false);
  const time = useIndiaTime();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const close = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur-sm border-b border-rule">
      <div className="mx-auto max-w-[1400px] h-16 px-4 md:px-8 flex items-center gap-6">
        <a href="#/" aria-label="Blackframe Labs, home" className="shrink-0">
          <Wordmark />
        </a>

        <span className="tc text-dim hidden lg:inline" title="Studio time in India">
          IST {time} <span className="text-rule">/</span> where we cut
        </span>

        <nav aria-label="Main" className="ml-auto hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              aria-current={route === item.href ? "page" : undefined}
              className={`px-3 py-2 text-[15px] font-medium transition-colors ${
                route === item.href ? "text-bone" : "text-dim hover:text-bone"
              }`}
            >
              {route === item.href && <span className="text-tally mr-1.5" aria-hidden="true">▸</span>}
              {item.label}
            </a>
          ))}
          <a href="#/contact" className="ml-3 bg-tally text-ink px-4 py-2 text-[15px] font-semibold hover:bg-bone transition-colors">
            Send footage
          </a>
        </nav>

        <button
          type="button"
          className="ml-auto md:hidden tc uppercase text-bone border border-rule px-3 py-2"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-ink border-t border-rule px-4 py-8 flex flex-col">
          <nav aria-label="Mobile" className="flex flex-col">
            {[{ href: "/" as Route, label: "Home" }, ...NAV, { href: "/careers" as Route, label: "Careers" }].map((item, i) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                aria-current={route === item.href ? "page" : undefined}
                className="display text-6xl py-2 flex items-baseline gap-4 border-b border-rule"
              >
                <span className="tc text-dim">0{i + 1}</span>
                <span className={route === item.href ? "text-tally" : "text-bone"}>{item.label}</span>
              </a>
            ))}
          </nav>
          <a href="#/contact" className="mt-auto bg-tally text-ink text-center py-4 font-semibold text-lg">
            Send footage
          </a>
          <p className="tc text-dim mt-4 text-center">IST {time} where we cut</p>
        </div>
      )}
    </header>
  );
}
