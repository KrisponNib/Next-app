import type { Metadata } from "next";
import IndexPage from "@/components/marketing/IndexPage";
import { ARTICLES } from "@/lib/marketing/articles";

const TITLE = "מאמרים על תופים: מדריכים למתחילים, להורים ולמתופפים | עמרי ברגר";
const DESCRIPTION =
  "מאמרים על לימוד תופים: באיזה גיל להתחיל, איך להתאמן בדירה, מקצבים ראשונים, תווים, מקלות ועוד. מאת עמרי ברגר.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", locale: "he_IL", url: "/blog", title: TITLE, description: DESCRIPTION, images: ["/marketing/lessons/stage.jpg"] },
};

const GROUPS: { title: string; slugs: string[] }[] = [
  { title: "להורים", slugs: ["what-age-to-start-drums", "is-my-child-ready", "practice-without-fights", "private-lesson-or-group", "choose-drum-teacher"] },
  {
    title: "מתחילים",
    slugs: ["first-drum-lesson", "how-to-hold-drumsticks", "drum-posture", "drum-kit-parts", "first-beats", "easy-songs-for-beginners", "beginner-mistakes", "learning-drums-as-an-adult", "how-long-to-learn-drums", "youtube-or-teacher"],
  },
  { title: "תרגול", slugs: ["how-much-to-practice", "homework-after-lesson", "practice-pad", "metronome", "practice-in-apartment", "learn-a-new-song"] },
  { title: "נגינה וטכניקה", slugs: ["what-is-groove", "drum-rudiments", "drum-fills-for-beginners", "play-faster", "hand-foot-coordination", "drum-notation-basics", "playing-in-a-band-first-time"] },
  { title: "ציוד", slugs: ["electronic-vs-acoustic-drums", "first-drum-kit", "choose-drumsticks", "protect-your-hearing"] },
];

export default function BlogIndex() {
  const used = new Set(GROUPS.flatMap((g) => g.slugs));
  const groups = GROUPS.map((g) => ({
    title: g.title,
    items: g.slugs.map((s) => {
      const a = ARTICLES.find((x) => x.slug === s)!;
      return { href: `/blog/${a.slug}`, label: a.label, note: a.lead };
    }),
  }));
  const rest = ARTICLES.filter((a) => !used.has(a.slug));
  if (rest.length) groups.push({ title: "עוד", items: rest.map((a) => ({ href: `/blog/${a.slug}`, label: a.label, note: a.lead })) });
  return (
    <IndexPage
      h1="מאמרים על תופים"
      lead="כל מה שתלמידים והורים שואלים אותי, כתוב במקום אחד."
      label="מאמרים"
      path="/blog"
      groups={groups}
    />
  );
}
