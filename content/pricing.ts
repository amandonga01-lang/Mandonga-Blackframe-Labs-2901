// Prices. The package grid only appears once at least one `price` is filled in.
// Until then /pricing explains how pricing works (content/copy.ts → pricingModels).
// The inclusions below are a DRAFT: confirm them before adding prices.

export type Package = {
  name: string;
  price: string; // e.g. "$1,500"
  per: string; // e.g. "/ month"
  for: string;
  includes: string[];
  turnaround: string;
  revisions: string;
};

export const packages: Package[] = [
  {
    name: "Starter",
    price: "",
    per: "/ month",
    for: "One channel, a steady weekly rhythm.",
    includes: ["8 short-form videos a month", "Captions and sound design", "One dedicated editor"],
    turnaround: "24–48 h per video",
    revisions: "2 rounds per video",
  },
  {
    name: "Growth",
    price: "",
    per: "/ month",
    for: "Podcast or talking-head content plus ads.",
    includes: ["1 full podcast episode a week", "Clips cut from every episode", "Meta ad batch with hook variations", "Thumbnails"],
    turnaround: "Clips in 24–48 h",
    revisions: "3 rounds per video",
  },
  {
    name: "Partner",
    price: "",
    per: "/ month",
    for: "An editing team that works like an in-house one.",
    includes: ["Dedicated editors on your account", "Long-form, short-form and ads", "Shared Slack or WhatsApp channel", "Monthly creative review"],
    turnaround: "Agreed with you",
    revisions: "Unlimited within scope",
  },
];
