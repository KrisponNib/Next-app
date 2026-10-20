/* eslint-disable @next/next/no-img-element */
import LessonsBehavior from "@/app/LessonsBehavior";
import { SERVICES } from "@/lib/marketing/services";
import { ARTICLES } from "@/lib/marketing/articles";
import "@/app/lessons.css";
import "@/app/lesson-art.css";
import "./marketing.css";

const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.105.549 4.16 1.595 5.974L0 24l6.335-1.66a11.882 11.882 0 0 0 5.71 1.454h.005c6.582 0 11.94-5.362 11.943-11.944a11.86 11.86 0 0 0-3.473-8.401";

export function MarketingHeader() {
  return (
    <>
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
      <a className="whatsapp-fab" href="/thank-you" aria-label="לחצו לקביעת שיעור בוואטסאפ">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d={WHATSAPP_PATH} />
        </svg>
        <span className="whatsapp-fab-text">לחצו לקביעת שיעור!</span>
      </a>
    </>
  );
}

export function MarketingFooter() {
  const services = [{ slug: "", label: "כל סוגי השיעורים" }, ...SERVICES].map((s) => ({
    href: s.slug ? `/drum-lessons/${s.slug}` : "/drum-lessons",
    label: s.label,
  }));
  services.splice(1, 0, { href: "/drum-lessons-for-kids", label: "שיעורי תופים לילדים" });
  return (
    <footer className="mk-footer">
      <div className="wrap">
        <div className="mk-footer-cols">
          <nav aria-label="שיעורי תופים">
            <h2 className="mk-footer-title">שיעורי תופים</h2>
            <ul>
              {services.map((s) => (
                <li key={s.href}>
                  <a href={s.href}>{s.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="מאמרים">
            <h2 className="mk-footer-title">
              <a href="/blog">מאמרים על תופים</a>
            </h2>
            <ul>
              {ARTICLES.slice(0, 12).map((a) => (
                <li key={a.slug}>
                  <a href={`/blog/${a.slug}`}>{a.label}</a>
                </li>
              ))}
            </ul>
            <p className="mk-footer-more">
              <a href="/blog">לכל {ARTICLES.length} המאמרים</a>
            </p>
          </nav>
        </div>
        <p className="mk-footer-note">
          עמרי ברגר, מורה לתופים · סטודיו ברחוב דרויאנוב 5, תל אביב · <a href="/about">על עמרי</a> ·{" "}
          <a href="/faq">שאלות ותשובות</a>
        </p>
      </div>
    </footer>
  );
}

export function MarketingCta({ title, button }: { title: string; button: string }) {
  return (
    <aside className="conversion conversion-intro">
      <div className="wrap">
        <h2 className="reveal">{title}</h2>
        <a className="btn" href="/thank-you">
          {button}
          <img className="btn-icon" src="/marketing/illustrations/btn-drumsticks.png" alt="" aria-hidden="true" width="96" height="65" />
        </a>
      </div>
    </aside>
  );
}

export default function MarketingShell({
  children,
  jsonLd,
}: {
  children: React.ReactNode;
  jsonLd?: object[];
}) {
  return (
    <div className="omri-lessons mk-page">
      {(jsonLd ?? []).map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <MarketingHeader />
      <main id="main">{children}</main>
      <MarketingFooter />
      <LessonsBehavior />
    </div>
  );
}
