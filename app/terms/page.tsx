import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms", robots: { index: false }, alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <LegalPage
      title="Terms."
      sections={[
        { h: "Scope", p: "Each project or retainer is agreed in writing before work starts: deliverables, turnaround, revisions and price." },
        { h: "Ownership", p: "You own the final videos once paid. We may show work in our portfolio unless you ask us not to." },
        { h: "Payment", p: "Terms are set in your proposal or invoice." },
        { h: "Contact", p: `${site.legalName}, ${site.email}.` },
      ]}
    />
  );
}
