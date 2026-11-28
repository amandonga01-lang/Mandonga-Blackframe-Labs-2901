import SectionHead from "./SectionHead";
import Reveal from "../type/Reveal";

const AI = ["Rough selects and transcripts", "Captions and translations", "B-roll and generated scenes", "Upscaling and clean-up"];
const HUMAN = ["Which take, which line, which second", "Pacing and where the cut lands", "Story, hook and ending", "The final pass on every video"];

/** The differentiator: AI for speed, editors for judgement. Given room, not a badge. */
export default function AiHuman({ index }: { index: number }) {
  return (
    <section className="wrap section">
      <div className="grid-12 gap-y-16">
        <SectionHead index={index} label="AI + human" lines={["AI does the groundwork.", "**Editors make the calls.**"]} className="col-span-12 md:col-span-6" />
        <div className="col-span-12 md:col-start-8 md:col-span-5 flex flex-col justify-end gap-12">
          <Reveal>
            <p className="t-body">
              We use AI to move faster: <strong>more versions, quicker first cuts, lower cost per video.</strong> But AI doesn&apos;t know your audience. Every
              edit is <strong>finished by an experienced editor</strong> who decides what stays in.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-[var(--gutter)]">
            <Reveal>
              <h3 className="t-mono text-text-3">AI</h3>
              <ul className="mt-4 flex flex-col gap-3 text-text-2 text-[16px]">{AI.map((a) => <li key={a} className="border-t border-muted/60 pt-3">{a}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="t-mono text-text">Editor</h3>
              <ul className="mt-4 flex flex-col gap-3 text-[16px]">{HUMAN.map((a) => <li key={a} className="border-t border-text/40 pt-3">{a}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
