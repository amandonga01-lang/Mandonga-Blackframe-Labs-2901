import TimecodeLabel from "../type/TimecodeLabel";
import RevealLines from "../type/RevealLines";
import Button from "../ui/Button";
import HeroVideo from "./HeroVideo";
import Rich from "../type/Rich";
import { bookingUrl, site } from "@/content/site";

/** Hero: real footage full-bleed, copy left. The red glow bleeds into the next section (no hard edge). */
export default function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] flex items-end">
      <HeroVideo />
      <div className="glow" aria-hidden="true" />
      <div className="wrap relative w-full pt-32 pb-16 md:pb-24">
        <TimecodeLabel index={0} rec>{site.hero.label}</TimecodeLabel>
        <RevealLines as="h1" immediate className="t-hero mt-6" lines={site.hero.lines} />
        <p className="t-body mt-7 max-w-[46ch]"><Rich text={site.hero.sub} /></p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={bookingUrl()} event="book_call_click" size="lg">Book a call</Button>
          <Button href="#showreel" variant="outline" size="lg">Watch showreel</Button>
        </div>
      </div>
    </section>
  );
}
