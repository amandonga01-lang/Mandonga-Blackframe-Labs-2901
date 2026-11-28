"use client";
import Image from "next/image";
import { useState } from "react";
import type { Episode } from "@/content/portfolio";
import { track } from "@/lib/analytics";

/** Thumbnail first; the privacy-enhanced YouTube player loads only on click. */
export default function YouTubeEmbed({ ep, priority = false }: { ep: Episode; priority?: boolean }) {
  const [play, setPlay] = useState(false);
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-surface">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ep.youtubeId}?autoplay=1&rel=0`}
            title={`${ep.show}: ${ep.title}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            data-cursor="play"
            onClick={() => { setPlay(true); track("video_play", { slug: ep.youtubeId, where: "youtube" }); }}
            className="group absolute inset-0"
          >
            <Image src={ep.thumb ?? `https://i.ytimg.com/vi/${ep.youtubeId}/hqdefault.jpg`} alt="" fill priority={priority} fetchPriority={priority ? "high" : "auto"} sizes="(max-width:768px) 100vw, 50vw" className="object-cover opacity-85 transition-opacity duration-700 group-hover:opacity-100" />
            <span className="t-mono absolute left-4 bottom-4 rounded-full bg-ink/75 px-3 py-1.5">▶ Full episode · {ep.duration}<span className="sr-only">: {ep.title}</span></span>
          </button>
        )}
      </div>
      <figcaption className="mt-4">
        <span className="t-mono text-text-3">{ep.show}</span>
        <span className="mt-1 block text-[17px]">{ep.title}</span>
      </figcaption>
    </figure>
  );
}
