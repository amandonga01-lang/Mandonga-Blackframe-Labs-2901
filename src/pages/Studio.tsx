import Avatar from "../components/Avatar";
import { Spotlight, WordReveal } from "../components/motion";
import ClosingCta from "../components/ClosingCta";
import { TEAM, TESTIMONIALS } from "../lib/site";

const RULES = [
  { title: "The cut serves the goal.", body: "A retention reel and a paid ad are different jobs. We ask what the video has to do before we touch the timeline." },
  { title: "Test, don't guess.", body: "For ads we deliver variants, not a single 'final'. The data picks the winner, not our taste." },
  { title: "Editors talk to clients.", body: "No account managers relaying notes. The person cutting your video reads your feedback." },
  { title: "Say the date, hit the date.", body: "You get a delivery date before we start. If something slips, you hear it from us first." },
];

export default function Studio() {
  return (
    <>
      <section className="relative overflow-hidden mx-auto max-w-[1400px] px-4 md:px-8 pt-12 md:pt-16 pb-16">
        <Spotlight />
        <WordReveal lines={["The studio"]} className="display text-[22vw] md:text-[11rem]" />
        <div className="mt-6 grid gap-6 md:grid-cols-2 max-w-5xl text-lg text-bone/90 leading-relaxed">
          <p>
            Blackframe Labs is four editors in India. We started cutting creator content and podcasts, then got pulled into paid social, where a video either holds
            attention in the first second or it doesn't.
          </p>
          <p>
            The name is from the edit suite: a black frame is the empty frame between two shots. It's where the cut happens. That's the part of the job we care
            about most.
          </p>
        </div>
      </section>

      <section aria-label="Team" className="border-t border-rule">
        <ul className="mx-auto max-w-[1400px] grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule border-x border-rule">
          {TEAM.map((p) => (
            <li key={p.name} className="bg-ink p-6 flex flex-col gap-4">
              <Avatar person={p} className="w-full aspect-[4/5] text-6xl" />
              <div>
                <h2 className="display text-4xl">{p.name}</h2>
                <p className="tc text-tally mt-1">{p.role}</p>
              </div>
              <p className="text-dim">{p.does}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-rule bg-panel">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20">
          <h2 className="display text-6xl md:text-8xl">House rules</h2>
          <ol className="mt-10 grid gap-px bg-rule border border-rule md:grid-cols-2">
            {RULES.map((r, i) => (
              <li key={r.title} className="bg-panel p-6 md:p-8 flex gap-5">
                <span className="tc text-dim pt-1.5">0{i + 1}</span>
                <div>
                  <h3 className="display text-3xl md:text-4xl">{r.title}</h3>
                  <p className="mt-3 text-dim max-w-md">{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="border-t border-rule">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 grid gap-12 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name}>
                <blockquote className="display text-4xl md:text-5xl leading-[1.05]">“{t.quote}”</blockquote>
                <figcaption className="mt-5 tc text-dim">
                  <span className="text-bone">{t.name}</span> / {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <ClosingCta />
    </>
  );
}
