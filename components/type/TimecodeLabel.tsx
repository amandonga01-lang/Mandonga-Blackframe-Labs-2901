import { sectionTimecode } from "@/lib/motion";

/** Mono section label: "00:00:04:12 — SELECTED WORK". */
export default function TimecodeLabel({ index, children, rec = false, className = "" }: { index: number; children: React.ReactNode; rec?: boolean; className?: string }) {
  return (
    <p className={`t-mono text-text-3 flex items-center gap-2 ${className}`}>
      {rec && <span aria-hidden="true" className="rec" />}
      {rec && <span className="text-text-2">REC</span>}
      <span className="tabular-nums">{sectionTimecode(index)}</span>
      <span aria-hidden="true">—</span>
      <span className="text-text-2">{children}</span>
    </p>
  );
}
