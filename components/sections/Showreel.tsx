import ShowreelPlayer from "../video/ShowreelPlayer";
import TimecodeLabel from "../type/TimecodeLabel";
import MediaReveal from "../ui/MediaReveal";

export default function Showreel({ index }: { index: number }) {
  return (
    <section aria-label="Showreel" className="wrap pt-8 pb-[var(--section-y)]">
      <TimecodeLabel index={index} className="mb-6">Showreel</TimecodeLabel>
      <MediaReveal>
        <ShowreelPlayer />
      </MediaReveal>
    </section>
  );
}
