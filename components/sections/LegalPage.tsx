import PageHead from "./PageHead";

/** Legal page shell. Content is a clearly marked placeholder until reviewed by a lawyer. */
export default function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHead label="Legal" lines={[title]} />
      <section className="wrap pb-[var(--section-y)]">
        <p className="t-mono mb-12 inline-block rounded-full border border-signal px-4 py-2 text-signal">Placeholder text — have this reviewed before launch</p>
        <div className="max-w-[62ch] flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="t-h3">{s.h}</h2>
              <p className="t-body mt-3">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
