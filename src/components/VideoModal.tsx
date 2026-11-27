import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CATEGORY_BLURB, CATEGORY_LABELS, posterUrl, videoUrl, type WorkItem } from "../data/work";
import { whatsappLink } from "../lib/site";

interface Props {
  items: WorkItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}

export default function VideoModal({ items, index, onIndex, onClose }: Props) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const prev = () => onIndex((index - 1 + items.length) % items.length);
  const next = () => onIndex((index + 1) % items.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const vertical = item.aspect === "vertical";

  return createPortal(
    <div className="fixed inset-0 z-[90] bg-black/95 flex flex-col" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="flex items-center justify-between gap-4 px-4 md:px-8 h-14 border-b border-rule shrink-0">
        <span className="tc text-dim">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={prev} className="tc uppercase border border-rule px-3 py-1.5 hover:border-bone" aria-label="Previous video">
            ◂ Prev
          </button>
          <button type="button" onClick={next} className="tc uppercase border border-rule px-3 py-1.5 hover:border-bone" aria-label="Next video">
            Next ▸
          </button>
          <button ref={closeRef} type="button" onClick={onClose} className="tc uppercase bg-bone text-ink px-3 py-1.5 ml-2" aria-label="Close video">
            Close ✕
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        <div className="flex-1 min-h-0 flex items-center justify-center p-3 md:p-6">
            <video
              key={item.id}
              src={videoUrl(item)}
              poster={posterUrl(item)}
              controls
              autoPlay
              playsInline
              className={vertical ? "h-full max-h-[78vh] aspect-[9/16] bg-black" : "w-full max-w-5xl max-h-[78vh] aspect-video bg-black"}
            />
        </div>

        <aside className="lg:w-[340px] shrink-0 border-t lg:border-t-0 lg:border-l border-rule p-5 md:p-6 flex flex-col gap-4 overflow-y-auto">
          <p className="tc uppercase text-tally">{CATEGORY_LABELS[item.category]}</p>
          <h2 className="display text-4xl">{item.title}</h2>
          <dl className="tc grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-dim">
            {item.client && (
              <>
                <dt>Client</dt>
                <dd className="text-bone">{item.client}</dd>
              </>
            )}
            <dt>Length</dt>
            <dd className="text-bone">{item.length}</dd>
            <dt>Format</dt>
            <dd className="text-bone">{vertical ? "9:16" : "16:9"}</dd>
          </dl>
          <p className="text-dim">{item.note ?? CATEGORY_BLURB[item.category]}</p>
          <div className="mt-auto flex flex-col gap-2 pt-4">
            <a href="#/contact" onClick={onClose} className="bg-tally text-ink text-center py-3 font-semibold">
              I want one like this
            </a>
            <a
              href={whatsappLink(`Hi Blackframe, I saw "${item.title}" on your site and want something similar.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-rule text-center py-3 hover:border-bone"
            >
              Ask on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </div>,
    document.body,
  );
}
