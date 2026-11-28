// Agency details. Edit freely; components read everything from here.

export const site = {
  name: "BlackFrameLabs",
  legalName: "Blackframe Labs Pvt Ltd",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://blackframelab.com",
  description:
    "Video editing studio for founders, SaaS teams, creators, podcasters and brands running Meta ads. Podcasts, talking heads, SaaS films and UGC ads, finished by experienced editors.",
  email: "hello@blackframelab.com",
  jobsEmail: "join@blackframelab.com",
  whatsapp: { number: "919428614172", display: "+91 94286 14172" },
  location: "India",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST (UTC+5:30)",

  /** Cal.com / Calendly link. Set NEXT_PUBLIC_CAL_LINK in Vercel, e.g. "blackframelabs/intro" or a full URL. */
  bookingLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",

  /** Nav badge with the red REC dot. Leave empty to hide it. Keep it true. */
  availability: "", // e.g. "Available for 2 new clients this month"

  /** Hero copy. */
  hero: {
    label: "VIDEO EDITING STUDIO",
    /** Headline lines. Wrap words in **double stars** for Bold. */
    lines: ["We edit videos", "**people actually finish**", "watching."],
    headline: "We edit videos people actually finish watching.",
    sub: "For **founders, SaaS teams, creators, podcasters** and brands running **Meta ads**. First cuts in **24 to 48 hours**, finished by experienced editors.",
  },

  socials: [
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "YouTube", href: "" },
    { label: "X", href: "" },
  ].filter((s) => s.href),

  /** Client names for the marquee. Add `logo: "/logos/name.svg"` once you have monochrome logo files. */
  clients: [
    { name: "The Caravan Podcast" },
    { name: "Superintelligence" },
    { name: "Base360" },
    { name: "Randall Shaw" },
    { name: "Cerca" },
    { name: "Perception Studios" },
    { name: "Robinsons Roofing" },
    { name: "Neel Patel" },
  ] as { name: string; logo?: string }[],

  /**
   * Results section. ONLY real numbers. Any stat with an empty value is hidden,
   * and the whole section hides if fewer than 2 are filled in.
   */
  stats: [
    { value: "", suffix: "M+", label: "Views generated for clients" },
    { value: "", suffix: "+", label: "Videos delivered" },
    { value: "24–48", suffix: "h", label: "To a first cut on most short-form" },
    { value: "", suffix: "%", label: "Clients still with us after 6 months" },
  ],

  /** One line used in the footer and About intro. */
  blurb: "A four-person studio in India. Podcasts, talking heads, SaaS films and Meta ads, edited by the people you talk to.",

  team: [
    { name: "Aman Donga", role: "Co-founder, CEO", photo: "" },
    { name: "Het Vaghasiya", role: "Co-founder, creative director", photo: "" },
    { name: "Harsh Parmar", role: "Senior editor", photo: "" },
    { name: "Jimit Ramani", role: "Editor", photo: "" },
  ],
};

export const whatsappLink = (text = "Hi BlackFrameLabs, I have a video project.") =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(text)}`;

export const bookingUrl = () => {
  const l = site.bookingLink;
  if (!l) return "/contact";
  return l.startsWith("http") ? l : `https://cal.com/${l}`;
};
