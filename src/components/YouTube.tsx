import { useState } from "react";
import type { Episode } from "../data/work";

// Thumbnail first; the real (privacy-enhanced) player loads only on click.
export default function YouTube({ ep, className = "" }: { ep: Episode; className?: string }) {
  const [play, setPlay] = useState(false);
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className="relative aspect-video bg-panel border border-rule overflow-hidden">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ep.youtubeId}?autoplay=1&rel=0`}
            title={`${ep.show}: ${ep.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`Play full episode: ${ep.title}`}>
            <img src={`https://i.ytimg.com/vi/${ep.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="bg-tally text-ink px-5 py-3 font-semibold group-hover:bg-bone transition-colors">▶ Watch full episode</span>
            </span>
            <span className="absolute bottom-0 right-0 tc bg-ink/80 px-2 py-1">{ep.length}</span>
          </button>
        )}
      </div>
      <figcaption>
        <p className="tc text-tally">{ep.show}</p>
        <p className="font-semibold mt-1">{ep.title}</p>
      </figcaption>
    </figure>
  );
}
