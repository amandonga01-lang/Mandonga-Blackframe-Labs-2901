import SectionHead from "./SectionHead";
import Reveal from "../type/Reveal";
import Rich from "../type/Rich";
import { aiHuman } from "@/content/copy";


/** The differentiator: AI for speed, editors for judgement. Given room, not a badge. */
export default function AiHuman({ index }: { index: number }) {
  return (
    <section className="wrap section">
      <div className="grid-12 gap-y-16">
        <SectionHead index={index} label="AI + human" lines={["AI does the groundwork.", "**Editors make the calls.**"]} className="col-span-12 md:col-span-6" />
        <div className="col-span-12 md:col-start-8 md:col-span-5 flex flex-col justify-end gap-12">
          <Reveal>
            <p className="t-body"><Rich text={aiHuman.intro} /></p>
          </Reveal>
          <div className="grid grid-cols-2 gap-[var(--gutter)]">
            <Reveal>
              <h3 className="t-mono text-text-3">AI</h3>
              <ul className="mt-4 flex flex-col gap-3 text-text-2 text-[16px]">{aiHuman.ai.map((a) => <li key={a} className="border-t border-muted/60 pt-3">{a}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="t-mono text-text">Editor</h3>
              <ul className="mt-4 flex flex-col gap-3 text-[16px]">{aiHuman.editor.map((a) => <li key={a} className="border-t border-text/40 pt-3">{a}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
