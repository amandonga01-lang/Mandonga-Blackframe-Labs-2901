import type { Metadata } from "next";
import { Suspense } from "react";
import TimecodeLabel from "@/components/type/TimecodeLabel";
import RevealLines from "@/components/type/RevealLines";
import WorkBrowser from "@/components/work/WorkBrowser";
import FinalCta from "@/components/sections/FinalCta";
import { portfolio } from "@/content/portfolio";
import { JsonLd, videoLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work",
  description: `${portfolio.length} edits for podcasts, founders, SaaS teams and Meta advertisers. Filter by service and format.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="wrap pt-36 md:pt-44 pb-[var(--section-y)]">
        <TimecodeLabel index={1}>Work</TimecodeLabel>
        <div className="grid-12 mt-6 items-end gap-y-6">
          <RevealLines as="h1" immediate className="t-h1 col-span-12 md:col-span-8" lines={["The work."]} />
          <p className="t-body col-span-12 md:col-span-4 md:justify-self-end">
            {portfolio.length} pieces of real client work. Hover to preview, click to watch with sound.
          </p>
        </div>
        <Suspense fallback={<div className="h-screen" />}>
          <WorkBrowser />
        </Suspense>
      </section>
      <FinalCta index={2} lines={["Want one of these", "for your brand?"]} />
      <JsonLd data={videoLd(portfolio)} />
    </>
  );
}
