import TimecodeLabel from "../type/TimecodeLabel";
import RevealLines from "../type/RevealLines";
import Button from "../ui/Button";
import { bookingUrl, site } from "@/content/site";

/** Final statement over the second (and last) red studio glow. */
export default function FinalCta({ index, lines = ["**Send us one video.**", "We'll show you what it could be."] }: { index: number; lines?: string[] }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="glow" aria-hidden="true" />
      <div className="wrap section relative">
        <TimecodeLabel index={index} rec>Final cut</TimecodeLabel>
        <RevealLines className="t-hero mt-6 max-w-[20ch]" lines={lines} />
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Button href={bookingUrl()} event="book_call_click" size="lg">Book a call</Button>
          <a href={`mailto:${site.email}`} className="t-mono text-text-2 hover:text-text">{site.email}</a>
        </div>
      </div>
    </section>
  );
}
