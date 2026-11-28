import TimecodeLabel from "../type/TimecodeLabel";
import RevealLines from "../type/RevealLines";

/** Standard inner-page header: timecode label, big headline, optional intro on the right. */
export default function PageHead({ label, lines, intro }: { label: string; lines: string[]; intro?: string }) {
  return (
    <section className="wrap pt-36 md:pt-44 pb-16 md:pb-24">
      <TimecodeLabel index={0}>{label}</TimecodeLabel>
      <div className="grid-12 mt-6 items-end gap-y-6">
        <RevealLines as="h1" immediate className="t-h1 col-span-12 md:col-span-8" lines={lines} />
        {intro && <p className="t-body col-span-12 md:col-span-4">{intro}</p>}
      </div>
    </section>
  );
}
