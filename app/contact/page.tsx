import type { Metadata } from "next";
import PageHead from "@/components/sections/PageHead";
import SectionHead from "@/components/sections/SectionHead";
import CalEmbed from "@/components/contact/CalEmbed";
import QualifyForm from "@/components/contact/QualifyForm";
import { site, whatsappLink } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: "Book a call or send a short brief. We reply within 24 hours.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <>
      <PageHead label="Contact" lines={["Book a **call.**"]} intro="Fifteen minutes to see if we're a fit. Or send a short brief below and we'll reply within 24 hours." />
      <section className="wrap pb-[var(--section-y)]">
        <CalEmbed />
      </section>
      <section className="wrap section pt-0">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <SectionHead index={1} label="Or write to us" lines={["Send a **brief.**"]} size="t-h2" />
            <div className="mt-10 flex flex-col gap-3 t-mono text-text-2">
              <a href={`mailto:${site.email}`} className="hover:text-text">{site.email}</a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-text">WhatsApp {site.whatsapp.display}</a>
              <span className="text-text-3">{site.timezoneLabel}</span>
            </div>
          </div>
          <div className="col-span-12 md:col-start-6 md:col-span-7 relative">
            <QualifyForm />
          </div>
        </div>
      </section>
    </>
  );
}
