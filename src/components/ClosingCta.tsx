import { CALENDAR_URL, STUDIO_EMAIL, whatsappLink } from "../lib/site";

export default function ClosingCta({ title = "Send us one video." }: { title?: string }) {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-20 md:py-32">
        <p className="tc text-tally uppercase">Your move</p>
        <h2 className="display text-[18vw] md:text-[10rem] mt-3">{title}</h2>
        <p className="mt-6 max-w-xl text-lg text-bone/90">
          Share one piece of raw footage and what it needs to do. We'll tell you how we'd cut it, what it costs and when you'd have it. No deck, no call
          required.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#/contact" className="bg-tally text-ink px-6 py-4 font-semibold text-lg hover:bg-bone transition-colors">
            Send footage
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="border border-rule px-6 py-4 font-semibold text-lg hover:border-bone">
            WhatsApp us
          </a>
          {CALENDAR_URL && (
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="border border-rule px-6 py-4 font-semibold text-lg hover:border-bone">
              Book 15 minutes
            </a>
          )}
        </div>
        <p className="mt-6 tc text-dim">
          or <a href={`mailto:${STUDIO_EMAIL}`} className="text-bone hover:text-tally">{STUDIO_EMAIL}</a>
        </p>
      </div>
    </section>
  );
}
