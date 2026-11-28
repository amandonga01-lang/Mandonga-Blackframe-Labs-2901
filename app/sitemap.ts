import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { publishedCaseStudies } from "@/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "", "/work", "/services", ...services.map((s) => `/services/${s.slug}`), "/services/more",
    ...(publishedCaseStudies().length ? ["/case-studies", ...publishedCaseStudies().map((c) => `/case-studies/${c.slug}`)] : []),
    "/process", "/about", "/pricing", "/contact",
  ];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "monthly", priority: p === "" ? 1 : p === "/work" ? 0.9 : 0.7 }));
}
