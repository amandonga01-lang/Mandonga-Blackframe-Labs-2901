"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";
import RecDot from "../ui/RecDot";
import { NAV } from "./nav-links";
import { bookingUrl, site } from "@/content/site";
import { EASE } from "@/lib/motion";

/** Floating pill nav: hides on scroll down, returns on scroll up. */
export default function Nav() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-5 md:px-5"
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-14 max-w-[1440px] items-center gap-4 rounded-full border border-muted bg-surface/85 pl-5 pr-2 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,.35)]"
        >
          <Logo />
          {site.availability && (
            <span className="hidden xl:inline-flex items-center gap-2 t-mono text-text-2 ml-2">
              <RecDot /> {site.availability}
            </span>
          )}
          <ul className="mx-auto hidden lg:flex items-center gap-1">
            {NAV.map((l) => {
              const active = path === l.href || path.startsWith(l.href + "/");
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[15px] transition-colors duration-500 ${active ? "text-text" : "text-text-2 hover:text-text"}`}
                  >
                    {l.label}
                    {active && <span aria-hidden="true" className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-signal" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="ml-auto lg:ml-0 flex items-center gap-2">
            <span className="hidden sm:block">
              <Button href={bookingUrl()} event="book_call_click">
                Book a call
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="lg:hidden h-11 rounded-full border border-muted px-4 t-mono"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
