import { SERVICES } from "./services";
import { ARTICLES } from "./articles";
import type { LinkCard } from "@/components/marketing/ContentPage";

export function serviceLinks(slugs: string[] = []): LinkCard[] {
  return slugs
    .map((s) => SERVICES.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map((x) => ({ href: `/drum-lessons/${x.slug}`, label: x.label }));
}

export function articleLinks(slugs: string[] = []): LinkCard[] {
  return slugs
    .map((s) => ARTICLES.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map((x) => ({ href: `/blog/${x.slug}`, label: x.label }));
}
