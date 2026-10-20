import type { Metadata } from "next";
import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata: Metadata = {
  title: "הדף לא נמצא | עמרי ברגר - שיעורי תופים בתל אביב",
  robots: { index: false },
};

const LINKS = [
  { href: "/", label: "דף הבית" },
  { href: "/drum-lessons", label: "כל סוגי השיעורים" },
  { href: "/drum-lessons-for-kids", label: "שיעורי תופים לילדים" },
  { href: "/drum-lessons/adults", label: "שיעורי תופים למבוגרים" },
  { href: "/drum-lessons/trial-lesson", label: "שיעור ניסיון" },
  { href: "/blog", label: "מאמרים על תופים" },
];

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="mk-hero wrap" aria-labelledby="page-title">
        <div className="mk-hero-copy">
          <h1 id="page-title">אופס, הדף הזה לא קיים</h1>
          <p className="mk-lead">אולי הקישור השתנה. הנה כמה מקומות טובים להמשיך מהם:</p>
        </div>
      </section>
      <div className="mk-index wrap">
        <ul className="mk-cards">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </MarketingShell>
  );
}
