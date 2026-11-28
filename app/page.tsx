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

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  // Section timecodes count up only through sections that actually render.
  let n = 0;
  const next = () => ++n;
  return (
    <>
      <Hero />
      <Showreel index={next()} />
      <ClientMarquee />
      <SelectedWork index={next()} />
      <ServicesList index={next()} />
      {hasResults() && <Results index={next()} />}
      {featuredCase() && <CaseHighlight index={next()} />}
      <ProcessScroll index={next()} />
      {hasTestimonials() && <Testimonials index={next()} />}
      <AiHuman index={next()} />
      <Faq index={next()} items={faq} />
      <FinalCta index={next()} cloud />
      <JsonLd data={videoLd(portfolio.filter((p) => p.featured))} />
    </>
  );
}
