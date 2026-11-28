import type { ElementType } from "react";
import Rich, { plain } from "./Rich";

/**
 * Headline whose lines slide up from a mask. Pure CSS:
 * - `immediate` (heroes): a short time-based animation on load.
 * - otherwise: scroll-driven as the line enters the viewport (where supported; elsewhere simply visible).
 * Wrap words in **double stars** for Bold.
 */
export default function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  immediate = false,
  delay = 0,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  return (
    <Tag className={className} aria-label={plain(lines.join(" "))}>
      {lines.map((l, i) => (
        <span key={i} aria-hidden="true" className={`block overflow-hidden pb-[0.06em] -mb-[0.06em] ${immediate ? "" : "reveal-mask"}`}>
          <span className={`block ${immediate ? "reveal-line" : "reveal-sub"}`} style={immediate ? { animationDelay: `${delay + i * 0.08}s` } : undefined}>
            <Rich text={l} />
          </span>
        </span>
      ))}
    </Tag>
  );
}
