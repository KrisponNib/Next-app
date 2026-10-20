import type { Metadata } from "next";
import ContentPage from "@/components/marketing/ContentPage";
import type { MarketingPage } from "@/lib/marketing/types";
import { serviceLinks } from "@/lib/marketing/links";

const page: MarketingPage = {
  slug: "faq",
  label: "שאלות ותשובות",
  title: "שאלות ותשובות על שיעורי תופים | עמרי ברגר",
  description: "כל מה ששואלים לפני שמתחילים שיעורי תופים אצל עמרי ברגר בתל אביב: גיל, ציוד, תווים, משך שיעור ועוד.",
  h1: "שאלות ותשובות",
  lead: "השאלות שהכי הרבה אנשים שואלים אותי לפני השיעור הראשון.",
  blocks: [
    {
      h2: "לא מצאתם תשובה?",
      p: ["שלחו לי הודעה בוואטסאפ, ואענה. אפשר גם פשוט לבוא לשיעור ניסיון ולשאול שם."],
    },
  ],
  faq: [
    { q: "צריך לדעת משהו על מוזיקה לפני?", a: "לא. לא צריך לדעת כלום לפני שמגיעים לשיעור הראשון." },
    { q: "מאיזה גיל אפשר ללמוד?", a: "ילדים מגיל 7. למבוגרים אין גיל עליון." },
    { q: "צריך תופים בבית?", a: "לא. בסטודיו יש מערכת מקצועית, אוזניות וכל מה שצריך. בבית אפשר להתחיל עם פד אימון." },
    { q: "צריך לקרוא תווים?", a: "לא. את התווים לומדים לאט, תוך כדי נגינה." },
    { q: "כמה זמן נמשך שיעור?", a: "שיעור רגיל נמשך 55 דקות. שיעור הניסיון נמשך 40 דקות." },
    { q: "איפה השיעורים?", a: "בסטודיו ברחוב דרויאנוב 5, במרכז תל אביב." },
    { q: "יש שיעורים באינטרנט?", a: "לא. כל השיעורים פנים אל פנים בסטודיו." },
    { q: "השיעורים מוקלטים?", a: "כן. כל שיעור מוקלט, ובדרך הביתה כבר יש לכם סרטון." },
    { q: "מה זה האזור האישי?", a: "מקום בטלפון שבו מחכים שיעורי הבית, התווים, השירים, שאלות כשנתקעים, ואזור ההישגים." },
    { q: "אפשר ללמוד בזוג?", a: "כן, יש שיעור זוגי לשניים." },
    { q: "איך קובעים?", a: "לוחצים על הכפתור, שולחים הודעה בוואטסאפ, ומוצאים זמן שמתאים." },
  ],
};

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/faq" },
  openGraph: { type: "website", locale: "he_IL", url: "/faq", title: page.title, description: page.description, images: ["/marketing/lessons/studio.jpg"] },
};

export default function FaqPage() {
  return (
    <ContentPage
      page={page}
      path="/faq"
      kind="page"
      crumbs={[{ name: "דף הבית", href: "/" }]}
      related={serviceLinks(["trial-lesson", "beginners", "adults", "teens"])}
    />
  );
}
