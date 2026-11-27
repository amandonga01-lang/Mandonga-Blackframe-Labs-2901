import ClosingCta from "../components/ClosingCta";
import { Spotlight, WordReveal } from "../components/motion";
import { CATEGORY_LABELS, WORK, posterUrl, type WorkCategory } from "../data/work";
import { FAQS, PRICES } from "../lib/site";

const SERVICES: { category: WorkCategory; sample: string; for: string; get: string[] }[] = [
  {
    category: "podcast",
    sample: "caravan-open-recap",
    for: "Shows that want the full YouTube episode and the clips that grow it.",
    get: ["Multicam full-episode edit for YouTube", "Audio cleanup and levelling", "Clips picked for the moments that travel", "Branded captions, intro and lower thirds"],
  },
  {
    category: "reels",
    sample: "randall-reel-1",
    for: "Founders, coaches and creators on camera, posting every week.",
    get: ["A hook in the first second, then pattern interrupts", "Kinetic captions in your brand style", "Sound design and music", "Shorts, Reels and TikTok exports"],
  },
  {
    category: "ugc",
    sample: "ugc-cerca",
    for: "DTC brands, apps and agencies running paid social on Meta and TikTok.",
    get: ["Several hook variants per script, ready to test", "Captions that carry the pitch with the sound off", "9:16, 4:5 and 1:1 exports", "AI-generated scenes and avatars when the brief calls for it"],
  },
  {
    category: "motion",
    sample: "base360",
    for: "SaaS and tech teams launching a product or feature.",
    get: ["Founder films that mix talking head and UI", "Product demos with UI animation", "Explainers and show intros", "Kinetic type and logo animation", "Versions for site, socials and sales decks"],
  },
  {
    category: "realestate",
    sample: "premium-real-estate",
    for: "Agents, developers and contractors showing a finished property or project.",
    get: ["Walkthrough pacing that keeps people watching", "Colour grade and stabilisation", "Music-led edits with on-screen details", "Vertical cut-downs for socials"],
  },
];

const MODELS = [
  { name: "One project", key: "project" as const, body: "A launch, a campaign, an episode. Clear scope, a quote and a delivery date before we start." },
  { name: "Monthly retainer", key: "retainer" as const, body: "A set number of videos every month on a schedule. The same editors every time, so your style stays consistent." },
  { name: "Dedicated editor", key: "dedicated" as const, body: "One of our editors works on your content full-time, in your tools and your channels." },
];

export default function Services() {
  return (
    <>
      <section className="relative overflow-hidden mx-auto max-w-[1400px] px-4 md:px-8 pt-12 md:pt-16 pb-6">
        <Spotlight />
        <WordReveal lines={["Services"]} className="display text-[22vw] md:text-[11rem]" />
        <p className="mt-4 max-w-xl text-lg text-bone/90">Podcasts and talking heads first, Meta AI UGC ads alongside. Three ways to work with us. Every job starts with footage and a goal, not a form.</p>
      </section>

      <section aria-label="What we edit" className="mx-auto max-w-[1400px] px-4 md:px-8">
        {SERVICES.map((s, i) => {
          const sample = WORK.find((w) => w.id === s.sample)!;
          return (
            <article key={s.category} className="border-t border-rule py-12 grid gap-8 md:grid-cols-[80px_1fr_1fr_160px]">
              <span className="tc text-dim">0{i + 1}</span>
              <div>
                <h2 className="display text-5xl md:text-7xl">{CATEGORY_LABELS[s.category]}</h2>
                <p className="mt-4 text-dim max-w-sm">{s.for}</p>
              </div>
              <ul className="flex flex-col gap-3 self-center">
                {s.get.map((g) => (
                  <li key={g} className="flex gap-3">
                    <span className="text-tally" aria-hidden="true">▸</span>
                    {g}
                  </li>
                ))}
              </ul>
              <a href={`#/work?c=${s.category}`} className="group hidden md:block self-start">
                <img src={posterUrl(sample)} alt="" loading="lazy" className="w-full aspect-[9/16] object-cover border border-rule group-hover:border-tally" />
                <span className="tc text-dim group-hover:text-tally mt-2 block">See examples ▸</span>
              </a>
            </article>
          );
        })}
      </section>

      <section className="border-t border-rule bg-panel mt-8">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20">
          <h2 className="display text-6xl md:text-8xl">How you can hire us</h2>
          <div className="mt-10 grid gap-px bg-rule border border-rule md:grid-cols-3">
            {MODELS.map((m) => (
              <div key={m.name} className="bg-panel p-6 flex flex-col gap-4">
                <h3 className="display text-4xl">{m.name}</h3>
                <p className="text-dim">{m.body}</p>
                <p className="mt-auto tc text-bone pt-4 border-t border-rule">{PRICES[m.key] || "Quoted after we see the footage"}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-dim max-w-2xl">
            You get a quote and a delivery date before any work starts. Turnaround for most short-form is 24 to 48 hours from footage.
          </p>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 grid gap-10 lg:grid-cols-[5fr_7fr]">
          <h2 className="display text-6xl md:text-8xl">Questions</h2>
          <div className="border-t border-rule">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-b border-rule">
                <summary className="flex justify-between gap-6 py-5 cursor-pointer list-none text-lg font-semibold">
                  {f.q}
                  <span className="text-tally group-open:rotate-90 transition-transform" aria-hidden="true">▸</span>
                </summary>
                <p className="pb-6 text-dim max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
