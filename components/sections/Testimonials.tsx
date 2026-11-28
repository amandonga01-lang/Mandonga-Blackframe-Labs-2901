import Image from "next/image";
import TimecodeLabel from "../type/TimecodeLabel";
import RevealLines from "../type/RevealLines";
import { textTestimonials, videoTestimonials } from "@/content/testimonials";

/** The one light section. Real testimonials only; hidden while the lists are empty. */
export const hasTestimonials = () => textTestimonials.length + videoTestimonials.length > 0;

export default function Testimonials({ index }: { index: number }) {
  if (!hasTestimonials()) return null;
  return (
    <section className="bg-paper text-ink">
      <div className="wrap section">
        <p className="t-mono text-ink/60">{/* timecode */}<TimecodeInk index={index} /></p>
        <RevealLines className="t-h1 mt-5" lines={["In their words."]} />
        {videoTestimonials.length > 0 && (
          <div className="mt-16 flex gap-[var(--gutter)] overflow-x-auto pb-4 snap-x">
            {videoTestimonials.map((v) => (
              <figure key={v.name} className="snap-start shrink-0 w-[240px]">
                <video src={v.src} poster={v.poster} controls playsInline preload="none" className="aspect-[9/16] w-full rounded-lg object-cover bg-ink/10" aria-label={`Testimonial from ${v.name}`} />
                <figcaption className="mt-3"><span className="block">{v.name}</span><span className="t-mono text-ink/60">{v.role}, {v.company}</span></figcaption>
              </figure>
            ))}
          </div>
        )}
        {textTestimonials.length > 0 && (
          <div className="mt-16 grid gap-16 md:grid-cols-2">
            {textTestimonials.map((t) => (
              <figure key={t.name}>
                <blockquote className="font-display font-light text-[clamp(20px,1.8vw,28px)] leading-[1.15] tracking-[-0.02em]">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  {t.photo && <Image src={t.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />}
                  <span><span className="block">{t.name}</span><span className="t-mono text-ink/60">{t.role}, {t.company}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import { sectionTimecode } from "@/lib/motion";
function TimecodeInk({ index }: { index: number }) {
  return <>{sectionTimecode(index)} — In their words</>;
}
