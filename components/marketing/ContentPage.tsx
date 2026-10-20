/* eslint-disable @next/next/no-img-element */
import MarketingShell, { MarketingCta } from "./MarketingShell";
import type { MarketingPage } from "@/lib/marketing/types";

const SITE = "https://www.omriberger.com";

type Crumb = { name: string; href: string };

export type LinkCard = { href: string; label: string };

export default function ContentPage({
  page,
  path,
  crumbs,
  kind,
  related,
}: {
  page: MarketingPage;
  path: string;
  crumbs: Crumb[];
  kind: "service" | "article" | "page";
  related: LinkCard[];
}) {
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [...crumbs, { name: page.h1, href: path }].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: SITE + c.href,
      })),
    },
  ];
  if (kind === "article") {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.h1,
      description: page.description,
      inLanguage: "he",
      mainEntityOfPage: SITE + path,
      image: SITE + (page.image?.src ?? "/marketing/lessons/stage.jpg"),
      author: { "@type": "Person", name: "עמרי ברגר", url: SITE + "/about" },
      publisher: { "@type": "Person", name: "עמרי ברגר" },
    });
  } else if (kind === "service") {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      description: page.description,
      serviceType: "שיעורי תופים",
      areaServed: "תל אביב",
      provider: {
        "@type": "MusicSchool",
        name: "עמרי ברגר - שיעורי תופים",
        url: SITE + "/",
        address: {
          "@type": "PostalAddress",
          streetAddress: "דרויאנוב 5",
          addressLocality: "תל אביב-יפו",
          addressCountry: "IL",
        },
      },
    });
  }
  if (page.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  const mid = Math.min(2, page.blocks.length);

  return (
    <MarketingShell jsonLd={jsonLd}>
      <nav className="mk-crumbs wrap" aria-label="פירורי לחם">
        {crumbs.map((c) => (
          <span key={c.href}>
            <a href={c.href}>{c.name}</a>
            <span aria-hidden="true"> / </span>
          </span>
        ))}
        <span aria-current="page">{page.label}</span>
      </nav>

      <section className={`mk-hero wrap ${page.image ? "has-image" : ""}`} aria-labelledby="page-title">
        <div className="mk-hero-copy">
          <h1 id="page-title">{page.h1}</h1>
          <p className="mk-lead">{page.lead}</p>
          {kind === "article" && <p className="mk-byline">כתב: עמרי ברגר, מורה לתופים בתל אביב</p>}
        </div>
        {page.image && (
          <figure className="mk-hero-photo">
            <img src={page.image.src} alt={page.image.alt} width="1050" height="1400" fetchPriority="high" />
          </figure>
        )}
      </section>

      <article className="mk-body wrap">
        {page.blocks.slice(0, mid).map((b) => (
          <section key={b.h2} className="mk-block">
            <h2>{b.h2}</h2>
            {b.p?.map((t, i) => <p key={i}>{t}</p>)}
            {b.list && (
              <ul className="mk-list">
                {b.list.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <MarketingCta
        title={kind === "article" ? "רוצים ללמוד את זה על תופים אמיתיים?" : "בואו לשיעור ניסיון בסטודיו"}
        button="קובעים שיעור ניסיון"
      />

      {page.blocks.length > mid && (
        <article className="mk-body wrap">
          {page.blocks.slice(mid).map((b) => (
            <section key={b.h2} className="mk-block">
              <h2>{b.h2}</h2>
              {b.p?.map((t, i) => <p key={i}>{t}</p>)}
              {b.list && (
                <ul className="mk-list">
                  {b.list.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      )}

      {page.faq?.length ? (
        <section className="personal wrap mk-faq" aria-labelledby="faq-title">
          <h2 id="faq-title">שאלות נפוצות</h2>
          <ul className="topics">
            {page.faq.map((f) => (
              <li key={f.q}>
                <h3>
                  <span>{f.q}</span>
                </h3>
                <small>{f.a}</small>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {related.length ? (
        <section className="mk-related wrap" aria-labelledby="related-title">
          <h2 id="related-title">{kind === "article" ? "עוד לקרוא" : "עוד שיעורים שיכולים להתאים"}</h2>
          <ul>
            {related.map((r) => (
              <li key={r.href}>
                <a href={r.href}>{r.label}</a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="final wrap mk-final">
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
    </MarketingShell>
  );
}
