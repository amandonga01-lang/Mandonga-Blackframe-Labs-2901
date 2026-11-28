import type { Metadata } from "next";
import Link from "next/link";
import TimecodeLabel from "@/components/type/TimecodeLabel";
import RevealLines from "@/components/type/RevealLines";
import ServicesList from "@/components/sections/ServicesList";
import FinalCta from "@/components/sections/FinalCta";
import { moreServices, services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Podcast editing, talking-head content, Meta ads and UGC, SaaS videos, video editing and AI-assisted editing.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="wrap pt-36 md:pt-44">
        <TimecodeLabel index={0}>Services</TimecodeLabel>
        <div className="grid-12 mt-6 items-end gap-y-6">
          <RevealLines as="h1" immediate className="t-h1 col-span-12 md:col-span-8" lines={["Services."]} />
          <p className="t-body col-span-12 md:col-span-4">{services.length} services, each with its own page: the work, what you get, turnaround and how it&apos;s priced.</p>
        </div>
      </section>
      <div className="-mt-[var(--section-y)]"><ServicesList index={1} head={false} /></div>
      <section className="wrap section pt-0">
        <div className="rounded-xl border border-muted p-8 md:p-14 grid-12 gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <p className="t-mono text-text-3">Also available</p>
            <h2 className="t-h2 mt-4">More services</h2>
          </div>
          <ul className="col-span-12 md:col-start-6 md:col-span-7 grid sm:grid-cols-2 gap-x-[var(--gutter)]">
            {moreServices.map((m) => <li key={m} className="border-t border-muted/70 py-3">{m}</li>)}
          </ul>
          <Link href="/services/more" className="col-span-12 md:col-start-6 t-mono text-text-2 hover:text-text">More services and examples →</Link>
        </div>
      </section>
      <FinalCta index={2} />
    </>
  );
}
