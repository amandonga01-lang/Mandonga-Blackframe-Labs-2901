import { site } from "@/content/site";
import type { PortfolioItem } from "@/content/portfolio";

export const abs = (path: string) => new URL(path, site.url).toString();

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  logo: abs("/Gold_BLACKFRAME_labs_logo.png"),
  sameAs: site.socials.map((s) => s.href),
});

export const serviceLd = (name: string, description: string, slug: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: { "@type": "Organization", name: site.name, url: site.url },
  url: abs(`/services/${slug}`),
});

const isoDuration = (d?: string) => {
  if (!d) return undefined;
  const [m, s] = d.split(":").map(Number);
  return `PT${m}M${s}S`;
};

/** VideoObject requires a real uploadDate, so only items with a `published` date are emitted. */
export const videoLd = (items: PortfolioItem[]) =>
  items.filter((v) => v.published).map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.client ? `${v.title} — ${v.client}` : v.title,
    description: v.description ?? `${v.title}, edited by ${site.name}.`,
    thumbnailUrl: abs(v.poster),
    contentUrl: v.fullSrc.startsWith("http") ? v.fullSrc : abs(v.fullSrc),
    uploadDate: v.published,
    duration: isoDuration(v.duration),
  }));

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
