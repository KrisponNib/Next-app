import type { Metadata } from "next";
import ContentPage from "@/components/marketing/ContentPage";
import type { MarketingPage } from "@/lib/marketing/types";
import { serviceLinks } from "@/lib/marketing/links";

const page: MarketingPage = {
  slug: "about",
  label: "על עמרי",
  title: "עמרי ברגר, מורה לתופים בתל אביב | אודות",
  description: "עמרי ברגר, מתופף 11 שנה ומורה לתופים בסטודיו במרכז תל אביב. ממי למד, איפה הוא מנגן, ואיך הוא מלמד.",
  h1: "נעים להכיר, עמרי ברגר",
  lead: "אני מתופף כבר 11 שנה, מלמד תופים 3 שנים, ומנגן בהופעות עם להקת Arctic Kartiv.",
  image: { src: "/marketing/lessons/stage.jpg", alt: "עמרי ברגר מתופף על הבמה" },
  blocks: [
    {
      h2: "הדרך שלי בתופים",
      p: [
        "רוב הדרך שלי בתופים נראתה הרבה פחות זוהרת מהבמה: שעות של אימונים, שירים שלא הצלחתי לנגן, דברים שנתקעתי עליהם שבועות, והרגע הכיפי הזה שמשהו פתאום מצליח.",
        "במהלך השנים למדתי אצל Tom Bollig, איתמר ויינשטיין, שי זלמן, שחר אדרי ועופרי נחמיה. מכל אחד מהם לקחתי משהו אחר על נגינה, מוזיקה, אימון ולמידה.",
      ],
    },
    {
      h2: "איך אני מלמד",
      p: [
        "אני רוצה שתצאו מהשיעורים עם יותר מוזיקה בחיים: שתשמעו שירים אחרת, שתתלהבו כשמשהו סוף סוף יושב, ושתנגנו עם אנשים.",
        "לכן מתחילים מהשירים שאתם אוהבים. כל שיעור מוקלט, ולכל תלמיד יש אזור אישי עם שיעורי הבית, התווים והשירים, ואזור הישגים.",
      ],
    },
    {
      h2: "קצת מספרים",
      list: ["3 שנות ניסיון בהוראה", "עשרות תלמידים ותלמידות", "מאות שעות של שיעורי תופים"],
    },
    {
      h2: "איפה",
      p: ["בסטודיו שלי ברחוב דרויאנוב 5, במרכז תל אביב. כל השיעורים פנים אל פנים."],
    },
  ],
};

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", locale: "he_IL", url: "/about", title: page.title, description: page.description, images: [page.image!.src] },
};

export default function AboutPage() {
  return (
    <ContentPage
      page={page}
      path="/about"
      kind="page"
      crumbs={[{ name: "דף הבית", href: "/" }]}
      related={serviceLinks(["trial-lesson", "private-teacher", "studio", "band-playing"])}
    />
  );
}
