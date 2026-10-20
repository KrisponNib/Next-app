/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { MarketingFooter } from "@/components/marketing/MarketingShell";
import LessonsBehavior from "../LessonsBehavior";
import "../lessons.css";
import "../lesson-art.css";
import "./kids.css";

const TITLE = "שיעורי תופים לילדים בתל אביב | מגיל 7 | עמרי ברגר";
const DESCRIPTION =
  "שיעורי תופים לילדים מגיל 7 בסטודיו במרכז תל אביב. כל שיעור מוקלט, ולכל ילד יש אזור אישי עם מה לתרגל בבית. בואו לשיעור ניסיון.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/drum-lessons-for-kids" },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "/drum-lessons-for-kids",
    siteName: "עמרי ברגר - מורה לתופים",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/marketing/lessons/studio.jpg"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "מאיזה גיל אפשר להתחיל?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "מגיל 7. אם הילד מתופף על כל שולחן בבית, זה סימן טוב שהוא מוכן."
      }
    },
    {
      "@type": "Question",
      "name": "צריך לקנות תופים לפני שמתחילים?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "לא. בסטודיו יש מערכת מקצועית, אוזניות וכל מה שצריך. על תופים לבית מחליטים רק אחרי שרואים שהילד נהנה."
      }
    },
    {
      "@type": "Question",
      "name": "צריך לדעת לקרוא תווים?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "לא. לא צריך לדעת כלום על מוזיקה לפני השיעור הראשון. את התווים לומדים תוך כדי נגינה."
      }
    },
    {
      "@type": "Question",
      "name": "איך הילד יודע מה לתרגל בבית?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "באזור האישי שלו מחכים שיעורי הבית, התווים והשירים שעובדים עליהם. נתקע? הוא עונה שם על כמה שאלות קצרות, ועמרי יודע על מה לעבוד בשיעור הבא."
      }
    },
    {
      "@type": "Question",
      "name": "שיעור אישי או חוג תופים לילדים?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "אצל עמרי השיעורים אישיים, פנים אל פנים בסטודיו. מתקדמים לפי הקצב של הילד, לא לפי הקצב של קבוצה."
      }
    },
    {
      "@type": "Question",
      "name": "כמה זמן נמשך שיעור?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "55 דקות."
      }
    },
    {
      "@type": "Question",
      "name": "מי המורה?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "עמרי ברגר, מתופף כבר 11 שנה ומלמד תופים 3 שנים. מנגן בלהקת Arctic Kartiv."
      }
    },
    {
      "@type": "Question",
      "name": "איפה הסטודיו?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ברחוב דרויאנוב 5, במרכז תל אביב. פה עושים רעש, והשכנים בסדר עם זה."
      }
    }
  ]
};

export default function KidsLessonsPage() {
  return (
    <div className="omri-lessons kids-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <a className="skip" href="#main">
        דילוג לתוכן
      </a>
      <header className="topbar-sticky">
        <div className="topbar wrap">
          <a className="topbar-login" href="/thank-you">
            <span className="topbar-cta-pill">בואו לשיעור ניסיון!</span>
          </a>
          <a className="logo" href="/">
            <span className="logo-line1">עמרי ברגר</span>
            <span className="logo-line2">מורה לתופים</span>
          </a>
          <a
            className="topbar-icon"
            href="https://www.instagram.com/omri_berger/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="אינסטגרם"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
            </svg>
          </a>
        </div>
      </header>
      <a
        className="whatsapp-fab"
        href="/thank-you"
        aria-label="שלחו לי הודעת וואטסאפ"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.105.549 4.16 1.595 5.974L0 24l6.335-1.66a11.882 11.882 0 0 0 5.71 1.454h.005c6.582 0 11.94-5.362 11.943-11.944a11.86 11.86 0 0 0-3.473-8.401"
          />
        </svg>
        <span className="whatsapp-fab-text">לחצו לקביעת שיעור!</span>
      </a>
      <main id="main">
        <section className="opening wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              שיעורי תופים
              <br />
              לילדים בתל אביב
            </h1>
            <p className="kids-lead">
              מגיל 7. הילד מנגן כבר בשיעור הראשון, ואתם שומעים את זה בבית.
            </p>
          </div>
          <figure className="hero-photo">
            <div className="hero-photo-frame">
              <img
                src="/marketing/lessons/studio.jpg"
                alt="מערכת התופים בסטודיו של עמרי, על רקע קיר ירוק ותאורה חמה"
                width="1050"
                height="1400"
                fetchPriority="high"
              />
            </div>
          </figure>
        </section>

        <section className="first wrap section">
          <div className="section-grid">
            <h2 className="reveal">מה קורה בשיעור הראשון</h2>
            <div className="body-copy">
              <p>לא צריך לדעת כלום על מוזיקה. הילד מגיע, מכירים קצת, והוא מתיישב על התופים ומתחיל לנגן.</p>
              <p>ולפני שתשימו לב, כבר נקליט איתו <span className="word-color">שיר ראשון</span> להשמיע למשפחה.</p>
            </div>
          </div>
        </section>

        <section className="studio section">
          <div className="wrap">
            <div className="section-grid">
              <h2 className="reveal">מה אתם רואים אחרי כל שיעור</h2>
              <div className="body-copy">
                <p>כל שיעור מוקלט. בדרך הביתה כבר יש לכם סרטון של הילד מתופף.</p>
                <p>
                  לכל תלמיד יש אזור אישי בטלפון: מה לתרגל השבוע, התווים, והשירים שעובדים עליהם.
                  וכל פעם שהוא מצליח משהו חדש, זה נכנס <span className="word-color">לאזור ההישגים</span> שלו.
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="conversion conversion-intro">
          <div className="wrap">
            <h2 className="reveal">בואו לשיעור ניסיון, ותראו אם זה בשבילו</h2>
            <a className="btn" href="/thank-you">
              קובעים שיעור ניסיון
              <img className="btn-icon" src="/marketing/illustrations/btn-drumsticks.png" alt="" aria-hidden="true" width="96" height="65" />
            </a>
          </div>
        </aside>

        <section className="personal wrap section kids-faq">
          <h2 className="reveal">שאלות שהורים שואלים</h2>
          <ul className="topics">
              <li>
                <h3><span>מאיזה גיל אפשר להתחיל?</span></h3>
                <small>מגיל 7. אם הילד מתופף על כל שולחן בבית, זה סימן טוב שהוא מוכן.</small>
              </li>
              <li>
                <h3><span>צריך לקנות תופים לפני שמתחילים?</span></h3>
                <small>לא. בסטודיו יש מערכת מקצועית, אוזניות וכל מה שצריך. על תופים לבית מחליטים רק אחרי שרואים שהילד נהנה.</small>
              </li>
              <li>
                <h3><span>צריך לדעת לקרוא תווים?</span></h3>
                <small>לא. לא צריך לדעת כלום על מוזיקה לפני השיעור הראשון. את התווים לומדים תוך כדי נגינה.</small>
              </li>
              <li>
                <h3><span>איך הילד יודע מה לתרגל בבית?</span></h3>
                <small>באזור האישי שלו מחכים שיעורי הבית, התווים והשירים שעובדים עליהם. נתקע? הוא עונה שם על כמה שאלות קצרות, ועמרי יודע על מה לעבוד בשיעור הבא.</small>
              </li>
              <li>
                <h3><span>שיעור אישי או חוג תופים לילדים?</span></h3>
                <small>אצל עמרי השיעורים אישיים, פנים אל פנים בסטודיו. מתקדמים לפי הקצב של הילד, לא לפי הקצב של קבוצה.</small>
              </li>
              <li>
                <h3><span>כמה זמן נמשך שיעור?</span></h3>
                <small>55 דקות.</small>
              </li>
              <li>
                <h3><span>מי המורה?</span></h3>
                <small>עמרי ברגר, מתופף כבר 11 שנה ומלמד תופים 3 שנים. מנגן בלהקת <bdi>Arctic Kartiv</bdi>.</small>
              </li>
              <li>
                <h3><span>איפה הסטודיו?</span></h3>
                <small>ברחוב דרויאנוב 5, במרכז תל אביב. פה עושים רעש, והשכנים בסדר עם זה.</small>
              </li>
          </ul>
        </section>

        <section className="final section wrap" id="start">
          <div>
            <h2 className="reveal">נו, אז מתי מתחילים?</h2>
            <p>לוחצים על הכפתור, שולחים הודעה בוואטסאפ, מוצאים זמן שמתאים, ונפגשים בסטודיו :)</p>
            <div className="final-cta">
            <a className="btn" href="/thank-you">
              יאללה קובעים
              <img className="btn-icon" src="/marketing/illustrations/btn-drumsticks.png" alt="" aria-hidden="true" width="96" height="65" />
            </a>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
      <LessonsBehavior />
    </div>
  );
}
