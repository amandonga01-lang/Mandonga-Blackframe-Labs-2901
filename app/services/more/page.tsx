import type { Metadata } from "next";
import TimecodeLabel from "@/components/type/TimecodeLabel";
import RevealLines from "@/components/type/RevealLines";
import SectionHead from "@/components/sections/SectionHead";
import WorkBrowser from "@/components/work/WorkBrowser";
import FinalCta from "@/components/sections/FinalCta";
import { moreServices } from "@/content/services";

export const metadata: Metadata = {
  title: "More services",
  description: "Motion graphics, captions, thumbnails, colour grading, sound design, brand and event films, and repurposing long videos into shorts.",
  alternates: { canonical: "/services/more" },
};

export default function MorePage() {
  return (
    <>
      <section className="wrap pt-36 md:pt-44 pb-[var(--section-y)]">
        <TimecodeLabel index={0}>Also available</TimecodeLabel>
        <RevealLines as="h1" immediate className="t-h1 mt-6" lines={["More services."]} />
        <ol className="mt-16 border-t border-muted/70 md:columns-2 md:gap-[var(--gutter)]">
          {moreServices.map((m, i) => (
            <li key={m} className="flex gap-6 border-b border-muted/70 py-5 text-[clamp(16px,1.15vw,19px)] break-inside-avoid">
              <span className="t-mono text-text-3 pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              {m}
            </li>
          ))}
        </ol>
      </section>
      <section className="wrap section pt-0">
        <SectionHead index={1} label="Examples" lines={["Brand, motion and property films."]} size="t-h2" />
        <WorkBrowser only="more" />
      </section>
      <FinalCta index={2} />
    </>
  );
}
