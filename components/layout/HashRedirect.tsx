"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Old site used hash routes (/#/work). Hash fragments never reach the server, so map them here.
const MAP: Record<string, string> = {
  "/home": "/", "/work": "/work", "/showcase": "/work", "/services": "/services", "/capabilities": "/services",
  "/solutions": "/pricing", "/studio": "/about", "/team": "/about", "/testimonials": "/about",
  "/contact": "/contact", "/book": "/contact", "/careers": "/about",
};

export default function HashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const h = window.location.hash;
    if (!h.startsWith("#/")) return;
    const [path, query] = h.slice(1).split("?");
    const to = MAP[path];
    if (to) router.replace(query ? `${to}?${query.replace(/^c=/, "filter=")}` : to);
  }, [router]);
  return null;
}
