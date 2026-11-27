import { useMemo, useState } from "react";
import { Spotlight, WordReveal } from "../components/motion";
import WorkCard from "../components/WorkCard";
import VideoModal from "../components/VideoModal";
import ClosingCta from "../components/ClosingCta";
import { CATEGORY_LABELS, CATEGORY_ORDER, EPISODES, WORK, type WorkCategory } from "../data/work";
import YouTube from "../components/YouTube";

const PAGE = 12;

const initialCategory = (): WorkCategory | "all" => {
  const c = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("c");
  return CATEGORY_ORDER.includes(c as WorkCategory) ? (c as WorkCategory) : "all";
};

export default function Work() {
  const [category, setCategory] = useState<WorkCategory | "all">(initialCategory);
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => (category === "all" ? WORK : WORK.filter((w) => w.category === category)), [category]);
  const visible = items.slice(0, shown);

  const pick = (c: WorkCategory | "all") => {
    setCategory(c);
    setShown(PAGE);
    // Keep the filter in the URL so it can be shared.
    history.replaceState(null, "", c === "all" ? "#/work" : `#/work?c=${c}`);
  };

  return (
    <>
      <section className="relative overflow-hidden mx-auto max-w-[1400px] px-4 md:px-8 pt-12 md:pt-16">
        <Spotlight />
        <div className="flex items-end justify-between gap-8">
          <div>
            <WordReveal lines={["The work"]} className="display text-[22vw] md:text-[11rem]" />
            <p className="mt-4 max-w-xl text-lg text-bone/90">
              {WORK.length} pieces plus full episodes, all real client work. Click anything to watch it with sound.
            </p>
          </div>
          <video src="/work/showreel-916.mp4" poster="/work/showreel-916.jpg" muted loop autoPlay playsInline preload="metadata" aria-label="Studio montage" className="hidden md:block w-40 lg:w-52 aspect-[9/16] object-cover border border-rule shrink-0" />
        </div>
      </section>

      <div className="sticky top-16 z-30 bg-ink/95 backdrop-blur-sm border-y border-rule mt-10">
        <div role="toolbar" aria-label="Filter work" className="mx-auto max-w-[1400px] px-4 md:px-8 py-3 flex gap-2 overflow-x-auto">
          {(["all", ...CATEGORY_ORDER] as const).map((c) => {
            const count = c === "all" ? WORK.length : WORK.filter((w) => w.category === c).length;
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => pick(c)}
                className={`shrink-0 px-3 py-2 text-[15px] border transition-colors ${
                  active ? "bg-bone text-ink border-bone" : "border-rule text-dim hover:text-bone hover:border-bone"
                }`}
              >
                {c === "all" ? "Everything" : CATEGORY_LABELS[c]} <span className="tc opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {(category === "all" || category === "podcast") && EPISODES.length > 0 && (
        <section aria-label="Full episodes" className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10">
          <h2 className="display text-4xl md:text-5xl">Full episodes</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {EPISODES.map((ep) => (
              <YouTube key={ep.youtubeId} ep={ep} />
            ))}
          </div>
          <h2 className="display text-4xl md:text-5xl mt-14">Clips & cuts</h2>
        </section>
      )}

      <section className="mx-auto max-w-[1400px] px-4 md:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-8 grid-flow-dense">
          {visible.map((item, i) => (
            <WorkCard key={item.id} item={item} index={i} onOpen={() => setOpen(i)} />
          ))}
        </div>
        {shown < items.length && (
          <div className="mt-12 flex justify-center">
            <button type="button" onClick={() => setShown((s) => s + PAGE)} className="border border-rule px-6 py-3 hover:border-bone">
              Show more <span className="tc text-dim ml-2">{items.length - shown} left</span>
            </button>
          </div>
        )}
      </section>

      <ClosingCta title="Want one of these?" />

      {open !== null && <VideoModal items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
