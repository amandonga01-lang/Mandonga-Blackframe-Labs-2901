import type { ReactNode } from "react";

/** Fade + rise as it scrolls into view. Pure CSS (see .reveal in globals.css): no JS, never hidden before hydration. */
export default function Reveal({ children, className = "" }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
