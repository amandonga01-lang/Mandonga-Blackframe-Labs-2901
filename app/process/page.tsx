import type { Metadata } from "next";
import PageHead from "@/components/sections/PageHead";
import Reveal from "@/components/type/Reveal";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import { process } from "@/content/process";
import { faq } from "@/content/faq";

export const metadata: Metadata = { title: "Process", description: "Discovery call, strategy and script, edit, review and revisions, delivery and iteration.", alternates: { canonical: "/process" } };

const DETAIL: Record<string, { you: string; we: string }> = {
  "Discovery call": { you: "Goals, audience, examples you like, what's worked before.", we: "Recommend formats, volume and a realistic schedule." },
  "Strategy & script": { you: "Footage, scripts or talking points, brand assets.", we: "Hooks, structure and a shot list if you're still recording." },
  Edit: { you: "Nothing. This part is ours.", we: "Cut, pacing, captions, sound, colour, motion. First cut in 24–48 h for short-form." },
  "Review & revisions": { you: "Notes on the video, or a voice note.", we: "Revise the same day where we can. Same editor every round." },
  "Delivery & iteration": { you: "Post, run, publish. Tell us what performed.", we: "Exports for every platform, then adjust the next batch to what worked." },
};

export default function ProcessPage() {
  return (
    <>
      <PageHead label="Process" lines={["Five steps.", "No surprises."]} intro="The same process for a single launch film or a weekly retainer. You always know what's next and when." />
      <section className="wrap pb-[var(--section-y)]">
        <ol className="border-t border-muted/70">
          {process.map((p, i) => (
            <li key={p.title} className="border-b border-muted/70">
              <Reveal className="grid-12 gap-y-6 py-12 md:py-16">
                <p className="t-mono text-text-3 col-span-12 md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
                <div className="col-span-12 md:col-span-5">
                  <h2 className="t-h2">{p.title}</h2>
                  <p className="t-mono text-signal mt-4">{p.time}</p>
                </div>
                <div className="col-span-12 md:col-start-8 md:col-span-5 flex flex-col gap-6">
                  <p className="t-body">{p.body}</p>
                  <dl className="grid grid-cols-2 gap-[var(--gutter)] text-[16px]">
                    <div><dt className="t-mono text-text-3">You</dt><dd className="mt-2 text-text-2">{DETAIL[p.title]?.you}</dd></div>
                    <div><dt className="t-mono text-text-3">We</dt><dd className="mt-2">{DETAIL[p.title]?.we}</dd></div>
                  </dl>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
      <Faq index={1} items={faq.slice(0, 4)} />
      <FinalCta index={2} />
    </>
  );
}
