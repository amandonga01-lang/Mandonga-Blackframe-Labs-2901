import type { Metadata } from "next";
import Image from "next/image";
import PageHead from "@/components/sections/PageHead";
import SectionHead from "@/components/sections/SectionHead";
import Reveal from "@/components/type/Reveal";
import FinalCta from "@/components/sections/FinalCta";
import LocalTime from "@/components/layout/LocalTime";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About", description: "Four editors in India. You talk to the people who cut your videos.", alternates: { canonical: "/about" } };

const RULES = [
  { t: "The cut serves the goal.", b: "A retention reel and a paid ad are different jobs. We ask what the video has to do before we touch the timeline." },
  { t: "Test, don't guess.", b: "For ads we deliver variations, not a single final. The data picks the winner." },
  { t: "Editors talk to clients.", b: "No account managers relaying notes. The person cutting your video reads your feedback." },
  { t: "Say the date, hit the date.", b: "You get a delivery date before we start. If something slips, you hear it from us first." },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        label="About"
        lines={["Four editors.", "No middlemen."]}
        intro={`BlackFrameLabs is a small studio in ${site.location}. We cut podcasts, talking heads, SaaS films and Meta ads for founders, creators and brands in the US, UK and beyond.`}
      />
      <section className="wrap pb-[var(--section-y)]">
        <div className="grid-12 gap-y-10">
          <Reveal className="col-span-12 md:col-span-6">
            <p className="font-display font-light text-[clamp(26px,2.6vw,40px)] leading-[1.2] tracking-[-0.02em]">
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
        <SectionHead index={1} label="Team" lines={["The people", "cutting your videos."]} size="t-h2" />
        <ul className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-[var(--gutter)] gap-y-12">
          {site.team.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <li>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-muted bg-surface">
                  {p.photo ? (
                    <Image src={p.photo} alt={p.name} fill sizes="25vw" className="object-cover" />
                  ) : (
                    <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display font-light text-[56px] tracking-[-0.04em] text-text-3">
                      {p.name.split(" ").map((x) => x[0]).join("")}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[18px]">{p.name}</p>
                <p className="t-mono text-text-3 mt-1">{p.role}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
      <section className="wrap section pt-0">
        <SectionHead index={2} label="House rules" lines={["How we work."]} size="t-h2" />
        <ol className="mt-16 grid gap-[var(--gutter)] md:grid-cols-2">
          {RULES.map((r, i) => (
            <Reveal key={r.t} delay={(i % 2) * 0.08}>
              <li className="rounded-xl border border-muted p-8 md:p-10 h-full">
                <p className="t-mono text-text-3">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-4">{r.t}</h3>
                <p className="t-body mt-3 text-[17px]">{r.b}</p>
              </li>
            </Reveal>
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
