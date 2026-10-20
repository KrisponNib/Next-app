import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/marketing/ContentPage";
import { ARTICLES } from "@/lib/marketing/articles";
import { articleLinks } from "@/lib/marketing/links";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = ARTICLES.find((a) => a.slug === params.slug);
  if (!page) return {};
  const path = `/blog/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "he_IL",
      url: path,
      siteName: "עמרי ברגר - מורה לתופים",
      title: page.title,
      description: page.description,
      images: ["/marketing/lessons/stage.jpg"],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const page = ARTICLES.find((a) => a.slug === params.slug);
  if (!page) notFound();
  return (
    <ContentPage
      page={page}
      path={`/blog/${page.slug}`}
      kind="article"
      crumbs={[
        { name: "דף הבית", href: "/" },
        { name: "מאמרים", href: "/blog" },
      ]}
      related={[...articleLinks(page.related), { href: "/drum-lessons/trial-lesson", label: "שיעור ניסיון בתופים" }]}
    />
  );
}
