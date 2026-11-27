import { useRef } from "react";
import { CATEGORY_LABELS, posterUrl, videoUrl, type WorkItem } from "../data/work";

// Poster first; a muted preview plays only while hovered (desktop). Click opens the player.
export default function WorkCard({ item, onOpen, index }: { item: WorkItem; onOpen: () => void; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const vertical = item.aspect === "vertical";

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => {
        const v = ref.current;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }}
      className={`group text-left flex flex-col gap-2 ${vertical ? "" : "sm:col-span-2"}`}
    >
      <span className={`relative block w-full overflow-hidden bg-panel ${vertical ? "aspect-[9/16]" : "aspect-video"}`}>
        <img src={posterUrl(item)} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <video
          ref={ref}
          src={videoUrl(item)}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-100"
        />
        <span className="absolute top-0 left-0 tc bg-ink/80 px-2 py-1 text-bone">{String(index + 1).padStart(3, "0")}</span>
        <span className="absolute bottom-0 right-0 tc bg-ink/80 px-2 py-1 text-bone">{item.length}</span>
        {item.variants && <span className="absolute top-0 right-0 tc bg-tally text-ink px-2 py-1">{item.variants.length} hooks</span>}
        <span className="absolute inset-0 ring-0 group-hover:ring-2 group-focus-visible:ring-2 ring-tally ring-inset" />
      </span>
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-semibold leading-snug group-hover:text-tally">{item.title}</span>
      </span>
      <span className="tc text-dim -mt-1">{item.client ?? CATEGORY_LABELS[item.category]}</span>
    </button>
  );
}
