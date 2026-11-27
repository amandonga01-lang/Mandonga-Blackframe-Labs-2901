// Everything a non-developer may want to change lives here.

export const STUDIO_EMAIL = "hello@blackframelab.com";
export const JOBS_EMAIL = "join@blackframelab.com";
export const WHATSAPP_NUMBER = "919428614172"; // country code + number, digits only
export const WHATSAPP_DISPLAY = "+91 94286 14172";
export const whatsappLink = (text = "Hi Blackframe, I have a video project.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/** Paste a Cal.com / Calendly link to show a "Book a call" button. */
export const CALENDAR_URL = "";

/** Starting prices shown on the Services page, e.g. "From $150 per video". Leave empty to show "Quoted after we see the footage". */
export const PRICES = {
  project: "",
  retainer: "",
  dedicated: "",
};

/** Social profiles. Only entries with a URL are shown. */
export const SOCIALS: { label: string; href: string }[] = [
  { label: "Instagram", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "YouTube", href: "" },
].filter((s) => s.href);

export interface Person {
  name: string;
  role: string;
  does: string;
  photo?: string; // add e.g. photo: "/team/het.jpg" once the file is in public/team
}

export const TEAM: Person[] = [
  { name: "Aman Donga", role: "Co-founder, CEO", does: "Your first call. Scopes the job, sets the schedule, makes sure files land on time." },
  { name: "Het Vaghasiya", role: "Co-founder, creative director", does: "Owns the look and the pacing. Cuts the AI UGC ads and the hardest hooks." },
  { name: "Harsh Parmar", role: "Senior editor", does: "Long-form, podcasts, colour and the final mix." },
  { name: "Jimit Ramani", role: "Editor", does: "Vertical edits, captions and the small motion details." },
];

/** Real client quotes only, with permission. The section stays hidden while this is empty. */
export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  { q: "How fast is a first cut?", a: "Most short-form edits come back within 24 to 48 hours of us having the footage and the brief. Longer pieces depend on length. We give you a date before we start." },
  { q: "How do I send footage?", a: "A Google Drive, Dropbox or Frame.io link is perfect. Add references you like and any brand notes; we'll ask if something's missing." },
  { q: "What do you edit in?", a: "Premiere Pro and After Effects, with Audition for audio cleanup. If your team needs project files, ask up front." },
  { q: "Do you handle sound?", a: "Yes. Dialogue cleanup, music selection, sound effects and the final mix are part of the edit." },
  { q: "You're in India. Does the time zone hurt?", a: "Usually it helps. We work IST, so footage you send at the end of a US or UK day is being cut while you sleep." },
];
