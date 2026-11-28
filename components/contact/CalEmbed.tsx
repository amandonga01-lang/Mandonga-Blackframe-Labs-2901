import { site, whatsappLink } from "@/content/site";

/** Inline Cal.com booking (or Calendly) via NEXT_PUBLIC_CAL_LINK. Without a link it offers email + WhatsApp instead. */
export default function CalEmbed() {
  const link = site.bookingLink;
  if (!link) {
    return (
      <div className="rounded-xl border border-muted p-8 md:p-12 flex flex-col gap-6">
        <p className="t-mono text-text-3">Talk to an editor</p>
        <p className="t-h3">Message us directly and the person who&apos;ll edit your videos replies, usually the same day.</p>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${site.email}?subject=Intro%20call`} className="t-mono rounded-full border border-muted px-5 py-3 hover:border-text">{site.email}</a>
          <a href={whatsappLink("Hi, I'd like to book an intro call.")} target="_blank" rel="noopener noreferrer" className="t-mono rounded-full border border-muted px-5 py-3 hover:border-text">WhatsApp {site.whatsapp.display}</a>
        </div>
      </div>
    );
  }
  const url = link.startsWith("http") ? link : `https://cal.com/${link}`;
  const src = url.includes("calendly.com") ? `${url}?hide_gdpr_banner=1&background_color=161316&text_color=ffffff&primary_color=fe2e4b` : `${url}?embed=true&theme=dark&layout=month_view`;
  return (
    <div className="overflow-hidden rounded-xl border border-muted bg-surface">
      <iframe src={src} title="Book a call with BlackFrameLabs" className="h-[720px] w-full" loading="lazy" />
    </div>
  );
}
