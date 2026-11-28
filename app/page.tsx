import TimecodeLabel from "@/components/type/TimecodeLabel";
import RevealLines from "@/components/type/RevealLines";
import Button from "@/components/ui/Button";
import { bookingUrl, site } from "@/content/site";

// Phase 1 placeholder home: layout, type and chrome only. Sections arrive in Phase 3.
export default function Home() {
  return (
    <>
    <section className="relative overflow-hidden min-h-[100svh] flex items-end">
      <div className="glow" aria-hidden="true" />
      <div className="wrap w-full pb-24 pt-40">
        <TimecodeLabel index={0} rec>{site.hero.label}</TimecodeLabel>
        <RevealLines as="h1" immediate className="t-hero mt-6 max-w-[14ch]" lines={["We edit videos", "people actually", "finish watching."]} />
        <p className="t-body mt-8">{site.hero.sub}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={bookingUrl()} event="book_call_click" size="lg">Book a call</Button>
          <Button href="/work" variant="outline" size="lg">Watch showreel</Button>
        </div>
      </div>
    </section>
    <section aria-hidden="true" className="h-[150vh]" />
    </>
  );
}
