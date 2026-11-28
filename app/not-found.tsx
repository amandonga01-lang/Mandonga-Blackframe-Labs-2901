import Link from "next/link";
import TimecodeLabel from "@/components/type/TimecodeLabel";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden min-h-[90svh] flex items-end">
      <div className="wrap w-full pb-24 pt-40">
        <TimecodeLabel index={4}>Frame not found</TimecodeLabel>
        <h1 className="t-hero mt-6">This frame was <strong>cut.</strong></h1>
        <p className="t-body mt-8">The page you're looking for isn't in the edit anymore.</p>
        <div className="mt-10 flex flex-wrap gap-6 t-mono">
          <Link href="/" className="text-text hover:text-signal">Home →</Link>
          <Link href="/work" className="text-text-2 hover:text-text">The work →</Link>
          <Link href="/contact" className="text-text-2 hover:text-text">Contact →</Link>
        </div>
      </div>
    </section>
  );
}
