"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import type { PortfolioItem } from "@/content/portfolio";
import { metaLine } from "@/lib/labels";
import { useSinglePreview } from "@/lib/useSinglePreview";

type Props = {
  item: PortfolioItem;
  onOpen: () => void;
  sizes?: string;
  className?: string;
  priority?: boolean;
  showResult?: boolean;
};

/** Poster first; a muted 4 s loop plays on hover (desktop) or when most in view (touch). */
export default function VideoCard({ item, onOpen, sizes = "(max-width: 768px) 50vw, 25vw", className = "", priority = false, showResult = true }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const active = useSinglePreview(item.slug, ref, hover);
  const aspect = item.format === "vertical" ? "aspect-[9/16]" : item.format === "square" ? "aspect-square" : "aspect-video";
  const result = item.results?.[0];

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      data-cursor="play"
      className={`group block w-full text-left ${className}`}
    >
      <span className={`crop relative block overflow-hidden rounded-lg bg-surface ${aspect}`}>
        <span className="crop-b" />
        <Image src={item.poster} alt="" fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-[1.2s] ease-studio group-hover:scale-[1.03]" />
        <VideoPlayer
          src={item.previewSrc}
          mode="preview"
          active={active}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-studio ${active ? "opacity-100" : "opacity-0"}`}
        />
        <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="t-mono absolute left-4 bottom-4 right-4 text-white opacity-0 translate-y-1 transition-[opacity,transform] duration-700 ease-studio group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100">
          {metaLine(item)}
        </span>
      </span>
      <span className="mt-4 flex items-start justify-between gap-4">
        <span>
          <span className="block text-[17px] leading-snug"><span className="sr-only">Play </span>{item.title}</span>
          <span className="t-mono mt-1.5 block text-text-3">{[item.client, metaLine(item)].filter(Boolean).join(" · ")}</span>
        </span>
        {showResult && result && (
          <span className="text-right shrink-0">
            <span className="block font-display text-[22px] leading-none">{result.value}</span>
            <span className="t-mono text-text-3">{result.label}</span>
          </span>
        )}
      </span>
    </button>
  );
}
