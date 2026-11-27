import { useState } from "react";
import CutMonitor from "../components/CutMonitor";
import ClosingCta from "../components/ClosingCta";
import Avatar from "../components/Avatar";
import YouTube from "../components/YouTube";
import WorkCard from "../components/WorkCard";
import VideoModal from "../components/VideoModal";
import { Echo, FactField, Reveal, ScrollType, SplitAround, Spotlight, WordReveal } from "../components/motion";
import { CATEGORY_BLURB, CATEGORY_LABELS, CATEGORY_ORDER, CLIENTS, EPISODES, WORK, posterUrl, videoUrl } from "../data/work";
import { TEAM, whatsappLink } from "../lib/site";

const byId = (id: string) => WORK.find((w) => w.id === id)!;
const PODCAST_CLIPS = ["caravan-open-recap", "ht-human-friendly-robotics", "neel-patel-podcast", "ht-iconavize"].map(byId);
const ADS = ["ugc-cerca", "ugc-boy", "ai-commercial-1", "ai-vertical-ad"].map(byId);
const BASE360 = byId("base360");

const STEPS = [
  { tc: "00", title: "You send footage", body: "A Drive, Dropbox or Frame.io link, a few references, and what the video has to do. WhatsApp is fine." },
  { tc: "12", title: "We reply with a plan", body: "Usually within 12 hours: what we'll make, how many versions, and the date you get a first cut." },
  { tc: "24", title: "First cut", body: "Most short-form lands in 24 to 48 hours. Full episodes get a date up front." },
  { tc: "48", title: "Notes, then final", body: "Leave notes on the video or send a voice note. We revise, then deliver files sized for every platform." },
];

export default function Home() {
  const [open, setOpen] = useState<{ list: typeof WORK; i: number } | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Spotlight />
        <div className="relative mx-auto max-w-[1400px] px-4 md:px-8 pt-10 md:pt-16 pb-16 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16 items-start">
          <div className="flex flex-col">
            <Reveal>
              <p className="tc text-dim uppercase">Edit studio · podcasts · talking heads · short-form</p>
            </Reveal>
            <WordReveal
              lines={["We cut", "podcasts", "people [finish.]"]}
              className="display text-[19vw] sm:text-[15vw] lg:text-[9rem] xl:text-[10.5rem] mt-4"
            />
            <Reveal delay={500}>
              <p className="mt-8 max-w-xl text-lg md:text-xl text-bone/90 leading-relaxed">
                Full episodes, clips and talking-head content for founders and creators building an audience. Four editors in India, first cuts in 24 to 48
                hours. We also make Meta AI UGC ads that sell.
              </p>
            </Reveal>
            <Reveal delay={650} className="mt-8 flex flex-wrap gap-3">
              <a href="#/contact" className="bg-tally text-ink px-6 py-4 font-semibold text-lg hover:bg-bone transition-colors">
                Send us footage
              </a>
              <a href="#/work" className="border border-rule px-6 py-4 font-semibold text-lg hover:border-bone transition-colors">
                Watch the work
              </a>
            </Reveal>
            <Reveal delay={750}>
              <p className="mt-6 text-dim">
                Rather talk?{" "}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-bone underline underline-offset-4 decoration-tally hover:text-tally">
                  WhatsApp the founders
                </a>
                .
              </p>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <CutMonitor />
          </Reveal>
        </div>
      </section>

      {/* Clients */}
      <section aria-label="Clients" className="border-y border-rule">
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

      <ScrollType text="Podcasts · Talking heads · Short-form ·" className="py-8 text-bone/90" />

      {/* Podcasts: full episodes + clips */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8 pb-20 md:pb-28">
        <div className="grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16 items-end">
          <Reveal>
            <p className="tc text-tally uppercase">01 / Podcasts</p>
            <h2 className="display text-6xl md:text-8xl mt-3">
              The episode.
              <br />
              <span className="text-dim">And everything</span>
              <br />
              cut from it.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-lg text-bone/90 leading-relaxed max-w-2xl">
              We edit the full multicam episode, clean the audio, then pull the moments that travel and cut them for Shorts, Reels and TikTok. One recording,
              a month of content.
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[7fr_5fr]">
          <div className="flex flex-col gap-10">
            {EPISODES.slice(0, 3).map((ep, i) => (
              <Reveal key={ep.youtubeId} delay={i * 100}>
                <YouTube ep={ep} />
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-6">
            {PODCAST_CLIPS.map((item, i) => (
              <Reveal key={item.id} delay={i * 90}>
                <WorkCard item={item} index={i} onOpen={() => setOpen({ list: PODCAST_CLIPS, i })} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Talking heads: words split around a reel */}
      <section className="border-t border-rule">
        <SplitAround left="Talking" right="heads">
          <video src={videoUrl(byId("randall-reel-1"))} poster={posterUrl(byId("randall-reel-1"))} muted loop autoPlay playsInline preload="metadata" className="w-full aspect-[9/16] object-cover border border-rule" />
        </SplitAround>
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 pb-20 md:pb-28 grid gap-8 md:grid-cols-[5fr_7fr]">
          <Reveal>
            <p className="tc text-tally uppercase">02 / Talking heads & short-form</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg text-bone/90 leading-relaxed max-w-2xl">
              Founders, coaches and creators on camera. We find the hook in your first sentence, cut the dead air, and add captions and sound so people stay
              to the end. Same editors every week, so your style stays yours.
            </p>
            <a href="#/work?c=reels" className="inline-block mt-5 text-bone underline underline-offset-4 decoration-tally hover:text-tally">
              See the talking-head work
            </a>
          </Reveal>
        </div>
      </section>

      {/* Real facts, reference-style crosshair layout */}
      <section className="border-t border-rule bg-panel">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28">
          <FactField
            facts={[
              { value: "4", label: "editors, and you talk to them directly" },
              { value: "24–48h", label: "to a first cut on most short-form" },
              { value: "IST", label: "we cut while the US and UK sleep" },
              { value: String(WORK.length), label: "real projects on this site" },
            ]}
          />
        </div>
      </section>

      {/* Meta AI UGC ads */}
      <section className="border-t border-rule overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[5fr_7fr] items-end">
            <div>
              <p className="tc text-tally uppercase">03 / Meta AI UGC ads</p>
              <Echo text="Ads that sell." rows={4} className="text-6xl md:text-8xl mt-3" />
            </div>
            <Reveal>
              <p className="text-lg text-bone/90 leading-relaxed max-w-2xl">
                One of the things we do best. AI-generated scenes and real creators, cut for Meta with a hook in the first
                second and captions that carry the pitch with the sound off.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8">
            {ADS.map((item, i) => (
              <Reveal key={item.id} delay={i * 90}>
                <WorkCard item={item} index={i} onOpen={() => setOpen({ list: ADS, i })} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS: Base360 */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28 grid gap-10 lg:grid-cols-[7fr_5fr] items-center">
          <Reveal>
            <button type="button" onClick={() => setOpen({ list: [BASE360], i: 0 })} className="group relative block w-full aspect-video border border-rule overflow-hidden" aria-label="Play the Base360 founder film">
              <video src={videoUrl(BASE360)} poster={posterUrl(BASE360)} muted loop autoPlay playsInline preload="metadata" className="w-full h-full object-cover" />
              <span className="absolute bottom-0 left-0 bg-tally text-ink px-4 py-2 font-semibold group-hover:bg-bone">▶ Watch with sound · {BASE360.length}</span>
            </button>
          </Reveal>
          <Reveal delay={120}>
            <p className="tc text-tally uppercase">04 / SaaS & product</p>
            <h2 className="display text-5xl md:text-7xl mt-3">Founder films for software.</h2>
            <p className="mt-5 text-lg text-bone/90 leading-relaxed">
              For Base360 we cut the founder on camera together with UI walkthroughs and motion captions: one story about what the product does, not a
              feature list.
            </p>
            <a href="#/work?c=motion" className="inline-block mt-5 text-bone underline underline-offset-4 decoration-tally hover:text-tally">
              More motion & SaaS work
            </a>
          </Reveal>
        </div>
      </section>

      {/* Everything we cut */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28">
          <Reveal>
            <h2 className="display text-6xl md:text-8xl">Everything we cut</h2>
          </Reveal>
          <ol className="mt-10 border-t border-rule">
            {CATEGORY_ORDER.map((c, i) => {
              const items = WORK.filter((w) => w.category === c);
              return (
                <Reveal as="li" key={c} delay={i * 70} className="border-b border-rule">
                  <a href={`#/work?c=${c}`} className="group grid grid-cols-[auto_1fr] md:grid-cols-[80px_1.1fr_1.2fr_120px] gap-x-6 gap-y-2 py-6 items-center">
                    <span className="tc text-dim">0{i + 1}</span>
                    <span className="display text-4xl md:text-6xl group-hover:text-tally group-hover:translate-x-2 transition-[color,transform] duration-300">
                      {CATEGORY_LABELS[c]}
                    </span>
                    <span className="col-start-2 md:col-start-auto text-dim max-w-md">{CATEGORY_BLURB[c]}</span>
                    <span className="hidden md:flex items-center gap-3 justify-end">
                      <span className="tc text-dim">{items.length} pieces</span>
                      <img src={posterUrl(items[0])} alt="" loading="lazy" className="w-12 aspect-[9/16] object-cover opacity-70 group-hover:opacity-100" />
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-rule bg-panel">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <h2 className="display text-6xl md:text-8xl">
                Footage in.
                <br />
                <span className="text-tally">Edits out.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-sm text-dim">Timecodes are hours from when we get your footage. We work India time, so a lot of it happens while you sleep.</p>
            </Reveal>
          </div>
          <ol className="mt-12 grid gap-px bg-rule md:grid-cols-4 border border-rule">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.tc} delay={i * 110} className="bg-panel p-6 flex flex-col gap-3">
                <span className="tc text-tally">{s.tc}:00:00:00</span>
                <h3 className="display text-3xl">{s.title}</h3>
                <p className="text-dim">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* People */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-28 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Reveal>
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
          </Reveal>
          <ul className="grid grid-cols-2 gap-px bg-rule border border-rule self-start">
            {TEAM.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 90} className="bg-ink p-5 flex flex-col gap-3">
                <Avatar person={p} className="w-16 h-16" />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="tc text-dim">{p.role}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta />

      {open && <VideoModal items={open.list} index={open.i} onIndex={(i) => setOpen({ ...open, i })} onClose={() => setOpen(null)} />}
    </>
  );
}
