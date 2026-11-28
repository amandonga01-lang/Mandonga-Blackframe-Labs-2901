import type { Metadata } from "next";
import PageHead from "@/components/sections/PageHead";
import Reveal from "@/components/type/Reveal";
import Button from "@/components/ui/Button";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import { packages } from "@/content/pricing";
import { faq } from "@/content/faq";
import { bookingUrl } from "@/content/site";
import { pricingModels } from "@/content/copy";

export const metadata: Metadata = { title: "Pricing", description: "Monthly packages for founders, podcasts and brands. Starter, Growth and Partner.", alternates: { canonical: "/pricing" } };

export default function PricingPage() {
  const priced = packages.some((p) => p.price);
  return (
    <>
      <PageHead label="Pricing" lines={priced ? ["Monthly packages."] : ["How pricing works."]} intro={priced ? "Most clients work with us monthly. One-off projects are quoted separately." : "Every job is priced on scope after a 15-minute call: what you need, how often, and how fast. You get a quote before anything starts."} />
      <section className="wrap pb-[var(--section-y)]">
        {priced ? (<>
        <div className="grid gap-[var(--gutter)] md:grid-cols-3 items-stretch">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className={`relative flex h-full flex-col rounded-xl border p-8 md:p-10 ${"border-muted"}`}>
                                <h2 className="t-h3">{p.name}</h2>
                <p className="t-body mt-2 text-[16px]">{p.for}</p>
                <p className="mt-10 font-display font-light text-[clamp(30px,2.6vw,42px)] leading-none tracking-[-0.025em]">
                  {p.price ? <>from {p.price}<span className="text-[15px] text-text-3"> {p.per}</span></> : "Custom quote"}
                </p>
                <ul className="mt-10 flex flex-col">
                  {p.includes.map((x) => <li key={x} className="border-t border-muted/70 py-3 text-[16px]">{x}</li>)}
                </ul>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-muted/70 pt-6">
                  <div><dt className="t-mono text-text-3">Turnaround</dt><dd className="mt-1 text-[15px] text-text-2">{p.turnaround}</dd></div>
                  <div><dt className="t-mono text-text-3">Revisions</dt><dd className="mt-1 text-[15px] text-text-2">{p.revisions}</dd></div>
                </dl>
                <div className="mt-auto pt-10">
                  <Button href={bookingUrl()} event="book_call_click" variant="outline" className="w-full justify-center">Book a call</Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
</>) : (
          <ol className="grid gap-[var(--gutter)] md:grid-cols-3">
            {pricingModels.map((m, i) => (
              <li key={m.name}>
                <Reveal delay={i * 0.08} className="h-full rounded-xl border border-muted p-8 md:p-10">
                  <p className="t-mono text-text-3">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="t-h3 mt-4">{m.name}</h2>
                  <p className="t-body mt-3">{m.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        )}
        <Reveal className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-xl border border-muted p-8 md:p-10">
          <p className="t-h3">Not sure which fits? Book a call and we'll tell you honestly.</p>
          <Button href={bookingUrl()} event="book_call_click" size="lg">Book a call</Button>
        </Reveal>
      </section>
      <Faq index={1} items={faq} />
      <FinalCta index={2} />
    </>
  );
}
