import TimecodeLabel from "../type/TimecodeLabel";
import RevealLines from "../type/RevealLines";
import Button from "../ui/Button";
import VideoPlayer from "../video/VideoPlayer";
import MediaReveal from "../ui/MediaReveal";
import type { Service } from "@/content/services";
import { bySlug } from "@/content/portfolio";
import { bookingUrl } from "@/content/site";

export default function ServiceHero({ s }: { s: Service }) {
  const sample = bySlug(s.sample);
  const vertical = sample?.format === "vertical";
  return (
    <section className="wrap pt-36 md:pt-44 pb-[var(--section-y)]">
      <div className="grid-12 gap-y-12 items-end">
        <div className={vertical ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-6"}>
          <TimecodeLabel index={0}>{`Service ${s.number}`}</TimecodeLabel>
          <RevealLines as="h1" immediate className="t-h1 mt-6" lines={[s.title]} />
          <p className="mt-6 font-display font-light text-[clamp(19px,1.6vw,26px)] leading-[1.25] tracking-[-0.02em] text-text-2 max-w-[22ch]">{s.promise}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={bookingUrl()} event="book_call_click" size="lg">Book a call</Button>
            <Button href="#work" variant="outline" size="lg">See the work</Button>
          </div>
        </div>
        {sample && (
          <MediaReveal className={vertical ? "col-span-8 col-start-3 md:col-start-9 md:col-span-4" : "col-span-12 md:col-start-7 md:col-span-6"}>
            <div className={`relative overflow-hidden rounded-lg bg-surface ${vertical ? "aspect-[9/16]" : "aspect-video"}`}>
              <VideoPlayer src={sample.previewSrc} poster={sample.poster} mode="preview" active lazy={false} label={`${sample.title} sample`} className="absolute inset-0 h-full w-full" />
            </div>
          </MediaReveal>
        )}
      </div>
    </section>
  );
}
