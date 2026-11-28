import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import Showreel from "@/components/sections/Showreel";
import ClientMarquee from "@/components/sections/ClientMarquee";
import SelectedWork from "@/components/sections/SelectedWork";
import ServicesList from "@/components/sections/ServicesList";
import Results, { hasResults } from "@/components/sections/Results";
import CaseHighlight, { featuredCase } from "@/components/sections/CaseHighlight";
import ProcessScroll from "@/components/sections/ProcessScroll";
import Testimonials, { hasTestimonials } from "@/components/sections/Testimonials";
import AiHuman from "@/components/sections/AiHuman";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import { faq } from "@/content/faq";
import { portfolio } from "@/content/portfolio";
import { JsonLd, videoLd } from "@/lib/seo";
import ParticleField from "@/components/particles/ParticleField";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  // Section timecodes count up only through sections that actually render.
  let n = 0;
  const next = () => ++n;
  return (
    <>
      {/* data-shape tells the particle cloud what to become while this section is mid-screen. */}
      <ParticleField />
      <div data-shape="play" data-side="right"><Hero /></div>
      <div data-shape="scatter"><Showreel index={next()} /><ClientMarquee /></div>
      <div data-shape="phone" data-side="left"><SelectedWork index={next()} /></div>
      <div data-shape="mic" data-side="mid"><ServicesList index={next()} /></div>
      {hasResults() && <div data-shape="scatter"><Results index={next()} /></div>}
      {featuredCase() && <div data-shape="scatter"><CaseHighlight index={next()} /></div>}
      <div data-shape="timeline" data-side="right"><ProcessScroll index={next()} /></div>
      {hasTestimonials() && <Testimonials index={next()} />}
      <div data-shape="wave" data-side="left"><AiHuman index={next()} /></div>
      <div data-shape="scatter"><Faq index={next()} items={faq} /></div>
      <div data-shape="globe" data-side="right"><FinalCta index={next()} /></div>
      <JsonLd data={videoLd(portfolio.filter((p) => p.featured))} />
    </>
  );
}
