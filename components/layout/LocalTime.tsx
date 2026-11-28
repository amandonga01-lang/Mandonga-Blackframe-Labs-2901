"use client";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Studio local time, e.g. "21:04 in India". Renders a stable placeholder on the server. */
export default function LocalTime() {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const f = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.timezone }).format(new Date());
    setT(f());
    const id = setInterval(() => setT(f()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t} in {site.location}</span>;
}
