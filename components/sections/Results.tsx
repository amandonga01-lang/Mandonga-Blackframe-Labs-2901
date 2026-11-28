import Stat from "../ui/Stat";
import TimecodeLabel from "../type/TimecodeLabel";
import { site } from "@/content/site";

/** Only real numbers. Hidden unless at least two stats have values. */
export const hasResults = () => site.stats.filter((s) => s.value).length >= 2;

export default function Results({ index }: { index: number }) {
  const stats = site.stats.filter((s) => s.value);
  if (stats.length < 2) return null;
  return (
    <section className="wrap section">
      <TimecodeLabel index={index}>Results</TimecodeLabel>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-[var(--gutter)]">
        {stats.map((s) => <Stat key={s.label} {...s} />)}
      </div>
    </section>
  );
}
