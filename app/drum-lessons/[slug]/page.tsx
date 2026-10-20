import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage from "@/components/marketing/ContentPage";
import { SERVICES } from "@/lib/marketing/services";
import { serviceLinks } from "@/lib/marketing/links";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = SERVICES.find((s) => s.slug === params.slug);
  if (!page) return {};
  const path = `/drum-lessons/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "he_IL",
      url: path,
      siteName: "עמרי ברגר - מורה לתופים",
      title: page.title,
      description: page.description,
      images: [page.image?.src ?? "/marketing/lessons/stage.jpg"],
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const page = SERVICES.find((s) => s.slug === params.slug);
  if (!page) notFound();
  return (
    <ContentPage
      page={page}
      path={`/drum-lessons/${page.slug}`}
      kind="service"
      crumbs={[
        { name: "דף הבית", href: "/" },
        { name: "שיעורי תופים", href: "/drum-lessons" },
      ]}
      related={serviceLinks(page.related)}
    />
  );
}
