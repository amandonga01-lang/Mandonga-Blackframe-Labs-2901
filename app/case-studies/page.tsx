import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHead from "@/components/sections/PageHead";
import FinalCta from "@/components/sections/FinalCta";
import Reveal from "@/components/type/Reveal";
import { caseStudies } from "@/content/case-studies";
import { bySlug } from "@/content/portfolio";

export const metadata: Metadata = { title: "Case studies", description: "How we approached real client projects, and what happened.", alternates: { canonical: "/case-studies" } };

const showDrafts = process.env.NODE_ENV !== "production";

export default function CaseStudiesPage() {
  const list = caseStudies.filter((c) => c.published || showDrafts);
  return (
    <>
      <PageHead label="Case studies" lines={["Case studies."]} intro="The brief, what we did, and what happened. Real projects only." />
      <section className="wrap pb-[var(--section-y)]">
        {list.length === 0 ? (
          <div className="rounded-xl border border-muted p-10 md:p-14">
            <p className="t-h3">Write-ups are on the way.</p>
            <p className="t-body mt-3">Until then, the work speaks for itself.</p>
            <Link href="/work" className="t-mono text-text-2 hover:text-text inline-block mt-8">See all work →</Link>
          </div>
        ) : (
          <ul className="grid gap-[var(--gutter)] gap-y-16 md:grid-cols-2">
            {list.map((c, i) => {
              const hero = bySlug(c.heroSlug);
              return (
                <Reveal key={c.slug} delay={(i % 2) * 0.08}>
                  <li>
                    <Link href={`/case-studies/${c.slug}`} className="group block">
                      <span className="relative block aspect-video overflow-hidden rounded-lg bg-surface">
                        {hero && <Image src={hero.poster} alt="" fill sizes="50vw" className="object-cover transition-transform duration-[1.2s] ease-studio group-hover:scale-[1.03]" />}
                        {!c.published && <span className="t-mono absolute left-4 top-4 rounded-full bg-signal px-3 py-1 text-ink">Draft (hidden in production)</span>}
                      </span>
                      <span className="t-mono mt-4 block text-text-3">{c.client}</span>
                      <span className="t-h3 mt-2 block">{c.title}</span>
                    </Link>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        )}
      </section>
      <FinalCta index={1} />
    </>
  );
}
