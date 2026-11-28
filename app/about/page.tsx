import type { Metadata } from "next";
import Image from "next/image";
import PageHead from "@/components/sections/PageHead";
import SectionHead from "@/components/sections/SectionHead";
import Reveal from "@/components/type/Reveal";
import FinalCta from "@/components/sections/FinalCta";
import LocalTime from "@/components/layout/LocalTime";
import { site } from "@/content/site";
import { houseRules } from "@/content/copy";

export const metadata: Metadata = { title: "About", description: "A five-person editing studio in India. You talk to the people who cut your videos.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <>
      <PageHead
        label="About"
        lines={["A five-person studio.", "**No middlemen.**"]}
        intro={site.blurb}
      />
      <section className="wrap pb-[var(--section-y)]">
        <div className="grid-12 gap-y-10">
          <Reveal className="col-span-12 md:col-span-6">
            <p className="font-display font-light text-[clamp(20px,1.8vw,28px)] leading-[1.3] tracking-[-0.02em]">
              The name comes from the edit bay. A black frame is the empty frame between two shots: the exact place a cut happens. That decision is the job.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 md:col-start-8 md:col-span-5 flex flex-col gap-6">
            <p className="t-body">We use AI for the groundwork so we can deliver more versions, faster. Every video is still finished by an editor who decides what stays in.</p>
            <p className="t-body">We work India time, {site.timezoneLabel}. Footage you send at the end of a US or UK day is being cut while you sleep.</p>
            <p className="t-mono text-text-3">Now: <LocalTime /></p>
          </Reveal>
        </div>
      </section>
      <section className="wrap section pt-0">
        <SectionHead index={1} label="Team" lines={["The people cutting your videos."]} size="t-h2" />
        {site.team.some((p) => p.photo) ? (
          <ul className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-[var(--gutter)] gap-y-12">
            {site.team.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={i * 0.08}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-muted bg-surface">
                    {p.photo && <Image src={p.photo} alt={p.name} fill sizes="25vw" className="object-cover" />}
                  </div>
                  <p className="mt-4 text-[18px]">{p.name}</p>
                  <p className="t-mono text-text-3 mt-1">{p.role}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-14 border-t border-muted/70">
            {site.team.map((p) => (
              <li key={p.name} className="grid grid-cols-12 gap-x-[var(--gutter)] border-b border-muted/70 py-5 items-baseline">
                <span className="col-span-12 md:col-span-5 font-display text-[clamp(20px,1.8vw,28px)] font-light tracking-[-0.02em]">{p.name}</span>
                <span className="t-mono col-span-12 md:col-span-7 text-text-3">{p.role}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="wrap section pt-0">
        <SectionHead index={2} label="House rules" lines={["How we work."]} size="t-h2" />
        <ol className="mt-16 grid gap-[var(--gutter)] md:grid-cols-2">
          {houseRules.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={(i % 2) * 0.08} className="rounded-xl border border-muted p-8 md:p-10 h-full">
                <p className="t-mono text-text-3">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-4">{r.title}</h3>
                <p className="t-body mt-3">{r.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
      <section className="wrap section pt-0">
        <div className="rounded-xl border border-muted p-8 md:p-12 grid-12 gap-y-6 items-center">
          <div className="col-span-12 md:col-span-7">
            <p className="t-mono text-text-3">Hiring</p>
            <p className="t-h3 mt-3">We bring in freelance editors and motion designers when work picks up.</p>
          </div>
          <a href={`mailto:${site.jobsEmail}?subject=Editor%20application`} className="col-span-12 md:col-start-9 md:col-span-4 t-mono text-text-2 hover:text-text md:justify-self-end">
            Send 3 pieces you edited → {site.jobsEmail}
          </a>
        </div>
      </section>
      <FinalCta index={3} />
    </>
  );
}
