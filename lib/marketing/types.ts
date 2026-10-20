export type Block = { h2: string; p?: string[]; list?: string[] };

export type QA = { q: string; a: string };

export type MarketingPage = {
  slug: string;
  // Short label for menus and link cards
  label: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  image?: { src: string; alt: string };
  blocks: Block[];
  faq?: QA[];
  related?: string[];
};
