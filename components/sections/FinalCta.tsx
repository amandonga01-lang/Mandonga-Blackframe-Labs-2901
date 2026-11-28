import TimecodeLabel from "../type/TimecodeLabel";
import RevealLines from "../type/RevealLines";
import Button from "../ui/Button";
import ParticleCloud from "../particles/ParticleCloud";
import { bookingUrl, site } from "@/content/site";

/** Final statement over the second (and last) red studio glow. `cloud` adds the contained particle cloud (home only). */
export default function FinalCta({ index, lines = ["**Send us one video.**", "We'll show you what it could be."], cloud = false }: { index: number; lines?: string[]; cloud?: boolean }) {
  return (
    <section className="relative isolate">
      <div className="glow" aria-hidden="true" />
      <div className="wrap section relative grid-12 items-center gap-y-10">
        <div className={cloud ? "col-span-12 lg:col-span-7" : "col-span-12"}>
          <TimecodeLabel index={index} rec>Final cut</TimecodeLabel>
          <RevealLines className="t-hero mt-6 max-w-[20ch]" lines={lines} />
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Button href={bookingUrl()} event="book_call_click" size="lg">Book a call</Button>
            <a href={`mailto:${site.email}`} className="t-mono text-text-2 hover:text-text">{site.email}</a>
          </div>
        </div>
        {cloud && <ParticleCloud className="hidden lg:block col-span-5 aspect-square" />}
      </div>
    </section>
  );
}
