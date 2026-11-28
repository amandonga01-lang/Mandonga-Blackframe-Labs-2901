import Link from "next/link";
import SectionHead from "./SectionHead";
import BeforeAfterSlider from "../video/BeforeAfterSlider";
import { publishedCaseStudies } from "@/content/case-studies";
import { bySlug } from "@/content/portfolio";

/** Featured case study with before/after. Hidden until a published case study has raw + final footage. */
export const featuredCase = () => publishedCaseStudies().find((c) => c.beforeSrc && c.afterSrc);

export default function CaseHighlight({ index }: { index: number }) {
  const c = featuredCase();
  if (!c) return null;
  const hero = bySlug(c.heroSlug);
  return (
    <section className="wrap section">
      <SectionHead index={index} label={`Case study — ${c.client}`} lines={[c.title]} size="t-h2" />
      <div className="mt-16 grid-12 gap-y-12">
        <dl className="col-span-12 md:col-span-4 flex flex-col gap-8">
          {[["Problem", c.challenge], ["What we did", c.approach.join(". ") + "."]].map(([k, v]) => (
            <div key={k}><dt className="t-mono text-text-3">{k}</dt><dd className="t-body mt-2">{v}</dd></div>
          ))}
          {c.results.length > 0 && (
            <div>
              <dt className="t-mono text-text-3">Result</dt>
              <dd className="mt-3 flex gap-8">{c.results.map((r) => <span key={r.label}><span className="block font-display text-5xl font-light">{r.value}</span><span className="t-mono text-text-3">{r.label}</span></span>)}</dd>
            </div>
          )}
          <Link href={`/case-studies/${c.slug}`} className="t-mono text-text-2 hover:text-text">Read the case study →</Link>
        </dl>
        <div className="col-span-12 md:col-start-6 md:col-span-7">
          <BeforeAfterSlider before={c.beforeSrc!} after={c.afterSrc!} poster={hero?.poster} />
        </div>
      </div>
    </section>
  );
}
