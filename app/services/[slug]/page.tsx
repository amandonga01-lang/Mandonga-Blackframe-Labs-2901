import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ServiceHero from "@/components/services/ServiceHero";
import SectionHead from "@/components/sections/SectionHead";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import WorkBrowser from "@/components/work/WorkBrowser";
import Reveal from "@/components/type/Reveal";
import { serviceBySlug, services } from "@/content/services";
import { forService } from "@/content/portfolio";
import { process } from "@/content/process";
import { JsonLd, serviceLd } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return { title: s.title, description: `${s.promise} ${s.summary}`, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const work = forService(s.slug);
  let n = 0;
  const next = () => ++n;

  return (
    <>
      <ServiceHero s={s} />

      <section className="wrap section pt-0">
        <div className="grid-12 gap-y-12">
          <SectionHead index={next()} label="What you get" lines={["What you **get.**"]} size="t-h2" className="col-span-12 md:col-span-4" />
          <ol className="col-span-12 md:col-start-6 md:col-span-7 border-t border-muted/70">
            {s.whatYouGet.map((w, i) => (
              <li key={w} className="flex gap-6 border-b border-muted/70 py-5 text-[clamp(16px,1.15vw,19px)]">
                <span className="t-mono text-text-3 pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                {w}
              </li>
            ))}
          </ol>
        </div>
        {s.groups && (
          <div className="mt-24 grid gap-[var(--gutter)] md:grid-cols-2">
            {s.groups.map((g) => (
              <Reveal key={g.title} className="rounded-xl border border-muted bg-surface p-8 md:p-12">
                <h3 className="t-h3">{g.title}</h3>
                <p className="t-body mt-3">{g.body}</p>
                <ul className="mt-8 flex flex-col gap-3">
                  {g.points.map((p) => <li key={p} className="t-mono text-text-2 border-t border-muted/70 pt-3">{p}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {work.length > 0 && (
        <section id="work" className="wrap section pt-0 scroll-mt-28">
          <SectionHead index={next()} label="The work" lines={[`**${s.title}** work.`]} size="t-h2" />
          <Suspense fallback={null}>
            <WorkBrowser only={s.slug} />
          </Suspense>
        </section>
      )}

      <section className="wrap section pt-0">
        <div className="grid-12 gap-y-12">
          <SectionHead index={next()} label="Process" lines={["How it **runs.**"]} size="t-h2" className="col-span-12 md:col-span-4" />
          <ol className="col-span-12 md:col-start-6 md:col-span-7 grid gap-x-[var(--gutter)] gap-y-10 sm:grid-cols-2">
            {process.map((p, i) => (
              <li key={p.title} className="border-t border-muted pt-5">
                <p className="t-mono text-text-3">{String(i + 1).padStart(2, "0")} / {p.time}</p>
                <h3 className="mt-3 text-[20px]">{p.title}</h3>
                <p className="t-body mt-2 text-[16px]">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section pt-0">
        <div className="grid gap-[var(--gutter)] md:grid-cols-3">
          <Reveal className="rounded-xl border border-muted p-8 md:col-span-2">
            <p className="t-mono text-text-3">Deliverables</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.deliverables.map((d) => <li key={d} className="border-t border-muted/70 pt-3">{d}</li>)}
            </ul>
            <p className="t-mono text-text-3 mt-10">Turnaround</p>
            <p className="mt-3 text-[20px]">{s.turnaround}</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-xl border border-muted bg-surface p-8 flex flex-col">
            <p className="t-mono text-text-3">Price</p>
            <p className="mt-6 font-display font-light text-[clamp(28px,2.4vw,38px)] leading-none tracking-[-0.025em]">{s.priceFrom || "Custom quote"}</p>
            <p className="t-body mt-4 text-[16px]">{s.priceFrom ? "Final price depends on volume and length." : "Every job is quoted after a short call and a look at the footage."}</p>
            <a href="/pricing" className="t-mono text-text-2 hover:text-text mt-auto pt-8">See packages →</a>
          </Reveal>
        </div>
      </section>

      <Faq index={next()} items={s.faq} />
      <FinalCta index={next()} lines={["Let's talk about", `**${s.title}.**`]} />
      <JsonLd data={serviceLd(s.title, s.summary, s.slug)} />
    </>
  );
}
