import TimecodeLabel from "../type/TimecodeLabel";
import RevealLines from "../type/RevealLines";
import Button from "../ui/Button";
import TimelineCSS from "./TimelineCSS";
import HeroScene from "./HeroScene";
import { bookingUrl, site } from "@/content/site";

/** Hero: left-aligned copy over the timeline scene. CSS scene renders first (instant); WebGL fades in over it where supported. */
export default function Hero() {
  const words = site.hero.headline.split(" ");
  // Designed line breaks: roughly three balanced lines.
  const per = Math.ceil(words.length / 3);
  const lines = [0, 1, 2].map((i) => words.slice(i * per, (i + 1) * per).join(" ")).filter(Boolean);
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden flex items-end">
      <TimelineCSS />
      <HeroScene />
      <div className="glow -z-0" aria-hidden="true" />
      <div className="wrap relative w-full pt-36 pb-20 md:pb-28">
        <TimecodeLabel index={0} rec>{site.hero.label}</TimecodeLabel>
        <RevealLines as="h1" immediate className="t-hero mt-6 max-w-[13ch]" lines={lines} />
        <p className="t-body mt-8">{site.hero.sub}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={bookingUrl()} event="book_call_click" size="lg">Book a call</Button>
          <Button href="#showreel" variant="outline" size="lg">Watch showreel</Button>
        </div>
      </div>
    </section>
  );
}
