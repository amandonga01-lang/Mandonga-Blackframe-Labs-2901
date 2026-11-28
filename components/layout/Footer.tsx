import Link from "next/link";
import Logo from "./Logo";
import { NAV } from "./nav-links";
import { services } from "@/content/services";
import { site, whatsappLink } from "@/content/site";
import LocalTime from "./LocalTime";
import { publishedCaseStudies } from "@/content/case-studies";

export default function Footer() {
  return (
    <footer className="border-t border-muted/60 mt-0">
      <div className="wrap grid-12 gap-y-12 py-20">
        <div className="col-span-12 md:col-span-4 flex flex-col gap-5">
          <Logo />
          <p className="t-body text-[16px] max-w-[34ch]">
            {site.blurb}
          </p>
          <p className="t-mono text-text-3">
            <LocalTime /> · {site.timezoneLabel}
          </p>
        </div>
        <FooterCol title="Studio" className="col-span-6 md:col-span-2">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
          {publishedCaseStudies().length > 0 && <Link href="/case-studies">Case studies</Link>}
          <Link href="/contact">Contact</Link>
        </FooterCol>
        <FooterCol title="Services" className="col-span-6 md:col-span-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>
          ))}
          <Link href="/services/more">More services</Link>
        </FooterCol>
        <FooterCol title="Contact" className="col-span-12 md:col-span-3">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp {site.whatsapp.display}</a>
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
        </FooterCol>
      </div>
      <div className="wrap flex flex-wrap items-center justify-between gap-4 border-t border-muted/60 py-6 t-mono text-text-3">
        <span>© {new Date().getFullYear()} {site.legalName}</span>
        <span className="flex gap-6">
          <Link href="/privacy" className="hover:text-text">Privacy</Link>
          <Link href="/terms" className="hover:text-text">Terms</Link>
        </span>
        <span className="flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-muted" />End of reel</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className: string; children: React.ReactNode }) {
  return (
    <div className={`${className} flex flex-col gap-3 text-[15px] [&_a]:w-fit [&_a]:text-text-2 [&_a:hover]:text-text [&_a]:transition-colors`}>
      <h2 className="t-mono text-text-3 mb-1">{title}</h2>
      {children}
    </div>
  );
}
