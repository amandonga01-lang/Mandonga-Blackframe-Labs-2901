import { JOBS_EMAIL, SOCIALS, STUDIO_EMAIL, WHATSAPP_DISPLAY, whatsappLink } from "../lib/site";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark size="lg" />
          <p className="mt-4 max-w-xs text-dim">
            A four-person edit studio in India. We cut podcasts, talking heads, short-form and Meta ads for founders, creators and brands in the US, UK and beyond.
          </p>
        </div>

        <FooterCol title="Site">
          <a href="#/work">Work</a>
          <a href="#/services">Services</a>
          <a href="#/studio">Studio</a>
          <a href="#/careers">Careers</a>
        </FooterCol>

        <FooterCol title="Talk to us">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
          <a href={`mailto:${JOBS_EMAIL}`}>{JOBS_EMAIL} (jobs)</a>
        </FooterCol>

        {SOCIALS.length > 0 && (
          <FooterCol title="Elsewhere">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </FooterCol>
        )}
      </div>
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-5 border-t border-rule flex flex-wrap justify-between gap-2 tc text-dim">
        <span>© {new Date().getFullYear()} Blackframe Labs Pvt Ltd</span>
        <span>00:00:00:00 / end of reel</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 [&_a]:text-bone [&_a:hover]:text-tally [&_a]:w-fit">
      <h2 className="tc uppercase text-dim mb-1">{title}</h2>
      {children}
    </div>
  );
}
