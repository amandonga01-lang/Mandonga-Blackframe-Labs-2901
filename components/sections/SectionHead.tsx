import TimecodeLabel from "../type/TimecodeLabel";
import RevealLines from "../type/RevealLines";

/** Timecode label + headline, left-aligned on the grid. */
export default function SectionHead({ index, label, lines, size = "t-h1", className = "" }: { index: number; label: string; lines: string[]; size?: "t-h1" | "t-h2"; className?: string }) {
  return (
    <div className={className}>
      <TimecodeLabel index={index}>{label}</TimecodeLabel>
      <RevealLines className={`${size} mt-5`} lines={lines} />
    </div>
  );
}
