import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TimecodeLabel from "@/components/type/TimecodeLabel";
import RevealLines from "@/components/type/RevealLines";
import SectionHead from "@/components/sections/SectionHead";
import Reveal from "@/components/type/Reveal";
import FinalCta from "@/components/sections/FinalCta";
import VideoPlayer from "@/components/video/VideoPlayer";
import BeforeAfterSlider from "@/components/video/BeforeAfterSlider";
import MediaReveal from "@/components/ui/MediaReveal";
import CaseGallery from "@/components/case/CaseGallery";
import { caseStudies } from "@/content/case-studies";
import { bySlug } from "@/content/portfolio";

export const dynamicParams = false;

const visible = () => caseStudies.filter((c) => c.published || process.env.NODE_ENV !== "production");

export function generateStaticParams() {
  return visible().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = visible().find((x) => x.slug === slug);
  return c ? { title: `${c.client}: ${c.title}`, description: c.overview, alternates: { canonical: `/case-studies/${c.slug}` } } : {};
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const list = visible();
  const i = list.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const c = list[i];
  const nextCase = list[(i + 1) % list.length];
  const hero = bySlug(c.heroSlug);
  let n = 0;
  const next = () => ++n;

  return (
    <>
      <section className="wrap pt-36 md:pt-44">
        <TimecodeLabel index={0}>{`Case study — ${c.client}`}</TimecodeLabel>
        <RevealLines as="h1" immediate className="t-h1 mt-6 max-w-[18ch]" lines={[c.title]} />
        {hero && (
          <MediaReveal className="mt-16">
            <div className={`relative overflow-hidden rounded-xl bg-surface ${hero.format === "vertical" ? "aspect-[9/16] max-w-md" : "aspect-video"}`}>
              <VideoPlayer src={hero.fullSrc} poster={hero.poster} mode="full" controls label={hero.title} className="absolute inset-0 h-full w-full" />
            </div>
          </MediaReveal>
        )}
      </section>

      <section className="wrap section">
        <dl className="grid-12 gap-y-12">
          <Reveal className="col-span-12 md:col-span-4">
            <dt className="t-mono text-text-3">Client</dt>
            <dd className="mt-2 text-[20px]">{c.client}</dd>
            <dt className="t-mono text-text-3 mt-8">Overview</dt>
            <dd className="t-body mt-2">{c.overview}</dd>
          </Reveal>
          <Reveal delay={0.08} className="col-span-12 md:col-start-6 md:col-span-7 flex flex-col gap-12">
            <div><dt className="t-mono text-text-3">Challenge</dt><dd className="t-h3 mt-3">{c.challenge}</dd></div>
            <div>
              <dt className="t-mono text-text-3">Approach</dt>
              <dd className="mt-3">
                <ol className="border-t border-muted/70">{c.approach.map((a, k) => <li key={a} className="flex gap-6 border-b border-muted/70 py-4"><span className="t-mono text-text-3 pt-1">{String(k + 1).padStart(2, "0")}</span>{a}</li>)}</ol>
              </dd>
            </div>
          </Reveal>
        </dl>
      </section>

      {c.beforeSrc && c.afterSrc && (
        <section className="wrap section pt-0">
          <SectionHead index={next()} label="Before / after" lines={["Raw footage,", "then the edit."]} size="t-h2" />
          <div className="mt-12"><BeforeAfterSlider before={c.beforeSrc} after={c.afterSrc} poster={hero?.poster} /></div>
        </section>
      )}

      <section className="wrap section pt-0">
        <SectionHead index={next()} label="Deliverables" lines={["What we delivered."]} size="t-h2" />
        <CaseGallery slugs={c.deliverables} />
      </section>

      {c.results.length > 0 && (
        <section className="wrap section pt-0">
          <SectionHead index={next()} label="Results" lines={["What happened."]} size="t-h2" />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-10">
            {c.results.map((r) => (
              <div key={r.label}><p className="font-display font-light text-[clamp(56px,6vw,104px)] leading-none tracking-[-0.04em]">{r.value}</p><p className="t-mono text-text-3 mt-3">{r.label}</p></div>
            ))}
          </div>
        </section>
      )}

      {c.quote && (
        <section className="bg-paper text-ink">
          <figure className="wrap section">
            <blockquote className="font-display font-light text-[clamp(30px,3.4vw,56px)] leading-[1.1] tracking-[-0.02em] max-w-[24ch]">“{c.quote.text}”</blockquote>
            <figcaption className="t-mono text-ink/60 mt-8">{c.quote.name}, {c.quote.role}</figcaption>
          </figure>
        </section>
      )}

      {nextCase && nextCase.slug !== c.slug && (
        <section className="wrap section pt-0">
          <Link href={`/case-studies/${nextCase.slug}`} className="group block border-t border-muted/70 pt-10">
            <p className="t-mono text-text-3">Next case study</p>
            <p className="t-h1 mt-4 transition-transform duration-700 ease-studio group-hover:translate-x-3">{nextCase.client} →</p>
          </Link>
        </section>
      )}
      <FinalCta index={next()} />
    </>
  );
}
