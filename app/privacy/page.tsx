import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy policy", robots: { index: false }, alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy."
      sections={[
        { h: "What we collect", p: "What you send through the contact form (name, email, company, website, project details) and basic, cookie-free analytics about page visits." },
        { h: "How we use it", p: "Only to reply to you and run our projects. We don't sell or share your details." },
        { h: "Your footage", p: "Footage and files you share stay confidential and are used only for your project." },
        { h: "Contact", p: `Questions or deletion requests: ${site.email}.` },
      ]}
    />
  );
}
