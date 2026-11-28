// Case studies. A case study is only listed when `published: true`.
// Drafts below are built from real work; fill in the TODOs with real facts before publishing.

export type CaseStudy = {
  slug: string;
  published: boolean;
  client: string;
  title: string;
  heroSlug: string; // portfolio slug for the hero video
  overview: string;
  challenge: string;
  approach: string[];
  beforeSrc?: string; // raw footage
  afterSrc?: string; // final edit of the same moment
  deliverables: string[]; // portfolio slugs
  results: { label: string; value: string }[]; // real numbers only
  quote?: { text: string; name: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "base360-founder-film",
    published: false,
    client: "Base360",
    title: "A founder film for an AI-run rental company",
    heroSlug: "base360",
    overview: "A 2:40 founder-led film explaining how Base360 runs a short-term rental business on AI.",
    challenge: "TODO: what Base360 needed and why.",
    approach: ["Founder on camera as the spine of the story", "UI walkthroughs animated over the narration", "Motion captions for sound-off viewing"],
    deliverables: ["base360"],
    results: [],
  },
  {
    slug: "the-caravan-podcast",
    published: false,
    client: "The Caravan Podcast",
    title: "Full episodes and clips for The Caravan",
    heroSlug: "caravan-new-york",
    overview: "Episode edits, event recaps and promos for The Caravan Podcast.",
    challenge: "TODO",
    approach: ["Multicam episode edits", "Clips cut from every episode", "Event recap and promo edits"],
    deliverables: ["caravan-new-york", "caravan-open-recap", "caravan-ad"],
    results: [],
  },
];

export const publishedCaseStudies = () => caseStudies.filter((c) => c.published);
