import { JOBS_EMAIL } from "../lib/site";
import { Spotlight, WordReveal } from "../components/motion";

export default function Careers() {
  return (
    <section className="relative overflow-hidden mx-auto max-w-[1400px] px-4 md:px-8 pt-12 md:pt-16 pb-24">
        <Spotlight />
      <WordReveal lines={["Careers"]} className="display text-[22vw] md:text-[11rem]" />
      <div className="mt-8 grid gap-10 md:grid-cols-2 max-w-5xl">
        <div className="text-lg text-bone/90 leading-relaxed">
          <p>We're four people, so we don't post job ads. When work picks up, we bring in freelance editors and motion designers, and the good ones stay.</p>
          <p className="mt-4">If you can cut a hook that holds, we want to see it.</p>
        </div>
        <div className="border border-rule bg-panel p-6">
          <h2 className="display text-4xl">How to apply</h2>
          <ol className="mt-4 flex flex-col gap-3 text-dim">
            <li><span className="text-tally mr-2">01</span>Send a link to 3 pieces you edited. Short-form or ads beat showreels.</li>
            <li><span className="text-tally mr-2">02</span>Tell us what you'd change in one of ours.</li>
            <li><span className="text-tally mr-2">03</span>Say what software you use and your time zone.</li>
          </ol>
          <a
            href={`mailto:${JOBS_EMAIL}?subject=${encodeURIComponent("Editor application")}`}
            className="mt-6 inline-block bg-tally text-ink px-5 py-3 font-semibold hover:bg-bone"
          >
            Email {JOBS_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
