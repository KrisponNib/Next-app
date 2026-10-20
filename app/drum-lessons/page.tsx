import type { Metadata } from "next";
import IndexPage from "@/components/marketing/IndexPage";
import { SERVICES } from "@/lib/marketing/services";

const TITLE = "שיעורי תופים בתל אביב | כל סוגי השיעורים | עמרי ברגר";
const DESCRIPTION =
  "שיעורי תופים אישיים בסטודיו במרכז תל אביב: לילדים, לנוער ולמבוגרים, למתחילים ולמתקדמים. כל שיעור מוקלט.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/drum-lessons" },
  openGraph: { type: "website", locale: "he_IL", url: "/drum-lessons", title: TITLE, description: DESCRIPTION, images: ["/marketing/lessons/studio.jpg"] },
};

const pick = (slugs: string[]) =>
  slugs.map((s) => {
    const p = SERVICES.find((x) => x.slug === s)!;
    return { href: `/drum-lessons/${p.slug}`, label: p.label, note: p.lead };
  });

export default function DrumLessonsHub() {
  const grouped = new Set<string>();
  const groups = [
    {
      title: "לפי גיל",
      items: [
        { href: "/drum-lessons-for-kids", label: "שיעורי תופים לילדים", note: "מגיל 7. הילד מנגן כבר בשיעור הראשון." },
        ...pick(["drum-class-for-kids", "teens", "adults", "after-work", "back-to-drums"]),
      ],
    },
    { title: "לפי רמה", items: pick(["beginners", "advanced", "self-taught", "trial-lesson"]) },
    {
      title: "לפי מה רוצים ללמוד",
      items: pick(["songs", "rock", "groove-and-time", "technique", "beats-and-fills", "reading-notation", "band-playing", "audition-prep"]),
    },
    {
      title: "איך זה עובד אצלי",
      items: pick(["private-teacher", "lessons-for-two", "weekly-lessons", "recorded-lessons", "student-area", "studio", "drum-teacher-tel-aviv"]),
    },
  ];
  groups.forEach((g) => g.items.forEach((i) => grouped.add(i.href)));
  const rest = SERVICES.filter((s) => !grouped.has(`/drum-lessons/${s.slug}`));
  if (rest.length) groups.push({ title: "עוד", items: pick(rest.map((r) => r.slug)) });
  return (
    <IndexPage
      h1="שיעורי תופים בתל אביב"
      lead="שיעורים אישיים, פנים אל פנים, בסטודיו בדרויאנוב 5. בחרו מה מתאים לכם."
      label="שיעורי תופים"
      path="/drum-lessons"
      intro={[
        "אני עמרי ברגר, מתופף 11 שנה ומלמד תופים 3 שנים. אני מלמד ילדים מגיל 7, נוער ומבוגרים, מתחילים ומתקדמים.",
        "כל שיעור מוקלט, ולכל תלמיד יש אזור אישי עם מה לתרגל בבית.",
      ]}
      groups={groups}
    />
  );
}
