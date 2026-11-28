import SectionHead from "./SectionHead";
import Accordion from "../ui/Accordion";

export default function Faq({ index, items, title = ["Questions."] }: { index: number; items: { q: string; a: string }[]; title?: string[] }) {
  if (!items.length) return null;
  return (
    <section className="wrap section">
      <div className="grid-12 gap-y-12">
        <SectionHead index={index} label="FAQ" lines={title} className="col-span-12 md:col-span-4" />
        <div className="col-span-12 md:col-start-6 md:col-span-7">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
