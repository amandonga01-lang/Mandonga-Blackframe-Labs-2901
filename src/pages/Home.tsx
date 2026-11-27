import CutMonitor from "../components/CutMonitor";
import ClosingCta from "../components/ClosingCta";
import { CATEGORY_BLURB, CATEGORY_LABELS, CLIENTS, WORK, posterUrl, type WorkCategory } from "../data/work";
import { TEAM, whatsappLink } from "../lib/site";
import Avatar from "../components/Avatar";

const HOOKS = ["ugc-hook-1", "ugc-hook-2", "ugc-hook-3", "ugc-hook-4", "ugc-hook-5", "ugc-hook-6"];

const LANES: { category: WorkCategory; sample: string }[] = [
  { category: "ugc", sample: "ugc-boy" },
  { category: "reels", sample: "randall-reel-11" },
  { category: "podcast", sample: "ht-human-friendly-robotics" },
  { category: "motion", sample: "helo-demo" },
  { category: "realestate", sample: "premium-real-estate" },
];

const STEPS = [
  { tc: "00:00", title: "You send footage", body: "A Drive, Dropbox or Frame.io link, a few references, and what the video has to do. WhatsApp is fine." },
  { tc: "00:12", title: "We reply with a plan", body: "Usually within 12 hours: what we'll make, how many versions, and the date you get a first cut." },
  { tc: "24:00", title: "First cut", body: "Most short-form lands in 24 to 48 hours. Longer pieces get a date up front." },
  { tc: "48:00", title: "Notes, then final", body: "Leave notes on the video or send a voice note. We revise, then deliver files sized for every platform." },
];

export default function Home() {
  const laneItems = LANES.map((l) => WORK.find((w) => w.id === l.sample)!);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-16 grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-16 items-start">
        <div className="flex flex-col">
          <p className="tc text-dim uppercase">Edit studio · AI UGC · short-form · podcasts</p>
          <h1 className="display text-[19vw] sm:text-[15vw] lg:text-[9.2rem] xl:text-[10.5rem] mt-4">
            We cut ads
            <br />
            that stop
            <br />
            <span className="text-tally">thumbs.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-bone/90 leading-relaxed">
            Blackframe Labs is a four-person edit studio in India. We turn raw footage into AI UGC ads, short-form and podcast clips for brands that test fast,
            with a first cut in 24 to 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#/contact" className="bg-tally text-ink px-6 py-4 font-semibold text-lg hover:bg-bone transition-colors">
              Send us footage
            </a>
            <a href="#/work" className="border border-rule px-6 py-4 font-semibold text-lg hover:border-bone transition-colors">
              Watch {WORK.length} projects
            </a>
          </div>
          <p className="mt-6 text-dim">
            Rather talk?{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-bone underline underline-offset-4 decoration-tally hover:text-tally">
              WhatsApp the founders
            </a>
            .
          </p>
        </div>
        <CutMonitor />
      </section>

      {/* Clients */}
      <section aria-label="Clients" className="border-y border-rule overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="tc text-dim uppercase mr-2">Cut for</span>
          {CLIENTS.map((c, i) => (
            <span key={c} className="display text-2xl md:text-3xl text-bone/80">
              {c}
              {i < CLIENTS.length - 1 && <span className="text-rule ml-6" aria-hidden="true">/</span>}
            </span>
          ))}
        </div>
      </section>

      {/* Hook test: the performance-creative proof */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-end">
          <div>
            <p className="tc text-tally uppercase">How we cut ads</p>
            <h2 className="display text-6xl md:text-8xl mt-3">
              One script.
              <br />
              Six first seconds.
            </h2>
          </div>
          <div className="text-lg text-bone/90 leading-relaxed max-w-2xl">
            <p>
              Most ads die in the first second, and nobody can tell you in advance which opening will hold. So we don't guess. We cut the same ad with several
              different hooks and hand your media buyer the set to test.
            </p>
            <p className="mt-4 text-dim">These six are one real ad, six openings. Hover or tap to play.</p>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-2">
          {HOOKS.map((id, i) => (
            <figure key={id} className="flex flex-col gap-1.5">
              <video
                src={`/work/${id}.mp4`}
                poster={`/work/${id}.jpg`}
                muted
                loop
                playsInline
                preload="none"
                onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                onMouseLeave={(e) => e.currentTarget.pause()}
                onClick={(e) => (e.currentTarget.paused ? e.currentTarget.play().catch(() => {}) : e.currentTarget.pause())}
                className="w-full aspect-[9/16] object-cover bg-panel cursor-pointer hover:outline hover:outline-2 hover:outline-tally"
              />
              <figcaption className="tc text-dim">Hook {String.fromCharCode(65 + i)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* What we cut */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28">
          <h2 className="display text-6xl md:text-8xl">What we cut</h2>
          <ol className="mt-10 border-t border-rule">
            {LANES.map((lane, i) => {
              const item = laneItems[i];
              const count = WORK.filter((w) => w.category === lane.category).length;
              return (
                <li key={lane.category} className="border-b border-rule">
                  <a href={`#/work?c=${lane.category}`} className="group grid grid-cols-[auto_1fr] md:grid-cols-[80px_1fr_1.2fr_120px] gap-x-6 gap-y-2 py-6 items-center">
                    <span className="tc text-dim">0{i + 1}</span>
                    <span className="display text-4xl md:text-6xl group-hover:text-tally transition-colors">{CATEGORY_LABELS[lane.category]}</span>
                    <span className="col-start-2 md:col-start-auto text-dim max-w-md">{CATEGORY_BLURB[lane.category]}</span>
                    <span className="hidden md:flex items-center gap-3 justify-end">
                      <span className="tc text-dim">{count} pieces</span>
                      <img src={posterUrl(item)} alt="" loading="lazy" className="w-12 aspect-[9/16] object-cover opacity-70 group-hover:opacity-100" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Process as a timeline */}
      <section className="border-t border-rule bg-panel">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-6xl md:text-8xl">
              Footage in.
              <br />
              <span className="text-tally">Ads out.</span>
            </h2>
            <p className="max-w-sm text-dim">
              We work India time, so what you send at the end of your day is being cut while you sleep. Timecodes are hours from when we get your footage.
            </p>
          </div>
          <ol className="mt-12 grid gap-px bg-rule md:grid-cols-4 border border-rule">
            {STEPS.map((s) => (
              <li key={s.tc} className="bg-panel p-6 flex flex-col gap-3">
                <span className="tc text-tally">{s.tc}:00:00</span>
                <h3 className="display text-3xl">{s.title}</h3>
                <p className="text-dim">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* People */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <h2 className="display text-6xl md:text-8xl">
              No account
              <br />
              managers.
            </h2>
            <p className="mt-6 text-lg text-bone/90 max-w-md">
              You talk to the four people who actually cut your videos. Notes go straight to the timeline, not through a middleman.
            </p>
            <a href="#/studio" className="inline-block mt-6 text-bone underline underline-offset-4 decoration-tally hover:text-tally">
              Meet the studio
            </a>
          </div>
          <ul className="grid grid-cols-2 gap-px bg-rule border border-rule self-start">
            {TEAM.map((p) => (
              <li key={p.name} className="bg-ink p-5 flex flex-col gap-3">
                <Avatar person={p} className="w-16 h-16" />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="tc text-dim">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />

    </>
  );
}
